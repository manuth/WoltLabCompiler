import { IPersonOptions } from "./IPersonOptions.js";

/**
 * Represents a person.
 */
export class Person
{
    /**
     * The name of the person.
     */
    private name: string;

    /**
     * The url to the homepage of the person.
     */
    private url: string = null;

    /**
     * Initializes a new instance of the {@link Person `Person`} class.
     *
     * @param options
     * The options of the person.
     */
    public constructor(options: IPersonOptions)
    {
        this.Name = options.Name;

        if (
            (options.URL !== null) &&
            (options.URL !== undefined))
        {
            this.URL = options.URL;
        }
    }

    /**
     * Gets or sets the name of the person.
     */
    public get Name(): string
    {
        return this.name;
    }

    /**
     * @inheritdoc
     */
    public set Name(value: string)
    {
        this.name = value;
    }

    /**
     * Gets or sets the url to the homepage of the person.
     */
    public get URL(): string
    {
        return this.url;
    }

    /**
     * @inheritdoc
     */
    public set URL(value: string)
    {
        this.url = value;
    }
}
