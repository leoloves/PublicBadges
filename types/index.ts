import { Event } from "./models";
export * from "./events";
export * from "./models";
export * from "./resolvers";
import {
  ExternalConfig,
  HTTPSourceConfig,
  ExternalResourceEntry,
  EventSourceConfig,
  EventSourcesConfig,
  FunctionConfig,
  TableConfig
} from "./config";

export interface Store<O, A, T> {
  fetch: (args: O) => Promise<T>;
  fetchAll: (args: A) => Promise<NonNullable<T>[]>;
}

export type PublicBadgesHandler<T, U> = (event: T) => Promise<U>;

export interface EventBus<E extends Event> {
  put: (event: E) => Promise<E["detail"]>;
}

export type InternalFunctionConfig = {
  handler: string;
  events: any[];
  environment: {
    HANDLER_NAME: string;
  };
};

export type ResourceType = "table" | "bucket" | "index" | "function";
export type ResourceCategory = "tables" | "buckets" | "indices" | "functions";

export type InternalResourceEntry = {
  name: string;
  variableName: string;
  resourceType: ResourceType;
  variableReference: string;
  config: TableConfig | FunctionConfig | null;
};

export type Resources = Record<ResourceCategory, InternalResourceEntry[]>;

export type InternalConfig = {
  templateTitle: string;
  customDomain?: any;
  resources: Resources;
};

export {
  ExternalConfig,
  FunctionConfig,
  TableConfig,
  HTTPSourceConfig,
  EventSourceConfig,
  EventSourcesConfig,
  ExternalResourceEntry
};
