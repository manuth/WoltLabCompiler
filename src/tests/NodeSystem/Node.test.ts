import { ok, strictEqual } from "assert";
import { INodeOptions } from "../../NodeSystem/INodeOptions";
import { Node } from "../../NodeSystem/Node";
import { NodeItem } from "../../NodeSystem/NodeItem";

/**
 * Registers tests for the {@link Node `Node<T, TOptions>`} class.
 */
export function NodeTests(): void
{
    suite(
        nameof(Node),
        () =>
        {
            /**
             * Represents a node.
             */
            class MyNode extends Node<NodeItem, unknown>
            {
                /**
                 * Initializes a new instance of the {@link MyNode `MyNode`} class.
                 *
                 * @param options
                 * The options for creating {@link NodeItem `NodeItem`}s.
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
                nameof<MyNode>((node) => node.FullName),
                () =>
                {
                    test(
                        `Checking whether the \`${nameof<MyNode>((n) => n.FullName)}\`-property is built correctly…`,
                        () =>
                        {
                            nodeA.Parent = nodeB;
                            nodeB.Parent = nodeC;

                            strictEqual(nodeA.FullName, [nodeCName, nodeBName, nodeAName].join("."));
                        });
                });

            suite(
                nameof<MyNode>((node) => node.Parent),
                () =>
                {
                    test(
                        `Checking whether the \`${nameof<MyNode>((n) => n.Parent)}\`-property is automatically set properly, when setting the \`${nameof<MyNode>((n) => n.Parent)}\`-property`,
                        () =>
                        {
                            nodeA.Parent = nodeB;
                            strictEqual(nodeA.Parent, nodeB);
                        });

                    test(
                        `Checking whether the \`${nameof<MyNode>((n) => n.Parent)}\`-property is automatically set properly, when adding the node to another node's \`${nameof<MyNode>((n) => n.Nodes)}\`-array…`,
                        () =>
                        {
                            nodeA.Parent = nodeB;
                            strictEqual(nodeA.Parent, nodeB);
                        });
                });

            suite(
                nameof<MyNode>((node) => node.Nodes),
                () =>
                {
                    test(
                        `Checking whether the \`${nameof<MyNode>((n) => n.Nodes)}\`-property is automatically set properly, when setting the \`${nameof<MyNode>((n) => n.Parent)}\`-property of another node…`,
                        () =>
                        {
                            nodeB.Parent = nodeA;

                            strictEqual(nodeA.Nodes.length, 1);
                            strictEqual(nodeA.Nodes[0], nodeB);
                        });

                    test(
                        `Checking whether nodes can be added to the \`${nameof<MyNode>((n) => n.Nodes)}\`--array properly…`,
                        () =>
                        {
                            nodeA.Nodes.push(nodeC);

                            strictEqual(nodeA.Nodes.length, 1);
                            strictEqual(nodeA.Nodes[0], nodeC);
                        });
                });

            suite(
                nameof<MyNode>((node) => node.GetAllNodes),
                () =>
                {
                    test(
                        `Checking whether \`${nameof<MyNode>((n) => n.GetAllNodes)}\` gets all nodes recursively…`,
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
                nameof<MyNode>((node) => node.GetObjects),
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
                        `Checking whether the node returns itself if an \`${nameof<MyNode>((n) => n.ID)}\` is assigned…`,
                        () =>
                        {
                            ok(id in idNode.GetObjects());
                            strictEqual(idNode.GetObjects()[id], idNode);
                        });

                    test(
                        `Checking whether nodes with \`${nameof<MyNode>((n) => n.ID)}\`s are recognized correctly if they are nested deeply…`,
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
