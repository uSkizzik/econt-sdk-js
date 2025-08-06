import { EcontClient } from "@/src"

const instance = new EcontClient(true)
instance.nomenclatures.getCountries().then((countries) => {
	console.log(countries.countries)
})
