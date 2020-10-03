import Assert = require("assert");
import FileSystem = require("fs-extra");
import { TempFile } from "temp-filesystem";
import { InstructionCompiler } from "../../../Compilation/PackageSystem/Instructions/InstructionCompiler";
import { IInstruction } from "../../../PackageSystem/Instructions/IInstruction";
import { Instruction } from "../../../PackageSystem/Instructions/Instruction";
import { Package } from "../../../PackageSystem/Package";

/**
 * Registers tests for the `InstructionCompiler` class.
 */
export function InstructionCompilerTests(): void
{
    suite(
        "InstructionCompiler",
        () =>
        {
            let tempFile: TempFile;
            let compiler: InstructionCompiler<IInstruction>;
            let type: string;
            let objectID: string;
            let object: unknown;

            suiteSetup(
                () =>
                {
                    let objects: Record<string, unknown> = {};
                    tempFile = new TempFile();
                    type = "test";
                    objectID = "date";
                    object = new Date();
                    objects[objectID] = object;

                    let $package: Package = new Package(
                        {
                            Identifier: "foobar",
                            DisplayName: {},
                            InstallSet: {
                                Instructions: []
                            }
                        });

                    let instruction: Instruction = new class extends Instruction
                    {
                        /**
                         * @inheritdoc
                         */
                        public Type: string = type;

                        /**
                         * Initializes a new instance of the class.
                         */
                        public constructor()
                        {
                            super({ FileName: "example.txt" });
                        }

                        /**
                         * @inheritdoc
                         */
                        public get ObjectsByID(): Record<string, unknown>
                        {
                            return objects;
                        }
                    }();

                    $package.InstallSet.push(instruction);

                    compiler = new class extends InstructionCompiler<IInstruction>
                    {
                        /**
                         * Initializes a new instance of the class.
                         *
                         * @param item
                         * The options of the instruction.
                         */
                        public constructor(item: IInstruction)
                        {
                            super(item);
                        }

                        /**
                         * @inheritdoc
                         */
                        protected async Compile(): Promise<void>
                        {
                            await FileSystem.writeFile(this.DestinationPath, `<%= Item.Type %>\n<%= $("${objectID}") %>`);
                            await this.CopyTemplate(this.DestinationPath, this.DestinationPath);
                        }
                    }(instruction);

                    compiler.DestinationPath = tempFile.FullName;
                });

            suiteTeardown(
                () =>
                {
                    tempFile.Dispose();
                });

            suite(
                "Compile",
                () =>
                {
                    test(
                        "Checking whether the item can be compiled…",
                        async () =>
                        {
                            await compiler.Execute();
                        });
                });

            suite(
                "CopyTemplate",
                () =>
                {
                    let content: string;

                    suiteSetup(
                        async () =>
                        {
                            content = (await FileSystem.readFile(tempFile.FullName)).toString();
                        });

                    test(
                        "Checking whether members of the item are replaced using ejs…",
                        () =>
                        {
                            Assert.strictEqual(new RegExp(`^${type}$`, "gm").test(content), true);
                        });

                    test(
                        "Checking whether $-substitutions are replaced using ejs…",
                        () =>
                        {
                            Assert.strictEqual(content.includes(`${object}`), true);
                        });
                });

            suite(
                "Serialize",
                () =>
                {
                    let document: Document;

                    suiteSetup(
                        () =>
                        {
                            document = compiler.Serialize();
                        });

                    test(
                        "Checking whether the tag-name is correct…",
                        () =>
                        {
                            Assert.strictEqual(document.documentElement.tagName, "instruction");
                        });

                    test(
                        "Checking whether the type-attribute is set correctly…",
                        () =>
                        {
                            Assert.strictEqual(document.documentElement.getAttribute("type"), compiler.Item.Type);
                        });

                    test(
                        "Checking whether the execution-mode is set correctly…",
                        () =>
                        {
                            if (compiler.Item.Standalone)
                            {
                                Assert.strictEqual(document.documentElement.getAttribute("run"), "standalone");
                            }
                            else
                            {
                                Assert.strictEqual(document.documentElement.hasAttribute("run"), false);
                            }
                        });

                    test(
                        "Checking whether the filename is set correctly…",
                        () =>
                        {
                            Assert.strictEqual(document.documentElement.textContent, compiler.Item.FullName);
                        });
                });
        });
}
