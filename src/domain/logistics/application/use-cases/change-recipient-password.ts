import { Either, left, rigth } from '@/core/either'
import { Recipient } from '../../enterprise/entities/recipient'
import { RecipientsRepository } from '../repositories/recipients-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { HashGenerator } from '../cryptography/hash-generator'
import { Injectable } from '@nestjs/common'

interface ChangeRecipientPasswordUseCaseRequest {
  recipientId: string
  password: string
}

type ChangeRecipientPasswordUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    recipient: Recipient
  }
>

@Injectable()
export class ChangeRecipientPasswordUseCase {
  constructor(
    private recipientsRepository: RecipientsRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    recipientId,
    password,
  }: ChangeRecipientPasswordUseCaseRequest): Promise<ChangeRecipientPasswordUseCaseResponse> {
    const recipient = await this.recipientsRepository.findById(recipientId)

    if (!recipient) {
      return left(new ResourceNotFoundError())
    }

    recipient.password = await this.hashGenerator.hash(password)

    await this.recipientsRepository.save(recipient)

    return rigth({ recipient })
  }
}
