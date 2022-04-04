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
            ctx.rect(340,190,170,170);
            ctx.stroke();
          }
        `, 
      main: `let canvas = document.getElementById('canvas');\nlet ctx = canvas.getContext('2d');\nctx.fillRect(10, 10, 150, 150);`,
    },
    instructions: 'Change the x and y arguments of ctx.fillRect to position the rectangle onto the end zone',
    solution(userInput) {
      const exp = /ctx.fillRect\((\d+)\s*,\s*(\d+)\s*,\s*150\s*,\s*150\s*\)/;
      const matches = userInput.match(exp);
      if (matches && matches.length === 3){
        let x = parseInt(matches[1]);
        let y = parseInt(matches[2]);
        return (x >= 340 && x <= 360 && y >= 190 && y <= 210);
      }
      return false;
    },
  },
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
      const exp = /ctx.fillRect\(\s*160\s*,\s*110\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/;
      const matches = userInput.match(exp);
      if (matches && matches.length === 3){
        let x = parseInt(matches[1]);
        let y = parseInt(matches[2]);
        return (x >= 270 && x <= 290 && y >= 270 && y <= 290);
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
            ctx.rect(500,500,70,70);
            ctx.stroke();
          }
      `, 
      main: `let canvas = document.getElementById('canvas');\nlet ctx = canvas.getContext('2d');`,
    },
    instructions: 'Use the fillStyle() and fillRect() methods to create a blue rectangle within the dotted zone',
    solution(userInput) {
      const colorExp = /ctx.fillStyle\s*=\s*["']blue["']/;
      if(!colorExp.test(userInput)){
        return false;
      }
      const exp = /ctx.fillRect\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/;
      const matches = userInput.match(exp);
      if (matches && matches.length === 5){
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
    instructions: 'Use the fillStyle() and fillRect() methods on the context to create a blue rectangle within the dotted zone',
    solution(userInput) {
      const colorExp = /ctx.fillStyle\s*=\s*["']blue["']/;
      if(!colorExp.test(userInput)){
        return false;
      }
      const exp = /ctx.fillRect\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/;
      const matches = userInput.match(exp);
      if (matches && matches.length === 5){
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
    readOnlyLines: [0,1],
    setup: { 
      background:`
      const canvas = document.getElementById('background');
        if (canvas.getContext) {
          var ctx = canvas.getContext('2d');
          ctx.setLineDash([5]);
          ctx.beginPath();
          ctx.rect(580,30,80,80);
          ctx.stroke();
          ctx.closePath();
          ctx.beginPath();
          ctx.fillStyle = "blue"
          ctx.fillRect(600,50,40,40);
        }
    `, 
      main: `let canvas = document.getElementById('canvas')\nlet ctx = canvas.getContext('2d')`,
    },
    instructions: 'Use the strokeStyle and strokeRect() to create a rectangle with red stroke and no fill within the dotted zone and not touching the blue square',
    solution(userInput) {
      const colorExp = /ctx.strokeStyle\s*=\s*["']red["']/;
      if(!colorExp.test(userInput)){
        return false;
      }
      const exp = /ctx.strokeRect\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/;
      const matches = userInput.match(exp);
      if (matches && matches.length === 5){
        let x = parseInt(matches[1]);
        let y = parseInt(matches[2]);
        let width = parseInt(matches[3]);
        let height = parseInt(matches[4]);
        return (x >= 580 && x <= 600 && y >= 30 && y <= 80 &&
           x + width >= 640 && y + height >= 90);
      }
      return false;
    },
  },
  {
    currentLevel: 5,
    readOnlyLines: [0,3],
    setup: { 
      background:`
      const canvas = document.getElementById('background');
        if (canvas.getContext) {
          var ctx = canvas.getContext('2d');
          ctx.setLineDash([5]);
          ctx.beginPath();
          ctx.rect(300,300,100,100);
          ctx.stroke();
        }
    `,  
      main: `let canvas = document.getElementById('canvas')\nlet ctx = canvas.getContext('2d')\nctx.fillStyle = "grey"\nctx.fillRect(0, 0, 845, 700)`,
    },
    instructions: 'Cut out a rectangle from the canvas using clearRect()',
    solution(userInput) {
      const exp = /ctx.clearRect\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/;
      const matches = userInput.match(exp);
      if (matches && matches.length === 5){
        let x = parseInt(matches[1]);
        let y = parseInt(matches[2]);
        let width = parseInt(matches[3]);
        let height = parseInt(matches[4]);
        return (x >= 300 && y >= 300 &&
           x + width <= 400 && y + height <= 400);
      }
      return false;
    },
  },
  {
    currentLevel: 6,
    readOnlyLines: [0,3],
    setup: { 
      background:`
      const canvas = document.getElementById('background');
        if (canvas.getContext) {
          var ctx = canvas.getContext('2d');
          ctx.setLineDash([5]);
          ctx.beginPath();
          ctx.rect(100,200,200,200);
          ctx.stroke();
          ctx.font = "18px sans-serif";
          ctx.fillText("dashed line rectangle", 120, 250);
          ctx.closePath()
          ctx.beginPath();
          ctx.rect(500,100,200,200);
          ctx.stroke();
          ctx.font = "18px sans-serif";
          ctx.fillText("solid, green rectangle", 520, 150);
          ctx.closePath()
          ctx.beginPath();
          ctx.rect(400,400,200,200);
          ctx.stroke();
          ctx.font = "18px sans-serif";
          ctx.fillText("clearRect", 450, 450);
          ctx.closePath()
        }
    `,  
      main: `let canvas = document.getElementById('canvas')\nlet ctx = canvas.getContext('2d')\nctx.fillStyle = "grey"\nctx.fillRect(0, 0, 845, 700)`,
    },
    instructions: 'Draw three rectangles within their zones:',
    solution(userInput) {
      // Need to work on solution
      if (!(/ctx.setLineDash/.test(userInput) && /ctx.fillStyle\s*=\s*["']green["']/)){
        return false;
      }

      const exp1 = /ctx.fillRect\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/;
      const exp2 = /ctx.strokeRect\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/;
      const exp3 = /ctx.clearRect\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/;

      const matches1 = userInput.match(exp1);
      if (matches1 && matches1.length === 5){
        let x = parseInt(matches1[1]);
        let y = parseInt(matches1[2]);
        let width = parseInt(matches1[3]);
        let height = parseInt(matches1[4]);
        if (!(x >= 300 && y >= 300 && x + width <= 400 && y + height <= 400)) {
          return false;
        }
      } else {
        return false;
      }

      const matches2 = userInput.match(exp2);
      if (matches1 && matches1.length === 5) {
        let x = parseInt(matches1[1]);
        let y = parseInt(matches1[2]);
        let width = parseInt(matches1[3]);
        let height = parseInt(matches1[4]);
        if (!(x >= 300 && y >= 300 && x + width <= 400 && y + height <= 400)) {
          return false;
        }
      } else {
        return false;
      }

      const matches3 = userInput.match(exp3);
      if (matches1 && matches1.length === 5) {
        let x = parseInt(matches1[1]);
        let y = parseInt(matches1[2]);
        let width = parseInt(matches1[3]);
        let height = parseInt(matches1[4]);
        if (x >= 300 && y >= 300 && x + width <= 400 && y + height <= 400) {
          return true;
        }
      }
      return false;
    },
  },
  

];

