import { ok, strictEqual } from "node:assert";
import { Random } from "random-js";
import { createSandbox, SinonSandbox } from "sinon";
import { Localization } from "../../../../Globalization/Localization.js";
import { ACPOptionInstruction } from "../../../../PackageSystem/Instructions/Options/ACPOptionInstruction.js";
import { OptionInstruction } from "../../../../PackageSystem/Instructions/Options/OptionInstruction.js";

/**
 * Registers tests for the {@link OptionInstruction `OptionInstruction<TCategory, TCategoryOptions, TOption, TOptionOptions>`} class.
 */
export function OptionInstructionTests(): void
{
    suite(
        nameof(OptionInstruction),
        () =>
        {
            let random: Random;
            let sandbox: SinonSandbox;
            let instruction: ACPOptionInstruction;
            let locales: string[];
            let commonCategoryName: string;
            let plainCategoryName: string;
            let localizedCategoryName: string;
            let descriptionCategoryName: string;
            let plainOptionName: string;
            let localizedOptionName: string;
            let descriptionOptionName: string;
            let categoryName: Localization;
            let categoryDescription: Localization;
            let optionName: Localization;
            let optionDescription: Localization;

            suiteSetup(
                () =>
                {
                    random = new Random();
                });

            setup(
                () =>
                {
                    sandbox = createSandbox();
                    categoryName = new Localization();
                    categoryDescription = new Localization();
                    optionName = new Localization();
                    optionDescription = new Localization();
                    locales = ["de", "en", "it", "fr"];
                    commonCategoryName = random.string(5);
                    plainCategoryName = random.string(10);
                    localizedCategoryName = random.string(15);
                    descriptionCategoryName = random.string(20);
                    plainOptionName = random.string(10);
                    localizedOptionName = random.string(15);
                    descriptionOptionName = random.string(20);

                    for (let locale of locales)
                    {
                        categoryName.Data.set(locale, random.string(20));
                        categoryDescription.Data.set(locale, random.string(20));
                        optionName.Data.set(locale, random.string(20));
                        optionDescription.Data.set(locale, random.string(20));
                    }

                    instruction = new ACPOptionInstruction(
                        {
                            FileName: "test.xml",
                            Nodes: [
                                {
                                    Name: plainCategoryName
                                },
                                {
                                    Name: localizedCategoryName,
                                    Item: {
                                        DisplayName: categoryName.ToJSON()
                                    }
                                },
                                {
                                    Name: descriptionCategoryName,
                                    Item: {
                                        Description: categoryDescription.ToJSON()
                                    }
                                },
                                {
                                    Name: commonCategoryName,
                                    Item: {
                                        Options: [
                                            {
                                                Name: plainOptionName
                                            },
                                            {
                                                Name: localizedOptionName,
                                                DisplayName: optionName.ToJSON()
                                            },
                                            {
                                                Name: descriptionOptionName,
                                                Description: optionDescription.ToJSON()
                                            }
                                        ]
                                    }
                                }
                            ]
                        });
                });

            teardown(
                () =>
                {
                    sandbox.restore();
                });

            suite(
                nameof(OptionInstruction.constructor),
                () =>
                {
                    let translationDirectory: string;

                    setup(
                        () =>
                        {
                            translationDirectory = random.string(10);
                        });

                    test(
                        `Checking whether a custom \`${nameof<OptionInstruction<any, any, any, any>>((i) => i.TranslationDirectory)}\` can be specified…`,
                        () =>
                        {
                            strictEqual(
                                new ACPOptionInstruction(
                                    {
                                        FileName: instruction.FileName,
                                        Nodes: [],
                                        TranslationDirectory: translationDirectory
                                    }).TranslationDirectory,
                                translationDirectory);
                        });
                });

            suite(
                nameof<OptionInstruction<any, any, any, any>>((instruction) => instruction.TranslationDirectory),
                () =>
                {
                    test(
                        "Checking whether the translation-directory defaults to the name of the instruction-type…",
                        () =>
                        {
                            strictEqual(instruction.TranslationDirectory, instruction.Type);
                        });
                });

            suite(
                nameof<OptionInstruction<any, any, any, any>>((instruction) => instruction.GetMessages),
                () =>
                {
                    let categorySandbox: SinonSandbox;

                    /**
                     * Gets the full name of the node with the specified {@link nodeName `nodeName`}.
                     *
                     * @param nodeName
                     * The name of the node.
                     *
                     * @returns
                     * The full name of the node with the specified {@link nodeName `nodeName`}.
                     */
                    function fullName(nodeName: string): string
                    {
                        return `${instruction.RootCategory}.${nodeName}`;
                    }

                    /**
                     * Gets the name of the description-node of the node with the specified {@link nodeName `nodeName`}.
                     *
                     * @param nodeName
                     * The name of the node.
                     *
                     * @returns
                     * The name of the description-node of the node with the specified {@link nodeName `nodeName`}.
                     */
                    function description(nodeName: string): string
                    {
                        return `${nodeName}.description`;
                    }

                    setup(
                        () =>
                        {
                            categorySandbox = createSandbox();
                            categorySandbox.replaceGetter(instruction, "OptionCategory", () => null);
                            categorySandbox.replaceGetter(instruction, "CategoryCategory", () => null);
                        });

                    teardown(
                        () =>
                        {
                            categorySandbox.restore();
                        });

                    test(
                        "Checking whether only specified translations are present…",
                        () =>
                        {
                            for (let locale of locales)
                            {
                                let messages = instruction.GetMessages()[locale][instruction.RootCategory];

                                for (
                                    let entry of
                                    [
                                        [plainCategoryName, false, false],
                                        [localizedCategoryName, true, false],
                                        [descriptionCategoryName, false, true]
                                    ] as Array<[string, boolean, boolean]>)
                                {
                                    let name = fullName(entry[0]);

                                    if (entry[1])
                                    {
                                        strictEqual(messages[name], categoryName.Data.get(locale));
                                    }
                                    else
                                    {
                                        ok(!Object.keys(messages).includes(name));
                                    }

                                    if (entry[2])
                                    {
                                        strictEqual(messages[description(name)], categoryDescription.Data.get(locale));
                                    }
                                    else
                                    {
                                        ok(!Object.keys(messages).includes(description(name)));
                                    }
                                }

                                for (
                                    let entry of
                                    [
                                        [plainOptionName, false, false],
                                        [localizedOptionName, true, false],
                                        [descriptionOptionName, false, true]
                                    ] as Array<[string, boolean, boolean]>)
                                {
                                    let name = fullName(entry[0]);

                                    if (entry[1])
                                    {
                                        strictEqual(messages[name], optionName.Data.get(locale));
                                    }
                                    else
                                    {
                                        ok(!Object.keys(messages).includes(name));
                                    }

                                    if (entry[2])
                                    {
                                        strictEqual(messages[description(name)], optionDescription.Data.get(locale));
                                    }
                                    else
                                    {
                                        ok(!Object.keys(messages).includes(description(name)));
                                    }
                                }
                            }
                        });

                    test(
                        "Checking whether the dotted paths of the localization items are generated properly…",
                        () =>
                        {
                            let locale = random.pick(locales);

                            let entries: Array<[keyof OptionInstruction<any, any, any, any>, string, string]> = [
                                ["CategoryCategory", localizedCategoryName, descriptionCategoryName],
                                ["OptionCategory", localizedOptionName, descriptionOptionName]
                            ];

                            for (let entry of entries)
                            {
                                let categoryName: string = null;
                                categorySandbox.restore();

                                /**
                                 * Extracts the important part of the messages.
                                 *
                                 * @returns
                                 * The important part of the messages.
                                 */
                                function messages(): Record<string, string>
                                {
                                    return instruction.GetMessages()[locale][instruction.RootCategory];
                                }

                                for (let otherEntry of entries)
                                {
                                    if (otherEntry[0] !== entry[0])
                                    {
                                        categorySandbox.replaceGetter(instruction, otherEntry[0], () => random.string(10));
                                    }
                                }

                                categorySandbox.replaceGetter(instruction, entry[0], () => categoryName);
                                ok(Object.keys(messages()).includes(fullName(entry[1])));
                                ok(Object.keys(messages()).includes(description(fullName(entry[2]))));

                                categoryName = random.string(15);
                                ok(Object.keys(messages()).includes(fullName(`${categoryName}.${entry[1]}`)));
                                ok(Object.keys(messages()).includes(description(fullName(`${categoryName}.${entry[2]}`))));
                            }
                        });
                });
        });
}
