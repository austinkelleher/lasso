var cssParser = require('raptor-css-parser');

module.exports = {
    contentType: 'text/css',
    
    name: module.id,

    stream: false,

    filter: function(code, contentType, context) {
        if (contentType === 'text/css') {

            var optimizer = context.optimizer;

            var output = cssParser.replaceUrls(code, function(url) {
                return optimizer.resolveResourceUrl(url, context);
            }, this);

            // NOTE: output could be either the filter code or a promise, but we don't care
            return output;
        }
        else {
            return code;
        }
    }
};