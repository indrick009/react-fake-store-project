import { GetAllCartCommand } from "../../use-case/get-all-cart/GetAllCartCommand";

export const cartsRoutes = {
    getAllCartProduct:(command:GetAllCartCommand)=> `/carts/user/${command.userId}`,
}
