const Alexa = require('ask-sdk-core');

const count = 1
export function fizzBuzz(count) {
    if(count % 3 === 0 && count % 5 === 0){
        return ('fizzbuzz');
    } else if (count % 5 === 0){
        return ('buzz');
    } else if (count % 3 === 0){
        return ('fizz');
    } else {
        return (count)
    }
}

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Welcome, you can say Hello or Help. Which would you like to try?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};


const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'This is Fizz Buzz! We take turns counting but with a couple extra rules. \
            Any number divisible by 3 is replaced by the word Fizz. \
            Any number divisible by 5 is replaced by the word Buzz. \
            If a number is divisible both by 3 and by 5 then you replace is with FizzBuzz \
            You can say quit to exit the game, repeat to repeat the last count, ';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};


// const FallbackIntentHandler = {
//     canHandle(handlerInput) {
//         return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
//             && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
//     },
//     handle(handlerInput) {
//         const speakOutput = 'Sorry, I don\'t know about that. Please try again.';

//         return handlerInput.responseBuilder
//             .speak(speakOutput)
//             .reprompt(speakOutput)
//             .getResponse();
//     }
// };

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const sessionAtt = handlerInput.attributesManager.getSessionAttributes();
        sessionAtt = null; // Clear session
        handlerInput.attributesManager.setSessionAttributes(sessionAtt);
        return handlerInput.responseBuilder.speak('Goodbye!');
    }
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        const sessionAtt = handlerInput.attributesManager.getSessionAttributes();
        sessionAtt = null; // Clear session
        handlerInput.attributesManager.setSessionAttributes(sessionAtt);
        return handlerInput.responseBuilder.speak('Goodbye!');
    }
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        )
    .addErrorHandlers(
        ErrorHandler)
    .lambda();