export const levels = [
  {
    currentLevel: 1,
    readOnlyLines: [0,1],
    setup: { 
      background:`
        const canvas = document.getElementById('background');
          if (canvas.getContext) {
            var ctx = canvas.getContext('2d');
            ctx.setLineDash([5]);
            ctx.beginPath();
            ctx.rect(340,190,170,170);
            ctx.stroke();
          }
        `, 
      main: `let canvas = document.getElementById('canvas');\nlet ctx = canvas.getContext('2d');\nctx.fillRect(10, 10, 150, 150);`,
    },
    instructions: 'Change the x and y arguments of ctx.fillRect to position the rectangle onto the end zone',
    solution(userInput) {
      const exp = /ctx.fillRect\((\d+)\s*,\s*(\d+)\s*,\s*150\s*,\s*150\s*\)/
      const matches = userInput.match(exp)
      if (matches.length === 3){
        let x = parseInt(matches[1]);
        let y = parseInt(matches[2]);
        return (x >= 340 && x <= 360 && y >= 190 && y <= 210);
      }
      return false;
    },
  },
  {
    currentLevel: 2,
    readOnlyLines: [0,1],
    setup: { 
      background:`
      const canvas = document.getElementById('background');
        if (canvas.getContext) {
          var ctx = canvas.getContext('2d');
          ctx.setLineDash([5]);
          ctx.beginPath();
          ctx.rect(150,100,300,300);
          ctx.stroke();
          ctx.closePath();
          ctx.beginPath();
          ctx.rect(170,120, 260, 260);
          ctx.stroke();
        }
      `, 
      main: `let canvas = document.getElementById('canvas');\nlet ctx = canvas.getContext('2d');\nctx.fillRect(160, 110, 100, 100);`,
    },
    instructions: 'Adjust the width and height of the rectangle so that the edges of the rectange are between the dotted lines. Don\'t change the position!',
    solution(userInput) {
      const exp = /ctx.fillRect\(\s*160\s*,\s*110\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/
      const matches = userInput.match(exp)
      if (matches.length === 3){
        let x = parseInt(matches[1]);
        let y = parseInt(matches[2]);
        return (x >= 270 && x <= 290 && y >= 270 && y <= 290);
      }
      return false;
    },
  },
  {
    currentLevel: 3,
    readOnlyLines: [0,1],
    setup: { 
      background:`
        const canvas = document.getElementById('background');
          if (canvas.getContext) {
            var ctx = canvas.getContext('2d');
            ctx.setLineDash([5]);
            ctx.beginPath();
            ctx.rect(500,500,70,70);
            ctx.stroke();
          }
      `, 
      main: `let canvas = document.getElementById('canvas');\nlet ctx = canvas.getContext('2d');`,
    },
    instructions: 'Use the fillStyle() and fillRect() methods to create a blue rectangle within the dotted zone',
    solution(userInput) {
      const colorExp = /ctx.fillStyle\s*=\s*["']blue["']/
      if(!colorExp.test(userInput)){
        return false;
      }
      const exp = /ctx.fillRect\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/
      const matches = userInput.match(exp)
      if (matches.length === 5){
        let x = parseInt(matches[1]);
        let y = parseInt(matches[2]);
        let width = parseInt(matches[3]);
        let height = parseInt(matches[4]);
        return (x >= 500 && x + width <= 570 && y >= 500 && y + height <= 570);
      }
      return false;
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
  {
    currentLevel: 6,
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

