import { CollectionTests } from "./Collections";
import { CompilationTests } from "./Compilation";
import { CustomizationTests } from "./Customization";
import { GlobalizationTests } from "./Globalization";
import { NodeSystemTests } from "./NodeSystem";
import { OptionTests } from "./Options";
import { PackageSystemTests } from "./PackageSystem";
import { SerializationTests } from "./Serialization";
import { TaskTests } from "./Tasks";

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
        CustomizationTests();
    });
