import {
  ForbiddenException,
  HttpException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { RequestWithUserInfo } from 'src/auth/auth.middleware';
import { SupabaseService } from 'src/supabase/supabase.service';

import { AssembleService } from './assemble.service';

@Injectable()
export class CheckAssemblePermissionMiddleware implements NestMiddleware {
  constructor(private readonly supabaseService: SupabaseService) {}

  async use(req: RequestWithUserInfo, _: Response, next: NextFunction) {
    const assembleId = req.params.assembleId as string;
    if (!req.userInfo) {
      throw new ForbiddenException();
    }

    const { data: userAssemble } = await this.supabaseService.client
      .from('user_assembles')
      .select('*')
      .eq('userId', req.userInfo.id)
      .eq('assembleId', assembleId)
      .single();

    if (!userAssemble) {
      throw new ForbiddenException();
    }
    return next();
  }
}
@Injectable()
export class CheckAssembleMaximumMiddleware implements NestMiddleware {
  constructor(private readonly assembleService: AssembleService) {}

  async use(req: RequestWithUserInfo, _: Response, next: NextFunction) {
    if (!req.userInfo) {
      return next();
    }

    const isWithinCreationLimit = this.assembleService.checkWithinCreationLimit(
      req.userInfo,
    );

    if (!isWithinCreationLimit) {
      // FIXME: 아예 별도의 Exciption으로 생성할지 고민 필요
      throw new HttpException('over assemble', 400);
    }
    return next();
  }
}