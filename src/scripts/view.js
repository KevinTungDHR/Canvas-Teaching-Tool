export default class View {
  constructor({defaults: defaults, renderView: renderView}){
    this.defaultBody = `
      <div class='canvas-container'>
        <canvas id='canvas'></canvas>
        <canvas id='background'></canvas>
      </div>`;
    this.defaultJS = defaults.setup;
    this.renderView = renderView;
    this.setupView = this.setupView.bind(this);
    this.renderView.addEventListener("load", this.setupView);
  }
  
  // need to update iframe to reflect code editor
  setupView(){
    let htmlContent = { type: "html", value: this.defaultBody }
    this.renderView.contentWindow.postMessage(htmlContent, "*");
    let jsSetup = { type: "setupScript", value: this.defaultJS.script }
    this.renderView.contentWindow.postMessage(jsSetup, "*");
    console.log("view setup")
    const value = `(() => {let canvas = document.getElementById('canvas')
    let ctx = canvas.getContext('2d')
    ctx.fillRect(100, 100, 200, 200)})()`;
    const script = { type: 'script', value };
    this.updateContent(script)
  }

  updateContent(content){
    this.renderView.contentWindow.postMessage(content, "*");
    console.log('updatecontent')
  }
}
