import { RequestHandler } from "express";

export const add: RequestHandler = (req, res) => {
  return res.sendStatus(201)
};

export default {
  add,
};
