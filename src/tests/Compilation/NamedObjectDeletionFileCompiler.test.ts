import Assert = require("assert");
import FileSystem = require("fs-extra");
import { TempFile } from "temp-filesystem";
import { DOMParser } from "xmldom";
import { NamedObjectDeletionFileCompiler } from "../../Compilation/NamedObjectDeletionFileCompiler";
import { INamedObject } from "../../INamedObject";
import { INamedDeleteInstruction } from "../../PackageSystem/Instructions/INamedDeleteInstruction";
import { Instruction } from "../../PackageSystem/Instructions/Instruction";
import { XMLEditor } from "../../Serialization/XMLEditor";

/**
 * Registers tests for the `NamedObjectDeletionFileCompiler` class.
 */
export function NamedObjectDeletionFileCompilerTests(): void
{
    suite(
        "NamedObjectDeletionFileCompiler",
        () =>
        {
            let tempFile: TempFile;
            let objectTag: string;
            let compiler: NamedObjectDeletionFileCompiler<INamedDeleteInstruction>;
            let objectsToDelete: INamedObject[];

            suiteSetup(
                () =>
                {
                    tempFile = new TempFile();
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

                    compiler = new class extends NamedObjectDeletionFileCompiler<INamedDeleteInstruction>
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
                            public ObjectsToDelete: INamedObject[] = objectsToDelete;

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
                                            let document = new DOMParser().parseFromString((await FileSystem.readFile(tempFile.FullName)).toString());
                                            editor = new XMLEditor(document.documentElement);
                                        });
                                });

                            suite(
                                "Checking the integrity of the meta-data…",
                                () =>
                                {
                                    test(
                                        "Checking the integrity of the named deletions…",
                                        () =>
                                        {
                                            let deletedObjects = editor.GetElementsByTag(objectTag);
                                            Assert.strictEqual(deletedObjects.length, objectsToDelete.length);

                                            for (let objectToDelete of objectsToDelete)
                                            {
                                                let matches = deletedObjects.filter((objectNode: XMLEditor) => objectNode.HasAttribute("name", objectToDelete.Name));
                                                Assert.strictEqual(matches.length, 1);
                                            }
                                        });
                                });
                        });
                });
        });
}
