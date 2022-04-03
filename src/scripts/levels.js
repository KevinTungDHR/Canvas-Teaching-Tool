export const levels = [
  {
    currentLevel: 0,
    readOnlyLines: [0,1],
    setup: { 
      background:`
        const canvas = document.getElementById('background');
          if (canvas.getContext) {
            var ctx = canvas.getContext('2d');
            ctx.setLineDash([5]);
            ctx.beginPath();
            ctx.rect(100,100,200,200);
            ctx.stroke();
          }
        `, 
      main: `let canvas = document.getElementById('canvas')\n\tlet ctx = canvas.getContext('2d')\n\tctx.fillRect(10, 10, 100, 100)`,
    },
    instructions: 'Change the x and y arguments of ctx.fillRect to position the rectangle onto the end zone',
    solution(userInput) {
      return /ctx.fillRect\(100,\s*100,\s*200,\s*200\)/.test(userInput)
    },
  },
  {
    currentLevel: 1,
    readOnlyLines: [],
    setup: { 
      background:`
      
        `, 
      main: `let canvas = document.getElementById('canvas')\n\tlet ctx = canvas.getContext('2d')\n\tctx.fillRect(10, 10, 100, 100)`,
    },
    instructions: 'Adjust the width and height of the rectangle to cover the dotted zone',
    solution(userInput) {
      return /ctx.fillRect\(100,\s*100,\s*200,\s*200\)/.test(userInput)
    },
  },
  {
    currentLevel: 2,
    readOnlyLines: [],
    setup: { 
      background:`
      
        `, 
      main: `let canvas = document.getElementById('canvas')\n\tlet ctx = canvas.getContext('2d')\n\tctx.fillRect(10, 10, 100, 100)`,
    },
    instructions: 'Adjust the width and height of the rectangle to cover the dotted zone',
    solution(userInput) {
      return /ctx.fillRect\(100,\s*100,\s*200,\s*200\)/.test(userInput)
    },
  },
  {
    currentLevel: 3,
    readOnlyLines: [],
    setup: { 
      background:`
      
        `, 
      main: `let canvas = document.getElementById('canvas')\n\tlet ctx = canvas.getContext('2d')\n\tctx.fillRect(10, 10, 100, 100)`,
    },
    instructions: 'Adjust the width and height of the rectangle to cover the dotted zone',
    solution(userInput) {
      return /ctx.fillRect\(100,\s*100,\s*200,\s*200\)/.test(userInput)
    },
  },
  {
    currentLevel: 4,
    readOnlyLines: [],
    setup: { 
      background:`
      
        `, 
      main: `let canvas = document.getElementById('canvas')\n\tlet ctx = canvas.getContext('2d')\n\tctx.fillRect(10, 10, 100, 100)`,
    },
    instructions: 'Adjust the width and height of the rectangle to cover the dotted zone',
    solution(userInput) {
      return /ctx.fillRect\(100,\s*100,\s*200,\s*200\)/.test(userInput)
    },
  },
  {
    currentLevel: 5,
    readOnlyLines: [],
    setup: { 
      background:`
      
        `, 
      main: `let canvas = document.getElementById('canvas')\n\tlet ctx = canvas.getContext('2d')\n\tctx.fillRect(10, 10, 100, 100)`,
    },
    instructions: 'Adjust the width and height of the rectangle to cover the dotted zone',
    solution(userInput) {
      return /ctx.fillRect\(100,\s*100,\s*200,\s*200\)/.test(userInput)
    },
  },
  

]

