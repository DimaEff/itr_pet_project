import { Test, TestingModule } from '@nestjs/testing';
import { EventChatGateway } from './event-chat.gateway';

describe('EventChatGateway', () => {
  let gateway: EventChatGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventChatGateway],
    }).compile();

    gateway = module.get<EventChatGateway>(EventChatGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
