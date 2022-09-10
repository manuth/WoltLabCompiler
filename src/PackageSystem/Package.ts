import path from "upath";
import { Component } from "./Component.js";
import { ConflictingPackageDescriptor } from "./ConflictingPackageDescriptor.js";
import { FileDescriptor } from "./FileDescriptor.js";
import { InstructionSet } from "./Instructions/InstructionSet.js";
import { UpdateInstructionSet } from "./Instructions/UpdateInstructionSet.js";
import { IPackageOptions } from "./IPackageOptions.js";
import { OptionalPackageDescriptor } from "./OptionalPackageDescriptor.js";
import { Person } from "./Person.js";
import { RequiredPackageDescriptor } from "./RequiredPackageDescriptor.js";

const { join } = path;

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
     * The API-version of the package.
     *
     * @deprecated
     */
    private apiVersion: string;

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
     * The options of the package.
     */
    public constructor(options: IPackageOptions)
    {
        super(
            {
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
        // eslint-disable-next-line @delagen/deprecation/deprecation
        this.apiVersion = options.APIVersion ?? null;

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
     * Gets or sets the API-Version required by the package.
     *
     * @deprecated
     */
    public get APIVersion(): string
    {
        // eslint-disable-next-line @delagen/deprecation/deprecation
        return this.apiVersion;
    }

    /**
     * @inheritdoc
     * @deprecated
     */
    public set APIVersion(value: string)
    {
        // eslint-disable-next-line @delagen/deprecation/deprecation
        this.apiVersion = value;
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
