import { RequestHandler } from "express";

export const fetchBy: RequestHandler = (req, res) => {
  return res.sendStatus(200);
};

export default {
  fetchBy,
};
