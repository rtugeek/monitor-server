import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { TokenService } from './token.service'

@Module({
  imports: [],
  controllers: [AppController],
  providers: [TokenService],
})
export class AppModule {}
