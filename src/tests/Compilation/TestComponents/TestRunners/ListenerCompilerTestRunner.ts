import { AssertionError, ok, strictEqual } from "node:assert";
import { ListenerFileCompiler } from "../../../../Compilation/Events/ListenerFileCompiler.js";
import { Listener } from "../../../../Events/Listener.js";
import { IListenerInstruction } from "../../../../PackageSystem/Instructions/Events/IListenerInstruction.js";
import { XMLEditor } from "../../../../Serialization/XMLEditor.js";
import { ListenerCompilerTester } from "../Testers/ListenerCompilerTester.js";
import { XMLCompilerTestRunner } from "./XMLCompilerTestRunner.js";

/**
 * Provides the functionality to register tests for {@link ListenerFileCompiler `ListenerFileCompiler<T, TListener>`}s.
 *
 * @template TTester
 * The type of the compiler-tester.
 *
 * @template TCompiler
 * The type of the compiler.
 *
 * @template TListener
 * The type of the listeners provided by the instruction.
 */
export abstract class ListenerCompilerTestRunner<TTester extends ListenerCompilerTester<TCompiler>, TCompiler extends ListenerFileCompiler<IListenerInstruction<TListener>, TListener>, TListener extends Listener> extends XMLCompilerTestRunner<TTester, TCompiler>
{
    /**
     * Initializes a new instance of the {@link ListenerCompilerTestRunner `ListenerCompilerTestRunner<TTester, TCompiler, TListener>`} class.
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
