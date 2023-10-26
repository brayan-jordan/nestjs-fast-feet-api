import { Either, left, rigth } from '@/core/either'
import { Delivery } from '../../enterprise/entities/delivery'
import { DeliveriesRepository } from '../repositories/deliveries-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

interface MakeDeliveryCollectedUseCaseRequest {
  deliveryId: string
}

type MakeDeliveryCollectedUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    delivery: Delivery
  }
>

export class MakeDeliveryCollectedUseCase {
  constructor(private deliveriesRepository: DeliveriesRepository) {}

  async execute({
    deliveryId,
  }: MakeDeliveryCollectedUseCaseRequest): Promise<MakeDeliveryCollectedUseCaseResponse> {
    const delivery = await this.deliveriesRepository.findById(deliveryId)

    if (!delivery) {
      return left(new ResourceNotFoundError())
    }

    delivery.collectedAt = new Date()

    await this.deliveriesRepository.save(delivery)

    return rigth({ delivery })
  }
}
