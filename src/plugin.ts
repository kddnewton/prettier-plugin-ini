import type { Plugin } from "prettier";

import parser from "./parser";
import printer from "./printer";

const plugin: Plugin = {
  languages: [
    {
      name: "INI",
      parsers: ["ini"],
      extensions: [".ini"],
      vscodeLanguageIds: ["ini"]
    }
  ],
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
