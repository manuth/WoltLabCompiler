import { ImageDirectoryDescriptorTests } from "./ImageDirectoryDescriptor.test";
import { SassVariableParserTests } from "./SassVariableParser.test";
import { ThemeTests as ThemeClassTests } from "./Theme.test";
import { ThemeInstructionCollectionTests } from "./ThemeInstructionCollection.test";

/**
 * Registers tests for theme components.
 */
export function ThemeTests(): void
{
    suite(
        "Themes",
        () =>
        {
            SassVariableParserTests();
            ImageDirectoryDescriptorTests();
            ThemeClassTests();
            ThemeInstructionCollectionTests();
        });
}
