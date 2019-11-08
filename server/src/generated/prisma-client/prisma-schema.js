module.exports = {
        typeDefs: // Code generated by Prisma (prisma@1.34.10). DO NOT EDIT.
  // Please don't change this file manually but run `prisma generate` to update it.
  // For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

/* GraphQL */ `type AggregateChild {
  count: Int!
}

type AggregateChildVaccination {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type AggregateUserVaccination {
  count: Int!
}

type AggregateVaccination {
  count: Int!
}

type BatchPayload {
  count: Long!
}

type Child {
  id: ID!
  parent: User!
  name: String!
  born: DateTime!
  vaccinations(where: ChildVaccinationWhereInput, orderBy: ChildVaccinationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ChildVaccination!]
}

type ChildConnection {
  pageInfo: PageInfo!
  edges: [ChildEdge]!
  aggregate: AggregateChild!
}

input ChildCreateInput {
  id: ID
  parent: UserCreateOneWithoutChildrenInput!
  name: String!
  born: DateTime!
  vaccinations: ChildVaccinationCreateManyWithoutChildInput
}

input ChildCreateManyWithoutParentInput {
  create: [ChildCreateWithoutParentInput!]
  connect: [ChildWhereUniqueInput!]
}

input ChildCreateOneWithoutVaccinationsInput {
  create: ChildCreateWithoutVaccinationsInput
  connect: ChildWhereUniqueInput
}

input ChildCreateWithoutParentInput {
  id: ID
  name: String!
  born: DateTime!
  vaccinations: ChildVaccinationCreateManyWithoutChildInput
}

input ChildCreateWithoutVaccinationsInput {
  id: ID
  parent: UserCreateOneWithoutChildrenInput!
  name: String!
  born: DateTime!
}

type ChildEdge {
  node: Child!
  cursor: String!
}

enum ChildOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  born_ASC
  born_DESC
}

type ChildPreviousValues {
  id: ID!
  name: String!
  born: DateTime!
}

input ChildScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  born: DateTime
  born_not: DateTime
  born_in: [DateTime!]
  born_not_in: [DateTime!]
  born_lt: DateTime
  born_lte: DateTime
  born_gt: DateTime
  born_gte: DateTime
  AND: [ChildScalarWhereInput!]
  OR: [ChildScalarWhereInput!]
  NOT: [ChildScalarWhereInput!]
}

type ChildSubscriptionPayload {
  mutation: MutationType!
  node: Child
  updatedFields: [String!]
  previousValues: ChildPreviousValues
}

input ChildSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ChildWhereInput
  AND: [ChildSubscriptionWhereInput!]
  OR: [ChildSubscriptionWhereInput!]
  NOT: [ChildSubscriptionWhereInput!]
}

input ChildUpdateInput {
  parent: UserUpdateOneRequiredWithoutChildrenInput
  name: String
  born: DateTime
  vaccinations: ChildVaccinationUpdateManyWithoutChildInput
}

input ChildUpdateManyDataInput {
  name: String
  born: DateTime
}

input ChildUpdateManyMutationInput {
  name: String
  born: DateTime
}

input ChildUpdateManyWithoutParentInput {
  create: [ChildCreateWithoutParentInput!]
  delete: [ChildWhereUniqueInput!]
  connect: [ChildWhereUniqueInput!]
  set: [ChildWhereUniqueInput!]
  disconnect: [ChildWhereUniqueInput!]
  update: [ChildUpdateWithWhereUniqueWithoutParentInput!]
  upsert: [ChildUpsertWithWhereUniqueWithoutParentInput!]
  deleteMany: [ChildScalarWhereInput!]
  updateMany: [ChildUpdateManyWithWhereNestedInput!]
}

input ChildUpdateManyWithWhereNestedInput {
  where: ChildScalarWhereInput!
  data: ChildUpdateManyDataInput!
}

input ChildUpdateOneRequiredWithoutVaccinationsInput {
  create: ChildCreateWithoutVaccinationsInput
  update: ChildUpdateWithoutVaccinationsDataInput
  upsert: ChildUpsertWithoutVaccinationsInput
  connect: ChildWhereUniqueInput
}

input ChildUpdateWithoutParentDataInput {
  name: String
  born: DateTime
  vaccinations: ChildVaccinationUpdateManyWithoutChildInput
}

input ChildUpdateWithoutVaccinationsDataInput {
  parent: UserUpdateOneRequiredWithoutChildrenInput
  name: String
  born: DateTime
}

input ChildUpdateWithWhereUniqueWithoutParentInput {
  where: ChildWhereUniqueInput!
  data: ChildUpdateWithoutParentDataInput!
}

input ChildUpsertWithoutVaccinationsInput {
  update: ChildUpdateWithoutVaccinationsDataInput!
  create: ChildCreateWithoutVaccinationsInput!
}

input ChildUpsertWithWhereUniqueWithoutParentInput {
  where: ChildWhereUniqueInput!
  update: ChildUpdateWithoutParentDataInput!
  create: ChildCreateWithoutParentInput!
}

type ChildVaccination {
  id: ID!
  child: Child!
  type: Vaccination!
  createdAt: DateTime!
  takenAt: DateTime!
  untilNext: String
  protectDuration: String
}

type ChildVaccinationConnection {
  pageInfo: PageInfo!
  edges: [ChildVaccinationEdge]!
  aggregate: AggregateChildVaccination!
}

input ChildVaccinationCreateInput {
  id: ID
  child: ChildCreateOneWithoutVaccinationsInput!
  type: VaccinationCreateOneInput!
  takenAt: DateTime!
  untilNext: String
  protectDuration: String
}

input ChildVaccinationCreateManyWithoutChildInput {
  create: [ChildVaccinationCreateWithoutChildInput!]
  connect: [ChildVaccinationWhereUniqueInput!]
}

input ChildVaccinationCreateWithoutChildInput {
  id: ID
  type: VaccinationCreateOneInput!
  takenAt: DateTime!
  untilNext: String
  protectDuration: String
}

type ChildVaccinationEdge {
  node: ChildVaccination!
  cursor: String!
}

enum ChildVaccinationOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  takenAt_ASC
  takenAt_DESC
  untilNext_ASC
  untilNext_DESC
  protectDuration_ASC
  protectDuration_DESC
}

type ChildVaccinationPreviousValues {
  id: ID!
  createdAt: DateTime!
  takenAt: DateTime!
  untilNext: String
  protectDuration: String
}

input ChildVaccinationScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  takenAt: DateTime
  takenAt_not: DateTime
  takenAt_in: [DateTime!]
  takenAt_not_in: [DateTime!]
  takenAt_lt: DateTime
  takenAt_lte: DateTime
  takenAt_gt: DateTime
  takenAt_gte: DateTime
  untilNext: String
  untilNext_not: String
  untilNext_in: [String!]
  untilNext_not_in: [String!]
  untilNext_lt: String
  untilNext_lte: String
  untilNext_gt: String
  untilNext_gte: String
  untilNext_contains: String
  untilNext_not_contains: String
  untilNext_starts_with: String
  untilNext_not_starts_with: String
  untilNext_ends_with: String
  untilNext_not_ends_with: String
  protectDuration: String
  protectDuration_not: String
  protectDuration_in: [String!]
  protectDuration_not_in: [String!]
  protectDuration_lt: String
  protectDuration_lte: String
  protectDuration_gt: String
  protectDuration_gte: String
  protectDuration_contains: String
  protectDuration_not_contains: String
  protectDuration_starts_with: String
  protectDuration_not_starts_with: String
  protectDuration_ends_with: String
  protectDuration_not_ends_with: String
  AND: [ChildVaccinationScalarWhereInput!]
  OR: [ChildVaccinationScalarWhereInput!]
  NOT: [ChildVaccinationScalarWhereInput!]
}

type ChildVaccinationSubscriptionPayload {
  mutation: MutationType!
  node: ChildVaccination
  updatedFields: [String!]
  previousValues: ChildVaccinationPreviousValues
}

input ChildVaccinationSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ChildVaccinationWhereInput
  AND: [ChildVaccinationSubscriptionWhereInput!]
  OR: [ChildVaccinationSubscriptionWhereInput!]
  NOT: [ChildVaccinationSubscriptionWhereInput!]
}

input ChildVaccinationUpdateInput {
  child: ChildUpdateOneRequiredWithoutVaccinationsInput
  type: VaccinationUpdateOneRequiredInput
  takenAt: DateTime
  untilNext: String
  protectDuration: String
}

input ChildVaccinationUpdateManyDataInput {
  takenAt: DateTime
  untilNext: String
  protectDuration: String
}

input ChildVaccinationUpdateManyMutationInput {
  takenAt: DateTime
  untilNext: String
  protectDuration: String
}

input ChildVaccinationUpdateManyWithoutChildInput {
  create: [ChildVaccinationCreateWithoutChildInput!]
  delete: [ChildVaccinationWhereUniqueInput!]
  connect: [ChildVaccinationWhereUniqueInput!]
  set: [ChildVaccinationWhereUniqueInput!]
  disconnect: [ChildVaccinationWhereUniqueInput!]
  update: [ChildVaccinationUpdateWithWhereUniqueWithoutChildInput!]
  upsert: [ChildVaccinationUpsertWithWhereUniqueWithoutChildInput!]
  deleteMany: [ChildVaccinationScalarWhereInput!]
  updateMany: [ChildVaccinationUpdateManyWithWhereNestedInput!]
}

input ChildVaccinationUpdateManyWithWhereNestedInput {
  where: ChildVaccinationScalarWhereInput!
  data: ChildVaccinationUpdateManyDataInput!
}

input ChildVaccinationUpdateWithoutChildDataInput {
  type: VaccinationUpdateOneRequiredInput
  takenAt: DateTime
  untilNext: String
  protectDuration: String
}

input ChildVaccinationUpdateWithWhereUniqueWithoutChildInput {
  where: ChildVaccinationWhereUniqueInput!
  data: ChildVaccinationUpdateWithoutChildDataInput!
}

input ChildVaccinationUpsertWithWhereUniqueWithoutChildInput {
  where: ChildVaccinationWhereUniqueInput!
  update: ChildVaccinationUpdateWithoutChildDataInput!
  create: ChildVaccinationCreateWithoutChildInput!
}

input ChildVaccinationWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  child: ChildWhereInput
  type: VaccinationWhereInput
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  takenAt: DateTime
  takenAt_not: DateTime
  takenAt_in: [DateTime!]
  takenAt_not_in: [DateTime!]
  takenAt_lt: DateTime
  takenAt_lte: DateTime
  takenAt_gt: DateTime
  takenAt_gte: DateTime
  untilNext: String
  untilNext_not: String
  untilNext_in: [String!]
  untilNext_not_in: [String!]
  untilNext_lt: String
  untilNext_lte: String
  untilNext_gt: String
  untilNext_gte: String
  untilNext_contains: String
  untilNext_not_contains: String
  untilNext_starts_with: String
  untilNext_not_starts_with: String
  untilNext_ends_with: String
  untilNext_not_ends_with: String
  protectDuration: String
  protectDuration_not: String
  protectDuration_in: [String!]
  protectDuration_not_in: [String!]
  protectDuration_lt: String
  protectDuration_lte: String
  protectDuration_gt: String
  protectDuration_gte: String
  protectDuration_contains: String
  protectDuration_not_contains: String
  protectDuration_starts_with: String
  protectDuration_not_starts_with: String
  protectDuration_ends_with: String
  protectDuration_not_ends_with: String
  AND: [ChildVaccinationWhereInput!]
  OR: [ChildVaccinationWhereInput!]
  NOT: [ChildVaccinationWhereInput!]
}

input ChildVaccinationWhereUniqueInput {
  id: ID
}

input ChildWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  parent: UserWhereInput
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  born: DateTime
  born_not: DateTime
  born_in: [DateTime!]
  born_not_in: [DateTime!]
  born_lt: DateTime
  born_lte: DateTime
  born_gt: DateTime
  born_gte: DateTime
  vaccinations_every: ChildVaccinationWhereInput
  vaccinations_some: ChildVaccinationWhereInput
  vaccinations_none: ChildVaccinationWhereInput
  AND: [ChildWhereInput!]
  OR: [ChildWhereInput!]
  NOT: [ChildWhereInput!]
}

input ChildWhereUniqueInput {
  id: ID
}

scalar DateTime

scalar Long

type Mutation {
  createChild(data: ChildCreateInput!): Child!
  updateChild(data: ChildUpdateInput!, where: ChildWhereUniqueInput!): Child
  updateManyChildren(data: ChildUpdateManyMutationInput!, where: ChildWhereInput): BatchPayload!
  upsertChild(where: ChildWhereUniqueInput!, create: ChildCreateInput!, update: ChildUpdateInput!): Child!
  deleteChild(where: ChildWhereUniqueInput!): Child
  deleteManyChildren(where: ChildWhereInput): BatchPayload!
  createChildVaccination(data: ChildVaccinationCreateInput!): ChildVaccination!
  updateChildVaccination(data: ChildVaccinationUpdateInput!, where: ChildVaccinationWhereUniqueInput!): ChildVaccination
  updateManyChildVaccinations(data: ChildVaccinationUpdateManyMutationInput!, where: ChildVaccinationWhereInput): BatchPayload!
  upsertChildVaccination(where: ChildVaccinationWhereUniqueInput!, create: ChildVaccinationCreateInput!, update: ChildVaccinationUpdateInput!): ChildVaccination!
  deleteChildVaccination(where: ChildVaccinationWhereUniqueInput!): ChildVaccination
  deleteManyChildVaccinations(where: ChildVaccinationWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
  createUserVaccination(data: UserVaccinationCreateInput!): UserVaccination!
  updateUserVaccination(data: UserVaccinationUpdateInput!, where: UserVaccinationWhereUniqueInput!): UserVaccination
  updateManyUserVaccinations(data: UserVaccinationUpdateManyMutationInput!, where: UserVaccinationWhereInput): BatchPayload!
  upsertUserVaccination(where: UserVaccinationWhereUniqueInput!, create: UserVaccinationCreateInput!, update: UserVaccinationUpdateInput!): UserVaccination!
  deleteUserVaccination(where: UserVaccinationWhereUniqueInput!): UserVaccination
  deleteManyUserVaccinations(where: UserVaccinationWhereInput): BatchPayload!
  createVaccination(data: VaccinationCreateInput!): Vaccination!
  updateVaccination(data: VaccinationUpdateInput!, where: VaccinationWhereUniqueInput!): Vaccination
  updateManyVaccinations(data: VaccinationUpdateManyMutationInput!, where: VaccinationWhereInput): BatchPayload!
  upsertVaccination(where: VaccinationWhereUniqueInput!, create: VaccinationCreateInput!, update: VaccinationUpdateInput!): Vaccination!
  deleteVaccination(where: VaccinationWhereUniqueInput!): Vaccination
  deleteManyVaccinations(where: VaccinationWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Query {
  child(where: ChildWhereUniqueInput!): Child
  children(where: ChildWhereInput, orderBy: ChildOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Child]!
  childrenConnection(where: ChildWhereInput, orderBy: ChildOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ChildConnection!
  childVaccination(where: ChildVaccinationWhereUniqueInput!): ChildVaccination
  childVaccinations(where: ChildVaccinationWhereInput, orderBy: ChildVaccinationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ChildVaccination]!
  childVaccinationsConnection(where: ChildVaccinationWhereInput, orderBy: ChildVaccinationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ChildVaccinationConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  userVaccination(where: UserVaccinationWhereUniqueInput!): UserVaccination
  userVaccinations(where: UserVaccinationWhereInput, orderBy: UserVaccinationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [UserVaccination]!
  userVaccinationsConnection(where: UserVaccinationWhereInput, orderBy: UserVaccinationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserVaccinationConnection!
  vaccination(where: VaccinationWhereUniqueInput!): Vaccination
  vaccinations(where: VaccinationWhereInput, orderBy: VaccinationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Vaccination]!
  vaccinationsConnection(where: VaccinationWhereInput, orderBy: VaccinationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): VaccinationConnection!
  node(id: ID!): Node
}

type Subscription {
  child(where: ChildSubscriptionWhereInput): ChildSubscriptionPayload
  childVaccination(where: ChildVaccinationSubscriptionWhereInput): ChildVaccinationSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
  userVaccination(where: UserVaccinationSubscriptionWhereInput): UserVaccinationSubscriptionPayload
  vaccination(where: VaccinationSubscriptionWhereInput): VaccinationSubscriptionPayload
}

type User {
  id: ID!
  name: String!
  email: String!
  password: String!
  born: DateTime!
  vaccinations(where: UserVaccinationWhereInput, orderBy: UserVaccinationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [UserVaccination!]
  children(where: ChildWhereInput, orderBy: ChildOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Child!]
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  id: ID
  name: String!
  email: String!
  password: String!
  born: DateTime!
  vaccinations: UserVaccinationCreateManyWithoutUserInput
  children: ChildCreateManyWithoutParentInput
}

input UserCreateOneWithoutChildrenInput {
  create: UserCreateWithoutChildrenInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutVaccinationsInput {
  create: UserCreateWithoutVaccinationsInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutChildrenInput {
  id: ID
  name: String!
  email: String!
  password: String!
  born: DateTime!
  vaccinations: UserVaccinationCreateManyWithoutUserInput
}

input UserCreateWithoutVaccinationsInput {
  id: ID
  name: String!
  email: String!
  password: String!
  born: DateTime!
  children: ChildCreateManyWithoutParentInput
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  email_ASC
  email_DESC
  password_ASC
  password_DESC
  born_ASC
  born_DESC
}

type UserPreviousValues {
  id: ID!
  name: String!
  email: String!
  password: String!
  born: DateTime!
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateInput {
  name: String
  email: String
  password: String
  born: DateTime
  vaccinations: UserVaccinationUpdateManyWithoutUserInput
  children: ChildUpdateManyWithoutParentInput
}

input UserUpdateManyMutationInput {
  name: String
  email: String
  password: String
  born: DateTime
}

input UserUpdateOneRequiredWithoutChildrenInput {
  create: UserCreateWithoutChildrenInput
  update: UserUpdateWithoutChildrenDataInput
  upsert: UserUpsertWithoutChildrenInput
  connect: UserWhereUniqueInput
}

input UserUpdateOneRequiredWithoutVaccinationsInput {
  create: UserCreateWithoutVaccinationsInput
  update: UserUpdateWithoutVaccinationsDataInput
  upsert: UserUpsertWithoutVaccinationsInput
  connect: UserWhereUniqueInput
}

input UserUpdateWithoutChildrenDataInput {
  name: String
  email: String
  password: String
  born: DateTime
  vaccinations: UserVaccinationUpdateManyWithoutUserInput
}

input UserUpdateWithoutVaccinationsDataInput {
  name: String
  email: String
  password: String
  born: DateTime
  children: ChildUpdateManyWithoutParentInput
}

input UserUpsertWithoutChildrenInput {
  update: UserUpdateWithoutChildrenDataInput!
  create: UserCreateWithoutChildrenInput!
}

input UserUpsertWithoutVaccinationsInput {
  update: UserUpdateWithoutVaccinationsDataInput!
  create: UserCreateWithoutVaccinationsInput!
}

type UserVaccination {
  id: ID!
  user: User!
  type: Vaccination!
  createdAt: DateTime!
  takenAt: DateTime
  untilNext: String
  protectDuration: String
}

type UserVaccinationConnection {
  pageInfo: PageInfo!
  edges: [UserVaccinationEdge]!
  aggregate: AggregateUserVaccination!
}

input UserVaccinationCreateInput {
  id: ID
  user: UserCreateOneWithoutVaccinationsInput!
  type: VaccinationCreateOneInput!
  takenAt: DateTime
  untilNext: String
  protectDuration: String
}

input UserVaccinationCreateManyWithoutUserInput {
  create: [UserVaccinationCreateWithoutUserInput!]
  connect: [UserVaccinationWhereUniqueInput!]
}

input UserVaccinationCreateWithoutUserInput {
  id: ID
  type: VaccinationCreateOneInput!
  takenAt: DateTime
  untilNext: String
  protectDuration: String
}

type UserVaccinationEdge {
  node: UserVaccination!
  cursor: String!
}

enum UserVaccinationOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  takenAt_ASC
  takenAt_DESC
  untilNext_ASC
  untilNext_DESC
  protectDuration_ASC
  protectDuration_DESC
}

type UserVaccinationPreviousValues {
  id: ID!
  createdAt: DateTime!
  takenAt: DateTime
  untilNext: String
  protectDuration: String
}

input UserVaccinationScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  takenAt: DateTime
  takenAt_not: DateTime
  takenAt_in: [DateTime!]
  takenAt_not_in: [DateTime!]
  takenAt_lt: DateTime
  takenAt_lte: DateTime
  takenAt_gt: DateTime
  takenAt_gte: DateTime
  untilNext: String
  untilNext_not: String
  untilNext_in: [String!]
  untilNext_not_in: [String!]
  untilNext_lt: String
  untilNext_lte: String
  untilNext_gt: String
  untilNext_gte: String
  untilNext_contains: String
  untilNext_not_contains: String
  untilNext_starts_with: String
  untilNext_not_starts_with: String
  untilNext_ends_with: String
  untilNext_not_ends_with: String
  protectDuration: String
  protectDuration_not: String
  protectDuration_in: [String!]
  protectDuration_not_in: [String!]
  protectDuration_lt: String
  protectDuration_lte: String
  protectDuration_gt: String
  protectDuration_gte: String
  protectDuration_contains: String
  protectDuration_not_contains: String
  protectDuration_starts_with: String
  protectDuration_not_starts_with: String
  protectDuration_ends_with: String
  protectDuration_not_ends_with: String
  AND: [UserVaccinationScalarWhereInput!]
  OR: [UserVaccinationScalarWhereInput!]
  NOT: [UserVaccinationScalarWhereInput!]
}

type UserVaccinationSubscriptionPayload {
  mutation: MutationType!
  node: UserVaccination
  updatedFields: [String!]
  previousValues: UserVaccinationPreviousValues
}

input UserVaccinationSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserVaccinationWhereInput
  AND: [UserVaccinationSubscriptionWhereInput!]
  OR: [UserVaccinationSubscriptionWhereInput!]
  NOT: [UserVaccinationSubscriptionWhereInput!]
}

input UserVaccinationUpdateInput {
  user: UserUpdateOneRequiredWithoutVaccinationsInput
  type: VaccinationUpdateOneRequiredInput
  takenAt: DateTime
  untilNext: String
  protectDuration: String
}

input UserVaccinationUpdateManyDataInput {
  takenAt: DateTime
  untilNext: String
  protectDuration: String
}

input UserVaccinationUpdateManyMutationInput {
  takenAt: DateTime
  untilNext: String
  protectDuration: String
}

input UserVaccinationUpdateManyWithoutUserInput {
  create: [UserVaccinationCreateWithoutUserInput!]
  delete: [UserVaccinationWhereUniqueInput!]
  connect: [UserVaccinationWhereUniqueInput!]
  set: [UserVaccinationWhereUniqueInput!]
  disconnect: [UserVaccinationWhereUniqueInput!]
  update: [UserVaccinationUpdateWithWhereUniqueWithoutUserInput!]
  upsert: [UserVaccinationUpsertWithWhereUniqueWithoutUserInput!]
  deleteMany: [UserVaccinationScalarWhereInput!]
  updateMany: [UserVaccinationUpdateManyWithWhereNestedInput!]
}

input UserVaccinationUpdateManyWithWhereNestedInput {
  where: UserVaccinationScalarWhereInput!
  data: UserVaccinationUpdateManyDataInput!
}

input UserVaccinationUpdateWithoutUserDataInput {
  type: VaccinationUpdateOneRequiredInput
  takenAt: DateTime
  untilNext: String
  protectDuration: String
}

input UserVaccinationUpdateWithWhereUniqueWithoutUserInput {
  where: UserVaccinationWhereUniqueInput!
  data: UserVaccinationUpdateWithoutUserDataInput!
}

input UserVaccinationUpsertWithWhereUniqueWithoutUserInput {
  where: UserVaccinationWhereUniqueInput!
  update: UserVaccinationUpdateWithoutUserDataInput!
  create: UserVaccinationCreateWithoutUserInput!
}

input UserVaccinationWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  user: UserWhereInput
  type: VaccinationWhereInput
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  takenAt: DateTime
  takenAt_not: DateTime
  takenAt_in: [DateTime!]
  takenAt_not_in: [DateTime!]
  takenAt_lt: DateTime
  takenAt_lte: DateTime
  takenAt_gt: DateTime
  takenAt_gte: DateTime
  untilNext: String
  untilNext_not: String
  untilNext_in: [String!]
  untilNext_not_in: [String!]
  untilNext_lt: String
  untilNext_lte: String
  untilNext_gt: String
  untilNext_gte: String
  untilNext_contains: String
  untilNext_not_contains: String
  untilNext_starts_with: String
  untilNext_not_starts_with: String
  untilNext_ends_with: String
  untilNext_not_ends_with: String
  protectDuration: String
  protectDuration_not: String
  protectDuration_in: [String!]
  protectDuration_not_in: [String!]
  protectDuration_lt: String
  protectDuration_lte: String
  protectDuration_gt: String
  protectDuration_gte: String
  protectDuration_contains: String
  protectDuration_not_contains: String
  protectDuration_starts_with: String
  protectDuration_not_starts_with: String
  protectDuration_ends_with: String
  protectDuration_not_ends_with: String
  AND: [UserVaccinationWhereInput!]
  OR: [UserVaccinationWhereInput!]
  NOT: [UserVaccinationWhereInput!]
}

input UserVaccinationWhereUniqueInput {
  id: ID
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  password: String
  password_not: String
  password_in: [String!]
  password_not_in: [String!]
  password_lt: String
  password_lte: String
  password_gt: String
  password_gte: String
  password_contains: String
  password_not_contains: String
  password_starts_with: String
  password_not_starts_with: String
  password_ends_with: String
  password_not_ends_with: String
  born: DateTime
  born_not: DateTime
  born_in: [DateTime!]
  born_not_in: [DateTime!]
  born_lt: DateTime
  born_lte: DateTime
  born_gt: DateTime
  born_gte: DateTime
  vaccinations_every: UserVaccinationWhereInput
  vaccinations_some: UserVaccinationWhereInput
  vaccinations_none: UserVaccinationWhereInput
  children_every: ChildWhereInput
  children_some: ChildWhereInput
  children_none: ChildWhereInput
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  email: String
}

type Vaccination {
  id: ID!
  name: String!
  dose: Int
  url: String!
  untilNext: String
  protectDuration: String
}

type VaccinationConnection {
  pageInfo: PageInfo!
  edges: [VaccinationEdge]!
  aggregate: AggregateVaccination!
}

input VaccinationCreateInput {
  id: ID
  name: String!
  dose: Int
  url: String!
  untilNext: String
  protectDuration: String
}

input VaccinationCreateOneInput {
  create: VaccinationCreateInput
  connect: VaccinationWhereUniqueInput
}

type VaccinationEdge {
  node: Vaccination!
  cursor: String!
}

enum VaccinationOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  dose_ASC
  dose_DESC
  url_ASC
  url_DESC
  untilNext_ASC
  untilNext_DESC
  protectDuration_ASC
  protectDuration_DESC
}

type VaccinationPreviousValues {
  id: ID!
  name: String!
  dose: Int
  url: String!
  untilNext: String
  protectDuration: String
}

type VaccinationSubscriptionPayload {
  mutation: MutationType!
  node: Vaccination
  updatedFields: [String!]
  previousValues: VaccinationPreviousValues
}

input VaccinationSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: VaccinationWhereInput
  AND: [VaccinationSubscriptionWhereInput!]
  OR: [VaccinationSubscriptionWhereInput!]
  NOT: [VaccinationSubscriptionWhereInput!]
}

input VaccinationUpdateDataInput {
  name: String
  dose: Int
  url: String
  untilNext: String
  protectDuration: String
}

input VaccinationUpdateInput {
  name: String
  dose: Int
  url: String
  untilNext: String
  protectDuration: String
}

input VaccinationUpdateManyMutationInput {
  name: String
  dose: Int
  url: String
  untilNext: String
  protectDuration: String
}

input VaccinationUpdateOneRequiredInput {
  create: VaccinationCreateInput
  update: VaccinationUpdateDataInput
  upsert: VaccinationUpsertNestedInput
  connect: VaccinationWhereUniqueInput
}

input VaccinationUpsertNestedInput {
  update: VaccinationUpdateDataInput!
  create: VaccinationCreateInput!
}

input VaccinationWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  dose: Int
  dose_not: Int
  dose_in: [Int!]
  dose_not_in: [Int!]
  dose_lt: Int
  dose_lte: Int
  dose_gt: Int
  dose_gte: Int
  url: String
  url_not: String
  url_in: [String!]
  url_not_in: [String!]
  url_lt: String
  url_lte: String
  url_gt: String
  url_gte: String
  url_contains: String
  url_not_contains: String
  url_starts_with: String
  url_not_starts_with: String
  url_ends_with: String
  url_not_ends_with: String
  untilNext: String
  untilNext_not: String
  untilNext_in: [String!]
  untilNext_not_in: [String!]
  untilNext_lt: String
  untilNext_lte: String
  untilNext_gt: String
  untilNext_gte: String
  untilNext_contains: String
  untilNext_not_contains: String
  untilNext_starts_with: String
  untilNext_not_starts_with: String
  untilNext_ends_with: String
  untilNext_not_ends_with: String
  protectDuration: String
  protectDuration_not: String
  protectDuration_in: [String!]
  protectDuration_not_in: [String!]
  protectDuration_lt: String
  protectDuration_lte: String
  protectDuration_gt: String
  protectDuration_gte: String
  protectDuration_contains: String
  protectDuration_not_contains: String
  protectDuration_starts_with: String
  protectDuration_not_starts_with: String
  protectDuration_ends_with: String
  protectDuration_not_ends_with: String
  AND: [VaccinationWhereInput!]
  OR: [VaccinationWhereInput!]
  NOT: [VaccinationWhereInput!]
}

input VaccinationWhereUniqueInput {
  id: ID
}
`
      }
    