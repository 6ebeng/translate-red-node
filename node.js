module.exports = function (RED) {
    "use strict";
    var translate = require('google-translate-api-x');

    function GoogleTranslateNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        this.on('input', function (msg) {
            msg.config = conf;
            var conf = { to: config.to };
            var input = msg.payload + '';
            if (config.from === 'prog' && config.to === 'prog') {
                conf = { from: msg.payload.from, to: msg.payload.to }
            } else if (config.from === 'auto' && config.to === 'prog') {
                conf = { to: msg.payload.to }
            }
            if (msg.payload.input) {
                input = msg.payload.input;
            } else {
                input = msg.payload + '';
            }

            try{
                const res = await translate(input, conf);
                msg.payload = res;
                node.send(msg);
            }
             catch(err){
                node.error(err);
            };
        });
    }

    RED.nodes.registerType("google-translate", GoogleTranslateNode);
};
