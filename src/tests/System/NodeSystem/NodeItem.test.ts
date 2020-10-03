import Assert = require("assert");
import { Node } from "../../../System/NodeSystem/Node";
import { NodeItem } from "../../../System/NodeSystem/NodeItem";

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
                        Assert.strictEqual(node.Item.Node, node);
                    });
            });
    });
