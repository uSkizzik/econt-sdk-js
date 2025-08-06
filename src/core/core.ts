export abstract class AbstractService {
	static readonly devUrl: "http://demo.econt.com/ee"
	static readonly apiUrl: "http://ee.econt.com"

	isDev: boolean
	user: string
	password: string

	constructor(isDev, user, password) {
		this.isDev = isDev

		if (!isDev && !(user && password)) {
			throw "Please provide credentials or run in dev mode!"
		}

		this.user = user ?? "iasp-dev"
		this.password = password ?? "1Asp-dev"
	}

	async http(endpoint: string, body: Record<string, any>): Promise<Record<string, any>> {
		const apiUrl = this.isDev ? AbstractService.devUrl : AbstractService.apiUrl

		return fetch(apiUrl + endpoint, {
			method: "POST",
			headers: {
				Authorization: this.user + ":" + this.password
			},
			body: JSON.stringify(body)
		})
	}
}
