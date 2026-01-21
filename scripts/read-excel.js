/*
  Usage:
  node scripts/read-excel.js "public/uploads/ფასები საიტისთვის.xlsx"
*/

const fs = require("fs")
const path = require("path")

async function main() {
  const argPath = process.argv[2]
  const filePath = argPath ? path.resolve(argPath) : path.resolve("public/uploads/ფასები საიტისთვის.xlsx")

  if (!fs.existsSync(filePath)) {
    console.error("File not found:", filePath)
    process.exit(1)
  }

  const XLSX = require("xlsx")
  const wb = XLSX.readFile(filePath)
  const sheets = wb.SheetNames

  console.log("Found sheets:", sheets)
  if (!sheets.length) {
    console.log("No sheets in workbook.")
    return
  }

  for (const name of sheets) {
    const ws = wb.Sheets[name]
    const rows = XLSX.utils.sheet_to_json(ws, { defval: "", raw: true })
    console.log(`\n--- Sheet: ${name} | Rows: ${rows.length} ---`)
    const preview = rows.slice(0, 50)
    console.log(JSON.stringify(preview, null, 2))
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
