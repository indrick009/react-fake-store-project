import type { LoaderFunction } from "react-router-dom";
import { AppStore } from "../../../../../config/create-store";
import { GetProfileAsync } from "../../../use-case/GetProfileAsync";

export const GetProfileLoader =
  (store: AppStore): LoaderFunction =>
  (_) => {
    store.dispatch(GetProfileAsync());
    return null;
  };
