import { strictEqual } from "assert";
import { TempFile } from "@manuth/temp-files";
import { readFile } from "fs-extra";
import { DOMParser } from "xmldom";
import { EJSFileCompiler } from "../../Compilation/EJSFileCompiler";
import { XMLEditor } from "../../Serialization/XMLEditor";
import { CompilerTester } from "./CompilerTester";

/**
 * Registers tests for the `EJSFileCompiler` class.
 */
export function EJSFileCompilerTests(): void
{
    let context: Record<string, string>;
    let tempFile: TempFile;
    let variableName: string;
    let variableValue: string;
    let delimiter: string;

    /**
     * Provides an implementation of the `EJSFileCompiler` for testing.
     */
    class TestEJSFileCompiler extends EJSFileCompiler<unknown>
    {
        /**
         * Initializes a new instance of the class.
         */
        public constructor()
        {
            super({});
        }

        /**
         * @inheritdoc
         */
        public get Delimiter(): string
        {
            return delimiter;
        }

        /**
         * @inheritdoc
         */
        protected get TagName(): string
        {
            return "test";
        }

        /**
         * Copies files using `EJS`.
         *
         * @param source
         * The source to copy the files from.
         *
         * @param destination
         * The destination to copy the files to.
         *
         * @param context
         * The context to use.
         *
         * @param delimiter
         * The delimiter of the ejs-tags.
         */
        public async CopyTemplate(source: string, destination: string, context: Record<string, unknown>, delimiter?: string): Promise<void>
        {
            return super.CopyTemplate(source, destination, context, delimiter);
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
            document.documentElement.appendChild(document.createTextNode(`<${this.Delimiter}= ${variableName} ${this.Delimiter}>`));
            return document;
        }
    }

    new class extends CompilerTester<TestEJSFileCompiler>
    {
        /**
         * Creates an instance of a compiler.
         *
         * @returns
         * The new compiler-instance.
         */
        protected CreateCompiler(): TestEJSFileCompiler
        {
            return new TestEJSFileCompiler();
        }

        /**
         * @inheritdoc
         */
        protected async SuiteSetup(): Promise<void>
        {
            context = {};
            tempFile = new TempFile();
            variableName = "foo";
            variableValue = "Hello World";
            context[variableName] = variableValue;
        }

        /**
         * @inheritdoc
         */
        protected ExecuteTests(): void
        {
            super.ExecuteTests();

            /**
             * Creates an `XMLEditor` for the output file.
             *
             * @returns
             * An `XMLEditor` for the output file.
             */
            async function GetEditor(): Promise<XMLEditor>
            {
                return new XMLEditor(
                    new DOMParser().parseFromString((await readFile(tempFile.FullName)).toString()).documentElement);
            }

            test(
                "Checking whether the ejs-variables inside `xml`-files are substituted correctly…",
                async () =>
                {
                    await this.Compiler.CopyTemplate(this.Compiler.DestinationPath, tempFile.FullName, context);
                    strictEqual((await GetEditor()).TextContent, variableValue);
                });

            test(
                "Checking whether ejs-variables with custom delimiters are substituted correctly…",
                async () =>
                {
                    delimiter = "!";
                    strictEqual(this.Compiler.Delimiter, delimiter);
                    await this.Compiler.Execute();
                    await this.Compiler.CopyTemplate(this.Compiler.DestinationPath, tempFile.FullName, context, delimiter);
                    strictEqual((await GetEditor()).TextContent, variableValue);
                });
        }
    }("EJSFileCompiler").Register();
}
