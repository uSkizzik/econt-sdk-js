export abstract class AbstractService {
	static readonly devUrl = "http://demo.econt.com/ee"
	static readonly apiUrl = "http://ee.econt.com"

	readonly isDev: boolean
	protected user: string
	protected password: string

	constructor(isDev: boolean, user?: string, password?: string) {
		this.isDev = isDev

		if (!isDev && !(user && password)) {
			throw "Please provide credentials or run in dev mode!"
		}

		this.user = user ?? "iasp-dev"
		this.password = password ?? "1Asp-dev"
	}

	protected async http(endpoint: string, body: Record<string, any>): Promise<Record<string, any>> {
		const apiUrl = this.isDev ? AbstractService.devUrl : AbstractService.apiUrl

		return fetch(apiUrl + endpoint, {
			method: "POST",
			headers: {
				Authorization: this.user + ":" + this.password
			},
			body: JSON.stringify(body)
		}).then((response) => response.json())
	}
}
