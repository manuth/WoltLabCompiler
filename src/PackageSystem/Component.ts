import { Localization } from "../Globalization/Localization";
import { IComponentOptions } from "./IComponentOptions";
import { Person } from "./Person";

/**
 * Represents a component.
 */
export abstract class Component
{
    /**
     * The name of the package.
     */
    private name: string;

    /**
     * The human-readable name of the component.
     */
    private displayName: Localization = new Localization();

    /**
     * The version of the component.
     */
    private version: string;

    /**
     * The author of the component.
     */
    private author: Person = null;

    /**
     * The creation-date of the component.
     */
    private creationDate: Date = new Date();

    /**
     * The description of the component.
     */
    private description: Localization = new Localization();

    /**
     * The license of the component.
     */
    private license: string = null;

    /**
     * Initializes a new instance of the `Component` class.
     *
     * @param options
     * The options of the component.
     */
    public constructor(options: IComponentOptions)
    {
        this.Name = options.Name;
        this.DisplayName.Load(options.DisplayName);
        this.Version = options.Version;

        if (
            (options.Author !== null) &&
            (options.Author !== undefined))
        {
            this.author = new Person(options.Author);
        }

        if (
            (options.CreationDate !== null) &&
            (options.CreationDate !== undefined))
        {
            this.CreationDate = options.CreationDate;
        }

        if (
            (options.Description !== null) &&
            (options.Description !== undefined))
        {
            this.Description.Load(options.Description);
        }

        if (
            (options.License !== null) &&
            (options.License !== undefined))
        {
            this.License = options.License;
        }
    }

    /**
     * Gets or sets the name of the package.
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
     * Gets the human-readable name of the component.
     */
    public get DisplayName(): Localization
    {
        return this.displayName;
    }

    /**
     * Gets or sets the version of the component.
     */
    public get Version(): string
    {
        return this.version;
    }

    /**
     * @inheritdoc
     */
    public set Version(value: string)
    {
        this.version = value;
    }

    /**
     * Gets or sets the author of the component.
     */
    public get Author(): Person
    {
        return this.author;
    }

    /**
     * Gets or sets the creation-date of the component.
     */
    public get CreationDate(): Date
    {
        return this.creationDate;
    }

    /**
     * @inheritdoc
     */
    public set CreationDate(value: Date)
    {
        this.creationDate = value;
    }

    /**
     * Gets the description of the component.
     */
    public get Description(): Localization
    {
        return this.description;
    }

    /**
     * Gets or sets the license of the component.
     */
    public get License(): string
    {
        return this.license;
    }

    /**
     * @inheritdoc
     */
    public set License(value: string)
    {
        this.license = value;
    }
}
