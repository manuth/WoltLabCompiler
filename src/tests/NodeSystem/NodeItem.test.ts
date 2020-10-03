import { strictEqual } from "assert";
import { Node } from "../../NodeSystem/Node";
import { NodeItem } from "../../NodeSystem/NodeItem";

/**
 * Registers tests for the `NodeItem` class.
 */
export function NodeItemTests(): void
{
    suite(
        "NodeItem",
        () =>
        {
            suite(
                "Node",
                () =>
                {
                    let node: Node<NodeItem, unknown> = new Node<NodeItem, unknown>(
                        {
                            Name: "foo",
                            Item: {}
                        },
                        (parent: Node<NodeItem, unknown>): NodeItem =>
                        {
                            return new NodeItem(parent);
                        });

                    test(
                        "Checking whether the `Node`-property is set correctly after initializing a new `NodeItem`…",
                        () =>
                        {
                            strictEqual(node.Item.Node, node);
                        });
                });
        });
}
