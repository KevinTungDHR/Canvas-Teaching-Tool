export default class View {
  constructor({defaults: defaults, renderView: renderView}){
    this.defaultBody = "<h1>hello</h1><canvas id='canvas'></canvas>";
    this.defaultJS = "<script><script>";
    this.inputJS = "";
    this.renderView = renderView;
    this.setupView = this.setupView.bind(this);
    this.renderView.addEventListener("load", this.setupView);
  }

  setupView(){
    let content = { type: "html", value: this.defaultBody }
    this.renderView.contentWindow.postMessage(content, "*");
  }

  updateContent(content){
    this.renderView.contentWindow.postMessage(content, "*");
  }
}
//     <script>
// document.head.append('<link rel="stylesheet" href="./dist/main.css" />')
// </script>