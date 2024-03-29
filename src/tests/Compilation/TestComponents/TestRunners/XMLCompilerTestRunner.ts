import { ok, strictEqual } from "node:assert";
import { XMLFileCompiler } from "../../../../Compilation/XMLFileCompiler.js";
import { XMLEditor } from "../../../../Serialization/XMLEditor.js";
import { XMLFileCompilerTester } from "../Testers/XMLFileCompilerTester.js";
import { CompilerTestRunner } from "./CompilerTestRunner.js";

/**
 * Provides the functionality to register tests for the {@link XMLFileCompiler `XMLFileCompiler<T>`}.
 *
 * @template TTester
 * The type of the compiler-tester.
 *
 * @template TCompiler
 * The type of the compiler.
 */
export abstract class XMLCompilerTestRunner<TTester extends XMLFileCompilerTester<TCompiler>, TCompiler extends XMLFileCompiler<unknown>> extends CompilerTestRunner<TTester, TCompiler>
{
    /**
     * Initializes a new instance of the {@link XMLCompilerTestRunner `XMLCompilerTestRunner<TTester, TCompiler>`} class.
     *
     * @param title
     * The title of the suite.
     */
    public constructor(title: string)
    {
        super(title);
    }

    /**
     * @inheritdoc
     */
    protected override ExecuteTests(): void
    {
        super.ExecuteTests();

        test(
            "Checking whether the compiled file contains valid xml…",
            () =>
            {
                ok(this.Tester.IsValidXML);
            });
    }

    /**
     * Asserts the existence of a tag named {@link tagname `tagname`} inside the {@link element `element`}.
     *
     * @param element
     * The element to check for the tag.
     *
     * @param tagName
     * The name of the asserted tag.
     *
     * @param unique
     * A value indicating whether the tag is unique inside the element.
     */
    protected AssertTag(element: XMLEditor, tagName: string, unique?: boolean): void
    {
        let elements = element.GetChildrenByTag(tagName);
        ok(unique ? (elements.length === 1) : (elements.length > 0));
    }

    /**
     * Returns the element with the unique {@link tagName `tagName`}.
     *
     * @param element
     * The element to check for the tag.
     *
     * @param tagName
     * The name of the tag.
     *
     * @returns
     * The element with the unique {@link tagName `tagName`}.
     */
    protected GetElement(element: XMLEditor, tagName: string): XMLEditor
    {
        let elements = element.GetChildrenByTag(tagName);
        strictEqual(elements.length, 1);
        return elements[0];
    }

    /**
     * Gets the text of a child-tag with the speicifed {@link tagName `tagName`}.
     *
     * @param element
     * The element to check for the tag.
     *
     * @param tagName
     * The name of the tag.
     *
     * @returns
     * The text of the child-tag with the specified {@link tagName `tagName`}.
     */
    protected GetText(element: XMLEditor, tagName: string): string
    {
        return this.GetElement(element, tagName).TextContent;
    }

    /**
     * Asserts the content of a child-tag with the specified {@link tagName `tagName`}.
     *
     * @param element
     * The element to check for the tag.
     *
     * @param tagName
     * The name of the asserted tag.
     *
     * @param content
     * The asserted content.
     */
    protected AssertTagContent(element: XMLEditor, tagName: string, content: string): void
    {
        strictEqual(this.GetText(element, tagName), content);
    }
}
