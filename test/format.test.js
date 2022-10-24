const fs = require("fs");
const path = require("path");
const prettier = require("prettier");
const plugin = require("../src/plugin");

const fixtureFiles = ["with-sections", "no-sections"];

function format(content, opts) {
  return prettier.format(content, {
    parser: "ini",
    plugins: [plugin],
    ...opts
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
