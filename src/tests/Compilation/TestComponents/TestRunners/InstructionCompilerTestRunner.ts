import { ok } from "node:assert";
import fs from "fs-extra";
import path from "upath";
import { InstructionCompiler } from "../../../../Compilation/PackageSystem/Instructions/InstructionCompiler.js";
import { IInstruction } from "../../../../PackageSystem/Instructions/IInstruction.js";
import { Instruction } from "../../../../PackageSystem/Instructions/Instruction.js";
import { Package } from "../../../../PackageSystem/Package.js";
import { CompilerTester } from "../Testers/CompilerTester.js";
import { CompilerTestRunner } from "./CompilerTestRunner.js";

const { pathExists } = fs;
const { join } = path;

/**
 * Provides the functionality to register tests for an instruction-compiler.
 *
 * @template TTester
 * The type of the compiler-tester.
 *
 * @template TCompiler
 * The type of the compiler.
 */
export abstract class InstructionCompilerTestRunner<TTester extends CompilerTester<TCompiler>, TCompiler extends InstructionCompiler<IInstruction>> extends CompilerTestRunner<TTester, TCompiler>
{
    /**
     * Initializes a new instance of the {@link InstructionCompilerTestRunner `InstructionCompilerTestRunner<TTester, TCompiler>`} class.
     *
     * @param title
     * The title of the suite.
     */
    public constructor(title: string)
    {
        super(title);
    }

    /**
     * Registers root tests.
     */
    protected override RegisterTests(): void
    {
        super.RegisterTests();
        this.RegisterSerializeTests();
    }

    /**
     * @inheritdoc
     */
    protected override async SuiteSetup(): Promise<void>
    {
        await super.SuiteSetup();

        new Package(
            {
                Identifier: "foo",
                DisplayName: {},
                Version: "0.0.0",
                InstallSet: {
                    Instructions: []
                }
            }).InstallSet.push(this.Tester.Compiler.Item as Instruction);
    }

    /**
     * @inheritdoc
     */
    protected override ExecuteTests(): void
    {
        super.ExecuteTests();

        test(
            "Checking whether the instruction-file exists…",
            async () =>
            {
                ok(
                    await pathExists(
                        join(
                            this.Compiler.DestinationPath,
                            this.Compiler.Item.DestinationRoot,
                            this.Compiler.Item.FileName)));
            });
    }

    /**
     * Registers tests for the serialization.
     */
    protected RegisterSerializeTests(): void
    {
        suite(
            nameof<InstructionCompiler<any>>((compiler) => compiler.Serialize),
            () =>
            {
                suiteSetup(async () => this.SerializeSuiteSetup());
                suiteTeardown(async () => this.SerializeSuiteTeardown());
                setup(async () => this.SerializeSetup());
                teardown(async () => this.SerializeTeardown());
                this.SerializeTests();
            });
    }

    /**
     * Prepares the {@link InstructionCompiler.Serialize `Serialize`} suite.
     */
    protected async SerializeSuiteSetup(): Promise<void>
    { }

    /**
     * Disposes the {@link InstructionCompiler.Serialize `Serialize`} suite.
     */
    protected async SerializeSuiteTeardown(): Promise<void>
    { }

    /**
     * Prepares the {@link InstructionCompiler.Serialize `Serialize`} test-cases.
     */
    protected async SerializeSetup(): Promise<void>
    { }

    /**
     * Disposes the {@link InstructionCompiler.Serialize `Serialize`} test-cases.
     */
    protected async SerializeTeardown(): Promise<void>
    { }

    /**
     * Registers tests for the {@link InstructionCompiler.Serialize `Serialize`} suite.
     */
    protected SerializeTests(): void
    { }
}
