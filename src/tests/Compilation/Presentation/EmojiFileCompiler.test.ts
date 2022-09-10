import { ok, strictEqual } from "assert";
import { EmojiFileCompiler } from "../../../Compilation/Presentation/EmojiFileCompiler.js";
import { EmojiInstruction } from "../../../PackageSystem/Instructions/Customization/EmojiInstruction.js";
import { ImportCompilerTester } from "../TestComponents/Testers/ImportCompilerTester.js";
import { ImportCompilerTestRunner } from "../TestComponents/TestRunners/ImportCompilerTestRunner.js";

/**
 * Registers tests for the {@link EmojiFileCompiler `EmojiFileCompiler`} class.
 */
export function EmojiFileCompilerTests(): void
{
    new class extends ImportCompilerTestRunner<ImportCompilerTester<EmojiFileCompiler>, EmojiFileCompiler>
    {
        /**
         * @inheritdoc
         *
         * @returns
         * The new compiler-tester instance.
         */
        protected CreateTester(): ImportCompilerTester<EmojiFileCompiler>
        {
            return new ImportCompilerTester(
                new EmojiFileCompiler(
                    new EmojiInstruction(
                        {
                            FileName: null,
                            Emojis: [
                                {
                                    Name: "foo",
                                    DisplayName: "bar",
                                    Aliases: [
                                        "this",
                                        "is",
                                        "a",
                                        "test"
                                    ],
                                    ShowOrder: Math.floor(Math.random() * 100),
                                    FileName: "lowRes.png",
                                    HighResFileName: "highRes.png"
                                },
                                {
                                    Name: "fizz",
                                    DisplayName: "buzz",
                                    FileName: "fizzbuzz.png"
                                }
                            ]
                        })));
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
                    let showOrderTag = "showorder";
                    let highResFileTag = "path2x";
                    let emojiNodes = this.Tester.ImportEditor.GetChildrenByTag("smiley");
                    strictEqual(emojiNodes.length, this.Compiler.Item.Emojis.length);

                    for (let emoji of this.Compiler.Item.Emojis)
                    {
                        ok(
                            emojiNodes.some(
                                (emojiNode) =>
                                {
                                    try
                                    {
                                        strictEqual(emojiNode.GetAttribute("name"), `:${emoji.Name}:`);
                                        this.AssertTagContent(emojiNode, "title", emoji.DisplayName);
                                        this.AssertTagContent(emojiNode, "path", emoji.FileName);

                                        for (let alias of emoji.Aliases)
                                        {
                                            ok(this.GetText(emojiNode, "aliases").split("\n").includes(`:${alias}:`));
                                        }

                                        if (emoji.ShowOrder)
                                        {
                                            this.AssertTagContent(emojiNode, showOrderTag, `${emoji.ShowOrder}`);
                                        }
                                        else
                                        {
                                            strictEqual(emojiNode.GetChildrenByTag(showOrderTag).length, 0);
                                        }

                                        if (emoji.HighResFileName)
                                        {
                                            this.AssertTagContent(emojiNode, highResFileTag, emoji.HighResFileName);
                                        }
                                        else
                                        {
                                            strictEqual(emojiNode.GetChildrenByTag(highResFileTag).length, 0);
                                        }

                                        return true;
                                    }
                                    catch
                                    {
                                        return false;
                                    }
                                }));
                    }
                });
        }
    }(nameof(EmojiFileCompiler)).Register();
}
