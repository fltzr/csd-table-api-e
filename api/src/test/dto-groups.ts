const READ = 'read';
const CREATE = 'create';
const UPDATE = 'update';
const DELETE = 'delete';

export const ONLY_READ = [READ];
export const ONLY_CREATE = [CREATE];
export const ONLY_UPDATE = [UPDATE];
export const ONLY_DELETE = [DELETE];

export const EXCLUDE_READ = [CREATE, UPDATE, DELETE];
export const EXCLUDE_CREATE = [READ, UPDATE, DELETE];
export const EXCLUDE_UPDATE = [READ, CREATE, DELETE];
export const EXCLUDE_DELETE = [READ, CREATE, UPDATE];

export const EXCLUDE_READ_CREATE = [UPDATE, DELETE];
export const EXCLUDE_READ_UPDATE = [CREATE, DELETE];
export const EXCLUDE_READ_DELETE = [UPDATE, CREATE];
export const EXCLUDE_CREATE_UPDATE = [READ, DELETE];
export const EXCLUDE_CREATE_DELETE = [READ, UPDATE];
export const EXCLUDE_DELETE_UPDATE = [READ, CREATE];

export const ALL_OPERATIONS = [READ, CREATE, UPDATE, DELETE];
