import { Either, rigth } from '@/core/either'
import { DeliveriesRepository } from '../repositories/deliveries-repository'
import { Delivery } from '../../enterprise/entities/delivery'
import { Injectable } from '@nestjs/common'

interface FetchNearbyDeliveriesUseCaseRequest {
  latitude: number
  longitude: number
  courierId: string
}

type FetchNearbyDeliveriesUseCaseResponse = Either<
  null,
  {
    deliveries: Delivery[]
  }
>

@Injectable()
export class FetchNearbyDeliveriesUseCase {
  constructor(private deliveriesRepository: DeliveriesRepository) {}

  async execute({
    latitude,
    longitude,
    courierId,
  }: FetchNearbyDeliveriesUseCaseRequest): Promise<FetchNearbyDeliveriesUseCaseResponse> {
    const deliveries = await this.deliveriesRepository.fetchNearbyDeliveries({
      latitude,
      longitude,
      courierId,
    })

    return rigth({
      deliveries,
    })
  }
}
