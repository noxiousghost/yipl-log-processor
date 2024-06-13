import { readEvents, writeEvents } from "../models/eventModel.js";
import { v4 as uuidv4 } from "uuid";

export const getAllEvents = async (req, res) => {
  const events = await readEvents();
  res.json(events);
};

export const getEventById = async (req, res) => {
  const events = await readEvents();
  const event = events.find((e) => e.id === req.params.id);
  if (event) {
    res.json(event);
  } else {
    res.status(404).json({ message: "Event not found" });
  }
};

export const createEvent = async (req, res) => {
  const newEvent = { id: uuidv4(), ...req.body };
  const events = await readEvents();
  events.push(newEvent);
  await writeEvents(events);
  res.status(201).json(newEvent);
};

export const updateEvent = async (req, res) => {
  const events = await readEvents();
  const index = events.findIndex((e) => e.id === req.params.id);
  if (index !== -1) {
    events[index] = { ...events[index], ...req.body };
    await writeEvents(events);
    res.json(events[index]);
  } else {
    res.status(404).json({ message: "Event not found" });
  }
};

export const deleteEvent = async (req, res) => {
  const events = await readEvents();
  const newEvents = events.filter((e) => e.id !== req.params.id);
  await writeEvents(newEvents);
  res.status(204).send();
};
