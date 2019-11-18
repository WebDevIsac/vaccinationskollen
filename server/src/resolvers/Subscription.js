const newVaccinationSubscribe = (parent, args, context, info) => {
	return context.prisma.$subscribe.userVaccination({ mutation_in: ["CREATED"] }).node();
}

const newVaccination = {
	subscribe: newVaccinationSubscribe,
	resolve: payload => {
	  return payload
	},
  }

const deleteVaccinationSubscribe = (parent, args, context, info) => {
	return context.prisma.$subscribe.userVaccination({ mutation_in: ["DELETED"] }).node();
}

const deleteVaccination = {
	subscribe: deleteVaccinationSubscribe,
	resolve: payload => {
	  return payload
	},
  }

module.exports = {
	newVaccination,
	deleteVaccination
}