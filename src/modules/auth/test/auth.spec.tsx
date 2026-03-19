import {test, describe, expect, beforeEach} from "vitest";
import {AppStore, createTestStore} from "../../../config/create-store.ts";
import {FakeAuthHttpGateway} from "./fake-http-gateway/FakeAuthHttpGateway.ts";

import {LoginCommand} from "../use-case/login/LoginCommand.ts";
import {renderHook, waitFor, act} from "@testing-library/react";
import {Provider} from "react-redux";
import {useAuth} from "../infra/ui/hooks/useAuth.ts";
import {useLoginForm, type LoginFormValues} from "../infra/ui/hooks/useLoginForm.ts";
import {FakeProfileHttpGateway} from "./FakeProfileHttpGateway.ts";

describe("AUTH LOGIN TEST", () => {
  let store: AppStore

  beforeEach(() => {
    store = createTestStore({
      authGateway: new FakeAuthHttpGateway(),
      profileGateway: new FakeProfileHttpGateway(),
    });
  })

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

    await act(async () => {
      await result.current.login(loginCommand);
    });

    await waitFor(() => {
      expect(result.current.isAuthenticated).toBeTruthy();
    });

    expect(store.getState().loginReducer.isAuthenticated).toBeTruthy();

  });

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
      expect(finalAuthState.isAuthenticated).toBeTruthy();
    });

  })

});
