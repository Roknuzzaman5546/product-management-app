// store/api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from './index';


export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) headers.set('Authorization', `Bearer ${token}`);
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Products', 'Product', 'Categories'],
  endpoints: (builder) => ({
    auth: builder.mutation<{ token: string }, { email: string }>({
      query: (body) => ({
        url: '/auth',
        method: 'POST',
        body,
      }),
    }),
    getProducts: builder.query<any, { offset?: number; limit?: number; categoryId?: string }>(
      {
        query: ({ offset = 0, limit = 10, categoryId } = {}) => {
          const params = new URLSearchParams();
          params.set('offset', String(offset));
          params.set('limit', String(limit));
          if (categoryId) params.set('categoryId', categoryId);
          return `/products?${params.toString()}`;
        },
        providesTags: (result) =>
          result
            ? [
              ...result.map((p: any) => ({ type: 'Product' as const, id: p.id })),
              { type: 'Products', id: 'LIST' },
            ]
            : [{ type: 'Products', id: 'LIST' }],
      }
    ),
    searchProducts: builder.query<any, { searchedText: string }>(
      {
        query: ({ searchedText }) => `/products/search?searchedText=${encodeURIComponent(searchedText)}`,
        providesTags: (result) =>
          result ? result.map((p: any) => ({ type: 'Product' as const, id: p.id })) : []
      }
    ),
    getProductBySlug: builder.query<any, string>({
      query: (slug) => `/products/${slug}`,
      providesTags: (result, error, slug) => (result ? [{ type: 'Product', id: result.id }] : []),
    }),
    createProduct: builder.mutation<any, any>({
      query: (body) => ({ url: '/products', method: 'POST', body }),
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),
    updateProduct: builder.mutation<any, { id: string; body: any }>({
      query: ({ id, body }) => ({ url: `/products/${id}`, method: 'PUT', body }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Product', id }, { type: 'Products', id: 'LIST' }],
    }),
    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
    getCategories: builder.query<any, { offset?: number; limit?: number }>({
      query: ({ offset = 0, limit = 50 } = {}) => `/categories?offset=${offset}&limit=${limit}`,
      providesTags: (result) => [{ type: 'Categories', id: 'LIST' }],
    }),
  }),
});

export const {
  useAuthMutation,
  useGetProductsQuery,
  useSearchProductsQuery,
  useGetProductBySlugQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetCategoriesQuery,
} = api;
