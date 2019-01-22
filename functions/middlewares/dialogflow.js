'use strict'

const {	dialogflow, Suggestions } = require('actions-on-google');

const app = dialogflow({debug: true});
var personOne = [];
var personTwo = [];
var dinnerPersonSwitch = true;
var familyDinnerDifference;
app.intent('Default Welcome Intent', (conv) => {
  // Asks the user's permission to know their name, for personalization.
  conv.ask(`Welcome to marriage counselling assistant. Here we are going to discuss five tips to help you have some resolutions to your conflicts.`+
`We are going to take turns talking, and I will asses what you say and give some feedback based on what you say.`+
`and hope to give you some perspective on your issues. First things first, what are your names please?`
  );
});

app.intent('Names', async(conv, {nameOne, nameTwo, LastName}) => {
var nameOne_ = {nameOne};
var nameTwo_ = {nameTwo};
var lastName_ = {LastName};
conv.data.userNameOne = nameOne;
conv.data.userNameTwo = nameTwo;
personOne.push(`${conv.data.userNameOne}`);
personTwo.push(`${conv.data.userNameTwo}`);

conv.ask(`<speak> Thankyou, ${conv.data.userNameOne} and ${conv.data.userNameTwo}. I am going to talk to you through 3 diffent subjects.`+
    `Family baggage, Communication, and Conflict resolution. Some of these question my feel insignificant but I assure you they are not. `+
    `First off Family baggage, we all bring “family rules” into our relationships, and most of the time we don’t even realize it.<break time="1s"/>`+
    `${conv.data.userNameOne}, How many nights a week did your family eat together as a child? </speak>`);
});

app.intent('dinner time', async(conv,{DOW}) => {
  console.log(dinnerPersonSwitch);
    conv.data.dow = DOW;
    if(dinnerPersonSwitch && conv.data.dow >= 0 && conv.data.dow <= 7){
      conv.ask(`Thankyou ${conv.data.userNameOne}, ${conv.data.userNameTwo} your turn.`);
      personOne.push(`${conv.data.dow}`);
      dinnerPersonSwitch = false;
    }else if (dinnerPersonSwitch != true && conv.data.dow >= 0 && conv.data.dow <= 7){
      // pull from database to construct a sentence

      conv.ask(`These are all questions that seem boring and unimportant,`+
      ` but every family answers them in different ways. The way your family handled `+
      ` these issues is not the way every family handles them. We unfairly project our `+
      ` family beliefs, or perspectives, into our new families and expect our spouses to follow our lead.`+
      ` one of those subjects we carry with us is money. Did your parents disccuss money with you?`);

      conv.ask(new Suggestions('yes','no','sometimes','when I was older'));
      personTwo.push(`${conv.data.dow}`);

      dinnerPersonSwitch = 0;
      familyDinnerDifference = personOne[1] - personTwo[1];
      if(familyDinnerDifference < 0){
        familyDinnerDifference = familyDinnerDifference*-1;
      }
    }else{
        conv.ask(`you know there are not ${conv.data.dow} days in a week right?`);
      }
  });

  app.intent('Child-money',async(conv, {sensitive, sibling}) => {
  // Grab a sentiment score here from a testimonial.
    var sen = {sensitive};
    var sib = {sibling};
    conv.data.sibling_ = sibling;
    conv.data.sensistiveNotification = sensitive;
    if(conv.data.sibling_ == "sister"){
      conv.ask(`was your sister older then you?`);
    }else if (conv.data.sibling_ == "brother"){
      conv.ask(`brother`);
    }

  });


app.intent('communinication', async(conv)=>{

});

app.intent('you she he', async(conv,{blame})=>{
  var blame_ = {blame};
  conv.data.blame__ = blame;

  if (conv.data.blame__ == "he" || conv.data.blame__ == "his"){
    conv.ask(`this is if it contains he or him`);
  }else if (conv.data.blame__ == "her" || conv.data.blame__ == "she"){
    conv.ask(`this is if it contains her or she`);
  }
});

app.intent('sex life', async(conv,{sexLife})=>{
  conv.ask(`I want to hear more about that`);
});
//
app.intent('somthing positive', async(conv)=>{
  // Grab a sentiment score here from a testimonial.

});

app.intent('somthing nigitive', async(conv)=>{
  // Grab a sentiment score here from a testimonial.

});

app.intent('final assessment', async(conv)=>{
  // collective content delivery for both people //
});

function getAllPermutations(string) {
  var results = [];
  if (string.length === 1) {
    results.push(string);
    return results;
  }
  for (var i = 0; i < string.length; i++) {
    var firstChar = string[i];
    var charsLeft = string.substring(0, i) + string.substring(i + 1);
    var innerPermutations = getAllPermutations(charsLeft);
    for (var j = 0; j < innerPermutations.length; j++) {
      results.push(firstChar + innerPermutations[j]);
    }
  }
  return results;
}



module.exports = app;
