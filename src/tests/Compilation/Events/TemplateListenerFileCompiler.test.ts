import { TemplateListenerFileCompiler } from "../../../Compilation/Events/TemplateListenerFileCompiler.js";
import { TemplateListener } from "../../../Customization/Presentation/TemplateListener.js";
import { TemplateListenerInstruction } from "../../../PackageSystem/Instructions/Events/TemplateListenerInstruction.js";
import { XMLEditor } from "../../../Serialization/XMLEditor.js";
import { ListenerCompilerTester } from "../TestComponents/Testers/ListenerCompilerTester.js";
import { ListenerCompilerTestRunner } from "../TestComponents/TestRunners/ListenerCompilerTestRunner.js";

/**
 * Registers tests for the {@link TemplateListenerFileCompiler `TemplateListenerFileCompiler`} class.
 */
export function TemplateListenerFileCompilerTests(): void
{
    new class extends ListenerCompilerTestRunner<ListenerCompilerTester<TemplateListenerFileCompiler>, TemplateListenerFileCompiler, TemplateListener>
    {
        /**
         * @inheritdoc
         *
         * @returns
         * The new compiler-tester instance.
         */
        protected CreateTester(): ListenerCompilerTester<TemplateListenerFileCompiler>
        {
            return new ListenerCompilerTester(
                new TemplateListenerFileCompiler(
                    new TemplateListenerInstruction(
                        {
                            FileName: null,
                            Listeners: [
                                {
                                    Name: "test",
                                    EventName: "foo",
                                    TemplateName: "fooTemplate",
                                    Code: "{include file='__myFooScript'}"
                                }
                            ]
                        })),
                "templatelistener");
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
        protected AssertListenerMetadata(listenerNode: XMLEditor, listener: TemplateListener): void
        {
            this.AssertTagContent(listenerNode, "templatename", listener.TemplateName);
            this.AssertTagContent(listenerNode, "code", listener.Code);
        }
    }(nameof(TemplateListenerFileCompiler)).Register();
}
