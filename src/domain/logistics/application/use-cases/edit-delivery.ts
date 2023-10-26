import { Either, left, rigth } from '@/core/either'
import { Delivery } from '../../enterprise/entities/delivery'
import { DeliveriesRepository } from '../repositories/deliveries-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

interface EditDeliveryUseCaseRequest {
  deliveryId: string
  latitude: number
  longitude: number
}

type EditDeliveryUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    delivery: Delivery
  }
>

export class EditDeliveryUseCase {
  constructor(private deliveriesRepository: DeliveriesRepository) {}

  async execute({
    deliveryId,
    latitude,
    longitude,
  }: EditDeliveryUseCaseRequest): Promise<EditDeliveryUseCaseResponse> {
    const delivery = await this.deliveriesRepository.findById(deliveryId)

    if (!delivery) {
      return left(new ResourceNotFoundError())
    }

    delivery.latitude = latitude
    delivery.longitude = longitude

    await this.deliveriesRepository.save(delivery)

    return rigth({ delivery })
  }
}
