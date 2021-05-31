import { ok, strictEqual } from "assert";
import { TempDirectory } from "@manuth/temp-files";
import { ensureDir, ensureFile, writeFile } from "fs-extra";
import { IThemeOptions } from "../../../Customization/Presentation/Themes/IThemeOptions";
import { ThemeInstructionCollection } from "../../../Customization/Presentation/Themes/ThemeInstructionCollection";
import { ThemeInstruction } from "../../../PackageSystem/Instructions/Customization/Presentation/ThemeInstruction";

/**
 * Registers tests for the `ThemeInstructionCollection` class.
 */
export function ThemeInstructionCollectionTests(): void
{
    suite(
        "ThemeInstructionCollection",
        () =>
        {
            let collection: ThemeInstructionCollection;
            let themeRoot: TempDirectory;
            let themeDirectories: string[];
            let name: string;

            suiteSetup(
                async () =>
                {
                    themeRoot = new TempDirectory();
                    themeDirectories = ["foo", "bar", "baz", "this", "is", "a", "test"];
                    name = "Foo";

                    for (let themeDirectory of themeDirectories)
                    {
                        let tsPath: string = themeRoot.MakePath(themeDirectory, "Theme.ts");
                        let jsPath: string = themeRoot.MakePath(themeDirectory, "Theme.js");

                        await ensureDir(themeRoot.MakePath(themeDirectory));
                        await ensureFile(tsPath);
                        await ensureFile(jsPath);
                        await writeFile(tsPath, "");

                        await writeFile(jsPath, `module.exports = ${JSON.stringify(
                            {
                                Name: name,
                                DisplayName: {}
                            } as IThemeOptions)}`);
                    }
                });

            suiteTeardown(
                () =>
                {
                    themeRoot.Dispose();
                });

            suite(
                "constructor",
                () =>
                {
                    test(
                        "Checking whether a new ThemeInstructionCollection can be initialized…",
                        () =>
                        {
                            collection = new ThemeInstructionCollection(themeRoot.FullName);
                        });

                    test(
                        "Checking whether themes are automatically added to the collection…",
                        () =>
                        {
                            strictEqual(collection.length, themeDirectories.length);
                        });

                    test(
                        "Checking whether the meta-data is applied correctly…",
                        () =>
                        {
                            ok(collection.every((themeInstruction: ThemeInstruction) => themeInstruction.ThemeLoader.Name === name));
                        });
                });
        });
}
