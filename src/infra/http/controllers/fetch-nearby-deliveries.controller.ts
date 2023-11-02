import { BadRequestException, Body, Controller, Get } from '@nestjs/common'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { Roles } from '@/infra/auth/roles.decorator'
import { DeliveryPresenter } from '../presenters/delivery-presenter'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { FetchNearbyDeliveriesUseCase } from '@/domain/logistics/application/use-cases/fetch-nearby-deliveries'

const fetchNearbyDeliveriesBodySchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
})

const bodyValidationPipe = new ZodValidationPipe(
  fetchNearbyDeliveriesBodySchema,
)

type FetchNearbyDeliveriesBodySchema = z.infer<
  typeof fetchNearbyDeliveriesBodySchema
>

@Roles('COURIER')
@Controller('/deliveries/nearby')
export class FetchNearbyDeliveriesController {
  constructor(private fetchNearbyDeliveries: FetchNearbyDeliveriesUseCase) {}

  @Get()
  async handle(
    @CurrentUser() user: UserPayload,
    @Body(bodyValidationPipe) body: FetchNearbyDeliveriesBodySchema,
  ) {
    const { latitude, longitude } = body
    const userId = user.sub

    const result = await this.fetchNearbyDeliveries.execute({
      courierId: userId,
      latitude,
      longitude,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const { deliveries } = result.value

    return { deliveries: deliveries.map(DeliveryPresenter.toHTTP) }
  }
}
