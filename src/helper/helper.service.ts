import { Injectable } from '@nestjs/common';


@Injectable()
export class HelperService {
    normalizeDtoProps(dto: any, propsNames: string[]): any {
        const normalizedProps = {};
        propsNames.forEach(p => normalizedProps[p] = dto[p]?.toLowerCase());

        return { ...dto, ...normalizedProps };
    }
}
