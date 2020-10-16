import { doesNotReject, ok } from "assert";
import { ITempFileSystemOptions, TempFileSystem } from "@manuth/temp-files";
import { Compiler } from "../../../../Compilation/Compiler";
import { CompilerTester } from "../Testers/CompilerTester";

/**
 * Provides the functionality to register tests for a compiler.
 */
export abstract class CompilerTestRunner<TTester extends CompilerTester<TCompiler>, TCompiler extends Compiler<unknown>>
{
    /**
     * The path to write the compiler-output to.
     */
    private destinationPath: string = null;

    /**
     * The compiler-tester.
     */
    private tester: TTester;

    /**
     * The title of the suite.
     */
    private title: string;

    /**
     * Initializes a new instance of the `CompilerTestRunner` class.
     *
     * @param title
     * The title of the suite.
     */
    public constructor(title: string)
    {
        this.title = title;
    }

    /**
     * Gets the compiler-tester.
     */
    protected get Tester(): TTester
    {
        return this.tester;
    }

    /**
     * Gets the compiler to test.
     */
    protected get Compiler(): TCompiler
    {
        return this.Tester.Compiler;
    }

    /**
     * Gets tht title of the suite.
     */
    protected get Title(): string
    {
        return this.title;
    }

    /**
     * Gets the file to write the compiler-output to.
     */
    protected get DestinationPath(): string
    {
        if (this.destinationPath === null)
        {
            this.destinationPath = TempFileSystem.TempName();
        }

        return this.destinationPath;
    }

    /**
     * Gets the options for creating the temporary file.
     */
    protected get TempFileOptions(): ITempFileSystemOptions
    {
        return {};
    }

    /**
     * Registers the tests.
     */
    public Register(): void
    {
        suite(
            this.Title,
            () =>
            {
                suiteSetup(async () => this.SuiteSetup());
                suiteTeardown(async () => this.SuiteTeardown());
                setup(async () => this.Setup());
                teardown(async () => this.Teardown());
                this.RegisterTests();
                this.RegisterExecuteTests();
            });
    }

    /**
     * Creates an instance of a compiler-tester.
     *
     * @returns
     * The new compiler-tester instance.
     */
    protected abstract CreateTester(): TTester;

    /**
     * Registers root tests.
     */
    protected RegisterTests(): void
    { }

    /**
     * Prepares the suite.
     */
    protected async SuiteSetup(): Promise<void>
    {
        this.tester = this.CreateTester();
        this.Compiler.DestinationPath = this.DestinationPath;
    }

    /**
     * Releases the resources of the suite.
     */
    protected async SuiteTeardown(): Promise<void>
    { }

    /**
     * Prepares each test-case.
     */
    protected async Setup(): Promise<void>
    { }

    /**
     * Disposes each test-case.
     */
    protected async Teardown(): Promise<void>
    { }

    /**
     * Registers tests for the `Execute` method.
     */
    protected RegisterExecuteTests(): void
    {
        suite(
            "Execute",
            () =>
            {
                suiteSetup(async () => this.ExecuteSuiteSetup());
                suiteTeardown(async () => this.ExecuteSuiteTeardown());
                setup(async () => this.ExecuteSetup());
                teardown(async () => this.ExecuteTeardown());
                this.ExecuteTests();
            });
    }

    /**
     * Registers tests for the `Execute` suite.
     */
    protected ExecuteTests(): void
    {
        let self = this;

        test(
            "Checking whether the component can be compiled…",
            async function()
            {
                this.timeout(10 * 1000);
                this.slow(5 * 1000);
                await doesNotReject(async () => self.Compiler.Execute());
            });

        test(
            "Checking whether the compiled file exists…",
            () =>
            {
                ok(this.Tester.DestinationExists);
            });
    }

    /**
     * Prepares the `Execute`-suite.
     */
    protected async ExecuteSuiteSetup(): Promise<void>
    { }

    /**
     * Disposes
     */
    protected async ExecuteSuiteTeardown(): Promise<void>
    { }

    /**
     * Prepares the `Execute` test-cases.
     */
    protected async ExecuteSetup(): Promise<void>
    {
        await this.Compiler.Execute();
    }

    /**
     * Disposes the `Execute` test-cases.
     */
    protected async ExecuteTeardown(): Promise<void>
    { }
}
