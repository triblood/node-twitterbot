let twit = require('twit');
let config = require('./config.js');
let cron = require('node-cron');

let Twitter = new twit(config);

let hashBase = [
    '#CiteArrependimentos',
    '#rpg',
    '#ps4',
    '#javascript',
    '#nodejs',
    '#ps4',
    '#frontend',
    '#nerd',
    '#geek',
    '#picoftheday',
    '#mobilephotography',
    '#blackandwhitephotography'
]

let resultType = [
    'mixed',
    'recent',
    'popular'
]

console.log('\x1b[36m%s\x1b[0m', 'Starting...');

let retweet = function () {
    let hash = hashRandom();
    let typeR = resTypeRandom();
    let params = {
        q: hashBase[hash], // REQUIRED
        result_type: resultType[typeR]
    }

    console.log('\x1b[93m%s\x1b[0m', hashBase[hash]);

    Twitter.get('search/tweets', params, function (err, data) {
        // if there no errors
        console.log('\x1b[36m%s\x1b[0m', 'Searching for tweet to retweet...');
        if (!err) {
            console.log(data.statuses[0].id_str);
            if(data.statuses[0].id_str != undefined){
                
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
            } else {
                console.log('\x1b[36m%s\x1b[0m', 'Found nothing...');
            }
        }
        // if unable to Search a tweet
        else {
            console.log('Something went wrong while SEARCHING...');
        }
    });
}

let favoriteTweet = function () {
    let hash = hashRandom();
    let typeR = resTypeRandom();
    let params = {
        q: hashBase[hash], // REQUIRED
        result_type: resultType[typeR]
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
        } else {
            console.log('\x1b[36m%s\x1b[0m', 'Found nothing...');
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


let tweeting = function () {
    Twitter.post('statuses/update', {status: 'Eita https://g1.globo.com/economia/tecnologia/blog/altieres-rohr/post/2018/12/19/criminosos-escondem-comandos-de-virus-em-memes-no-twitter.ghtml'}, function (err, data, response) {
        if (err) {
            console.log(err)
        } else {
            console.log(response)
        }
    })
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

let resTypeRandom = function () {
    let y = Math.floor(Math.random() * resultType.length);
    return y;
}

function ranDom(arr) {
    let index = Math.floor(Math.random() * arr.length);
    return arr[index];
};

// myTimeLine();

tweeting();

// cron.schedule('*/1 * * * *', () => {
//     favoriteTweet();
// });

// cron.schedule('*/3 * * * *', () => {
//     retweet();
// });
