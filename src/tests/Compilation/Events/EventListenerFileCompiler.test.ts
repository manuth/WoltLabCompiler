import { EventListenerFileCompiler } from "../../../Compilation/Events/EventListenerFileCompiler";
import { EventListener } from "../../../Events/EventListener";
import { EventListenerInstruction } from "../../../PackageSystem/Instructions/Events/EventListenerInstruction";
import { XMLEditor } from "../../../Serialization/XMLEditor";
import { ListenerCompilerTester } from "../TestComponents/Testers/ListenerCompilerTester";
import { ListenerCompilerTestRunner } from "../TestComponents/TestRunners/ListenerCompilerTestRunner";

/**
 * Registers tests for the `EventListenerFileCompiler` class.
 */
export function EventListenerFileCompilerTests(): void
{
    new class extends ListenerCompilerTestRunner<ListenerCompilerTester<EventListenerFileCompiler>, EventListenerFileCompiler, EventListener>
    {
        /**
         * @inheritdoc
         */
        protected get Listeners(): EventListener[]
        {
            return [
                new EventListener(
                    {
                        Name: "test",
                        EventName: "foo",
                        EventHandlerClassName: "wcf\\system\\baz",
                        ClassName: "wcf\\system\\foo\\bar",
                        AllowInherited: Math.random() > 0.5
                    })
            ];
        }

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
                            Listeners: this.Listeners
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
            this.AssertTagContent(listenerNode, "eventclassname", listener.ClassName);
            this.AssertTagContent(listenerNode, "inherit", listener.AllowInherited ? "1" : "0");
            this.AssertTagContent(listenerNode, "listenerclassname", listener.EventHandlerClassName);
        }
    }("EventListenerFileCompiler").Register();
}
