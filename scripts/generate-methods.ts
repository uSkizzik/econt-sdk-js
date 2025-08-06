import fs from "fs"
import path from "path"

import * as prettier from "prettier"
import { HTMLElement, parse } from "node-html-parser"

let html = parse(fs.readFileSync(path.join(__dirname, "temp", `input.html`), "utf8"), {
	blockTextElements: {
		script: false,
		noscript: false,
		style: false,
		pre: false
	}
})

let panels = html.querySelector("body > div > div > div.col-xs-12.col-sm-8")!.children
let startIndex = panels.findIndex((p) => p.innerText === "Services:")! + 1

let methodPanels = panels.slice(startIndex).filter((e) => e.rawTagName === "div")

type MethodType = {
	name: string
	desc: string
	endpoint: string
	params: MethodProp[]
	resultProps: MethodProp[]
}

type MethodProp = {
	key: string
	type: string
	desc: string
}

const methods: MethodType[] = []

let serviceName = html.querySelector("body > div.container > div > div.col-xs-12.col-sm-8 > h4:nth-child(1) > ol > li:nth-child(3) > a")!.innerText

for (const panel of methodPanels) {
	let heading = panel.querySelector(".panel-heading > .operation-title")!.innerText
	let name = heading.split(" ")[0]!

	let endpoint = panel.querySelector(".panel-heading > .pull-right > a:nth-child(3)")!.attrs.href!.replace("http://ee.econt.com", "")
	let desc = panel.querySelector(".panel-heading > .note")!.innerText.split("(see")[0]!.replaceAll(" \n", "")

	let tables = panel.querySelectorAll("table")
	let params = parseTable(tables[0]!)
	let resultProps = parseTable(tables[1]!)

	methods.push({
		name,
		desc,
		endpoint,
		params,
		resultProps
	})
}

function parseTable(table: HTMLElement) {
	let rows = table.querySelector("tbody")!.children
	let props: MethodProp[] = []

	for (const row of rows) {
		let cells = row.querySelectorAll("td")

		let key = cells[0]!.innerText
		let type = cells[1]!.innerText
		let count = cells[2]!.innerText
		let desc = cells[3]!.innerText

		switch (type) {
			case "int":
			case "float":
			case "double":
			case "time":
			case "date":
			case "dateTime": {
				type = "number"
			}
		}

		if (count.endsWith("n]")) type += "[]"

		props.push({
			key,
			desc,
			type
		})
	}

	return props
}

fs.writeFileSync(path.resolve("./scripts/temp/method-output.json"), JSON.stringify(methods, undefined, "\t"))

let service: string[] = []
let types: string[] = []
let imports: string[] = []

function capitalizeFirstLetter(str: string) {
	return String(str).charAt(0).toUpperCase() + String(str).slice(1)
}

function generateObjType(methodName: string, type: "req" | "res", props: MethodProp[]) {
	let string = ""

	methodName = capitalizeFirstLetter(methodName)
	let typeName = methodName + (type === "req" ? "Request" : "Response")

	string += `export type ${typeName} = {\n`

	props.forEach((p) => {
		if (p.desc) {
			string += `/**\n`
			string += ` * ${p.desc}\n`
			string += ` */\n`
		}

		string += `${p.key}: ${p.type},\n`
	})

	string += "}\n\n"

	types.push(string)
	imports.push(typeName)
}

for (const method of methods) {
	if (method.params.length) generateObjType(method.name, "req", method.params)
	if (method.resultProps.length) generateObjType(method.name, "res", method.resultProps)
}

service.push('import { AbstractService } from "@/core"\n')
service.push(`import { ${imports.join(", ")} } from "@/${serviceName}"\n\n`)

service.push(`export class ${serviceName}Service extends AbstractService {`)

for (const method of methods) {
	let string = ""
	let returnType = method.resultProps.length ? `Promise<${capitalizeFirstLetter(method.name)}Response>` : "Promise<void>"

	let hasComment = Boolean(method.desc || method.params.length || method.resultProps.length)

	if (hasComment) string += "/**\n"
	if (method.desc) string += ` * ${method.desc}\n`

	if (method.params.length) string += ` * @param req Request Body\n`
	if (method.resultProps.length) string += ` * @returns Response Body\n`

	if (hasComment) string += " */\n"

	string += `async ${method.name}(`
	if (method.params.length) string += `req: ${capitalizeFirstLetter(method.name)}Request`
	string += `): ${returnType}`

	string += "{\n"
	string += `return this.http("${method.endpoint}", ${method.params.length ? "req" : "{}"}) as ${returnType}\n`
	string += "}\n\n"

	service.push(string)
}

service.push("}")

prettier.format(service.join(""), { semi: false, trailingComma: "none", printWidth: 1000, parser: "typescript" }).then((res) => {
	fs.writeFileSync(path.resolve("./scripts/temp/method-output.ts"), res)
})

prettier.format(types.join(""), { semi: false, trailingComma: "none", printWidth: 1000, parser: "typescript" }).then((res) => {
	fs.writeFileSync(path.resolve("./scripts/temp/method-objects.ts"), res)
})
