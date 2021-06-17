import { AssertionError, ok, strictEqual } from "assert";
import { ListenerFileCompiler } from "../../../../Compilation/Events/ListenerFileCompiler";
import { Listener } from "../../../../Events/Listener";
import { IListenerInstruction } from "../../../../PackageSystem/Instructions/Events/IListenerInstruction";
import { XMLEditor } from "../../../../Serialization/XMLEditor";
import { ListenerCompilerTester } from "../Testers/ListenerCompilerTester";
import { XMLCompilerTestRunner } from "./XMLCompilerTestRunner";

/**
 * Provides the functionality to register tests for `ListenerFileCompiler`s.
 */
export abstract class ListenerCompilerTestRunner<TTester extends ListenerCompilerTester<TCompiler>, TCompiler extends ListenerFileCompiler<IListenerInstruction<TListener>, TListener>, TListener extends Listener> extends XMLCompilerTestRunner<TTester, TCompiler>
{
    /**
     * Initializes a new instance of the {@link ListenerCompilerTestRunner `ListenerCompilerTestRunner<TTester, TCompiler>`} class.
     *
     * @param title
     * The title of the suite.
     */
    public constructor(title: string)
    {
        super(title);
    }

    /**
     * Gets the listeners to test.
     */
    protected get Listeners(): TListener[]
    {
        return this.Compiler.Item.Listeners;
    }

    /**
     * @inheritdoc
     */
    protected override ExecuteTests(): void
    {
        super.ExecuteTests();

        test(
            "Checking whether the listeners exist…",
            () =>
            {
                strictEqual(this.Tester.ImportEditor.GetChildrenByTag(this.Tester.ListenerTag).length, this.Listeners.length);
            });

        test(
            "Checking the integrity of the metadata…",
            () =>
            {
                for (let listener of this.Listeners)
                {
                    ok(
                        this.Tester.ImportEditor.GetChildrenByTag(this.Tester.ListenerTag).some(
                            (listenerNode) =>
                            {
                                try
                                {
                                    this.AssertListenerMetadata(listenerNode, listener);
                                    return true;
                                }
                                catch (error)
                                {
                                    if (error instanceof AssertionError)
                                    {
                                        return false;
                                    }
                                    else
                                    {
                                        throw error;
                                    }
                                }
                            }));
                }
            });
    }

    /**
     * Asserts the content of a listener-node.
     *
     * @param listenerNode
     * The listener-node to check.
     *
     * @param listener
     * The listener to check.
     */
    protected abstract AssertListenerMetadata(listenerNode: XMLEditor, listener: TListener): void;
}
