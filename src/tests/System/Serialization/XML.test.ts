import Assert = require("assert");
import Dedent = require("dedent");
import { XML } from "../../../System/Serialization/XML";

suite(
    "XML",
    () =>
    {
        suite(
            "CreateDocument",
            () =>
            {
                let tag: string;
                let document: Document;

                suiteSetup(
                    () =>
                    {
                        tag = "html";
                    });

                test(
                    "Checking whether document can be created…",
                    () =>
                    {
                        document = XML.CreateDocument(tag);
                    });

                test(
                    "Checking whether the processing-instruction exists…",
                    () =>
                    {
                        Assert.strictEqual(document.childNodes[0].nodeType, document.PROCESSING_INSTRUCTION_NODE);
                    });

                test(
                    "Checking whether the tag-name is correct…",
                    () =>
                    {
                        Assert.strictEqual(document.documentElement.tagName, tag);
                    });
            });

        suite(
            "Format()",
            () =>
            {
                test(
                    "Checking whether `xml`-code is formatted correctly…",
                    () =>
                    {
                        let input: string = Dedent(`
                            <?xml version="1.0" encoding="UTF-8"?><foo>
                                <bar><baz>this
                            is
                            a
                            test for the indentation of the XML-formatter
                            Let's see it it works :')</baz></bar></foo>`);

                        let output: string = Dedent(`
                            <?xml version="1.0" encoding="UTF-8"?>
                            <foo>
                                <bar>
                                    <baz>this
                            is
                            a
                            test for the indentation of the XML-formatter
                            Let's see it it works :')</baz>
                                </bar>
                            </foo>`);

                        Assert.strictEqual(XML.Format(input), output);
                    });
            });
    });