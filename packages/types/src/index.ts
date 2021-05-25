import { Event, Language } from "./models";
import { PublicBadgesEvent } from "./events";
export * from "./events";
export * from "./models";
import { Errors } from "./errors";
import {
  ValueCaseStore,
  BadgeInstanceStore,
  RegistryStore,
  IssuerStore,
} from "./stores";
export * from "./stores";
export * from "./resolvers";
import {
  ExternalConfig,
  HTTPSourceConfig,
  ExternalResourceEntry,
  EventSourceConfig,
  EventSourcesConfig,
  FunctionConfig,
  TableConfig,
} from "./config";

export type PublicBadgesHandler<T, U> = (event: T) => Promise<U>;

export interface EventBus<E extends Event> {
  put: (event: E) => Promise<E["detail"]>;
}

type EmailParams = {
  recipients: string[];
  body: string;
  sender: string;
  subject: string;
};

type EmailTemplateParams = {
  recipients: string[];
  sender: string;
  templateArn: string;
  templateData: string;
};

export interface Email {
  create: (args: EmailParams) => Record<string, any>;
  createFromTemplate: (args: EmailTemplateParams) => Record<string, any>;
  send: (args: EmailParams) => Promise<void>;
  sendTemplate: (args: EmailTemplateParams) => Promise<void>;
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

export type PublicBadgesStores = {
  valueCase: ValueCaseStore;
  badgeInstance: BadgeInstanceStore;
  registry: RegistryStore;
  issuer: IssuerStore;
};

export type PublicBadgesEventBus = EventBus<PublicBadgesEvent>;

export interface ApolloContext {
  rawEvent: { headers: { origin: string } };
  functionContext: { functionName: string };
  stores: PublicBadgesStores;
  language?: Language;
  organizationName?: string;
  eventBus: PublicBadgesEventBus;
}

export {
  ExternalConfig,
  FunctionConfig,
  TableConfig,
  Errors,
  HTTPSourceConfig,
  EventSourceConfig,
  EventSourcesConfig,
  ExternalResourceEntry,
};
