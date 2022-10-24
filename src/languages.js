export default [
  {
    name: "Altium Designer",
    aliases: ["altium"],
    extensions: [".OutJob", ".PcbDoc", ".PrjPCB", ".SchDoc"],
    tmScope: "source.ini",
    since: "0.1.0",
    parsers: ["ini"],
    linguistLanguageId: 187772328,
    vscodeLanguageIds: ["ini"]
  },
  {
    name: "EditorConfig",
    group: "INI",
    filenames: [".editorconfig"],
    aliases: ["editor-config"],
    codemirrorMode: "properties",
    codemirrorMimeType: "text/x-properties",
    tmScope: "source.editorconfig",
    since: "0.1.0",
    parsers: ["ini"],
    linguistLanguageId: 96139566,
    vscodeLanguageIds: ["ini"]
  },
  {
    name: "Git Config",
    group: "INI",
    aliases: ["gitconfig", "gitmodules"],
    extensions: [".gitconfig"],
    filenames: [".gitconfig", ".gitmodules"],
    codemirrorMode: "properties",
    codemirrorMimeType: "text/x-properties",
    tmScope: "source.gitconfig",
    since: "0.1.0",
    parsers: ["ini"],
    linguistLanguageId: 807968997,
    vscodeLanguageIds: ["ini"]
  },
  {
    name: "INI",
    extensions: [
      ".ini",
      ".cfg",
      ".dof",
      ".lektorproject",
      ".prefs",
      ".pro",
      ".properties",
      ".url"
    ],
    filenames: [
      ".coveragerc",
      ".flake8",
      ".pylintrc",
      "buildozer.spec",
      "pylintrc"
    ],
    tmScope: "source.ini",
    aliases: ["dosini"],
    codemirrorMode: "properties",
    codemirrorMimeType: "text/x-properties",
    since: "0.1.0",
    parsers: ["ini"],
    linguistLanguageId: 163,
    vscodeLanguageIds: ["ini"]
  },
  {
    name: "ShellCheck Config",
    filenames: [".shellcheckrc"],
    aliases: ["shellcheckrc"],
    tmScope: "source.shellcheckrc",
    codemirrorMode: "properties",
    codemirrorMimeType: "text/x-properties",
    since: "0.1.0",
    parsers: ["ini"],
    linguistLanguageId: 687511714,
    vscodeLanguageIds: ["ini"]
  },
  {
    name: "Win32 Message File",
    extensions: [".mc"],
    tmScope: "source.win32-messages",
    codemirrorMode: "properties",
    codemirrorMimeType: "text/x-properties",
    since: "0.1.0",
    parsers: ["ini"],
    linguistLanguageId: 950967261,
    vscodeLanguageIds: ["ini"]
  },
  {
    name: "Windows Registry Entries",
    extensions: [".reg"],
    tmScope: "source.reg",
    codemirrorMode: "properties",
    codemirrorMimeType: "text/x-properties",
    since: "0.1.0",
    parsers: ["ini"],
    linguistLanguageId: 969674868,
    vscodeLanguageIds: ["ini"]
  }
];
