import { writeFileSync } from "node:fs";
import linguistLanguages from "linguist-languages";
import { format } from "prettier";
import packageJSON from "../package.json" assert { type: "json" };

function getSupportLanguages() {
  const supportLanguages = [];

  for (const language of Object.values(linguistLanguages)) {
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
const { plugins, ...prettierConfig } = packageJSON.prettier;

writeFileSync("src/languages.js", format(`export default ${languages};`, { parser: "babel", ...prettierConfig }));
