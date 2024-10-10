import { Request, Response } from 'express';
import { EventService } from '../application/EventService';
import { createEventSchema, updateEventSchema } from './validation/eventSchema';
import { EventNotFoundError } from '../domain/Event';

export class EventController {
  constructor(private eventService: EventService) {}

  async createEvent(req: Request, res: Response) {
    try {
      const { error, value } = createEventSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      const event = await this.eventService.createEvent(value);
      res.status(201).json(event);
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async getAllEvents(req: Request, res: Response) {
    try {
      const events = await this.eventService.getAllEvents();
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async getEventById(req: Request, res: Response) {
    try {
      const event = await this.eventService.getEventById(req.params.id);
      res.json(event);
    } catch (error) {
      if (error instanceof EventNotFoundError) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Error interno del servidor' });
      }
    }
  }

  async updateEvent(req: Request, res: Response) {
    try {
      const { error, value } = updateEventSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      const event = await this.eventService.updateEvent(req.params.id, value);
      res.json(event);
    } catch (error) {
      if (error instanceof EventNotFoundError) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Error interno del servidor' });
      }
    }
  }

  async deleteEvent(req: Request, res: Response) {
    try {
      await this.eventService.deleteEvent(req.params.id);
      res.status(204).send();
    } catch (error) {
      if (error instanceof EventNotFoundError) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Error interno del servidor' });
      }
    }
  }
}
