import {ApolloContext} from "@public-badges/types";
import * as stores from "@public-badges/stores";
import {eventBus} from "@public-badges/adapters";

const apolloContext: (args: {event: any; context: any}) => ApolloContext = ({
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

export default apolloContext;
