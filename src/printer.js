import doc from "prettier/doc";

const { group, hardline, join } = doc.builders;

const printer = {
  print(path, opts, print) {
    const node = path.getValue();

    switch (node.type) {
      case "comment":
        return node.value;
      case "param": {
        const delimiter = opts.iniSpaceAroundEquals ? " = " : "=";

        return group([node.key, delimiter, node.value]);
      }
      case "root": {
        const lines = [];

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
