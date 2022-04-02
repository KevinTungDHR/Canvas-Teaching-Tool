export default class Editor{
  constructor({editor: el, iframe: iframe }){
    this.el = el;
    this.iframe = iframe;
    // this.output = `<script>${this.el.getValue()}</script>`;
    this.handleInput = this.handleInput.bind(this);
    this.el.on("keyup", this.handleInput);
  }

  handleInput(event){
    // Wrap everything in an anonymous function so that you can redeclare variables
    const value = `(() => {${this.el.getValue()}})()`;
    const script = { type: 'script', value };
    this.iframe.contentWindow.postMessage(script, '*');
    console.log("hello")
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