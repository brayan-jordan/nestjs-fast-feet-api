import { InMemoryRecipientsRepository } from 'test/repositories/in-memory-recipients-repository'
import { makeRecipient } from 'test/factories/make-recipient'
import { EditRecipientUseCase } from './edit-recipient'

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

    // TODO: CRIAR MAIS TESTES
  })
})
