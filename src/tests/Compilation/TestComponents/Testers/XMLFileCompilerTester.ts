import { readFileSync } from "fs-extra";
import { DOMParser } from "xmldom";
import { XMLFileCompiler } from "../../../../Compilation/XMLFileCompiler";
import { XMLEditor } from "../../../../Serialization/XMLEditor";
import { CompilerTester } from "./CompilerTester";

/**
 * Provides the functionality to test an xml compiler.
 */
export class XMLFileCompilerTester<TCompiler extends XMLFileCompiler<unknown>> extends CompilerTester<TCompiler>
{
    /**
     * Initializes a new instance of the `XMLFileCompilerTester` class.
     *
     * @param compiler
     * The compiler to test.
     */
    public constructor(compiler: TCompiler)
    {
        super(compiler);
    }

    /**
     * Gets a value indicating whether the xml-content is valid.
     */
    public get IsValidXML(): boolean
    {
        try
        {
            return Boolean(this.XMLEditor);
        }
        catch
        {
            return false;
        }
    }

    /**
     * Gets an editor for manipulating the xml-content.
     */
    public get XMLEditor(): XMLEditor
    {
        return new XMLEditor(
            new DOMParser().parseFromString(
                readFileSync(this.Compiler.DestinationPath).toString()).documentElement);
    }
}
