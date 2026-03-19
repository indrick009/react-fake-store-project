import {describe, test, beforeEach, expect} from "vitest"
import {AppStore, createTestStore} from "../../../config/create-store.ts";
import {FakeProfileHttpGateway} from "../../auth/test/FakeProfileHttpGateway.ts";
import {LoadingState} from "../../../shared/domain/enums/LoadingState";
import {ProfileActions} from "../actions/GetProfileActions.ts";


describe("Profile Test", () => {

  let store: AppStore;

  beforeEach(() => {
    store = createTestStore({
      profileGateway: new FakeProfileHttpGateway(),

    })
  })

  test("should get user profile", async () => {

    store.dispatch(ProfileActions());

    expect(store.getState().profileReducer.loading).toBe(LoadingState.pending);

    await new Promise(resolve => setTimeout(resolve, 0));


    const state = store.getState();

    expect(state.profileReducer.currentUser).not.toBeNull();
    expect(state.profileReducer.currentUser?.id).toBe(1);
    expect(state.profileReducer.currentUser?.username).toBe("test user");
    expect(state.profileReducer.loading).toBe(LoadingState.success);

  })

})