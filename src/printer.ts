import type { Doc, ParserOptions, Printer } from "prettier";
import { builders } from "prettier/doc";

import type { AST } from "./parser";

const { group, hardline, join } = builders;

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

        return group([node.key, delimiter, node.value]);
      }
      case "root": {
        const lines: Doc[] = [];

        path.each((childPath, index) => {
          const childNode = childPath.getValue();

          if (index > 0 && childNode.type === "section") {
            lines.push([hardline, print(childPath)]);
          } else {
            lines.push(print(childPath));
          }
        }, "value");

        return [join(hardline, lines), hardline];
      }
      case "section":
        return join(hardline, [
          ["[", node.name, "]"],
          ...path.map(print, "value")
        ]);
      default:
        throw new Error("Unsupported node.");
    }
  }
};

export default printer;
