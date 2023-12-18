# <img src="https://github.com/AlexeiKozlovskiy/online-store-react/blob/develop/public/favicon.ico" alt="image" width="30" height="30"> Online-store-nest 

This is a repository of my NestJS servise for full stack app Online store. Thise servise performs a tasks creating, updating and storing products and users. Service using Prisma database. Authorization is protected and performed using a bearer token with it is update.

## Frontend part in [here](https://github.com/AlexeiKozlovskiy/online-store-react).

## Deploy whole app in [here](https://online-store-react-94.netlify.app/).
First fetching data is can take near 1-3 minutes, further is fast.

## Deploy this backend servise and data base in [here](https://render.com/).
<img src="https://github.com/AlexeiKozlovskiy/online-store-react/blob/develop/public/assets/readme/back-deploy2.png" alt="image" width="700">

## Details 
Servise used followings REST endpoints:

 * `products` (`/products` route)
    * `GET /products` - get all tracks
      - Server answer with `status code` **200** and all products records
      - Server answer with `status code` **404** and message `Products not found` if list of products doesn't exist, empty array
    * `GET /products/:id` - get single product by id
      - Server answer with `status code` **200** if product it exists.
      - Server answer with `status code` **404** and message `Product not found` if product doesn't exist
    * `POST /products` - create new product
      - Server answer with `status code` **201** and message `Product created successfully` if fields is correctly
      - Server answer with `status code` **400** and message if request `body` does not contain **required** fields, or it's the wrong type
    * `POST /products/insertAll` - create new products, from a file with a list of products. 
      - Server answer with `status code` **201** and message `Products inserted successfully` if fields is correctly
      - Server answer with `status code` **404** and message `Some products fields is invalid` if request `body` does not contain **required** fields, or they are the wrong type
    * `PUT /products/:id` - update products info
      - Server answer with `status code` **200** and message `Product updated successfully` if fields is correctly
      - Server answer with `status code` **400** and message if request `body` does not contain **required** fields, or it's the wrong type
      - Server answer with `status code` **404** and message `Product not found` if record with `id === products` doesn't exist
    * `DELETE /products/:id` - delete product
      - Server answer with `status code` **200** if the record is found and deleted, and message `Product deleted successfully`
      - Server answer with `status code` **400** and message if `productsId` is invalid (not `uuid`)
      - Server answer with `status code` **404** and message `Product not found` if record with `id === products` doesn't exist
   * `DELETE /products/deleteAll` - delete all products
      - Server answer with `status code` **200** if the record is found and deleted, and message `All products deleted successfully`
      - Server answer with `status code` **404** and message `Products not found` if list of products doesn't exist, or deleted previously


 * `auth` (`/auth` route)
    * `POST auth/register` - for user registrations
      - Server answer with `status code` **200** and auth records (id, email, login, picture, isGoogle)
      - Server answer with `status code` **409** and message `This email is already registered` if user is already registered
    * `POST auth/login` - for user login
      - Server answer with `status code` **200** and auth records (accessToken, refreshToken, expiresIn, id, email, login, picture, isGoogle)
      - Server answer with `status code` **401** and message `Unauthorized` if user have error login, incorrect password or email
    * `POST auth/login/google` - for user google login
      - Server answer with `status code` **200** and auth records (accessToken, refreshToken, expiresIn)
    * `POST auth/refresh` - for refresh auth tokens
      - Server answer with `status code` **200** and auth records (accessToken, refreshToken, expiresIn)

 * `user` (`/user` route)
    * `GET user/:id` - get user by id
      - Server answer with `status code` **200** if user it exists (id, email, login, picture, isGoogle)
      - Server answer with `status code` **401** and message `Unauthorized` if user not authorized

 * `profile` (`/profile` route)
    * `GET profile/:id` - get profile by id
      - Server answer with `status code` **200** if profile it exists.
      - Server answer with `status code` **204** and message `User profile is empty` if profile user is empty data.
    * `POST /profile/create` - create new profile
      - Server answer with `status code` **200** and profile records
      - Server answer with `status code` **400** and message if request `body` does not contain **required** fields, or it's the wrong type
    * `PUT /profile/update` - update profile info
      - Server answer with `status code` **200** and profile records
      - Server answer with `status code` **400** and message if request `body` does not contain **required** fields, or it's the wrong type



##  Stack
- TS
- NestJS
- Prisma

## Installation
To run this project locally, follow these steps:

- Clone this repository. `https://github.com/AlexeiKozlovskiy/online-store-nest.git`
- Checkout to the development branch `git checkout develop`
- Install dependencies using `npm install`.
- Rename `.env.example` to `.env`
- Run locally with SSR mode `npm run start` or `npm run start` .
