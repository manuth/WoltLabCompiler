import Assert = require("assert");
import FileSystem = require("fs-extra");
import { TempFile } from "temp-filesystem";
import { DOMParser } from "xmldom";
import { EJSFileCompiler } from "../../Compilation/EJSFileCompiler";

suite(
    "EJSFileCompiler",
    () =>
    {
        let tempFile: TempFile;
        let variableName: string;
        let variableValue: string;
        let compiler: EJSFileCompiler<unknown>;

        suiteSetup(
            async () =>
            {
                let context: Record<string, string> = {};
                tempFile = new TempFile();
                variableName = "foo";
                variableValue = "Hello World";
                context[variableName] = variableValue;

                compiler = new class extends EJSFileCompiler<unknown>
                {
                    /**
                     * @inheritdoc
                     */
                    protected TagName = "test";

                    /**
                     * Initializes a new instance of the `EJSFileCompiler` class.
                     */
                    public constructor()
                    {
                        super({});
                    }

                    /**
                     * @inheritdoc
                     *
                     * @returns
                     * The serialized document.
                     */
                    protected CreateDocument(): Document
                    {
                        let document = super.CreateDocument();
                        document.documentElement.appendChild(document.createTextNode(`<%= ${variableName} %>`));
                        return document;
                    }

                    /**
                     * @inheritdoc
                     */
                    protected async Compile(): Promise<void>
                    {
                        await super.Compile();
                        await this.CopyTemplate(this.DestinationPath, this.DestinationPath, context);
                    }
                }();

                compiler.DestinationPath = tempFile.FullName;
            });

        suite(
            "Compile()",
            () =>
            {
                test(
                    "Checking whether the component can be compiled…",
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
                    "Checking whether the EJS-variable has been replaced…",
                    async () =>
                    {
                        let document = new DOMParser().parseFromString((await FileSystem.readFile(tempFile.FullName)).toString());
                        Assert.strictEqual(document.documentElement.textContent, variableValue);
                    });
            });
    });
