const fs = require("fs");
const path = require("path");
const prettier = require("prettier");

const fixture = fs.readFileSync(path.join(__dirname, "./fixture.ini"), "utf-8");
const format = (content, options) =>
  prettier.format(content, { parser: "ini", plugins: ["."], ...options });

test("defaults", () => {
  const formatted = format(fixture, { iniSpaceAroundEquals: false });
  expect(formatted).toMatchSnapshot();
});

test("with space around equals", () => {
  const formatted = format(fixture, { iniSpaceAroundEquals: true });
  expect(formatted).toMatchSnapshot();
});
