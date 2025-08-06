import { AbstractService } from "@/src/core"
import { ThreeWayLogisticsRequest } from "@/src/ThreeWayLogistics"

export class ThreeWayLogisticsService extends AbstractService {
	/**
	 * @param req Request Body
	 */
	async threeWayLogistics(req: ThreeWayLogisticsRequest): Promise<{}> {
		return this.http("/services/ThreeWayLogistics/ThreeWayLogisticsService.threeWayLogistics.json", req) as Promise<{}>
	}
}
