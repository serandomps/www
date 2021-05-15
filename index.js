var dust = require('dust')();

var serand = require('serand');
var utils = require('utils');
var watcher = require('watcher');
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

var can = function (permission) {
    return function (ctx, next) {
        next();
    };
};

page('/signin', auth.signin({
    loginUri: loginUri
}));

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
        return watcher.emit('user', 'initialize', o);
    }
    watcher.emit('user', 'logged out');
});

page('/', function (ctx, next) {
    layout('cover')
        .area('#header')
        .add('www-client:navigation')
        //.add('breadcrumb')
        .area('#middle')
        .add('www-client:home')
        /*.add('model-vehicles:featured', {
            size: 3
        })*/
        .area('#footer')
        .add('footer')
        .render(ctx, next);
});

page('/imprint', function (ctx, next) {
    layout('one-column')
        .area('#header')
        .add('www-client:navigation')
        .area('#middle')
        .add('www-client:imprint')
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
            .add('model-pages:findone', {
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
            .add('model-pages:findone', {
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
            .add('model-pages:findone', {
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
            .add('model-pages:findone', {
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
            .add('model-pages:findone', {
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
            .add('model-pages:findone', {
                id: url
            })
            .area('#footer')
            .add('footer')
            .render(ctx, next);
    });
});

watcher.on('user', 'login', function (location) {
    if (!location) {
        location = serand.path();
    }
    serand.persist('state', {
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

watcher.on('user', 'logged in', function (token) {
    var state = serand.persist('state', null);
    redirect(state && state.location || '/');
});

watcher.on('user', 'logged out', function (usr) {
    var state = serand.persist('state', null);
    redirect(state && state.location || '/');
});

watcher.emit('serand', 'ready');
