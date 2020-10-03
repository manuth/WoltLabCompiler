import Assert = require("assert");
import { BidirectionalCollection } from "../../../System/Collections/BidirectionalCollection";

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
            public Parent: Parent;
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
             * The parent of the `child`.
             */
            protected GetParent(child: Child): Parent
            {
                return child.Parent;
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

        suiteSetup(
            () =>
            {
                parent = new Parent();
                child = new Child();
                collection = new MyCollection(parent);
            });

        test(
            "Checking whether the parent is set automatically…",
            () =>
            {
                collection.push(child);
                Assert.strictEqual(child.Parent, parent);
            });

        test(
            "Checking whether the parent is unset automatically…",
            () =>
            {
                collection.pop();
                Assert.strictEqual(child.Parent, null);
            });
    });
