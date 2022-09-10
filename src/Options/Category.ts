import { Localization } from "../Globalization/Localization.js";
import { INode } from "../NodeSystem/INode.js";
import { NodeItem } from "../NodeSystem/NodeItem.js";
import { ICategory } from "./Generic/ICategory.js";
import { ICategoryOptions } from "./ICategoryOptions.js";
import { Option } from "./Option.js";

/**
 * Represents an option-category.
 *
 * @template TOption
 * The type of the options.
 *
 * @template TOptionOptions
 * The type of the data for generating options.
 */
export class Category<TOption extends Option, TOptionOptions> extends NodeItem implements ICategory<TOption>
{
    /**
     * The human-readable name of the category.
     */
    private displayName: Localization = new Localization();

    /**
     * The description of the category.
     */
    private description: Localization = new Localization();

    /**
     * A value for ordering the category.
     */
    private showOrder: number = null;

    /**
     * The options of which at least one needs to be enabled for the category to be shown to the user.
     */
    private enableOptions: string[] = [];

    /**
     * The options of the category.
     */
    private options: TOption[] = [];

    /**
     * Initializes a new instance of the {@link Category `Category<TOption, TOptionOptions>`} class.
     *
     * @param node
     * The node of the category.
     *
     * @param options
     * The options of the category.
     *
     * @param generator
     * A function for generating options.
     */
    public constructor(node: INode, options: ICategoryOptions<TOptionOptions>, generator: (category: Category<TOption, TOptionOptions>, optionOptions: TOptionOptions) => TOption)
    {
        super(node);

        if (
            (options.DisplayName !== null) &&
            (options.DisplayName !== undefined))
        {
            this.DisplayName.Load(options.DisplayName);
        }

        if (
            (options.Description !== null) &&
            (options.Description !== undefined))
        {
            this.Description.Load(options.Description);
        }

        if (
            (options.ShowOrder !== null) &&
            (options.ShowOrder !== undefined))
        {
            this.ShowOrder = options.ShowOrder;
        }

        if (
            (options.Options !== null) &&
            (options.Options !== undefined))
        {
            for (let option of options.Options)
            {
                this.options.push(generator(this, option));
            }
        }

        if (
            (options.EnableOptions !== null) &&
            (options.EnableOptions !== undefined))
        {
            this.EnableOptions.push(...options.EnableOptions);
        }
    }

    /**
     * @inheritdoc
     */
    public get DisplayName(): Localization
    {
        return this.displayName;
    }

    /**
     * @inheritdoc
     */
    public get Description(): Localization
    {
        return this.description;
    }

    /**
     * @inheritdoc
     */
    public get ShowOrder(): number
    {
        return this.showOrder;
    }

    /**
     * @inheritdoc
     */
    public set ShowOrder(value: number)
    {
        this.showOrder = value;
    }

    /**
     * @inheritdoc
     */
    public get EnableOptions(): string[]
    {
        return this.enableOptions;
    }

    /**
     * @inheritdoc
     */
    public set EnableOptions(value: string[])
    {
        this.enableOptions = value;
    }

    /**
     * @inheritdoc
     */
    public get Options(): readonly TOption[]
    {
        return this.options;
    }

    /**
     * @inheritdoc
     *
     * @returns
     * The objects of the node.
     */
    public override GetObjects(): Record<string, unknown>
    {
        let result: Record<string, unknown> = {};

        for (let option of this.Options)
        {
            if (option.ID)
            {
                result[option.ID] = option;
            }
        }

        return result;
    }
}
