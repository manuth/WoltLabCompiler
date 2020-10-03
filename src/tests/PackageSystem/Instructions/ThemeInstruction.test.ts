import Assert = require("assert");
import Path = require("path");
import { ThemeInstruction } from "../../../PackageSystem/Instructions/Customization/Presentation/ThemeInstruction";

suite(
    "ThemeInstruction",
    () =>
    {
        let ThemeName: string;
        let themeInstruction: ThemeInstruction;

        suiteSetup(
            () =>
            {
                ThemeName = "Foo";

                themeInstruction = new ThemeInstruction({
                    Theme: {
                        Name: ThemeName,
                        DisplayName: {}
                    }
                });
            });

        suite(
            "FileName",
            () =>
            {
                test(
                    "Checking whether the filename is set to the name of the theme if no filename is specified…",
                    () =>
                    {
                        Assert.strictEqual(Path.parse(themeInstruction.FileName).name, ThemeName);
                    });
            });
    });
