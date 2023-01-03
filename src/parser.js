const sectionPattern = /^\s*\[\s*([^\]]*)\s*\]\s*$/;
const paramPattern = /^\s*([^=]+?)\s*=\s*(.*?)\s*$/;
const commentPattern = /^\s*[;#].*$/;

const parser = {
  astFormat: "ini",
  locStart() {
    return 0;
  },
  locEnd() {
    return 0;
  },
  parse(text) {
    const root = { type: "root", value: [] };
    let lineno = 0;

    let section = null;
    let match;

    text.split(/[\r\n]/).forEach((line) => {
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
        const [, key, value] = match;
        const target = section ? section.value : root.value;

        target.endLine = lineno;
        target.push({
          type: "param",
          key,
          value,
          startLine: lineno,
          endLine: lineno
        });
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
    });

    return root;
  }
};

export default parser;
