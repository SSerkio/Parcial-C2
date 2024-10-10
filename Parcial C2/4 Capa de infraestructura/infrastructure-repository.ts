import { Event, EventRepository } from '../../domain/Event';
import { EventModel } from './EventModel';

export class MongoEventRepository implements EventRepository {
  async create(event: Event): Promise<Event> {
    const newEvent = new EventModel(event);
    await newEvent.save();
    return newEvent.toObject();
  }

  async findAll(): Promise<Event[]> {
    return await EventModel.find().lean();
  }

  async findById(id: string): Promise<Event | null> {
    return await EventModel.findById(id).lean();
  }

  async update(id: string, event: Partial<Event>): Promise<Event | null> {
    return await EventModel.findByIdAndUpdate(id, event, { new: true }).lean();
  }

  async delete(id: string): Promise<boolean> {
    const result = await EventModel.findByIdAndDelete(id);
    return result !== null;
  }
}
