import mongoose from 'mongoose';
import { Event } from '../../domain/Event';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  organizer: { type: String, required: true }
});

export const EventModel = mongoose.model<Event & mongoose.Document>('Event', eventSchema);
