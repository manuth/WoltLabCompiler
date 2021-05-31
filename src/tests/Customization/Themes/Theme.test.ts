import { ok, strictEqual } from "assert";
import { EOL } from "os";
import { TempDirectory } from "@manuth/temp-files";
import dedent = require("dedent");
import { writeFile, writeJSON } from "fs-extra";
import { Theme } from "../../../Customization/Presentation/Themes/Theme";
import { ThemeInstruction } from "../../../PackageSystem/Instructions/Customization/Presentation/ThemeInstruction";
import { Package } from "../../../PackageSystem/Package";
import { Person } from "../../../PackageSystem/Person";

/**
 * Registers tests for the `Theme` class.
 */
export function ThemeTests(): void
{
    suite(
        "Theme",
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
                Special?: boolean;

                /**
                 * @inheritdoc
                 */
                Source: "scss" | "json";
            }

            let theme: Theme;
            let author: Person;
            let tempDir: TempDirectory;
            let customScss: string;
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
                    Special: true
                },
                {
                    Name: "bar",
                    Input: "#000",
                    Output: "#000",
                    Source: "scss",
                    Special: true
                }
            ];

            suiteSetup(
                async () =>
                {
                    author = new Person(
                        {
                            Name: "John Doe",
                            URL: "example.com"
                        });

                    let $package = new Package(
                        {
                            DisplayName: {},
                            Author: author,
                            Identifier: "test",
                            InstallSet: {
                                Instructions: []
                            }
                        });

                    tempDir = new TempDirectory();

                    customScss = dedent(
                        `
                            :root
                            {
                                color: red !important;
                            }`);

                    let customScssFileName: string = tempDir.MakePath("custom.scss");
                    let scssOverrideFileName: string = tempDir.MakePath("override.scss");
                    let variableFileName: string = tempDir.MakePath("variables.json");

                    await writeFile(customScssFileName, customScss);

                    await writeFile(
                        scssOverrideFileName,
                        variables.filter(
                            (variable: IVariable) =>
                            {
                                return variable.Source === "scss";
                            }).map(
                                (variable: IVariable) =>
                                {
                                    return `$${variable.Name}: ${variable.Input};`;
                                }
                            ).join(EOL));

                    await writeJSON(
                        variableFileName,
                        variables.filter(
                            (variable: IVariable) =>
                            {
                                return variable.Source === "json";
                            }).reduce<Record<string, unknown>>(
                                (previousValue: Record<string, unknown>, currentValue: IVariable) =>
                                {
                                    previousValue[currentValue.Name] = currentValue.Input;
                                    return previousValue;
                                },
                                {}));

                    let instruction = new ThemeInstruction(
                        {
                            Theme: {
                                Name: "test",
                                DisplayName: {},
                                CustomScssFileName: customScssFileName,
                                ScssOverrideFileName: scssOverrideFileName,
                                VariableFileName: variableFileName
                            }
                        });

                    $package.InstallSet.push(instruction);
                    theme = await instruction.ThemeLoader.Load();
                });

            suiteTeardown(
                () =>
                {
                    tempDir.Dispose();
                });

            suite(
                "Author",
                () =>
                {
                    test(
                        "Checking whether the `Author`-property equals the author of the package if no author is specified…",
                        () =>
                        {
                            strictEqual(theme.Author.Name, author.Name);
                            strictEqual(theme.Author.URL, author.URL);
                        });
                });

            suite(
                "CustomScss",
                () =>
                {
                    test(
                        "Checking whether the `CustomScss`-property equals the content of the scss-file…",
                        () => strictEqual(theme.CustomScss, customScss));
                });

            suite(
                "ScssOverride",
                () =>
                {
                    let specialScssVariable: IVariable;
                    let specialJsonVariable: IVariable;

                    suiteSetup(
                        () =>
                        {
                            specialScssVariable = variables.find(
                                (variable: IVariable) => (variable.Source === "scss") && (variable.Special));
                            specialJsonVariable = variables.find(
                                (variable: IVariable) => (variable.Source === "json") && (variable.Special));
                        });

                    suite(
                        "Testing whether special scss-variables are added to `ScssOverride`…",
                        () =>
                        {
                            test(
                                "Checking whether special scss-variables written in scss are added…",
                                () =>
                                {
                                    ok(theme.ScssOverride.includes(`$${specialScssVariable.Name}: ${specialScssVariable.Input};`));
                                });

                            test(
                                "Checking whether special scss-variables written in json are added…",
                                () =>
                                {
                                    ok(theme.ScssOverride.includes(`$${specialJsonVariable.Name}: ${specialJsonVariable.Input};`));
                                });
                        });
                });

            suite(
                "Variables",
                () =>
                {
                    let scssVariable: IVariable;
                    let jsonVariable: IVariable;

                    suiteSetup(
                        () =>
                        {
                            scssVariable = variables.find(
                                (variable: IVariable) => (variable.Source === "scss") && (!variable.Special));
                            jsonVariable = variables.find(
                                (variable: IVariable) => (variable.Source === "json") && (!variable.Special));
                        });

                    suite(
                        "Testing whether normal variables are added to to `Variables`…",
                        () =>
                        {
                            test(
                                "Checking whether variables written in scss are added…",
                                () =>
                                {
                                    ok(theme.Variables.has(scssVariable.Name));
                                });

                            test(
                                "Checking whether variables written in json are added…",
                                () =>
                                {
                                    ok(theme.Variables.has(jsonVariable.Name));
                                });
                        });

                    suite(
                        "Testing whether normal variables are parsed correctly…",
                        () =>
                        {
                            for (let variable of variables)
                            {
                                if (!variable.Special)
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
        });
}
