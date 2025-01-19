# Nodepop Fundamentos
   # Introducción:
        Nodepop es una API RESTful diseñada para gestionar productos con funcionalidades avanzadas como filtros, paginación, autenticación mediante JWT y más. Es ideal para construir aplicaciones que necesiten manejar un catálogo de productos y usuarios.

        La API requiere un token JWT para acceder a la mayoría de las rutas protegidas. Este token debe incluirse en el encabezado Authorization como Bearer <token> en herramientas como Postman.

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
    Base URL: http://localhost:3000/
    ```
    GET /api/products

## LOGIN 
        Iniciar sesión y obtener un token JWT (POST /api/login)

        En el cuerpo de la solicitud, debes enviar un objeto JSON con el email y el password del usuario registrado:
    
## Uso del token JWT en Postman
1.  Copia el token obtenido al iniciar sesión.
2.  Cada solicitud protegida, añade el encabezado Authorization

## References

### UI fragments

- https://getbootstrap.com/docs/5.3/examples/
- https://getbootstrap.com/docs/5.3/examples/headers/
- https://getbootstrap.com/docs/5.3/forms/form-control/
- https://icons.getbootstrap.com/#install
