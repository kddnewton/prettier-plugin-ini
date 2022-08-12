import fs from "node:fs";

import LinguistLanguages from "linguist-languages";
import prettier, { SupportLanguage } from "prettier";

function getSupportLanguages() {
  const supportLanguages: SupportLanguage[] = [];

  for (const language of Object.values(LinguistLanguages)) {
    if (language.aceMode === "ini") {
      const { type, color, aceMode, languageId, ...config } = language;

      supportLanguages.push({
        ...config,
        since: "0.1.0",
        parsers: ["ini"],
        linguistLanguageId: languageId,
        vscodeLanguageIds: ["ini"]
      });
    }
  }

  return supportLanguages;
}

const languages = JSON.stringify(getSupportLanguages());
const source = `import { SupportLanguage } from "prettier";
const languages: SupportLanguage[] = ${languages};
export default languages;`;

fs.writeFileSync("src/languages.ts", prettier.format(source, { parser: "typescript" }));
