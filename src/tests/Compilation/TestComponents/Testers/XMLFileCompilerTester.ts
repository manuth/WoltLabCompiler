import { DOMParser } from "@xmldom/xmldom";
import { CheerioAPI, load } from "cheerio";
import fs from "fs-extra";
import { XMLFileCompiler } from "../../../../Compilation/XMLFileCompiler.js";
import { XMLEditor } from "../../../../Serialization/XMLEditor.js";
import { CompilerTester } from "./CompilerTester.js";

const { readFileSync } = fs;

/**
 * Provides the functionality to test an xml compiler.
 *
 * @template TCompiler
 * The type of the compiler to test.
 */
export class XMLFileCompilerTester<TCompiler extends XMLFileCompiler<unknown>> extends CompilerTester<TCompiler>
{
    /**
     * Initializes a new instance of the {@link XMLFileCompilerTester `XMLFileCompilerTester<TCompiler>`} class.
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
     * Gets a component for querying the compiled `.xml`-content.
     */
    public get Cheerio(): CheerioAPI
    {
        return load(
            readFileSync(this.Compiler.DestinationPath).toString(),
            {
                xmlMode: true
            });
    }

    /**
     * Gets an editor for manipulating the xml-content.
     */
    public get XMLEditor(): XMLEditor
    {
        return new XMLEditor(
            new DOMParser().parseFromString(
                this.Cheerio.html()).documentElement);
    }
}
