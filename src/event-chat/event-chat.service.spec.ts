import { Test, TestingModule } from '@nestjs/testing';
import { EventChatService } from './event-chat.service';

describe('EventChatService', () => {
  let service: EventChatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventChatService],
    }).compile();

    service = module.get<EventChatService>(EventChatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
