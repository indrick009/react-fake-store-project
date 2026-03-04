import type { AppDispatch, RootState } from "./create-store";
import type { Dependencies } from "./dependencies";
import {
  addListener,
  createListenerMiddleware,
  type TypedAddListener,
  type TypedStartListening,
} from "@reduxjs/toolkit";

export const createAppListenerMiddleware = createListenerMiddleware<
  RootState,
  AppDispatch,
  Dependencies
>();

export type AppStartListening = TypedStartListening<
  RootState,
  AppDispatch,
  Dependencies
>;

export const startAppListening =
  createAppListenerMiddleware.startListening as AppStartListening;

export const addAppListener = addListener as TypedAddListener<
  RootState,
  AppDispatch
>;
