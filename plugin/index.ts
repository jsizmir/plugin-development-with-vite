import { Plugin, FilterPattern } from "vite";

export type PluginOptions = {
  csv?: {
    enabled?: boolean;
    include?: FilterPattern;
    exclude?: FilterPattern;
  };
  xlsx?: {
    enabled?: boolean;
    include?: FilterPattern;
    exclude?: FilterPattern;
  };
};

const DEFAULT_OPTIONS: PluginOptions = {
  csv: {
    enabled: true,
  },
  xlsx: {
    enabled: true,
  },
};

const CSV_EXTENSIONS = /\.csv$/;
const XLSX_EXTENSIONS = /\.xlsx$/;

export default (options: PluginOptions = {}): Plugin => {
  const opts: PluginOptions = Object.assign({}, DEFAULT_OPTIONS, options);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const transforms: { [key: string]: any } = {};

  const loadTransform = (key: string) => {
    if (transforms[key]) return transforms[key].default;

    switch (key) {
      case "csv":
        transforms[key] = require("./csvTransformer");
        break;
      case "xlsx":
        transforms[key] = require("./xlsxTransformer");
        break;

      default:
    }

    return transforms[key].default;
  };

  return {
    name: "fileTrnasformer",
    async transform(code: string, id: string) {
      if (opts.csv.enabled && CSV_EXTENSIONS.test(id))
        return loadTransform("csv")(opts, code, id);
      
      if (opts.xlsx.enabled && XLSX_EXTENSIONS.test(id))
        return loadTransform("xlsx")(opts, code, id);

      return null
    },
  };
};
