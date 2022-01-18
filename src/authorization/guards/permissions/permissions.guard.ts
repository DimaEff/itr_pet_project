import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';


@Injectable()
class PermissionsGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(
        context: ExecutionContext,
    ): boolean {
        const [req] = context.getArgs();
        const userPermissions: string[] = req?.user?.permissions || [];
        const requiredPermissionsEndpoint = this.reflector.get('roles', context.getHandler()) || [];
        const requiredPermissionsController = this.reflector.get('roles', context.getClass()) || [];
        const requiredPermissions = [...requiredPermissionsEndpoint, ...requiredPermissionsController];

        const hasAllRequirePermissions = requiredPermissions.every(p => userPermissions.includes(p));

        if (requiredPermissions.length === 0 || hasAllRequirePermissions) {
            return true;
        }

        throw new ForbiddenException('Insufficient permissions');
    }
}

export default PermissionsGuard;