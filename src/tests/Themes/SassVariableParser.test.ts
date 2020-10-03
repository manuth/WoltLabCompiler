import Assert = require("assert");
import Path = require("path");
import Dedent = require("dedent");
import FileSystem = require("fs-extra");
import { TempDirectory } from "temp-filesystem";
import { SassVariableParser } from "../../Customization/Presentation/Themes/SassVariableParser";

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
                var2Value = '"Hello World"';

                await FileSystem.writeFile(tempDir.MakePath(mainFile), `$${var1Name}: ${var1Value};`);
                await FileSystem.writeFile(
                    tempDir.MakePath(importFile),
                    Dedent(
                        `
                        @import "${Path.basename(mainFile)}";
                        $${var2Name}: ${var2Value};
                        $${var3Name}: $${var1Name};`
                    ));

                variablesWithoutImport = new SassVariableParser(tempDir.MakePath(mainFile)).Parse();
                variablesWithImport = new SassVariableParser(tempDir.MakePath(importFile)).Parse();
            });

        suiteTeardown(
            () =>
            {
                tempDir.Dispose();
            });

        suite(
            "Testing scss-files without import-statements…",
            () =>
            {
                test(
                    "Checking whether expected variable is present…",
                    () => Assert.strictEqual(var1Name in variablesWithoutImport, true));

                test(
                    "Checking whether the value of the expected variable is correct…",
                    () => Assert.strictEqual(variablesWithoutImport[var1Name], var1Value));
            });

        suite(
            "Testing scss-files with import-statements…",
            () =>
            {
                test(
                    "Checking whether the expected variables are present…",
                    () =>
                    {
                        Assert.strictEqual(var2Name in variablesWithImport, true);
                        Assert.strictEqual(var3Name in variablesWithImport, true);
                    });

                test(
                    "Checking whether variables imported variables are not present…",
                    () =>
                    {
                        Assert.strictEqual(var1Name in variablesWithImport, false);
                    });

                test(
                    "Checking whether independent variables have the correct value…",
                    () =>
                    {
                        Assert.strictEqual(variablesWithImport[var2Name], var2Value);
                    });

                test(
                    "Checking whether variables which depend on imports have the correct value…",
                    () =>
                    {
                        Assert.strictEqual(variablesWithImport[var3Name], var1Value);
                    });
            });
    });
