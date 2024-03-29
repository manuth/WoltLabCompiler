// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { Listener } from "./Listener.js";
import { ListenerEnvironment } from "./ListenerEnvironment.js";

/**
 * Provides options for the {@link Listener `Listener`} class.
 */
export interface IListenerOptions
{
    /**
     * The name of the listener.
     */
    Name: string;

    /**
     * The environment to install the listener to.
     */
    Environment?: ListenerEnvironment;

    /**
     * The name of the event to listen to.
     */
    EventName: string;

    /**
     * A number indicating the execution order of the event-listener.
     */
    ExecutionOrder?: number;

    /**
     * The permissions of which the active user must have at least one in order to execute the listener.
     */
    Permissions?: string[];

    /**
     * The options of which at least one must be enabled in order to execute the listener.
     */
    Options?: string[];
}
