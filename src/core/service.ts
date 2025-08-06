import { AbstractService } from "@/src/core"

import { NomenclaturesService } from "@/src/Nomenclatures"
import { ProfileService } from "@/src/Profile"
import { ShipmentsService } from "@/src/Shipments"
import { ThreeWayLogisticsService } from "@/src/ThreeWayLogistics"

export class EcontClient extends AbstractService {
	readonly nomenclatures = new NomenclaturesService(this.isDev, this.user, this.password)
	readonly profile = new ProfileService(this.isDev, this.user, this.password)
	readonly shipments = new ShipmentsService(this.isDev, this.user, this.password)
	readonly threeWayLogistics = new ThreeWayLogisticsService(this.isDev, this.user, this.password)
}
