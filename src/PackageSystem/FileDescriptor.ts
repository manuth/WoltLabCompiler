import path from "upath";
import { IFileDescriptorOptions } from "./IFileDescriptorOptions.js";

const { basename, isAbsolute, normalize, resolve, sep } = path;

/**
 * Provides a description of a file.
 */
export class FileDescriptor
{
    /**
     * The path to load the file from.
     */
    private source: string;

    /**
     * The filename to save the file to.
     */
    private fileName: string;

    /**
     * Initializes a new instance of the {@link FileDescriptor `FileDescriptor`} class.
     *
     * @param options
     * The options of the file-descriptor.
     */
    public constructor(options: IFileDescriptorOptions)
    {
        this.Source = resolve(options.Source);

        if (
            (options.FileName !== null) &&
            (options.FileName !== undefined))
        {
            this.FileName = options.FileName;
        }
        else
        {
            let fileName: string = normalize(options.Source);

            if (
                isAbsolute(fileName) ||
                (normalize(fileName).split(sep)[0] === ".."))
            {
                this.FileName = basename(fileName);
            }
            else
            {
                this.FileName = fileName;
            }
        }
    }

    /**
     * Gets or sets the path to load the file from.
     */
    public get Source(): string
    {
        return this.source;
    }

    /**
     * @inheritdoc
     */
    public set Source(value: string)
    {
        this.source = value;
    }

    /**
     * Gets ort sets the filename to save the file to.
     */
    public get FileName(): string
    {
        return this.fileName;
    }

    /**
     * @inheritdoc
     */
    public set FileName(value: string)
    {
        this.fileName = value;
    }
}
