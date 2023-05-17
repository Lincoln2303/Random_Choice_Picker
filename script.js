// II.01. We'll save the tags firs:
const tagsEl = document.getElementById('tags');
// Ii.02. We'll need the textarea too:
const textarea = document.getElementById('textarea');

// II.03. We're going to call the focus method on textarea:
// NOTE: focus method will automatically put the cursor there, when we visit the page (nothing more!)
textarea.focus();

// II.04. We want an eventlistener on textarea: (NOTE: We have to pass in an event parameter)
// NOTE: keyup event happens when we are pressing down the button, and let it go
textarea.addEventListener('keyup', (e) => {
    // Testing: (NOTE: We have a "target" element on the event "e", and we'll need the "value" of that!)
    // console.log(e);
    // II.05. When that happens, we're calling a function: (NOTE: That we'll write below)
    createTags(e.target.value);
    // III.01. In our eventlistener, first we're checking if we hit enter:
    // NOTE: We're using the "key" property on event, and see if it equals to enter
    if (e.key === 'Enter') {
        // III.03. We're setting a setTimeOut() function: (NOTE: We'll wait 10ms, and clear the input value)
        // NOTE: We also have to clean the input:
        // AFTER: We're adding randomSelect() function at the bottom (III.04.)
        setTimeout(() => {
            e.target.value = ''; // NOTE: We're setting the input value to nothing ''
            textarea.disabled = true;
        }, 10) // NOTE: This stands for 10 milliseconds
        // III.02. If we hit enter, we'll call a function randomSelect()
        randomSelect();
    }
}) 

// II.06. Making createTags function: (NOTE: Text it out what do you get back if you print out the input => We should see what we type in)
// NOTE: We want to divide (split) them by using a comma (It's creating an array with that, and we can use the values from it)
function createTags(input) {
    // Testing:
    // console.log(input);
    // II.07. Saving tags, and using the split() method: (NOTE: That splits the string into an array, with substrings on it)
    // NOTE: We're using the input for that, and the split method with the comma passed in
    // EXTRA NOTE: filter() high ordered array method, that allow us to return something based on a conditional (we'll trim all whitespace)
    const tags = input.split(',').filter(tag => tag.trim() !== '').map(tag => tag.trim());
    // Testing:
    // console.log(tags);
    // II.08. We're setting the tags to be empty: (NOTE: This is setting it to nothing '' before we do anything)
    tagsEl.innerHTML = '';
    // II.09. After we're looping through the tags:
    tags.forEach(tag => {
        // II.10. Inside we're going to create a new element: (NOTE: a span)
        const tagEl = document.createElement('span');
        // II.11. We also want to add a class for that: (NOTE: By this the tag's style is going to apply on them)
        tagEl.classList.add('tag');
        // II.12. We want to set the innertext to be equal to the tag:
        tagEl.innerText = tag;
        // II.13. Finally we're using "appendChild()": (NOTE: And passing in the tagEl)
        // AFTER: We're going to do the select random animation in section III.
        tagsEl.appendChild(tagEl);
    });
}

// III.04. Adding randomSelect function:
function randomSelect() {
    // Testing: (NOTE: This should come up when we hit enter)
    // console.log(123);
    // III.05. Here first we're setting a value of times:
    // NOTE: This represents the number of times as we highlight each tag before it stops
    const times =  30;
    // III.06. Then we create a variable interval: (NOTE: We want to use the setInterval() function)
    const interval = setInterval(() => {
        // III.07. We're picking a random tag: (NOTE: And we set that to a function pickRandomTag(), and we add that below)
        const randomTag = pickRandomTag();
        // III.14. Adding highlightTag function(): (NOTE: To highlight the tag duuh)
        highlightTag(randomTag);
        // III.15. After right away, we want to unhighlight it: (NOTE: We use setTimeOut() function for that)
        setTimeout(() => {
            unHighlightTag(randomTag); // NOTE: We have to pass in the randomTag here too
        }, 100) // NOTE: We're gonna wait 100 milliseconds here to unhighlight. => This is for hihglight/unhighlight those tags
    }, 100) // NOTE: We want this to happen every 100 milliseconds => This is for switching between tags
    // III.16. Here we add a setTimeOut with a function:
    setTimeout(() => {
        // III.17. We're adding a function here that stopts the interval:
        clearInterval(interval); 
        // III.18. Then we want to pick a random tag to stop on:
        setTimeout(() => {
            // III.19. Inside here we create a random tag: (NOTE: Calling here pickrandomTag function)
            const randomTag = pickRandomTag();
            // III.20. Then we want to highlight it:
            highlightTag(randomTag);
            textarea.disabled = false;
        }, 100)
    }, times * 100) // NOTE: We're using times here, and we have to multiply that with 100 milliseconds too 
}

// III.08. Adding pickRandomTag() function:
function pickRandomTag() {
    // III.09. We want to take all the tags: (NOTE: We want all the element with class tag)
    const tags = document.querySelectorAll('.tag');
    // III.10. Then to get a random one, we'll return it from an array that it creates:
    // NOTE: Then we use Math.floor(), and Math.random(), and multiplied by the length of the tags array (or nodelist )
    return tags[Math.floor(Math.random() * tags.length)] 
}

// III.11. We also create two more functions for highlighting, and unhighlighting the tags:
function highlightTag(tag){
    // III.12. We're gonna take that tag element, and add a class
    tag.classList.add('highlight');
}

// III.13. Creating function for unhighlighting the tag:
// AFTER: We add it to setInterval (III.14.)
function unHighlightTag(tag){
    tag.classList.remove('highlight');
}




