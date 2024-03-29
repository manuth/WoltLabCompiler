import { AssertionError, ok, strictEqual } from "node:assert";
import { OptionFileCompiler } from "../../../../Compilation/Options/OptionFileCompiler.js";
import { INode } from "../../../../NodeSystem/Generic/INode.js";
import { ICategory } from "../../../../Options/Generic/ICategory.js";
import { Option } from "../../../../Options/Option.js";
import { IOptionInstruction } from "../../../../PackageSystem/Instructions/Options/IOptionInstruction.js";
import { XMLEditor } from "../../../../Serialization/XMLEditor.js";
import { OptionCompilerTester } from "../Testers/OptionCompilerTester.js";
import { ImportCompilerTestRunner } from "./ImportCompilerTestRunner.js";

/**
 * Provides the functionality to register tests for {@link OptionFileCompiler `OptionFileCompiler<T, TCategory, TOption>`}s.
 *
 * @template TTester
 * The type of the compiler-tester.
 *
 * @template TCompiler
 * The type of the compiler.
 *
 * @template TCategory
 * The type of the categories provided by the instruction.
 *
 * @template TOption
 * The type of the options provided by the instruction.
 */
export abstract class OptionFileCompilerTestRunner<TTester extends OptionCompilerTester<TCompiler>, TCompiler extends OptionFileCompiler<IOptionInstruction<TCategory, TOption>, TCategory, TOption>, TCategory extends ICategory<TOption>, TOption extends Option> extends ImportCompilerTestRunner<TTester, TCompiler>
{
    /**
     * Initializes a new instance of the {@link OptionFileCompilerTestRunner `OptionFileCompilerTestRunner<TTester, TCompiler, TCategory, TOption>`} class.
     *
     * @param title
     * The title of the suite.
     */
    public constructor(title: string)
    {
        super(title);
    }

    /**
     * Gets the categories to test.
     */
    protected get Categories(): Array<INode<TCategory>>
    {
        let result: Array<INode<TCategory>> = [];

        let nodeCollector = (node: INode<TCategory>): Array<INode<TCategory>> =>
        {
            let result: Array<INode<TCategory>> = [];
            result.push(node);

            for (let subNode of node.Nodes)
            {
                result.push(...nodeCollector(subNode));
            }

            return result;
        };

        for (let node of this.Compiler.Item.Nodes)
        {
            result.push(...nodeCollector(node));
        }

        return result;
    }

    /**
     * Gets the options to test.
     */
    protected get Options(): TOption[]
    {
        return this.Categories.flatMap(
            (category) =>
            {
                return category.Item.Options;
            });
    }

    /**
     * @inheritdoc
     */
    protected override ExecuteTests(): void
    {
        super.ExecuteTests();

        test(
            "Checking whether the option- and category-lists exist…",
            () =>
            {
                this.AssertTag(this.Tester.ImportEditor, this.Tester.CategoryListTag);
                this.AssertTag(this.Tester.ImportEditor, this.Tester.OptionListTag);
            });

        test(
            "Checking whether all options and category-lists exist…",
            () =>
            {
                strictEqual(
                    this.Tester.CategoriesEditor.GetChildrenByTag(this.Tester.CategoryTag).length,
                    this.Categories.length);

                strictEqual(
                    this.Tester.OptionsEditor.GetChildrenByTag(this.Tester.OptionTag).length,
                    this.Options.length);
            });

        test(
            "Checking the integrity of the metadata…",
            () =>
            {
                for (let category of this.Categories)
                {
                    ok(
                        this.Tester.CategoriesEditor.GetChildrenByTag(this.Tester.CategoryTag).some(
                            (categoryNode) =>
                            {
                                try
                                {
                                    this.AssertCategoryMetadata(categoryNode, category);
                                    return true;
                                }
                                catch (error)
                                {
                                    if (error instanceof AssertionError)
                                    {
                                        return false;
                                    }
                                    else
                                    {
                                        throw error;
                                    }
                                }
                            }));
                }

                for (let option of this.Options)
                {
                    ok(
                        this.Tester.OptionsEditor.GetChildrenByTag(this.Tester.OptionTag).some(
                            (optionNode) =>
                            {
                                try
                                {
                                    this.AssertOptionMetadata(optionNode, option);
                                    return true;
                                }
                                catch (error)
                                {
                                    if (error instanceof AssertionError)
                                    {
                                        return false;
                                    }
                                    else
                                    {
                                        throw error;
                                    }
                                }
                            }));
                }
            });
    }

    /**
     * Asserts the content of a category-node.
     *
     * @param categoryNode
     * The category-node to check.
     *
     * @param category
     * The category to check.
     */
    protected abstract AssertCategoryMetadata(categoryNode: XMLEditor, category: INode<TCategory>): void;

    /**
     * Asserts the content of an option-node.
     *
     * @param optionNode
     * The option-node to check.
     *
     * @param option
     * The option to check.
     */
    protected abstract AssertOptionMetadata(optionNode: XMLEditor, option: TOption): void;
}
