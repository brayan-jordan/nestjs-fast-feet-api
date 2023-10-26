import { Either, rigth } from '@/core/either'
import { DeliveriesRepository } from '../repositories/deliveries-repository'
import { Delivery } from '../../enterprise/entities/delivery'

interface FetchNearbyDeliveriesUseCaseRequest {
  latitude: number
  longitude: number
}

type FetchNearbyDeliveriesUseCaseResponse = Either<
  null,
  {
    deliveries: Delivery[]
  }
>

export class FetchNearbyDeliveriesUseCase {
  constructor(private deliveriesRepository: DeliveriesRepository) {}

  async execute({
    latitude,
    longitude,
  }: FetchNearbyDeliveriesUseCaseRequest): Promise<FetchNearbyDeliveriesUseCaseResponse> {
    const deliveries = await this.deliveriesRepository.fetchNearbyDeliveries({
      latitude,
      longitude,
    })

    return rigth({
      deliveries,
    })
  }
}
