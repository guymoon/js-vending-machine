import { NewProductForm } from '../views/NewProductForm.js';
import { ERROR_MESSAGE } from '../constants/index.js';
import { model } from '../index.js';

export const validateNewProduct = (newProduct) => {
  const { id, name, price, quantity } = newProduct;

  if (name.length === 0) throw Error(ERROR_MESSAGE.NONE_NAME);
  if (name.length > 10) throw Error(ERROR_MESSAGE.MAX_LENGTH_NAME);

  if (price.length === 0) throw Error(ERROR_MESSAGE.NONE_PRICE);
  if (price < 100) throw Error(ERROR_MESSAGE.MIN_PRICE);
  if (price > 10000000) throw Error(ERROR_MESSAGE.MAX_PRICE);
  if (price % 10 !== 0) throw Error(ERROR_MESSAGE.DIVISION_BY_TEN);

  if (quantity.length === 0) throw Error(ERROR_MESSAGE.NONE_QUANTITY);
  if (quantity < 1) throw Error(ERROR_MESSAGE.MIN_QUANTITY);
  if (quantity > 999) throw Error(ERROR_MESSAGE.MAX_QUANTITY);

  return { id, name, price: Number(price), quantity: Number(quantity) };
};

export const findSameProductId = (products, newProduct) =>
  Object.values(products).findIndex((obj, idx) => obj.name === newProduct.name);

export const updateProduct = (model, NewProductForm, newProduct, sameProductId) => {
  NewProductForm.replaceExistProduct(newProduct, sameProductId);
  model.updateSameProduct(newProduct);
};

export const addNewProductToInventory = (model, NewProductForm, newProduct) => {
  const newProductId = model.products.length;
  model.addNewProduct(newProduct);
  NewProductForm.addNewProduct(newProduct, newProductId);
};

export const getProductId = (products) => {
  if (products.length === 0) return 0;
  return products[products.length - 1].id + 1;
};
