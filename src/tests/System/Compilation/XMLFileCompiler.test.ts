import Assert = require("assert");
import FileSystem = require("fs-extra");
import { TempFile } from "temp-filesystem";
import { DOMParser } from "xmldom";
import { XMLFileCompiler } from "../../../System/Compilation/XMLFileCompiler";

suite(
    "XMLFileCompiler",
    () =>
    {
        let tempFile: TempFile;
        let rootTag: string;
        let compiler: XMLFileCompiler<{}>;

        suiteSetup(
            () =>
            {
                tempFile = new TempFile();
                rootTag = "foo";
                compiler = new class extends XMLFileCompiler<{}>
                {
                    /**
                     * @inheritdoc
                     */
                    protected TagName = "foo";

                    /**
                     *
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
            "Compile()",
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
                        Assert.strictEqual(await FileSystem.pathExists(tempFile.FullName), true);
                    });

                test(
                    "Checking whether the compiled xml-file can be parsed…",
                    async () =>
                    {
                        document = new DOMParser().parseFromString((await FileSystem.readFile(tempFile.FullName)).toString());
                    });

                test(
                    "Checking whether a processing-instruction for `xml` is present…",
                    () =>
                    {
                        Assert.strictEqual(document.childNodes[0].nodeType, document.PROCESSING_INSTRUCTION_NODE);
                        Assert.strictEqual((document.childNodes[0] as ProcessingInstruction).target, "xml");
                    });

                test(
                    "Checking whether the root-tag is set correct…",
                    () =>
                    {
                        Assert.strictEqual(document.documentElement.tagName, rootTag);
                    });
            });
    });
