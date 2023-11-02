import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { AuthenticateController } from './controllers/authenticate.controller'
import { AuthenticateUseCase } from '@/domain/logistics/application/use-cases/authenticate'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { CreateCourierController } from './controllers/create-courier.controller'
import { CreateCourierUseCase } from '@/domain/logistics/application/use-cases/create-courier'
import { CreateRecipientController } from './controllers/create-recipient.controller'
import { CreateRecipientUseCase } from '@/domain/logistics/application/use-cases/create-recipient'
import { EditCourierController } from './controllers/edit-courier.controller'
import { EditCourierUseCase } from '@/domain/logistics/application/use-cases/edit-courier'
import { EditRecipientController } from './controllers/edit-recipient.controller'
import { EditRecipientUseCase } from '@/domain/logistics/application/use-cases/edit-recipient'
import { DeleteCourierController } from './controllers/delete-courier.controller'
import { DeleteCourierUseCase } from '@/domain/logistics/application/use-cases/delete-courier'
import { DeleteRecipientController } from './controllers/delete-recipient.controller'
import { DeleteRecipientUseCase } from '@/domain/logistics/application/use-cases/delete-recipient'
import { FetchDeliveriesFromCourierController } from './controllers/fetch-deliveries-from-courier.controller'
import { FetchDeliveriesFromCourierUseCase } from '@/domain/logistics/application/use-cases/fetch-deliveries-from-courier'
import { FetchDeliveriesFromRecipientController } from './controllers/fetch-deliveries-from-recipient.controller'
import { FetchDeliveriesFromRecipientUseCase } from '@/domain/logistics/application/use-cases/fetch-deliveries-from-recipient'
import { FetchDeliveriesController } from './controllers/fetch-deliveries.controller'
import { FetchCouriersController } from './controllers/fetch-couriers.controller'
import { FetchDeliveriesUseCase } from '@/domain/logistics/application/use-cases/fetch-deliveries'
import { FetchCouriersUseCase } from '@/domain/logistics/application/use-cases/fetch-couriers'
import { FetchRecipientsController } from './controllers/fetch-recipients.controller'
import { FetchRecipientsUseCase } from '@/domain/logistics/application/use-cases/fetch-recipients'
import { ChangeRecipientPasswordController } from './controllers/change-recipient-password.controller'
import { ChangeRecipientPasswordUseCase } from '@/domain/logistics/application/use-cases/change-recipient-password'
import { ChangeCourierPasswordController } from './controllers/change-courier-password.controller'
import { ChangeCourierPasswordUseCase } from '@/domain/logistics/application/use-cases/change-courier-password'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    AuthenticateController,
    CreateCourierController,
    CreateRecipientController,
    EditCourierController,
    EditRecipientController,
    DeleteCourierController,
    DeleteRecipientController,
    FetchDeliveriesFromCourierController,
    FetchDeliveriesFromRecipientController,
    FetchDeliveriesController,
    FetchCouriersController,
    FetchRecipientsController,
    ChangeRecipientPasswordController,
    ChangeCourierPasswordController,
  ],
  providers: [
    AuthenticateUseCase,
    CreateCourierUseCase,
    CreateRecipientUseCase,
    EditCourierUseCase,
    EditRecipientUseCase,
    DeleteCourierUseCase,
    DeleteRecipientUseCase,
    FetchDeliveriesFromCourierUseCase,
    FetchDeliveriesFromRecipientUseCase,
    FetchDeliveriesUseCase,
    FetchCouriersUseCase,
    FetchRecipientsUseCase,
    ChangeRecipientPasswordUseCase,
    ChangeCourierPasswordUseCase,
  ],
})
export class HttpModule {}
