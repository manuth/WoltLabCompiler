import { basename } from "path";
import { BidirectionalCollectionTests } from "./BidirectionalCollection.test.js";

/**
 * Registers tests for collections.
 */
export function CollectionTests(): void
{
    suite(
        basename(new URL(".", import.meta.url).pathname),
        () =>
        {
            BidirectionalCollectionTests();
        });
}
