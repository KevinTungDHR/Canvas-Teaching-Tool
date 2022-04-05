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
  return mse
}

export { debounce, mseCompare };