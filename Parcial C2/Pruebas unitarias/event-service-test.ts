import { EventService } from './EventService';
import { Event, EventNotFoundError, EventRepository } from '../domain/Event';

describe('EventService', () => {
  let mockRepository: jest.Mocked<EventRepository>;
  let eventService: EventService;

  beforeEach(() => {
    mockRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    eventService = new EventService(mockRepository);
  });

  const mockEvent: Event = {
    title: 'Test Event',
    description: 'Test Description',
    date: new Date(),
    location: 'Test Location',
    organizer: 'Test Organizer'
  };

  describe('createEvent', () => {
    it('should create an event successfully', async () => {
      mockRepository.create.mockResolvedValue({ ...mockEvent, id: '1' });
      const result = await eventService.createEvent(mockEvent);
      expect(result).toEqual({ ...mockEvent, id: '1' });
      expect(mockRepository.create).toHaveBeenCalledWith(mockEvent);
    });
  });

  describe('getEventById', () => {
    it('should return an event when it exists', async () => {
      mockRepository.findById.mockResolvedValue({ ...mockEvent, id: '1' });
      const result = await eventService.getEventById('1');
      expect(result).toEqual({ ...mockEvent, id: '1' });
    });

    it('should throw EventNotFoundError when event does not exist', async () => {
      mockRepository.findById.mockResolvedValue(null);
      await expect(eventService.getEventById('1')).rejects.toThrow(EventNotFoundError);
    });
  });
});
