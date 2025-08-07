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
let startIndex = panels.findIndex((p) => p.innerText === "Data types:")! + 1
let endIndex = panels.findIndex((p) => p.innerText === "Services:")!

let typeTables = startIndex > 0 ? panels.slice(startIndex, endIndex) : []

type EnumType = {
	name: string
	desc: string
	values: EnumValue[]
}

type EnumValue = {
	value: string
	desc: string
}

type ClassType = {
	name: string
	desc: string
	props: ClassProp[]
}

type ClassProp = {
	key: string
	type: string
	desc: string
}

let enums: EnumType[] = []
let classes: ClassType[] = []

for (const typeTable of typeTables) {
	let heading = typeTable.querySelector(".panel-heading > .type-title")!.innerText

	let name = heading.split(" ")[0]!
	let type = heading.split(" ")[1]!.replaceAll(/[()\n]/g, "") as "Class" | "Enumeration"
	let desc = typeTable.querySelector(".panel-heading > .note")!.innerText

	if (type === "Class") parseClass(name, desc, typeTable)
	else parseEnum(name, desc, typeTable)
}

function parseEnum(name: string, desc: string, typeTable: HTMLElement) {
	let rows = typeTable.querySelector("table > tbody")!.children
	let values: EnumValue[] = []

	for (const row of rows) {
		let value = row.querySelector(".attribute-name")?.innerText
		if (!value) continue

		let desc = row.querySelector(".attribute-description > .note")!.innerText

		values.push({
			value,
			desc
		})
	}

	enums.push({
		name,
		desc,
		values
	})
}

function parseClass(name: string, desc: string, typeTable: HTMLElement) {
	let rows = typeTable.querySelector("table > tbody")!.children
	let props: ClassProp[] = []

	for (const row of rows) {
		let key = row.querySelector(".attribute-name")!.innerText
		let type = row.querySelector(".attribute-type > a")!.innerText
		let count = row.querySelector(".attribute-multiplicity")!.innerText
		let desc = row.querySelector(".attribute-description > .note")!.innerText

		switch (type) {
			case "int":
			case "float":
			case "double":
			case "time": {
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

	classes.push({
		name,
		desc,
		props
	})
}

let types: string[] = []

function formatComment(desc: string) {
	return desc ? `/**\n * ${desc}\n*/\n` : ""
}

for (const e of enums) {
	let string = ""

	string += formatComment(e.desc)
	string += `export enum ${e.name} {`

	e.values.forEach((v) => {
		string += formatComment(v.desc)
		string += `${v.value.toUpperCase()} = "${v.value}",\n`
	})

	string += "};\n\n"

	types.push(string)
}

for (const c of classes) {
	let string = ""

	string += formatComment(c.desc)
	string += `export type ${c.name} = {`

	c.props.forEach((p) => {
		string += formatComment(p.desc)
		string += `${p.key}: ${p.type},\n`
	})

	string += "};\n\n"

	types.push(string)
}

prettier.format(types.join(""), { semi: false, trailingComma: "none", printWidth: 1000, parser: "babel-ts" }).then((res) => {
	fs.writeFileSync(path.resolve("./scripts/temp/type-output.ts"), res)
})
