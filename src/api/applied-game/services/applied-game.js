'use strict';

/**
 * applied-game service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::applied-game.applied-game');
