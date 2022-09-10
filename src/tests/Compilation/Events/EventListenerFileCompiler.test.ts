import { ok } from "node:assert";
import { EventListenerFileCompiler } from "../../../Compilation/Events/EventListenerFileCompiler.js";
import { EventListener } from "../../../Events/EventListener.js";
import { EventListenerInstruction } from "../../../PackageSystem/Instructions/Events/EventListenerInstruction.js";
import { XMLEditor } from "../../../Serialization/XMLEditor.js";
import { ListenerCompilerTester } from "../TestComponents/Testers/ListenerCompilerTester.js";
import { ListenerCompilerTestRunner } from "../TestComponents/TestRunners/ListenerCompilerTestRunner.js";

/**
 * Registers tests for the {@link EventListenerFileCompiler `EventListenerFileCompiler`} class.
 */
export function EventListenerFileCompilerTests(): void
{
    new class extends ListenerCompilerTestRunner<ListenerCompilerTester<EventListenerFileCompiler>, EventListenerFileCompiler, EventListener>
    {
        /**
         * @inheritdoc
         *
         * @returns
         * The new compiler-tester instance.
         */
        protected CreateTester(): ListenerCompilerTester<EventListenerFileCompiler>
        {
            return new ListenerCompilerTester(
                new EventListenerFileCompiler(
                    new EventListenerInstruction(
                        {
                            FileName: null,
                            Listeners: [
                                {
                                    Name: "test",
                                    EventName: "foo",
                                    EventHandlerClassName: "wcf\\system\\baz",
                                    ClassName: "wcf\\system\\foo\\bar",
                                    AllowInherited: Math.random() > 0.5
                                }
                            ]
                        })),
                "eventlistener");
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
        protected AssertListenerMetadata(listenerNode: XMLEditor, listener: EventListener): void
        {
            ok(listenerNode.GetAttribute("name") === listener.Name);
            this.AssertTagContent(listenerNode, "eventclassname", listener.ClassName);
            this.AssertTagContent(listenerNode, "inherit", listener.AllowInherited ? "1" : "0");
            this.AssertTagContent(listenerNode, "listenerclassname", listener.EventHandlerClassName);
        }
    }(nameof(EventListenerFileCompiler)).Register();
}
