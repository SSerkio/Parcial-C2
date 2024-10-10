import { Event, EventRepository, EventNotFoundError } from '../domain/Event';

export class EventService {
  constructor(private eventRepository: EventRepository) {}

  async createEvent(event: Event): Promise<Event> {
    return await this.eventRepository.create(event);
  }

  async getAllEvents(): Promise<Event[]> {
    return await this.eventRepository.findAll();
  }

  async getEventById(id: string): Promise<Event> {
    const event = await this.eventRepository.findById(id);
    if (!event) {
      throw new EventNotFoundError();
    }
    return event;
  }

  async updateEvent(id: string, eventData: Partial<Event>): Promise<Event> {
    const updatedEvent = await this.eventRepository.update(id, eventData);
    if (!updatedEvent) {
      throw new EventNotFoundError();
    }
    return updatedEvent;
  }

  async deleteEvent(id: string): Promise<void> {
    const deleted = await this.eventRepository.delete(id);
    if (!deleted) {
      throw new EventNotFoundError();
    }
  }
}
