import { BadRequestException, Controller, Get } from '@nestjs/common'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { FetchDeliveriesFromRecipientUseCase } from '@/domain/logistics/application/use-cases/fetch-deliveries-from-recipient'
import { Roles } from '@/infra/auth/roles.decorator'
import { DeliveryPresenter } from '../presenters/delivery-presenter'

@Roles('RECIPIENT')
@Controller('/recipients/deliveries')
export class FetchDeliveriesFromRecipientController {
  constructor(
    private fetchDeliveriesFromRecipient: FetchDeliveriesFromRecipientUseCase,
  ) {}

  @Get()
  async handle(@CurrentUser() user: UserPayload) {
    const userId = user.sub

    const result = await this.fetchDeliveriesFromRecipient.execute({
      recipientId: userId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const { deliveries } = result.value

    return { deliveries: deliveries.map(DeliveryPresenter.toHTTP) }
  }
}
