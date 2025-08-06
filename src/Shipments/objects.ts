import { HostedFile } from "@/core"
import { Address } from "@/Nomenclatures"
import { CDPayOptions, ClientProfile } from "@/Profile"

export enum ShipmentType {
	/**
	 * Documents (up to 0.5kg)
	 */
	DOCUMENT = "document",
	/**
	 * Parcel (up to 50kg)
	 */
	PACK = "pack",
	/**
	 * Post parcel (up to 20kg, 60x60x60cm and subcode = office-office)
	 */
	POST_PACK = "post_pack",
	/**
	 * Pallet (80x120x180cm and up to 1000kg)
	 */
	PALLET = "pallet",
	/**
	 * Cargo express (palletized shipment over 80x120x180cm up to 200x200x180 and up to 500kg)
	 */
	CARGO = "cargo",
	/**
	 * Pallet + documents
	 */
	DOCUMENTPALLET = "documentpallet",
	/**
	 * Letter (big)
	 */
	BIG_LETTER = "big_letter",
	/**
	 * Letter (small)
	 */
	SMALL_LETTER = "small_letter",
	/**
	 * Money transfer
	 */
	MONEY_TRANSFER = "money_transfer",
	/**
	 * Post transfer
	 */
	PP = "pp"
}

/**
 * Instruction types.ts
 */
export enum InstructionType {
	/**
	 * Instruction type for collecting a shipment from the sender
	 */
	TAKE = "take",
	/**
	 * Instruction type for giving over a shipment to the receiver
	 */
	GIVE = "give",
	/**
	 * Instruction type for returning a shipment
	 */
	RETURN = "return",
	/**
	 * Instruction type for additional services
	 */
	SERVICES = "services"
}

export enum RequestCourierStatusType {
	/**
	 * Not processed
	 */
	UNPROCESS = "unprocess",
	/**
	 * Processed and assigned to a courier
	 */
	PROCESS = "process",
	/**
	 * Shipment is taken from client's address
	 */
	TAKEN = "taken",
	/**
	 * Canceled
	 */
	REJECT = "reject",
	/**
	 * Canceled by client
	 */
	REJECT_CLIENT = "reject_client"
}

/**
 * Parameters for returning shipment instructions
 */
export type ReturnInstructionParams = {
	/**
	 * Destination of the return parcel (empty -&gt; no return parcel, sender -&gt; return to sender, office -&gt; return to office, address -&gt; return to address)
	 */
	returnParcelDestination: string
	/**
	 * Indicates if the return parcel is document (true -&gt; the return shipment is a document, false -&gt; the return shipment is the same type as the original)
	 */
	returnParcelIsDocument: boolean
	/**
	 * Indicates if the return parcel is will have empty pallets (true -&gt; the return shipment is one or more empty pallets, false -&gt; the return shipment is the same type as the original). This option only applies to shipment types.ts of cargo, pallet or documentpallet. The count of all pallet types.ts to return cannot exceed the shipment pack count.
	 */
	returnParcelIsEmptyPallet: boolean
	/**
	 * count of euro pallets to return
	 */
	emptyPalletEuro: number
	/**
	 * count of pallets to return with size 80x120
	 */
	emptyPallet80: number
	/**
	 * count of pallets to return with size 100x120
	 */
	emptyPallet100: number
	/**
	 * count of pallets to return with size 120x120
	 */
	emptyPallet120: number
	/**
	 * The maximum period (in days) for sending the return shipment
	 */
	daysUntilReturn: number
	/**
	 * Payer of the return shipment (sender, receiver)
	 */
	returnParcelPaymentSide: string
	/**
	 * Receiver for the return shipment (if empty -&gt; original sender)
	 */
	returnParcelReceiverClient: ClientProfile
	/**
	 * Receiver's authorized person for the return shipment (if empty -&gt; original sender's authorized person)
	 */
	returnParcelReceiverAgent: ClientProfile
	/**
	 * Receiver's office code for the return shipment (if empty -&gt; original sender's office code)
	 */
	returnParcelReceiverOfficeCode: string
	/**
	 * Receiver's address for the return shipment (if empty -&gt; original sender's address)
	 */
	returnParcelReceiverAddress: Address
	/**
	 * If label for return shipment should be generated upon creation of the first shipment
	 */
	printReturnParcel: boolean
	/**
	 * The actions available if the shipment is rejected:

contact - contact sender (rejectContact)
instruction - text with instructions (rejectInstruction)
return_to_sender - return to sender
return_to_office - return to other - to office (rejectReturnClient, RejectReturnAgent, RejectReturnOfficeCode)
return_to_address - return to other - to address (rejectReturnClient, RejectReturnAgent, RejectReturnAddress)

The fields: rejectInstruction, rejectContact, rejectReturnReceiver or rejectReturnToSender cannot be used at once
	 */
	rejectAction: string
	/**
	 * Text instruction if the shipment is rejected by the receiver
	 */
	rejectInstruction: string
	/**
	 * Phone or e-mail contact if the shipment is rejected by the receiver
	 */
	rejectContact: string
	/**
	 * Client, to whom the original (first) shipment should be returned
	 */
	rejectReturnClient: ClientProfile
	/**
	 * Authorized person, to whom the original (first) shipment should be returned
	 */
	rejectReturnAgent: ClientProfile
	/**
	 * The code of the office, where the original (first) shipment should be returned
	 */
	rejectReturnOfficeCode: string
	/**
	 * Address, where the original (first) shipment should be returned to
	 */
	rejectReturnAddress: Address
	/**
	 * Payer of the original (first) shipment if it is rejected by the receiver after review (sender, receiver)
	 */
	rejectOriginalParcelPaySide: string
	/**
	 * Payer of the return shipment if the original (first) is rejected by the receiver after review (sender, receiver)
	 */
	rejectReturnParcelPaySide: string
	/**
	 * Marks if the returning documents should be signed by the client (returnParcelIsDocument should be 'true')
	 */
	signatureDocuments: boolean
	/**
	 * The color of the pen, which have to be used for signing the documents
	 */
	signaturePenColor: string
	/**
	 * Number of total signatures that have to be done
	 */
	signatureCount: number
	/**
	 * Page numbers of the document where the client should put his signature
	 */
	signaturePageNumbers: string
	/**
	 * Other or additional instructions in free text
	 */
	signatureOtherInstructions: string
	/**
	 * Instruction to be fulfilled in case shipment is refused without being inspected
	 */
	executeIfRejectedWithoutReview: boolean
	/**
	 * Тhe specified reject address will also be used for return instruction
	 */
	useReturnAddressForInstruction: boolean
	/**
	 * Activate return instruction if shipment is unclaimed after X days
	 */
	executeIfNotTaken: number
}

/**
 * Additional instructions for receiving, giving over or returning of shipment
 */
export type Instruction = {
	id: number
	/**
	 * The type of the instruction
	 */
	type: InstructionType
	/**
	 * The title of the instruction for receiving or giving over a shipment
	 */
	title: string
	/**
	 * Content of the instruction for receiving or giving over a shipment
	 */
	description: string
	/**
	 * Attached files with instructions for receiving or giving over a shipment
	 */
	attachments: HostedFile[]
	/**
	 * Recorded voice message with instruction for receiving or giving over a shipment (mp3)
	 */
	voiceDescription: HostedFile
	/**
	 * Instruction parameters for returning a shipment
	 */
	returnInstructionParams: ReturnInstructionParams
	/**
	 * Instruction template name
	 */
	name: string
	/**
	 * Whether or not the template should be applied for all sender's shipments
	 */
	applyToAllParcels: boolean
	/**
	 * Whether or not the template should be applied for all sender's shipments to given receivers
	 */
	applyToReceivers: string[]
}

export type ShippingLabel = {
	/**
	 * Shipment number
	 */
	shipmentNumber: string
	/**
	 * The number of the parent (previous) shipment
	 */
	previousShipmentNumber: string
	/**
	 * The phone number of the receiver of the parent (previous) shipment
	 */
	previousShipmentReceiverPhone: string
	/**
	 * Sender
	 */
	senderClient: ClientProfile
	/**
	 * Authorized sender
	 */
	senderAgent: ClientProfile
	/**
	 * Address of the sender
	 */
	senderAddress: Address
	/**
	 * Office code of the sender
	 */
	senderOfficeCode: string
	/**
	 * E-mail for delivery notification
	 */
	emailOnDelivery: string
	/**
	 * Indicates whether or not a SMS should be send after the delivery
	 */
	smsOnDelivery: string
	/**
	 * Receiver
	 */
	receiverClient: ClientProfile
	/**
	 * Authorized receiver
	 */
	receiverAgent: ClientProfile
	/**
	 * Address of the receiver
	 */
	receiverAddress: Address
	/**
	 * Office code of the receiver
	 */
	receiverOfficeCode: string
	/**
	 * Provider ID of the receiver
	 */
	receiverProviderID: number
	/**
	 * BIC of the receiver
	 */
	receiverBIC: string
	/**
	 * IBAN of the receiver
	 */
	receiverIBAN: string
	/**
	 * Envelope numbers
	 */
	envelopeNumbers: string[]
	/**
	 * Pack count
	 */
	packCount: number
	/**
	 * Packs
	 */
	packs: PackElement[]
	/**
	 * Shipment type
	 */
	shipmentType: ShipmentType
	/**
	 * Weight
	 */
	weight: number
	/**
	 * Indicates if all shipment dimensions are under 60cm (by default: 'false')
	 */
	sizeUnder60cm: boolean
	/**
	 * Shipment dimensions (lenght)
	 */
	shipmentDimensionsL: number
	/**
	 * Shipment dimensions (width)
	 */
	shipmentDimensionsW: number
	/**
	 * Shipment dimensions (height)
	 */
	shipmentDimensionsH: number
	/**
	 * Shipment description
	 */
	shipmentDescription: string
	/**
	 * Order number
	 */
	orderNumber: string
	/**
	 * The date when the shipment is sent
	 */
	sendDate: number
	/**
	 * 'Halfday', 'workday', or specific date (yyyy-mm-dd)
	 */
	holidayDeliveryDay: string
	/**
	 * Indicates if the shipment should be kept upright (ON/OFF)
	 */
	keepUpright: boolean
	/**
	 * Services
	 */
	services: ShippingLabelServices
	/**
	 * Instructions
	 */
	instructions: Instruction[]
	/**
	 * Indicates whether or not the shipment can be checked before payment. This service will be ignored for shipments from/to automatic post stations.
	 */
	payAfterAccept: boolean
	/**
	 * Indicates whether or not the shipment can be tested before payment. This service will be ignored for shipments from/to automatic post stations/Econt Drive.
	 */
	payAfterTest: boolean
	/**
	 * Packing list type - file, digital, loading
	 */
	packingListType: string
	/**
	 * Packing list
	 */
	packingList: PackingListElement[]
	/**
	 * Indicates whether or not partial delivery is allowed
	 */
	partialDelivery: boolean
	/**
	 * Payment method of the sender - &lt;empty&gt;, cash, credit or voucher
	 */
	paymentSenderMethod: string
	/**
	 * Payment method of the receiver - &lt;empty&gt;, cash or credit
	 */
	paymentReceiverMethod: string
	/**
	 * Amount of the payment for the receiver
	 */
	paymentReceiverAmount: number
	/**
	 * Indicates if the payment due from the receiver is a percentage
	 */
	paymentReceiverAmountIsPercent: boolean
	/**
	 * The number of the client who is paying as a third party
	 */
	paymentOtherClientNumber: string
	/**
	 * Amount to be paid from third party
	 */
	paymentOtherAmount: number
	/**
	 * Indicates if the payment due from third party is a percentage
	 */
	paymentOtherAmountIsPercent: boolean
	/**
	 * Mediator for the shipment
	 */
	mediator: string
	/**
	 * Payment token for blocking payments
	 */
	paymentToken: string
	/**
	 * Customs list
	 */
	customsList: CustomsListElement[]
	/**
	 * Customs Invoice number / date (31.12.21)
	 */
	customsInvoice: string
}

export type ShippingLabelServices = {
	/**
	 * Earliest time for delivery (format: HH:MM)
	 */
	priorityTimeFrom: number
	/**
	 * Latest time for delivery (format: HH:MM)
	 */
	priorityTimeTo: number
	/**
	 * Indicates if delivery receipt should be returned to sender (additional service - DC)
	 */
	deliveryReceipt: boolean
	/**
	 * Indicates if delivery receipt should be returned to sender with digital receipt (additional service - EDC)
	 */
	digitalReceipt: boolean
	/**
	 * Indicates if confirmation for receiving goods should be delivered to sender (additional service - DC-CP)
	 */
	goodsReceipt: boolean
	/**
	 * Indicates if it is a two-way shipment (additional service - DP)
	 */
	twoWayShipment: boolean
	/**
	 * Indicates if there is delivery to floor (additional service)
	 */
	deliveryToFloor: boolean
	pack5: number
	pack6: number
	pack8: number
	pack9: number
	pack10: number
	pack12: number
	/**
	 * Indicates if the shipment should be transported with a cooler bag (additional service - REF)
	 */
	refrigeratedPack: number
	/**
	 * The declared value of the shipment
	 */
	declaredValueAmount: number
	/**
	 * The currency of the declared value of the shipment
	 */
	declaredValueCurrency: string
	/**
	 * Money transfer amount
	 */
	moneyTransferAmount: number
	/**
	 * Express money transfer
	 */
	expressMoneyTransfer: boolean
	/**
	 * "Cash on delivery" amount
	 */
	cdAmount: number
	/**
	 * "Cash on delivery" accepted types.ts: get or give
	 */
	cdType: string
	/**
	 * "Cash on delivery" currency
	 */
	cdCurrency: string
	/**
	 * "Cash on delivery" payment options template
	 */
	cdPayOptionsTemplate: string
	/**
	 * "Cash on delivery" payment options
	 */
	cdPayOptions: CDPayOptions
	/**
	 * Providing invoice before payment of "Cash on delivery"
	 */
	invoiceBeforePayCD: boolean
	/**
	 * SMS notifications for the receiver
	 */
	smsNotification: boolean
	/**
	 * Invoice number (up to 11 digits) and date (31.12.21) for department sale
	 */
	invoiceNum: string
}

/**
 * Packing list
 */
export type PackingListElement = {
	/**
	 * Inventory number
	 */
	inventoryNum: string
	/**
	 * Description
	 */
	description: string
	/**
	 * Weight
	 */
	weight: number
	/**
	 * count
	 */
	count: number
	/**
	 * Price
	 */
	price: number
	/**
	 * File
	 */
	file: HostedFile
	/**
	 * Alternative department payment to be used.
	 */
	alternativeDepartment: string
}

/**
 * Status of the shipment
 */
export type ShipmentStatus = {
	/**
	 * Shipment number
	 */
	shipmentNumber: string
	/**
	 * Storage office name
	 */
	storageOfficeName: string
	/**
	 * Storage person name
	 */
	storagePersonName: string
	/**
	 * Created time
	 */
	createdTime: number
	/**
	 * The time when the shipment is sent
	 */
	sendTime: number
	/**
	 * Delivery time
	 */
	deliveryTime: number
	/**
	 * Shipment type
	 */
	shipmentType: ShipmentType
	/**
	 * Count of packs
	 */
	packCount: number
	/**
	 * Shipment description
	 */
	shipmentDescription: string
	/**
	 * Weight
	 */
	weight: number
	/**
	 * Sender delivery type - door or office
	 */
	senderDeliveryType: string
	/**
	 * Sender
	 */
	senderClient: ClientProfile
	/**
	 * Authorized sender
	 */
	senderAgent: ClientProfile
	/**
	 * The office code of the sender
	 */
	senderOfficeCode: string
	/**
	 * Address of the sender
	 */
	senderAddress: Address
	/**
	 * Receiver delivery type - door or office
	 */
	receiverDeliveryType: string
	/**
	 * Receiver
	 */
	receiverClient: ClientProfile
	/**
	 * Authorized receiver
	 */
	receiverAgent: ClientProfile
	/**
	 * The office code of the receiver
	 */
	receiverOfficeCode: string
	/**
	 * The address of the receiver
	 */
	receiverAddress: Address
	/**
	 * The hub office code of the receiver
	 */
	hubCode: string
	/**
	 * The hub office name of the receiver
	 */
	hubName: string
	/**
	 * The hub office name in english of the receiver
	 */
	hubNameEN: string
	/**
	 * Collected "cash on delivery" amount
	 */
	cdCollectedAmount: number
	/**
	 * Collected "cash on delivery" currency
	 */
	cdCollectedCurrency: string
	/**
	 * Collected "cash on delivery" time
	 */
	cdCollectedTime: number
	/**
	 * "Cash on delivery" paid amount
	 */
	cdPaidAmount: number
	/**
	 * "Cash on delivery" paid currency
	 */
	cdPaidCurrency: string
	/**
	 * Paid "cash on delivery" time
	 */
	cdPaidTime: number
	/**
	 * The total price of the shipment
	 */
	totalPrice: number
	/**
	 * Currency
	 */
	currency: string
	/**
	 * Discount percentage
	 */
	discountPercent: number
	/**
	 * Amount of discount
	 */
	discountAmount: number
	/**
	 * Description of the discount
	 */
	discountDescription: string
	/**
	 * Due amount from the sender
	 */
	senderDueAmount: number
	/**
	 * Due amount from the receiver
	 */
	receiverDueAmount: number
	/**
	 * Other due amounts
	 */
	otherDueAmount: number
	/**
	 * Count of delivery attempts
	 */
	deliveryAttemptCount: number
	/**
	 * The previous shipment number (if any)
	 */
	previousShipmentNumber: string
	/**
	 * Services
	 */
	services: ShipmentStatusService[]
	/**
	 * Last processed instruction, possible values are "return", "forward" and "destroy"
	 */
	lastProcessedInstruction: string
	/**
	 * Subsequent shipments (if there are instructions for returning shipments/documents)
	 */
	nextShipments: NextShipmentElement[]
	/**
	 * Shipment tracking events
	 */
	trackingEvents: ShipmentTrackingEvent[]
	/**
	 * URL with the PDF result
	 */
	pdfURL: string
	/**
	 * Expected delivery date
	 */
	expectedDeliveryDate: number
	/**
	 * Return shipment form URL
	 */
	returnShipmentURL: string
	/**
	 * Delivery payment side of the first shipment when it was refused.
	 */
	rejectOriginalParcelPaySide: string
	/**
	 * Delivery payment side of the returning shipment when the first shipment was refused.
	 */
	rejectReturnParcelPaySide: string
	shipmentEdition: ShipmentEditionResponseElement
	/**
	 * Information for the shipment from which the current one was generated (if there is such)
	 */
	previousShipment: PreviousShipment
	/**
	 * Warnings
	 */
	warnings: string
	/**
	 * Possbile values: 'Подготвена в eEcont', 'Приета в Еконт', 'Пътува по линия', 'В куриер', 'В офис на приемащ куриер', 'Приета в офис', 'в офис на предаващ куриер', 'Пристигнала в офис', 'Постъпила за обработка в Логистичен център', 'Доставена', 'Анулирана след изпращане', 'Анулирана преди изпращане', 'Връща се към подател', 'Върната и доставена към подател'
	 */
	shortDeliveryStatus: string
	/**
	 * Possbile values: 'Prepared in eEcont', 'Accepted in Econt, 'In route', 'In courier', 'In pick up courier', 'Accepted in office', 'In delivery courier's office', 'Arrived in office', 'Arrival departure from hub', 'Delivered', 'Cancelled after sending', 'Cancelled before sending', 'Is returning to sender', 'Returned to sender'
	 */
	shortDeliveryStatusEn: string
	routingCode: string
}

export type ShipmentStatusService = {
	/**
	 * Type
	 */
	type: string
	/**
	 * Description
	 */
	description: string
	/**
	 * Shipment status count
	 */
	count: number
	/**
	 * Indicates the payment side (sender, receiver, other)
	 */
	paymentSide: string
	/**
	 * Price
	 */
	price: number
	/**
	 * Currency
	 */
	currency: string
}

export type ShipmentTrackingEvent = {
	/**
	 * Indicates if the event is of a return receipt (DC)
	 */
	isReceipt: boolean
	/**
	 * Possible values: client, courier, courier_direction, office, first_try, second_try, instruction, redirect, return, destroy, failed_delivery, in_pickup_courier, in_pickup_office, in_delivery_courier, in_delivery_office, arrival_departure_from_hub, is_returning_to_sender, returned_to_sender
	 */
	destinationType: string
	/**
	 * Destination details
	 */
	destinationDetails: string
	/**
	 * Destination details (en)
	 */
	destinationDetailsEn: string
	/**
	 * Office name
	 */
	officeName: string
	/**
	 * Office name (en)
	 */
	officeNameEn: string
	/**
	 * City name
	 */
	cityName: string
	/**
	 * International city name
	 */
	cityNameEn: string
	/**
	 * Three-letter ISO Alpha-3 code of the country (e.g. AUT, BGR, etc.)
	 */
	countryCode: string
	/**
	 * destination office code
	 */
	officeCode: string
	/**
	 * Time
	 */
	time: number
}

/**
 * Shipment created from previous
 */
export type NextShipmentElement = {
	/**
	 * Shipment number
	 */
	shipmentNumber: string
	/**
	 * Reason
	 */
	reason: string
	/**
	 * URL with the PDF result
	 */
	pdfURL: string
}

/**
 * Result from creating label
 */
export type CreateLabelResultElement = {
	/**
	 * Label status
	 */
	label: ShipmentStatus
	/**
	 * Error
	 */
	error: Error
	/**
	 * Info message indicating the payAfterAccept/payAfterTest service was ignored
	 */
	payAfterAcceptIgnored: string
}

/**
 * Result from deleting labels
 */
export type DeleteLabelsResultElement = {
	/**
	 * Shipment number
	 */
	shipmentNum: string
	/**
	 * Error
	 */
	error: Error
}

export type ShipmentStatusResultElement = {
	/**
	 * Shipment status
	 */
	status: ShipmentStatus
	/**
	 * Error
	 */
	error: Error
}

export type RequestCourierStatusResultElement = {
	/**
	 * request courier status
	 */
	status: RequestCourierStatus
	/**
	 * Error
	 */
	error: Error
}

export type RequestCourierStatus = {
	/**
	 * Request courier ID
	 */
	id: number
	/**
	 * Request courier status
	 */
	status: RequestCourierStatusType
	/**
	 * Remarks (additional info)
	 */
	note: string
	reject_reason: string
}

/**
 * Pack
 */
export type PackElement = {
	/**
	 * Pack width
	 */
	width: number
	/**
	 * Pack height
	 */
	height: number
	/**
	 * Pack length
	 */
	length: number
	/**
	 * Pack weight
	 */
	weight: number
}

export type GetMyAWBResultElement = {
	/**
	 * Shipment number
	 */
	shipmentNumber: string
	/**
	 * Sender client name
	 */
	senderName: string
	/**
	 * AWB status
	 */
	status: string
	/**
	 * AWB created date
	 */
	createdDate: number
	/**
	 * Date when shipment has been given to Econt
	 */
	acceptedDate: number
	/**
	 * "Cache on delivery" amount
	 */
	cdAmount: number
	/**
	 * Courier service amount
	 */
	courierServiceAmount: number
	/**
	 * Courier service master payer
	 */
	courierServiceMasterPayer: string
	/**
	 * Receiver client phone
	 */
	receiverPhone: string
	/**
	 * "Cache on delivery" currency
	 */
	cdCurrency: string
	/**
	 * Courier service currency
	 */
	courierServiceCurrency: string
}

export type CheckPossibleShipmentEditionsResultElement = { possibleShipmentEditions: string[]; shipmentNum: number }

/**
 * Additional price payment information for ShipmentEditions
 */
export type PaymentAdditionPrice = {
	/**
	 * sender, receiver, other
	 */
	side: string
	/**
	 * Amount of shared sum between sender/receiver
	 */
	shareAmount: number
	/**
	 * cash, credit
	 */
	method: string
	/**
	 * required when side is "other"
	 */
	otherClientNumber: string
}

/**
 * Additional fee (IC) for some ShipmentEdition types.ts. Payable by sender.
 */
export type PaymentInstruction = {
	/**
	 * cash, voucher, client_number
	 */
	method: string
}

export type ShipmentEditionResponseElement = {
	/**
	 * Number of the edited Shipment
	 */
	shipmentNum: number
	/**
	 * ShipmentEdition Num
	 */
	editionNum: number
	/**
	 * Type of generated Editions according to ShipmentEditionRequest
	 */
	editionType: string
	/**
	 * error during processing ShipmentEdition
	 */
	editionError: string
	/**
	 * Additional price for ShipmentEdition (if any)
	 */
	price: string
	/**
	 * Additional price(if any) currency for ShipmentEdition
	 */
	currency: string
}

export type UpdateLabelsResultElement = { error: Error; labels: any }

/**
 * Customs data TARIC codes
 */
export type CustomsListElement = {
	/**
	 * TARIC code
	 */
	cn: string
	/**
	 * Description
	 */
	description: string
	/**
	 * Total sum
	 */
	sum: number
	/**
	 * Currency of the product(BGN, RON, EUR, TRY, USD)
	 */
	currency: string
}

/**
 * Information for the shipment from which the current one was generated (if there is such)
 */
export type PreviousShipment = {
	/**
	 * Shipment number
	 */
	shipmentNumber: number
	/**
	 * Reason for generating the current shipment
	 */
	reason: string
	/**
	 * URL with the PDF result
	 */
	pdfURL: string
}
