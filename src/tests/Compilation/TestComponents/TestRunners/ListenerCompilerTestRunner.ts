import { strictEqual } from "assert";
import { ListenerFileCompiler } from "../../../../Compilation/Events/ListenerFileCompiler";
import { Listener } from "../../../../Events/Listener";
import { IListenerInstruction } from "../../../../PackageSystem/Instructions/Events/IListenerInstruction";
import { ListenerCompilerTester } from "../Testers/ListenerCompilerTester";
import { XMLCompilerTestRunner } from "./XMLCompilerTestRunner";

/**
 * Provides the functionality to register tests for `ListenerFileCompiler`s.
 */
export abstract class ListenerCompilerTestRunner<TTester extends ListenerCompilerTester<TCompiler>, TCompiler extends ListenerFileCompiler<IListenerInstruction<TListener>, TListener>, TListener extends Listener> extends XMLCompilerTestRunner<TTester, TCompiler>
{
    /**
     * Initializes a new instance of the `ListenerCompilerTestRunner` class.
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
    protected abstract get Listeners(): TListener[];

    /**
     * @inheritdoc
     */
    protected ExecuteTests(): void
    {
        super.ExecuteTests();

        test(
            "Checking whether the listeners exist…",
            () =>
            {
                strictEqual(this.Tester.ImportEditor.GetChildrenByTag(this.Tester.ListenerTag).length, this.Listeners.length);
            });
    }
}
