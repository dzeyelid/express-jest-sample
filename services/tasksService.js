const models = require('../models');

const service = {
  create: async (data) => {
    return await models.Task.create(data, { raw: true });
  },
  find: async (id) => {
    return await models.Task.findByPk(id, { raw: true });
  },
  list: async () => {
    return await models.Task.findAll({ raw: true });
  },
  update: async (id, data) => {
    return await models.Task.update(data, {
      where: { id },
      raw: true,
    });
  },
  delete: async (id) => {
    return await models.Task.destroy({
      where: { id },
    })
  },
};

module.exports = service;
