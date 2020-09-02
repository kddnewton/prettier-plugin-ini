const fs = require("fs");
const path = require("path");
const prettier = require("prettier");

const fixtureFiles = ["with-sections", "no-sections"];
const format = (content, options) =>
  prettier.format(content, { parser: "ini", plugins: ["."], ...options });

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
