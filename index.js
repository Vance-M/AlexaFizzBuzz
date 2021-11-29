const Alexa = require('ask-sdk-core');

const Intenthandler = require('./src/handlers.js');


exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        Intenthandler.LaunchRequestHandler,
        Intenthandler.HelpIntentHandler,
        Intenthandler.CancelAndStopIntentHandler,
        Intenthandler.SessionEndedRequestHandler,
        Intenthandler.GameIntentHandler,
        Intenthandler.RepeatIntentHandler
        )
    .addErrorhandler(
        Intenthandler.ErrorHandler)
    .lambda();