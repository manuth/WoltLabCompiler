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
        {
        }

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
             * @param item
             * @inheritdoc
             */
            protected GetParent(item: Child)
            {
                return item.Parent;
            }

            /**
             * @param item
             * @param owner
             * @inheritdoc
             */
            protected SetParent(item: Child, owner: Parent)
            {
                item.Parent = owner;
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
