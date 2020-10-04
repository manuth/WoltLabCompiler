import { ok } from "assert";
import { TempFile } from "@manuth/temp-files";
import { readFile } from "fs-extra";
import { DOMParser } from "xmldom";
import { ImportFileCompiler } from "../../Compilation/ImportFileCompiler";
import { XMLEditor } from "../../Serialization/XMLEditor";

/**
 * Registers tests for the `ImportFileCompile` class.
 */
export function ImportFileCompilerTests(): void
{
    suite(
        "ImportFileCompiler",
        () =>
        {
            let tempFile: TempFile;
            let compiler: ImportFileCompiler<unknown>;

            suiteSetup(
                () =>
                {
                    compiler = new class extends ImportFileCompiler<unknown>
                    {
                        /**
                         * @inheritdoc
                         */
                        protected get SchemaLocation(): string
                        {
                            return "http://example.com/mySchema.xsd";
                        }
                    }({});

                    tempFile = new TempFile();
                    compiler.DestinationPath = tempFile.FullName;
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
                                        "Checking whether the import- and the delete-list are present…",
                                        () =>
                                        {
                                            ok(editor.HasTag("import", true));
                                            ok(editor.HasTag("delete", true));
                                        });
                                });
                        });
                });
        });
}
