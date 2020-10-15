import { EventListenerFileCompiler } from "../../../Compilation/Events/EventListenerFileCompiler";
import { EventListener } from "../../../Events/EventListener";
import { EventListenerInstruction } from "../../../PackageSystem/Instructions/Events/EventListenerInstruction";
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
         */
        protected ExecuteTests(): void
        {
            super.ExecuteTests();

            test(
                "Checking the integrity of the metadata…",
                () =>
                {
                    let eventClassTag = "eventclassname";
                    let inheritTag = "inherit";
                    let eventHandlerTag = "listenerclassname";

                    for (let listener of this.Listeners)
                    {
                        for (let listenerNode of this.Tester.ImportEditor.GetChildrenByTag(this.Tester.ListenerTag))
                        {
                            this.AssertTagContent(listenerNode, eventClassTag, listener.ClassName);
                            this.AssertTagContent(listenerNode, inheritTag, listener.AllowInherited ? "1" : "0");
                            this.AssertTagContent(listenerNode, eventHandlerTag, listener.EventHandlerClassName);
                        }
                    }
                });
        }
    }("EventListenerFileCompiler").Register();
}
