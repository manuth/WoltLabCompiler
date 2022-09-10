import { basename } from "node:path";
import { CompilerTests } from "./Compiler.test.js";
import { EventTests } from "./Events/index.test.js";
import { GlobalizationTests } from "./Globalization/index.test.js";
import { ImportFileCompilerTests } from "./ImportFileCompiler.test.js";
import { NamedObjectDeletionFileCompilerTests } from "./NamedObjectDeletionFileCompiler.test.js";
import { ObjectDeletionFileCompilerTests } from "./ObjectDeletionFileCompiler.test.js";
import { OptionTests } from "./Options/index.test.js";
import { PackageSystemTests } from "./PackageSystem/index.test.js";
import { PresentationTests } from "./Presentation/index.test.js";
import { TaskTests } from "./Tasks/index.test.js";
import { WoltLabEJSFileCompilerTests } from "./WoltLabEJSFileCompiler.test.js";
import { WoltLabXMLCompilerTests } from "./WoltLabXMLCompiler.test.js";
import { XMLFileCompilerTests } from "./XMLFileCompiler.test.js";

/**
 * Registers tests for compilation components.
 */
export function CompilationTests(): void
{
    suite(
        basename(new URL(".", import.meta.url).pathname),
        () =>
        {
            CompilerTests();
            XMLFileCompilerTests();
            WoltLabXMLCompilerTests();
            WoltLabEJSFileCompilerTests();
            ImportFileCompilerTests();
            ObjectDeletionFileCompilerTests();
            NamedObjectDeletionFileCompilerTests();
            GlobalizationTests();
            OptionTests();
            TaskTests();
            EventTests();
            PresentationTests();
            PackageSystemTests();
        });
}
