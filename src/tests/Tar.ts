import { FileOptions, list, ListOptions } from "tar";

/**
 * Provides a context for testing the package.
 */
export class Tar
{
    /**
     * Lists the content of a tar-archive.
     *
     * @param options
     * The options for listing the files inside the tar-archive.
     *
     * @returns
     * The file-names of the files inside the tar-archive.
     */
    public static async ListTarFiles(options: ListOptions & FileOptions): Promise<string[]>
    {
        let result: string[] = [];

        await new Promise<void>(
            (resolve, reject) =>
            {
                list(
                    {
                        ...options,
                        onentry: (entry) =>
                        {
                            options?.onentry?.(entry);
                            result.push(entry.header.path);
                        }
                    },
                    [],
                    (error) =>
                    {
                        if (error)
                        {
                            reject(error);
                        }
                        else
                        {
                            resolve();
                        }
                    });
            });

        return result;
    }
}
