import { ok } from "assert";
import { ObjectDeletionFileCompiler } from "../../Compilation/ObjectDeletionFileCompiler.js";
import { IDeleteInstruction } from "../../PackageSystem/Instructions/IDeleteInstruction.js";
import { Instruction } from "../../PackageSystem/Instructions/Instruction.js";
import { XML } from "../../Serialization/XML.js";
import { XMLEditor } from "../../Serialization/XMLEditor.js";
import { ImportCompilerTester } from "./TestComponents/Testers/ImportCompilerTester.js";
import { ImportCompilerTestRunner } from "./TestComponents/TestRunners/ImportCompilerTestRunner.js";

/**
 * Registers tests for the {@link ObjectDeletionFileCompiler `ObjectDeletionFileCompiler<T, TObject>`} class.
 */
export function ObjectDeletionFileCompilerTests(): void
{
    let objectTag: string;

    new class extends ImportCompilerTestRunner<ImportCompilerTester<ObjectDeletionFileCompiler<IDeleteInstruction<unknown>, unknown>>, ObjectDeletionFileCompiler<IDeleteInstruction<unknown>, unknown>>
    {
        /**
         * @inheritdoc
         *
         * @returns
         * The new compiler-tester instance.
         */
        protected CreateTester(): ImportCompilerTester<ObjectDeletionFileCompiler<IDeleteInstruction<unknown>, unknown>>
        {
            return new ImportCompilerTester(
                new class extends ObjectDeletionFileCompiler<IDeleteInstruction<unknown>, unknown>
                {
                    /**
                     * @inheritdoc
                     */
                    protected get SchemaLocation(): string
                    {
                        return "";
                    }

                    /**
                     * @inheritdoc
                     *
                     * @param object
                     * The object to delete.
                     *
                     * @returns
                     * The newly created deletion-entry.
                     */
                    protected CreateDeleteObject(object: unknown): Element
                    {
                        let editor = new XMLEditor(XML.CreateDocument(objectTag).documentElement);
                        editor.SetAttribute("value", `${object}`);
                        return editor.Element;
                    }
                }(
                    new class extends Instruction implements IDeleteInstruction<unknown>
                    {
                        /**
                         * @inheritdoc
                         */
                        public Type = "foo";

                        /**
                         * @inheritdoc
                         */
                        public ObjectsToDelete: unknown[] = [
                            "test1",
                            "test2"
                        ];

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
        protected override async SuiteSetup(): Promise<void>
        {
            objectTag = "myObject";
            return super.SuiteSetup();
        }

        /**
         * @inheritdoc
         */
        protected override ExecuteTests(): void
        {
            super.ExecuteTests();

            test(
                "Checking whether the deletion-entries are created correctly…",
                () =>
                {
                    this.Compiler.Item.ObjectsToDelete.every(
                        (object) =>
                        {
                            ok(
                                this.Tester.DeleteEditor.GetElementsByTag(objectTag).some(
                                    (objectEntry) =>
                                    {
                                        return (objectEntry.ParentNode.nodeType === objectEntry.Element.ELEMENT_NODE) &&
                                            ((objectEntry.ParentNode as Element).tagName === "delete") &&
                                            (objectEntry.GetAttribute("value") === `${object}`);
                                    }));
                        });
                });
        }
    }(nameof(ObjectDeletionFileCompiler)).Register();
}
