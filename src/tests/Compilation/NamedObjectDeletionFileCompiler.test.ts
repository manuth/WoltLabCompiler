import { strictEqual } from "node:assert";
import { NamedObjectDeletionFileCompiler } from "../../Compilation/NamedObjectDeletionFileCompiler.js";
import { INamedObject } from "../../INamedObject.js";
import { INamedDeleteInstruction } from "../../PackageSystem/Instructions/INamedDeleteInstruction.js";
import { Instruction } from "../../PackageSystem/Instructions/Instruction.js";
import { XMLEditor } from "../../Serialization/XMLEditor.js";
import { ImportCompilerTester } from "./TestComponents/Testers/ImportCompilerTester.js";
import { ImportCompilerTestRunner } from "./TestComponents/TestRunners/ImportCompilerTestRunner.js";

/**
 * Registers tests for the {@link NamedObjectDeletionFileCompiler `NamedObjectDeletionFileCompiler<T>`} class.
 */
export function NamedObjectDeletionFileCompilerTests(): void
{
    let objectTag: string;
    let objectsToDelete: INamedObject[];

    new class extends ImportCompilerTestRunner<ImportCompilerTester<NamedObjectDeletionFileCompiler<INamedDeleteInstruction>>, NamedObjectDeletionFileCompiler<INamedDeleteInstruction>>
    {
        /**
         * @inheritdoc
         */
        protected override async SuiteSetup(): Promise<void>
        {
            objectTag = "myObject";

            objectsToDelete = [
                {
                    Name: "foo"
                },
                {
                    Name: "bar"
                },
                {
                    Name: "baz"
                }
            ];

            return super.SuiteSetup();
        }

        /**
         * @inheritdoc
         *
         * @returns
         * The new compiler-tester instance.
         */
        protected CreateTester(): ImportCompilerTester<NamedObjectDeletionFileCompiler<INamedDeleteInstruction>>
        {
            return new ImportCompilerTester(
                new class extends NamedObjectDeletionFileCompiler<INamedDeleteInstruction>
                {
                    /**
                     * @inheritdoc
                     */
                    protected get SchemaLocation(): string
                    {
                        return "http://example.com/mySchema.xsd";
                    }

                    /**
                     * @inheritdoc
                     */
                    protected get ObjectTagName(): string
                    {
                        return objectTag;
                    }
                }(
                    new class extends Instruction implements INamedDeleteInstruction
                    {
                        /**
                         * @inheritdoc
                         */
                        public Type = "foo";

                        /**
                         * @inheritdoc
                         */
                        public get ObjectsToDelete(): INamedObject[]
                        {
                            return objectsToDelete;
                        }

                        /**
                         * Initializes a new instance of the {@link Instruction `Instruction`} class.
                         */
                        public constructor()
                        {
                            super(
                                {
                                    FileName: null
                                });
                        }
                    }()));
        }

        /**
         * @inheritdoc
         */
        protected override ExecuteTests(): void
        {
            super.ExecuteTests();

            test(
                `Checking whether a \`${this.CreateTester().DeleteTag}\`-entry is created for each pending deletion…`,
                () =>
                {
                    let deletionEntry = this.Tester.DeleteEditor.GetElementsByTag(objectTag);
                    strictEqual(deletionEntry.length, objectsToDelete.length);

                    for (let objectToDelete of objectsToDelete)
                    {
                        let matches = deletionEntry.filter((objectNode: XMLEditor) => objectNode.GetAttribute("name") === objectToDelete.Name);
                        strictEqual(matches.length, 1);
                    }
                });
        }
    }(nameof(NamedObjectDeletionFileCompiler)).Register();
}
