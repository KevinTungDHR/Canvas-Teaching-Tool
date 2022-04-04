function compare(){
  const solution = document.getElementById('solution');
  const userCanvas = document.getElementById('canvas');
  const solutionData = solution.getContext('2d').getImageData(0,0, solution.width, solution.height);
  const userCanvasData = solution.getContext('2d').getImageData(0, 0, solution.width, solution.height);
  // start at 3 for alpha channel
  for(let i = 3; i < solutionData.length; i += 4){
    const answerAlpha = solutionData[i];
    const userAlpha = userCanvasData[i];
    for (let i = 1; i <= 5; i++) {
      let bottomPixel = i + solutionData.width * 4;
      let top = i + solutionData.width * 4;
      let leftPixel = i + solutionData.width * 4;
      let leftPixel = i + solutionData.width * 4;



      if (solution[currentPixel] === test[currentPixel] ||
        solution[currentPixel] === test[currentPixel] ||
        solution[currentPixel] === test[currentPixel] ||
        solution[currentPixel] === test[currentPixel]){

        }
    }
  }
}
