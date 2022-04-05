# JavaScript Proposal - Canvas Learning Tool

Welcome! This JavaScript app is designed for people to learn how to use the Canvas API / library as well as give users a place test out their ideas in realtime. This app contains two key features: a sandbox environment with a built-in browser code editor that updates the canvas elements in real time as well as a tutorial for teaching basic canvas concepts. 

### Sandbox -> Currently moved to a mvp ###
While you can write code directly in the editor, there will be sliders (or even draggable elements) that can adjust the properties of each drawn element that would update the written code. For example, sliding the posX slider for a rectangle should update the argument for the x parameter in the IDE. 

### Tutorial ###
Level-based tutorial that focuses on adjusting a few lines of code per level (i.e, change the context.rect(args) to place the rectangle within the goal zone). Each level will have example code as well as instructions on what the user should be trying to accomplish (i.e, move the drawn element into the box or rotate it 30 degrees). Each level will become progressively more difficult to focus on more and more advanced topics. 

## Functionality & MVPs ##

In **Canvas Learning Tool Working Title**, users will be able to:

  * Update canvas elements in realtime by writing directly in the browser
  * Be able to interact with drawn canvas elements through UI inputs such as sliders or input boxes
  * Update the written code by when using interacing with the UI (sliders, draggable elements)
  * Play through levels of the tutorial to gain a better grasp of the Canvas API
  * Select different levels to play through
  * Change the settings for increased difficulty
  * Get feedback when the code they write is incorrect
  * Learn Canvas!


In addition, this project will include:

  * A production README
  * An instructions page to explain how to interact with the UI in more detail

## Wireframes ##

![wireframe](wireframe.png)

  * Nav links will link to sandbox mode, tutorial mode, this GitHub repo and my LinkedIn
  * Instructions will provide directions for each level
  * Level select will provide arrow buttons to go to previous and next levels as well as a dropdown menu to select a specific level
  * Code editor to write JavaScript that will affect the canvas 2d elements on the
  * Canvas window that will be a direct correlation to the javascript in the code editor
  * Sliders that affect the 2D elements and a toggle button to collapse the slider window and expand the code editor.

## Technologies, Libraries, APIs ##
  * Canvas API for rendering 2D elements
  * CodeMirror (for syntax highlighting, indentation and linenumbers)
  * pixelMatch to check for canvas comparison (solution and user input) (perceptual hashing is the next step)
  * Webpack to bundle the JS modules for browser
  * npm to manage project dependencies

## Implementation Timeline ##
  * **Friday Afternoon & Weekend:** Setup Project, read overview of documentation for all necessary libraries (Canvas and CodeMirror). Create outline for the number of levels and what each level should accomplish. Decide what Canvas functionality to focus on. Get basic code editor functionality down so that the user can put elements on the screen.

  * **Monday:** Create "game" level logic for the tutorial. Make sure that the game states change correctly from completing the level as well as from using the level selector. Restrict user inputs so that they can't write more code than they should be allowed (the goal for level 1 might be simply to move a shape to the right spot).

  * **Tuesday:** Continue working on the tutorial. Add animations for each game level. Create a toggle for for easy, intermediate and hard **modes** (Easy is default, intermediate hides the instructions, etc.)

  * **Wednesday:** Focus on styling not only the app but the inner canvas elements as well. (while users should be focused on basic canvas functionality the elements can still be complex and look nice.)

  * **Thursday Morning:** Deploy to GitHub pages. Rewrite the current README.

## Bonus features ##

  * Adding intermediate, and advanced levels to show more complex Canvas concepts.
  * Having tabs in the Code Editor to show the underyling HTML and CSS of the canvas elements.
  * Create draggable canvas elements.
  * Hover over elements to provide tool tips
  * Animated demos to provide examples of how Canvas elements work. (Check the arcTo mdn docs to see their loops);