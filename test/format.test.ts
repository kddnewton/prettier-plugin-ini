import fs from "fs";
import path from "path";
import prettier from "prettier";

import { INIOptions } from "../src/printer";
import plugin from "../src/plugin";

const fixtureFiles = ["with-sections", "no-sections"];

function format(content: string, options: Partial<INIOptions>) {
  return prettier.format(content, {
    parser: "ini",
    plugins: [plugin],
    ...options
  });
}

fixtureFiles.forEach((fixtureFile) => {
  const fixturePath = path.join(__dirname, "./fixtures/", `${fixtureFile}.ini`);
  const fixture = fs.readFileSync(fixturePath, "utf-8");

  describe(`${fixtureFile}:`, () => {
    test("defaults", () => {
      const formatted = format(fixture, { iniSpaceAroundEquals: false });
      expect(formatted).toMatchSnapshot();
    });

    test("with space around equals", () => {
      const formatted = format(fixture, { iniSpaceAroundEquals: true });
      expect(formatted).toMatchSnapshot();
    });
  });
});
