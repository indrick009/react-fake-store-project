import {test, describe, expect, beforeEach} from "vitest";
import {AppStore, createTestStore} from "../../../config/create-store.ts";
import {FakeAuthHttpGateway} from "./fake-http-gateway/FakeAuthHttpGateway.ts";

import {LoginCommand} from "../use-case/login/LoginCommand.ts";
import {renderHook, waitFor, act} from "@testing-library/react";
import {Provider} from "react-redux";
import {useAuth} from "../infra/ui/hooks/useAuth.ts";
import {useLoginForm, type LoginFormValues} from "../infra/ui/hooks/useLoginForm.ts";

describe("AUTH LOGIN TEST", () => {
  let store: AppStore

  beforeEach(() => {
    store = createTestStore({
      authGateway: new FakeAuthHttpGateway(),
    });
  })

  test("login user with correct credentials using login form hook", async () => {
    const wrapper = ({children}: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );

    const {result: {current}} = renderHook(() => useLoginForm(), {wrapper});

    const formData: LoginFormValues = {
      username: "test@gmail.com",
      password: "1234567890"
    };

    await act(async () => {
      current.onSubmit(formData);
    });

    await waitFor(() => {
      const finalAuthState = store.getState().loginReducer;
      console.log(finalAuthState, "after")
      expect(finalAuthState.isAuthenticated).toBeTruthy();
    });

    expect(current.isSubmitting).toBeFalsy();
    expect(current.error).toBeNull();
  });


  test("useAuth hook should return initial state", () => {
    const wrapper = ({children}: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );

    const {result} = renderHook(() => useAuth(), {wrapper});

    expect(result.current.isAuthenticated).toBeFalsy();
    expect(result.current.loading).toBe("idle");
    expect(result.current.error).toBeNull();
    expect(typeof result.current.login).toBe("function");
  });

  test("useAuth hook should handle login successfully", async () => {
    const wrapper = ({children}: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );

    const {result} = renderHook(() => useAuth(), {wrapper});

    const loginCommand: LoginCommand = {
      username: "test@gmail.com",
      password: "1234567890"
    };

    let loginResult: any;
    await act(async () => {
      loginResult = await result.current.login(loginCommand);
    });

    await waitFor(() => {
      expect(result.current.isAuthenticated).toBeTruthy();
    });

    expect(loginResult.meta.requestStatus).toBe("fulfilled");
  });
});
