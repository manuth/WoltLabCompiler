import { ok, strictEqual } from "assert";
import fs from "fs-extra";
import path from "upath";
import { InstructionCompiler } from "../../../../Compilation/PackageSystem/Instructions/InstructionCompiler.js";
import { Instruction } from "../../../../PackageSystem/Instructions/Instruction.js";
import { XMLEditor } from "../../../../Serialization/XMLEditor.js";
import { CompilerTester } from "../../TestComponents/Testers/CompilerTester.js";
import { InstructionCompilerTestRunner } from "../../TestComponents/TestRunners/InstructionCompilerTestRunner.js";

const { ensureFile, mkdirp, readFile, writeFile } = fs;
const { dirname } = path;

/**
 * Registers tests for the {@link InstructionCompiler `InstructionCompiler<T>`} class.
 */
export function InstructionCompilerTests(): void
{
    /**
     * Provides an implementation of the {@link InstructionCompiler `InstructionCompiler<T>`} class for testing.
     */
    class TestInstructionCompiler extends InstructionCompiler<Instruction>
    {
        /**
         * Initializes a new instance of the {@link TestInstructionCompiler `TestInstructionCompiler`} class.
         *
         * @param item
         * The options of the instruction.
         */
        public constructor(item: Instruction)
        {
            super(item);
        }

        /**
         * @inheritdoc
         *
         * @param source
         * The source to copy the files from.
         *
         * @param destination
         * The destination to copy the files to.
         *
         * @param context
         * The context to use.
         *
         * @param delimiter
         * The delimiter of the ejs-tags.
         */
        public override async CopyTemplate(source: string, destination: string, context?: Record<string, unknown>, delimiter?: string): Promise<void>
        {
            return super.CopyTemplate(source, destination, context, delimiter);
        }

        /**
         * @inheritdoc
         */
        protected override async Compile(): Promise<void>
        {
            await super.Compile();
            await mkdirp(dirname(this.DestinationFileName));
            await ensureFile(this.DestinationFileName);
        }
    }

    let objects: Record<string, unknown>;
    let type: string;
    let objectID: string;
    let object: unknown;

    new class extends InstructionCompilerTestRunner<CompilerTester<TestInstructionCompiler>, TestInstructionCompiler>
    {
        /**
         * @inheritdoc
         *
         * @returns
         * The new compiler-tester instance.
         */
        protected CreateTester(): CompilerTester<TestInstructionCompiler>
        {
            return new CompilerTester(
                new TestInstructionCompiler(
                    new class extends Instruction
                    {
                        /**
                         * Initializes a new instance of the class.
                         */
                        public constructor()
                        {
                            super(
                                {
                                    FileName: "example.txt"
                                });
                        }

                        /**
                         * @inheritdoc
                         */
                        public get Type(): string
                        {
                            return type;
                        }

                        /**
                         * @inheritdoc
                         */
                        public override get ObjectsByID(): Record<string, unknown>
                        {
                            return objects;
                        }
                    }()));
        }

        /**
         * @inheritdoc
         */
        protected override async SuiteSetup(): Promise<void>
        {
            objects = {};
            type = "test";
            objectID = "date";
            object = new Date();
            objects[objectID] = object;
            return super.SuiteSetup();
        }

        /**
         * @inheritdoc
         */
        protected override RegisterTests(): void
        {
            super.RegisterTests();

            suite(
                nameof<TestInstructionCompiler>((compiler) => compiler.CopyTemplate),
                () =>
                {
                    let content: string;

                    setup(
                        async () =>
                        {
                            await this.Compiler.Execute();
                            await writeFile(this.Compiler.DestinationFileName, `<%= Item.Type %>\n<%= $("${objectID}") %>`);
                            await this.Tester.Compiler.CopyTemplate(this.Compiler.DestinationFileName, this.Compiler.DestinationFileName);
                            content = (await readFile(this.Compiler.DestinationFileName)).toString();
                        });

                    test(
                        "Checking whether members of the item are replaced using ejs…",
                        () =>
                        {
                            ok(new RegExp(`^${type}$`, "gm").test(content));
                        });

                    test(
                        "Checking whether `$`-substitutions are replaced using ejs…",
                        () =>
                        {
                            ok(content.includes(`${object}`));
                        });
                });
        }

        /**
         * @inheritdoc
         */
        protected override async SerializeSetup(): Promise<void>
        {
            this.Compiler.Item.Standalone = Math.random() > 0.5;
        }

        /**
         * @inheritdoc
         */
        protected override SerializeTests(): void
        {
            let editor: XMLEditor;
            super.SerializeTests();

            setup(
                () =>
                {
                    this.Compiler.Item.Standalone = Math.random() > 0.5;
                    editor = new XMLEditor(this.Compiler.Serialize().documentElement);
                });

            test(
                "Checking whether the tag-name is correct…",
                () =>
                {
                    strictEqual(editor.TagName, "instruction");
                });

            test(
                "Checking whether the type-attribute is set correctly…",
                () =>
                {
                    strictEqual(editor.GetAttribute("type"), this.Compiler.Item.Type);
                });

            test(
                "Checking whether the execution-mode is set correctly…",
                () =>
                {
                    if (this.Compiler.Item.Standalone)
                    {
                        strictEqual(editor.GetAttribute("run"), "standalone");
                    }
                    else
                    {
                        ok(!editor.HasAttribute("run"));
                    }
                });

            test(
                "Checking whether the filename is set correctly…",
                () =>
                {
                    strictEqual(editor.TextContent, this.Compiler.Item.FullName);
                });
        }
    }(nameof(InstructionCompiler)).Register();
}
