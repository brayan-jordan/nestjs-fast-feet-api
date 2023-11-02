import { BadRequestException, Controller, Get } from '@nestjs/common'
import { Roles } from '@/infra/auth/roles.decorator'
import { FetchCouriersUseCase } from '@/domain/logistics/application/use-cases/fetch-couriers'
import { CourierPresenter } from '../presenters/courier-presenter'

@Roles('ADMIN')
@Controller('/couriers')
export class FetchCouriersController {
  constructor(private fetchCouriers: FetchCouriersUseCase) {}

  @Get()
  async handle() {
    const result = await this.fetchCouriers.execute()

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const { couriers } = result.value

    return { couriers: couriers.map(CourierPresenter.toHTTP) }
  }
}
