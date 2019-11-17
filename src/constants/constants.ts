const config = require("config");


const CONF_DB_USER = process.env.CONF_DB_USER //usuario db
  ? process.env.CONF_DB_USER
  : 'ti-marcacion';

const CONF_DB_PASS = process.env.CONF_DB_PASS // password db 
  ? process.env.CONF_DB_PASS
  : 'Sodimac2019*';

const CONF_DB_SERVER = process.env.CONF_DB_SERVER // servidor DB
  ? process.env.CONF_DB_SERVER
  : 'soco-dev-catalogo-marcacion-dbs.database.windows.net';

const CONF_DB_DATABASE = process.env.CONF_DB_DATABASE
  ? process.env.CONF_DB_DATABASE
  : 'catalogo-marcacion';

const CONF_DB_TYPE = process.env.CONF_DB_TYPE
  ? process.env.CONF_DB_TYPE
  :false;

const QUERY_SEARCH = process.env.QUERY_SEARCH
  ? process.env.QUERY_SEARCH
  : false;

module.exports = {
  CONF_DB_USER,
  CONF_DB_PASS,
  CONF_DB_SERVER,
  CONF_DB_DATABASE,
  CONF_DB_TYPE,
  QUERY_SEARCH
};