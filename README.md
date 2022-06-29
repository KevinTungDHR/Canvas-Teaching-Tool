# Can I Canvas?

## Description ##
[Can I Canvas?](https://kevintungdhr.github.io/canvas-teaching-tool/) is designed for people to learn how to use the Canvas API / library as well as give users a place test out their ideas in realtime. This app contains a built-in browser code editor that updates the canvas elements in real time as well as a tutorial for teaching basic canvas concepts. 

### Tutorial ###
Level-based tutorial that focuses on adjusting a few lines of code per level (i.e, change the context.rect(args) to place the rectangle within the goal zone). Each level will have example code as well as instructions on what the user should be trying to accomplish (i.e, move the drawn element into the box or rotate it 30 degrees). Each level will become progressively more difficult to focus on more and more advanced topics. 

### Languages and Technologies ###
  * Vanilla JavaScript
  * HTML5/CSS
  * Canvas for rendering 2D elements
  * CodeMirror Library (for code based text editor)
  * PixelMatch (for solution checking)
  * Webpack to bundle the JS modules for browser


## Layout ##

![MainPage](MainPage.png)

![EventListener](AddEventListener.png)
Ability to addEventListeners in the browser ide that reflect changes on the canvas.

## Code Snippets ##

![utilFunctions](https://user-images.githubusercontent.com/59035434/162250607-be7f094a-af5c-4f6a-9b6c-41342431c365.png)
Creating debounce and throttle functions in order to restrict excessive client updates.

![MeanSquareError](https://user-images.githubusercontent.com/59035434/162250735-4b9de035-5aa9-4bb2-a033-9d9d729f91af.png)
We use a hidden canvas with the solution that is compared with the user's outputted canvas to calculate the mean square error. If the MSE is below a threshold the answer is considered correct.

![RegExp](https://user-images.githubusercontent.com/59035434/162251139-f2c8dc99-8ced-4a3d-bdc6-195f9aa9dc06.png)
Using RegExp and MSE to compare that the user's given answer and the solution match up.

## Functionalities and MVPs ##

In **Can I Canvas?**, users will be able to:

  * Update canvas elements in realtime by writing directly in the browser
  * Play through levels of the tutorial to gain a better grasp of the Canvas API
  * Select different levels to play through
  * Code with full JavaScript functionality in the browser
  * Learn Canvas!

## Future Considerations ##
  * Give better feedback when the code they write is incorrect
  * Hover over elements to provide tool tips
  * Hints to problems
  * A button to toggle a solutions reveal
  * Add a perceptual hashing algorithm for compare solutions to the user input.
  * Adding intermediate, and advanced levels to show more complex Canvas concepts.
  * Having tabs in the Code Editor to show the underyling HTML and CSS of the canvas elements.
  * Animated demos to provide examples of how Canvas elements work.

## Wireframes ##

![wireframe](wireframe.png)


