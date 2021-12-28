import { newProductFormView, model } from '../index.js';
import {
  addNewProductToInventory,
  findSameProductId,
  getProductId,
  updateProduct,
  validateNewProduct,
} from '../service/newProductService.js';

export class manageProductController {
  constructor() {
    newProductFormView.bindOnClickAddProductButton(this.onClickAddNewProductButton);
  }

  onClickAddNewProductButton = (event) => {
    event.preventDefault();

    const newProduct = validateNewProduct({
      id: getProductId(model.products),
      name: newProductFormView.$nameInput.value,
      price: newProductFormView.$priceInput.value,
      quantity: newProductFormView.$quantityInput.value,
    });

    const sameProductId = findSameProductId(model.products, newProduct);
    const existSameProduct = sameProductId >= 0;

    if (existSameProduct) {
      updateProduct(model, newProductFormView, newProduct, sameProductId);
      return;
    }

    addNewProductToInventory(model, newProductFormView, newProduct);
    console.log(model.products);
  };
}
