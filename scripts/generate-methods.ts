import fs from "fs"
import path from "path"

import * as prettier from "prettier"
import { HTMLElement, parse } from "node-html-parser"

let html = parse(fs.readFileSync(path.resolve("./scripts/temp/input.html"), "utf8"), {
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

for (const panel of methodPanels) {
	let heading = panel.querySelector(".panel-heading > .operation-title")!.innerText
	let name = heading.split(" ")[0]

	let endpoint = panel.querySelector(".panel-heading > .pull-right > a:nth-child(3)")!.attrs.href.replace("http://ee.econt.com", "")
	let desc = panel.querySelector(".panel-heading > .note")!.innerText.split("(see SOAP")[0].replaceAll(" \n", "")

	let tables = panel.querySelectorAll("table")
	let params = parseTable(tables[0])
	let resultProps = parseTable(tables[1])

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
		let type = cells[1].innerText
		let count = cells[2].innerText
		let desc = cells[3].innerText

		switch (type) {
			case "int":
			case "float":
			case "double":
			case "time":
			case "date": {
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

let types: string[] = ["class Service {"]

for (const method of methods) {
	let string = ""
	let returnType = "Promise<{"

	let hasComment = Boolean(method.desc || method.params)

	if (hasComment) string += "/**\n"
	if (method.desc) string += ` * ${method.desc}\n`

	if (method.params) {
		method.params.forEach((p) => {
			string += ` * @param ${p.key}`
			if (p.desc) string += " " + p.desc
			string += "\n"
		})
	}

	if (hasComment) string += " */\n"

	string += `async ${method.name}(`

	method.params.forEach((p) => {
		string += `${p.key}: ${p.type},`
	})

	method.resultProps.forEach((p) => {
		returnType += `${p.key}: ${p.type},`
	})
	returnType += "}>"

	string += `): ${returnType}`

	string += "{\n"
	string += `return this.http("${method.endpoint}", {${method.params.map((p) => `${p.key}`)}}) as ${returnType}\n`
	string += "}\n\n"

	types.push(string)
}

types.push("}")

prettier.format(types.join(""), { semi: false, trailingComma: "none", printWidth: 1000, parser: "typescript" }).then((res) => {
	fs.writeFileSync(path.resolve("./scripts/temp/method-output.ts"), res)
})
