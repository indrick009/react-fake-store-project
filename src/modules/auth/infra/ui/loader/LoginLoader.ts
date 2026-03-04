// import type { LoaderFunction } from "react-router-dom";
// import { AppStore } from "../../../../../config/create-store";
// import { ProductsActions } from "../../../../products/actions/GetProductsActions";

// export const GetAllProductLoader =
//   (store: AppStore): LoaderFunction =>
//   (l) => {
//     const params = Object.fromEntries(
//       new URLSearchParams(l.request.url.split("?")[1] ?? "")
//     );
//     const command = {
//       search: params.search,
//       page: Number(params.page ?? 1),
//       limit: Number(params.limit ?? 10),
//     };
//     store.dispatch(ProductsActions(command));
//     return null;
//   };
