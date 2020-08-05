# FCC-Build a Random Quote Machine

## Tools used

- HTML
- CSS
- JS
- JQuery
- Ajax request




## User Stories

- User Story #1: I can see a wrapper element with a corresponding id="quote-box".

- User Story #2: Within #quote-box, I can see an element with a corresponding id="text".

- User Story #3: Within #quote-box, I can see an element with a corresponding id="author".

- User Story #4: Within #quote-box, I can see a clickable element with a corresponding id="new-quote".

- User Story #5: Within #quote-box, I can see a clickable a element with a corresponding id="tweet-quote".

- User Story #6: On first load, my quote machine displays a random quote in the element with id="text".

- User Story #7: On first load, my quote machine displays the random quote's author in the element with id="author".

- User Story #8: When the #new-quote button is clicked, my quote machine should fetch a new quote and display it in the #text element.

- User Story #9: My quote machine should fetch the new quote's author when the #new-quote button is clicked and display it in the #author element.

- User Story #10: I can tweet the current quote by clicking on the #tweet-quotea element. This a element should include the "twitter.com/intent/tweet" path in its href attribute to tweet the current quote.

- User Story #11: The #quote-box wrapper element should be horizontally centered. Please run tests with browser's zoom level at 100% and page maximized.

## Design
![project](https://res.cloudinary.com/dpj88/image/upload/v1591618661/fcc/front-libraries/quotemobile1_ntgsks.png)

![project](https://res.cloudinary.com/dpj88/image/upload/v1591618661/fcc/front-libraries/quotemobile_mppdez.png)

![project](https://res.cloudinary.com/dpj88/image/upload/v1591618660/fcc/front-libraries/quotemachine_z3qsu6.png)

## How the app executes

```
MODULE.initApp = function() {

    MODULE.setBackgroundColor();

    quoteType = MODULE.getQuoteType();

    MODULE.getQuoteAndSetDom(quoteType);

    MODULE.displayTimeAndDayToDom();
};
```