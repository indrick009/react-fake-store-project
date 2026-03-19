import {beforeEach, describe, expect, test} from "vitest";
import {AppStore, createTestStore} from "../../../config/create-store.ts";
import {FakeProductHttpGateway} from "./fake-product-http-gateway/FakeProductHttpGateway.ts";
import {ProductSelector} from "../slice/products/ProductSelector.ts";
import {ProductsActions} from "../actions/GetProductsActions.ts";
import {GetAllProductsCommand} from "../use-case/get-all-products/GetALLProductCommand.ts";
import {LoadingState} from "../../../shared/domain/enums/LoadingState.ts";
describe("Product Test", () => {

  let store: AppStore;

  beforeEach(() => {
    store = createTestStore({
      productsGateway: new FakeProductHttpGateway(),
    });
  });

  test("should show loading state when fetching products", async () => {

    const command: GetAllProductsCommand = {
      limit: 10,
      page: 1,
    }

    const initialLoadingState = ProductSelector.getLoadingState(store.getState());
    expect(initialLoadingState).toBe(LoadingState.idle);

    store.dispatch(ProductsActions(command));


    const pendingLoadingState = ProductSelector.getLoadingState(store.getState());
    expect(pendingLoadingState).toBe(LoadingState.pending);

    await new Promise(resolve => setTimeout(resolve, 200));

    const finalLoadingState = ProductSelector.getLoadingState(store.getState());
    expect(finalLoadingState).toBe(LoadingState.success);

    const allProduct = ProductSelector.SelectAllProducts(store.getState());
    expect(allProduct.length).toBeGreaterThan(1);

  });

  test("should retrieve product detail", async () => {



  })


})