import { strictEqual } from "assert";
import { TempFile } from "@manuth/temp-files";
import { readFile } from "fs-extra";
import { DOMParser } from "xmldom";
import { ObjectDeletionFileCompiler } from "../../Compilation/ObjectDeletionFileCompiler";
import { IDeleteInstruction } from "../../PackageSystem/Instructions/IDeleteInstruction";
import { Instruction } from "../../PackageSystem/Instructions/Instruction";
import { XML } from "../../Serialization/XML";
import { XMLEditor } from "../../Serialization/XMLEditor";

/**
 * Registers tests for the `ObjectDeletionFileCompiler` class.
 */
export function ObjectDeletionFileCompilerTests(): void
{
    suite(
        "ObjectDeletionFileCompiler",
        () =>
        {
            let tempFile: TempFile;
            let objectTag: string;
            let compiler: ObjectDeletionFileCompiler<IDeleteInstruction<unknown>, unknown>;

            suiteSetup(
                () =>
                {
                    tempFile = new TempFile();
                    objectTag = "myObject";

                    compiler = new class extends ObjectDeletionFileCompiler<IDeleteInstruction<unknown>, unknown>
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
                         *
                         * @returns
                         * The newly created deletion-entry.
                         */
                        protected CreateDeleteObject(): Element
                        {
                            return XML.CreateDocument(objectTag).documentElement;
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
                                {},
                                {}
                            ];

                            /**
                             * Initializes a new instance of the `Instruction` class.
                             */
                            public constructor()
                            {
                                super({
                                    FileName: null
                                });
                            }
                        }());

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
                    suite(
                        "General",
                        () =>
                        {
                            test(
                                "Checking whether the compiler can be executed…",
                                async () =>
                                {
                                    await compiler.Execute();
                                });
                        });

                    suite(
                        "Checking the integrity of the file…",
                        () =>
                        {
                            let editor: XMLEditor;

                            suite(
                                "General",
                                () =>
                                {
                                    test(
                                        "Checking whether the content of the compiled file is valid xml…",
                                        async () =>
                                        {
                                            let document: Document = new DOMParser().parseFromString((await readFile(tempFile.FullName)).toString());
                                            editor = new XMLEditor(document.documentElement);
                                        });
                                });

                            suite(
                                "Checking the integrity of the meta-data…",
                                () =>
                                {
                                    test(
                                        "Checking whether the integrity of the deleted objects…",
                                        () =>
                                        {
                                            let deletedObjects: XMLEditor[] = editor.GetElementsByTag(objectTag);

                                            strictEqual(
                                                deletedObjects.every(
                                                    (object: XMLEditor) =>
                                                    {
                                                        return (object.ParentNode.nodeType === object.Element.ELEMENT_NODE) &&
                                                            ((object.ParentNode as Element).tagName === "delete");
                                                    }),
                                                true);
                                        });
                                });
                        });
                });
        });
}