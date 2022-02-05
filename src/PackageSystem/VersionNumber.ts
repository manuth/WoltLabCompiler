import { VersionKind } from "./VersionKind";

/**
 * Represents a version number.
 */
export type VersionNumber = `${number}.${number}.${number}${` ${VersionKind} ${number}` | ""}`;
