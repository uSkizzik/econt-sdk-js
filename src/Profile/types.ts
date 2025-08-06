import { CDPayOptions, ProfilesResponseElement } from "@/src/Profile/objects.ts"

export type GetClientProfilesResponse = {
	/**
	 * Information about the client profiles
	 */
	profiles: ProfilesResponseElement[]
}

export type CreateCDAgreementRequest = {
	cdPayOptions: CDPayOptions
}

export type CreateCDAgreementResponse = {
	cdPayOptions: CDPayOptions
}
