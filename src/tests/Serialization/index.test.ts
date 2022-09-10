import { basename } from "node:path";
import { XMLTests } from "./XML.test.js";
import { XMLEditorTests } from "./XMLEditor.test.js";

/**
 * Registers tests for serialization components.
 */
export function SerializationTests(): void
{
    suite(
        basename(new URL(".", import.meta.url).pathname),
        () =>
        {
            XMLTests();
            XMLEditorTests();
        });
}
