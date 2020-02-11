const fs = require("fs");
const path = require("path");
const prettier = require("prettier");

const fixture = fs.readFileSync(path.join(__dirname, "./fixture.ini"), "utf-8");
const format = content => prettier.format(content, { parser: "ini", plugins: ["."] });

test("defaults", () => {
  const formatted = format(fixture);
  expect(formatted).toMatchSnapshot();
});
