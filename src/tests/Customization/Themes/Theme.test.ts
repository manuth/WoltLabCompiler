import { strictEqual } from "assert";
import { IThemeOptions } from "../../../Customization/Presentation/Themes/IThemeOptions";
import { Theme } from "../../../Customization/Presentation/Themes/Theme";
import { ThemeInstruction } from "../../../PackageSystem/Instructions/Customization/Presentation/ThemeInstruction";
import { Package } from "../../../PackageSystem/Package";
import { Person } from "../../../PackageSystem/Person";
import { VersionNumber } from "../../../PackageSystem/VersionNumber";

/**
 * Registers tests for the {@link Theme `Theme`} class.
 */
export function ThemeTests(): void
{
    suite(
        nameof(Theme),
        () =>
        {
            let themeOptions: IThemeOptions;
            let theme: Theme;
            let themeWithAuthor: Theme;
            let version: VersionNumber;
            let customVersion: VersionNumber;
            let author: Person;
            let customAuthor: Person;

            suiteSetup(
                async () =>
                {
                    version = "1.0.0 Alpha 7";
                    customVersion = "1.3.3 dev 7";

                    author = new Person(
                        {
                            Name: "John Doe",
                            URL: "example.com"
                        });

                    customAuthor = new Person(
                        {
                            Name: "Jane Doe",
                            URL: "contoso.com"
                        });

                    let $package = new Package(
                        {
                            DisplayName: {},
                            Author: author,
                            Identifier: "test",
                            Version: version,
                            InstallSet: {
                                Instructions: []
                            }
                        });

                    let instruction = new ThemeInstruction(
                        {
                            Theme: {
                                Name: "test",
                                DisplayName: {}
                            }
                        });

                    $package.InstallSet.push(instruction);

                    themeOptions = {
                        Name: "test",
                        DisplayName: {},
                        Version: customVersion
                    };

                    theme = new Theme(instruction, themeOptions);

                    themeWithAuthor = new Theme(
                        instruction,
                        {
                            ...themeOptions,
                            Author: customAuthor
                        });
                });

            suite(
                nameof<Theme>((theme) => theme.Version),
                () =>
                {
                    test(
                        `Checking whether the \`${nameof<Theme>((t) => t.Version)}\`-property equals the version of the package if no version is specified…`,
                        () =>
                        {
                            strictEqual(theme.Version, customVersion);
                            theme.Version = undefined;
                            strictEqual(theme.Version, version);
                        });
                });

            suite(
                nameof<Theme>((theme) => theme.Author),
                () =>
                {
                    test(
                        `Checking whether the \`${nameof<Theme>((t) => t.Author)}\`-property equals the author of the package if no author is specified…`,
                        () =>
                        {
                            strictEqual(theme.Author.Name, author.Name);
                            strictEqual(theme.Author.URL, author.URL);
                        });

                    test(
                        `Checking whether the theme's \`${nameof<Theme>((t) => t.Author)}\` overrides the package's \`${nameof<Package>((p) => p.Author)}\`…`,
                        () =>
                        {
                            strictEqual(themeWithAuthor.Author.Name, customAuthor.Name);
                            strictEqual(themeWithAuthor.Author.URL, customAuthor.URL);
                        });
                });
        });
}
