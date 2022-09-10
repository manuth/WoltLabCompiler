import { basename } from "path";
import { NodeTests } from "./Node.test.js";
import { NodeItemTests } from "./NodeItem.test.js";

/**
 * Registers tests for node-system components.
 */
export function NodeSystemTests(): void
{
    suite(
        basename(new URL(".", import.meta.url).pathname),
        () =>
        {
            NodeTests();
            NodeItemTests();
        });
}
