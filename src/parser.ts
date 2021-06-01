import type { Parser } from "prettier";

const sectionPattern = /^\s*\[\s*([^\]]*)\s*\]\s*$/;
const paramPattern = /^\s*([^=]+?)\s*=\s*(.*?)\s*$/;
const commentPattern = /^\s*[;#].*$/;

type Comment = { type: "comment"; value: string; lineno: number };
type Param = { type: "param"; key: string; value: string; lineno: number };
type Root = { type: "root"; value: (Comment | Param | Section)[] };
type Section = {
  type: "section";
  name: string;
  value: (Comment | Param)[];
  lineno: number;
};

export type AST = Comment | Param | Root | Section;

const parser: Parser<AST> = {
  astFormat: "ini",
  locStart() {
    return 0;
  },
  locEnd() {
    return 0;
  },
  parse(text) {
    const root: Root = { type: "root", value: [] };

    let section: Section | null = null;
    let match;

    text.split(/[\r\n]+/).forEach((line, index) => {
      const lineno = index + 1;

      if (commentPattern.test(line)) {
        const target = section ? section.value : root.value;

        target.push({ type: "comment", value: line.trim(), lineno });
      } else if ((match = line.match(paramPattern))) {
        const [_, key, value] = match;
        const target = section ? section.value : root.value;

        target.push({ type: "param", key, value, lineno });
      } else if ((match = line.match(sectionPattern))) {
        const [_, name] = match;
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
