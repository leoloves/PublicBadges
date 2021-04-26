import {map} from "ramda";
import {eventBus} from "@public-badges/stores";
import {Handler as AWSHandler} from "aws-lambda";
import {PublicBadgesHandler} from "@public-badges/types";
import * as services from "./services";

const newHandler: (handler: PublicBadgesHandler<any, any>) => AWSHandler = (
  handler
) => {
  return async (awsEvent, _context, callback) => {
    const detail = awsEvent["detail"];
    const detailType = awsEvent["detail-type"];
    const event = await handler({
      detailType,
      detail,
    });
    if (event) {
      const reply = await eventBus.put(event);
      callback(null, reply);
    } else {
      callback(null, "nothing memorable happened");
    }
  };
};

const {
  prepareOpenBadgeArtifact,
  runValueCaseScenarios,
  saveBadge,
  signOpenBadgeArtifact,
} = map((service) => newHandler(service), services);

export {
  prepareOpenBadgeArtifact,
  runValueCaseScenarios,
  saveBadge,
  signOpenBadgeArtifact,
};
