import { Module, Global } from '@nestjs/common';
import { CustomHelpersService } from './custom-helpers.service';

@Global()
@Module({
  providers: [CustomHelpersService],
  exports: [CustomHelpersService],
})
export class CustomHelpersModule {}
