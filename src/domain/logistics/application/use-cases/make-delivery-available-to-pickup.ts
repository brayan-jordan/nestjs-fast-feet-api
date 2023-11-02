import { Either, left, rigth } from '@/core/either'
import { Delivery } from '../../enterprise/entities/delivery'
import { DeliveriesRepository } from '../repositories/deliveries-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'

interface MakeDeliveryAvailableToPickupUseCaseRequest {
  deliveryId: string
}

type MakeDeliveryAvailableToPickupUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    delivery: Delivery
  }
>

@Injectable()
export class MakeDeliveryAvailableToPickupUseCase {
  constructor(private deliveriesRepository: DeliveriesRepository) {}

  async execute({
    deliveryId,
  }: MakeDeliveryAvailableToPickupUseCaseRequest): Promise<MakeDeliveryAvailableToPickupUseCaseResponse> {
    const delivery = await this.deliveriesRepository.findById(deliveryId)

    if (!delivery) {
      return left(new ResourceNotFoundError())
    }

    delivery.availableToPickupAt = new Date()

    await this.deliveriesRepository.save(delivery)

    return rigth({ delivery })
  }
}
