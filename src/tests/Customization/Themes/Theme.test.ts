import { strictEqual } from "assert";
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

                    test(
                        "Checking whether the theme's `Author` overrides the package's `Author`…",
                        () =>
                        {
                            strictEqual(themeWithAuthor.Author.Name, customAuthor.Name);
                            strictEqual(themeWithAuthor.Author.URL, customAuthor.URL);
                        });
                });
        });
}
