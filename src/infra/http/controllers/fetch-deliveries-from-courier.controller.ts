import { BadRequestException, Controller, Get } from '@nestjs/common'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { FetchDeliveriesFromCourierUseCase } from '@/domain/logistics/application/use-cases/fetch-deliveries-from-courier'
import { Roles } from '@/infra/auth/roles.decorator'
import { DeliveryPresenter } from '../presenters/delivery-presenter'

@Roles('COURIER')
@Controller('/couriers/deliveries')
export class FetchDeliveriesFromCourierController {
  constructor(
    private fetchDeliveriesFromCourier: FetchDeliveriesFromCourierUseCase,
  ) {}

  @Get()
  async handle(@CurrentUser() user: UserPayload) {
    const userId = user.sub

    const result = await this.fetchDeliveriesFromCourier.execute({
      courierId: userId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const { deliveries } = result.value

    return { deliveries: deliveries.map(DeliveryPresenter.toHTTP) }
  }
}
