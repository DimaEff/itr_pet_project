class Role {
    permissions: any;

    constructor(read: string[], write: string[]) {
        const readPermissions = read.map(s => `read:${s}`);
        const writePermissions = write.map(s => `write:${s}`);

        this.permissions = [...readPermissions, ...writePermissions];
    }
}

const scopes = {
    events: 'events',
    users: 'users',
};

const rolesPermissions = {
    admin: new Role([scopes.events, scopes.users], [scopes.events, scopes.users]).permissions,
};

export default rolesPermissions;