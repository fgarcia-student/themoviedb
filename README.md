# themoviedb api

## Running application

1. Add a .env file in the /api folder with the following values

PORT={port where app will run}
ROOT_URL={root url of the api (https://api.themoviedb.org/3)}
API_KEY={api key}
INCLUDE_ADULT={set to 1 if api should return adult movies}

2. Add a client_env.js file in the /client folder with the following content
```
const client_env = {
  apiUrl: "", // URL where api is hosted
  imageUrl: "" // URL where we can resolve images ("https://image.tmdb.org/t/p")
}
```


3. Run the api by executing the following command from this directory
```
cd api && npm run start
```

4. Run the client by executing the following command from this directory
```
cd client && serve .
```

