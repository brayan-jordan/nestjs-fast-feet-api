import { Either, rigth } from '@/core/either'
import { DeliveriesRepository } from '../repositories/deliveries-repository'
import { Delivery } from '../../enterprise/entities/delivery'

interface FetchDeliveriesFromCourierUseCaseRequest {
  courierId: string
}

type FetchDeliveriesFromCourierUseCaseResponse = Either<
  null,
  {
    deliveries: Delivery[]
  }
>

export class FetchDeliveriesFromCourierUseCase {
  constructor(private deliveriesRepository: DeliveriesRepository) {}

  async execute({
    courierId,
  }: FetchDeliveriesFromCourierUseCaseRequest): Promise<FetchDeliveriesFromCourierUseCaseResponse> {
    const deliveries =
      await this.deliveriesRepository.fetchDeliveriesFromCourier(courierId)

    return rigth({
      deliveries,
    })
  }
}
