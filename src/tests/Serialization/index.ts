import { XMLTests } from "./XML.test";
import { XMLEditorTests } from "./XMLEditor.test";

/**
 * Registers tests for serialization components.
 */
export function SerializationTests(): void
{
    suite(
        "Serialization",
        () =>
        {
            XMLTests();
            XMLEditorTests();
        });
}
