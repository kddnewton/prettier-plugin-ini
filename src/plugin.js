import languages from "./languages.js";
import parser from "./parser.js";
import printer from "./printer.js";

const plugin = {
  languages,
  parsers: {
    ini: parser
  },
  printers: {
    ini: printer
  },
  options: {
    iniSpaceAroundEquals: {
      type: "boolean",
      category: "INI",
      default: false,
      description:
        "Adds a space around the equals sign when specifying params.",
      since: "0.3.0"
    }
  },
  defaultOptions: {
    printWidth: 80,
    tabWidth: 2
  }
};

export default plugin;
