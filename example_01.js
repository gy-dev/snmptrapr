/**
 * Example 1
 *
 * Use the default handler, logging snmp trap messages in snmp-native
 * format to the console.
 */
var trapr = require('./index');

trapr.listen(1162);
