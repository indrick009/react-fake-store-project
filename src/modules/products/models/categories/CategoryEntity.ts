import { createEntityAdapter } from "@reduxjs/toolkit";

export interface CategoryEntity{
    slug: string,
    name: string,
    url: string
}


export const CategoryEntityAdapter = createEntityAdapter<CategoryEntity>();