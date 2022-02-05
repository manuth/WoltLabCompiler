import { basename } from "path";
import { CompilerTests } from "./Compiler.test";
import { EventTests } from "./Events";
import { GlobalizationTests } from "./Globalization";
import { ImportFileCompilerTests } from "./ImportFileCompiler.test";
import { NamedObjectDeletionFileCompilerTests } from "./NamedObjectDeletionFileCompiler.test";
import { ObjectDeletionFileCompilerTests } from "./ObjectDeletionFileCompiler.test";
import { OptionTests } from "./Options";
import { PackageSystemTests } from "./PackageSystem";
import { PresentationTests } from "./Presentation";
import { TaskTests } from "./Tasks";
import { WoltLabEJSFileCompilerTests } from "./WoltLabEJSFileCompiler.test";
import { WoltLabXMLCompilerTests } from "./WoltLabXMLCompiler.test";
import { XMLFileCompilerTests } from "./XMLFileCompiler.test";

/**
 * Registers tests for compilation components.
 */
export function CompilationTests(): void
{
    suite(
        basename(__dirname),
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
