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

    let section = null;
    let match;

    text.split(/[\r\n]+/).forEach((line, index) => {
      const lineno = index + 1;

      if (commentPattern.test(line)) {
        const target = section ? section.value : root.value;

        target.push({ type: "comment", value: line.trim(), lineno });
      } else if ((match = line.match(paramPattern))) {
        const [, key, value] = match;
        const target = section ? section.value : root.value;

        target.push({ type: "param", key, value, lineno });
      } else if ((match = line.match(sectionPattern))) {
        const [, name] = match;
        section = { type: "section", name, value: [], lineno };

        root.value.push(section);
      } else if (line.trim().length === 0) {
        section = null;
      } else {
        throw new Error(`Error parsing .ini on line ${lineno}:\n${line}`);
      }
    });

    return root;
  }
};

export default parser;
