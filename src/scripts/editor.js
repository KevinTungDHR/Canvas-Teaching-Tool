export default class Editor{
  constructor({editor: el, iframe: iframe }){
    this.el = el;
    this.iframe = iframe;
    this.output = `<script>${this.el.getValue()}</script>`;
    this.handleInput = this.handleInput.bind(this);
    this.el.on("keyup", this.handleInput);
  }

  handleInput(event){
    this.output = 
    `<html>
      <canvas id="canvas">
      </canvas>
    </html>
    <script>
      ${this.el.getValue()}
    </script>`;
    this.iframe.setAttribute("srcdoc", this.output);
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