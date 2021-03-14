import isEqual from "date-fns/fp/isEqual";
import parseJSON from "date-fns/parseJSON";
import { Service, AcceptedService } from "../models/service";

export const datesConflictErrorHandler = async (req, res, next) => {
  Service.fetchAll((acceptedServices: AcceptedService[]) => {
    const conflictingDates = acceptedServices.some(({ request }) => {
      return isEqual(
        parseJSON(request.startDate),
        parseJSON(req.body.startDate)
      );
    });
    if (conflictingDates) return res.sendStatus(409);
    next();
  });
};
