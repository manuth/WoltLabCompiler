import { CollectionTests } from "./Collections/index.js";
import { CompilationTests } from "./Compilation/index.js";
import { CustomizationTests } from "./Customization/index.js";
import { GlobalizationTests } from "./Globalization/index.js";
import { NodeSystemTests } from "./NodeSystem/index.js";
import { OptionTests } from "./Options/index.js";
import { PackageSystemTests } from "./PackageSystem/index.js";
import { SerializationTests } from "./Serialization/index.js";
import { TaskTests } from "./Tasks/index.js";

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
