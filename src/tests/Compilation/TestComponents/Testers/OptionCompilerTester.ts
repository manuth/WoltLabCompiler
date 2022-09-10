import { OptionFileCompiler } from "../../../../Compilation/Options/OptionFileCompiler.js";
import { ICategory } from "../../../../Options/Generic/ICategory.js";
import { Option } from "../../../../Options/Option.js";
import { IOptionInstruction } from "../../../../PackageSystem/Instructions/Options/IOptionInstruction.js";
import { XMLEditor } from "../../../../Serialization/XMLEditor.js";
import { ImportCompilerTester } from "./ImportCompilerTester.js";

/**
 * Provides the functionality to test an option-compiler.
 *
 * @template TCompiler
 * The type of the compiler to test.
 */
export class OptionCompilerTester<TCompiler extends OptionFileCompiler<IOptionInstruction<ICategory<Option>, Option>, ICategory<Option>, Option>> extends ImportCompilerTester<TCompiler>
{
    /**
     * Initializes a new instance of the {@link OptionCompilerTester `OptionCompilerTester<TCompiler>`} class.
     *
     * @param compiler
     * The compiler to test.
     */
    public constructor(compiler: TCompiler)
    {
        super(compiler);
    }

    /**
     * Gets the name of the tags containing the category-list.
     */
    public get CategoryListTag(): string
    {
        return "categories";
    }

    /**
     * Gets the name of the tags containing the categories.
     */
    public get CategoryTag(): string
    {
        return "category";
    }

    /**
     * Gets the name of the tags containing the option-list.
     */
    public get OptionListTag(): string
    {
        return "options";
    }

    /**
     * Gets the name of the tags containing the options.
     */
    public get OptionTag(): string
    {
        return "option";
    }

    /**
     * Gets an editor for manipulating the categories.
     */
    public get CategoriesEditor(): XMLEditor
    {
        return this.ImportEditor.GetChildrenByTag(this.CategoryListTag)[0];
    }

    /**
     * Gets an editor for manipulating the options.
     */
    public get OptionsEditor(): XMLEditor
    {
        return this.ImportEditor.GetChildrenByTag(this.OptionListTag)[0];
    }
}
