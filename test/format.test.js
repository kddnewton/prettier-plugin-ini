import { readFileSync } from "fs";
import { format } from "prettier";
import plugin from "../src/plugin.js";

describe.each(["with-sections", "no-sections"])("%s", (fixtureFile) => {
  const fixturePath = new URL(`./fixtures/${fixtureFile}.ini`, import.meta.url);
  const fixture = readFileSync(fixturePath, "utf-8");

  test("defaults", async () => {
    const formatted = await format(fixture, {
      parser: "ini",
      plugins: [plugin],
      iniSpaceAroundEquals: false
    });

    expect(formatted).toMatchSnapshot();
  });

  test("with space around equals", async () => {
    const formatted = await format(fixture, {
      parser: "ini",
      plugins: [plugin],
      iniSpaceAroundEquals: true
    });

    expect(formatted).toMatchSnapshot();
  });
});
