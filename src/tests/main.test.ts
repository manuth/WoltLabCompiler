import { CollectionTests } from "./Collections";
import { CompilationTests } from "./Compilation";
import { GlobalizationTests } from "./Globalization";
import { NodeSystemTests } from "./NodeSystem";
import { OptionTests } from "./Options";
import { PackageSystemTests } from "./PackageSystem";
import { SerializationTests } from "./Serialization";
import { TaskTests } from "./Tasks";
import { ThemeTests } from "./Themes";

suite(
    "WoltLabCompiler",
    () =>
    {
        CollectionTests();
        CompilationTests();
        GlobalizationTests();
        NodeSystemTests();
        OptionTests();
        PackageSystemTests();
        SerializationTests();
        TaskTests();
        ThemeTests();
    });
