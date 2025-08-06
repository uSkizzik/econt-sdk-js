import { AbstractService } from "@/core"

import { NomenclaturesService } from "@/Nomenclatures"
import { ProfileService } from "@/Profile"
import { ShipmentsService } from "@/Shipments"
import { ThreeWayLogisticsService } from "@/ThreeWayLogistics"

export class EcontClient extends AbstractService {
	readonly nomenclatures = new NomenclaturesService(this.isDev, this.user, this.password)
	readonly profile = new ProfileService(this.isDev, this.user, this.password)
	readonly shipments = new ShipmentsService(this.isDev, this.user, this.password)
	readonly threeWayLogistics = new ThreeWayLogisticsService(this.isDev, this.user, this.password)
}
