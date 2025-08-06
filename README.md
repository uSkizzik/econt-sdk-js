# Econt SDK JS

Econt SDK JS is a library that provides you with type-safe functions to access almost the entire Econt JSON API.  
The library itself is mostly automatically generated using the documentation of the API, with minimal adjustments.

## Installation

`npm install econt-sdk-js`
`yarn add econt-sdk-js`

## Usage

`.env`
```
ECONT_USER=USER
ECONT_PASSWORD=PASSWORD
```

`./lib/econt.ts`
```ts
import EcontClient from "econt-sdk-js"

export const econtClient = new EcontClient(false, process.env.ECONT_USER, process.env.ECONT_PASSWORD)
```

Example:
```ts
import { econtClient } from "./lib/econt.ts"

instance.nomenclatures.getCountries().then((countries) => {
	console.log(countries.countries)
})
```

### Documentation

Pretty much all you need to know is included above.  
You can see the Econt API Reference [here](https://ee.econt.com/services).  
And you can find the Econt API docs [here](https://www.econt.com/developers/soap-json-api.html).
