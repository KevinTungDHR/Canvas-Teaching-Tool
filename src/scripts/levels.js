export const levels = [
  {
    setup: { 
      background:`
        const canvas = document.getElementById('background');
          if (canvas.getContext) {
            var ctx = canvas.getContext('2d');
            ctx.fillRect(25, 25, 100, 100);
            ctx.clearRect(45, 45, 60, 60);
            ctx.strokeRect(50, 50, 50, 50);
          }
        `, 
      main: `let canvas = document.getElementById('canvas')\n\tlet ctx = canvas.getContext('2d')\n\tctx.fillRect(10, 10, 100, 100)`,
    },
    instructions: 'Change the x and y arguments of ctx.fillRect to position the rectangle onto the end zone',
    solution(userInput) {
      return /ctx.fillRect\(100,\s*100,\s*200,\s*200\)/.test(userInput)
    },
    readOnlyLines: [0,1],
    currentLevel: 0,
  },
  {
    setup: { 
      background:`
        const canvas = document.getElementById('background');
          if (canvas.getContext) {
            var ctx = canvas.getContext('2d');
            ctx.fillRect(25, 25, 100, 100);
            ctx.clearRect(45, 45, 60, 60);
            ctx.strokeRect(50, 50, 50, 50);
          }
        `, 
      main: `let canvas = document.getElementById('canvas')\n\tlet ctx = canvas.getContext('2d')\n\tctx.fillRect(10, 10, 100, 100)`,
    },
    instructions: 'LEVEL 2 YEA',
    solution(userInput) {
      return /ctx.fillRect\(100,\s*100,\s*200,\s*200\)/.test(userInput)
    },
    readOnlyLines: [0,1],
  }
]

