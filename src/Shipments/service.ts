import { AbstractService } from "@/core"
import { CheckPossibleShipmentEditionsRequest, CheckPossibleShipmentEditionsResponse, CreateLabelRequest, CreateLabelResponse, CreateLabelsRequest, CreateLabelsResponse, DeleteLabelsRequest, DeleteLabelsResponse, GetMyAWBRequest, GetMyAWBResponse, GetRequestCourierStatusRequest, GetRequestCourierStatusResponse, GetShipmentStatusesRequest, GetShipmentStatusesResponse, GroupingCancelationRequest, GroupingCancelationResponse, GroupingRequest, GroupingResponse, RequestCourierRequest, RequestCourierResponse, SetITUCodeRequest, UpdateLabelRequest, UpdateLabelResponse, UpdateLabelsRequest, UpdateLabelsResponse } from "@/Shipments"

export class ShipmentsService extends AbstractService {
	/**
	 * Request for creating a label
	 * @param req Request Body
	 * @returns Response Body
	 */
	async createLabel(req: CreateLabelRequest): Promise<CreateLabelResponse> {
		return this.http("/services/Shipments/LabelService.createLabel.json", req) as Promise<CreateLabelResponse>
	}

	/**
	 * Request for creating multiple labels
	 * @param req Request Body
	 * @returns Response Body
	 */
	async createLabels(req: CreateLabelsRequest): Promise<CreateLabelsResponse> {
		return this.http("/services/Shipments/LabelService.createLabels.json", req) as Promise<CreateLabelsResponse>
	}

	/**
	 * Request for deleting labels
	 * @param req Request Body
	 * @returns Response Body
	 */
	async deleteLabels(req: DeleteLabelsRequest): Promise<DeleteLabelsResponse> {
		return this.http("/services/Shipments/LabelService.deleteLabels.json", req) as Promise<DeleteLabelsResponse>
	}

	/**
	 * Request for updating a label
	 * @param req Request Body
	 * @returns Response Body
	 */
	async updateLabel(req: UpdateLabelRequest): Promise<UpdateLabelResponse> {
		return this.http("/services/Shipments/LabelService.updateLabel.json", req) as Promise<UpdateLabelResponse>
	}

	/**
	 * Returns possible ShipmentEdition types.ts for requested Shipment numbers

	 * @param req Request Body
	 * @returns Response Body
	 */
	async checkPossibleShipmentEditions(req: CheckPossibleShipmentEditionsRequest): Promise<CheckPossibleShipmentEditionsResponse> {
		return this.http("/services/Shipments/LabelService.checkPossibleShipmentEditions.json", req) as Promise<CheckPossibleShipmentEditionsResponse>
	}

	/**
	 * Request for updating multiple labels
	 * @param req Request Body
	 * @returns Response Body
	 */
	async updateLabels(req: UpdateLabelsRequest): Promise<UpdateLabelsResponse> {
		return this.http("/services/Shipments/LabelService.updateLabels.json", req) as Promise<UpdateLabelsResponse>
	}

	/**
	 * @param req Request Body
	 * @returns Response Body
	 */
	async grouping(req: GroupingRequest): Promise<GroupingResponse> {
		return this.http("/services/Shipments/LabelService.grouping.json", req) as Promise<GroupingResponse>
	}

	/**
	 * @param req Request Body
	 * @returns Response Body
	 */
	async groupingCancelation(req: GroupingCancelationRequest): Promise<GroupingCancelationResponse> {
		return this.http("/services/Shipments/LabelService.groupingCancelation.json", req) as Promise<GroupingCancelationResponse>
	}

	/**
	 * Creates courier request
	 * @param req Request Body
	 * @returns Response Body
	 */
	async requestCourier(req: RequestCourierRequest): Promise<RequestCourierResponse> {
		return this.http("/services/Shipments/ShipmentService.requestCourier.json", req) as Promise<RequestCourierResponse>
	}

	/**
	 * Requests statuses of shipments
	 * @param req Request Body
	 * @returns Response Body
	 */
	async getShipmentStatuses(req: GetShipmentStatusesRequest): Promise<GetShipmentStatusesResponse> {
		return this.http("/services/Shipments/ShipmentService.getShipmentStatuses.json", req) as Promise<GetShipmentStatusesResponse>
	}

	/**
	 * Requests statuses of courier requests

	 * @param req Request Body
	 * @returns Response Body
	 */
	async getRequestCourierStatus(req: GetRequestCourierStatusRequest): Promise<GetRequestCourierStatusResponse> {
		return this.http("/services/Shipments/ShipmentService.getRequestCourierStatus.json", req) as Promise<GetRequestCourierStatusResponse>
	}

	/**
	 * @param req Request Body
	 * @returns Response Body
	 */
	async getMyAWB(req: GetMyAWBRequest): Promise<GetMyAWBResponse> {
		return this.http("/services/Shipments/ShipmentService.getMyAWB.json", req) as Promise<GetMyAWBResponse>
	}

	/**
	 * Set ITU code for shipment
	 * @param req Request Body
	 */
	async setITUCode(req: SetITUCodeRequest): Promise<{}> {
		return this.http("/services/Shipments/ShipmentService.setITUCode.json", req) as Promise<{}>
	}
}
