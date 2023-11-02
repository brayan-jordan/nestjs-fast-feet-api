import { BadRequestException, Controller, Get } from '@nestjs/common'
import { Roles } from '@/infra/auth/roles.decorator'
import { DeliveryPresenter } from '../presenters/delivery-presenter'
import { FetchDeliveriesUseCase } from '@/domain/logistics/application/use-cases/fetch-deliveries'

@Roles('ADMIN')
@Controller('/deliveries')
export class FetchDeliveriesController {
  constructor(private fetchDeliveries: FetchDeliveriesUseCase) {}

  @Get()
  async handle() {
    const result = await this.fetchDeliveries.execute()

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const { deliveries } = result.value

    return { deliveries: deliveries.map(DeliveryPresenter.toHTTP) }
  }
}
