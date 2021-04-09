export type EventSourceConfig = {
  handlerName: string;
  eventTypes: string[];
};

export type HTTPSourceConfig = {
  path: string;
  methods: string[];
};

export type EventSourcesConfig = {
  buckets?: string[];
  http?: HTTPSourceConfig[];
  eventSources?: EventSourceConfig[];
};

export type FunctionConfig = {
  variableName?: string;
  sources?: EventSourcesConfig;
  package?: any;
  resources?: string[];
};

type IndexConfig = {
  IndexName: string;
  KeySchema: any;
  Projection: any;
  ProvisionedThroughput: any;
};

export type TableConfig = {
  AttributeDefinitions: any;
  variableName?: string;
  KeySchema: any;
  ProvisionedThroughput: any;
  GlobalSecondaryIndexes: IndexConfig[];
};

export type ExternalResourceEntry =
  | string
  | [string, TableConfig | FunctionConfig];

export type ExternalConfig = {
  templateTitle: string;
  packageConfig: any;
  plugins: string[];
  customDomain: any;
  functions: { [key: string]: FunctionConfig };
  buckets: ExternalResourceEntry[];
  tables: ExternalResourceEntry[];
  indices: ExternalResourceEntry[];
};
