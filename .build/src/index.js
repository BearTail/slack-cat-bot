"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var requestPromise = require("request-promise");
var CAT_API_URL = 'https://api.thecatapi.com/v1/images/search';
function handler(event, context, callback) {
    var eventBody = JSON.parse(event.body);
    console.log(eventBody);
    // slack の Event API を利用するために必要な認証
    if (eventBody.type === 'url_verification') {
        return callback(null, verifySlackEventApi(eventBody.challenge));
    }
    if (!isCatCalled(eventBody.event.text)) {
        return callback(null, {
            statusCode: 200,
            headers: {
                'Content-type': 'text/plain',
            },
            body: 'Cat is not called',
        });
    }
    requestPromise(CAT_API_URL)
        .then(function (res) {
        var response = JSON.parse(res);
        var catUrl = response[0].url;
        postCatImageToSlack(catUrl);
        return callback(null, {
            statusCode: 200,
            headers: {
                'Content-type': 'text/plain',
            },
            body: 'Cat is posted!',
        });
    })
        .catch(function (error) {
        return callback(null, {
            statusCode: 400,
            headers: {
                'Content-type': 'text/plain',
            },
            body: 'Failed to post cat!',
        });
    });
}
exports.handler = handler;
// @see https://api.slack.com/events/url_verification
function verifySlackEventApi(challenge) {
    return {
        statusCode: 200,
        headers: {
            'Content-type': 'text/plain',
        },
        body: challenge,
    };
}
function isCatCalled(message) {
    return message === 'にゃんこ';
}
function postCatImageToSlack(imageUrl) {
    var requestBody = {
        text: "にゃーん",
        attachments: [{
                image_url: imageUrl,
            }],
    };
    var options = {
        method: 'POST',
        url: 'https://hooks.slack.com/services/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',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    };
    requestPromise(options)
        .then(function (res) {
        console.log('Succeeded to post a cat image to slack!');
    })
        .catch(function (error) {
        console.log('Failed to post a cat image to slack...');
    });
}
//# sourceMappingURL=index.js.map