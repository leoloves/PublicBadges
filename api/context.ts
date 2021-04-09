import eventBus, {PublicBadgesEventBus} from "../stores/eventBus";
import * as stores from "../stores";
import {Language} from "../types";

export interface ApolloContext {
  rawEvent: {headers: {origin: string}};
  functionContext: {functionName: string};
  stores: stores.PublicBadgesStores;
  language?: Language;
  organizationName?: string;
  eventBus: PublicBadgesEventBus;
}

const context: (args: {event: any; context: any}) => ApolloContext = ({
  event,
  context,
}) => {
  return {
    rawEvent: event,
    functionContext: context,
    stores,
    eventBus,
  };
};

export default context;
