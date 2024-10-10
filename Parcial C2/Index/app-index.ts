import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { MongoEventRepository } from './infrastructure/mongoose/MongoEventRepository';
import { EventService } from './application/EventService';
import { EventController } from './presentation/EventController';

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI!)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error de conexión a MongoDB:', err));

const eventRepository = new MongoEventRepository();
const eventService = new EventService(eventRepository);
const eventController = new EventController(eventService);

app.post('/events', (req, res) => eventController.createEvent(req, res));
app.get('/events', (req, res) => eventController.getAllEvents(req, res));
app.get('/events/:id', (req, res) => eventController.getEventById(req, res));
app.patch('/events/:id', (req, res) => eventController.updateEvent(req, res));
app.delete('/events/:id', (req, res) => eventController.deleteEvent(req, res));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
