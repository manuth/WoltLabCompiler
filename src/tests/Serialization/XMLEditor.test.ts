import { ok, strictEqual, throws } from "assert";
import { XML } from "../../Serialization/XML.js";
import { XMLEditor } from "../../Serialization/XMLEditor.js";

/**
 * Registers tests for the {@link XMLEditor `XMLEditor`} class.
 */
export function XMLEditorTests(): void
{
    suite(
        nameof(XMLEditor),
        () =>
        {
            let tagName: string;
            let documentElement: Element;
            let temp: XMLEditor;

            suiteSetup(
                () =>
                {
                    tagName = "data";
                });

            setup(
                () =>
                {
                    documentElement = XML.CreateDocument(tagName).documentElement;
                    temp = new XMLEditor(documentElement);
                });

            suite(
                nameof(XMLEditor.constructor),
                () =>
                {
                    test(
                        "Checking whether a new instance can be initialized…",
                        () =>
                        {
                            new XMLEditor(documentElement);
                        });
                });

            suite(
                nameof<XMLEditor>((editor) => editor.TagName),
                () =>
                {
                    test(
                        "Checking whether the name of the tag is correct…",
                        () =>
                        {
                            strictEqual(temp.TagName, tagName);
                        });
                });

            suite(
                nameof<XMLEditor>((editor) => editor.Element),
                () =>
                {
                    test(
                        "Checking whether the element of the editor is correct…",
                        () =>
                        {
                            ok(temp.Element === documentElement);
                        });
                });

            suite(
                nameof<XMLEditor>((editor) => editor.ParentNode),
                () =>
                {
                    let child: XMLEditor;

                    setup(
                        () =>
                        {
                            child = temp.CreateElement("bar");
                            temp.Add(child);
                        });

                    test(
                        `Checking whether the \`${nameof<XMLEditor>((e) => e.ParentNode)}\` is set correctly…`,
                        () =>
                        {
                            ok(child.ParentNode === temp.Element);
                        });
                });

            suite(
                nameof<XMLEditor>((editor) => editor.Document),
                () =>
                {
                    test(
                        `Checking whether the \`${nameof<XMLEditor>((e) => e.Document)}\`-property is a document-node…`,
                        () =>
                        {
                            strictEqual(temp.Document.nodeType, temp.Element.DOCUMENT_NODE);
                        });
                });

            suite(
                nameof<XMLEditor>((editor) => editor.ChildNodes),
                () =>
                {
                    let children: string[];

                    suiteSetup(
                        () =>
                        {
                            children = ["foo", "bar", "baz"];
                        });

                    setup(
                        () =>
                        {
                            for (let child of children)
                            {
                                temp.Add(temp.CreateElement(child));
                            }
                        });

                    test(
                        `Checking whether the \`${nameof<XMLEditor>((e) => e.ChildNodes)}\`-property is set correctly…`,
                        () =>
                        {
                            strictEqual(temp.ChildNodes.length, children.length);

                            temp.ChildNodes.every(
                                (node: Node) =>
                                {
                                    return node.nodeType === node.ELEMENT_NODE && children.includes((node as Element).tagName);
                                });
                        });
                });

            suite(
                nameof<XMLEditor>((editor) => editor.CreateElement),
                () =>
                {
                    let tagName: string;

                    suiteSetup(
                        () =>
                        {
                            tagName = "bar";
                        });

                    test(
                        "Checking whether elements are created correctly…",
                        () =>
                        {
                            let element = temp.CreateElement(tagName);
                            strictEqual(element.TagName, tagName);
                        });
                });

            suite(
                nameof<XMLEditor>((editor) => editor.CreateCDATAElement),
                () =>
                {
                    let tagName: string;
                    let content: string;

                    suiteSetup(
                        () =>
                        {
                            tagName = "baz";
                            content = "Hello\nWorld";
                        });

                    test(
                        "Checking whether elements are created correctly…",
                        () =>
                        {
                            let element: XMLEditor = temp.CreateCDATAElement(tagName, content);
                            strictEqual(element.TagName, tagName);
                            strictEqual(element.ChildNodes[0].nodeType, element.Element.CDATA_SECTION_NODE);
                            strictEqual(element.TextContent, content);
                        });
                });

            suite(
                nameof<XMLEditor>((editor) => editor.CreateTextElement),
                () =>
                {
                    let tagName: string;
                    let content: string;

                    suiteSetup(
                        () =>
                        {
                            tagName = "baz";
                            content = "Hello\nWorld";
                        });

                    test(
                        "Checking whether elements are created correctly…",
                        () =>
                        {
                            let element = temp.CreateTextElement(tagName, content);
                            strictEqual(element.TagName, tagName);
                            strictEqual(element.ChildNodes[0].nodeType, element.Element.TEXT_NODE);
                            strictEqual(element.TextContent, content);
                        });
                });

            suite(
                nameof<XMLEditor>((editor) => editor.Add),
                () =>
                {
                    let child: XMLEditor;
                    let childNode: Node;

                    setup(
                        () =>
                        {
                            childNode = temp.Document.createElement("foo");
                            child = new XMLEditor(temp.Document.createElement("bar"));
                        });

                    test(
                        `Checking whether \`${nameof(XMLEditor)}\`-instances can be added…`,
                        () =>
                        {
                            temp.Add(child);
                            ok(temp.ChildNodes.includes(child.Element));
                        });

                    test(
                        `Checking whether \`${nameof<Node>()}\`-instances can be added…`,
                        () =>
                        {
                            temp.Add(childNode);
                            ok(temp.ChildNodes.includes(childNode));
                        });

                    test(
                        "Checking whether elements can be added…",
                        () =>
                        {
                            temp.Add(child.Element);
                            ok(temp.ChildNodes.includes(child.Element));
                        });
                });

            suite(
                nameof<XMLEditor>((editor) => editor.Insert),
                () =>
                {
                    let tag: string;
                    let newElement: XMLEditor;

                    suiteSetup(
                        () =>
                        {
                            tag = "foo";
                        });

                    setup(
                        () =>
                        {
                            newElement = temp.CreateElement(tag);
                        });

                    test(
                        "Checking whether inserting elements at inexistent indexes causes an error…",
                        () =>
                        {
                            throws(() => temp.Insert(1, newElement));
                        });

                    test(
                        "Checking whether items can be inserted into an empty element…",
                        () =>
                        {
                            let index = 0;
                            temp.Insert(index, newElement);
                            strictEqual(temp.ChildNodes.indexOf(newElement.Element), index);
                        });

                    test(
                        "Checking whether items can be inserted at the end inside the element…",
                        () =>
                        {
                            let index = temp.ChildNodes.length;
                            temp.Insert(index, newElement);
                            strictEqual(temp.ChildNodes.indexOf(newElement.Element), index);
                        });

                    test(
                        `Checking whether items can be inserted anywhere inside the \`${nameof<XMLEditor>((e) => e.ChildNodes)}\`-list…`,
                        () =>
                        {
                            let index: number = Math.floor(Math.random() * temp.ChildNodes.length);
                            temp.Insert(index, newElement);
                            strictEqual(temp.ChildNodes.indexOf(newElement.Element), index);
                        });
                });

            suite(
                nameof<XMLEditor>((editor) => editor.GetChildrenByTag),
                () =>
                {
                    let tags: string[];

                    suiteSetup(
                        () =>
                        {
                            tags = ["foo", "bar", "baz", "this", "is", "a", "test"];
                        });

                    setup(
                        () =>
                        {
                            for (let tag of tags)
                            {
                                temp.Add(temp.CreateElement(tag));
                            }
                        });

                    test(
                        "Checking whether the children are queried correctly…",
                        () =>
                        {
                            let randomTag = tags[Math.floor(Math.random() * tags.length)];
                            temp.ChildNodes[Math.floor(Math.random() * temp.ChildNodes.length)].appendChild(temp.CreateElement(randomTag).Element);
                            let result = temp.GetChildrenByTag(randomTag);
                            strictEqual(result.length, 1);
                            ok(result[0].ParentNode === temp.Element);
                        });
                });

            suite(
                nameof<XMLEditor>((editor) => editor.GetElementsByTag),
                () =>
                {
                    let tags: string[];

                    suiteSetup(
                        () =>
                        {
                            tags = ["foo", "bar", "baz", "this", "is", "a", "test"];
                        });

                    setup(
                        () =>
                        {
                            for (let tag of tags)
                            {
                                temp.Add(temp.CreateElement(tag));
                            }
                        });

                    test(
                        "Checking whether the elements are queried correctly…",
                        () =>
                        {
                            let randomTag = tags[Math.floor(Math.random() * tags.length)];
                            temp.ChildNodes[Math.floor(Math.random() * temp.ChildNodes.length)].appendChild(temp.CreateElement(randomTag).Element);
                            let result = temp.GetElementsByTag(randomTag);
                            strictEqual(result.length, 2);
                        });
                });

            suite(
                nameof<XMLEditor>((editor) => editor.GetAttribute),
                () =>
                {
                    let attributeName: string;

                    suiteSetup(
                        () =>
                        {
                            attributeName = "testAttribute";
                        });

                    test(
                        "Checking whether querying inexistent attributes throws an exception…",
                        () =>
                        {
                            throws(() => temp.GetAttribute(attributeName));
                        });

                    test(
                        "Checking whether attributes are queried correctly…",
                        () =>
                        {
                            let value = "test";
                            temp.SetAttribute(attributeName, value);
                            strictEqual(temp.GetAttribute(attributeName), value);
                        });
                });

            suite(
                nameof<XMLEditor>((editor) => editor.SetAttribute),
                () =>
                {
                    let attributeName: string;
                    let attributeValue: string;

                    suiteSetup(
                        () =>
                        {
                            attributeName = "testAttribute";
                            attributeValue = "testValue";
                        });

                    test(
                        "Checking whether the value is set correctly…",
                        () =>
                        {
                            temp.SetAttribute(attributeName, attributeValue);
                            strictEqual(temp.GetAttribute(attributeName), attributeValue);
                        });
                });

            suite(
                nameof<XMLEditor>((editor) => editor.HasAttribute),
                () =>
                {
                    let attributeName: string;
                    let alternativeName: string;
                    let attributeValue: string;

                    suiteSetup(
                        () =>
                        {
                            attributeName = "correctName";
                            alternativeName = "wrongName";
                            attributeValue = "correctValue";
                        });

                    setup(
                        () =>
                        {
                            temp.SetAttribute(attributeName, attributeValue);
                        });

                    test(
                        "Checking whether the method acts as expected…",
                        () =>
                        {
                            ok(temp.HasAttribute(attributeName));
                            strictEqual(temp.HasAttribute(alternativeName), false);
                        });
                });
        });
}
