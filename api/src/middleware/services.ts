import Joi from "joi";
import getOr from "lodash/fp/getOr";
import isEqual from "date-fns/fp/isEqual";
import parseJSON from "date-fns/parseJSON";
import { Service, AcceptedService } from "../models/service";
import { skillSchema } from "../models/skill";
import { clientProfileSchema } from "../models/client";
import { providerProfileSchema } from "../models/provider";

export const datesConflictErrorHandler = (req, res, next) => {
  Service.fetchAll((acceptedServices: AcceptedService[]) => {
    const conflictingDates =(acceptedServices || []).some(({ request }) => {
      return isEqual(
        parseJSON(request.startDate),
        parseJSON(req.body.request.startDate)
      );
    });
    if (conflictingDates) return res.sendStatus(409);
    next();
  });
};

export const validateSchema = async (req, res, next) => {
  const schema = Joi.object({
    request: Joi.object({
      startDate: Joi.date().required(),
      endDate: Joi.date().required(),
      description: Joi.string().required(),
      skills: Joi.array().items(skillSchema).required(),
      client: clientProfileSchema.required(),
    }).required(),
    provider: providerProfileSchema,
  });

  const body: AcceptedService = {
    ...req.body,
    request: {
      ...getOr({}, "request", req.body),
      startDate: parseJSON(getOr("", "request.startDate", req.body)),
      endDate: parseJSON(getOr("", "request.endDate", req.body)),
    },
  };
  schema
    .validateAsync(body, { warnings: true })
    .then(() => next())
    .catch((err) => {
      res.status(400).send(err);
    });
};
