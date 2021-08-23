# next-typescript-sample

Create a [Next.js](https://nextjs.org/) sample app powered by [Vercel](https://vercel.com/).

This is a starter template for [Learn Next.js](https://nextjs.org/learn).

## Demo Page

- [https://next-typescript-sample-mu.vercel.app/](https://next-typescript-sample-mu.vercel.app/)

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
% http POST localhost:3000/api/auth id=test@test.com password=admin
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 201
Content-Type: application/json; charset=utf-8
Date: Mon, 23 Aug 2021 23:29:25 GMT
ETag: "c9-6kjwixFGqj2C2hgCqf35OBK/l+Y"
Keep-Alive: timeout=5
Vary: Accept-Encoding

{
    "status": "ok",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Mjk3NjQ5NjQsInBheWxvYWQiOnsidXNlciI6InRlc3RAdGVzdC5jb20ifSwiaWF0IjoxNjI5NzYxMzY0fQ.3M5XsLvIfiCcUcux6Ygs5X1GTksMtopwXPjf-cJdhr0"
}
```

#### Sign Out

```
% http POST localhost:3000/api/auth/signout
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 15
Content-Type: application/json; charset=utf-8
Date: Thu, 19 Aug 2021 08:58:59 GMT
ETag: "f-VaSQ4oDUiZblZNAEkkN+sX+q3Sg"
Keep-Alive: timeout=5
Vary: Accept-Encoding

{
    "status": "ok"
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

#### Change Password

```
% http POST localhost:3000/api/password/change password=after
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 15
Content-Type: application/json; charset=utf-8
Date: Wed, 18 Aug 2021 05:47:58 GMT
ETag: "f-VaSQ4oDUiZblZNAEkkN+sX+q3Sg"
Keep-Alive: timeout=5
Vary: Accept-Encoding

{
    "status": "ok"
}
```

#### Verify Code

```
% http POST localhost:3000/api/code/verify code=123456
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 15
Content-Type: application/json; charset=utf-8
Date: Wed, 18 Aug 2021 05:49:36 GMT
ETag: "f-VaSQ4oDUiZblZNAEkkN+sX+q3Sg"
Keep-Alive: timeout=5
Vary: Accept-Encoding

{
    "status": "ok"
}
```

### Product

#### Get

- findAll

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
