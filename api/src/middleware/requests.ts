import isEqual from "date-fns/fp/isEqual";
import { Requests, Application } from "../models/requests";

export const datesConflictHandler = async (req, res, next) => {
  Requests.fetchAll((applications: Application[]) => {
    const conflictingDates = applications.some(({ startDate }) =>
      isEqual(startDate, req.body.startDate)
    );
    if (conflictingDates) return res.sendStatus(409);

    next();
  });
};
