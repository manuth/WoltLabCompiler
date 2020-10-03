import { strictEqual } from "assert";
import { pathExists, readFile } from "fs-extra";
import { TempFile } from "temp-filesystem";
import { DOMParser } from "xmldom";
import { XMLFileCompiler } from "../../Compilation/XMLFileCompiler";

/**
 * Registers tests for the `XMLFileCompiler` class.
 */
export function XMLFileCompilerTests(): void
{
    suite(
        "XMLFileCompiler",
        () =>
        {
            let tempFile: TempFile;
            let rootTag: string;
            let compiler: XMLFileCompiler<unknown>;

            suiteSetup(
                () =>
                {
                    tempFile = new TempFile();
                    rootTag = "foo";

                    compiler = new class extends XMLFileCompiler<unknown>
                    {
                        /**
                         * @inheritdoc
                         */
                        protected TagName = "foo";

                        /**
                         * Initializes a new instance of the class.
                         */
                        public constructor()
                        {
                            super({});
                        }
                    }();

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
                    let document: Document;

                    test(
                        "Checking whether the compiler can be executed…",
                        async () =>
                        {
                            await compiler.Execute();
                        });

                    test(
                        "Checking whether the compiled file exists…",
                        async () =>
                        {
                            strictEqual(await pathExists(tempFile.FullName), true);
                        });

                    test(
                        "Checking whether the compiled xml-file can be parsed…",
                        async () =>
                        {
                            document = new DOMParser().parseFromString((await readFile(tempFile.FullName)).toString());
                        });

                    test(
                        "Checking whether a processing-instruction for `xml` is present…",
                        () =>
                        {
                            let firstChild = document.childNodes[0];
                            strictEqual(firstChild.nodeType, document.PROCESSING_INSTRUCTION_NODE);
                            strictEqual((firstChild as ProcessingInstruction).target, "xml");
                        });

                    test(
                        "Checking whether the root-tag is set correct…",
                        () =>
                        {
                            strictEqual(document.documentElement.tagName, rootTag);
                        });
                });
        });
}
