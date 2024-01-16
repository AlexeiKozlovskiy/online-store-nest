import { StatusCodes } from 'http-status-codes';
import { MessageStatus } from '../src/types/types';
import { loadProducts } from '../src/helpers/helpersFunc';
import { validate } from 'uuid';
import * as request from 'supertest';

const PORT = 4000;
const host = `localhost:${PORT}`;
const unauthorizedRequest = request(host);
const randomUUID = '456b4909-0327-4595-a469-73b7d7411296';
const commonHeaders = { Accept: 'application/json' };
const productsRoutes = {
  getAll: '/products',
  getById: (productsId) => `/products/${productsId}`,
  create: '/products',
  insertAll: '/products/insertAll',
  update: (productsId) => `/products/${productsId}`,
  delete: (productsId) => `/products/${productsId}`,
  deleteAll: '/products/deleteAll',
};
const createProductDto = {
  name: 'TEST_PRODUCT',
  price: 10,
  collection: 2024,
  stock: 50,
  color: 'red',
  size: 500,
  category: 'Tree decorations',
  images: ['./img-one.jpg', './img-two.jpg'],
};

describe('GET', () => {
  it('should correctly get all products', async () => {
    const response = await unauthorizedRequest.get(productsRoutes.getAll).set(commonHeaders);

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body).toBeInstanceOf(Array);
  });

  describe('Get products by query', () => {
    it('should correctly get products by color query', async () => {
      const query = '/products/?colors=black';
      const response = await unauthorizedRequest.get(query).set(commonHeaders);

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.every(({ color }) => color === 'black')).toBeTruthy();
    });

    it('should correctly get products by collection query', async () => {
      const query = '/products/?collections=2022';
      const response = await unauthorizedRequest.get(query).set(commonHeaders);

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.every(({ collection }) => collection === 2022)).toBeTruthy();
    });

    it('should correctly get products by price query', async () => {
      const query = '/products/?minPrice=10.99&maxPrice=32.99';
      const response = await unauthorizedRequest.get(query).set(commonHeaders);

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.every(({ price }) => price >= 10.99 && price <= 32.99)).toBeTruthy();
    });

    it('should correctly get products by category and size query', async () => {
      const query = '/products/?categories=Garland+%26+Wreath&minSize=200&maxSize=600';
      const response = await unauthorizedRequest.get(query).set(commonHeaders);

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.every(({ category }) => category === 'Garland & Wreath')).toBeTruthy();
      expect(response.body.every(({ size }) => size >= 200 && size <= 600)).toBeTruthy();
    });
  });

  it('should correctly get products by id', async () => {
    const creationResponse = await unauthorizedRequest
      .post(productsRoutes.create)
      .set(commonHeaders)
      .send(createProductDto);

    const { id } = creationResponse.body;

    expect(creationResponse.statusCode).toBe(StatusCodes.CREATED);
    const searchResponse = await unauthorizedRequest
      .get(productsRoutes.getById(id))
      .set(commonHeaders);

    expect(searchResponse.statusCode).toBe(StatusCodes.OK);
    expect(searchResponse.body).toBeInstanceOf(Object);

    const cleanupResponse = await unauthorizedRequest
      .delete(productsRoutes.delete(id))
      .set(commonHeaders);

    expect(cleanupResponse.statusCode).toBe(StatusCodes.OK);
    expect(cleanupResponse.body.message).toBe(MessageStatus.PRODUCT_DELETE_SUCCESS);
  });

  it("response should be with NOT_FOUND status code in case if product doesn't exist", async () => {
    const response = await unauthorizedRequest
      .get(productsRoutes.getById(randomUUID))
      .set(commonHeaders);

    expect(response.status).toBe(StatusCodes.NOT_FOUND);
    expect(response.body.message).toBe(MessageStatus.PRODUCT_NOT_FOUND);
  });

  it('response should be with BAD_REQUEST status code in case of invalid id', async () => {
    const response = await unauthorizedRequest
      .get(productsRoutes.getById('invalid-id'))
      .set(commonHeaders);

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
  });
});

describe('POST', () => {
  it('should correctly create product', async () => {
    const response = await unauthorizedRequest
      .post(productsRoutes.create)
      .set(commonHeaders)
      .send(createProductDto);

    expect(response.status).toBe(StatusCodes.CREATED);

    const { id, name, price, collection, stock, color, size, category, images } = response.body;
    expect(name).toBe(createProductDto.name);
    expect(price).toBe(createProductDto.price);
    expect(collection).toBe(createProductDto.collection);
    expect(stock).toBe(createProductDto.stock);
    expect(color).toBe(createProductDto.color);
    expect(size).toBe(createProductDto.size);
    expect(category).toBe(createProductDto.category);
    expect(images).toStrictEqual(createProductDto.images);
    expect(validate(id)).toBe(true);

    const cleanupResponse = await unauthorizedRequest
      .delete(productsRoutes.delete(id))
      .set(commonHeaders);

    expect(cleanupResponse.statusCode).toBe(StatusCodes.OK);
    expect(cleanupResponse.body.message).toBe(MessageStatus.PRODUCT_DELETE_SUCCESS);
  });

  it('respons should be with BAD_REQUEST in case of invalid required data', async () => {
    const responses = await Promise.all([
      unauthorizedRequest.post(productsRoutes.create).set(commonHeaders).send({}),
      unauthorizedRequest.post(productsRoutes.create).set(commonHeaders).send({
        name: 'TEST_PRODUCT',
      }),
      unauthorizedRequest.post(productsRoutes.create).set(commonHeaders).send({
        price: 10,
      }),
      unauthorizedRequest.post(productsRoutes.create).set(commonHeaders).send({
        collection: 2023,
        stock: 50,
      }),
    ]);

    expect(responses.every(({ statusCode }) => statusCode === StatusCodes.BAD_REQUEST)).toBe(true);
  });

  it('should correctly create products from file products.json', async () => {
    const cleanupResponse = await unauthorizedRequest
      .delete(productsRoutes.deleteAll)
      .set(commonHeaders);

    expect(cleanupResponse.statusCode).toBe(StatusCodes.OK);
    expect(cleanupResponse.body.message).toBe(MessageStatus.PRODUCTS_DELETE_SUCCESS);

    const productsJSON = await loadProducts('src/data/products.json');
    const response = await unauthorizedRequest
      .post(productsRoutes.insertAll)
      .set(commonHeaders)
      .send(productsJSON);

    expect(response.status).toBe(StatusCodes.CREATED);
    expect(response.body.message).toBe(MessageStatus.PRODUCTS_INSERT_SUCCESS);
  });
});

describe('PUT', () => {
  it('should correctly update product match', async () => {
    const creationResponse = await unauthorizedRequest
      .post(productsRoutes.create)
      .set(commonHeaders)
      .send(createProductDto);

    const { id: createdId } = creationResponse.body;

    expect(creationResponse.status).toBe(StatusCodes.CREATED);

    const updateResponse = await unauthorizedRequest
      .put(productsRoutes.update(createdId))
      .set(commonHeaders)
      .send({
        name: createProductDto.name,
        price: 20,
        collection: createProductDto.collection,
        stock: createProductDto.stock,
        color: 'black',
        size: createProductDto.size,
        category: createProductDto.category,
        images: createProductDto.images,
      });

    expect(updateResponse.statusCode).toBe(StatusCodes.OK);
    expect(updateResponse.body.message).toBe(MessageStatus.PRODUCT_UPDATE_SUCCESS);

    const cleanupResponse = await unauthorizedRequest
      .delete(productsRoutes.delete(createdId))
      .set(commonHeaders);

    expect(cleanupResponse.statusCode).toBe(StatusCodes.OK);
    expect(cleanupResponse.body.message).toBe(MessageStatus.PRODUCT_DELETE_SUCCESS);
  });

  it('respons should be with BAD_REQUEST status code in case of invalid id', async () => {
    const response = await unauthorizedRequest
      .put(productsRoutes.update('invalid-id'))
      .set(commonHeaders)
      .send({
        name: createProductDto.name,
        price: 20,
        collection: createProductDto.collection,
        stock: createProductDto.stock,
        color: 'black',
        size: createProductDto.size,
        category: createProductDto.category,
        images: createProductDto.images,
      });

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
  });

  it('respons should be with BAD_REQUEST status code in case of invalid dto', async () => {
    const creationResponse = await unauthorizedRequest
      .post(productsRoutes.create)
      .set(commonHeaders)
      .send(createProductDto);

    const { id: createdId } = creationResponse.body;

    expect(creationResponse.status).toBe(StatusCodes.CREATED);

    const response = await unauthorizedRequest
      .put(productsRoutes.update(createdId))
      .set(commonHeaders)
      .send({
        name: 20,
        price: null,
        collection: createProductDto.collection,
        stock: createProductDto.stock,
        color: createProductDto.color,
        size: 'some string',
        category: createProductDto.category,
        images: createProductDto.images,
      });

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);

    const cleanupResponse = await unauthorizedRequest
      .delete(productsRoutes.delete(createdId))
      .set(commonHeaders);

    expect(cleanupResponse.statusCode).toBe(StatusCodes.OK);
    expect(cleanupResponse.body.message).toBe(MessageStatus.PRODUCT_DELETE_SUCCESS);
  });

  it("respons should be  with NOT_FOUND status code in case if product doesn't exist", async () => {
    const response = await unauthorizedRequest
      .put(productsRoutes.update(randomUUID))
      .set(commonHeaders)
      .send({
        name: createProductDto.name,
        price: 20,
        collection: createProductDto.collection,
        stock: createProductDto.stock,
        color: 'black',
        size: createProductDto.size,
        category: createProductDto.category,
        images: createProductDto.images,
      });

    expect(response.status).toBe(StatusCodes.NOT_FOUND);
    expect(response.body.message).toBe(MessageStatus.PRODUCT_NOT_FOUND);
  });
});

describe('DELETE', () => {
  it('should correctly delete product', async () => {
    const response = await unauthorizedRequest
      .post(productsRoutes.create)
      .set(commonHeaders)
      .send(createProductDto);

    const { id } = response.body;

    expect(response.status).toBe(StatusCodes.CREATED);

    const cleanupResponse = await unauthorizedRequest
      .delete(productsRoutes.delete(id))
      .set(commonHeaders);

    expect(cleanupResponse.statusCode).toBe(StatusCodes.OK);
    expect(cleanupResponse.body.message).toBe(MessageStatus.PRODUCT_DELETE_SUCCESS);

    const searchResponse = await unauthorizedRequest
      .get(productsRoutes.getById(id))
      .set(commonHeaders);

    expect(searchResponse.status).toBe(StatusCodes.NOT_FOUND);
    expect(searchResponse.body.message).toBe(MessageStatus.PRODUCT_NOT_FOUND);
  });

  it('respons should be with BAD_REQUEST status code in case of invalid id', async () => {
    const response = await unauthorizedRequest
      .delete(productsRoutes.delete('invalid-id'))
      .set(commonHeaders);

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
  });

  it("respons should be with NOT_FOUND status code in case if product doesn't exist", async () => {
    const response = await unauthorizedRequest
      .delete(productsRoutes.delete(randomUUID))
      .set(commonHeaders);

    expect(response.status).toBe(StatusCodes.NOT_FOUND);
    expect(response.body.message).toBe(MessageStatus.PRODUCT_NOT_FOUND);
  });

  it('should correctly delete all product', async () => {
    const responses = await Promise.all([
      unauthorizedRequest.post(productsRoutes.create).set(commonHeaders).send(createProductDto),
      unauthorizedRequest.post(productsRoutes.create).set(commonHeaders).send(createProductDto),
      unauthorizedRequest.post(productsRoutes.create).set(commonHeaders).send(createProductDto),
    ]);

    expect(responses.every(({ statusCode }) => statusCode === StatusCodes.CREATED)).toBe(true);

    const cleanupResponse = await unauthorizedRequest
      .delete(productsRoutes.deleteAll)
      .set(commonHeaders);

    expect(cleanupResponse.statusCode).toBe(StatusCodes.OK);
    expect(cleanupResponse.body.message).toBe(MessageStatus.PRODUCTS_DELETE_SUCCESS);

    const searchResponse = await unauthorizedRequest.get(productsRoutes.getAll).set(commonHeaders);

    expect(searchResponse.status).toBe(StatusCodes.OK);
    expect(searchResponse.body).toBeInstanceOf(Array);
    expect(searchResponse.body.length).toBe(0);
  });

  it("respons should be with NOT_FOUND status code in case if products doesn't exist, empty array", async () => {
    const cleanupResponse = await unauthorizedRequest
      .delete(productsRoutes.deleteAll)
      .set(commonHeaders);

    expect(cleanupResponse.statusCode).toBe(StatusCodes.NOT_FOUND);
    expect(cleanupResponse.body.message).toBe(MessageStatus.PRODUCTS_NOT_FOUND);

    const productsJSON = await loadProducts('src/data/products.json');
    const response = await unauthorizedRequest
      .post(productsRoutes.insertAll)
      .set(commonHeaders)
      .send(productsJSON);

    expect(response.status).toBe(StatusCodes.CREATED);
    expect(response.body.message).toBe(MessageStatus.PRODUCTS_INSERT_SUCCESS);
  });
});
