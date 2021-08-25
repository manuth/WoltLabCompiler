import { basename } from "path";
import { BidirectionalCollectionTests } from "./BidirectionalCollection.test";

/**
 * Registers tests for collections.
 */
export function CollectionTests(): void
{
    suite(
        basename(__dirname),
        () =>
        {
            BidirectionalCollectionTests();
        });
}
