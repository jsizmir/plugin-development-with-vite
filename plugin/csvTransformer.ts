import { createFilter } from "vite";
import { PluginOptions } from ".";

import { parse } from "csv-parse";

export default function csvTransform(
  options: PluginOptions = {},
  code: string,
  id: string
) {
  const filter = createFilter(options.csv?.include, options.csv?.exclude);
  if (!filter(id)) return null;

  const parserCSV = parse({
    encoding: "utf-8",
  });

  const records: string[] = [];

  parserCSV.on("readable", function () {
    let record;

    while ((record = parserCSV.read()) !== null) {
      records.push(record);
    }
  });

  parserCSV.write(code);
  parserCSV.end();

  const generateCode = `
  const data = ${JSON.stringify(records)}\nexport default data`

  return {
    code: generateCode,
  };
}
