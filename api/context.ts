import * as allStores from "@public-badges/stores";
import {ApolloContext} from "@public-badges/types";

const {eventBus, ...stores} = allStores;

const xcontext: (args: {event: any; context: any}) => ApolloContext = ({
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

export default xcontext;
