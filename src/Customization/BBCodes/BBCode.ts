import { Localization } from "../../Globalization/Localization";
import { BBCodeAttribute } from "./BBCodeAttribute";
import { IBBCodeOptions } from "./IBBCodeOptions";

/**
 * Represents a bb-code.
 */
export class BBCode
{
    /**
     * The name of the bb-code.
     */
    private name: string;

    /**
     * The human-readable name of the bb-code.
     */
    private displayName: Localization = new Localization();

    /**
     * The name of a font-awesome icon for the bb-code-button.
     */
    private icon: string = null;

    /**
     * The class-name of the bb-code.
     */
    private className: string = null;

    /**
     * The name of the HTML-tag.
     */
    private tagName: string = null;

    /**
     * A value indicating whether the HTML-tag is self-closing.
     */
    private isSelfClosing = false;

    /**
     * A value indicating whether the bb-code is a block-element.
     */
    private isBlockElement = true;

    /**
     * A value indicating whether the content of the bb-code should be parsed.
     */
    private parseContent = false;

    /**
     * The attributes of the bb-code.
     */
    private attributes: BBCodeAttribute[] = [];

    /**
     * Initializes a new instance of the {@link BBCode `BBCode`} class.
     *
     * @param options
     * The options of the bbcode.
     */
    public constructor(options: IBBCodeOptions)
    {
        this.Name = options.Name;

        if (
            (options.DisplayName !== null) &&
            (options.DisplayName !== undefined))
        {
            this.DisplayName.Load(options.DisplayName);
        }

        if (
            (options.Icon !== null) &&
            (options.Icon !== undefined))
        {
            this.Icon = options.Icon;
        }

        if (
            (options.ClassName !== null) &&
            (options.ClassName !== undefined))
        {
            this.ClassName = options.ClassName;
        }

        if (
            (options.TagName !== null) &&
            (options.TagName !== undefined))
        {
            this.TagName = options.TagName;
        }

        if (
            (options.IsSelfClosing !== null) &&
            (options.IsSelfClosing !== undefined))
        {
            this.IsSelfClosing = options.IsSelfClosing;
        }

        if (
            (options.IsBlockElement !== null) &&
            (options.IsBlockElement !== undefined))
        {
            this.IsBlockElement = options.IsBlockElement;
        }

        if (
            (options.ParseContent !== null) &&
            (options.ParseContent !== undefined))
        {
            this.ParseContent = options.ParseContent;
        }

        if (
            (options.Attributes !== null) &&
            (options.Attributes !== undefined))
        {
            for (let attribute of options.Attributes)
            {
                this.Attributes.push(new BBCodeAttribute(attribute));
            }
        }
    }

    /**
     * Gets or sets the name of the bb-code.
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
     * Gets the human-readable name of the bb-code.
     */
    public get DisplayName(): Localization
    {
        return this.displayName;
    }

    /**
     * Gets or sets the name of a font-awesome icon for the bb-code-button.
     */
    public get Icon(): string
    {
        return this.icon;
    }

    /**
     * @inheritdoc
     */
    public set Icon(value: string)
    {
        this.icon = value;
    }

    /**
     * Gets or sets the class-name of the bb-code.
     */
    public get ClassName(): string
    {
        return this.className;
    }

    /**
     * @inheritdoc
     */
    public set ClassName(value: string)
    {
        this.className = value;
    }

    /**
     * Gets or sets the name of the HTML-tag.
     */
    public get TagName(): string
    {
        return this.tagName;
    }

    /**
     * @inheritdoc
     */
    public set TagName(value: string)
    {
        this.tagName = value;
    }

    /**
     * Gets or sets a value indicating whether the HTML-tag is self-closing.
     */
    public get IsSelfClosing(): boolean
    {
        return this.isSelfClosing;
    }

    /**
     * @inheritdoc
     */
    public set IsSelfClosing(value: boolean)
    {
        this.isSelfClosing = value;
    }

    /**
     * Gets or sets a value indicating whether the bb-code is a block-element.
     */
    public get IsBlockElement(): boolean
    {
        return this.isBlockElement;
    }

    /**
     * @inheritdoc
     */
    public set IsBlockElement(value: boolean)
    {
        this.isBlockElement = value;
    }

    /**
     * Gets or sets a value indicating whether the content of the bb-code should be parsed.
     */
    public get ParseContent(): boolean
    {
        return this.parseContent;
    }

    /**
     * @inheritdoc
     */
    public set ParseContent(value: boolean)
    {
        this.parseContent = value;
    }

    /**
     * Gets the attributes of the bb-code.
     */
    public get Attributes(): BBCodeAttribute[]
    {
        return this.attributes;
    }
}
