import { basename } from "path";
import { EventListenerFileCompilerTests } from "./EventListenerFileCompiler.test";
import { ListenerFileCompilerTests } from "./ListenerFileCompiler.test";
import { TemplateListenerFileCompilerTests } from "./TemplateListenerFileCompiler.test";

/**
 * Registers tests for events.
 */
export function EventTests(): void
{
    suite(
        basename(__dirname),
        () =>
        {
            ListenerFileCompilerTests();
            EventListenerFileCompilerTests();
            TemplateListenerFileCompilerTests();
        });
}
