import { strictEqual } from "assert";
import { NamedObjectDeletionFileCompiler } from "../../Compilation/NamedObjectDeletionFileCompiler";
import { INamedObject } from "../../INamedObject";
import { INamedDeleteInstruction } from "../../PackageSystem/Instructions/INamedDeleteInstruction";
import { Instruction } from "../../PackageSystem/Instructions/Instruction";
import { XMLEditor } from "../../Serialization/XMLEditor";
import { ImportCompilerTester } from "./TestComponents/Testers/ImportCompilerTester";
import { ImportCompilerTestRunner } from "./TestComponents/TestRunners/ImportCompilerTestRunner";

/**
 * Registers tests for the `NamedObjectDeletionFileCompiler` class.
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
        protected async SuiteSetup(): Promise<void>
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

            await super.SuiteSetup();
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
                         * Initializes a new instance of the `Instruction` class.
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
        protected ExecuteTests(): void
        {
            super.ExecuteTests();

            test(
                "Checking whether a `delete`-entry is created for each pending deletion…",
                () =>
                {
                    let deletionEntry = this.Tester.DeleteEditor.GetElementsByTag(objectTag);
                    strictEqual(deletionEntry.length, objectsToDelete.length);

                    for (let objectToDelete of objectsToDelete)
                    {
                        let matches = deletionEntry.filter((objectNode: XMLEditor) => objectNode.HasAttribute("name", objectToDelete.Name));
                        strictEqual(matches.length, 1);
                    }
                });
        }
    }("NamedObjectDeletionFileCompiler").Register();
}
