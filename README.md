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
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Origin: *
Connection: keep-alive
Content-Length: 394
Content-Type: application/json; charset=utf-8
Date: Fri, 17 May 2024 10:17:01 GMT
ETag: "18a-YxvWFfvmnbsudkJJ4TTgo1ce+FA"
Keep-Alive: timeout=5
Set-Cookie: refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTY1NDU4MjAsInBheWxvYWQiOnsidXNlciI6InRlc3RAdGVzdC5jb20ifSwiaWF0IjoxNzE1OTQxMDIwfQ.4kcZ2GH7qJwDTCCneHUj8uwlcmnPD1blXRtgnTbOrb4; Max-Age=604800; Path=/; HttpOnly; SameSite=Strict
Vary: Accept-Encoding

{
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTY1NDU4MjAsInBheWxvYWQiOnsidXNlciI6InRlc3RAdGVzdC5jb20ifSwiaWF0IjoxNzE1OTQxMDIwfQ.4kcZ2GH7qJwDTCCneHUj8uwlcmnPD1blXRtgnTbOrb4",
    "status": "ok",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTU5NDEwMjAsInBheWxvYWQiOnsidXNlciI6InRlc3RAdGVzdC5jb20ifSwiaWF0IjoxNzE1OTQxMDIwfQ.FvPQhS4SDhsLkPwEIo9jbOaPDlMIeSOiq01nso-4fM4"
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

#### Get Permisson 

```
$ http localhost:3000/api/auth/permissions Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTYxNzIyMjMsInBheWxvYWQiOnsidXNlciI6InRlc3RAdGVzdC5jb20iLCJyb2xlIjoidXNlciJ9LCJpYXQiOjE3MTYxNjg2MjN9.3PWJF0ibVh7BwaC2xV7dHavnvQwmhW8qkJrPuGvVDpM'
HTTP/1.1 200 OK
Access-Control-Allow-Headers: *
Access-Control-Allow-Methods: GET, OPTIONS
Access-Control-Allow-Origin: *
Connection: keep-alive
Content-Length: 158
Content-Type: application/json; charset=utf-8
Date: Mon, 20 May 2024 01:34:29 GMT
ETag: "9e-uyDVjhu2j3xsqjS8Dud7Gx7zBas"
Keep-Alive: timeout=5
Vary: Accept-Encoding

{
    "permissions": [
        {
            "namespace": "product",
            "operation": "view"
        },
        {
            "namespace": "order",
            "operation": "create"
        },
        {
            "namespace": "order",
            "operation": "view"
        }
    ],
    "status": "ok"
}
```

#### Token Refresh

```
$ http POST localhost:3000/api/auth/refreshTokenCheck 'Cookie:refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTY1NDU4MjAsInBheWxvYWQiOnsidXNlciI6InRlc3RAdGVzdC5jb20ifSwiaWF0IjoxNzE1OTQxMDIwfQ.4kcZ2GH7qJwDTCCneHUj8uwlcmnPD1blXRtgnTbOrb4'
HTTP/1.1 200 OK
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Origin: *
Connection: keep-alive
Content-Length: 154
Content-Type: application/json; charset=utf-8
Date: Fri, 17 May 2024 10:20:40 GMT
ETag: "9a-x4wAb7VqEzpy5Lw11nvelKU82kU"
Keep-Alive: timeout=5
Vary: Accept-Encoding

{
    "status": "ok",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTU5NDEyNDAsImlhdCI6MTcxNTk0MTI0MH0.Xobe4Bf4T9qQnudnrpln1nhbVMHpf60_1eSl9o76bC8"
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

- find

```
% http 'localhost:3000/api/products/get?id=1'
HTTP/1.1 200 OK
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Methods: GET, OPTIONS
Access-Control-Allow-Origin: *
Connection: keep-alive
Content-Length: 102
Content-Type: application/json; charset=utf-8
Date: Thu, 16 May 2024 07:30:37 GMT
ETag: "66-iuGdBZkk9ljc2lvh62laBFM7VG0"
Keep-Alive: timeout=5
Vary: Accept-Encoding

{
    "description": "16oz package of fresh organic strawberries",
    "id": 1,
    "name": "Strawberries",
    "quantity": 1
}
```

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
