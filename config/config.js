/*!
 * Configuration parameters
 * Copyright(c) 2013 Vibrentt
 */
 
var config = {

    // Server's name
    server_name : 'QwizKool Web Server',
    
    // Public pages are served on this port 
    web_server_port : 3000,

    // application base url
    base_url : 'http://localhost:3000',
    
    // mongodb server url
    mongodb_url : 'mongodb://localhost:27017/qwizkool',
    
    // Logger log level
    log_level : 'verbose',
    
    // Logger log level
    log_file : 'server.log',

    // Gmail smtp
    smtp : {
        username : "qzauthmail@gmail.com",
        password : "qzmail@123"
    }
    
    
};

/**
  * Exports.
  */
module.exports  = exports = config;
    
