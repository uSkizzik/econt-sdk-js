import { Address } from "@/src/Nomenclatures"
import { CheckPossibleShipmentEditionsResultElement, CreateLabelResultElement, DeleteLabelsResultElement, GetMyAWBResultElement, PaymentAdditionPrice, PaymentInstruction, RequestCourierStatusResultElement, ShipmentStatus, ShipmentStatusResultElement, ShipmentType, ShippingLabel, UpdateLabelsResultElement } from "@/src/Shipments"
import { ClientProfile } from "@/src/Profile"

export type CreateLabelRequest = {
	/**
	 * Shipment label
	 */
	label: ShippingLabel
	/**
	 * Indicates the beginning of the time period in which the shipment can be collected from you
	 */
	requestCourierTimeFrom: number
	/**
	 * Indicates the end of the time period in which the shipment can be collected
	 */
	requestCourierTimeTo: number
	/**
	 * Supported modes - calculate, validate, create, calculate_with_block
	 */
	mode: string
}

export type CreateLabelResponse = {
	/**
	 * Information about the shipment/label
	 */
	label: ShipmentStatus
	/**
	 * URL for making a blocking payment for the parcel
	 */
	blockingPaymentURL: string
	/**
	 * Courier request ID
	 */
	courierRequestID: number
	/**
	 * Info message indicating the payAfterAccept/payAfterTest service was ignored
	 */
	payAfterAcceptIgnored: string
}

export type CreateLabelsRequest = {
	/**
	 * Shipment labels
	 */
	labels: ShippingLabel[]
	/**
	 * E-mail
	 */
	runAsyncAndEmailResultTo: string
	/**
	 * Supported modes - validate, calculate, create
	 */
	mode: string
}

export type CreateLabelsResponse = {
	/**
	 * Information about the labels' statuses
	 */
	results: CreateLabelResultElement[]
}

export type DeleteLabelsRequest = {
	/**
	 * Shipment numbers
	 */
	shipmentNumbers: string[]
}

export type DeleteLabelsResponse = {
	/**
	 * Information about the labels' statuses
	 */
	results: DeleteLabelsResultElement[]
}

export type UpdateLabelRequest = {
	/**
	 * Shipment label
	 */
	label: ShippingLabel
	/**
	 * Indicates the beginning of the time period in which the shipment can be collected from you
	 */
	requestCourierTimeFrom: number
	/**
	 * Indicates the end of the time period in which the shipment can be collected
	 */
	requestCourierTimeTo: number
	destroy: boolean
	/**
	 * Additional price payment information for ShipmentEdition
	 */
	paymentAdditionPrice: PaymentAdditionPrice
	paymentInstruction: PaymentInstruction
}

export type UpdateLabelResponse = {
	/**
	 * Information about the shipment/label
	 */
	label: ShipmentStatus
}

export type CheckPossibleShipmentEditionsRequest = {
	shipmentNums: number[]
}

export type CheckPossibleShipmentEditionsResponse = {
	possibleShipmentEditions: CheckPossibleShipmentEditionsResultElement[]
}

export type UpdateLabelsRequest = {
	labels: UpdateLabelRequest[]
}

export type UpdateLabelsResponse = {
	results: UpdateLabelsResultElement[]
}

export type GroupingRequest = {
	/**
	 * Номера на товарителници
	 */
	labels: number[]
}

export type GroupingResponse = {
	label: ShipmentStatus
}

export type GroupingCancelationRequest = {
	groupLabel: number
}

export type GroupingCancelationResponse = {
	status: string
}

export type RequestCourierRequest = {
	/**
	 * Indicates the beginning of the time the courier can collect (SOAP: YYYY-MM-DDTHH:MM:SS+03:00) (JSON: unix timestamp)
	 */
	requestTimeFrom: number
	/**
	 * Indicates the end of the time the courier can collect (SOAP: YYYY-MM-DDTHH:MM:SS+03:00) (JSON: unix timestamp)
	 */
	requestTimeTo: number
	/**
	 * Shipment export type (pack, post_pack, etc.)
	 */
	shipmentType: ShipmentType
	/**
	 * Count of shipments
	 */
	shipmentPackCount: number
	/**
	 * Shipment weight (kg)
	 */
	shipmentWeight: number
	/**
	 * Client
	 */
	senderClient: ClientProfile
	/**
	 * Authorized person
	 */
	senderAgent: ClientProfile
	/**
	 * The address of the sender
	 */
	senderAddress: Address
	/**
	 * Prepared (not yet received) shipment numbers
	 */
	attachShipments: string[]
	/**
	 * Motorbike stand rental
	 */
	pack12: number
}

export type RequestCourierResponse = {
	/**
	 * ID of the courier request
	 */
	courierRequestID: string
	/**
	 * Warnings
	 */
	warnings: string
}

export type GetShipmentStatusesRequest = {
	/**
	 * Shipment numbers
	 */
	shipmentNumbers: string[]
}

export type GetShipmentStatusesResponse = {
	/**
	 * Information about the shipment statuses
	 */
	shipmentStatuses: ShipmentStatusResultElement[]
}

export type GetRequestCourierStatusRequest = {
	/**
	 * Request courier IDs
	 */
	requestCourierIds: string[]
}

export type GetRequestCourierStatusResponse = {
	/**
	 * Information about the request courier status
	 */
	requestCourierStatus: RequestCourierStatusResultElement[]
}

export type GetMyAWBRequest = {
	dateFrom: number
	dateTo: number
	page: number
	/**
	 * Shipment side - sender / receiver / all
	 */
	side: string
}

export type GetMyAWBResponse = {
	dateFrom: number
	dateTo: number
	page: number
	totalPages: number
	results: GetMyAWBResultElement[]
}

export type SetITUCodeRequest = {
	/**
	 * Shipment number
	 */
	awbBarcode: string
	/**
	 * Truck registration number
	 */
	truckRegNum: string
	/**
	 * ITU code
	 */
	ITU_code: string
}
