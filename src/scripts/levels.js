export const levels = [
  {
    setup: { visible: true, editable: false, script:`
    const canvas = document.getElementById('background');
      if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        ctx.fillRect(25, 25, 100, 100);
        ctx.clearRect(45, 45, 60, 60);
        ctx.strokeRect(50, 50, 50, 50);
      }
    `},
    instructions: null,
    solution(userInput) {
      return /ctx.fillRect\(100,\s+100,\s+200,\s+200\)/.test(userInput)
    },
    readOnlyLines: [0,1],
  }

]

