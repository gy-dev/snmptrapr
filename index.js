var snmp = require('snmp-native');
var dgram = require('dgram');
var net = require('net');


var Snmptrapr = function(handler) {
  /**
   * Snmptrapr constructor
   * 
   * handler param: function that processes received snmp trap messages
   * Signature: handler(msg, rinfo) { ... }
   * msg is the raw message parsed with snmp.parse(rawmsg)
   * rinfo is an object literal containing info about the remote host
   *
   * It's up to you how to process an snmp trap message by passing your
   * own crafted handler
   *
   * If no handler is passed a default snmp trap message handler is used
   * [ see below ]
   *
   */
  
  if (handler && typeof handler === 'function') {
    console.log('Using userdefined handler');
    this.handler = handler;
  } else {
    console.log('Using default handler');
    this.handler = function(msg, rinfo) {
      /**
       * This is a default snmp trap message handler
       * It simply logs the message to the console
       * in snmp-native format
       */
      console.log(rinfo);
      console.log(msg);
      msg.pdu.varbinds.forEach((varbind) => {
        console.log(varbind); 
      });
    };
  }

};


Snmptrapr.prototype.listen = function(port, ip) {
  var self = this;

  ipVersion = net.isIP(ip);
  ip = ipVersion > 0 ? ip : '0.0.0.0';
  addressType = ipVersion > 0 ? 'udp' + ip : 'udp4';

  this.socket = dgram.createSocket(addressType);

  this.socket.on('error', (err) => {
    console.log(`server error:\n$err.stack`);
  });

  this.socket.on('message', (rawmsg, rinfo) => {
    self.handler(snmp.parse(rawmsg), rinfo);
  });

  this.socket.on('listening', () => {
    var socketAddress = self.socket.address();
    var address = socketAddress.address;
    var port = socketAddress.port;
    console.log(`snmptrapr listening on ${address}:${port}`);
  });

  this.socket.bind(port, ip);
};


Snmptrapr.prototype.close = function() {
  this.socket.close();
};


module.exports = Snmptrapr;

