import { strictEqual } from "node:assert";
import dedent from "dedent";
import { XML } from "../../Serialization/XML.js";

/**
 * Registers tests for the {@link XML `XML`} class.
 */
export function XMLTests(): void
{
    suite(
        nameof(XML),
        () =>
        {
            suite(
                nameof(XML.CreateDocument),
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
                        "Checking whether documents can be created…",
                        () =>
                        {
                            document = XML.CreateDocument(tag);
                        });

                    test(
                        "Checking whether the processing-instruction exists…",
                        () =>
                        {
                            strictEqual(document.childNodes[0].nodeType, document.PROCESSING_INSTRUCTION_NODE);
                        });

                    test(
                        "Checking whether the tag-name is set correctly…",
                        () =>
                        {
                            strictEqual(document.documentElement.tagName, tag);
                        });
                });

            suite(
                nameof(XML.Format),
                () =>
                {
                    test(
                        "Checking whether `xml`-code is formatted correctly…",
                        () =>
                        {
                            let input: string = dedent(`
                                <?xml version="1.0" encoding="UTF-8"?><foo>
                                    <bar><baz>this
                                is
                                a
                                test for the indentation of the XML-formatter
                                Let's see it it works ✨</baz></bar></foo>`);

                            let output: string = dedent(`
                                <?xml version="1.0" encoding="UTF-8"?>
                                <foo>
                                    <bar>
                                        <baz>this
                                is
                                a
                                test for the indentation of the XML-formatter
                                Let's see it it works ✨</baz>
                                    </bar>
                                </foo>`);

                            strictEqual(XML.Format(input), output);
                        });
                });
        });
}
