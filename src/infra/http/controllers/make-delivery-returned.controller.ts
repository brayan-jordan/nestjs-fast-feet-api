import {
  BadRequestException,
  Controller,
  HttpCode,
  Param,
  Patch,
} from '@nestjs/common'
import { Roles } from '@/infra/auth/roles.decorator'
import { MakeDeliveryReturnedUseCase } from '@/domain/logistics/application/use-cases/make-delivery-returned'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { CurrentUser } from '@/infra/auth/current-user-decorator'

@Roles('RECIPIENT')
@Controller('/deliveries/:id/returned')
export class MakeDeliveryReturnedController {
  constructor(private makeDeliveryReturned: MakeDeliveryReturnedUseCase) {}

  @Patch()
  @HttpCode(204)
  async handle(
    @Param('id') deliveryId: string,
    @CurrentUser() user: UserPayload,
  ) {
    const userId = user.sub

    const result = await this.makeDeliveryReturned.execute({
      deliveryId,
      recipientId: userId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
