import { Either, left, rigth } from '@/core/either'
import { Courier } from '../../enterprise/entities/courier'
import { CouriersRepository } from '../repositories/couriers-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { HashGenerator } from '../cryptography/hash-generator'
import { Injectable } from '@nestjs/common'

interface ChangeCourierPasswordUseCaseRequest {
  courierId: string
  password: string
}

type ChangeCourierPasswordUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    courier: Courier
  }
>

@Injectable()
export class ChangeCourierPasswordUseCase {
  constructor(
    private couriersRepository: CouriersRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    courierId,
    password,
  }: ChangeCourierPasswordUseCaseRequest): Promise<ChangeCourierPasswordUseCaseResponse> {
    const courier = await this.couriersRepository.findById(courierId)

    if (!courier) {
      return left(new ResourceNotFoundError())
    }

    courier.password = await this.hashGenerator.hash(password)

    await this.couriersRepository.save(courier)

    return rigth({ courier })
  }
}
