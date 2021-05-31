import { ok, strictEqual } from "assert";
import { TempDirectory } from "@manuth/temp-files";
import dedent = require("dedent");
import { writeFile } from "fs-extra";
import { basename } from "upath";
import { SassVariableParser } from "../../Customization/Presentation/Themes/SassVariableParser";

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

            let variablesWithoutImport: Record<string, string>;
            let variablesWithImport: Record<string, string>;

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

                    await writeFile(tempDir.MakePath(mainFile), `$${var1Name}: ${var1Value};`);

                    await writeFile(
                        tempDir.MakePath(importFile),
                        dedent(
                            `
                            @import "${basename(mainFile)}";
                            $${var2Name}: ${var2RawValue};
                            $${var3Name}: $${var1Name};`
                        ));

                    variablesWithoutImport = await new SassVariableParser(tempDir.MakePath(mainFile)).Parse();
                    variablesWithImport = await new SassVariableParser(tempDir.MakePath(importFile)).Parse();
                    console.log();
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

                });

            suite(
                "Testing scss-files without import-statements…",
                () =>
                {
                    test(
                        "Checking whether expected variable is present…",
                        () => strictEqual(var1Name in variablesWithoutImport, true));

                    test(
                        "Checking whether the value of the expected variable is correct…",
                        () => strictEqual(variablesWithoutImport[var1Name], var1Value));
                });

            suite(
                "Testing scss-files with import-statements…",
                () =>
                {
                    test(
                        "Checking whether the expected variables are present…",
                        () =>
                        {
                            ok(var2Name in variablesWithImport);
                            ok(var3Name in variablesWithImport);
                        });

                    test(
                        "Checking whether variables imported variables are not present…",
                        () =>
                        {
                            strictEqual(var1Name in variablesWithImport, false);
                        });

                    test(
                        "Checking whether independent variables have the correct value…",
                        () =>
                        {
                            strictEqual(variablesWithImport[var2Name], var2Value);
                        });

                    test(
                        "Checking whether variables which depend on imports have the correct value…",
                        () =>
                        {
                            strictEqual(variablesWithImport[var3Name], var1Value);
                        });
                });
        });
}
