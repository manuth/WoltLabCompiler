import { basename } from "path";
import { ImageDirectoryDescriptorTests } from "./ImageDirectoryDescriptor.test";
import { SassVariableParserTests } from "./SassVariableParser.test";
import { ThemeTests as ThemeClassTests } from "./Theme.test";
import { ThemeLoaderTests } from "./ThemeLoader.test";

/**
 * Registers tests for theme components.
 */
export function ThemeTests(): void
{
    suite(
        basename(__dirname),
        () =>
        {
            SassVariableParserTests();
            ImageDirectoryDescriptorTests();
            ThemeLoaderTests();
            ThemeClassTests();
        });
}
