import { ListenerFileCompiler } from "../../../../Compilation/Events/ListenerFileCompiler";
import { Listener } from "../../../../Events/Listener";
import { IListenerInstruction } from "../../../../PackageSystem/Instructions/Events/IListenerInstruction";
import { ImportCompilerTester } from "./ImportCompilerTester";

/**
 * Provides the functionality to test a listener-compiler.
 */
export class ListenerCompilerTester<TCompiler extends ListenerFileCompiler<IListenerInstruction<Listener>, Listener>> extends ImportCompilerTester<TCompiler>
{
    /**
     * The name of the tags containing the listeners.
     */
    private listenerTag: string;

    /**
     * Initializes a new instance of the `ListenerCompilerTester` class.
     *
     * @param compiler
     * The compiler to test.
     *
     * @param listenerTag
     * The name of the tags containing the listeners.
     */
    public constructor(compiler: TCompiler, listenerTag: string)
    {
        super(compiler);
        this.listenerTag = listenerTag;
    }

    /**
     * Gets the name of the tags containing the listeners.
     */
    public get ListenerTag(): string
    {
        return this.listenerTag;
    }
}
