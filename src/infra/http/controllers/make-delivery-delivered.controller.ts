import {
  BadRequestException,
  Controller,
  HttpCode,
  Param,
  Patch,
} from '@nestjs/common'
import { Roles } from '@/infra/auth/roles.decorator'
import { MakeDeliveryDeliveredUseCase } from '@/domain/logistics/application/use-cases/make-delivery-delivered'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { CurrentUser } from '@/infra/auth/current-user-decorator'

@Roles('COURIER')
@Controller('/deliveries/:id/delivered')
export class MakeDeliveryDeliveredController {
  constructor(private makeDeliveryDelivered: MakeDeliveryDeliveredUseCase) {}

  @Patch()
  @HttpCode(204)
  async handle(
    @Param('id') deliveryId: string,
    @CurrentUser() user: UserPayload,
  ) {
    const userId = user.sub

    const result = await this.makeDeliveryDelivered.execute({
      deliveryId,
      courierId: userId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
