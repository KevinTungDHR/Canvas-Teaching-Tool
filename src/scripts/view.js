export default class View {
  constructor({defaults: defaults, renderView: renderView}){
    this.defaultBody = "<canvas id='canvas'></canvas>";
    this.defaultJS = defaults.setup;
    this.renderView = renderView;
    this.setupView = this.setupView.bind(this);
    this.renderView.addEventListener("load", this.setupView);
  }

  setupView(){
    let htmlContent = { type: "html", value: this.defaultBody }
    this.renderView.contentWindow.postMessage(htmlContent, "*");
    let jsSetup = { type: "setupScript", value: this.defaultJS }
    this.renderView.contentWindow.postMessage(jsSetup, "*");
  }


  updateContent(content){
    this.renderView.contentWindow.postMessage(content, "*");
  }
}
