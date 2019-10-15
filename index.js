var dust = require('dust')();

var serand = require('serand');
var utils = require('utils');
var uready = require('uready');
var auth = require('auth');
var page = serand.page;
var redirect = serand.redirect;
var current = serand.current;

var app = serand.app({
    self: 'www',
    from: 'serandomps'
});

var layout = serand.layout(app);

var loginUri = utils.resolve('www:///auth');

var author = require('./controllers/auth');

var can = function (permission) {
    return function (ctx, next) {
        next();
    };
};

page(function (ctx, next) {
    utils.loading();
    next();
});

page('/signin', author.signin);

page('/signup', function (ctx, next) {
    var query = ctx.query | {};
    utils.emit('user', 'login', query.dest || '/');
});

page('/auth', function (ctx, next) {
    var el = $('#content');
    var o = {
        tid: sera.tid,
        username: sera.username,
        access: sera.access,
        expires: sera.expires,
        refresh: sera.refresh
    };
    if (o.username) {
        return utils.emit('user', 'initialize', o);
    }
    utils.emit('user', 'logged out');
});

page('/', function (ctx, next) {
    layout('cover')
        .area('#header')
        .add('www-client:navigation')
        //.add('breadcrumb')
        .area('#middle')
        .add('www-client:home')
        /*.add('vehicles:featured', {
            size: 3
        })*/
        .area('#footer')
        .add('footer')
        .render(ctx, next);
});

page('/about', function (ctx, next) {
    utils.alias(ctx.path, function (err, url) {
        if (err) {
            return next(err);
        }
        layout('one-column')
            .area('#header')
            .add('www-client:navigation')
            //.add('breadcrumb')
            .area('#middle')
            .add('pages:findone', {
                id: url
            })
            .area('#footer')
            .add('footer')
            .render(ctx, next);
    });
});

page('/contact', function (ctx, next) {
    utils.alias(ctx.path, function (err, url) {
        if (err) {
            return next(err);
        }
        layout('one-column')
            .area('#header')
            .add('www-client:navigation')
            //.add('breadcrumb')
            .area('#middle')
            .add('pages:findone', {
                id: url
            })
            .area('#footer')
            .add('footer')
            .render(ctx, next);
    });
});

page('/help', function (ctx, next) {
    utils.alias(ctx.path, function (err, url) {
        if (err) {
            return next(err);
        }
        layout('one-column')
            .area('#header')
            .add('www-client:navigation')
            //.add('breadcrumb')
            .area('#middle')
            .add('pages:findone', {
                id: url
            })
            .area('#footer')
            .add('footer')
            .render(ctx, next);
    });
});

page('/privacy', function (ctx, next) {
    utils.alias(ctx.path, function (err, url) {
        if (err) {
            return next(err);
        }
        layout('one-column')
            .area('#header')
            .add('www-client:navigation')
            //.add('breadcrumb')
            .area('#middle')
            .add('pages:findone', {
                id: url
            })
            .area('#footer')
            .add('footer')
            .render(ctx, next);
    });
});

page('/terms', function (ctx, next) {
    utils.alias(ctx.path, function (err, url) {
        if (err) {
            return next(err);
        }
        layout('one-column')
            .area('#header')
            .add('www-client:navigation')
            //.add('breadcrumb')
            .area('#middle')
            .add('pages:findone', {
                id: url
            })
            .area('#footer')
            .add('footer')
            .render(ctx, next);
    });
});

page('/prohibited', function (ctx, next) {
    utils.alias(ctx.path, function (err, url) {
        if (err) {
            return next(err);
        }
        layout('one-column')
            .area('#header')
            .add('www-client:navigation')
            //.add('breadcrumb')
            .area('#middle')
            .add('pages:findone', {
                id: url
            })
            .area('#footer')
            .add('footer')
            .render(ctx, next);
    });
});

utils.on('user', 'login', function (location) {
    var ctx;
    if (!location) {
        ctx = serand.current();
        location = ctx.path;
    }
    serand.store('state', {
        location: location
    });

    auth.authenticator({
        type: 'serandives',
        location: loginUri
    }, function (err, uri) {
        if (err) {
            return console.error(err);
        }
        redirect(uri);
    });
});

utils.on('user', 'logged in', function (token) {
    var state = serand.store('state', null);
    redirect(state && state.location || '/');
});

utils.on('user', 'logged out', function (usr) {
    var state = serand.store('state', null);
    redirect(state && state.location || '/');
});

utils.emit('serand', 'ready');
