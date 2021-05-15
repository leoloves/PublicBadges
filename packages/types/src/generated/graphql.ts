import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { ValueCaseProxy, PublicBadgeProxy, OpenBadgesArtifactProxy } from '../models';
import { ApolloContext } from '../index';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  EmailAddress: string;
  GUID: any;
  JSON: string;
  URL: any;
};

export type ApprovedOrganization = Organization & {
  organizationId: Scalars['GUID'];
  status: OrganizationStatus;
  name: Scalars['String'];
  contact: Contact;
  admin: Contact;
  approvedBy: Scalars['EmailAddress'];
  approvedOn: Scalars['String'];
  domainName: Scalars['URL'];
  urls: Maybe<Array<Maybe<Scalars['URL']>>>;
};

export type ApprovedPublicBadge = PublicBadge & {
  badgeId: Scalars['GUID'];
  status: PublicBadgeStatus;
  valueCaseId: Scalars['ID'];
  valueCase: ValueCase;
  name: Scalars['String'];
  tags: Array<Maybe<Scalars['String']>>;
  description: Scalars['String'];
  narrative: Scalars['String'];
  recipientId: Scalars['ID'];
  evidence: Array<Proof>;
  recipient: ApprovedOrganization;
};

export type Contact = {
  name: Scalars['String'];
  email: Scalars['EmailAddress'];
};

export type ContactInput = {
  name: Scalars['String'];
  email: Scalars['EmailAddress'];
};



export type Issuer = {
  issuerId: Scalars['URL'];
  type: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  email: Scalars['EmailAddress'];
};


export enum Language {
  Nl = 'NL',
  En = 'EN',
  De = 'DE'
}

export type Localization = {
  NL: Maybe<ValueCaseLocalization>;
  DE: Maybe<ValueCaseLocalization>;
};

export type Mutation = {
  applyForBadge: Maybe<PublicBadge>;
  registerOrganization: Maybe<PendingOrganization>;
  approveOrganization: Maybe<ApprovedOrganization>;
};


export type MutationApplyForBadgeArgs = {
  input: PublicBadgeInput;
};


export type MutationRegisterOrganizationArgs = {
  input: OrganizationInput;
};


export type MutationApproveOrganizationArgs = {
  input: OrganizationValidation;
};

export type OpenBadge = {
  id: Scalars['String'];
  badge: OpenBadgeClass;
  recipient: OpenBadgeRecipient;
  issuedOn: Scalars['String'];
  expires: Scalars['String'];
  evidence: Array<Maybe<OpenBadgeProof>>;
};

export type OpenBadgeArtifact = {
  signature: Scalars['String'];
  json: Scalars['JSON'];
};

export type OpenBadgeClass = {
  id: Scalars['String'];
  name: Scalars['String'];
  tags: Array<Maybe<Scalars['String']>>;
  description: Scalars['String'];
  criteria: OpenBadgeCriteria;
};

export type OpenBadgeCriteria = {
  narrative: Scalars['String'];
};

export type OpenBadgeProof = {
  id: Scalars['String'];
  name: Scalars['String'];
  genre: Scalars['String'];
  description: Scalars['String'];
  narrative: Scalars['String'];
};

export type OpenBadgeRecipient = {
  identity: Scalars['String'];
  type: Scalars['String'];
};

export type Organization = {
  organizationId: Scalars['GUID'];
  status: OrganizationStatus;
  name: Scalars['String'];
  contact: Contact;
  admin: Contact;
  domainName: Scalars['URL'];
  urls: Maybe<Array<Maybe<Scalars['URL']>>>;
};

export type OrganizationInput = {
  name: Scalars['String'];
  contact: ContactInput;
  admin: ContactInput;
  domainName: Scalars['URL'];
};

export enum OrganizationStatus {
  Pending = 'PENDING',
  Approved = 'APPROVED'
}

export type OrganizationValidation = {
  organizationId: Scalars['GUID'];
  approvalToken: Scalars['GUID'];
};

export type PendingOrganization = Organization & {
  organizationId: Scalars['GUID'];
  approvalToken: Maybe<Scalars['GUID']>;
  status: OrganizationStatus;
  name: Scalars['String'];
  contact: Contact;
  admin: Contact;
  domainName: Scalars['URL'];
  urls: Maybe<Array<Maybe<Scalars['URL']>>>;
};

export type PendingPublicBadge = PublicBadge & {
  badgeId: Scalars['GUID'];
  status: PublicBadgeStatus;
  valueCaseId: Scalars['ID'];
  valueCase: ValueCase;
  name: Scalars['String'];
  tags: Array<Maybe<Scalars['String']>>;
  description: Scalars['String'];
  narrative: Scalars['String'];
  recipientId: Scalars['ID'];
  recipient: ApprovedOrganization;
};

export type Proof = {
  proofId: Scalars['GUID'];
  genre: Scalars['String'];
  name: Scalars['String'];
  description: Scalars['String'];
  narrative: Array<Scalars['String']>;
};

export type PublicBadge = {
  badgeId: Scalars['GUID'];
  status: PublicBadgeStatus;
  valueCaseId: Scalars['ID'];
  valueCase: ValueCase;
  name: Scalars['String'];
  tags: Array<Maybe<Scalars['String']>>;
  description: Scalars['String'];
  narrative: Scalars['String'];
  recipientId: Scalars['ID'];
  recipient: ApprovedOrganization;
};

export type PublicBadgeInput = {
  valueCaseId: Scalars['ID'];
  domainName: Scalars['URL'];
};

export enum PublicBadgeStatus {
  Pending = 'PENDING',
  Approved = 'APPROVED',
  Signed = 'SIGNED',
  Rejected = 'REJECTED'
}

export type Query = {
  getAllBadges: Maybe<Array<Maybe<PublicBadge>>>;
  getValueCase: Maybe<ValueCase>;
};


export type QueryGetAllBadgesArgs = {
  domainName: Scalars['URL'];
  language: Maybe<Language>;
};


export type QueryGetValueCaseArgs = {
  valueCaseId: Scalars['GUID'];
  language: Maybe<Language>;
};

export type RejectedPublicBadge = PublicBadge & {
  badgeId: Scalars['GUID'];
  status: PublicBadgeStatus;
  valueCaseId: Scalars['ID'];
  valueCase: ValueCase;
  name: Scalars['String'];
  tags: Array<Maybe<Scalars['String']>>;
  description: Scalars['String'];
  narrative: Scalars['String'];
  recipientId: Scalars['ID'];
  evidence: Array<Proof>;
  recipient: ApprovedOrganization;
};

export type Scenario = {
  description: Scalars['String'];
  narrative: Array<Scalars['String']>;
};

export type SignedPublicBadge = PublicBadge & {
  badgeId: Scalars['GUID'];
  status: PublicBadgeStatus;
  valueCaseId: Scalars['ID'];
  valueCase: ValueCase;
  name: Scalars['String'];
  tags: Array<Maybe<Scalars['String']>>;
  description: Scalars['String'];
  narrative: Scalars['String'];
  recipientId: Scalars['ID'];
  evidence: Array<Proof>;
  issuedOn: Scalars['String'];
  expires: Scalars['String'];
  artifact: OpenBadgeArtifact;
  recipient: ApprovedOrganization;
};


export type ValueCase = {
  valueCaseId: Scalars['GUID'];
  image: Scalars['URL'];
  name: Scalars['String'];
  tags: Array<Maybe<Scalars['String']>>;
  proposedBy: Organization;
  approvedBy: Scalars['String'];
  description: Scalars['String'];
  narrative: Scalars['String'];
  scenarios: Array<Scenario>;
  localization: Maybe<Localization>;
};

export type ValueCaseInput = {
  domainName: Scalars['URL'];
  name: Scalars['String'];
  tags: Array<Maybe<Scalars['String']>>;
  narrative: Scalars['String'];
  description: Scalars['String'];
};

export type ValueCaseLocalization = {
  name: Scalars['String'];
  tags: Array<Maybe<Scalars['String']>>;
  description: Scalars['String'];
  narrative: Scalars['String'];
  scenarios: Array<Scenario>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  ApprovedOrganization: ResolverTypeWrapper<ApprovedOrganization>;
  String: ResolverTypeWrapper<Scalars['String']>;
  ApprovedPublicBadge: ResolverTypeWrapper<Omit<ApprovedPublicBadge, 'valueCase'> & { valueCase: ResolversTypes['ValueCase'] }>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Contact: ResolverTypeWrapper<Contact>;
  ContactInput: ContactInput;
  EmailAddress: ResolverTypeWrapper<Scalars['EmailAddress']>;
  GUID: ResolverTypeWrapper<Scalars['GUID']>;
  Issuer: ResolverTypeWrapper<Issuer>;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  Language: Language;
  Localization: ResolverTypeWrapper<Localization>;
  Mutation: ResolverTypeWrapper<{}>;
  OpenBadge: ResolverTypeWrapper<OpenBadge>;
  OpenBadgeArtifact: ResolverTypeWrapper<OpenBadgesArtifactProxy>;
  OpenBadgeClass: ResolverTypeWrapper<OpenBadgeClass>;
  OpenBadgeCriteria: ResolverTypeWrapper<OpenBadgeCriteria>;
  OpenBadgeProof: ResolverTypeWrapper<OpenBadgeProof>;
  OpenBadgeRecipient: ResolverTypeWrapper<OpenBadgeRecipient>;
  Organization: ResolversTypes['ApprovedOrganization'] | ResolversTypes['PendingOrganization'];
  OrganizationInput: OrganizationInput;
  OrganizationStatus: OrganizationStatus;
  OrganizationValidation: OrganizationValidation;
  PendingOrganization: ResolverTypeWrapper<PendingOrganization>;
  PendingPublicBadge: ResolverTypeWrapper<Omit<PendingPublicBadge, 'valueCase'> & { valueCase: ResolversTypes['ValueCase'] }>;
  Proof: ResolverTypeWrapper<Proof>;
  PublicBadge: ResolverTypeWrapper<PublicBadgeProxy>;
  PublicBadgeInput: PublicBadgeInput;
  PublicBadgeStatus: PublicBadgeStatus;
  Query: ResolverTypeWrapper<{}>;
  RejectedPublicBadge: ResolverTypeWrapper<Omit<RejectedPublicBadge, 'valueCase'> & { valueCase: ResolversTypes['ValueCase'] }>;
  Scenario: ResolverTypeWrapper<Scenario>;
  SignedPublicBadge: ResolverTypeWrapper<Omit<SignedPublicBadge, 'valueCase' | 'artifact'> & { valueCase: ResolversTypes['ValueCase'], artifact: ResolversTypes['OpenBadgeArtifact'] }>;
  URL: ResolverTypeWrapper<Scalars['URL']>;
  ValueCase: ResolverTypeWrapper<ValueCaseProxy>;
  ValueCaseInput: ValueCaseInput;
  ValueCaseLocalization: ResolverTypeWrapper<ValueCaseLocalization>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  ApprovedOrganization: ApprovedOrganization;
  String: Scalars['String'];
  ApprovedPublicBadge: Omit<ApprovedPublicBadge, 'valueCase'> & { valueCase: ResolversParentTypes['ValueCase'] };
  ID: Scalars['ID'];
  Contact: Contact;
  ContactInput: ContactInput;
  EmailAddress: Scalars['EmailAddress'];
  GUID: Scalars['GUID'];
  Issuer: Issuer;
  JSON: Scalars['JSON'];
  Localization: Localization;
  Mutation: {};
  OpenBadge: OpenBadge;
  OpenBadgeArtifact: OpenBadgesArtifactProxy;
  OpenBadgeClass: OpenBadgeClass;
  OpenBadgeCriteria: OpenBadgeCriteria;
  OpenBadgeProof: OpenBadgeProof;
  OpenBadgeRecipient: OpenBadgeRecipient;
  Organization: ResolversParentTypes['ApprovedOrganization'] | ResolversParentTypes['PendingOrganization'];
  OrganizationInput: OrganizationInput;
  OrganizationValidation: OrganizationValidation;
  PendingOrganization: PendingOrganization;
  PendingPublicBadge: Omit<PendingPublicBadge, 'valueCase'> & { valueCase: ResolversParentTypes['ValueCase'] };
  Proof: Proof;
  PublicBadge: PublicBadgeProxy;
  PublicBadgeInput: PublicBadgeInput;
  Query: {};
  RejectedPublicBadge: Omit<RejectedPublicBadge, 'valueCase'> & { valueCase: ResolversParentTypes['ValueCase'] };
  Scenario: Scenario;
  SignedPublicBadge: Omit<SignedPublicBadge, 'valueCase' | 'artifact'> & { valueCase: ResolversParentTypes['ValueCase'], artifact: ResolversParentTypes['OpenBadgeArtifact'] };
  URL: Scalars['URL'];
  ValueCase: ValueCaseProxy;
  ValueCaseInput: ValueCaseInput;
  ValueCaseLocalization: ValueCaseLocalization;
  Boolean: Scalars['Boolean'];
}>;

export type ApprovedOrganizationResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['ApprovedOrganization'] = ResolversParentTypes['ApprovedOrganization']> = ResolversObject<{
  organizationId: Resolver<ResolversTypes['GUID'], ParentType, ContextType>;
  status: Resolver<ResolversTypes['OrganizationStatus'], ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  contact: Resolver<ResolversTypes['Contact'], ParentType, ContextType>;
  admin: Resolver<ResolversTypes['Contact'], ParentType, ContextType>;
  approvedBy: Resolver<ResolversTypes['EmailAddress'], ParentType, ContextType>;
  approvedOn: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  domainName: Resolver<ResolversTypes['URL'], ParentType, ContextType>;
  urls: Resolver<Maybe<Array<Maybe<ResolversTypes['URL']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ApprovedPublicBadgeResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['ApprovedPublicBadge'] = ResolversParentTypes['ApprovedPublicBadge']> = ResolversObject<{
  badgeId: Resolver<ResolversTypes['GUID'], ParentType, ContextType>;
  status: Resolver<ResolversTypes['PublicBadgeStatus'], ParentType, ContextType>;
  valueCaseId: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  valueCase: Resolver<ResolversTypes['ValueCase'], ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tags: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  description: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  narrative: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  recipientId: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  evidence: Resolver<Array<ResolversTypes['Proof']>, ParentType, ContextType>;
  recipient: Resolver<ResolversTypes['ApprovedOrganization'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ContactResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Contact'] = ResolversParentTypes['Contact']> = ResolversObject<{
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email: Resolver<ResolversTypes['EmailAddress'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface EmailAddressScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['EmailAddress'], any> {
  name: 'EmailAddress';
}

export interface GuidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['GUID'], any> {
  name: 'GUID';
}

export type IssuerResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Issuer'] = ResolversParentTypes['Issuer']> = ResolversObject<{
  issuerId: Resolver<ResolversTypes['URL'], ParentType, ContextType>;
  type: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email: Resolver<ResolversTypes['EmailAddress'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type LocalizationResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Localization'] = ResolversParentTypes['Localization']> = ResolversObject<{
  NL: Resolver<Maybe<ResolversTypes['ValueCaseLocalization']>, ParentType, ContextType>;
  DE: Resolver<Maybe<ResolversTypes['ValueCaseLocalization']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  applyForBadge: Resolver<Maybe<ResolversTypes['PublicBadge']>, ParentType, ContextType, RequireFields<MutationApplyForBadgeArgs, 'input'>>;
  registerOrganization: Resolver<Maybe<ResolversTypes['PendingOrganization']>, ParentType, ContextType, RequireFields<MutationRegisterOrganizationArgs, 'input'>>;
  approveOrganization: Resolver<Maybe<ResolversTypes['ApprovedOrganization']>, ParentType, ContextType, RequireFields<MutationApproveOrganizationArgs, 'input'>>;
}>;

export type OpenBadgeResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['OpenBadge'] = ResolversParentTypes['OpenBadge']> = ResolversObject<{
  id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  badge: Resolver<ResolversTypes['OpenBadgeClass'], ParentType, ContextType>;
  recipient: Resolver<ResolversTypes['OpenBadgeRecipient'], ParentType, ContextType>;
  issuedOn: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  expires: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  evidence: Resolver<Array<Maybe<ResolversTypes['OpenBadgeProof']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type OpenBadgeArtifactResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['OpenBadgeArtifact'] = ResolversParentTypes['OpenBadgeArtifact']> = ResolversObject<{
  signature: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  json: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type OpenBadgeClassResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['OpenBadgeClass'] = ResolversParentTypes['OpenBadgeClass']> = ResolversObject<{
  id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tags: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  description: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  criteria: Resolver<ResolversTypes['OpenBadgeCriteria'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type OpenBadgeCriteriaResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['OpenBadgeCriteria'] = ResolversParentTypes['OpenBadgeCriteria']> = ResolversObject<{
  narrative: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type OpenBadgeProofResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['OpenBadgeProof'] = ResolversParentTypes['OpenBadgeProof']> = ResolversObject<{
  id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  genre: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  narrative: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type OpenBadgeRecipientResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['OpenBadgeRecipient'] = ResolversParentTypes['OpenBadgeRecipient']> = ResolversObject<{
  identity: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type OrganizationResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Organization'] = ResolversParentTypes['Organization']> = ResolversObject<{
  __resolveType: TypeResolveFn<'ApprovedOrganization' | 'PendingOrganization', ParentType, ContextType>;
  organizationId: Resolver<ResolversTypes['GUID'], ParentType, ContextType>;
  status: Resolver<ResolversTypes['OrganizationStatus'], ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  contact: Resolver<ResolversTypes['Contact'], ParentType, ContextType>;
  admin: Resolver<ResolversTypes['Contact'], ParentType, ContextType>;
  domainName: Resolver<ResolversTypes['URL'], ParentType, ContextType>;
  urls: Resolver<Maybe<Array<Maybe<ResolversTypes['URL']>>>, ParentType, ContextType>;
}>;

export type PendingOrganizationResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['PendingOrganization'] = ResolversParentTypes['PendingOrganization']> = ResolversObject<{
  organizationId: Resolver<ResolversTypes['GUID'], ParentType, ContextType>;
  approvalToken: Resolver<Maybe<ResolversTypes['GUID']>, ParentType, ContextType>;
  status: Resolver<ResolversTypes['OrganizationStatus'], ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  contact: Resolver<ResolversTypes['Contact'], ParentType, ContextType>;
  admin: Resolver<ResolversTypes['Contact'], ParentType, ContextType>;
  domainName: Resolver<ResolversTypes['URL'], ParentType, ContextType>;
  urls: Resolver<Maybe<Array<Maybe<ResolversTypes['URL']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PendingPublicBadgeResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['PendingPublicBadge'] = ResolversParentTypes['PendingPublicBadge']> = ResolversObject<{
  badgeId: Resolver<ResolversTypes['GUID'], ParentType, ContextType>;
  status: Resolver<ResolversTypes['PublicBadgeStatus'], ParentType, ContextType>;
  valueCaseId: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  valueCase: Resolver<ResolversTypes['ValueCase'], ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tags: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  description: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  narrative: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  recipientId: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  recipient: Resolver<ResolversTypes['ApprovedOrganization'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProofResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Proof'] = ResolversParentTypes['Proof']> = ResolversObject<{
  proofId: Resolver<ResolversTypes['GUID'], ParentType, ContextType>;
  genre: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  narrative: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PublicBadgeResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['PublicBadge'] = ResolversParentTypes['PublicBadge']> = ResolversObject<{
  __resolveType: TypeResolveFn<'ApprovedPublicBadge' | 'PendingPublicBadge' | 'RejectedPublicBadge' | 'SignedPublicBadge', ParentType, ContextType>;
  badgeId: Resolver<ResolversTypes['GUID'], ParentType, ContextType>;
  status: Resolver<ResolversTypes['PublicBadgeStatus'], ParentType, ContextType>;
  valueCaseId: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  valueCase: Resolver<ResolversTypes['ValueCase'], ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tags: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  description: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  narrative: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  recipientId: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  recipient: Resolver<ResolversTypes['ApprovedOrganization'], ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  getAllBadges: Resolver<Maybe<Array<Maybe<ResolversTypes['PublicBadge']>>>, ParentType, ContextType, RequireFields<QueryGetAllBadgesArgs, 'domainName'>>;
  getValueCase: Resolver<Maybe<ResolversTypes['ValueCase']>, ParentType, ContextType, RequireFields<QueryGetValueCaseArgs, 'valueCaseId'>>;
}>;

export type RejectedPublicBadgeResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['RejectedPublicBadge'] = ResolversParentTypes['RejectedPublicBadge']> = ResolversObject<{
  badgeId: Resolver<ResolversTypes['GUID'], ParentType, ContextType>;
  status: Resolver<ResolversTypes['PublicBadgeStatus'], ParentType, ContextType>;
  valueCaseId: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  valueCase: Resolver<ResolversTypes['ValueCase'], ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tags: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  description: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  narrative: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  recipientId: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  evidence: Resolver<Array<ResolversTypes['Proof']>, ParentType, ContextType>;
  recipient: Resolver<ResolversTypes['ApprovedOrganization'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ScenarioResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Scenario'] = ResolversParentTypes['Scenario']> = ResolversObject<{
  description: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  narrative: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SignedPublicBadgeResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['SignedPublicBadge'] = ResolversParentTypes['SignedPublicBadge']> = ResolversObject<{
  badgeId: Resolver<ResolversTypes['GUID'], ParentType, ContextType>;
  status: Resolver<ResolversTypes['PublicBadgeStatus'], ParentType, ContextType>;
  valueCaseId: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  valueCase: Resolver<ResolversTypes['ValueCase'], ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tags: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  description: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  narrative: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  recipientId: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  evidence: Resolver<Array<ResolversTypes['Proof']>, ParentType, ContextType>;
  issuedOn: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  expires: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  artifact: Resolver<ResolversTypes['OpenBadgeArtifact'], ParentType, ContextType>;
  recipient: Resolver<ResolversTypes['ApprovedOrganization'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface UrlScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['URL'], any> {
  name: 'URL';
}

export type ValueCaseResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['ValueCase'] = ResolversParentTypes['ValueCase']> = ResolversObject<{
  valueCaseId: Resolver<ResolversTypes['GUID'], ParentType, ContextType>;
  image: Resolver<ResolversTypes['URL'], ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tags: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  proposedBy: Resolver<ResolversTypes['Organization'], ParentType, ContextType>;
  approvedBy: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  narrative: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  scenarios: Resolver<Array<ResolversTypes['Scenario']>, ParentType, ContextType>;
  localization: Resolver<Maybe<ResolversTypes['Localization']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ValueCaseLocalizationResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['ValueCaseLocalization'] = ResolversParentTypes['ValueCaseLocalization']> = ResolversObject<{
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tags: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  description: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  narrative: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  scenarios: Resolver<Array<ResolversTypes['Scenario']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = ApolloContext> = ResolversObject<{
  ApprovedOrganization: ApprovedOrganizationResolvers<ContextType>;
  ApprovedPublicBadge: ApprovedPublicBadgeResolvers<ContextType>;
  Contact: ContactResolvers<ContextType>;
  EmailAddress: GraphQLScalarType;
  GUID: GraphQLScalarType;
  Issuer: IssuerResolvers<ContextType>;
  JSON: GraphQLScalarType;
  Localization: LocalizationResolvers<ContextType>;
  Mutation: MutationResolvers<ContextType>;
  OpenBadge: OpenBadgeResolvers<ContextType>;
  OpenBadgeArtifact: OpenBadgeArtifactResolvers<ContextType>;
  OpenBadgeClass: OpenBadgeClassResolvers<ContextType>;
  OpenBadgeCriteria: OpenBadgeCriteriaResolvers<ContextType>;
  OpenBadgeProof: OpenBadgeProofResolvers<ContextType>;
  OpenBadgeRecipient: OpenBadgeRecipientResolvers<ContextType>;
  Organization: OrganizationResolvers<ContextType>;
  PendingOrganization: PendingOrganizationResolvers<ContextType>;
  PendingPublicBadge: PendingPublicBadgeResolvers<ContextType>;
  Proof: ProofResolvers<ContextType>;
  PublicBadge: PublicBadgeResolvers<ContextType>;
  Query: QueryResolvers<ContextType>;
  RejectedPublicBadge: RejectedPublicBadgeResolvers<ContextType>;
  Scenario: ScenarioResolvers<ContextType>;
  SignedPublicBadge: SignedPublicBadgeResolvers<ContextType>;
  URL: GraphQLScalarType;
  ValueCase: ValueCaseResolvers<ContextType>;
  ValueCaseLocalization: ValueCaseLocalizationResolvers<ContextType>;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = ApolloContext> = Resolvers<ContextType>;
