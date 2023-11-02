import {
  BadRequestException,
  Controller,
  HttpCode,
  Param,
  Patch,
} from '@nestjs/common'
import { Roles } from '@/infra/auth/roles.decorator'
import { MakeDeliveryAvailableToPickupUseCase } from '@/domain/logistics/application/use-cases/make-delivery-available-to-pickup'

@Roles('ADMIN')
@Controller('/deliveries/:id/available-to-pickup')
export class MakeDeliveryAvailableToPickupController {
  constructor(
    private makeDeliveryAvailableToPickup: MakeDeliveryAvailableToPickupUseCase,
  ) {}

  @Patch()
  @HttpCode(204)
  async handle(@Param('id') deliveryId: string) {
    const result = await this.makeDeliveryAvailableToPickup.execute({
      deliveryId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
