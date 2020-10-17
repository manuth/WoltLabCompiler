import { pathExistsSync } from "fs-extra";
import { Compiler } from "../../../../Compilation/Compiler";

/**
 * Provides the functionality to test a compiler.
 */
export class CompilerTester<TCompiler extends Compiler<unknown>>
{
    /**
     * The compiler to test.
     */
    private compiler: TCompiler;

    /**
     * Initializes a new instance of the `CompilerTester` class.
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
