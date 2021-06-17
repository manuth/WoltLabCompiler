import { strictEqual } from "assert";
import { WoltLabXMLCompiler } from "../../Compilation/WoltLabXMLCompiler";
import { XMLFileCompilerTester } from "./TestComponents/Testers/XMLFileCompilerTester";
import { XMLCompilerTestRunner } from "./TestComponents/TestRunners/XMLCompilerTestRunner";

/**
 * Registers tests for the {@link WoltLabXMLCompiler `WoltLabXMLCompiler<T>`} class.
 */
export function WoltLabXMLCompilerTests(): void
{
    let namespace: string;
    let schemaLocation: string;

    new class extends XMLCompilerTestRunner<XMLFileCompilerTester<WoltLabXMLCompiler<unknown>>, WoltLabXMLCompiler<unknown>>
    {
        /**
         * @inheritdoc
         *
         * @returns
         * The new compiler-tester instance.
         */
        protected CreateTester(): XMLFileCompilerTester<WoltLabXMLCompiler<unknown>>
        {
            return new XMLFileCompilerTester(
                new class extends WoltLabXMLCompiler<unknown>
                {
                    /**
                     * @inheritdoc
                     */
                    protected get SchemaLocation(): string
                    {
                        return schemaLocation;
                    }

                    /**
                     * Initializes a new instance of the class.
                     */
                    public constructor()
                    {
                        super({});
                    }
                }());
        }

        /**
         * @inheritdoc
         */
        protected override async SuiteSetup(): Promise<void>
        {
            namespace = "http://www.woltlab.com";
            schemaLocation = "http://example.com/helloWorld.xsd";
            return super.SuiteSetup();
        }

        /**
         * @inheritdoc
         */
        protected override ExecuteTests(): void
        {
            super.ExecuteTests();

            test(
                "Checking whether the namespace is set correctly…",
                () =>
                {
                    strictEqual(this.Tester.XMLEditor.GetAttribute("xmlns"), namespace);
                });

            test(
                "Checking whether the schema-instance is correct…",
                () =>
                {
                    strictEqual(this.Tester.XMLEditor.GetAttribute("xmlns:xsi"), "http://www.w3.org/2001/XMLSchema-instace");
                });

            test(
                "Checking whether the schema-location is set correctly…",
                () =>
                {
                    strictEqual(this.Tester.XMLEditor.GetAttribute("xsi:schemaLocation"), `${namespace} ${schemaLocation}`);
                });
        }
    }("WoltLabXMLCompiler").Register();
}
