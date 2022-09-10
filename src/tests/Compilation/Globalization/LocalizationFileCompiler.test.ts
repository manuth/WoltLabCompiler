import { ok, strictEqual } from "node:assert";
import dedent from "dedent";
import { LocalizationFileCompiler } from "../../../Compilation/Globalization/LocalizationFileCompiler.js";
import { TranslationInstruction } from "../../../PackageSystem/Instructions/Globalization/TranslationInstruction.js";
import { XMLFileCompilerTester } from "../TestComponents/Testers/XMLFileCompilerTester.js";
import { XMLCompilerTestRunner } from "../TestComponents/TestRunners/XMLCompilerTestRunner.js";

/**
 * Registers tests for the {@link LocalizationFileCompiler `LocalizationFileCompiler`} class.
 */
export function LocalizationFileCompilerTests(): void
{
    new class extends XMLCompilerTestRunner<XMLFileCompilerTester<LocalizationFileCompiler>, LocalizationFileCompiler>
    {
        /**
         * @inheritdoc
         *
         * @returns
         * The new compiler-tester instance.
         */
        protected CreateTester(): XMLFileCompilerTester<LocalizationFileCompiler>
        {
            let locale = "en";

            return new XMLFileCompilerTester(
                new LocalizationFileCompiler(
                    [
                        locale,
                        new TranslationInstruction(
                            {
                                FileName: "foo",
                                Nodes: [
                                    {
                                        Name: "foo",
                                        Nodes: [
                                            {
                                                Name: "bar",
                                                Item:
                                                {
                                                    Translations: {
                                                        [locale]: dedent(
                                                            `
                                                            This is a test
                                                            with a message which has
                                                            multiple lines`)
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }).GetMessages()[locale]
                    ]));
        }

        /**
         * @inheritdoc
         */
        protected override ExecuteTests(): void
        {
            super.ExecuteTests();

            test(
                "Checking the integrity of the metadata…",
                () =>
                {
                    let nameAttribute = "name";
                    let categoryNodes = this.Tester.XMLEditor.GetChildrenByTag("category");
                    strictEqual(categoryNodes.length, Object.keys(this.Compiler.Item[1]).length);

                    for (let categoryName of Object.keys(this.Compiler.Item[1]))
                    {
                        let messages = this.Compiler.Item[1][categoryName];

                        ok(
                            categoryNodes.some(
                                (categoryNode) =>
                                {
                                    return (categoryNode.GetAttribute(nameAttribute) === categoryName) &&
                                        Object.keys(messages).every(
                                            (fullName) =>
                                            {
                                                return categoryNode.GetChildrenByTag("item").some(
                                                    (itemNode) =>
                                                    {
                                                        return (itemNode.GetAttribute(nameAttribute) === fullName) &&
                                                            itemNode.TextContent === messages[fullName];
                                                    });
                                            });
                                }));
                    }
                });
        }
    }(nameof(LocalizationFileCompiler)).Register();
}
