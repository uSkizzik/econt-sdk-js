import { AbstractService } from "@//core"
import { AddressServiceTimesRequest, AddressServiceTimesResponse, GetCitiesRequest, GetCitiesResponse, GetCountriesResponse, GetNearestOfficesRequest, GetNearestOfficesResponse, GetOfficesRequest, GetOfficesResponse, GetQuartersRequest, GetQuartersResponse, GetStreetsRequest, GetStreetsResponse, ValidateAddressRequest, ValidateAddressResponse } from "@//Nomenclatures"

export class NomenclaturesService extends AbstractService {
	/**
	 * All countries where Econt Express operates
	 * @returns Response Body
	 */
	async getCountries(): Promise<GetCountriesResponse> {
		return this.http("/services/Nomenclatures/NomenclaturesService.getCountries.json", {}) as Promise<GetCountriesResponse>
	}

	/**
	 * Method for requesting the cities in a country
	 * @param req Request Body
	 * @returns Response Body
	 */
	async getCities(req: GetCitiesRequest): Promise<GetCitiesResponse> {
		return this.http("/services/Nomenclatures/NomenclaturesService.getCities.json", req) as Promise<GetCitiesResponse>
	}

	/**
	 * All offices of Econt Express in a country
	 * @param req Request Body
	 * @returns Response Body
	 */
	async getOffices(req: GetOfficesRequest): Promise<GetOfficesResponse> {
		return this.http("/services/Nomenclatures/NomenclaturesService.getOffices.json", req) as Promise<GetOfficesResponse>
	}

	/**
	 * Requests all streets in a city
	 * @param req Request Body
	 * @returns Response Body
	 */
	async getStreets(req: GetStreetsRequest): Promise<GetStreetsResponse> {
		return this.http("/services/Nomenclatures/NomenclaturesService.getStreets.json", req) as Promise<GetStreetsResponse>
	}

	/**
	 * Request all quarters in a city
	 * @param req Request Body
	 * @returns Response Body
	 */
	async getQuarters(req: GetQuartersRequest): Promise<GetQuartersResponse> {
		return this.http("/services/Nomenclatures/NomenclaturesService.getQuarters.json", req) as Promise<GetQuartersResponse>
	}

	/**
	 * Validates address based on input parameters
	 * @param req Request Body
	 * @returns Response Body
	 */
	async validateAddress(req: ValidateAddressRequest): Promise<ValidateAddressResponse> {
		return this.http("/services/Nomenclatures/AddressService.validateAddress.json", req) as Promise<ValidateAddressResponse>
	}

	/**
	 * Geolocates an address and provides service times for that address.
	 * @param req Request Body
	 * @returns Response Body
	 */
	async addressServiceTimes(req: AddressServiceTimesRequest): Promise<AddressServiceTimesResponse> {
		return this.http("/services/Nomenclatures/AddressService.addressServiceTimes.json", req) as Promise<AddressServiceTimesResponse>
	}

	/**
	 * Information service for offices near given address
	 * @param req Request Body
	 * @returns Response Body
	 */
	async getNearestOffices(req: GetNearestOfficesRequest): Promise<GetNearestOfficesResponse> {
		return this.http("/services/Nomenclatures/AddressService.getNearestOffices.json", req) as Promise<GetNearestOfficesResponse>
	}
}
