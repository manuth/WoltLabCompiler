import { strictEqual } from "assert";
import { IOptionOptions } from "../../Options/IOptionOptions";
import { Option } from "../../Options/Option";
import { OptionType } from "../../Options/OptionType";

/**
 * Registers tests for the {@link Option `Option`} class.
 */
export function OptionTests(): void
{
    suite(
        nameof(Option),
        () =>
        {
            let option: Option;

            suiteSetup(
                () =>
                {
                    option = new class extends Option
                    {
                        /**
                         * Initializes a new instance of the class.
                         *
                         * @param options
                         * The options of the configuration-option.
                         */
                        public constructor(options: IOptionOptions)
                        {
                            super(null, options);
                        }
                    }(
                        {
                            Name: "foo"
                        });
                });

            suite(
                nameof<Option>((option) => option.Type),
                () =>
                {
                    test(
                        `Checking whether the option-type can be set to an \`${nameof<OptionType>()}\` correctly…`,
                        () =>
                        {
                            let value = OptionType.TextArea;
                            option.Type = OptionType.TextArea;
                            strictEqual(option.Type, value);
                        });

                    test(
                        `Checking whether the option-type can be set to a \`${nameof(String)}\`…`,
                        () =>
                        {
                            let value = "foo";
                            option.Type = value;
                            strictEqual(option.Type, value);
                        });
                });
        });
}
