/**
 * Types pour Parse Server
 */

export interface ParseACLPermissions {
  read?: boolean;
  write?: boolean;
}

export interface ParseACL {
  '*'?: ParseACLPermissions;
  [userId: string]: ParseACLPermissions | undefined;
}

export interface ParseObject {
  objectId: string;
  createdAt: string;
  updatedAt: string;
  ACL?: ParseACL;
}

export interface ParsePointer<T extends string = string> {
  __type: 'Pointer';
  className: T;
  objectId: string;
}

export interface ParseDate {
  __type: 'Date';
  iso: string;
}

export interface ParseFile {
  __type: 'File';
  name: string;
  url: string;
}

export interface ParseGeoPoint {
  __type: 'GeoPoint';
  latitude: number;
  longitude: number;
}

/**
 * Helper pour créer un pointeur Parse
 */
export function createPointer<T extends string>(
  className: T,
  objectId: string
): ParsePointer<T> {
  return {
    __type: 'Pointer',
    className,
    objectId,
  };
}

/**
 * Helper pour créer une date Parse
 */
export function createParseDate(date: Date | string): ParseDate {
  const iso = typeof date === 'string' ? date : date.toISOString();
  return {
    __type: 'Date',
    iso,
  };
}

/**
 * Type guard pour vérifier si un objet est un pointeur Parse
 */
export function isParsePointer(value: unknown): value is ParsePointer {
  return (
    typeof value === 'object' &&
    value !== null &&
    '__type' in value &&
    (value as ParsePointer).__type === 'Pointer'
  );
}

/**
 * Type guard pour vérifier si un objet est une date Parse
 */
export function isParseDate(value: unknown): value is ParseDate {
  return (
    typeof value === 'object' &&
    value !== null &&
    '__type' in value &&
    (value as ParseDate).__type === 'Date'
  );
}
