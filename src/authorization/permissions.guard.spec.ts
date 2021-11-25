import { PermissionsGuard } from './permissions/permissions.guard';

describe('PermissionsGuard', () => {
  it('should be defined', () => {
    expect(new PermissionsGuard()).toBeDefined();
  });
});
