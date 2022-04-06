import pixelmatch from "pixelmatch";

function debounce(func, wait){
  let timer;
  return function executedFunction(...args){
    clearTimeout(timer);
    timer = setTimeout(func, wait);
  };
}

function mseCompare(){
  const iframe = document.querySelector('.render-view');
  const idoc = iframe.contentWindow.document;
  const solution = idoc.getElementById('solution');
  const userCanvas = idoc.getElementById('canvas');
  const solutionData = solution.getContext('2d').getImageData(0,0, solution.width, solution.height).data;
  const userCanvasData = userCanvas.getContext('2d').getImageData(0, 0, solution.width, solution.height).data;

  let sum = 0.0;
  // start at 3 for alpha channel
  for(let i = 3; i < solutionData.length; i += 4){
    let difference = solutionData[i] - userCanvasData[i];
    sum += Math.pow(difference, 2);
  }
  let mse = sum / (solution.width * solution.height);
  return mse;
}

function pixelCompare(){
  const iframe = document.querySelector('.render-view');
  const idoc = iframe.contentWindow.document;
  const solution = idoc.getElementById('solution');
  const userCanvas = idoc.getElementById('canvas');

  const output = document.createElement('canvas');
  const diffContext = output.getContext('2d');

  const img1 = solution.getContext('2d').getImageData(0,0, solution.width, solution.height);
  const img2 = userCanvas.getContext('2d').getImageData(0, 0, solution.width, solution.height);
  const diff = diffContext.createImageData(solution.width, solution.height);

  const numDiffPixels = pixelmatch(img1.data, img2.data, diff.data, solution.width, solution.height, {threshold: 0.1});
  return numDiffPixels;
}


// function pointChecker(x, y){
//   const iframe = document.querySelector('.render-view');
//   const idoc = iframe.contentWindow.document;
//   const userCanvas = idoc.getElementById('canvas');
//   const context = userCanvas.getContext('2d');
//   return context.isPointInPath(parseInt(x), parseInt(y))
// }

export { debounce, mseCompare, pixelCompare };