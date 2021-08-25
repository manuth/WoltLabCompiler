import { basename } from "path";
import { XMLTests } from "./XML.test";
import { XMLEditorTests } from "./XMLEditor.test";

/**
 * Registers tests for serialization components.
 */
export function SerializationTests(): void
{
    suite(
        basename(__dirname),
        () =>
        {
            XMLTests();
            XMLEditorTests();
        });
}
