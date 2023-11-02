import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { AuthenticateController } from './controllers/authenticate.controller'
import { AuthenticateUseCase } from '@/domain/logistics/application/use-cases/authenticate'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { CreateCourierController } from './controllers/create-courier.controller'
import { CreateCourierUseCase } from '@/domain/logistics/application/use-cases/create-courier'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [AuthenticateController, CreateCourierController],
  providers: [AuthenticateUseCase, CreateCourierUseCase],
})
export class HttpModule {}
