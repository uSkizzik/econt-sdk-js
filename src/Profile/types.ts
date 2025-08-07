import { CDPayOptions, ProfilesResponseElement } from "@/Profile/objects.ts"

export type GetClientProfilesResponse = {
	/**
	 * Information about the client profiles
	 */
	profiles: ProfilesResponseElement[]
}

export type CreateCDAgreementRequest = {
	cdPayOptions?: Partial<CDPayOptions>
}

export type CreateCDAgreementResponse = {
	cdPayOptions: CDPayOptions
}
