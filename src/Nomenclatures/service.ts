import { AbstractService } from "@/src/core/core.ts"
import { Address, Country, City, Office, Street, Quarter, WorkingTime, WorkingDateTime } from "@/src/Nomenclatures/types.ts"

class NomenclaturesService extends AbstractService {
	/**
	 * All countries where Econt Express operates
	 */
	async getCountries(): Promise<{ countries: Country[] }> {
		return this.http("/services/Nomenclatures/NomenclaturesService.getCountries.json", {}) as Promise<{ countries: Country[] }>
	}

	/**
	 * Method for requesting the cities in a country
	 * @param countryCode Three-letter ISO Alpha-3 code of the country (e.g. AUT, BGR, etc.)
	 */
	async getCities(countryCode: string): Promise<{ cities: City[] }> {
		return this.http("/services/Nomenclatures/NomenclaturesService.getCities.json", { countryCode }) as Promise<{ cities: City[] }>
	}

	/**
	 * All offices of Econt Express in a country
	 * @param countryCode Three-letter ISO Alpha-3 code of the country (e.g. AUT, BGR, etc.)
	 * @param cityID ID of the city (optional)
	 * @param showCargoReceptions Show cargo reception offices.
	 * @param showLC Show logistic center offices.
	 * @param servingReceptions Show offices witch serving the city from reception.
	 */
	async getOffices(countryCode: string, cityID: number, showCargoReceptions: boolean, showLC: boolean, servingReceptions: boolean): Promise<{ offices: Office[] }> {
		return this.http("/services/Nomenclatures/NomenclaturesService.getOffices.json", { countryCode, cityID, showCargoReceptions, showLC, servingReceptions }) as Promise<{ offices: Office[] }>
	}

	/**
	 * Requests all streets in a city
	 * @param cityID ID of the city (optional)
	 */
	async getStreets(cityID: number): Promise<{ streets: Street[] }> {
		return this.http("/services/Nomenclatures/NomenclaturesService.getStreets.json", { cityID }) as Promise<{ streets: Street[] }>
	}

	/**
	 * Request all quarters in a city
	 * @param cityID ID of the city (optional)
	 */
	async getQuarters(cityID: number): Promise<{ quarters: Quarter[] }> {
		return this.http("/services/Nomenclatures/NomenclaturesService.getQuarters.json", { cityID }) as Promise<{ quarters: Quarter[] }>
	}

	/**
	 * Validates address based on input parameters
	 * @param address Address (minimum required parameters: city name, street name and street number or quarter and other)
	 */
	async validateAddress(address: Address): Promise<{ address: Address; validationStatus: string }> {
		return this.http("/services/Nomenclatures/AddressService.validateAddress.json", { address }) as Promise<{ address: Address; validationStatus: string }>
	}

	/**
	 * Geolocates an address and provides service times for that address.
	 * @param city ID of the city - check getCities method.
	 * @param address Address to check for servicing
	 * @param date The date for which to check servicing
	 * @param shipmentType
	 */
	async addressServiceTimes(city: number, address: string, date: number, shipmentType: any): Promise<{ serviceOffice: Office; serviceOfficeLatitude: number; serviceOfficeLongitude: number; serviceOfficeClientsWorkTimes: WorkingTime[]; serviceOfficeCourierWorkTimes: WorkingTime[]; serviceOfficeTime: WorkingDateTime; serviceOfficeNext30daysWorkTime: WorkingDateTime[] }> {
		return this.http("/services/Nomenclatures/AddressService.addressServiceTimes.json", { city, address, date, shipmentType }) as Promise<{ serviceOffice: Office; serviceOfficeLatitude: number; serviceOfficeLongitude: number; serviceOfficeClientsWorkTimes: WorkingTime[]; serviceOfficeCourierWorkTimes: WorkingTime[]; serviceOfficeTime: WorkingDateTime; serviceOfficeNext30daysWorkTime: WorkingDateTime[] }>
	}

	/**
	 * Information service for offices near given address
	 * @param address Аddress
	 * @param shipmentType Shipment type
	 */
	async getNearestOffices(address: Address, shipmentType: any): Promise<{ offices: Office[] }> {
		return this.http("/services/Nomenclatures/AddressService.getNearestOffices.json", { address, shipmentType }) as Promise<{ offices: Office[] }>
	}
}
