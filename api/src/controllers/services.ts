import { Service } from "../models/service";

export const accept = (req, res, next) => {
  try {
    const service = new Service(req.body);
    service.acceptRequest();
    return res.sendStatus(201);
  } catch (error) {
    next(error);
  }
};

export default {
  accept,
};
