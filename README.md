# Nodepop Fundamentos

## Deploy

### Install dependencies

```sh
npm install
```

### Configure

Copy .env.example to .env and review your config.

### Init database

**Only** on first deploy:

```sh
npm run initDB
```

## Start

To start a single instance:

```sh
npm start
```

To start in development mode:

```sh
npm run dev
```
## API
```sh
Base URL: http://localhost:3000/api
```
GET /api/products
````json
"result": [
        {
            "_id": "6782ff2aeea3da64a06dccf5",
            "name": "watches",
            "price": 350,
            "image": "watch t55.jpg",
            "tags": [
                "mobile"
            ],
            "owner": "6782ff2aeea3da64a06dccee",
            "__v": 0
        },
    ],
    "count": 7

```

## References

### UI fragments

- https://getbootstrap.com/docs/5.3/examples/
- https://getbootstrap.com/docs/5.3/examples/headers/
- https://getbootstrap.com/docs/5.3/forms/form-control/
- https://icons.getbootstrap.com/#install
"# Proyecto-Nodepop-Avanzado" 
