import { ok, strictEqual } from "assert";
import { TempFile } from "@manuth/temp-files";
import { pathExists, readFile } from "fs-extra";
import { DOMParser } from "xmldom";
import { WoltLabXMLCompiler } from "../../Compilation/WoltLabXMLCompiler";

/**
 * Registers tests for the `WoltLabXMLCompiler` class.
 */
export function WoltLabXMLCompilerTests(): void
{
    suite(
        "WoltLabXMLCompiler",
        () =>
        {
            let tempFile: TempFile;
            let namespace: string;
            let schemaLocation: string;
            let compiler: WoltLabXMLCompiler<unknown>;

            suiteSetup(
                () =>
                {
                    tempFile = new TempFile();
                    namespace = "http://www.woltlab.com";
                    schemaLocation = "http://example.com/helloWorld.xsd";

                    compiler = new class extends WoltLabXMLCompiler<unknown>
                    {
                        /**
                         * @inheritdoc
                         */
                        protected SchemaLocation = schemaLocation;

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
                    suite(
                        "General tests…",
                        () =>
                        {
                            test(
                                "Checking whether the item can be compiled…",
                                async () =>
                                {
                                    await compiler.Execute();
                                });

                            test(
                                "Checking whether the compiled file exists…",
                                async () =>
                                {
                                    ok(await pathExists(tempFile.FullName));
                                });
                        });

                    suite(
                        "Testing the integrity of the compiled file…",
                        () =>
                        {
                            let document: Document;

                            suiteSetup(
                                async () =>
                                {
                                    document = new DOMParser().parseFromString((await readFile(tempFile.FullName)).toString());
                                });

                            test(
                                "Checking whether the namespace is correct…",
                                () =>
                                {
                                    strictEqual(document.documentElement.getAttribute("xmlns"), namespace);
                                });

                            test(
                                "Checking whether the schema-instance is correct…",
                                () =>
                                {
                                    strictEqual(document.documentElement.getAttribute("xmlns:xsi"), "http://www.w3.org/2001/XMLSchema-instace");
                                });

                            test(
                                "Checking whether the schema-location is correct…",
                                () =>
                                {
                                    strictEqual(document.documentElement.getAttribute("xsi:schemaLocation"), `${namespace} ${schemaLocation}`);
                                });
                        });
                });
        });
}
