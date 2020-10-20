/* jshint esversion: 6 */

$(document).ready(function() {

    var socket = io.connect();

    var stockChart = new generateChart("", "");
    stockChart.initChart(stockChart.config);

    function CleansedSingleYahooData(data, stocks) {
        var cleansedData = data.quotes[stocks].map(function(element) {
            return element.high;
        }, this);
        return cleansedData;
    }
    function CleansedMultipleYahooData(data) {        
        return data['quotes'];
    }
    function splitDate(dates){
        var allDates = dates.map(function(element) {
            var formattedDate = element.date.split("T"); 
            return formattedDate[0]; 
        }, this);
        return allDates;
    }

    function stockName() {
        this.init = function(stocks) {
            var that = this;
            var dateval = $('#date-range input').val();
            if (stocks.length < 1) {

            }
            else if (stocks.length === 1) {
                $.getJSON("http://localhost:3000/singlestock/" + dateval + "/?stocks=" + stocks, function(data) {
                    var dates = splitDate(data.quotes[stocks]);
                    stockChart.addLabel(dates);
                    that.setupCard(stocks[0], CleansedSingleYahooData(data, stocks), that.removeCard);
                });
            }
            else {

                $.getJSON("http://localhost:3000/singlestock/" + dateval + "/?stocks=" + stocks, function(data) {
                    var counter = 0;
                    var stockResults = CleansedMultipleYahooData(data);
                    var dates;
                    for (var stock of stocks) {
                        var data = stockResults[stock].map(function(element) {
                            return element.high;
                        }, this);
                        if(counter < 1){
                            counter++;
                            dates = splitDate(stockResults[stock]);
                        }
                        that.setupCard(stock, data, that.removeCard);
                    }
                    stockChart.addLabel(dates);
                });
            }
        };
        this.generateColorValue = function() {
            var randomVal = Math.floor(Math.random() * 8);
            var possibleColors = [
                { colorname: 'cyan-block', colorValue: '#2196F3' },
                { colorname: 'teal-block', colorValue: '#009688' },
                { colorname: 'red-block', colorValue: '#f44336' },
                { colorname: 'pink-block', colorValue: '#e91e63' },
                { colorname: 'purple-block', colorValue: '#9c27b0' },
                { colorname: 'deep-purple-block', colorValue: '#673ab7' },
                { colorname: 'indigo-block', colorValue: '#3f51b5' },
                { colorname: 'blue-block', colorValue: ' #2196F3' },
            ];
            return possibleColors[randomVal];
        };
        this.createCard = function(name, removeCardFunc) {

            // generate value
            var colorValue = this.generateColorValue();
            socket.emit('addstock', { stockName: name });

            // add date to get request
            var dateval = $('#date-range input').val();

            $.getJSON("http://localhost:3000/singlestock/" + dateval + "/?stocks=" + name, function(data) {
                stockChart.addDataSet(name, colorValue.colorValue, CleansedSingleYahooData(data, name));
                $('.answer-blocks').append('<div class="answer-block ' + colorValue.colorname + '"><p>' + name + '</p> <span class="percent">' + CleansedSingleYahooData(data, name)[0] + '</span>   <i class="fa fa-times" aria-hidden="true"></i></div>');
                removeCardFunc();
            });
        };
        this.setupCard = function(name, value, removeCardFunc) {
            // generate value
            var colorValue = this.generateColorValue();
            // Use array index as color selection
            $('.answer-blocks').append('<div class="answer-block ' + colorValue.colorname + '"><p>' + name + '</p> <span class="percent">' + value[0] + '</span>   <i class="fa fa-times" aria-hidden="true"></i></div>');
            removeCardFunc();
            stockChart.addDataSet(name, colorValue.colorValue, value);
        };
        this.removeCard = function() {
            $('.fa-times').click(function() {
                $(this).parent().remove();
                // get the label value
                var labelToRemove = $(this).parent().find("p").text();
                stockChart.removeDataSet(labelToRemove);
                socket.emit('removestock', { stockName: labelToRemove });
            });
        };
    }

    function fetchingDate() {
        function formatDate(dateval) {
            // split the date
            var dateArr = dateval.split("-");
            var dateYear = dateArr[0];
            var dateMonth = dateArr[1];
            var dateDay = dateArr[2];
            // return it maybe
            console.log(dateYear + "-" + dateMonth + "-" + dateDay);
            //"2011-08-19"
            return dateval;
        }
        $('.fa-check').click(function() {
            var dateval = $('#date-range input').val();
            if (dateval === '') {

            } else {
                formatDate(dateval);
            }
        });
    }

    fetchingDate();

    socket.on('displayStocks', function(stock) {
        var stockLogic = new stockName();
        stockLogic.init(stock.stocks);
        $('.fa-thumb-tack').click(function() {
            var that = this;
            var stockName = ($('#stocknamevalue').val());
            if (stockName === '') {
                $('#stockNameForm').addClass('has-warning');
                $('#stockNameForm').append('<div class="form-control-feedback feedback-stock-name">Stock name cannot be empty</div>');
            } else {
                // Remove warning if there is 
                $('#stockNameForm').removeClass('has-warning');
                // remove message
                $('.feedback-stock-name').remove();
                // add success
                $('#stockNameForm').addClass('has-success');
                // add card
                stockLogic.createCard(stockName, stockLogic.removeCard);
            }
        });
    });
});

function generateChart(Datasets, labels) {
    this.config = {
        type: 'line',
        data: {
            labels: this.labels

        },
        options: {
            responsive: true,
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Month'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Value'
                    }
                }]
            }
        }
    };
    this.initChart = function(config) {
        var ctx = document.getElementById("stockChart").getContext("2d");
        window.myLine = new Chart(ctx, config);
    };
    this.addLabel = function(labels){
        this.config.data.labels = labels;
        console.log(this.config.data.labels);
        //this.labels = labels;
        window.myLine.update();
    };

    this.addDataSet = function(label, color, data) {
        //generate a color
        var newDataset = {
            label: label,
            backgroundColor: color,
            borderColor: color,
            data: data,
            fill: false
        };

        this.config.data.datasets.push(newDataset);
        window.myLine.update();

    };
    this.removeDataSet = function(name) {
        var datasetCollection = this.config.data.datasets;
        for (var dataset in datasetCollection) {
            if (datasetCollection[dataset].label == name) {
                datasetCollection.splice(dataset, 1);
                window.myLine.update();
            }
        }
    };
}
function SearchSuggestions() {
    // DATA JSON EVENTUALLY
    var ftse100 = [
        'AAL',
        'ABF',
        'ADM',
        'AHT',
        'ANTO',
        'AV.',
        'AZN',
        'BA.',
        'BAB',
        'BARC',
        'BATS',
        'BDEV',
        'BLND',
        'BLT BHP',
        'BNZL',
        'BP.',
        'BRBY',
        'BT.A',
        'CCH',
        'CCL',
        'CNA',
        'CPG',
        'CRDA',
        'CRH',
        'CTEC',
        'DCC',
        'DGE',
        'DLG',
        'EXPN',
        'EZJ',
        'FERG',
        'FRES',
        'GFS G4S',
        'GKN GKN',
        'GLEN',
        'GSK',
        'HL.',
        'HMSO',
        'HSBA HSBC',
        'IAG',
        'IHG',
        'III',
        'IMB',
        'INF',
        'ITRK',
        'ITV',
        'JMAT',
        'KGF',
        'LAND',
        'LGEN',
        'LLOY ',
        'LSE ',
        'MCRO',
        'MDC',
        'MERL',
        'MKS',
        'MNDI',
        'MRW',
        'NG.',
        'NXT',
        'OML',
        'PFG',
        'PPB',
        'PRU',
        'PSN',
        'PSON',
        'RB.',
        'RBS',
        'RDSA',
        'RDSB',
        'REL',
        'RIO',
        'RMG',
        'RR.',
        'RRS',
        'RSA',
        'RTO',
        'SBRY',
        'SDR',
        'SGE',
        'SGRO',
        'SHP',
        'SKG',
        'SKY',
        'SLA',
        'SMIN',
        'SMT',
        'SN.',
        'SSE',
        'STAN',
        'STJ',
        'SVT',
        'TSCO',
        'TUI',
        'TW.',
        'ULVR',
        'UU.',
        'VOD',
        'WPG',
        'WPP',
        'WTB',
    ];

    var germanDAX = [
        'MRK.DE',
        'PSM.DE',
        'DAI.DE',
        'FRE.DE',
        'BMW.DE',
        'VOW3.DE',
        'VNA.DE',
        'EOAN.DE',
        'DTE.DE',
        'CON.DE',
        'IFX.DE',
        'RWE.DE',
        'HEI.DE',
        'BEI.DE',
        'FME.DE',
        'ADS.DE',
        'SAP.DE',
        'TKA.DE',
        'BAS.DE',
        'LIN.DE',
        'HEN3.DE',
        'BAYN.DE',
        'DB1.DE',
        'DPW.DE',
        'ALV.DE',
        'LHA.DE',
        'SIE.DE',
        'DBK.DE',
        'CBK.DE',
        'MUV2.DE'
    ];

    var hangSeng = [
        '0012.HK',
        '2318.HK',
        '0883.HK',
        '0006.HK',
        '0003.HK',
        '1044.HK',
        '1038.HK',
        '2319.HK',
        '0135.HK',
        '0941.HK',
        '0027.HK',
        '1109.HK',
        '0002.HK',
        '2628.HK',
        '1928.HK',
        '0267.HK',
        '0101.HK',
        '0386.HK',
        '1398.HK',
        '0023.HK',
        '0017.HK',
        '2388.HK',
        '0293.HK',
        '0836.HK',
        '0016.HK',
        '0992.HK',
        '1299.HK',
        '0083.HK',
        '2018.HK',
        '0700.HK',

    ];
    // Matcher function
    var substringMatcher = function(strs) {
        return function findMatches(q, cb) {
            var matches, substringRegex;

            // an array that will be populated with substring matches
            matches = [];

            // regex used to determine if a string contains the substring `q`
            substrRegex = new RegExp(q, 'i');

            // iterate through the pool of strings and for any string that
            // contains the substring `q`, add it to the `matches` array
            $.each(strs, function(i, str) {
                if (substrRegex.test(str)) {
                    matches.push(str);
                }
            });

            cb(matches);
        };
    };


    $('.stock-names .typeahead').typeahead({
        hint: true,
        highlight: true,
        minLength: 1
    },
        {
            name: 'DAX',
            source: substringMatcher(germanDAX),
            templates: {
                header: '<h3 class="market-name">DAX</h3>'
            },

        }, {
            name: 'ftse100',
            source: substringMatcher(ftse100),
            templates: {
                header: '<h3 class="market-name">FTSE100</h3>'
            },

        }, {
            name: 'hangSeng',
            source: substringMatcher(hangSeng),
            templates: {
                header: '<h3 class="market-name">hangSeng</h3>'
            },

        });



}
SearchSuggestions();
