import { PartialDeep } from "type-fest"
import { CDPayOptions, ProfilesResponseElement } from "@/Profile/objects.ts"

export type GetClientProfilesResponse = {
	/**
	 * Information about the client profiles
	 */
	profiles: ProfilesResponseElement[]
}

export type CreateCDAgreementRequest = {
	cdPayOptions?: PartialDeep<CDPayOptions>
}

export type CreateCDAgreementResponse = {
	cdPayOptions: CDPayOptions
}
