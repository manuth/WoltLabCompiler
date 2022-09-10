import { ok, strictEqual } from "node:assert";
import { INodeOptions } from "../../../../NodeSystem/INodeOptions.js";
import { Node } from "../../../../NodeSystem/Node.js";
import { NodeItem } from "../../../../NodeSystem/NodeItem.js";
import { INodeSystemInstructionOptions } from "../../../../PackageSystem/Instructions/NodeSystem/INodeSystemInstructionOptions.js";
import { NodeSystemInstruction } from "../../../../PackageSystem/Instructions/NodeSystem/NodeSystemInstruction.js";

/**
 * Registers tests for the {@link NodeSystemInstruction `NodeSystemInstruction<T, TOptions>`} class.
 */
export function NodeSystemInstructionTests(): void
{
    suite(
        nameof(NodeSystemInstruction),
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
                 * The options of the node.
                 */
                public constructor(options: INodeOptions<unknown>)
                {
                    super(options, (node) => new NodeItem(node));
                }
            }

            /**
             * Represents an instruction which provides {@link MyNode `MyNode`}s.
             */
            class MyNodeInstruction extends NodeSystemInstruction<NodeItem, unknown>
            {
                /**
                 * @inheritdoc
                 */
                public Type: string;

                /**
                 * Initializes a new instance of the {@link MyNodeInstruction `MyNodeInstruction`} class.
                 *
                 * @param options
                 * The options of the node.
                 */
                public constructor(options: INodeSystemInstructionOptions<unknown>)
                {
                    super(options, (node) => new NodeItem(node));
                }
            }

            let id: string;
            let idNode: MyNode;
            let instruction: MyNodeInstruction;

            setup(
                () =>
                {
                    id = "Foo";

                    idNode = new MyNode(
                        {
                            ID: id,
                            Name: "bar"
                        });

                    let names = ["this", "is", "a", "test"];
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

                    let allNodes = node.GetAllNodes();
                    allNodes[Math.floor(Math.random() * allNodes.length)].Nodes.push(idNode);

                    instruction = new MyNodeInstruction(
                        {
                            FileName: "test.xml",
                            Nodes: []
                        });

                    instruction.Nodes.push(node);
                });

            suite(
                nameof<NodeSystemInstruction<any, any>>((instruction) => instruction.ObjectsByID),
                () =>
                {
                    test(
                        `Checking whether \`${nameof<MyNode>((n) => n.ID)}\`s of the objects are queried correctly…`,
                        () =>
                        {
                            ok(id in instruction.ObjectsByID);
                        });

                    test(
                        `Checking whether the objects are assigned to their \`${nameof<MyNode>((n) => n.ID)}\`s correctly…`,
                        () =>
                        {
                            strictEqual(instruction.ObjectsByID[id], idNode);
                        });
                });
        });
}
