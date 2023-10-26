import { InMemoryRecipientsRepository } from 'test/repositories/in-memory-recipients-repository'
import { makeRecipient } from 'test/factories/make-recipient'
import { EditRecipientUseCase } from './edit-recipient'
import { ResourceAlreadyExistsError } from './errors/resource-already-exists-error'

let inMemoryRecipientsRepository: InMemoryRecipientsRepository
let sut: EditRecipientUseCase

describe('Edit recipient use case', () => {
  beforeEach(() => {
    inMemoryRecipientsRepository = new InMemoryRecipientsRepository()
    sut = new EditRecipientUseCase(inMemoryRecipientsRepository)
  })

  it('should be able to edit a recipient', async () => {
    const recipient = makeRecipient({
      cpf: '987.654.321-10',
      name: 'Old name',
    })

    inMemoryRecipientsRepository.items.push(recipient)

    const result = await sut.execute({
      recipientId: recipient.id.toString(),
      cpf: '123.456.789-10',
      name: 'New name',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryRecipientsRepository.items[0].cpf).toEqual('123.456.789-10')
    expect(inMemoryRecipientsRepository.items[0].name).toEqual('New name')
  })

  it('should not be able to edit a recipient cpf to an already existing one', async () => {
    const existentRecipient = makeRecipient({
      cpf: '987.654.321-10',
    })

    inMemoryRecipientsRepository.items.push(existentRecipient)

    const recipient = makeRecipient({
      cpf: '123.456.789-10',
    })

    inMemoryRecipientsRepository.items.push(recipient)

    const result = await sut.execute({
      recipientId: recipient.id.toString(),
      cpf: '987.654.321-10',
      name: 'New name',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceAlreadyExistsError)
  })
})
