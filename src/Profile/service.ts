import { AbstractService } from "@/core"
import { CreateCDAgreementRequest, CreateCDAgreementResponse, GetClientProfilesResponse } from "@/Profile"

export class ProfileService extends AbstractService {
	/**
	 * Requests information about the client profiles (requires authorization)
	 * @returns Response Body
	 */
	async getClientProfiles(): Promise<GetClientProfilesResponse> {
		return this.http("/services/Profile/ProfileService.getClientProfiles.json", {}) as Promise<GetClientProfilesResponse>
	}

	/**
	 * Creates a CD agreement for payment options (requires authorization)
	 * @param req Request Body
	 * @returns Response Body
	 */
	async createCDAgreement(req: CreateCDAgreementRequest): Promise<CreateCDAgreementResponse> {
		return this.http("/services/Profile/ProfileService.createCDAgreement.json", req) as Promise<CreateCDAgreementResponse>
	}
}
