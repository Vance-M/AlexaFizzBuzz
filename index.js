const Alexa = require('ask-sdk-core');

const handlers = require('./src/handlers');


exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        handlers.LaunchRequestHandler,
        handlers.HelpIntentHandler,
        handlers.CancelAndStopIntentHandler,
        handlers.SessionEndedRequestHandler,
        handlers.GameIntentHandler,
        handlers.RepeatIntentHandler
        )
    .addErrorHandlers(
        handlers.ErrorHandler)
    .lambda();