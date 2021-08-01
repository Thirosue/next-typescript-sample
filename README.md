# next-typescript-sample

Create a [Next.js](https://nextjs.org/) sample app powered by [Vercel](https://vercel.com/). 

This is a starter template for [Learn Next.js](https://nextjs.org/learn).

## Demo Page

* [https://next-typescript-sample-mu.vercel.app/](https://next-typescript-sample-mu.vercel.app/)

## SetUp

```
yarn
```

```
yarn dev
```

## Api Call by httpie

### Auth

#### Login

```
% http POST localhost:3000/api/auth id=admin password=admin
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 190
Content-Type: application/json; charset=utf-8
Date: Sun, 01 Aug 2021 05:36:28 GMT
ETag: "be-EUwSL/sFHYoNqEfq43k2ciEXYog"
Keep-Alive: timeout=5
Vary: Accept-Encoding

{
    "status": "ok",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Mjc3OTk3ODgsInBheWxvYWQiOnsidXNlciI6ImFkbWluIn0sImlhdCI6MTYyNzc5NjE4OH0.vkZzymb3hyftl2pb75wuLKaavfnZV5ZlR88aISIQOBQ"
}
```

#### Session Check

```
% http POST localhost:3000/api/auth/check "authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Mjc3OTk3ODgsInBheWxvYWQiOnsidXNlciI6ImFkbWluIn0sImlhdCI6MTYyNzc5NjE4OH0.vkZzymb3hyftl2pb75wuLKaavfnZV5ZlR88aISIQOBQ"
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 154
Content-Type: application/json; charset=utf-8
Date: Sun, 01 Aug 2021 05:37:18 GMT
ETag: "9a-WG2wB4ewrnriUOAqysn9WZKtyC4"
Keep-Alive: timeout=5
Vary: Accept-Encoding

{
    "status": "ok",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Mjc3OTk4MzgsImlhdCI6MTYyNzc5NjIzOH0.r7KYW3z8md7ZqN94TEuWRKoLRGB8Up6dAGkQrF7J9CE"
}
```

### Product

#### Get

* findAll

```
% http 'localhost:3000/api/products?page=0&rows=5'
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 418
Content-Type: application/json; charset=utf-8
Date: Fri, 23 Jul 2021 06:28:56 GMT
ETag: "1a2-U2ohMMGmi3qNYLxR2flXsEJkdWk"
Keep-Alive: timeout=5
Vary: Accept-Encoding

{
    "count": 16,
    "data": [
        {
            "description": "16oz package of fresh organic strawberries",
            "id": 1,
            "name": "Strawberries",
            "quantity": 1
        },
        {
            "description": "Loaf of fresh sliced wheat bread",
            "id": 2,
            "name": "Sliced bread",
            "quantity": 2
        },
        {
            "description": "Bag of 7 fresh McIntosh apples",
            "id": 3,
            "name": "Apples",
            "quantity": 3
        },
        {
            "description": "no.4",
            "id": 4,
            "name": "Item4",
            "quantity": 4
        },
        {
            "description": "no.5",
            "id": 5,
            "name": "Item5",
            "quantity": 5
        }
    ]
}
```

#### Post

```
% http POST localhost:3000/api/products/post name=hoge description=hoge quantity=777
HTTP/1.1 201 Created
Connection: keep-alive
Content-Length: 62
Content-Type: application/json; charset=utf-8
Date: Fri, 23 Jul 2021 06:26:47 GMT
ETag: "3e-jwZIwKhCJX29WAxEMJMPwUd7Hgk"
Keep-Alive: timeout=5
Vary: Accept-Encoding

{
    "description": "hoge",
    "id": 936,
    "name": "hoge",
    "quantity": "777"
}
```

#### Put

```
% http PUT 'localhost:3000/api/products/put?id=4' name=hoge description=hoge quantity=777
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 60
Content-Type: application/json; charset=utf-8
Date: Fri, 23 Jul 2021 06:30:16 GMT
ETag: "3c-n6NUU6qGGHwu3q1V68ShspQ8AVw"
Keep-Alive: timeout=5
Vary: Accept-Encoding

{
    "description": "hoge",
    "id": 4,
    "name": "hoge",
    "quantity": "777"
}
```

#### Delete

```
% http DELETE 'localhost:3000/api/products/delete?id=4'
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 2
Content-Type: application/json; charset=utf-8
Date: Fri, 23 Jul 2021 06:30:55 GMT
ETag: "2-vyGp6PvFo4RvsFtPoIWeCReyIC8"
Keep-Alive: timeout=5
Vary: Accept-Encoding

{}
```