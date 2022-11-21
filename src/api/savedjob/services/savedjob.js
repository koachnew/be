'use strict';

/**
 * savedjob service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::savedjob.savedjob');
