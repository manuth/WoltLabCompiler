import { IBBCodeAttributeOptions } from "./IBBCodeAttributeOptions";

/**
 * Represents an attribute of a bb-code.
 */
export class BBCodeAttribute
{
    /**
     * A value indicating whether the attribute is required.
     */
    private required = false;

    /**
     * A value indicating if the value of the attribute - if not present - should be taken by the content of the bb-code.
     */
    private valueByContent = false;

    /**
     * The code that will be appended to the opening HTML-tag of the bb-code.
     *
     * `%s` will be replaced by the value of the attribute.
     */
    private code: string = null;

    /**
     * A regex-pattern for validating the value of the attribute.
     */
    private validationPattern: RegExp = null;

    /**
     * Initializes a new instance of the `BBCodeAttribute` class.
     *
     * @param options
     * The options of the attribute.
     */
    public constructor(options: IBBCodeAttributeOptions)
    {
        if (options.Required)
        {
            this.required = options.Required;
        }

        if (options.ValueByContent)
        {
            this.valueByContent = options.ValueByContent;
        }

        if (options.Code)
        {
            this.code = options.Code;
        }

        if (options.ValidationPattern)
        {
            this.validationPattern = options.ValidationPattern;
        }
    }

    /**
     * Gets or sets a value indicating whether the attribute is required.
     */
    public get Required(): boolean
    {
        return this.required;
    }

    /**
     * @inheritdoc
     */
    public set Required(value: boolean)
    {
        this.Required = value;
    }

    /**
     * Gets or sets a value indicating if the value of the attribute - if not present - should be taken by the content of the bb-code.
     */
    public get ValueByContent(): boolean
    {
        return this.valueByContent;
    }

    /**
     * @inheritdoc
     */
    public set ValueByContent(value: boolean)
    {
        this.valueByContent = value;
    }

    /**
     * Gets or sets the code that will be appended to the opening HTML-tag of the bb-code.
     *
     * %s will be replaced by the value of the attribute.
     */
    public get Code(): string
    {
        return this.code;
    }

    /**
     * @inheritdoc
     */
    public set Code(value: string)
    {
        this.code = value;
    }

    /**
     * Gets or sets a regex-pattern for validating the value of the attribute.
     */
    public get ValidationPattern(): RegExp
    {
        return this.validationPattern;
    }

    /**
     * @inheritdoc
     */
    public set ValidationPattern(value: RegExp)
    {
        this.validationPattern = value;
    }
}
