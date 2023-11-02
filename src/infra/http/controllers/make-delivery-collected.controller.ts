import {
  BadRequestException,
  Controller,
  HttpCode,
  Param,
  Patch,
} from '@nestjs/common'
import { Roles } from '@/infra/auth/roles.decorator'
import { MakeDeliveryCollectedUseCase } from '@/domain/logistics/application/use-cases/make-delivery-collected'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { CurrentUser } from '@/infra/auth/current-user-decorator'

@Roles('COURIER')
@Controller('/deliveries/:id/collected')
export class MakeDeliveryCollectedController {
  constructor(private makeDeliveryCollected: MakeDeliveryCollectedUseCase) {}

  @Patch()
  @HttpCode(204)
  async handle(
    @Param('id') deliveryId: string,
    @CurrentUser() user: UserPayload,
  ) {
    const userId = user.sub

    const result = await this.makeDeliveryCollected.execute({
      deliveryId,
      courierId: userId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
