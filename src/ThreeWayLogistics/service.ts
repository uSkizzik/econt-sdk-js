import { AbstractService } from "@/core"
import { ThreeWayLogisticsRequest } from "@/ThreeWayLogistics"

export class ThreeWayLogisticsService extends AbstractService {
	/**
	 * @param req Request Body
	 */
	async threeWayLogistics(req: ThreeWayLogisticsRequest): Promise<{}> {
		return this.http("/services/ThreeWayLogistics/ThreeWayLogisticsService.threeWayLogistics.json", req) as Promise<{}>
	}
}
