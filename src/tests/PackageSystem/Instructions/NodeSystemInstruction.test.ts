import Assert = require("assert");
import { INodeOptions } from "../../../NodeSystem/INodeOptions";
import { Node } from "../../../NodeSystem/Node";
import { NodeItem } from "../../../NodeSystem/NodeItem";
import { INodeSystemInstructionOptions } from "../../../PackageSystem/Instructions/NodeSystem/INodeSystemInstructionOptions";
import { NodeSystemInstruction } from "../../../PackageSystem/Instructions/NodeSystem/NodeSystemInstruction";

suite(
    "NodeSystemInstruction",
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
             * The options of the node.
             */
            public constructor(options: INodeOptions<unknown>)
            {
                super(options, (node) => new NodeItem(node));
            }
        }

        /**
         * Represents an instruction which provides `MyNode`s.
         */
        class MyNodeInstruction extends NodeSystemInstruction<NodeItem, unknown>
        {
            /**
             * @inheritdoc
             */
            public Type: string;

            /**
             * Initializes a new instance of the `MyNodeInstruction` class.
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

        suiteSetup(
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
            "ObjectsByID",
            () =>
            {
                test(
                    "Checking whether object-ids are queried correctly…",
                    () =>
                    {
                        Assert.strictEqual(id in instruction.ObjectsByID, true);
                    });

                test(
                    "Checking whether the objects are assigned to the ids correctly…",
                    () =>
                    {
                        Assert.strictEqual(instruction.ObjectsByID[id], idNode);
                    });
            });
    });
