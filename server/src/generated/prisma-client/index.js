"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "User",
    embedded: false
  },
  {
    name: "Vaccination",
    embedded: false
  },
  {
    name: "UserVaccination",
    embedded: false
  },
  {
    name: "Child",
    embedded: false
  },
  {
    name: "ChildVaccination",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `https://eu1.prisma.sh/isac-larsson-16440a/vaccinationskollen-server/dev`
});
exports.prisma = new exports.Prisma();
