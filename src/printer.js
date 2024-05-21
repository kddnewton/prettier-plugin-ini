import * as doc from "prettier/doc";

const { hardline, indent, join } = doc.builders;

const printer = {
  print(path, opts, print) {
    const node = path.getValue();

    switch (node.type) {
      case "comment":
        return node.value;
      case "param":
        return [node.key, opts.iniSpaceAroundEquals ? " = " : "=", node.value];
      case "list":
        return [
          node.key,
          opts.iniSpaceAroundEquals ? " =" : "=",
          indent([hardline, join(hardline, path.map(print, "value"))])
        ];
      case "root":
        return [printLines(), hardline];
      case "section":
        return [["[", node.name, "]"], hardline, printLines()];
      case "value":
        return node.value;
      default:
        throw new Error(`Unsupported node: ${node.type}`);
    }

    function printLines() {
      const lines = [];
      let currentLine = null;

      path.each((childPath) => {
        const childNode = childPath.getValue();

        if (currentLine !== null) {
          if (childNode.startLine - currentLine > 1) {
            lines.push(hardline);
          }
          lines.push(hardline);
        }

        lines.push(print(childPath));
        currentLine = childNode.endLine;
      }, "value");

      return lines;
    }
  }
};

export default printer;
