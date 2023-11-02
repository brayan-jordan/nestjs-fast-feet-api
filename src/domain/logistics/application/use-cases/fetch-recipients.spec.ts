import { InMemoryRecipientsRepository } from 'test/repositories/in-memory-recipients-repository'
import { makeRecipient } from 'test/factories/make-recipient'
import { FetchRecipientsUseCase } from './fetch-recipients'

let inMemoryRecipientsRepository: InMemoryRecipientsRepository
let sut: FetchRecipientsUseCase

describe('Fetch recipients', () => {
  beforeEach(() => {
    inMemoryRecipientsRepository = new InMemoryRecipientsRepository()
    sut = new FetchRecipientsUseCase(inMemoryRecipientsRepository)
  })

  it('should be able to fetch recipients', async () => {
    const recipient1 = makeRecipient()
    const recipient2 = makeRecipient()

    inMemoryRecipientsRepository.items.push(recipient1)
    inMemoryRecipientsRepository.items.push(recipient2)

    const result = await sut.execute()

    expect(result.isRight()).toBe(true)
    expect(result.value.recipients).toHaveLength(2)
  })
})
