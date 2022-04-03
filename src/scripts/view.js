export default class View {
  constructor({level: level, renderView: renderView}){
    this.defaultBody = `
      <h1>hello</h1>
      <div class='canvas-container'>
        <canvas id='canvas' height="500px" width="500px"></canvas>
        <canvas id='background' height="500px" width="500px"></canvas>
      </div>`;
    this.level = level;
    this.renderView = renderView;
    this.setupView = this.setupView.bind(this);
    this.renderView.addEventListener("load", this.setupView);
    // BAD: Adding a new event listener everytime we change levels
  }
  
  // need to update iframe to reflect code editor
  setupView(){
    let htmlContent = { type: "html", value: this.defaultBody }
    this.renderView.contentWindow.postMessage(htmlContent, "*");
    const setupVal = `(() => {${this.level.setup.background}})()`
    let jsSetup = { type: "setupScript", value: setupVal }
    this.renderView.contentWindow.postMessage(jsSetup, "*");
    const value = `(() => {${this.level.setup.main}})()`
    const script = { type: 'script', value: value };
    this.updateContent(script)
  }

  updateContent(content){
    this.renderView.contentWindow.postMessage(content, "*");
  }
}
