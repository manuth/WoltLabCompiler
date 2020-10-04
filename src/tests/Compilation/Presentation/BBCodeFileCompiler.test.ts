import { strictEqual } from "assert";
import { TempFile } from "@manuth/temp-files";
import { readFile } from "fs-extra";
import { DOMParser } from "xmldom";
import { BBCodeFileCompiler } from "../../../Compilation/Presentation/BBCodeFileCompiler";
import { IBBCodeAttributeOptions } from "../../../Customization/BBCodes/IBBCodeAttributeOptions";
import { ILocalization } from "../../../Globalization/ILocalization";
import { BBCodeInstruction } from "../../../PackageSystem/Instructions/Customization/BBCodeInstruction";
import { XMLEditor } from "../../../Serialization/XMLEditor";

/**
 * Registers tests for the `BBCodeFileCompiler` class.
 */
export function BBCodeFileCompilerTests(): void
{
    suite(
        "BBCodeFileCompiler",
        () =>
        {
            let tempFile: TempFile;
            let compiler: BBCodeFileCompiler;

            let commonBBCodeName: string;
            let label: ILocalization;
            let icon: string;
            let isBlockElement: boolean;
            let parseContent: boolean;
            let attribute: IBBCodeAttributeOptions;

            let classBBCodeName: string;
            let className: string;

            let htmlBBCodeName: string;
            let htmlTag: string;
            let isSelfClosing: boolean;

            suiteSetup(
                () =>
                {
                    tempFile = new TempFile();

                    commonBBCodeName = "foo";
                    label = {
                        en: "Hello World"
                    };
                    icon = "fa-bath";
                    isBlockElement = false;
                    parseContent = true;
                    attribute = {
                        Code: "style=\"%s\"",
                        Required: true,
                        ValueByContent: true,
                        ValidationPattern: /^.*$/g
                    };

                    classBBCodeName = "bar";
                    className = "wcf\\system\\bbcode\\MyBBCode";

                    htmlBBCodeName = "baz";
                    htmlTag = "span";
                    isSelfClosing = true;

                    compiler = new BBCodeFileCompiler(
                        new BBCodeInstruction(
                            {
                                FileName: null,
                                BBCodes: [
                                    {
                                        Name: commonBBCodeName,
                                        DisplayName: label,
                                        Icon: icon,
                                        IsBlockElement: isBlockElement,
                                        ParseContent: parseContent,
                                        Attributes: [attribute, attribute]
                                    },
                                    {
                                        Name: classBBCodeName,
                                        ClassName: className
                                    },
                                    {
                                        Name: htmlBBCodeName,
                                        TagName: htmlTag,
                                        IsSelfClosing: isSelfClosing
                                    }
                                ]
                            }));

                    compiler.DestinationPath = tempFile.FullName;
                });

            suiteTeardown(
                () =>
                {
                    tempFile.Dispose();
                });

            suite(
                "Compile",
                () =>
                {
                    suite(
                        "General",
                        () =>
                        {
                            test(
                                "Checking whether the item can be compiled…",
                                async () =>
                                {
                                    await compiler.Execute();
                                });
                        });

                    suite(
                        "Testing the integrity of the created file…",
                        () =>
                        {
                            let importEditor: XMLEditor;

                            suite(
                                "General",
                                () =>
                                {
                                    test(
                                        "Checking whether the content of the compiled file is valid xml…",
                                        async () =>
                                        {
                                            let document = new DOMParser().parseFromString((await readFile(tempFile.FullName)).toString());
                                            importEditor = new XMLEditor(document.documentElement).GetChildrenByTag("import")[0];
                                        });
                                });

                            suite(
                                "Checking the integrity of imported bb-codes…",
                                () =>
                                {
                                    let bbCodeTag: string;
                                    let bbCodeEditors: XMLEditor[];
                                    let nameAttribute: string;

                                    suiteSetup(
                                        () =>
                                        {
                                            bbCodeTag = "bbcode";
                                            bbCodeEditors = [];
                                            nameAttribute = "name";
                                        });

                                    suite(
                                        "General",
                                        () =>
                                        {
                                            test(
                                                "Checking whether at least one bb-code exists…",
                                                () =>
                                                {
                                                    strictEqual(importEditor.HasTag(bbCodeTag), true);
                                                    bbCodeEditors = importEditor.GetChildrenByTag(bbCodeTag);
                                                });
                                        });

                                    suite(
                                        "Checking the integrity of common bb-codes…",
                                        () =>
                                        {
                                            let bbCodeEditor: XMLEditor;
                                            let labelTag: string;
                                            let iconTag: string;
                                            let isBlockElementTag: string;
                                            let parseContentTag: string;

                                            suiteSetup(
                                                () =>
                                                {
                                                    labelTag = "buttonLabel";
                                                    iconTag = "wysiwygicon";
                                                    isBlockElementTag = "isBlockElement";
                                                    parseContentTag = "sourcecode";
                                                });

                                            suite(
                                                "General",
                                                () =>
                                                {
                                                    test(
                                                        "Checking whether the common bb-code is present…",
                                                        () =>
                                                        {
                                                            let matches = bbCodeEditors.filter(
                                                                (editor) =>
                                                                {
                                                                    return editor.GetAttribute(nameAttribute) === commonBBCodeName;
                                                                });

                                                            strictEqual(matches.length, 1);
                                                            bbCodeEditor = matches[0];
                                                        });
                                                });

                                            suite(
                                                "Checking the integrity of the meta-data…",
                                                () =>
                                                {
                                                    test(
                                                        "Checking the integrity of the label-property",
                                                        () =>
                                                        {
                                                            strictEqual(bbCodeEditor.HasText(labelTag, `wcf.editor.button.${commonBBCodeName}`), true);
                                                        });

                                                    test(
                                                        "Checking the integrity of the icon-property…",
                                                        () =>
                                                        {
                                                            strictEqual(bbCodeEditor.HasText(iconTag, icon), true);
                                                        });

                                                    test(
                                                        "Checking the integrity of the isBlockElement-property…",
                                                        () =>
                                                        {
                                                            strictEqual(bbCodeEditor.HasText(isBlockElementTag, isBlockElement ? "1" : "0"), true);
                                                        });

                                                    test(
                                                        "Checking the integrity of the parseContent-property…",
                                                        () =>
                                                        {
                                                            strictEqual(bbCodeEditor.HasText(parseContentTag, parseContent ? "0" : "1"), true);
                                                        });
                                                });

                                            suite(
                                                "Checking the integrity of the attributes…",
                                                () =>
                                                {
                                                    let attributeEditor: XMLEditor;
                                                    let attributesEditor: XMLEditor;

                                                    suite(
                                                        "General",
                                                        () =>
                                                        {
                                                            let attributeTag: string;
                                                            let attributesTag: string;

                                                            suiteSetup(
                                                                () =>
                                                                {
                                                                    attributeTag = "attribute";
                                                                    attributesTag = "attributes";
                                                                });

                                                            test(
                                                                "Checking the integrity of the attributes-property…",
                                                                () =>
                                                                {
                                                                    strictEqual(bbCodeEditor.HasTag(attributesTag, true), true);
                                                                    attributesEditor = bbCodeEditor.GetChildrenByTag(attributesTag)[0];
                                                                });

                                                            test(
                                                                "Checking whether at least one attribute is present…",
                                                                () =>
                                                                {
                                                                    let attributeEditors = attributesEditor.GetChildrenByTag(attributeTag);
                                                                    strictEqual(attributeEditors.length > 0, true);
                                                                    attributeEditor = attributeEditors[Math.floor(Math.random() * attributeEditors.length)];
                                                                });
                                                        });

                                                    suite(
                                                        "Checking the integrity of the meta-data…",
                                                        () =>
                                                        {
                                                            let requiredTag: string;
                                                            let valueByContentTag: string;
                                                            let codeTag: string;
                                                            let validationPatternTag: string;

                                                            suiteSetup(
                                                                () =>
                                                                {
                                                                    requiredTag = "required";
                                                                    valueByContentTag = "useText";
                                                                    codeTag = "html";
                                                                    validationPatternTag = "validationpattern";
                                                                });

                                                            test(
                                                                "Checking the integrity of the required-property",
                                                                () =>
                                                                {
                                                                    strictEqual(attributeEditor.HasText(requiredTag, attribute.Required ? "1" : "0"), true);
                                                                });

                                                            test(
                                                                "Checking the integrity of the valueByContent-property",
                                                                () =>
                                                                {
                                                                    strictEqual(attributeEditor.HasText(valueByContentTag, attribute.ValueByContent ? "1" : "0"), true);
                                                                });

                                                            test(
                                                                "Checking the integrity of the code-property",
                                                                function()
                                                                {
                                                                    if (attribute.Code === undefined)
                                                                    {
                                                                        this.skip();
                                                                    }
                                                                    else
                                                                    {
                                                                        strictEqual(attributeEditor.HasText(codeTag, attribute.Code), true);
                                                                    }
                                                                });

                                                            test(
                                                                "Checking the integrity of the validationPattern-property",
                                                                function(): void
                                                                {
                                                                    if (attribute.ValidationPattern === undefined)
                                                                    {
                                                                        this.skip();
                                                                    }
                                                                    else
                                                                    {
                                                                        strictEqual(attributeEditor.HasText(validationPatternTag, attribute.ValidationPattern.source), true);
                                                                    }
                                                                });
                                                        });
                                                });
                                        });

                                    suite(
                                        "Checking the integrity of bb-codes based on PHP-classes…",
                                        () =>
                                        {
                                            let bbCodeEditor: XMLEditor;
                                            let classTag: string;

                                            suiteSetup(
                                                () =>
                                                {
                                                    classTag = "classname";
                                                });

                                            suite(
                                                "General",
                                                () =>
                                                {
                                                    test(
                                                        "Checking whether the class-bb-code is present…",
                                                        () =>
                                                        {
                                                            let matches = bbCodeEditors.filter(
                                                                (element) =>
                                                                {
                                                                    return element.GetAttribute(nameAttribute) === classBBCodeName;
                                                                });

                                                            strictEqual(matches.length, 1);
                                                            bbCodeEditor = matches[0];
                                                        });
                                                });

                                            suite(
                                                "Checking the integrity of the meta-data…",
                                                () =>
                                                {
                                                    test(
                                                        "Checking the integrity of the class-property…",
                                                        () =>
                                                        {
                                                            strictEqual(bbCodeEditor.HasText(classTag, className), true);
                                                        });
                                                });
                                        });

                                    suite(
                                        "Checking the integrity of bb-codes based on HTML…",
                                        () =>
                                        {
                                            let bbCodeEditor: XMLEditor;

                                            let htmlOpenTag: string;
                                            let htmlCloseTag: string;

                                            suiteSetup(
                                                () =>
                                                {
                                                    htmlOpenTag = "htmlopen";
                                                    htmlCloseTag = "htmlclose";
                                                });

                                            suite(
                                                "General",
                                                () =>
                                                {
                                                    test(
                                                        "Checking whether the html bb-code is present…",
                                                        () =>
                                                        {
                                                            let matches = bbCodeEditors.filter(
                                                                (element) =>
                                                                {
                                                                    return element.GetAttribute(nameAttribute) === htmlBBCodeName;
                                                                });

                                                            strictEqual(matches.length, 1);
                                                            bbCodeEditor = matches[0];
                                                        });
                                                });

                                            suite(
                                                "Checking the integrity of the meta-data…",
                                                () =>
                                                {
                                                    test(
                                                        "Checking the integrity of the opening html-tag…",
                                                        () =>
                                                        {
                                                            strictEqual(bbCodeEditor.HasText(htmlOpenTag, htmlTag), true);
                                                        });

                                                    test(
                                                        "Checking the integrity of the closing html-tag…",
                                                        () =>
                                                        {
                                                            if (isSelfClosing)
                                                            {
                                                                strictEqual(importEditor.GetElementsByTag(htmlCloseTag).length, 0);
                                                            }
                                                            else
                                                            {
                                                                strictEqual(bbCodeEditor.HasText(htmlCloseTag, htmlTag), true);
                                                            }
                                                        });
                                                });
                                        });
                                });
                        });
                });
        });
}