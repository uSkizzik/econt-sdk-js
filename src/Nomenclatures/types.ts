import { Address, City, Country, Office, Quarter, Street, WorkingDateTime, WorkingTime } from "@/src/Nomenclatures"
import { ShipmentType } from "@/src/Shipments"

export type GetCountriesResponse = {
	/**
	 * Name of the country
	 */
	countries: Country[]
}

export type GetCitiesRequest = {
	/**
	 * Three-letter ISO Alpha-3 code of the country (e.g. AUT, BGR, etc.)
	 */
	countryCode: string
}

export type GetCitiesResponse = {
	/**
	 * All cities in the requested country code(s)
	 */
	cities: City[]
}

export type GetOfficesRequest = {
	/**
	 * Three-letter ISO Alpha-3 code of the country (e.g. AUT, BGR, etc.)
	 */
	countryCode: string
	/**
	 * ID of the city (optional)
	 */
	cityID: number
	/**
	 * Show cargo reception offices.
	 */
	showCargoReceptions: boolean
	/**
	 * Show logistic center offices.
	 */
	showLC: boolean
	/**
	 * Show offices witch serving the city from reception.
	 */
	servingReceptions: boolean
}

export type GetOfficesResponse = {
	/**
	 * Information about offices (name, address, working hours, coordinates, etc.)
	 */
	offices: Office[]
}

export type GetStreetsRequest = {
	/**
	 * ID of the city (optional)
	 */
	cityID: number
}

export type GetStreetsResponse = {
	/**
	 * Street names
	 */
	streets: Street[]
}

export type GetQuartersRequest = {
	/**
	 * ID of the city (optional)
	 */
	cityID: number
}

export type GetQuartersResponse = {
	/**
	 * Name of the quarter
	 */
	quarters: Quarter[]
}

export type ValidateAddressRequest = {
	/**
	 * Address (minimum required parameters: city name, street name and street number or quarter and other)
	 */
	address: Address
}

export type ValidateAddressResponse = {
	/**
	 * Address details (country, location, etc.)
	 */
	address: Address
	/**
	 * Normal, processed, invalid
	 */
	validationStatus: string
}

export type AddressServiceTimesRequest = {
	/**
	 * ID of the city - check getCities method.
	 */
	city: number
	/**
	 * Address to check for servicing
	 */
	address: string
	/**
	 * The date for which to check servicing
	 */
	date: number
	shipmentType: ShipmentType
}

export type AddressServiceTimesResponse = {
	serviceOffice: Office
	/**
	 * Service office geo location latitude
	 */
	serviceOfficeLatitude: number
	/**
	 * Service office geo location longitude
	 */
	serviceOfficeLongitude: number
	/**
	 * List of time spans available for working with clients
	 */
	serviceOfficeClientsWorkTimes: WorkingTime[]
	/**
	 * List of time spans available for courier request
	 */
	serviceOfficeCourierWorkTimes: WorkingTime[]
	/**
	 * Service time for the requested date
	 */
	serviceOfficeTime: WorkingDateTime
	/**
	 * List of working times for future dates.
	 */
	serviceOfficeNext30daysWorkTime: WorkingDateTime[]
}

export type GetNearestOfficesRequest = {
	/**
	 * Аddress
	 */
	address: Address
	/**
	 * Shipment type
	 */
	shipmentType: ShipmentType
}

export type GetNearestOfficesResponse = {
	/**
	 * List of offices
	 */
	offices: Office[]
}
