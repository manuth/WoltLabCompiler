import { basename } from "path";
import { NodeTests } from "./Node.test";
import { NodeItemTests } from "./NodeItem.test";

/**
 * Registers tests for node-system components.
 */
export function NodeSystemTests(): void
{
    suite(
        basename(__dirname),
        () =>
        {
            NodeTests();
            NodeItemTests();
        });
}
