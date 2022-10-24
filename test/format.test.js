import { readFileSync } from "fs";
import prettier from "prettier";
import plugin from "../src/plugin.js";

const fixtureFiles = ["with-sections", "no-sections"];

function format(content, opts) {
  return prettier.format(content, {
    parser: "ini",
    plugins: [plugin],
    ...opts
  });
}

fixtureFiles.forEach((fixtureFile) => {
  const fixturePath = new URL(`./fixtures/${fixtureFile}.ini`, import.meta.url);
  const fixture = readFileSync(fixturePath, "utf-8");

  describe(`${fixtureFile}:`, () => {
    test("defaults", async () => {
      const formatted = await format(fixture, { iniSpaceAroundEquals: false });
      expect(formatted).toMatchSnapshot();
    });

    test("with space around equals", async () => {
      const formatted = await format(fixture, { iniSpaceAroundEquals: true });
      expect(formatted).toMatchSnapshot();
    });
  });
});
