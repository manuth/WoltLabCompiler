import { strictEqual } from "node:assert";
import { ListenerFileCompiler } from "../../../Compilation/Events/ListenerFileCompiler.js";
import { IListenerOptions } from "../../../Events/IListenerOptions.js";
import { Listener } from "../../../Events/Listener.js";
import { ListenerEnvironment } from "../../../Events/ListenerEnvironment.js";
import { IListenerInstructionOptions } from "../../../PackageSystem/Instructions/Events/IListenerInstructionOptions.js";
import { ListenerInstruction } from "../../../PackageSystem/Instructions/Events/ListenerInstruction.js";
import { XMLEditor } from "../../../Serialization/XMLEditor.js";
import { ListenerCompilerTester } from "../TestComponents/Testers/ListenerCompilerTester.js";
import { ListenerCompilerTestRunner } from "../TestComponents/TestRunners/ListenerCompilerTestRunner.js";

/**
 * Registers tests for the {@link ListenerFileCompiler `ListenerFileCompiler<T, TListener>`} class.
 */
export function ListenerFileCompilerTests(): void
{
    let listenerTag: string;

    /**
     * Represents an instruction which provides listeners.
     */
    class MyListenerInstruction extends ListenerInstruction<Listener, IListenerOptions>
    {
        /**
         * Initializes a new instance of the {@link MyListenerInstruction `MyListenerInstruction`} class.
         *
         * @param options
         * The options for the initialization.
         */
        public constructor(options: IListenerInstructionOptions<IListenerOptions>)
        {
            super(
                options,
                (opts: IListenerOptions) =>
                {
                    return new class extends Listener
                    {
                    }(opts);
                });
        }

        /**
         * @inheritdoc
         */
        public get Type(): string
        {
            return "baz";
        }
    }

    new class extends ListenerCompilerTestRunner<ListenerCompilerTester<ListenerFileCompiler<MyListenerInstruction, Listener>>, ListenerFileCompiler<MyListenerInstruction, Listener>, Listener>
    {
        /**
         * @inheritdoc
         */
        protected override get Listeners(): Listener[]
        {
            return this.Compiler.Item.Listeners;
        }

        /**
         * @inheritdoc
         *
         * @returns
         * The new compiler-tester instance.
         */
        protected CreateTester(): ListenerCompilerTester<ListenerFileCompiler<MyListenerInstruction, Listener>>
        {
            return new ListenerCompilerTester(
                new class extends ListenerFileCompiler<MyListenerInstruction, Listener>
                {
                    /**
                     * @inheritdoc
                     */
                    protected get ObjectTagName(): string
                    {
                        return listenerTag;
                    }

                    /**
                     * @inheritdoc
                     */
                    protected get SchemaLocation(): string
                    {
                        return "";
                    }
                }(
                    new MyListenerInstruction(
                        {
                            FileName: null,
                            Listeners: [
                                {
                                    Name: "test",
                                    Environment: (Math.random() > 0.5) ? ListenerEnvironment.FrontEnd : ListenerEnvironment.BackEnd,
                                    EventName: "exampleEvent",
                                    ExecutionOrder: Math.floor(Math.random() * 100),
                                    Permissions: [
                                        "foo",
                                        "bar",
                                        "baz"
                                    ],
                                    Options: [
                                        "this",
                                        "is",
                                        "a",
                                        "test"
                                    ]
                                }
                            ]
                        })),
                listenerTag);
        }

        /**
         * @inheritdoc
         */
        protected override async SuiteSetup(): Promise<void>
        {
            listenerTag = "myListener";
            return super.SuiteSetup();
        }

        /**
         * @inheritdoc
         *
         * @param listenerNode
         * The listener-node to check.
         *
         * @param listener
         * The listener to check.
         */
        protected AssertListenerMetadata(listenerNode: XMLEditor, listener: Listener): void
        {
            strictEqual(listenerNode.GetAttribute("name"), listener.Name);
            this.AssertTagContent(listenerNode, "environment", listener.Environment);
            this.AssertTagContent(listenerNode, "eventname", listener.EventName);
            this.AssertTagContent(listenerNode, "nice", listener.ExecutionOrder.toString());

            listener.Permissions.every(
                (permission) =>
                {
                    this.GetText(listenerNode, "permissions").split(",").includes(permission);
                });

            listener.Options.every(
                (option) =>
                {
                    this.GetText(listenerNode, "options").split(",").includes(option);
                });
        }
    }(nameof(ListenerFileCompiler)).Register();
}
