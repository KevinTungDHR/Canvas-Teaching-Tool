export default class Editor{
  constructor({editor: el, view: view }){
    this.el = el;
    this.view = view;
    this.handleInput = this.handleInput.bind(this);
    this.el.on("keyup", this.handleInput);
  }

  handleInput(event){
    // Wrap everything in an anonymous function so that you can redeclare variables
    // Need to find a fix for global variables
    const value = `(() => {${this.el.getValue()}})()`;
    const script = { type: 'script', value };

    this.view.updateContent(script);
  }
}

// Sample code to draw rectangle found online for testing purposes only
// function draw() {
//   var canvas = document.getElementById('canvas');
//   if (canvas.getContext) {
//     var ctx = canvas.getContext('2d');
//     ctx.fillRect(25, 25, 100, 100);
//     ctx.clearRect(45, 45, 60, 60);
//     ctx.strokeRect(50, 50, 50, 50);
//   }
// }