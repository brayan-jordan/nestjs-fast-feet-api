import { Either, left, rigth } from '@/core/either'
import { Courier } from '../../enterprise/entities/courier'
import { CouriersRepository } from '../repositories/couriers-repository'
import { ResourceAlreadyExistsError } from './errors/resource-already-exists-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

interface EditCourierUseCaseRequest {
  courierId: string
  name: string
  cpf: string
}

type EditCourierUseCaseResponse = Either<
  ResourceAlreadyExistsError | ResourceNotFoundError,
  {
    courier: Courier
  }
>

export class EditCourierUseCase {
  constructor(private couriersRepository: CouriersRepository) {}

  async execute({
    courierId,
    name,
    cpf,
  }: EditCourierUseCaseRequest): Promise<EditCourierUseCaseResponse> {
    const courier = await this.couriersRepository.findById(courierId)

    if (!courier) {
      return left(new ResourceNotFoundError())
    }

    if (courier.cpf !== cpf) {
      const courierWithSameCpf = await this.couriersRepository.findByCpf(cpf)

      if (courierWithSameCpf) {
        return left(new ResourceAlreadyExistsError('Courier', 'cpf'))
      }
    }

    courier.name = name
    courier.cpf = cpf

    await this.couriersRepository.save(courier)

    return rigth({ courier })
  }
}
