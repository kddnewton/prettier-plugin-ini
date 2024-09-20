import { writeFileSync } from "node:fs";
import linguistLanguages from "linguist-languages";
import { format } from "prettier";
import packageJSON from "../package.json" assert { type: "json" };

function getSupportLanguages() {
  const supportLanguages = [];

  for (const language of Object.values(linguistLanguages)) {
    if (language.aceMode === "ini") {
      const {
        type,
        color,
        aceMode,
        languageId,
        filenames = [],
        ...config
      } = language;

      supportLanguages.push({
        ...config,
        filenames: filenames.filter(
          (filename) => filename !== "HOSTS" && filename !== "hosts"
        ),
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

format(`export default ${languages};`, {
  parser: "babel",
  ...prettierConfig
}).then((formatted) => {
  writeFileSync("src/languages.js", formatted);
});
