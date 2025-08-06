import { ShipmentType } from "@/src/Shipments"

export enum dayType {
	WORKDAY = "workday",
	HALFDAY = "halfday",
	HOLIDAY = "holiday"
}

/**
 * Country. Required fields for valid country - ID or code (code2 or code3)
 */
export type Country = {
	id: number
	/**
	 * ISO 3166-1 alpha-2 code (e.g. BG, GB, GR)
	 */
	code2: string
	/**
	 * ISO 3166-1 alpha-3 code (e.g. BGR ,GBR, GRC)
	 */
	code3: string
	/**
	 * The bulgarian name of the country
	 */
	name: string
	/**
	 * The international name of the country
	 */
	nameEn: string
	/**
	 * True if country is a member of the EU
	 */
	isEU: boolean
}

/**
 * Address. Required fields for valid address - city, street and street number (or quarter and other). Use respective fields or all joined together in the field &lt;fullAddress&gt;
 */
export type Address = {
	id: number
	/**
	 * The city where the address is located
	 */
	city: City
	/**
	 * The whole address
	 */
	fullAddress: string
	/**
	 * The whole address in English
	 */
	fullAddressEn: string
	/**
	 * Quarter name
	 */
	quarter: string
	/**
	 * Street name
	 */
	street: string
	/**
	 * Street number
	 */
	num: string
	/**
	 * Block number, entrance number, floor, apartment number and other additional information
	 */
	other: string
	/**
	 * Geo coordinates
	 */
	location: GeoLocation
	/**
	 * ZIP code
	 */
	zip: string
	hezid: string
}

/**
 * City served by Econt Express. Required fields for valid city - ID or name + post code (if the City is outside Bulgaria, country is required)
 */
export type City = {
	id: number
	/**
	 * The country where the city is located
	 */
	country: Country
	/**
	 * Post code
	 */
	postCode: string
	/**
	 * Bulgarian name
	 */
	name: string
	/**
	 * International name
	 */
	nameEn: string
	/**
	 * Bulgarian name of the region
	 */
	regionName: string
	/**
	 * International name of the region
	 */
	regionNameEn: string
	/**
	 * The phone prefix code for the city
	 */
	phoneCode: string
	/**
	 * Geo location
	 */
	location: GeoLocation
	/**
	 * Indicates if express city deliveries are available
	 */
	expressCityDeliveries: boolean
	/**
	 * Indicates if the city is serviced on Monday
	 */
	monday: boolean
	/**
	 * Indicates if the city is serviced on Tuesday
	 */
	tuesday: boolean
	/**
	 * Indicates if the city is serviced on Wednesday
	 */
	wednesday: boolean
	/**
	 * Indicates if the city is serviced on Thursday
	 */
	thursday: boolean
	/**
	 * Indicates if the city is serviced on Friday
	 */
	friday: boolean
	/**
	 * Indicates if the city is serviced on Saturday
	 */
	saturday: boolean
	/**
	 * Indicates if the city is serviced on Sunday
	 */
	sunday: boolean
	/**
	 * Number of days needed to deliver to this city.
	 */
	serviceDays: number
	/**
	 * Id of the zone in which the city is located.
	 */
	zoneId: number
	/**
	 * Name of the zone in which the city is located.
	 */
	zoneName: string
	/**
	 * International name of the zone in which the city is located.
	 */
	zoneNameEn: string
	/**
	 * Offices and types.ts of shipments they serve
	 */
	servingOffices: ServingOfficeElement[]
}

/**
 * Office of Econt Express. Required fields for identifying an office - code or ID
 */
export type Office = {
	id: number
	/**
	 * A code identifying the office
	 */
	code: string
	/**
	 * True if the office is a mobile post station
	 */
	isMPS: boolean
	/**
	 * True if the office is an automatic post station
	 */
	isAPS: boolean
	/**
	 * The bulgarian name of the office
	 */
	name: string
	/**
	 * The international name of the office
	 */
	nameEn: string
	/**
	 * A list of phone numbers for the office
	 */
	phones: string[]
	/**
	 * A list of email addresses for the office
	 */
	emails: string[]
	/**
	 * The address where the office is located
	 */
	address: Address
	/**
	 * Additional information
	 */
	info: string
	/**
	 * The currency the office works with
	 */
	currency: string
	/**
	 * The language the office works with
	 */
	language: string
	/**
	 * Business hours for parcel pickup and delivery from/to an address on weekdays
	 */
	normalBusinessHoursFrom: number
	/**
	 * Business hours for parcel pickup and delivery from/to an address on weekdays
	 */
	normalBusinessHoursTo: number
	/**
	 * Business hours for parcel pickup and delivery from/to an address on saturdays
	 */
	halfDayBusinessHoursFrom: number
	/**
	 * Business hours for parcel pickup and delivery from/to an address on saturdays
	 */
	halfDayBusinessHoursTo: number
	/**
	 * Types of shipments which can be sent/collected to/from the office
	 */
	shipmentTypes: ShipmentType[]
	/**
	 * Partner code
	 */
	partnerCode: string
	/**
	 * Code of the distribution center associated with the office
	 */
	hubCode: string
	/**
	 * Name of the distribution center associated with the office
	 */
	hubName: string
	/**
	 * International name of the distribution center associated with the office
	 */
	hubNameEn: string
	/**
	 * True if the office is a Econt Drive
	 */
	isDrive: boolean
}

/**
 * Quarter of the city
 */
export type Quarter = {
	id: number
	/**
	 * ID of the city
	 */
	cityID: number
	/**
	 * Bulgarian name of the quarter
	 */
	name: string
	/**
	 * International name of the quarter
	 */
	nameEn: string
}

/**
 * A geographic location
 */
export type GeoLocation = {
	/**
	 * Geographic coordinate that specifies the north–south position of a point on the Earth's surface
	 */
	latitude: number
	/**
	 * Geographic coordinate that specifies the east-west position of a point on the Earth's surface
	 */
	longitude: number
	/**
	 * The expected accuracy of the location:
0-none, there are either no coordinates or the coordinates do not represent the location;
1-low;
2-medium;
3-high;
	 */
	confidence: number
}

/**
 * Street in the city
 */
export type Street = {
	id: number
	/**
	 * ID of the city
	 */
	cityID: number
	/**
	 * Bulgarian name of the street
	 */
	name: string
	/**
	 * International name of the street
	 */
	nameEn: string
}

/**
 * Working hours span
 */
export type WorkingTime = { start: string; end: string }

/**
 * Working date and hours span
 */
export type WorkingDateTime = { dayType: dayType; day: string; start: string; end: string }

export type ServingOfficeElement = {
	/**
	 * Office code
	 */
	officeCode: string
	/**
	 * The possible service types.ts are as follows - from_door_courier ,to_door_courier, from_office_courier, to_office_courier, from_door_cargo, to_door_cargo, from_office_cargo, to_office_cargo, from_door_post, to_door_post, from_office_post, to_office_post, code1, from_door_cargo_expres, to_door_cargo_expres, from_office_cargo_expres, to_office_cargo_expres, to_door_trans_pallet, to_office_trans_pallet
	 */
	servingType: string
}
