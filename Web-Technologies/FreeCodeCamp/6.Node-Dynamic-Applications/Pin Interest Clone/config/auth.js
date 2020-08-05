// expose our config directly to our application using module.exports
module.exports = {
        'facebookAuth' : {
            'clientID'      : 'your-secret-clientID-here', // your App ID
            'clientSecret'  : 'your-client-secret-here', // your App Secret
            'callbackURL'   : 'http://localhost:8080/auth/facebook/callback'
        },
        'twitterAuth' : {
            'consumerKey'       : 'mcOSdFakqCVkHeUWMFZhiquYA',
            'consumerSecret'    : '15jXNxJltB9Ok1wDNMPyt5IfITrnD9rtT06KMcfxpdubkqpH4L',
            'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
        },
        'googleAuth' : {
            'clientID'      : 'your-secret-clientID-here',
            'clientSecret'  : 'your-client-secret-here',
            'callbackURL'   : 'http://localhost:8080/auth/google/callback'
        }
    };