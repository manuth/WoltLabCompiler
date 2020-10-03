import { BidirectionalCollectionTests } from "./BidirectionalCollection.test";

/**
 * Registers tests for collections.
 */
export function CollectionTests(): void
{
    suite(
        "Collections",
        () =>
        {
            BidirectionalCollectionTests();
        });
}
