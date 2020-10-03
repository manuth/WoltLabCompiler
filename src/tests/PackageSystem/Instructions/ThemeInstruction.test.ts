import { strictEqual } from "assert";
import { parse } from "upath";
import { ThemeInstruction } from "../../../PackageSystem/Instructions/Customization/Presentation/ThemeInstruction";

/**
 * Registers tests for the `ThemeInstruction` class.
 */
export function ThemeInstructionTests(): void
{
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
                            strictEqual(parse(themeInstruction.FileName).name, ThemeName);
                        });
                });
        });
}
