import { HttpModule } from '@nestjs/axios';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import {
  OptionalAuthMiddleware,
  RequiredAuthMiddleware,
} from 'src/auth/auth.middleware';
import { SupabaseService } from 'src/supabase/supabase.service';

import { AssembleController } from './assemble.controller';
import {
  CheckAssemblePermissionMiddleware,
  CheckAssembleMaximumMiddleware,
} from './assemble.middleware';
import { AssembleService } from './assemble.service';

@Module({
  imports: [HttpModule],
  controllers: [AssembleController],
  providers: [AssembleService, SupabaseService],
})
export class AssembleModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequiredAuthMiddleware, CheckAssembleMaximumMiddleware)
      .forRoutes({
        path: 'assemble/item',
        method: RequestMethod.POST,
      })
      .apply(OptionalAuthMiddleware)
      .forRoutes({
        path: 'assemble/check/within-creation-limit',
        method: RequestMethod.GET,
      })
      .apply(RequiredAuthMiddleware)
      .forRoutes({
        path: 'assemble/list/my',
        method: RequestMethod.GET,
      })
      .apply(RequiredAuthMiddleware, CheckAssemblePermissionMiddleware)
      .forRoutes(
        {
          path: 'assemble/:assembleId/item',
          method: RequestMethod.GET,
        },
        {
          path: 'assemble/:assembleId/item',
          method: RequestMethod.PATCH,
        },
        {
          path: 'assemble/:assembleId/item',
          method: RequestMethod.DELETE,
        },
      );
  }
}