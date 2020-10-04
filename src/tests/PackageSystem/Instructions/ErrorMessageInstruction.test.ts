import { ok, strictEqual } from "assert";
import { ILocalization } from "../../../Globalization/ILocalization";
import { ErrorMessageInstruction } from "../../../PackageSystem/Instructions/Globalization/ErrorMessageInstruction";

/**
 * Registers tests for the `ErrorMessageInstruction` class.
 */
export function ErrorMessageInstructionTests(): void
{
    suite(
        "ErrorMessageInstruction",
        () =>
        {
            let locale: string;
            let optionCategory = "wcf.acp.option";
            let errorCategory = "error";
            let messageName = "error";
            let messageValue: string;
            let errorMessageInstruction: ErrorMessageInstruction;

            suiteSetup(
                () =>
                {
                    let localization: ILocalization = {};

                    locale = "en";
                    messageValue = "This is an error";
                    localization[locale] = messageValue;

                    errorMessageInstruction = new ErrorMessageInstruction(
                        {
                            FileName: "foo",
                            Nodes: [
                                {
                                    Name: messageName,
                                    Item: {
                                        Translations: localization
                                    }
                                }
                            ]
                        });
                });

            suite(
                "GetMessage()",
                () =>
                {
                    let translations: Record<string, Record<string, Record<string, string>>>;

                    suiteSetup(
                        () =>
                        {
                            translations = errorMessageInstruction.GetMessages();
                        });

                    test(
                        "Checking whether the locale is present…",
                        () =>
                        {
                            ok(locale in translations);
                        });

                    test(
                        `Checking whether the \`${optionCategory}\`-category is present…`,
                        () =>
                        {
                            ok(optionCategory in translations[locale]);
                        });

                    test(
                        `Checking whether the \`${optionCategory}.${errorCategory}.${messageName}\`-message is present…`,
                        () =>
                        {
                            ok(`${optionCategory}.${errorCategory}.${messageName}` in translations[locale][optionCategory]);
                        });

                    test(
                        `Checking whether the \`${optionCategory}.${errorCategory}.${messageName}\`-message has the expected value…`,
                        () =>
                        {
                            strictEqual(translations[locale][optionCategory][`${optionCategory}.${errorCategory}.${messageName}`], messageValue);
                        });
                });
        });
}
