import { strictEqual } from "assert";
import path from "upath";
import { ThemeInstruction } from "../../../../../PackageSystem/Instructions/Customization/Presentation/ThemeInstruction.js";

const { parse } = path;

/**
 * Registers tests for the {@link ThemeInstruction `ThemeInstruction`} class.
 */
export function ThemeInstructionTests(): void
{
    suite(
        nameof(ThemeInstruction),
        () =>
        {
            let ThemeName: string;
            let themeInstruction: ThemeInstruction;

            suiteSetup(
                () =>
                {
                    ThemeName = "Foo";

                    themeInstruction = new ThemeInstruction(
                        {
                            Theme: {
                                Name: ThemeName,
                                DisplayName: {}
                            }
                        });
                });

            suite(
                nameof<ThemeInstruction>((instruction) => instruction.FileName),
                () =>
                {
                    test(
                        `Checking whether the \`${nameof<ThemeInstruction>((i) => i.FileName)}\`-property is set to the name of the theme if no filename is specified…`,
                        () =>
                        {
                            strictEqual(parse(themeInstruction.FileName).name, ThemeName);
                        });
                });
        });
}
