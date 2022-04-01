export default class View {
  constructor({renderView: renderView}){
    this.defaultHTML = "<HTML></HTML>";
    this.defaultCSS = "<style></style>";
    this.defaultJS = "<script><script>";
    this.inputJS = "";
    this.renderView = renderView;
  }

  changeOutput(input){
    this.inputJS = `<script>${input}</script>`;
    this.renderView.setAttribute("srcdoc", this.inputJS);
  }
}