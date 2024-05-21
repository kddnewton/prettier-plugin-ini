const sectionPattern = /^\s*\[\s*([^\]]*)\s*\]\s*$/;
const paramPattern = /^\s*([^=]+?)\s*=\s*(.*?)\s*$/;
const commentPattern = /^\s*[;#].*$/;

function parse(text) {
  const root = { type: "root", value: [] };
  let lineno = 0;

  let section = null;
  let match;

  const lines = text.split(/\r?\n/);
  let line;

  while (lineno < lines.length) {
    line = lines[lineno];
    lineno += 1;

    if (line.trim().length === 0) {
      section = null;
    } else if (commentPattern.test(line)) {
      const target = section ? section.value : root.value;

      target.push({
        type: "comment",
        value: line.trim(),
        startLine: lineno,
        endLine: lineno
      });
    } else if ((match = line.match(paramPattern))) {
      let [, key, value] = match;
      const target = section ? section.value : root.value;

      if (
        value === "" &&
        lineno < lines.length &&
        (match = lines[lineno].match(/^(\s+).+?\s*$/))
      ) {
        value = [];
        const indent = match[1];

        while (lineno < lines.length) {
          line = lines[lineno];
          if (!line.startsWith(indent)) break;

          line = line.substring(indent.length);
          if (line.trim().length === 0) break;

          if (commentPattern.test(line)) {
            value.push({
              type: "comment",
              value: line.trim(),
              startLine: lineno,
              endLine: lineno
            });
          } else {
            value.push({
              type: "value",
              value: line.trim(),
              startLine: lineno,
              endLine: lineno
            });
          }

          lineno += 1;
        }

        target.endLine = lineno;
        target.push({
          type: "list",
          key,
          value,
          startLine: lineno,
          endLine: lineno
        });
      } else {
        target.endLine = lineno;
        target.push({
          type: "param",
          key,
          value,
          startLine: lineno,
          endLine: lineno
        });
      }
    } else if ((match = line.match(sectionPattern))) {
      const [, name] = match;
      section = {
        type: "section",
        name,
        value: [],
        startLine: lineno,
        endLine: lineno
      };

      root.value.push(section);
    } else {
      throw new Error(`Error parsing .ini on line ${lineno}:\n${line}`);
    }
  }

  return root;
}

const parser = {
  astFormat: "ini",
  locStart() {
    return 0;
  },
  locEnd() {
    return 0;
  },
  parse
};

export default parser;
