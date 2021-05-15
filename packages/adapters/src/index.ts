import {map} from "ramda";
import eventBus from "./eventBus";
import {Handler as AWSHandler} from "aws-lambda";
import {PublicBadgesHandler} from "@public-badges/types";

const newHandler: (handler: PublicBadgesHandler<any, any>) => AWSHandler = (
  handler
) => {
  return async (awsEvent, _context, callback) => {
    const detail = awsEvent.detail;
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

const wrapServices: (
  serviceMap: Record<string, PublicBadgesHandler<any, any>>
) => Record<string, AWSHandler> = (serviceMap) => map(newHandler, serviceMap);

export {wrapServices, eventBus};
