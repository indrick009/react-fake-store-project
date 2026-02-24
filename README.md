# 🛒 FakeStore App — Projet Débutant

Un projet **React + TypeScript + Tailwind CSS** qui consomme la [FakeStore API](https://fakestoreapi.com/docs).

## 📚 Ce que vous apprendrez

- Faire des appels API avec `fetch` et `useEffect`
- Créer des **hooks personnalisés** (`useProducts`, `useCategories`)
- Typer les données avec **TypeScript** (interfaces, types)
- Gérer l'état global avec `useState`
- Composer des composants React réutilisables
- Styliser avec **Tailwind CSS 3**

## 🗂️ Structure du projet

```
src/
├── types/
│   └── index.ts          # Types TypeScript (Product, CartItem...)
├── hooks/
│   └── useApi.ts         # Hooks personnalisés pour l'API
├── components/
│   ├── Navbar.tsx        # Barre de navigation avec compteur panier
│   ├── ProductCard.tsx   # Carte d'un produit
│   └── Cart.tsx          # Panneau latéral du panier
├── App.tsx               # Composant principal
├── main.tsx              # Point d'entrée
└── index.css             # Styles globaux + Tailwind
```

## 🚀 Lancer le projet

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer le serveur de développement
npm run dev

# 3. Ouvrir http://localhost:5173
```

## 🌐 Endpoints utilisés

| Endpoint | Description |
|---|---|
| `GET /products` | Tous les produits |
| `GET /products/categories` | Liste des catégories |
| `GET /products/category/:name` | Produits par catégorie |
| `GET /products/:id` | Un produit par ID |

## ✨ Fonctionnalités

- ✅ Affichage de tous les produits
- ✅ Filtrage par catégorie
- ✅ Skeleton loader pendant le chargement
- ✅ Gestion du panier (ajouter, supprimer, changer la quantité)
- ✅ Design responsive (mobile & desktop)
