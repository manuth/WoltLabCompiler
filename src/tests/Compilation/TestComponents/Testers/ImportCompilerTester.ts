import { ImportFileCompiler } from "../../../../Compilation/ImportFileCompiler.js";
import { XMLEditor } from "../../../../Serialization/XMLEditor.js";
import { XMLFileCompilerTester } from "./XMLFileCompilerTester.js";

/**
 * Provides the functionality to test an import file compiler.
 *
 * @template TCompiler
 * The type of the compiler to test.
 */
export class ImportCompilerTester<TCompiler extends ImportFileCompiler<unknown>> extends XMLFileCompilerTester<TCompiler>
{
    /**
     * Initializes a new instance of the {@link ImportCompilerTester `ImportCompilerTester<TCompiler>`} class.
     *
     * @param compiler
     * The compiler to test.
     */
    public constructor(compiler: TCompiler)
    {
        super(compiler);
    }

    /**
     * Gets the tag of the import-section.
     */
    public get ImportTag(): string
    {
        return "import";
    }

    /**
     * Gets the tag of the delete-section.
     */
    public get DeleteTag(): string
    {
        return "delete";
    }

    /**
     * Gets an editor for manipulating the import-section.
     */
    public get ImportEditor(): XMLEditor
    {
        return this.XMLEditor.GetChildrenByTag(this.ImportTag)[0];
    }

    /**
     * Gets an editor for manipulating the delete-section.
     */
    public get DeleteEditor(): XMLEditor
    {
        return this.XMLEditor.GetChildrenByTag(this.DeleteTag)[0];
    }
}
