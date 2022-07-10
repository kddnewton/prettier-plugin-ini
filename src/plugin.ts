import type { Plugin } from "prettier";

import { languages } from "../languages";
import parser from "./parser";
import printer from "./printer";

const plugin: Plugin = {
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

export = plugin;
