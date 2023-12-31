import { createFilter } from "vite";
import { PluginOptions } from ".";
import xlsx from "xlsx";
import toSource from "tosource";

export default function xlsxTransform(
  options: PluginOptions = {},
  code: string,
  id: string
) {
  const filter = createFilter(options.xlsx.include, options.xlsx.exclude);

  if (!filter(id)) return null;

  const xlsxData = xlsx.readFile(id);
  const generatedCode = `const data = ${toSource(
    xlsxData
  )};\nexport default data;`;



  return {
    code: generatedCode,
  };
}
