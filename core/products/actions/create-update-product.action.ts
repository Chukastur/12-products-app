import { productsApi } from "@/core/api/productsApi";
import { Product } from "../interfaces/product.interface";

export const updateCreateProduct = (product: Partial<Product>) => {
  product.stock = isNaN(Number(product.stock)) ? 0 : Number(product.stock);
  product.price = isNaN(Number(product.price)) ? 0 : Number(product.price);

  if (product.id && product.id !== "new") {
    return updateProduct(product);
  }

  return createProduct(product);
};

const updateProduct = async (product: Partial<Product>) => {
  const { id, images = [], user, ...rest } = product;

  try {
    const { data } = await productsApi.patch<Product>(`/products/${id}`, {
      // TODO: images
      ...rest,
    });

    return data;
  } catch (error) {
    throw new Error("Error al actualiar el producto");
  }
};

const createProduct = async (product: Partial<Product>) => {
  const { id, images = [], user, ...rest } = product;

  try {
    const { data } = await productsApi.post<Product>(`/products/`, {
      // TODO: images
      ...rest,
    });

    return data;
  } catch (error) {
    throw new Error("Error al actualiar el producto");
  }
};
