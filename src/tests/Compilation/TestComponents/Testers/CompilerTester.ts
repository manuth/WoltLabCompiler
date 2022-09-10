import fs from "fs-extra";
import { Compiler } from "../../../../Compilation/Compiler.js";

const { pathExistsSync } = fs;

/**
 * Provides the functionality to test a compiler.
 *
 * @template TCompiler
 * The type of the compiler to test.
 */
export class CompilerTester<TCompiler extends Compiler<unknown>>
{
    /**
     * The compiler to test.
     */
    private compiler: TCompiler;

    /**
     * Initializes a new instance of the {@link CompilerTester `CompilerTester<TCompiler>`} class.
     *
     * @param compiler
     * The compiler to test.
     */
    public constructor(compiler: TCompiler)
    {
        this.compiler = compiler;
    }

    /**
     * Gets the compiler to test.
     */
    public get Compiler(): TCompiler
    {
        return this.compiler;
    }

    /**
     * Gets a value indicating whether the destination-file exists.
     */
    public get DestinationExists(): boolean
    {
        return pathExistsSync(this.Compiler.DestinationPath);
    }
}
