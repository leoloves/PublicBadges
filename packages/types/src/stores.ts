import {
  Issuer,
  Organization,
  OrganizationStatus,
  PublicBadge,
  ValueCase,
  Language,
} from "./models";

export interface Store<O, A, T> {
  fetch: (args: O) => Promise<T>;
  fetchAll: (args: A) => Promise<NonNullable<T>[]>;
}

export type BadgeInstanceStore = Store<
  {organizationId: string; valueCaseId: string},
  {organizationId?: string},
  PublicBadge | null
>;

export type IssuerStore = Store<{}, {}, Issuer>;

export type RegistryStore = Store<
  {organizationId?: string | null; domainName?: string | null},
  {filter?: OrganizationStatus | null},
  Organization
>;

export type ValueCaseStore = Store<
  {valueCaseId: string; language?: Language | null},
  {},
  ValueCase
>;
