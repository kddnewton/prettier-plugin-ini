import fs from "node:fs";

import LinguistLanguages from "linguist-languages";
import { SupportLanguage } from "prettier";

const getSupportLanguages = (parser: "ini", aceModes: string[]) =>
  Object.values(LinguistLanguages).reduce<SupportLanguage[]>(
    (
      acc,
      { type, color, aceMode, languageId: linguistLanguageId, ...language }
    ) => {
      if (!aceModes.includes(aceMode)) {
        return acc;
      }
      acc.push({
        ...language,
        since: "0.1.0",
        parsers: [parser],
        linguistLanguageId,
        vscodeLanguageIds: [aceMode]
      });
      return acc;
    },
    []
  );

fs.writeFileSync(
  "src/languages.ts",
  `import { SupportLanguage } from 'prettier'

export const languages: SupportLanguage[] = ${JSON.stringify(
    getSupportLanguages("ini", ["ini"]),
    null,
    2
  )}
`
);
