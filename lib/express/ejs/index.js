exports.layout = function(req, res, next) {
    var path = require('path');
    var pjson = require(path.resolve("./package.json"));

    res.renderLayout = function(viewPage, options, layout){
        var that = this;
        if(!layout) layout = 'main';

        that.render(path.resolve('./views/'+ viewPage), options, function(err, html){
            options.content = html;
            options.viewPage = viewPage;
            options.version = pjson.version;
            that.render('layouts/'+ layout, options);

        });
    }

    res.renderJsonSuccess = function(data, msg){
        res.jsonp({
            status: 'success',
            message: msg || '',
            data: data
        });
    }

    res.renderJsonFail = function(msg, err, data){
        res.jsonp({
            status: 'fail',
            message: msg || '',
            errors: err || null,
            data: data || null
        });
    }

    next();
}