import { strictEqual } from "assert";
import { Node } from "../../NodeSystem/Node";
import { NodeItem } from "../../NodeSystem/NodeItem";

/**
 * Registers tests for the {@link NodeItem `NodeItem`} class.
 */
export function NodeItemTests(): void
{
    suite(
        "NodeItem",
        () =>
        {
            let node: Node<NodeItem, unknown>;

            setup(
                () =>
                {
                    node = new Node<NodeItem, unknown>(
                        {
                            Name: "foo",
                            Item: {}
                        },
                        (parent: Node<NodeItem, unknown>): NodeItem =>
                        {
                            return new NodeItem(parent);
                        });
                });

            suite(
                "Node",
                () =>
                {
                    test(
                        "Checking whether the `Node`-property is set correctly after initializing a new `NodeItem`…",
                        () =>
                        {
                            strictEqual(node.Item.Node, node);
                        });
                });
        });
}
