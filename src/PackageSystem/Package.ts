import { join } from "upath";
import { Component } from "./Component";
import { ConflictingPackageDescriptor } from "./ConflictingPackageDescriptor";
import { FileDescriptor } from "./FileDescriptor";
import { InstructionSet } from "./Instructions/InstructionSet";
import { UpdateInstructionSet } from "./Instructions/UpdateInstructionSet";
import { IPackageOptions } from "./IPackageOptions";
import { OptionalPackageDescriptor } from "./OptionalPackageDescriptor";
import { Person } from "./Person";
import { RequiredPackageDescriptor } from "./RequiredPackageDescriptor";

/**
 * Represents an extension-package.
 */
export class Package extends Component
{
    /**
     * The identifier of the package.
     */
    private identifier: string;

    /**
     * A set of files which will be added to the package.
     */
    private additionalFiles: FileDescriptor[] = [];

    /**
     * A set of packages which are required by this package.
     */
    private requiredPackages: RequiredPackageDescriptor[] = [];

    /**
     * A set of packages which cause a conflict with this package.
     */
    private conflictingPackages: ConflictingPackageDescriptor[] = [];

    /**
     * A set of packages which can be installed additionally.
     */
    private optionalPackages: OptionalPackageDescriptor[] = [];

    /**
     * A set of instructions for installing the package.
     */
    private installSet: InstructionSet = new InstructionSet(this);

    /**
     * A set of instructions to execute when updating from a specific version.
     */
    private updateSets: UpdateInstructionSet[] = [];

    /**
     * Initializes a new instance of the {@link Package `Package`} class.
     *
     * @param options
     * The options of the packge.
     */
    public constructor(options: IPackageOptions)
    {
        super(
            {
                Name: options.Name,
                DisplayName: options.DisplayName,
                Version: options.Version,
                Author: options.Author || new Person(
                    {
                        Name: null
                    }),
                CreationDate: options.CreationDate,
                Description: options.Description,
                License: options.License
            });

        this.Identifier = options.Identifier;

        if (
            (options.AdditionalFiles !== null) &&
            (options.AdditionalFiles !== undefined))
        {
            for (let additionalFile of options.AdditionalFiles)
            {
                this.AdditionalFiles.push(new FileDescriptor(additionalFile));
            }
        }

        if (
            (options.RequiredPackages !== null) &&
            (options.RequiredPackages !== undefined))
        {
            for (let requiredPackage of options.RequiredPackages)
            {
                this.RequiredPackages.push(new RequiredPackageDescriptor(requiredPackage));
            }
        }

        if (
            (options.ConflictingPackages !== null) &&
            (options.ConflictingPackages !== undefined))
        {
            for (let conflictingPackage of options.ConflictingPackages)
            {
                this.ConflictingPackages.push(new ConflictingPackageDescriptor(conflictingPackage));
            }
        }

        if (
            (options.OptionalPackages !== null) &&
            (options.OptionalPackages !== undefined))
        {
            for (let optionalPackage of options.OptionalPackages)
            {
                this.OptionalPackages.push(new OptionalPackageDescriptor(optionalPackage));
            }
        }

        this.InstallSet.push(...options.InstallSet.Instructions);

        if (
            (options.InstallSet.Directory !== null) &&
            (options.InstallSet.Directory !== undefined))
        {
            this.InstallSet.Directory = options.InstallSet.Directory;
        }

        if (
            (options.UpdateSets !== null) &&
            (options.UpdateSets !== undefined))
        {
            for (let updateSet of options.UpdateSets)
            {
                let updateInstructionSet: UpdateInstructionSet = new UpdateInstructionSet(this, updateSet.FromVersion);
                updateInstructionSet.Directory = updateSet.Directory ?? join("update", updateSet.FromVersion);
                updateInstructionSet.push(...updateSet.Instructions);
                this.UpdateSets.push(updateInstructionSet);
            }
        }
    }

    /**
     * Gets or sets the identifier of the package.
     */
    public get Identifier(): string
    {
        return this.identifier;
    }

    /**
     * @inheritdoc
     */
    public set Identifier(value: string)
    {
        this.identifier = value;
    }

    /**
     * Gets a set of files which will be added to the package.
     */
    public get AdditionalFiles(): FileDescriptor[]
    {
        return this.additionalFiles;
    }

    /**
     * Gets a set of packages which are required by this package.
     */
    public get RequiredPackages(): RequiredPackageDescriptor[]
    {
        return this.requiredPackages;
    }

    /**
     * Gets a set of packages which cause a conflict with this package.
     */
    public get ConflictingPackages(): ConflictingPackageDescriptor[]
    {
        return this.conflictingPackages;
    }

    /**
     * Gets a set of packages which can be installed additionally.
     */
    public get OptionalPackages(): OptionalPackageDescriptor[]
    {
        return this.optionalPackages;
    }

    /**
     * Gets a set of instructions for installing the package.
     */
    public get InstallSet(): InstructionSet
    {
        return this.installSet;
    }

    /**
     * Gets a set of instructions to execute when updating from a specific version.
     */
    public get UpdateSets(): UpdateInstructionSet[]
    {
        return this.updateSets;
    }

    /**
     * Looks for an object with the specified id.
     *
     * @param id
     * The id of the object to get.
     *
     * @returns
     * The object with the specified id.
     */
    public GetObjectByID(id: string): any
    {
        for (let instruction of this.InstallSet)
        {
            let objects: Record<string, unknown> = instruction.ObjectsByID;

            if (id in objects)
            {
                return objects[id];
            }
        }
    }
}
