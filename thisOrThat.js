/*

-----------------
Table of Contents
-----------------

VOCABULARY

DATA

    SETTING

    STATE

FUNC

    EVENT
        thisOrThat.func.event.displayHighlightAndFeedback = ()=>{
        thisOrThat.func.event.resetActivity = ()=>{

    GIVE
        thisOrThat.func.give.button_correctAttributes = (button)=>{
        thisOrThat.func.give.button_wrongAttributes = (button)=>{
        thisOrThat.func.give.choice_correctAttributes = (choice)=>{
        thisOrThat.func.give.choice_wrongAttributes = (choice)=>{
        thisOrThat.func.give.choiceButton_and_choiceContainer_disabledAttributes = (choiceButtons)=>{
        thisOrThat.func.give.choiceButtons_startingAttributes = (choiceButtons)=>{
        thisOrThat.func.give.choiceButtons_eventListeners = ()=>{
        thisOrThat.func.give.choices_startingAttributes = (choices)=>{
        thisOrThat.func.give.feedback_displayAttributes = (feedback)=>{
        thisOrThat.func.give.feedback_startingAttributes = (feedbacks)=>{
        thisOrThat.func.give.feedbackType_correctAttributes = (feedback)=>{
        thisOrThat.func.give.feedbackType_wrongAttributes = (feedback)=>{
        thisOrThat.func.give.feedbackTypes_startingAttributes = (feedbackTypes)=>{
        thisOrThat.func.give.nextSection_displayAttributes = (nextSection)=>{
        thisOrThat.func.give.resetButtons_eventListeners = ()=>{
        thisOrThat.func.give.sectionsExceptFirst_startingAttributes = (sectionsExceptFirst)=>{
        thisOrThat.func.give.thisOrThatPieces_ids_and_startingAttributes = ()=>{
        thisOrThat.func.give.thisOrThats_ids = ()=>{

    IS
        thisOrThat.func.is.choiceCorrect = (button, answer)=>{

    START
        thisOrThat.func.start = async()=>{

*/



/*
VOCABULARY
*/
const thisOrThat           = {};
// DATA:
thisOrThat.data            = {};
// Setting
thisOrThat.data.setting    = {};
// State
thisOrThat.data.state      = {};
// FUNC:
thisOrThat.func            = {};
// data CRUDS
thisOrThat.func.create     = {};
thisOrThat.func.set        = {};
thisOrThat.func.read       = {};
thisOrThat.func.update     = {};
thisOrThat.func.delete     = {};
// view CRUDS
thisOrThat.func.make       = {};
thisOrThat.func.append     = {};
thisOrThat.func.get        = {};
thisOrThat.func.give       = {};
thisOrThat.func.remove     = {};
// other functions
thisOrThat.func.animate    = {};
thisOrThat.func.calc       = {};
thisOrThat.func.event      = {};
thisOrThat.func.is         = {};
thisOrThat.func.post       = {};
thisOrThat.func.sort       = {};
thisOrThat.func.start      = {};
thisOrThat.func.transition = {};



/*
DATA
*/


/*
SETTING
*/


/*
STATE
*/


/*
FUNC
*/

/*
EVENT
*/
thisOrThat.func.event.displayHighlightAndFeedback = ()=>{
    // GET:
    let button = event.srcElement;
    // RETURN: if button has diabled class
    if( button.classList.contains('disabled')){
        return;
    };
    // GET:
    let choice              = button.parentNode;
    let section_id          = button.id;
    let section_idNumber    = Number(section_id.split('section_')[1]);
    let thisOrThat_idNumber = Number(section_id.split('thisOrThat_')[1].split('-')[0]);
    let choiceButtons       = document.querySelectorAll(`div.section#${section_id} div[class^='choice'] .button`);
    let answer              = document.querySelector(`div[class^='choice'][answer='true']#${section_id}`);
    let feedback            = document.querySelector(`div.section#${section_id} div[class~='feedback']#${section_id}`);
    let nextSection         = document.querySelector(`div.section#thisOrThat_${thisOrThat_idNumber}-section_${section_idNumber + 1}`);
    // IS: correct
    let correct = thisOrThat.func.is.choiceCorrect(button, answer);
    if( correct){
        // GIVE:
        thisOrThat.func.give.button_correctAttributes(button);
        thisOrThat.func.give.choice_correctAttributes(choice);
        thisOrThat.func.give.feedbackType_correctAttributes(feedback);
    }
    // IS: wrong
    else{
        // GIVE:
        thisOrThat.func.give.button_wrongAttributes(button);
        thisOrThat.func.give.choice_wrongAttributes(choice);
        thisOrThat.func.give.feedbackType_wrongAttributes(feedback);
    };
    // GIVE:
    thisOrThat.func.give.feedback_displayAttributes(feedback);
    // IS:
    if( nextSection !== null){
        // GIVE:
        thisOrThat.func.give.nextSection_displayAttributes(nextSection);
    };
    // GIVE
    thisOrThat.func.give.choiceButton_and_choiceContainer_disabledAttributes(choiceButtons);

};

thisOrThat.func.event.resetActivity = ()=>{
    // GET:
    let resetButton         = event.srcElement;
    let thisOrThat_id       = resetButton.id;
    let choices             = document.querySelectorAll(`#${thisOrThat_id} div[class^='choice']`);
    let choiceButtons       = document.querySelectorAll(`#${thisOrThat_id} div[class^='choice'] .button`);
    let feedbacks           = document.querySelectorAll(`#${thisOrThat_id} .feedback`);
    let feedbackTypes       = document.querySelectorAll(`#${thisOrThat_id} div[class^=feedback_]`);
    let sectionsExceptFirst = document.querySelectorAll(`#${thisOrThat_id} .section:not(:first-of-type)`);
    // GIVE:
    thisOrThat.func.give.choices_startingAttributes(choices);
    thisOrThat.func.give.choiceButtons_startingAttributes(choiceButtons);
    thisOrThat.func.give.feedback_startingAttributes(feedbacks);
    thisOrThat.func.give.feedbackTypes_startingAttributes(feedbackTypes);
    thisOrThat.func.give.sectionsExceptFirst_startingAttributes(sectionsExceptFirst);
};

/*
GIVE
*/
thisOrThat.func.give.button_correctAttributes = (button)=>{
    button.innerHTML = 'Correct';
    button.classList.add('highlightCorrect', 'selected');
};

thisOrThat.func.give.button_wrongAttributes = (button)=>{
    button.innerHTML = 'Wrong';
    button.classList.add('highlightWrong', 'selected');
};

thisOrThat.func.give.choice_correctAttributes = (choice)=>{
    choice.classList.add('highlightCorrect', 'selected');
};

thisOrThat.func.give.choice_wrongAttributes = (choice)=>{
    choice.classList.add('highlightWrong', 'selected');
};

thisOrThat.func.give.choiceButton_and_choiceContainer_disabledAttributes = (choiceButtons)=>{
    for(let i = 0; i < choiceButtons.length; i++){
        let choiceButton    = choiceButtons[i];
        // GET:
        let choiceContainer = choiceButton.parentNode;
        // GIVE:
        choiceButton.classList.add('disabled');
        choiceContainer.classList.add('disabled');
    };
};

thisOrThat.func.give.choiceButtons_startingAttributes = (choiceButtons)=>{
    for(let i = 0; i < choiceButtons.length; i++){
        let choiceButton    = choiceButtons[i];
        // GET:
        let choiceContainer = choiceButton.parentNode;
        // GIVE: choiceButton_enabledAttributes
        choiceButton.classList.remove('disabled', 'highlightCorrect', 'highlightWrong', 'selected');
        // GIVE: choiceContainer_enabledAttributes
        choiceContainer.classList.remove('disabled');
        if( choiceContainer.classList.contains('choice_a')){
            choiceButton.innerHTML = 'This';
        }
        else
        if( choiceContainer.classList.contains('choice_b')){
            choiceButton.innerHTML = 'That';
        };
    };
};

thisOrThat.func.give.choiceButtons_eventListeners = ()=>{
    let choiceButtons = document.querySelectorAll(`.thisOrThat div[class^='choice'] .button`);
    for(let i = 0; i < choiceButtons.length; i++){
        let choiceButton = choiceButtons[i];
            choiceButton.addEventListener('click', thisOrThat.func.event.displayHighlightAndFeedback);
    };
};

thisOrThat.func.give.choices_startingAttributes = (choices)=>{
    for(let i = 0; i < choices.length; i++){
        let choice = choices[i];
            choice.classList.remove('highlightCorrect', 'highlightWrong', 'selected');
    };
};

thisOrThat.func.give.feedback_displayAttributes = (feedback)=>{
    feedback.classList.add('displayBlock');
};

thisOrThat.func.give.feedback_startingAttributes = (feedbacks)=>{
    for(let i = 0; i < feedbacks.length; i++){
        let feedback = feedbacks[i];
            feedback.classList.add('displayNone');
            feedback.classList.remove('displayBlock');
    };
};

thisOrThat.func.give.feedbackType_correctAttributes = (feedback)=>{
    let feedbackType = feedback.children[0];
    feedbackType.classList.add('displayBlock');
    feedbackType.classList.remove('displayNone');
};

thisOrThat.func.give.feedbackType_wrongAttributes = (feedback)=>{
    let feedbackType = feedback.children[1];
    feedbackType.classList.add('displayBlock');
    feedbackType.classList.remove('displayNone');
};

thisOrThat.func.give.feedbackTypes_startingAttributes = (feedbackTypes)=>{
    for(let i = 0; i < feedbackTypes.length; i++){
        let feedbackType = feedbackTypes[i];
            feedbackType.classList.add('displayNone');
            feedbackType.classList.remove('displayBlock');
    };
};

thisOrThat.func.give.nextSection_displayAttributes = (nextSection)=>{
    nextSection.classList.add('displayBlock');
};

thisOrThat.func.give.resetButtons_eventListeners = ()=>{
    let resetButtons = document.querySelectorAll(`.thisOrThat .resetButton`);
    for(let i = 0; i < resetButtons.length; i++){
        let resetButton = resetButtons[i];
            resetButton.addEventListener('click', thisOrThat.func.event.resetActivity);
    };
};

thisOrThat.func.give.sectionsExceptFirst_startingAttributes = (sectionsExceptFirst)=>{
    for(let i = 0; i < sectionsExceptFirst.length; i++){
        let section = sectionsExceptFirst[i];
            section.classList.add('displayNone');
            section.classList.remove('displayBlock');
    };
};

thisOrThat.func.give.thisOrThatPieces_ids_and_startingAttributes = ()=>{
    new Promise(function(resolve, reject) {

        // GET: thisOrThat
        let thisOrThats = document.querySelectorAll(`.thisOrThat`);
        // LOOP: thisOrThats
        for(let i = 0; i < thisOrThats.length; i++){
            let thisOrThat    = thisOrThats[i];
            // GIVE: thisOrThat id
            let thisOrThat_id = thisOrThat.id;

            // GET: sections
            let sections = document.querySelectorAll(`#${thisOrThat_id} .section`);
            // LOOP: sections
            for(let i = 0; i < sections.length; i++){
                let section = sections[i];
                // CREATE: section_id
                let section_id = `${thisOrThat_id}-section_${i}`; // combines thisOrThat_id with unique section_#
                // GIVE: section section_id
                section.id = section_id;
                // GIVE: all sections (excluding 1st) displayNone class
                if( i > 0){
                    section.classList.add('displayNone');
                };

                // GET: choices
                let choices = document.querySelectorAll(`div.section#${section_id} div[class^='choice']`);
                // LOOP: choices
                for(let i = 0; i < choices.length; i++){
                    let choice = choices[i];
                    // GIVE: choice section_id
                    choice.id = section_id;
                    // GET: choiceButton
                    let choiceButton = choice.lastElementChild;
                    // GIVE: choiceButton section_id
                    choiceButton.id = section_id;
                };

                // GET: feedback
                let feedback = section.lastElementChild;
                // GIVE: feedback section_id
                feedback.id = section_id;
                // GIVE: feedback displayNone class
                feedback.classList.add('displayNone');

                // GET: feedbackTypes (correct and wrong)
                let feedbackTypes_correctAndWrong = feedback.children;
                // LOOP: feedbackTypes
                for(let i = 0; i < feedbackTypes_correctAndWrong.length; i++){
                    let feedback_type = feedbackTypes_correctAndWrong[i];
                    // GIVE: feedbackType displayNone class
                    feedback_type.classList.add('displayNone');
                };
            };
            // END LOOP sections

            // GET: resetButton
            let resetButton = thisOrThat.lastElementChild;
            // GIVE: resetButton thisOrThat_id
            resetButton.id = thisOrThat_id;
        };
        // END LOOP thisOrThat
    });
    // END promise
};

thisOrThat.func.give.thisOrThats_ids = ()=>{
    return new Promise((resolve)=>{
        // GET:
        let thisOrThats = document.querySelectorAll(`.thisOrThat`);
        // LOOP:
        for(let i = 0; i < thisOrThats.length; i++){
            let thisOrThat = thisOrThats[i];
            // GIVE: thisOrThat id
            thisOrThat.id = `thisOrThat_${i}`;
            if( i === thisOrThats.length -1){ // end of loop
                resolve();
            };
        };
    });
};

/*
IS
*/
thisOrThat.func.is.choiceCorrect = (button, answer)=>{
    let choice = button.parentNode;
    if( choice == answer){
        return true;
    }
    else{
        return false;
    };
};

/*
START
*/
thisOrThat.func.start = async()=>{
    console.log('hello philosopher');
    // GIVE:
    await thisOrThat.func.give.thisOrThats_ids();
    await thisOrThat.func.give.thisOrThatPieces_ids_and_startingAttributes();
    thisOrThat.func.give.choiceButtons_eventListeners();
    thisOrThat.func.give.resetButtons_eventListeners();
};
thisOrThat.func.start();
