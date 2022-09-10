import { strictEqual } from "node:assert";
import { Node } from "../../NodeSystem/Node.js";
import { NodeItem } from "../../NodeSystem/NodeItem.js";

/**
 * Registers tests for the {@link NodeItem `NodeItem`} class.
 */
export function NodeItemTests(): void
{
    suite(
        nameof(NodeItem),
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
                nameof<NodeItem>((i) => i.Node),
                () =>
                {
                    test(
                        `Checking whether the \`${nameof<NodeItem>((i) => i.Node)}\`-property is set correctly after initializing a new \`${nameof(NodeItem)}\`…`,
                        () =>
                        {
                            strictEqual(node.Item.Node, node);
                        });
                });
        });
}
