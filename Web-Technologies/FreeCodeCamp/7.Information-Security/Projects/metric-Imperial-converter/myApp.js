var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const routes = require('./routes/routes.js');

/** Security */
const helmet = require('helmet');
app.use(helmet());
/** Hide potentially dangerous information */
app.use(helmet.hidePoweredBy({
    setTo: 'PHP 4.2.0'
}));
/** Mitigate the risk of clickjacking */
app.use(helmet.frameguard({
    action: 'deny'
}));
/** Mitigate the risk of XSS */
app.use(helmet.xssFilter({
    setOnOldIE: true
}));
/** Avoid inferring the response MIME type */
app.use(helmet.noSniff())
    /** Prevent IE from opening *untrusted* HTML */
app.use(helmet.ieNoOpen())
    /** Ask browsers to access your site via HTTPS only */
var ninetyDaysInMilliseconds = 90 * 24 * 60 * 60 * 1000;
app.use(helmet.hsts({
    maxAge: ninetyDaysInMilliseconds
}));
/** Disable DNS Prefetching */
app.use(helmet.dnsPrefetchControl())
    /** Disable Client-Side Caching */
app.use(helmet.noCache());
/** Content Security Policy */
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "https://code.jquery.com/jquery-3.1.1.min.js"],
        styleSrc: ["'self'", '/semantic/semantic.css', './style.css']
    }
}))


/** View engine and setting public folder */
app.set('view engine', 'pug');
app.use(express.static('public'));
app.disable('strict-transport-security');


// Body Parser Middleware parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));

// parse application/json
app.use(bodyParser.json());


routes(app);

var listener = app.listen(process.env.PORT || 3000, function() {
    console.log('Your app is listening on port ' + listener.address().port);
});


module.exports = app