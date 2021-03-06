# Web Design for Everybody Capstone by University of Michigan

## About this Course

The capstone will develop a professional-quality web portfolio.  Students will demonstrate the ability to design and implement a responsive site for a minimum of three platforms.  Adherence to validation and accessibility standards will be required. The evolving student implementations will be reviewed each week by capstone peers and teaching assistants to make sure that the student keeps up with the agenda of the course. 

Upon completion of this course students will feel comfortable creating and/or updating existing front-end sites, utilizing existing frameworks, and testing sites for accessibility compliance.

This course is only open to students who have completed the first four courses in the Web Design for Everybody specialization: Introduction to HTML5, Introduction to CSS3, Interactivity with JavaScript, and Advanced Styling with Responsive Design.

## Skills you will gain
- Web Design
- Html
- JavaScript
- Cascading Style Sheets (CCS)


# Portfolio Grading Rubric

I hope that people will be more concerned with their learning than their grade on this assignment. But I understand that people want to make sure they receive full credit so I will provide the grading rubric that will be used. Feel free to structure your page around it.

- Does the site validate? 10pts YES
- Is the site responsive? 20pts
- Is the site well-styled? 10pts
- Are the images incorporated effectively? 5pts
- Successfully demonstrated the ability to enhance their site? 40pts

## Does the site validate?

- 10pts – Fully validates (warnings are fine)
- 8 pts – There are errors, but the student has shown (in their write-up or video) that they are caused by plugins and can not be fixed.
- 6 pts – There are at most 3 errors for the entire site
- 3pts – They have only shown that part of the site validates. (For instance, only tested one of the files in a multi-file site.)
- 0 pts – More than three errors were left or the site was not tested at all.

## Is the site responsive?

- 20pts Yes, the site has a unique look/layout for each of the views.
- 10pts The site has a unique look, but not a unique layout. (For example, they changed only colors of fonts, not the actual layout.)
- 6pts Only some of the pages are responsive - not all of them.
- 0pts The site is not responsive

## Is the site well-styled?

This is very objective. It should be difficult to score a high score, but not difficult to receive the majority of the points. It is important that everyone create a unique style sheet, even if using a template or framework. Look for feedback in Week Five to improve your score.

- 10pts – The site is incredibly well-styled and the author went beyond the required (animation, hovering, etc done with CSS)
- 8pt – The site is very well-styled. The content has a layout that is easy to follow and a variety of colors and fonts were used. -- Most students can expect to receive this score.
- 4pts – The styling is lacking or the author relied almost exclusively on a template/framework.
- 0pts – Less than 9 unique CSS rules were used.

## Enhancements!!

You need to add four elements to your site that are unique – something beyond what we did in the four previous courses. You are encouraged to be as creative as you would like (and creative does not need to mean time-intensive). Some options for these "extras" include:

- Add custom JavaScript (e.g. incorporate dynamic content, use JS to perform verification, modify the DOM)
- Enhance the accessibility of your page (e.g. put your site through the some subset of the WebAim quick evaluation reference - http://webaim.org/resources/evalquickref/)
- Incorporate plugins (e.g. Google Calendar, a map, parallax, etc.) You will need to show what you did other than just copying code. Did you need to change any of the attributes? Change any of the links?
- Include a Carousel for your images (don't forget to turn off the automatic start feature if you can!!)
- Use a sticky footer to create a consistent look across different browser heights (we usually only consider widths…)
- Add a third viewport layout (e.g. a table view that is different than mobile or large-screen) 

## talk about features

### 1. Responsive images with source set
  node app.js
  creates image widths : [400, 600, 800, 1600] for every photo
  
  /src/assets/processed-images

  whoami.pug
  -----------------------------------------------------------------------------------------
  source(media="(max-width: 600px)" srcset="/assets/img/processed-images/profile1_400w.webp")
  source(media="(max-width: 700px)" srcset="/assets/img/processed-images/profile1_600w.webp")
  source(media="(max-width: 800px)" srcset="/assets/img/processed-images/profile1_800w.webp")

### 2. broken images are filled in
- uses jquery to replace broken images

### 3. Scrolling feature
- Pages for blog and portfolio fetch more cards when scrolling
 to the bottom

### 4. Animated Progress bar
- https://kimmobrunfeldt.github.io/progressbar.js/


## 5. Animate pages 
- home page custom animation 
- animation libraries
- https://wowjs.uk/   and  https://michalsnik.github.io/aos/

### 6. Scroll typing on home page 
- https://github.com/mattboldt/typed.js




Again, these are just suggestions, please feel free to let your own creativity be your guide.

Each extra will be worth 10 pts, for a total of 40 pts.


Here is a list of suggestions from previous students.

    Color Schemes: https://coolors.co/
    Images/Icons: https://thenounproject.com/, http://fontawesome.io/ (this is covered in a later lecture)
    Creative Commons: https://creativecommons.org/
    Fonts: https://www.fontsquirrel.com/, http://www.dafont.com/