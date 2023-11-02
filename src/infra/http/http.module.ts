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
import { FetchNearbyDeliveriesController } from './controllers/fetch-nearby-deliveries.controller'
import { FetchNearbyDeliveriesUseCase } from '@/domain/logistics/application/use-cases/fetch-nearby-deliveries'
import { CreateDeliveryController } from './controllers/create-delivery.controller'
import { CreateDeliveryUseCase } from '@/domain/logistics/application/use-cases/create-delivery'
import { EditDeliveryController } from './controllers/edit-delivery.controller'
import { EditDeliveryUseCase } from '@/domain/logistics/application/use-cases/edit-delivery'
import { DeleteDeliveryController } from './controllers/delete-delivery.controller'
import { DeleteDeliveryUseCase } from '@/domain/logistics/application/use-cases/delete-delivery'
import { MakeDeliveryAvailableToPickupUseCase } from '@/domain/logistics/application/use-cases/make-delivery-available-to-pickup'
import { MakeDeliveryAvailableToPickupController } from './controllers/make-delivery-available-to-pickup.controller'
import { MakeDeliveryCollectedController } from './controllers/make-delivery-collected.controller'
import { MakeDeliveryCollectedUseCase } from '@/domain/logistics/application/use-cases/make-delivery-collected'
import { MakeDeliveryDeliveredController } from './controllers/make-delivery-delivered.controller'
import { MakeDeliveryDeliveredUseCase } from '@/domain/logistics/application/use-cases/make-delivery-delivered'
import { MakeDeliveryReturnedController } from './controllers/make-delivery-returned.controller'
import { MakeDeliveryReturnedUseCase } from '@/domain/logistics/application/use-cases/make-delivery-returned'
import { UploadAttachmentController } from './controllers/upload-attachment.controller'
import { UploadAndCreateAttachmentUseCase } from '@/domain/logistics/application/use-cases/upload-and-create-attachment'
import { StorageModule } from '../storage/storage.module'

@Module({
  imports: [DatabaseModule, CryptographyModule, StorageModule],
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
    FetchNearbyDeliveriesController,
    CreateDeliveryController,
    EditDeliveryController,
    DeleteDeliveryController,
    MakeDeliveryAvailableToPickupController,
    MakeDeliveryCollectedController,
    MakeDeliveryDeliveredController,
    MakeDeliveryReturnedController,
    UploadAttachmentController,
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
    FetchNearbyDeliveriesUseCase,
    CreateDeliveryUseCase,
    EditDeliveryUseCase,
    DeleteDeliveryUseCase,
    MakeDeliveryAvailableToPickupUseCase,
    MakeDeliveryCollectedUseCase,
    MakeDeliveryDeliveredUseCase,
    MakeDeliveryReturnedUseCase,
    UploadAndCreateAttachmentUseCase,
  ],
})
export class HttpModule {}
