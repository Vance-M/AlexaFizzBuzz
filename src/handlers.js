const utils = require('./utils.js')
const Alexa = require('ask-sdk-core');


const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const sessionAtt = handlerInput.attributesManager.getSessionAttributes();
        const count = 1
        const speakOutput = 'Welcome to Fizz Buzz. \
            We take turns counting but with a couple extra rules. \
            Any number divisible by 3 is replaced by the word Fizz. \
            Any number divisible by 5 is replaced by the word Buzz. \
            If a number is divisible both by 3 and by 5 then you replace it with FizzBuzz.';
        let response = handlerInput.responseBuilder.speak(speakOutput + ' ' + 'I\'ll start.' + ' ' + utils.fizzBuzz(count).toString() ).reprompt(speakOutput + 'The count is' + utils.fizzBuzz(count).toString()).getResponse();
        sessionAtt.count = count
        sessionAtt.repeat = (speakOutput + ' ' + 'I\'ll start.' + ' ' + utils.fizzBuzz(count).toString())
        handlerInput.attributesManager.setSessionAttributes(sessionAtt);
        return response
    }
};

const GameIntentHandler = {
	canHandle(handlerInput) {
			return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
                && Alexa.getIntentName(handlerInput.requestEnvelope) === 'GameIntent';
        },
	handle(handlerInput) {
        let sessionAtt = handlerInput.attributesManager.getSessionAttributes();
        let count = sessionAtt.count;
        const userNumber = parseInt(Alexa.getSlotValue(handlerInput.requestEnvelope, 'number'), 10)
        const userString = Alexa.getSlotValue(handlerInput.requestEnvelope, 'fizzbuzz')
        count++;
        if((userNumber === utils.fizzBuzz(count)) || userString === utils.fizzBuzz(count)){
            count++;
            let response = handlerInput.responseBuilder.speak(utils.fizzBuzz(count).toString()).reprompt(utils.fizzBuzz(count).toString()).getResponse();
            sessionAtt.count = count;
            sessionAtt.repeat = utils.fizzBuzz(count).toString()
            handlerInput.attributesManager.setSessionAttributes(sessionAtt);
            return response
        } else {
            let response = handlerInput.responseBuilder.speak('I am sorry but the correct response was ' + utils.fizzBuzz(count).toString()).getResponse();
            sessionAtt.repeat = 'I am sorry but the correct response was ' + utils.fizzBuzz(count).toString()         
            sessionAtt.count = 1;
            handlerInput.attributesManager.setSessionAttributes(sessionAtt);
            return response
        }
    }
}

const RepeatIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.RepeatIntent';
    },
    handle(handlerInput) {
        let sessionAtt = handlerInput.attributesManager.getSessionAttributes();
        if(sessionAtt.repeat != null){
            return handlerInput.responseBuilder.speak(sessionAtt.repeat).reprompt().getResponse();
        } else {
            sessionAtt.repeat = handlerInput.responseBuilder.speak("There is nothing to repeat. I\'m sorry.").getResponse();
            handlerInput.attributesManager.setSessionAttributes(sessionAtt);
            return handlerInput.responseBuilder.speak(sessionAtt.repeat).reprompt().getResponse();
        }
    }
}

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'This is Fizz Buzz! We take turns counting but with a couple extra rules. \
            Any number divisible by 3 is replaced by the word Fizz. \
            Any number divisible by 5 is replaced by the word Buzz. \
            If a number is divisible both by 3 and by 5 then you replace it with FizzBuzz. \
            You can say quit to exit the game, and repeat to repeat the last count. ';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const sessionAtt = handlerInput.attributesManager.getSessionAttributes();
        sessionAtt.count = 1; // Clear session
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
        sessionAtt.count = 1; // Clear session count
        handlerInput.attributesManager.setSessionAttributes(sessionAtt);
        return handlerInput.responseBuilder.speak('Goodbye!').getResponse();
    }
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, there was an error. Please try again.';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

module.exports = {
    LaunchRequestHandler: LaunchRequestHandler,
    GameIntentHandler: GameIntentHandler,
    RepeatIntentHandler: RepeatIntentHandler,
	HelpIntentHandler: HelpIntentHandler,
	CancelAndStopIntentHandler: CancelAndStopIntentHandler,
    SessionEndedRequestHandler: SessionEndedRequestHandler,
    ErrorHandler: ErrorHandler
};