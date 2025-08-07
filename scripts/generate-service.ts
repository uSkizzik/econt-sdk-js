import fs from "fs"
import path from "path"

import { execSync } from "node:child_process"

const serviceName = process.argv[2]!
if (!serviceName) throw new Error("Service name required")

console.log("Generating service ", serviceName)

const htmlPath = path.join(__dirname, "temp", `input.html`)

async function generateService() {
	const html = await fetch(`https://ee.econt.com/services/${serviceName}/#${serviceName}Service`).then((res) => res.arrayBuffer())
	fs.writeFileSync(htmlPath, Buffer.from(html))

	const typeScript = path.join(__dirname, "generate-types.js")
	const methodScript = path.join(__dirname, "generate-methods.js")

	execSync("npx tsx " + typeScript)
	execSync("npx tsx " + methodScript)

	const srcFolder = path.join(__dirname, "../", "src", serviceName)
	fs.mkdirSync(srcFolder, { recursive: true })

	const indexTemplate = path.join(__dirname, "data", "index-template.txt")
	fs.copyFileSync(indexTemplate, path.join(srcFolder, "index.ts"))

	fs.copyFileSync(path.join(__dirname, "temp", "type-output.ts"), path.join(srcFolder, "objects.ts"))
	fs.copyFileSync(path.join(__dirname, "temp", "method-objects.ts"), path.join(srcFolder, "types.ts"))
	fs.copyFileSync(path.join(__dirname, "temp", "method-output.ts"), path.join(srcFolder, "service.ts"))
}

generateService()
