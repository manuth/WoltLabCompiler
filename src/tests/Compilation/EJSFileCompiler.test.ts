import { strictEqual } from "assert";
import { EJSFileCompiler } from "../../Compilation/EJSFileCompiler";
import { XMLFileCompilerTester } from "./TestComponents/Testers/XMLFileCompilerTester";
import { XMLCompilerTestRunner } from "./TestComponents/TestRunners/XMLCompilerTestRunner";

/**
 * Registers tests for the `EJSFileCompiler` class.
 */
export function EJSFileCompilerTests(): void
{
    let context: Record<string, string>;
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

    new class extends XMLCompilerTestRunner<XMLFileCompilerTester<TestEJSFileCompiler>, TestEJSFileCompiler>
    {
        /**
         * @inheritdoc
         *
         * @returns
         * The new compiler-tester instance.
         */
        protected CreateTester(): XMLFileCompilerTester<TestEJSFileCompiler>
        {
            return new XMLFileCompilerTester(new TestEJSFileCompiler());
        }

        /**
         * @inheritdoc
         */
        protected async SuiteSetup(): Promise<void>
        {
            await super.SuiteSetup();
            context = {};
            variableName = "foo";
            variableValue = "Hello World";
            context[variableName] = variableValue;
        }

        /**
         * @inheritdoc
         */
        protected async Setup(): Promise<void>
        {
            delimiter = "%";
        }

        /**
         * @inheritdoc
         */
        protected ExecuteTests(): void
        {
            super.ExecuteTests();

            test(
                "Checking whether the ejs-variables inside `xml`-files are substituted correctly…",
                async () =>
                {
                    await this.Compiler.CopyTemplate(this.Compiler.DestinationPath, this.Compiler.DestinationPath, context, delimiter);
                    strictEqual(this.Tester.XMLEditor.TextContent, variableValue);
                });

            test(
                "Checking whether ejs-variables with custom delimiters are substituted correctly…",
                async () =>
                {
                    delimiter = "!!";
                    strictEqual(this.Compiler.Delimiter, delimiter);
                    await this.Compiler.Execute();
                    await this.Compiler.CopyTemplate(this.Compiler.DestinationPath, this.Compiler.DestinationPath, context, delimiter);
                    strictEqual(this.Tester.XMLEditor.TextContent, variableValue);
                });
        }
    }("EJSFileCompiler").Register();
}
