export interface Product {
  id: string;
  name: string;
  price: number;
  collection: number;
  stock: number;
  color: string;
  size: number;
  favorite?: boolean;
  category: string;
  images: string[];
}

export interface UserServise {
  email: string;
  sub: { login: string; picture?: string; isGoogle?: boolean };
}

export enum MessageStatus {
  SUCCESS = 'Success',
  UNAUTHORIZED = 'Unauthorized',
  PRODUCT_NOT_FOUND = 'Product not found',
  PRODUCTS_NOT_FOUND = 'Products not found',
  ERROR_JSON = 'Failed read and parse JSON',
  ERROR_VALIDATION_PRODUCTS_FIELDS = 'Some products fields is invalid',
  PRODUCTS_INSERT_SUCCESS = 'Products inserted successfully',
  PRODUCT_CREATE_SUCCESS = 'Product created successfully',
  PRODUCT_UPDATE_SUCCESS = 'Product updated successfully',
  PRODUCTS_DELETE_SUCCESS = 'All products deleted successfully',
  PRODUCT_DELETE_SUCCESS = 'Product deleted successfully',
  THISE_EMAIL_IS_ALREADY_REDISTRED = 'This email is already registered',
  USER_PROFILE_IS_EMPTY = 'User profile is empty',
  REQUIRED_FIELDS_ERR = 'Request body does not contain required fields, or it`s the wrong type',
}
