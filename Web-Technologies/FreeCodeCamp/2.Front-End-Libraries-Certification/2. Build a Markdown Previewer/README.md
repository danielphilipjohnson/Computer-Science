# FCC-Build a Markdown Previewer

## Tools used

- HTML
- CSS
- bootstrap 4
- JS
- React


## User Stories
- User Story #1: I can see a textarea element with a corresponding id="editor".

- User Story #2: I can see an element with a corresponding id="preview".

- User Story #3: When I enter text into the #editor element, the #preview element is updated as I type to display the content of the textarea.

- User Story #4: When I enter GitHub flavored markdown into the #editor element, the text is rendered as HTML in the #preview element as I type (HINT: You don't need to parse Markdown yourself - you can import the Marked library for this: https://cdnjs.com/libraries/marked).

- User Story #5: When my markdown previewer first loads, the default text in the #editor field should contain valid markdown that represents at least one of each of the following elements: a header (H1 size), a sub header (H2 size), a link, inline code, a code block, a list item, a blockquote, an image, and bolded text.

- User Story #6: When my markdown previewer first loads, the default markdown in the #editor field should be rendered as HTML in the #preview element.

- Optional Bonus (you do not need to make this test pass): My markdown previewer interprets carriage returns and renders them as br (line break) elements.


## Design
![project](https://res.cloudinary.com/dpj88/image/upload/v1591618662/fcc/front-libraries/design_flhjxp.png)


## To run
``` 
  npm install
```

## Folder Structure

After creation, your project should look like this:

```
1. Build a Markdown Previewer/
  node_modules/
  public/
    css/
      styles.css
    favicon.ico
    index.html
  src/
    components/
      DisplayContainer.js
      MarkDownEditor.js
      MarkDownPreviewer.js
    App.css
    App.js
    App.test.js
    index.css
    index.js
  design.PNG
  README.md
 
 
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.