import { ok, strictEqual } from "assert";
import { TempDirectory } from "@manuth/temp-files";
import dedent = require("dedent");
import { writeFile } from "fs-extra";
import { basename } from "upath";
import { SassVariableParser } from "../../../Customization/Presentation/Themes/SassVariableParser";

/**
 * Registers tests for the `SassVariableParser` class.
 */
export function SassVariableParserTests(): void
{
    suite(
        "SassVariableParser",
        () =>
        {
            let mainFile: string;
            let importFile: string;
            let tempDir: TempDirectory;

            let var1Name: string;
            let var1Value: string;
            let var2Name: string;
            let var2Value: string;
            let var2RawValue: string;
            let var3Name: string;

            let variablesWithoutImport: Map<string, string>;
            let variablesWithImport: Map<string, string>;

            /**
             * Prefixes a variable-name for scss.
             *
             * @param varName
             * The variable-name to prefix.
             *
             * @returns
             * The prefixed variable-name.
             */
            function prefix(varName: string): string
            {
                return `$${varName}`;
            }

            suiteSetup(
                async () =>
                {
                    mainFile = "main.scss";
                    importFile = "import.scss";
                    tempDir = new TempDirectory();

                    var1Name = "a";
                    var1Value = "#000";
                    var2Name = "b";
                    var2Value = "Hello World";
                    var2RawValue = `"${var2Value}"`;
                    var3Name = "c";

                    await writeFile(tempDir.MakePath(mainFile), `${prefix(var1Name)}: ${var1Value};`);

                    await writeFile(
                        tempDir.MakePath(importFile),
                        dedent(
                            `
                            @import "${basename(mainFile)}";
                            ${prefix(var2Name)}: ${var2RawValue};
                            ${prefix(var3Name)}: ${prefix(var1Name)};`
                        ));

                    variablesWithoutImport = new Map(Object.entries(await new SassVariableParser(tempDir.MakePath(mainFile)).Parse()));
                    variablesWithImport = new Map(Object.entries(await new SassVariableParser(tempDir.MakePath(importFile)).Parse()));
                });

            suiteTeardown(
                () =>
                {
                    tempDir.Dispose();
                });

            suite(
                "Parse",
                () =>
                {
                    suite(
                        "General",
                        () =>
                        {
                            test(
                                "Checking whether dollar-signs are stripped from the variable-names…",
                                () =>
                                {
                                    ok(!variablesWithoutImport.has(prefix(var1Name)));
                                    ok(variablesWithoutImport.has(var1Name));
                                });
                        });

                    suite(
                        "Testing scss-files without import-statements…",
                        () =>
                        {
                            test(
                                "Checking whether expected variable is present…",
                                () => ok(variablesWithoutImport.has(var1Name)));

                            test(
                                "Checking whether the value of the expected variable is correct…",
                                () => strictEqual(variablesWithoutImport.get(var1Name), var1Value));
                        });

                    suite(
                        "Testing scss-files with import-statements…",
                        () =>
                        {
                            test(
                                "Checking whether the expected variables are present…",
                                () =>
                                {
                                    ok(variablesWithImport.has(var2Name));
                                    ok(variablesWithImport.has(var3Name));
                                });

                            test(
                                "Checking whether variables imported variables are not present…",
                                () =>
                                {
                                    ok(!variablesWithImport.has(var1Name));
                                });

                            test(
                                "Checking whether independent variables have the correct value…",
                                () =>
                                {
                                    strictEqual(variablesWithImport.get(var2Name), var2Value);
                                });

                            test(
                                "Checking whether variables which depend on imports have the correct value…",
                                () =>
                                {
                                    strictEqual(variablesWithImport.get(var3Name), var1Value);
                                });
                        });
                });
        });
}
