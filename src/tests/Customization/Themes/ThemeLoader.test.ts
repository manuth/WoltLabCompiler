import { ok, strictEqual } from "assert";
import { EOL } from "os";
import { TempDirectory } from "@manuth/temp-files";
import dedent = require("dedent");
import { writeFile, writeJSON } from "fs-extra";
import { Theme } from "../../../Customization/Presentation/Themes/Theme";
import { ThemeLoader } from "../../../Customization/Presentation/Themes/ThemeLoader";
import { ThemeInstruction } from "../../../PackageSystem/Instructions/Customization/Presentation/ThemeInstruction";
import { Package } from "../../../PackageSystem/Package";

/**
 * Registers tests for the theme-loader.
 */
export function ThemeLoaderTests(): void
{
    suite(
        nameof(ThemeLoader),
        () =>
        {
            /**
             * Represents a variable.
             */
            interface IVariable
            {
                /**
                 * @inheritdoc
                 */
                Name: string;

                /**
                 * @inheritdoc
                 */
                Input: string;

                /**
                 * @inheritdoc
                 */
                Output: string;

                /**
                 * @inheritdoc
                 */
                Custom?: boolean;

                /**
                 * @inheritdoc
                 */
                Source: "scss" | "json";
            }

            let variables: IVariable[] = [
                {
                    Name: "wcfHeaderBackground",
                    Input: "#056",
                    Output: "rgba(0, 85, 102, 1)",
                    Source: "scss"
                },
                {
                    Name: "wcfHeaderText",
                    Input: "#056C",
                    Output: "rgba(0, 85, 102, 0.8)",
                    Source: "json"
                },
                {
                    Name: "wcfHeaderLinkActive",
                    Input: "#056CA5",
                    Output: "rgba(5, 108, 165, 1)",
                    Source: "json"
                },
                {
                    Name: "wcfHeaderSearchBoxBackground",
                    Input: "#056CA5C7",
                    Output: "rgba(5, 108, 165, 0.78)",
                    Source: "json"
                },
                {
                    Name: "wcfHeaderSearchBoxText",
                    Input: "teal",
                    Output: "rgba(0, 128, 128, 1)",
                    Source: "json"
                },
                {
                    Name: "foo",
                    Input: "#000",
                    Output: "#000",
                    Source: "json",
                    Custom: true
                },
                {
                    Name: "bar",
                    Input: "#000",
                    Output: "#000",
                    Source: "scss",
                    Custom: true
                }
            ];

            let themeLoader: ThemeLoader;
            let theme: Theme;
            let tempDir: TempDirectory;
            let customScss: string;

            suiteSetup(
                async () =>
                {
                    tempDir = new TempDirectory();

                    customScss = dedent(
                        `
                            :resolution
                            {
                                color: red !important;
                            }`);

                    let customScssFileName = tempDir.MakePath("custom.scss");
                    let scssOverrideFileName = tempDir.MakePath("override.scss");
                    let variableFileName = tempDir.MakePath("variables.json");

                    let $package = new Package(
                        {
                            DisplayName: {},
                            Identifier: "test",
                            Version: "0.0.0",
                            InstallSet: {
                                Instructions: []
                            }
                        });

                    let instruction = new ThemeInstruction(
                        {
                            Theme: {
                                DisplayName: {},
                                Name: ""
                            }
                        });

                    $package.InstallSet.push(instruction);
                    await writeFile(customScssFileName, customScss);

                    await writeFile(
                        scssOverrideFileName,
                        variables.filter(
                            (variable) =>
                            {
                                return variable.Source === "scss";
                            }).map(
                                (variable) =>
                                {
                                    return `$${variable.Name}: ${variable.Input};`;
                                }
                            ).join(EOL));

                    await writeJSON(
                        variableFileName,
                        variables.filter(
                            (variable) =>
                            {
                                return variable.Source === "json";
                            }).reduce<Record<string, unknown>>(
                                (previousValue, currentValue) =>
                                {
                                    previousValue[currentValue.Name] = currentValue.Input;
                                    return previousValue;
                                },
                                {}));

                    themeLoader = new ThemeLoader(
                        instruction,
                        {
                            Name: "test",
                            DisplayName: {},
                            CustomScssFileName: customScssFileName,
                            ScssOverrideFileName: scssOverrideFileName,
                            VariableFileName: variableFileName
                        });
                });

            setup(
                async () =>
                {
                    theme = await themeLoader.Load();
                });

            suite(
                nameof<ThemeLoader>((loader) => loader.Load),
                () =>
                {
                    suite(
                        "Custom `.scss`-code",
                        () =>
                        {
                            test(
                                `Checking whether the \`${nameof<Theme>((t) => t.CustomScss)}\`-property is loaded from the corresponding \`.scss\`-file…`,
                                () =>
                                {
                                    strictEqual(theme.CustomScss, customScss);
                                });
                        });

                    suite(
                        "Scss-Variables",
                        () =>
                        {
                            let scssVariable: IVariable;
                            let jsonVariable: IVariable;

                            suiteSetup(
                                () =>
                                {
                                    scssVariable = variables.find(
                                        (variable) => variable.Source === "scss" && !variable.Custom);

                                    jsonVariable = variables.find(
                                        (variable) => variable.Source === "json" && !variable.Custom);
                                });

                            suite(
                                "General",
                                () =>
                                {
                                    test(
                                        `Checking whether woltlab-variables written in \`.scss\`-files are added to the theme's \`${nameof<Theme>((theme) => theme.Variables)}\`…`,
                                        () =>
                                        {
                                            ok(theme.Variables.has(scssVariable.Name));
                                        });

                                    test(
                                        `Checking whether woltlab-variables written in \`.json\`-files are added to the theme's \`${nameof<Theme>((theme) => theme.Variables)}\`…`,
                                        () =>
                                        {
                                            ok(theme.Variables.has(jsonVariable.Name));
                                        });
                                });

                            suite(
                                "Testing the parsing of woltlab-variables…",
                                () =>
                                {
                                    for (let variable of variables)
                                    {
                                        if (!variable.Custom)
                                        {
                                            test(
                                                `Checking whether "${variable.Input}" is parsed correctly (expecting "${variable.Output}")…`,
                                                () =>
                                                {
                                                    strictEqual(theme.Variables.get(variable.Name), variable.Output);
                                                });
                                        }
                                    }
                                });
                        });

                    suite(
                        "Scss-Overrides",
                        () =>
                        {
                            let scssVariable: IVariable;
                            let jsonVariable: IVariable;

                            suiteSetup(
                                () =>
                                {
                                    scssVariable = variables.find(
                                        (variable) => variable.Source === "scss" && variable.Custom);

                                    jsonVariable = variables.find(
                                        (variable) => variable.Source === "json" && variable.Custom);
                                });

                            test(
                                `Checking whether custom scss-variables written in \`.scss\`-files are added to the ${nameof<Theme>((theme) => theme.ScssOverride)}…`,
                                () =>
                                {
                                    ok(theme.ScssOverride.includes(`$${scssVariable.Name}: ${scssVariable.Input};`));
                                });

                            test(
                                `Checking whether custom scss-variables written in \`.json\`-files are added to the ${nameof<Theme>((theme) => theme.ScssOverride)}…`,
                                () =>
                                {
                                    ok(theme.ScssOverride.includes(`$${jsonVariable.Name}: ${jsonVariable.Input};`));
                                });
                        });
                });
        });
}
