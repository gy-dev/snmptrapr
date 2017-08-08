/**
 * Example 2
 *
 * Use your own handler 
 */

var trapr = require('./index');

trapr.handler = function(msg, rinfo) {
  /**
   * Do something usefull with the msg and rinfo params
   */
  console.log('This is my handler.');
};

trapr.listen(1162);
