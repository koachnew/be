'use strict';

/**
 * admin-type service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::admin-type.admin-type');
