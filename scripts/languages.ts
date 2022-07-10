import fs from "node:fs";
import { get } from "node:https";

import createHttpsProxyAgent from "https-proxy-agent";
import { load } from "js-yaml";
import _ from "lodash";
import { SupportLanguage } from "prettier";

const proxyUrl =
  process.env.https_proxy || process.env.http_proxy || process.env.all_proxy;

const linguistLanguages =
  "https://raw.githubusercontent.com/github/linguist/master/lib/linguist/languages.yml";

export interface LinguistLanguage {
  type: string;
  group: string;
  color: string;
  aliases: string[];
  extensions: string[];
  filenames: string[];
  tm_scope: string;
  ace_mode: string;
  codemirror_mode: string;
  codemirror_mime_type: string;
  language_id: number;
}

const getSupportLanguages = (
  languages: Record<string, LinguistLanguage>,
  parser: "ini",
  aceModes: string[]
) =>
  Object.entries(languages).reduce<SupportLanguage[]>(
    (acc, [name, language]) => {
      const {
        ace_mode: aceMode,
        tm_scope: tmScope,
        codemirror_mode: codemirrorMode,
        codemirror_mime_type: codemirrorMimeType,
        language_id: linguistLanguageId
      } = language;
      if (!aceModes.includes(aceMode)) {
        return acc;
      }
      acc.push({
        name,
        since: "0.1.0",
        parsers: [parser],
        ..._.pick(
          language,
          "group",
          "aliases",
          "extensions",
          "filenames",
          "interpreters"
        ),
        tmScope,
        aceMode,
        codemirrorMode,
        codemirrorMimeType,
        linguistLanguageId,
        vscodeLanguageIds: [aceMode]
      });
      return acc;
    },
    []
  );

get(
  linguistLanguages,
  {
    agent: proxyUrl ? createHttpsProxyAgent(proxyUrl) : undefined
  },
  (res) => {
    let rawText = "";
    res.on("data", (data: Buffer) => {
      rawText += data.toString();
    });
    res.on("end", () => {
      const allLanguages = load(rawText) as Record<string, LinguistLanguage>;

      fs.writeFileSync(
        "src/languages.ts",
        `import { SupportLanguage } from 'prettier'

export const languages: SupportLanguage[] = ${JSON.stringify(
          getSupportLanguages(allLanguages, "ini", ["ini"]),
          null,
          2
        )}
`
      );
    });
  }
);
