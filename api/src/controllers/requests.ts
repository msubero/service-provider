import { RequestHandler } from "express";
import { Requests } from "../models/requests";

export const add: RequestHandler = (req, res) => {
  const application = new Requests(req.body)
  return res.json({application})
};

export default {
  add,
};
