import type { OrderGateway } from "../../models/gateway/OrderGateway";
import type { Order, OrderItem } from "../../models/Order";
import type { CreateOrderCommand } from "../../use-case/create-order/CreateOrderCommand";
import type { CreateOrderResponse } from "../../use-case/create-order/CreateOrderResponse";
import type { PayOrderCommand } from "../../use-case/pay-order/PayOrderCommand";
import type { PayOrderResponse } from "../../use-case/pay-order/PayOrderResponse";
import { CartOrderPricing } from "../decorators/CartOrderPricing";
import { ChristmasGiftDecorator } from "../decorators/ChristmasGiftDecorator";
import { ValentinesGiftDecorator } from "../decorators/ValentinesGiftDecorator";
import type { OrderPricing } from "../../models/pricing/OrderPricing";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const toOrderItem = (
  cartProduct: CreateOrderCommand["cart"]["products"][number],
): OrderItem => {
  return {
    productId: cartProduct.id,
    title: cartProduct.title,
    price: cartProduct.price,
    quantity: cartProduct.quantity,
    total: cartProduct.total,
    thumbnail: cartProduct.thumbnail,
  };
};

export class OrderLocalGateway implements OrderGateway {
  private sequence = 1;
  private orders = new Map<number, Order>();

  async createOrder(command: CreateOrderCommand): Promise<CreateOrderResponse> {
    let pricing: OrderPricing = new CartOrderPricing(command.cart);
    if (command.christmasGift) pricing = new ChristmasGiftDecorator(pricing);
    if (command.valentinesGift) pricing = new ValentinesGiftDecorator(pricing);

    const now = new Date().toISOString();
    const order: Order = {
      id: this.sequence++,
      userId: command.userId,
      items: command.cart.products.map(toOrderItem),
      subtotal: pricing.getSubtotal(),
      giftFee: pricing.getGiftFee(),
      total: pricing.getTotal(),
      giftOptions: {
        christmasGift: command.christmasGift,
        valentinesGift: command.valentinesGift,
      },
      payment: {
        provider: null,
        phoneNumber: null,
        status: "awaiting_phone",
      },
      createdAt: now,
    };

    this.orders.set(order.id, order);
    await wait(1000);
    return { order };
  }

  async payOrder(command: PayOrderCommand): Promise<PayOrderResponse> {
    const existing = this.orders.get(command.orderId);
    if (!existing) {
      throw new Error("Commande introuvable");
    }

    const nextOrder: Order = {
      ...existing,
      payment: {
        provider: command.provider,
        phoneNumber: command.phoneNumber,
        status: "success",
      },
    };

    this.orders.set(existing.id, nextOrder);
    await wait(1000);
    const isSuccess = nextOrder.payment.status === "success";
    return {
      order: nextOrder,
      paymentStatus: nextOrder.payment.status,
      message: isSuccess
        ? "Merci d'avoir choisi CleanStore"
        : "Erreur lors du paiement",
    };
  }
}
