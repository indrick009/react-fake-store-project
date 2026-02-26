import { useEffect } from "react";
import {
  fetchCategories,
  fetchProduct,
  fetchProducts,
} from "../store/productSlice";
import { useAppDispatch, useAppSelector } from "./storeHooks";

export function useProducts(category?: string) {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector(
    (state) => state.products,
  );

  useEffect(() => {
    dispatch(fetchProducts(category));
  }, [category, dispatch]);

  return { products, loading, error };
}

export function useProduct(id: number | undefined) {
  if (id === undefined) {
    return { product: null, loading: false, error: null };
  }
  const dispatch = useAppDispatch();
  const { product, loading, error } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProduct(id));
  }, [id, dispatch]);

  return { product, loading, error };
}

export function useCategories() {
  const dispatch = useAppDispatch();
  const { categories, loading, error } = useAppSelector(
    (state) => state.products,
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return { categories, loading, error };
}
