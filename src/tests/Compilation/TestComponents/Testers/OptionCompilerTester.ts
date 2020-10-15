import { OptionFileCompiler } from "../../../../Compilation/Options/OptionFileCompiler";
import { ICategory } from "../../../../Options/Generic/ICategory";
import { Option } from "../../../../Options/Option";
import { IOptionInstruction } from "../../../../PackageSystem/Instructions/Options/IOptionInstruction";
import { XMLEditor } from "../../../../Serialization/XMLEditor";
import { ImportCompilerTester } from "./ImportCompilerTester";

/**
 * Provides the functionality to test an option-compiler.
 */
export class OptionCompilerTester<TCompiler extends OptionFileCompiler<IOptionInstruction<ICategory<Option>, Option>, ICategory<Option>, Option>> extends ImportCompilerTester<TCompiler>
{
    /**
     * Initializes a new instance of the `OptionCompilerTester` class.
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
