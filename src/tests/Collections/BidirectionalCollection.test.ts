import { strictEqual } from "assert";
import { BidirectionalCollection } from "../../Collections/BidirectionalCollection";

/**
 * Registers tests for the {@link BidirectionalCollection `BidirectionalCollection<TParent, TChild>`} class.
 */
export function BidirectionalCollectionTests(): void
{
    suite(
        "BidirectionalCollection",
        () =>
        {
            /**
             * Represents a parent-object.
             */
            class Parent
            { }

            /**
             * Represents a child-object.
             */
            class Child
            {
                /**
                 * Gets or sets the parent of the child.
                 */
                public Parent: Parent = null;
            }

            /**
             * Represents a simple collection.
             */
            class MyCollection extends BidirectionalCollection<Parent, Child>
            {
                /**
                 * @inheritdoc
                 *
                 * @param child
                 * The child whose parent to return.
                 *
                 * @returns
                 * The parent of the specified {@link child `child`}.
                 */
                protected GetParent(child: Child): Parent
                {
                    return child?.Parent;
                }

                /**
                 * @inheritdoc
                 *
                 * @param child
                 * The child whose parent is to be set.
                 *
                 * @param parent
                 * The parent to set.
                 */
                protected SetParent(child: Child, parent: Parent): void
                {
                    child.Parent = parent;
                }
            }

            let parent: Parent;
            let child: Child;
            let collection: MyCollection;

            setup(
                () =>
                {
                    parent = new Parent();
                    child = new Child();
                    collection = new MyCollection(parent);
                });

            suite(
                "push",
                () =>
                {
                    test(
                        "Checking whether the parent is set automatically…",
                        () =>
                        {
                            collection.push(child);
                            strictEqual(child.Parent, parent);
                        });
                });

            suite(
                "pop",
                () =>
                {
                    test(
                        "Checking whether the parent is unset automatically…",
                        () =>
                        {
                            collection.push(child);
                            collection.pop();
                            strictEqual(child.Parent, null);
                        });
                });
        });
}
