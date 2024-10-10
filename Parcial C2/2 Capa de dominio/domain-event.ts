export interface Event {
  id?: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  organizer: string;
}

export interface EventRepository {
  create(event: Event): Promise<Event>;
  findAll(): Promise<Event[]>;
  findById(id: string): Promise<Event | null>;
  update(id: string, event: Partial<Event>): Promise<Event | null>;
  delete(id: string): Promise<boolean>;
}

export class EventNotFoundError extends Error {
  constructor() {
    super('Evento no encontrado');
    this.name = 'EventNotFoundError';
  }
}

export class InvalidEventError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidEventError';
  }
}
