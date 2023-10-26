import { Either, left, rigth } from '@/core/either'
import { Delivery } from '../../enterprise/entities/delivery'
import { DeliveriesRepository } from '../repositories/deliveries-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

interface MakeDeliveryDeliveredUseCaseRequest {
  deliveryId: string
}

type MakeDeliveryDeliveredUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    delivery: Delivery
  }
>

export class MakeDeliveryDeliveredUseCase {
  constructor(private deliveriesRepository: DeliveriesRepository) {}

  async execute({
    deliveryId,
  }: MakeDeliveryDeliveredUseCaseRequest): Promise<MakeDeliveryDeliveredUseCaseResponse> {
    const delivery = await this.deliveriesRepository.findById(deliveryId)

    if (!delivery) {
      return left(new ResourceNotFoundError())
    }

    delivery.deliveredAt = new Date()

    await this.deliveriesRepository.save(delivery)

    return rigth({ delivery })
  }
}
