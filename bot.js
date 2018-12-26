let twit = require('twit');
let config = require('./config.js');
let cron = require('node-cron');

let Twitter = new twit(config);

let hashBase = [
    '#ChoqueDeCultura',
    '#NerdcastDeRPG',
    '#rpg',
    '#nerdcast',
    '#jovemnerd',
    '#NerdcastdeRPG',
    '#psn',
    '#javascript',
    '#js',
    '#nodejs',
    '#ps4',
    '#frontend',
    '#Em2019EuVou'
]

console.log('\x1b[36m%s\x1b[0m', 'Starting...');

let retweet = function () {
    let hash = hashRandom();
    let params = {
        q: hashBase[hash], // REQUIRED
        result_type: 'mixed'
    }

    console.log('\x1b[93m%s\x1b[0m', hashBase[hash]);

    Twitter.get('search/tweets', params, function (err, data) {
        // if there no errors
        console.log('\x1b[36m%s\x1b[0m', 'Searching for tweet to retweet...');
        if (!err) {
            // grab ID of tweet to retweet
            let retweetId = data.statuses[0].id_str;
            // Tell TWITTER to retweet
            Twitter.post('statuses/retweet/:id', {
                id: retweetId
            }, function (err, response) {
                if (response) {
                    console.log('\x1b[92m%s\x1b[0m', 'Retweeted!!!');
                }
                // if there was an error while tweeting
                if (err) {
                    console.log('\x1b[31m%s\x1b[0m', 'Something went wrong while RETWEETING... ' + err);
                }
            });
        }
        // if unable to Search a tweet
        else {
            console.log('Something went wrong while SEARCHING...');
        }
    });
}

let favoriteTweet = function () {
    let hash = hashRandom();
    let params = {
        q: hashBase[hash], // REQUIRED
        result_type: 'mixed'
    }

    console.log('\x1b[93m%s\x1b[0m', hashBase[hash])
    // find the tweet
    Twitter.get('search/tweets', params, function (err, data) {

        // find tweets
        let tweet = data.statuses;
        let randomTweet = ranDom(tweet);   // pick a random tweet
        console.log('\x1b[36m%s\x1b[0m', 'Searching for tweet to favorite...');
        // if random tweet exists
        // console.log(randomTweet)
        if (typeof randomTweet != 'undefined') {
            // Tell TWITTER to 'favorite'
            Twitter.post('favorites/create', { id: randomTweet.id_str }, function (err, response) {
                // if there was an error while 'favorite'

                if (err) {
                    console.log('\x1b[31m%s\x1b[0m', 'CANNOT BE FAVORITE... ' + err);
                }
                else {
                    console.log('\x1b[92m%s\x1b[0m', 'FAVORITED... Success!!!');
                }
            });
        }
    });
}

let updateStatus = function () {
    let hash = hashRandom();
    let params = {
        q: hashBase[hash], // REQUIRED
        result_type: 'mixed'
    }

    console.log('\x1b[93m%s\x1b[0m', hashBase[hash])
    // find the tweet
    Twitter.get('search/tweets', params, function (err, data) {

        // find tweets
        let tweet = data.statuses;
        let randomTweet = ranDom(tweet);   // pick a random tweet
        console.log('\x1b[36m%s\x1b[0m', 'Searching for tweet to favorite...');
        // if random tweet exists
        // console.log(tweet)

        if (typeof randomTweet != 'undefined') {
            Twitter.post('statuses/update', {in_reply_to_status_id: randomTweet.id_str, status: '@' + randomTweet.user.screen_name + ' ok'  }, function (err, data, response) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(randomTweet.user.screen_name)
                }
            })
        }
    });
}

let myTimeLine = function (){
    Twitter.get('statuses/home_timeline', {count: 1}, function(err, data, response){
        // console.log(data[0].id)
        console.log(data)
    })
}

let hashRandom = function () {
    let x = Math.floor(Math.random() * hashBase.length);
    return x;
}

function ranDom(arr) {
    let index = Math.floor(Math.random() * arr.length);
    return arr[index];
};

// myTimeLine();

updateStatus();


// cron.schedule('*/2 * * * *', () => {
//     favoriteTweet();
// });


// cron.schedule('*/5 * * * *', () => {
//     retweet();
// });