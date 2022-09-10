import { strictEqual } from "node:assert";
import { Theme } from "../../../Customization/Presentation/Themes/Theme.js";
import { ThemeInstruction } from "../../../PackageSystem/Instructions/Customization/Presentation/ThemeInstruction.js";
import { Package } from "../../../PackageSystem/Package.js";
import { Person } from "../../../PackageSystem/Person.js";

/**
 * Registers tests for the {@link Theme `Theme`} class.
 */
export function ThemeTests(): void
{
    suite(
        nameof(Theme),
        () =>
        {
            let theme: Theme;
            let themeWithAuthor: Theme;
            let author: Person;
            let customAuthor: Person;

            suiteSetup(
                async () =>
                {
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
                            Version: "0.0.0",
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

                    theme = new Theme(
                        instruction,
                        {
                            Name: "test",
                            DisplayName: {}
                        });

                    themeWithAuthor = new Theme(
                        instruction,
                        {
                            Name: "test",
                            DisplayName: {},
                            Author: customAuthor
                        });

                    theme = await instruction.ThemeLoader.Load();
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
