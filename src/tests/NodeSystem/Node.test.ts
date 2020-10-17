import { ok, strictEqual } from "assert";
import { INodeOptions } from "../../NodeSystem/INodeOptions";
import { Node } from "../../NodeSystem/Node";
import { NodeItem } from "../../NodeSystem/NodeItem";

/**
 * Registers tests for the `Node` class.
 */
export function NodeTests(): void
{
    suite(
        "Node",
        () =>
        {
            /**
             * Represents a node.
             */
            class MyNode extends Node<NodeItem, unknown>
            {
                /**
                 * Initializes a new instance of the `MyNode` class.
                 *
                 * @param options
                 * The options for creationg `NodeItem`s.
                 */
                public constructor(options: INodeOptions<unknown>)
                {
                    super(options, () => new NodeItem(this));
                }
            }

            let nodeAName: string;
            let nodeBName: string;
            let nodeCName: string;

            let nodeA: MyNode;
            let nodeB: MyNode;
            let nodeC: MyNode;

            setup(
                () =>
                {
                    nodeAName = "foo";
                    nodeBName = "bar";
                    nodeCName = "baz";

                    nodeA = new MyNode(
                        {
                            Name: nodeAName
                        });

                    nodeB = new MyNode(
                        {
                            Name: nodeBName
                        });

                    nodeC = new MyNode(
                        {
                            Name: nodeCName
                        });
                });

            suite(
                "FullName",
                () =>
                {
                    test(
                        "Checking whether the `FullName`-property is built correctly…",
                        () =>
                        {
                            nodeA.Parent = nodeB;
                            nodeB.Parent = nodeC;

                            strictEqual(nodeA.FullName, [nodeCName, nodeBName, nodeAName].join("."));
                        });
                });

            suite(
                "Parent",
                () =>
                {
                    test(
                        "Checking whether the `Parent`-property is automatically set properly, when setting the `Parent`-property…",
                        () =>
                        {
                            nodeA.Parent = nodeB;
                            strictEqual(nodeA.Parent, nodeB);
                        });
                    test(
                        "Checking whether the `Parent`-property is automatically set properly, when adding the node to another node's `Nodes`-array…",
                        () =>
                        {
                            nodeA.Parent = nodeB;
                            strictEqual(nodeA.Parent, nodeB);
                        });
                });

            suite(
                "Nodes",
                () =>
                {
                    test(
                        "Checking whether the `Nodes`-property is automatically set properly, when setting the `Parent`-property of another node…",
                        () =>
                        {
                            nodeB.Parent = nodeA;

                            strictEqual(nodeA.Nodes.length, 1);
                            strictEqual(nodeA.Nodes[0], nodeB);
                        });

                    test(
                        "Checking whether the `Nodes`-property is automatically set properly, when adding another node to the `Nodes`-array…",
                        () =>
                        {
                            nodeA.Nodes.push(nodeC);

                            strictEqual(nodeA.Nodes.length, 1);
                            strictEqual(nodeA.Nodes[0], nodeC);
                        });
                });

            suite(
                "GetAllNodes",
                () =>
                {
                    test(
                        "Checking whether `GetAllNodes()` gets all nodes recursively…",
                        () =>
                        {
                            nodeA.Parent = nodeB;
                            nodeB.Parent = nodeC;

                            ok(nodeC.GetAllNodes().includes(nodeA));
                            ok(nodeC.GetAllNodes().includes(nodeB));
                            ok(nodeC.GetAllNodes().includes(nodeC));
                            strictEqual(nodeC.GetAllNodes().length, 3);
                        });
                });

            suite(
                "GetObjects",
                () =>
                {
                    let id: string;
                    let idNode: MyNode;

                    suiteSetup(
                        () =>
                        {
                            id = "Foo";
                            idNode = new MyNode(
                                {
                                    ID: id,
                                    Name: "example"
                                });
                        });

                    test(
                        "Checking whether the node returns itself if an ID is assigned…",
                        () =>
                        {
                            ok(id in idNode.GetObjects());
                            strictEqual(idNode.GetObjects()[id], idNode);
                        });

                    test(
                        "Checking whether nodes with IDs are recognized correctly if they are nested deeply…",
                        () =>
                        {
                            let rootNode = new MyNode(
                                {
                                    Name: "root"
                                });

                            let names = ["foo", "bar", "baz", "this", "is", "a", "test"];
                            let node: MyNode;

                            for (let name of names.reverse())
                            {
                                let child = node;

                                node = new MyNode(
                                    {
                                        Name: name
                                    });

                                if (child)
                                {
                                    node.Nodes.push(child);
                                }
                            }

                            rootNode.Nodes.push(node);

                            let allNodes = rootNode.GetAllNodes();
                            allNodes[Math.floor(Math.random() * allNodes.length)].Nodes.push(idNode);

                            ok(id in rootNode.GetObjects());
                            strictEqual(rootNode.GetObjects()[id], idNode);
                        });
                });
        });
}
