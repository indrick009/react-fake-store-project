import { useState, useEffect } from 'react';
import { Product, Category } from '../types';

const BASE_URL = 'https://fakestoreapi.com';

// Hook pour récupérer tous les produits
export function useProducts(category?: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log(`Fetching products${category ? ` for category: ${category}` : ''}`);
    const url = category
      ? `${BASE_URL}/products/category/${encodeURIComponent(category)}`
      : `${BASE_URL}/products`;

    setLoading(true);
    setError(null);

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Erreur lors du chargement des produits');
        return res.json();
      })
      .then((data: Product[]) => setProducts(data))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [category]);

  return { products, loading, error };
}

// Hook pour récupérer les catégories
export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('Fetching categories');
    fetch(`${BASE_URL}/products/categories`)
      .then((res) => {
        if (!res.ok) throw new Error('Erreur lors du chargement des catégories');
        return res.json();
      })
      .then((data: Category[]) => setCategories(data))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { categories, loading, error };
}

// Hook pour récupérer un seul produit
export function useProduct(id: number) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log(`Fetching product with ID: ${id}`);
    fetch(`${BASE_URL}/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Produit introuvable');
        return res.json();
      })
      .then((data: Product) => setProduct(data))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  return { product, loading, error };
}
