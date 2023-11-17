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
  PRODUCT_NOT_FOUND = 'Product not found',
  ERROR_JSON = 'Failed read and parse JSON',
  PRODUCTS_INSERT_SUCCESS = 'Products inserted successfully',
  PRODUCT_CREATE_SUCCESS = 'Product created successfully',
  PRODUCT_UPDATE_SUCCESS = 'Product updated successfully',
  PRODUCTS_DELETE_SUCCESS = 'All products deleted successfully',
  PRODUCT_DELETE_SUCCESS = 'Product deleted successfully',
  THISE_EMAIL_IS_ALREADY_REDISTRED = 'This email is already registered',
  USER_PROFILE_IS_EMPTY = 'User profile is empty',
}
