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

export interface QweryProduct {
  colors: string[];
  collections: string[];
  categories: string[];
  minPrice: string[];
  maxPrice: string[];
  minSize: string[];
  maxSize: string[];
  minStock: string[];
  maxStock: string[];
  q: string[];
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

export enum FiltersColor {
  black = 'black',
  blue = 'blue',
  brown = 'brown',
  green = 'green',
  pink = 'pink',
  purple = 'purple',
  red = 'red',
  silver = 'silver',
  white = 'white',
  yellow = 'yellow',
}

export enum FiltersCollections {
  ollections2021 = '2021',
  ollections2022 = '2022',
  ollections2023 = '2023',
}

export enum FiltersMinPrice {
  MinPrice2 = '2',
  MinPrice3 = '5',
  MinPrice10 = '10',
  MinPrice20 = '20',
  MinPrice30 = '30',
}

export enum FiltersMaxPrice {
  MaxPrice2 = '3',
  MaxPrice3 = '5',
  MaxPrice10 = '10',
  MaxPrice20 = '20',
  MaxPrice30 = '34',
}

export enum FiltersMinSize {
  MinSize2 = '2',
  MinSize10 = '10',
  MinSize100 = '100',
  MinSize400 = '400',
  MinSize600 = '600',
}

export enum FiltersMaxSize {
  MaxSize2 = '2',
  MaxSize10 = '10',
  MaxSize100 = '100',
  MaxSize400 = '400',
  MaxSize700 = '700',
}

export enum FiltersMinStock {
  MinStock2 = '2',
  MinStock5 = '5',
  MinStock10 = '10',
  MinStock20 = '20',
  MinStock40 = '40',
}

export enum FiltersMaxStock {
  MaxStock2 = '3',
  MaxStock5 = '5',
  MaxStock10 = '10',
  MaxStock30 = '30',
  MaxStock50 = '50',
}

export enum FiltersCategories {
  category1 = 'Christmas decorations',
  category2 = 'Garland & Wreath',
  category3 = 'Do It Yourself',
  category4 = 'Tree decorations',
  category5 = 'Christmas lights',
}
