import { ok, strictEqual } from "node:assert";
import { BBCodeFileCompiler } from "../../../Compilation/Presentation/BBCodeFileCompiler.js";
import { BBCodeInstruction } from "../../../PackageSystem/Instructions/Customization/BBCodeInstruction.js";
import { ImportCompilerTester } from "../TestComponents/Testers/ImportCompilerTester.js";
import { ImportCompilerTestRunner } from "../TestComponents/TestRunners/ImportCompilerTestRunner.js";

/**
 * Registers tests for the {@link BBCodeFileCompiler `BBCodeFileCompiler`} class.
 */
export function BBCodeFileCompilerTests(): void
{
    new class extends ImportCompilerTestRunner<ImportCompilerTester<BBCodeFileCompiler>, BBCodeFileCompiler>
    {
        /**
         * @inheritdoc
         *
         * @returns
         * The new compiler-tester instance.
         */
        protected CreateTester(): ImportCompilerTester<BBCodeFileCompiler>
        {
            return new ImportCompilerTester(
                new BBCodeFileCompiler(
                    new BBCodeInstruction(
                        {
                            FileName: null,
                            BBCodes: [
                                {
                                    Name: "foo",
                                    DisplayName: {
                                        en: "Hello World"
                                    },
                                    Icon: "fa-bath",
                                    IsBlockElement: Math.random() > 0.5,
                                    ParseContent: Math.random() > 0.5,
                                    Attributes: [
                                        {
                                            Code: 'style="%s"',
                                            Required: true,
                                            ValueByContent: true,
                                            ValidationPattern: /^.*$/g
                                        },
                                        {
                                            Code: 'class="%s"',
                                            Required: false,
                                            ValidationPattern: /^.*$/g
                                        }
                                    ]
                                },
                                {
                                    Name: "bar",
                                    ClassName: "wcf\\system\\bbcode\\MyBBCode"
                                },
                                {
                                    Name: "baz",
                                    TagName: "span",
                                    IsSelfClosing: Math.random() > 0.5
                                }
                            ]
                        })));
        }

        /**
         * @inheritdoc
         */
        protected override ExecuteTests(): void
        {
            super.ExecuteTests();

            test(
                "Checking the integrity of the metadata…",
                () =>
                {
                    let labelTag = "buttonlabel";
                    let iconTag = "wysiwygicon";
                    let classTag = "classname";
                    let htmlOpenTag = "htmlopen";
                    let htmlCloseTag = "htmlclose";
                    let codeTag = "html";
                    let patternTag = "validationpattern";
                    let bbCodeNodes = this.Tester.ImportEditor.GetChildrenByTag("bbcode");
                    strictEqual(bbCodeNodes.length, this.Compiler.Item.BBCodes.length);

                    for (let bbCode of this.Compiler.Item.BBCodes)
                    {
                        ok(
                            bbCodeNodes.some(
                                (bbCodeNode) =>
                                {
                                    try
                                    {
                                        if (bbCode.DisplayName.GetLocales().length > 0)
                                        {
                                            this.AssertTagContent(bbCodeNode, labelTag, `wcf.editor.button.${bbCode.Name}`);
                                        }
                                        else
                                        {
                                            strictEqual(bbCodeNode.GetChildrenByTag(labelTag).length, 0);
                                        }

                                        if (bbCode.Icon)
                                        {
                                            this.AssertTagContent(bbCodeNode, iconTag, bbCode.Icon);
                                        }
                                        else
                                        {
                                            strictEqual(bbCodeNode.GetChildrenByTag(iconTag).length, 0);
                                        }

                                        this.AssertTagContent(bbCodeNode, "isBlockElement", bbCode.IsBlockElement ? "1" : "0");
                                        this.AssertTagContent(bbCodeNode, "sourcecode", bbCode.ParseContent ? "0" : "1");

                                        if (bbCode.ClassName)
                                        {
                                            this.AssertTagContent(bbCodeNode, classTag, bbCode.ClassName);
                                        }
                                        else
                                        {
                                            strictEqual(bbCodeNode.GetChildrenByTag(classTag).length, 0);
                                        }

                                        if (!bbCode.TagName || bbCode.IsSelfClosing)
                                        {
                                            if (!bbCode.TagName)
                                            {
                                                strictEqual(bbCodeNode.GetChildrenByTag(htmlOpenTag).length, 0);
                                            }

                                            strictEqual(bbCodeNode.GetChildrenByTag(htmlCloseTag).length, 0);
                                        }

                                        if (bbCode.TagName)
                                        {
                                            this.AssertTagContent(bbCodeNode, htmlOpenTag, bbCode.TagName);

                                            if (!bbCode.IsSelfClosing)
                                            {
                                                this.AssertTagContent(bbCodeNode, htmlCloseTag, bbCode.TagName);
                                            }
                                        }

                                        if (bbCode.Attributes.length > 0)
                                        {
                                            let attributeNodes = this.GetElement(bbCodeNode, "attributes").GetChildrenByTag("attribute");
                                            strictEqual(attributeNodes.length, bbCode.Attributes.length);

                                            for (let attribute of bbCode.Attributes)
                                            {
                                                ok(
                                                    attributeNodes.some(
                                                        (attributeNode) =>
                                                        {
                                                            try
                                                            {
                                                                this.AssertTagContent(attributeNode, "required", attribute.Required ? "1" : "0");
                                                                this.AssertTagContent(attributeNode, "useText", attribute.ValueByContent ? "1" : "0");

                                                                if (attribute.Code)
                                                                {
                                                                    this.AssertTagContent(attributeNode, codeTag, attribute.Code);
                                                                }
                                                                else
                                                                {
                                                                    strictEqual(attributeNode.GetChildrenByTag(codeTag).length, 0);
                                                                }

                                                                if (attribute.ValidationPattern)
                                                                {
                                                                    this.AssertTagContent(attributeNode, patternTag, attribute.ValidationPattern.source);
                                                                }
                                                                else
                                                                {
                                                                    strictEqual(attributeNode.GetChildrenByTag(patternTag).length, 0);
                                                                }

                                                                return true;
                                                            }
                                                            catch
                                                            {
                                                                return false;
                                                            }
                                                        }));
                                            }
                                        }

                                        return true;
                                    }
                                    catch
                                    {
                                        return false;
                                    }
                                }));
                    }
                });
        }
    }(nameof(BBCodeFileCompiler)).Register();
}
