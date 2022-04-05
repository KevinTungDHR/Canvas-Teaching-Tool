import { mseCompare } from "./util";

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
    currentLevel: 3,
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
      if(/ctx.fillRect/.test(userInput)){
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
           x + width >= 640 && y + height >= 90 && x + width <= 660 && y + height <= 110);
      }
      return false;
    },
  },
  {
    currentLevel: 4,
    readOnlyLines: [0,1,2,3],
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
    currentLevel: 5,
    readOnlyLines: [0,1,2,3],
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

      const exp1 = /ctx.strokeRect\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/;
      const exp2 = /ctx.fillRect\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/g;
      const exp3 = /ctx.clearRect\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/;

      const matches1 = userInput.match(exp1);
      if (matches1 && matches1.length === 5){
        let x = parseInt(matches1[1]);
        let y = parseInt(matches1[2]);
        let width = parseInt(matches1[3]);
        let height = parseInt(matches1[4]);
        if (!(x >= 100 && y >= 200 && x + width <= 300 && y + height <= 400)) {
          return false;
        }
      } else {
        return false;
      }

      const matches2 = userInput.matchAll(exp2);
      if (matches2) {
        const arr = Array.from(matches2)[1];
        let x = parseInt(arr[1]);
        let y = parseInt(arr[2]);
        let width = parseInt(arr[3]);
        let height = parseInt(arr[4]);
        console.log(arr);
        console.log(x,y,width,height);
        if (!(x >= 500 && y >= 100 && x + width <= 700 && y + height <= 300)) {
          return false;
        }
      } else {
        return false;
      }

      const matches3 = userInput.match(exp3);
      if (matches3 && matches3.length === 5) {
        let x = parseInt(matches3[1]);
        let y = parseInt(matches3[2]);
        let width = parseInt(matches3[3]);
        let height = parseInt(matches3[4]);
        if (x >= 400 && y >= 400 && x + width <= 600 && y + height <= 600) {
          return true;
        }
      }
      return false;
    },
  },
  {
    currentLevel: 6,
    readOnlyLines: [0,1,2],
    setup: {
      background: `
      const canvas = document.getElementById('background');
        if (canvas.getContext) {
          var ctx = canvas.getContext('2d');
          ctx.setLineDash([5]);
          ctx.beginPath();
          ctx.rect(370, 370, 150, 150);
          ctx.stroke();
        }
    `,
      main: `let canvas = document.getElementById('canvas')\nlet ctx = canvas.getContext('2d')\nctx.beginPath()\nctx.arc(50, 50, 50, 0, 2 * Math.PI)\nctx.stroke()`,
    },
    instructions: 'Time for circles! Circles are drawn with the arc() function and take in 5-6 arguments. The first two arguments are the x and y positions for the center of the circle. Position the circle in the zone. Use the stroke() method to draw the circle to the screen.',
    solution(userInput) {
      const exp = /ctx.arc\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(50)\s*,\s*(\d+)\s*/;
      const matches = userInput.match(exp);
      if (matches) {
        let x = parseInt(matches[1]);
        let y = parseInt(matches[2]);
        let r = parseInt(matches[3]);
        return (x - r >= 370 && y - r >= 370 &&
          x + r <= 520 && y + r <= 520);
      }
      return false;
    },
  },
  {
    currentLevel: 7,
    readOnlyLines: [0, 1, 2],
    setup: {
      background: `
      const canvas = document.getElementById('background');
        if (canvas.getContext) {
          var ctx = canvas.getContext('2d');
          ctx.setLineDash([5]);
          ctx.beginPath();
          ctx.rect(150, 620, 50, 50);
          ctx.stroke();
        }
    `,
      main: `let canvas = document.getElementById('canvas')\nlet ctx = canvas.getContext('2d')\nctx.beginPath()\nctx.arc(50, 50, 50, 0, 2 * Math.PI)\nctx.stroke()`,
    },
    instructions: 'The third argument for an arc is the radius. Position the circle in the zone and make sure it fits within the final area.',
    solution(userInput) {
      const exp = /ctx.arc\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*/;
      const matches = userInput.match(exp);

      if (matches) {
        let x = parseInt(matches[1]);
        let y = parseInt(matches[2]);
        let r = parseInt(matches[3]);
        return (x - r >= 150 && y - r >= 620 &&
          x + r <= 200 && y + r <= 670);
      }
      return false;
    },
  },
  {
    currentLevel: 8,
    readOnlyLines: [0, 1, 2],
    setup: {
      background: `
      const canvas = document.getElementById('background');
        if (canvas.getContext) {
          var ctx = canvas.getContext('2d');
          ctx.setLineDash([5]);
          ctx.beginPath();
          ctx.arc(300, 300, 100, 0, Math.PI + Math.PI / 2)
          ctx.stroke();
        }
    `,
      main: `let canvas = document.getElementById('canvas')\nlet ctx = canvas.getContext('2d')\nctx.beginPath()\nctx.arc(300, 300, 150, 0, 2 * Math.PI)\nctx.stroke()`,
      solution: `let canvas = document.getElementById('solution')
      let ctx = canvas.getContext('2d')
      ctx.beginPath()
      ctx.arc(300, 300, 150, 0, Math.PI + Math.PI / 2)
      ctx.stroke()`,
    },
    instructions: 'The fourth and fifth arguments for an arc are the starting and ending angles calculated in radians. For a simple full circle we start at 0 radians and end at 2π radians (360°). Change the ending angle so that the arc matches the dotted curve.',
    solution(userInput) {
      const exp = /ctx.arc\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(.*)[,\)]\s*/;
      const matches = userInput.match(exp);

      if (matches) {
        let startAng = parseInt(matches[4]);
        let endAng = matches[5];
        return (startAng === 0 && mseCompare() < 4);
      }
      return false;
    },
  },
  {
    currentLevel: 9,
    readOnlyLines: [0, 1, 2],
    setup: {
      background: `
      const canvas = document.getElementById('background');
        if (canvas.getContext) {
          var ctx = canvas.getContext('2d');
          ctx.setLineDash([5]);
          ctx.beginPath();
          ctx.arc(300, 300, 100, 0, Math.PI / 2, true)
          ctx.stroke();
        }
    `,
      main: `let canvas = document.getElementById('canvas')\nlet ctx = canvas.getContext('2d')\nctx.beginPath()\nctx.arc(300, 300, 150, 0, 2 * Math.PI)\nctx.stroke()`,
      solution: `let canvas = document.getElementById('solution')
      let ctx = canvas.getContext('2d')
      ctx.beginPath()
      ctx.arc(300, 300, 150, 0, Math.PI / 2, true)
      ctx.stroke()`,
    },
    instructions: 'There is one last optional argument to the context.arc() method which is a boolean that checks whether or not the arc is drawn counter-clockwise. Draw a counter-clockwise arc that matches the dotted curve (Keep the starting angle at 0).',
    solution(userInput) {
      const exp = /ctx.arc\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(.*),\s*(true)/;
      const matches = userInput.match(exp);

      if (matches) {
        let startAng = parseInt(matches[4]);
        let endAng = matches[5];
        return (startAng === 0 && mseCompare() < 4);
      }
      return false;
    },
  },
  {
    currentLevel: 10,
    readOnlyLines: [0, 1, 2],
    setup: {
      background: `
      const canvas = document.getElementById('background');
        if (canvas.getContext) {
          var ctx = canvas.getContext('2d');
          ctx.setLineDash([5]);
          ctx.beginPath();
          ctx.arc(300, 300, 100, 0, Math.PI / 2, true)
          ctx.stroke();
        }
    `,
      main: `let canvas = document.getElementById('canvas')\nlet ctx = canvas.getContext('2d')\nctx.beginPath()\nctx.arc(300, 300, 150, 0, 2 * Math.PI)\nctx.stroke()`,
    },
    instructions: 'There is one last optional argument to the context.arc() method which is a boolean that checks whether or not the arc is drawn counter-clockwise. Draw a counter-clockwise arc that matches the dotted curve (Keep the starting angle at 0).',
    solution(userInput) {
      const exp = /ctx.arc\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(.*),\s*(true)/;
      const matches = userInput.match(exp);

      if (matches) {
        let startAng = parseInt(matches[4]);
        let endAng = matches[5];
        return (startAng === 0 && eval(endAng) === (Math.PI / 2));
      }
      return false;
    },
  },

];

