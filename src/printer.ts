import type { Doc, ParserOptions, Printer } from "prettier";
import { builders } from "prettier/doc";

import type { AST } from "./parser";

const { concat, group, hardline, join } = builders;

export interface INIOptions extends ParserOptions<AST> {
  iniSpaceAroundEquals: boolean;
}

const printer: Printer<AST> = {
  print(path, opts: INIOptions, print) {
    const node = path.getValue();

    switch (node.type) {
      case "comment":
        return node.value;
      case "param": {
        const delimiter = opts.iniSpaceAroundEquals ? " = " : "=";

        return group(concat([node.key, delimiter, node.value]));
      }
      case "root": {
        const lines: Doc[] = [];

        node.value.forEach((node, index) => {
          let printed = path.call(print, "value", index);
          if (index > 0 && node.type === "section") {
            printed = concat([hardline, printed]);
          }

          lines.push(printed);
        });

        return concat([join(hardline, lines), hardline]);
      }
      case "section": {
        const parts: Doc[] = [concat(["[", node.name, "]"])];

        return concat([join(hardline, parts.concat(path.map(print, "value")))]);
      }
      default:
        throw new Error("Unsupported node.");
    }
  }
};

export default printer;
