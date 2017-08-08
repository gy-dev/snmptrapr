/**
 * Example
 *
 * Use the default handler, logging snmp trap messages in snmp-native
 * format to the console.
 */
var Snmptrapr = require('./index');
var trapr = new Snmptrapr();

trapr.listen(1162);
