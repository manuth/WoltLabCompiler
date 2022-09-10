// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Person } from "./Person.js";

/**
 * Provides options for the {@link Person `Person`} class.
 */
export interface IPersonOptions
{
    /**
     * The name of the person.
     */
    Name: string;

    /**
     * The url to the homepage of the person.
     */
    URL?: string;
}
