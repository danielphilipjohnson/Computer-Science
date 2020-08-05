/* jshint esversion: 6 */

const express = require('express');
const path = require('path');

var yahooFinance = require('yahoo-finance');

// Init App
http = require('http');
const app = express();
var server = http.createServer(app);
var io = require('socket.io')(server);


var stocks = ['AAPL', 'GOOG'];

// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

// Home Route
app.get('/', function(req, res) {
    var day = new Date();
    var formatted  = day.getHours() +  "-" + day.getMinutes() + "-" + day.getSeconds();
    res.render('index', {time: formatted});
});

app.get('/singlestock/:date/', function(req, res) {

    var dateTo = req.params.date;

    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var day = today.getDate();
    var from = year + "-" + month + "-" + day;

    yahooFinance.historical({
        symbols: stocks,
        from: dateTo,
        to: from,
    }, function(err, quotes) {
        res.json({ quotes: quotes });
    });
});


// Start Server
io.on('connection', function(socket) {

    socket.emit('displayStocks', { stocks: stocks });
    socket.on('addstock', function(stock) {
        stocks.push(stock.stockName);
    });
    //removestock
    socket.on('removestock', function(stock) {
        var itemIndexToRemove = stocks.findIndex((x) => x === stock.stockName);
        stocks.splice(itemIndexToRemove, 1);
    });
});


server.listen(3000);