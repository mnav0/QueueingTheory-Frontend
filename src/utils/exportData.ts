import { ExportToCsv } from "export-to-csv"

export const def = {
  fieldSeparator: ',',
  filename: "data",
  quoteStrings: '"',
  decimalSeparator: '.',
  showLabels: true,
  showTitle: false,
  title: "Sample Title",
  useTextFile: false,
  useBom: true,
  useKeysAsHeaders: true,
  // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
};

// Function formats results data from sim and then pushes it through ExportToCsv using lib found at https://github.com/alexcaza/export-to-csv
export function exportData(obj: any, options = def) {
  // Sample of some fields we could use
  const { time, queueLengths, totals, waits } = obj
  const final = []

  for (var i = 0; i < time; i++) {
    final.push(
      {
        "Time": i + 1,
        "Queue Lengths": queueLengths[i],
        "Totals": totals[i],
        "Waits": waits[i]
      }
    )
  }

  const csvExporter = new ExportToCsv(options)

  return csvExporter.generateCsv(final)
}

export default exportData
