const path = require('path');

process.env.NODE_ENV = 'test';
process.env.NODE_CONFIG_DIR = path.join(__dirname, '/../config/');
