import { Weekday } from "@/src/core"
import { Address } from "@/src/Nomenclatures"
import { Instruction } from "@/src/Shipments"

/**
 * Information about the client profile (corporate or private)
 */
export type ClientProfile = {
	id: number
	/**
	 * Name
	 */
	name: string
	/**
	 * International name
	 */
	nameEn: string
	/**
	 * Phone numbers (only digits and optional "+" in the beginning)
	 */
	phones: string[]
	/**
	 * E-mail addresses
	 */
	email: string
	/**
	 * Skype accounts
	 */
	skypeAccounts: string[]
	/**
	 * Client number
	 */
	clientNumber: string
	/**
	 * Client number (en)
	 */
	clientNumberEn: string
	/**
	 * The client is a company
	 */
	juridicalEntity: boolean
	/**
	 * Personal identification type (EGN, PIN, PK, PASSPORT)
	 */
	personalIDType: string
	/**
	 * Personal ID number (EGN)
	 */
	personalIDNumber: string
	/**
	 * Company type (registration of the company)
	 */
	companyType: string
	/**
	 * Registration number
	 */
	ein: string
	/**
	 * VAT registration prefix (two-letter code)
	 */
	ddsEinPrefix: string
	/**
	 * VAT registration
	 */
	ddsEin: string
	/**
	 * Company's registration address
	 */
	registrationAddress: string
	/**
	 * Name of the company's representative
	 */
	molName: string
	/**
	 * Unique citizenship number (EGN) of the company's representative
	 */
	molEGN: string
	/**
	 * ID cart of the company's representative
	 */
	molIDNum: string
}

/**
 * Payment options for "cash on delivery" service
 */
export type CDPayOptions = {
	/**
	 * Shipment number
	 */
	num: string
	/**
	 * Client
	 */
	client: ClientProfile
	/**
	 * Payment with money transfer
	 */
	moneyTransfer: boolean
	/**
	 * Express
	 */
	express: boolean
	/**
	 * "Office", "door" or "bank"
	 */
	method: string
	/**
	 * Address
	 */
	address: Address
	/**
	 * Office code
	 */
	officeCode: string
	/**
	 * International Bank Account Number
	 */
	IBAN: string
	/**
	 * Bank Identifier Code
	 */
	BIC: string
	/**
	 * Currency of the bank account
	 */
	bankCurrency: string
	/**
	 * Only for method=bank, either payDays or payWeekdays
	 */
	payDays: number[]
	/**
	 * Only for method=bank, either payDays or payWeekdays
	 */
	payWeekdays: Weekday[]
	/**
	 * Additional instructions
	 */
	additionalInstructions: string
	departamentNum: number
}

/**
 * Information about the client's addresses, "cash on delivery" payment options and templates with instructions
 */
export type ProfilesResponseElement = {
	/**
	 * Client information
	 */
	client: ClientProfile
	/**
	 * Addresses
	 */
	addresses: Address[]
	/**
	 * "Cash on delivery" payment options
	 */
	cdPayOptions: CDPayOptions[]
	/**
	 * Templates with instructions
	 */
	instructionTemplates: Instruction[]
}
