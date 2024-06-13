import { readEvents, writeEvents } from "../models/eventModel.js";
import { v4 as uuidv4 } from "uuid";

export const getAllEvents = async (req, res) => {
  try {
    const events = await readEvents();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving events", error });
  }
};

export const getEventById = async (req, res) => {
  try {
    const events = await readEvents();
    const event = events.find((e) => e.id === req.params.id);
    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving event", error });
  }
};

export const createEvent = async (req, res) => {
  try {
    const newEvent = { id: uuidv4(), ...req.body };
    const events = await readEvents();
    events.push(newEvent);
    await writeEvents(events);
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: "Error creating event", error });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const events = await readEvents();
    const index = events.findIndex((e) => e.id === req.params.id);
    if (index !== -1) {
      events[index] = { ...events[index], ...req.body };
      await writeEvents(events);
      res.json(events[index]);
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating event", error });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const events = await readEvents();
    const newEvents = events.filter((e) => e.id !== req.params.id);
    await writeEvents(newEvents);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting event", error });
  }
};
