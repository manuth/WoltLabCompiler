import Assert = require("assert");
import { XML } from "../../../System/Serialization/XML";
import { XMLEditor } from "../../../System/Serialization/XMLEditor";

suite(
    "XMLEditor",
    () =>
    {
        let editorTag: string;
        let editorElement: Element;
        let temp: XMLEditor;
        let editor: XMLEditor;

        suiteSetup(
            () =>
            {
                editorTag = "data";
            });

        setup(
            () =>
            {
                temp = new XMLEditor(XML.CreateDocument("foo").documentElement);
            });

        teardown(
            () =>
            {
                temp = new XMLEditor(XML.CreateDocument("foo").documentElement);
            });

        suite(
            "constructor",
            () =>
            {
                test(
                    "Checking whether a new instance can be initialized…",
                    () =>
                    {
                        editorElement = XML.CreateDocument(editorTag).documentElement;
                        editor = new XMLEditor(editorElement);
                    });
            });

        suite(
            "TagName",
            () =>
            {
                test(
                    "Checking whether the name of the tag is correct…",
                    () =>
                    {
                        Assert.strictEqual(editor.TagName, editorTag);
                    });
            });

        suite(
            "Element",
            () =>
            {
                test(
                    "Checking whether the element of the editor is correct…",
                    () =>
                    {
                        Assert.strictEqual(editor.Element === editorElement, true);
                    });
            });

        suite(
            "ParentNode",
            () =>
            {
                let parent: XMLEditor;
                let child: XMLEditor;

                suiteSetup(
                    () =>
                    {
                        parent = temp;
                        parent.AddElement("bar", (childNode: XMLEditor) => child = childNode);
                    });

                test(
                    "Checking whether the ParentNode is correct…",
                    () =>
                    {
                        Assert.strictEqual(child.ParentNode === parent.Element, true);
                    });
            });

        suite(
            "Document",
            () =>
            {
                test(
                    "Checking whether the `Document`-property is a document-node…",
                    () =>
                    {
                        Assert.strictEqual(temp.Document.nodeType, temp.Element.DOCUMENT_NODE);
                    });
            });

        suite(
            "ChildNodes",
            () =>
            {
                let parent: XMLEditor;
                let children: string[];

                suiteSetup(
                    () =>
                    {
                        parent = temp;
                        children = ["foo", "bar", "baz"];

                        for (let child of children)
                        {
                            parent.AddElement(child);
                        }
                    });

                test(
                    "Checking whether the children are correct…",
                    () =>
                    {
                        Assert.strictEqual(parent.ChildNodes.length, children.length);
                        parent.ChildNodes.every(
                            (node: Node) =>
                            {
                                return node.nodeType === node.ELEMENT_NODE && children.includes((node as Element).tagName);
                            });
                    });
            });

        suite(
            "CreateElement(tag, processor?)",
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
                        let element: XMLEditor = editor.CreateElement(tagName);
                        Assert.strictEqual(element.TagName, tagName);
                    });

                test(
                    "Checking whether elements can be pre-processed…",
                    () =>
                    {
                        let content = "hello world";
                        let element = editor.CreateElement(tagName, (newChild: XMLEditor) => newChild.TextContent = content);
                        Assert.strictEqual(element.TextContent, content);
                    });
            });

        suite(
            "CreateCDATAElement(tag, textContent, processor?)",
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
                        let element: XMLEditor = editor.CreateCDATAElement(tagName, content);
                        Assert.strictEqual(element.TagName, tagName);
                        Assert.strictEqual(element.ChildNodes[0].nodeType, element.Element.CDATA_SECTION_NODE);
                        Assert.strictEqual(element.TextContent, content);
                    });

                test(
                    "Checking whether elements can be pre-processed…",
                    () =>
                    {
                        let element: XMLEditor = editor.CreateCDATAElement(
                            tagName,
                            content,
                            (newChild: XMLEditor) =>
                            {
                                content = content.replace("Hello", "Good evening");
                                newChild.ChildNodes[0].textContent = content;
                            });

                        Assert.strictEqual(element.TextContent, content);
                    });
            });

        suite(
            "CreateTextElement(tag, textContent, processor?)",
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
                        let element: XMLEditor = editor.CreateTextElement(tagName, content);
                        Assert.strictEqual(element.TagName, tagName);
                        Assert.strictEqual(element.ChildNodes[0].nodeType, element.Element.TEXT_NODE);
                        Assert.strictEqual(element.TextContent, content);
                    });

                test(
                    "Checking whether elements can be pre-processed…",
                    () =>
                    {
                        let element: XMLEditor = editor.CreateTextElement(
                            tagName,
                            content,
                            (newChild: XMLEditor) =>
                            {
                                content = content.replace("Hello", "Good evening");
                                newChild.ChildNodes[0].textContent = content;
                            });

                        Assert.strictEqual(element.TextContent, content);
                    });
            });

        suite(
            "Add<T>(node, processor)",
            () =>
            {
                let parent: XMLEditor;
                let child: XMLEditor;
                let childNode: Node;

                suiteSetup(
                    () =>
                    {
                        parent = temp;
                        childNode = parent.Document.createElement("foo");
                        child = new XMLEditor(parent.Document.createElement("bar"));
                    });

                test(
                    "Checking whether `XMLEditor`-instances can be added…",
                    () =>
                    {
                        parent.Add(child);
                        Assert.strictEqual(parent.ChildNodes.includes(child.Element), true);
                    });

                test(
                    "Checking whether `Node`-instances can be added…",
                    () =>
                    {
                        let node: Node;
                        parent.Add(childNode, (newNode: Node) => node = newNode);
                        Assert.strictEqual(childNode === node, true);
                        Assert.strictEqual(parent.ChildNodes.includes(childNode), true);
                    });
            });

        suite(
            "AddElement(tag, processor)",
            () =>
            {
                let tagName: string;
                let child: XMLEditor;
                let parent: XMLEditor;

                suiteSetup(
                    () =>
                    {
                        tagName = "foo";
                        parent = temp;
                    });

                test(
                    "Checking whether elements can be added…",
                    () =>
                    {
                        parent.AddElement(tagName, (childNode: XMLEditor) => child = childNode);
                        Assert.strictEqual(child.TagName, tagName);
                        Assert.strictEqual(parent.ChildNodes.includes(child.Element), true);
                    });
            });

        suite(
            "Insert(index, element)",
            () =>
            {
                let parent: XMLEditor;
                let tag: string;
                let newElement: XMLEditor;

                suiteSetup(
                    () =>
                    {
                        parent = temp;
                        tag = "foo";
                    });

                setup(
                    () =>
                    {
                        newElement = parent.CreateElement(tag);
                    });

                test(
                    "Checking whether inserting elements in inexistent-indexes causes an error…",
                    () =>
                    {
                        Assert.throws(() => parent.Insert(1, newElement));
                    });

                test(
                    "Checking whether items can be inserted into an empty element…",
                    () =>
                    {
                        let index = 0;
                        parent.Insert(index, newElement);
                        Assert.strictEqual(parent.ChildNodes.indexOf(newElement.Element), index);
                    });

                test(
                    "Checking whether items can be inserted at the end inside the element…",
                    () =>
                    {
                        let index = parent.ChildNodes.length;
                        parent.Insert(index, newElement);
                        Assert.strictEqual(parent.ChildNodes.indexOf(newElement.Element), index);
                    });

                test(
                    "Checking whether items can be inserted anywhere inside the childnode-list…",
                    () =>
                    {
                        let index: number = Math.floor(Math.random() * parent.ChildNodes.length);
                        parent.Insert(index, newElement);
                        Assert.strictEqual(parent.ChildNodes.indexOf(newElement.Element), index);
                    });
            });

        suite(
            "GetChildrenByTag(tag)",
            () =>
            {
                let parent: XMLEditor;
                let tags: string[];

                suiteSetup(
                    () =>
                    {
                        parent = temp;
                        tags = ["foo", "bar", "baz", "this", "is", "a", "test"];

                        for (let tag of tags)
                        {
                            parent.AddElement(tag);
                        }
                    });

                test(
                    "Checking whether the children are queried correctly…",
                    () =>
                    {
                        let randomTag = tags[Math.floor(Math.random() * tags.length)];
                        parent.ChildNodes[Math.floor(Math.random() * parent.ChildNodes.length)].appendChild(parent.CreateElement(randomTag).Element);
                        let result = parent.GetChildrenByTag(randomTag);
                        Assert.strictEqual(result.length, 1);
                        Assert.strictEqual(result[0].ParentNode === parent.Element, true);
                    });
            });

        suite(
            "GetElementsByTag(tag)",
            () =>
            {
                let parent: XMLEditor;
                let tags: string[];

                suiteSetup(
                    () =>
                    {
                        parent = temp;
                        tags = ["foo", "bar", "baz", "this", "is", "a", "test"];

                        for (let tag of tags)
                        {
                            parent.AddElement(tag);
                        }
                    });

                test(
                    "Checking whether the elements are queried correctly…",
                    () =>
                    {
                        let randomTag = tags[Math.floor(Math.random() * tags.length)];
                        parent.ChildNodes[Math.floor(Math.random() * parent.ChildNodes.length)].appendChild(parent.CreateElement(randomTag).Element);
                        let result = parent.GetElementsByTag(randomTag);
                        Assert.strictEqual(result.length, 2);
                    });
            });

        suite(
            "GetText(tag)",
            () =>
            {
                let parent: XMLEditor;
                let textTag: string;
                let textContent: string;

                suiteSetup(
                    () =>
                    {
                        parent = temp;
                        textTag = "baz";
                        textContent = "lorem\nipsum";
                    });

                test(
                    "Checking whether querying text from inexistent children throws an error…",
                    () =>
                    {
                        Assert.throws(() => parent.GetText(textTag));
                    });

                test(
                    "Checking whether querying text works correctly…",
                    () =>
                    {
                        parent.AddTextElement(textTag, textContent);
                        Assert.strictEqual(parent.GetText(textTag), textContent);
                    });
            });

        suite(
            "GetAttribute(name)",
            () =>
            {
                let attributeEditor: XMLEditor;
                let attributeName: string;

                suiteSetup(
                    () =>
                    {
                        attributeEditor = temp;
                        attributeName = "testAttribute";
                    });

                test(
                    "Checking whether querying inexistent attributes throws an exception…",
                    () =>
                    {
                        Assert.throws(() => attributeEditor.GetAttribute(attributeName));
                    });

                test(
                    "Checking whether attributes are queried correctly…",
                    () =>
                    {
                        let value = "test";
                        attributeEditor.SetAttribute(attributeName, value);
                        Assert.strictEqual(attributeEditor.GetAttribute(attributeName), value);
                    });
            });

        suite(
            "SetAttribute(name, value)",
            () =>
            {
                let attributeEditor: XMLEditor;
                let attributeName: string;
                let attributeValue: string;

                suiteSetup(
                    () =>
                    {
                        attributeEditor = temp;
                        attributeName = "testAttribute";
                        attributeValue = "testValue";
                    });

                test(
                    "Checking whether the value is set correctly…",
                    () =>
                    {
                        attributeEditor.SetAttribute(attributeName, attributeValue);
                        Assert.strictEqual(attributeEditor.GetAttribute(attributeName), attributeValue);
                    });
            });

        suite(
            "HasAttribute(name, value?)",
            () =>
            {
                let attributeEditor: XMLEditor;
                let attributeName: string;
                let alternativeName: string;
                let attributeValue: string;
                let alternativeValue: string;

                suiteSetup(
                    () =>
                    {
                        attributeEditor = temp;
                        attributeName = "correctName";
                        alternativeName = "wrongName";
                        attributeValue = "correctValue";
                        alternativeValue = "wrongValue";
                        attributeEditor.SetAttribute(attributeName, attributeValue);
                    });

                test(
                    "Checking whether the method acts as expected…",
                    () =>
                    {
                        Assert.strictEqual(attributeEditor.HasAttribute(attributeName), true);
                        Assert.strictEqual(attributeEditor.HasAttribute(attributeName, attributeValue), true);
                        Assert.strictEqual(attributeEditor.HasAttribute(attributeName, alternativeValue), false);
                        Assert.strictEqual(attributeEditor.HasAttribute(alternativeName), false);
                        Assert.strictEqual(attributeEditor.HasAttribute(alternativeName, attributeValue), false);
                        Assert.strictEqual(attributeEditor.HasAttribute(alternativeName, alternativeValue), false);
                    });
            });

        suite(
            "HasText(tag, text)",
            () =>
            {
                let textEditor: XMLEditor;
                let tag: string;
                let alternativeTag: string;
                let text: string;
                let alternativeText: string;

                suiteSetup(
                    () =>
                    {
                        textEditor = temp;
                        tag = "correct";
                        alternativeTag = "wrong";
                        text = "correctText";
                        alternativeText = "wrongText";
                        textEditor.AddTextElement(tag, text);
                    });

                test(
                    "Checking whether the method acts as expected…",
                    () =>
                    {
                        Assert.strictEqual(textEditor.HasText(null, text), true);
                        Assert.strictEqual(textEditor.HasText(null, alternativeText), false);
                        Assert.strictEqual(textEditor.HasText(tag, text), true);
                        Assert.strictEqual(textEditor.HasText(tag, alternativeText), false);
                        Assert.strictEqual(textEditor.HasText(alternativeTag, text), false);
                        Assert.strictEqual(textEditor.HasText(alternativeTag, alternativeText), false);
                    });
            });

        suite(
            "HasTag(tag, unique?)",
            () =>
            {
                let tagEditor: XMLEditor;
                let tag: string;
                let alternativeTag: string;

                suiteSetup(
                    () =>
                    {
                        tagEditor = temp;
                        tag = "correctTag";
                        alternativeTag = "alternativeTag";
                        tagEditor.AddElement(tag);
                    });

                test(
                    "Checking whether the method acts as expected…",
                    () =>
                    {
                        Assert.strictEqual(tagEditor.HasTag(tag), true);
                        Assert.strictEqual(tagEditor.HasTag(alternativeTag), false);
                        Assert.strictEqual(tagEditor.HasTag(tag, true), true);
                        Assert.strictEqual(tagEditor.HasTag(alternativeTag, true), false);

                        tagEditor.AddElement(tag);
                        Assert.strictEqual(tagEditor.HasTag(tag), true);
                        Assert.strictEqual(tagEditor.HasTag(alternativeTag), false);
                        Assert.strictEqual(tagEditor.HasTag(tag, true), false);
                        Assert.strictEqual(tagEditor.HasTag(alternativeTag, true), false);
                    });
            });
    });