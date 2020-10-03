import Assert = require("assert");
import { IOptionOptions } from "../../Options/IOptionOptions";
import { Option } from "../../Options/Option";
import { OptionType } from "../../Options/OptionType";

/**
 * Registers tests for the `Option` class.
 */
export function OptionTests(): void
{
    suite(
        "Option",
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
                "Type",
                () =>
                {
                    test(
                        "Checking whether the option-type can be set to an `OptionType` correctly…",
                        () =>
                        {
                            let value = OptionType.TextArea;
                            option.Type = OptionType.TextArea;
                            Assert.strictEqual(option.Type, value);
                        });

                    test(
                        "Checking whether the option-type can be set to a string…",
                        () =>
                        {
                            let value = "foo";
                            option.Type = value;
                            Assert.strictEqual(option.Type, value);
                        });
                });
        });
}
