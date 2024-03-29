import { ok, strictEqual } from "node:assert";
import { ILocalization } from "../../../../Globalization/ILocalization.js";
import { ErrorMessageInstruction } from "../../../../PackageSystem/Instructions/Globalization/ErrorMessageInstruction.js";

/**
 * Registers tests for the {@link ErrorMessageInstruction `ErrorMessageInstruction`} class.
 */
export function ErrorMessageInstructionTests(): void
{
    suite(
        nameof(ErrorMessageInstruction),
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
                    locale = "en";
                    messageValue = "This is an error";
                });

            setup(
                () =>
                {
                    let localization: ILocalization = {};
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
                nameof<ErrorMessageInstruction>((instruction) => instruction.GetMessages),
                () =>
                {
                    let translations: Record<string, Record<string, Record<string, string>>>;

                    setup(
                        () =>
                        {
                            translations = errorMessageInstruction.GetMessages();
                        });

                    test(
                        "Checking whether the expected locales are present…",
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
