const fs = require("node:fs");
const path = require("node:path");

const linguistLanguages = require("linguist-languages");
const prettier = require("prettier");

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

const packagePath = path.join(path.dirname(__dirname), "package.json");
const packageConfig = JSON.parse(fs.readFileSync(packagePath, "utf8"));
const { plugins, ...prettierConfig } = packageConfig.prettier;

fs.writeFileSync(
  "src/languages.js",
  prettier.format(`module.exports = ${languages};`, { parser: "babel", ...prettierConfig })
);
