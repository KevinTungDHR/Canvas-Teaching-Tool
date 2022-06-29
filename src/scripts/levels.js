import { mseCompare, pixelCompare, pointChecker } from "./util";

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
      main: `let canvas = document.getElementById('canvas');\nlet ctx = canvas.getContext('2d');\nctx.fillStyle = '#f5c156'\nctx.fillRect(10, 10, 150, 150);`,
    },
    instructions: 'Change the x and y arguments of ctx.fillRect to position the rectangle into the dotted zone.\nThe four positional arguments are position-X, position-Y, width, and height.',
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
      main: `let canvas = document.getElementById('canvas');\nlet ctx = canvas.getContext('2d');\nctx.fillStyle = "#DD826F"\nctx.fillRect(160, 110, 100, 100);`,
    },
    instructions: 'Adjust the width and height of the rectangle so that the edges of the rectangle are between the dotted lines. Don\'t change the position!',
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
    instructions: 'Use the fillStyle and fillRect properties on the context to create a blue rectangle within the dotted zone',
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
          ctx.fillStyle = "#5cd3ad"
          ctx.fillRect(600,50,40,40);
        }
    `, 
      main: `let canvas = document.getElementById('canvas')\nlet ctx = canvas.getContext('2d')`,
    },
    instructions: 'Use the strokeStyle and strokeRect() to create a rectangle with a red stroke and no fill within the dotted zone. Make sure to not touch the blue-green square!',
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
      main: `let canvas = document.getElementById('canvas')\nlet ctx = canvas.getContext('2d')\nctx.fillStyle = "grey"\nctx.fillRect(0, 0, canvas.width, canvas.height)`,
    },
    instructions: 'Cut out a rectangle from the canvas using clearRect. Like #fillRect, #clearRect takes an position-X, position-Y, width and height argument.',
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
      main: `let canvas = document.getElementById('canvas')\nlet ctx = canvas.getContext('2d')\nctx.fillStyle = "grey"\nctx.fillRect(0, 0, canvas.width, canvas.height)`,
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
        // console.log(arr);
        // console.log(x,y,width,height);
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
      main: `let canvas = document.getElementById('canvas')\nlet ctx = canvas.getContext('2d')\nctx.beginPath()\nctx.arc(100, 100, 50, 0, 2 * Math.PI)\nctx.stroke()`,
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
      main: `let canvas = document.getElementById('canvas')\nlet ctx = canvas.getContext('2d')\nctx.beginPath()\nctx.arc(700, 100, 50, 0, 2 * Math.PI)\nctx.stroke()`,
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
    readOnlyLines: [0, 1],
    setup: {
      background: `
      const canvas = document.getElementById('background');
        if (canvas.getContext) {
          var ctx = canvas.getContext('2d');
          ctx.setLineDash([5]);
          ctx.beginPath();
          ctx.moveTo(200, 250)
          ctx.lineTo(450, 580)
          ctx.lineTo(600, 150)
          ctx.lineTo(200, 250)
          ctx.stroke();
          ctx.closePath();
        }
    `,
      main: `let canvas = document.getElementById('canvas')\nlet ctx = canvas.getContext('2d')`,
      solution: `
        const canvas = document.getElementById('solution');
        if (canvas.getContext) {
          var ctx = canvas.getContext('2d');
          ctx.beginPath();
          ctx.moveTo(200, 250)
          ctx.lineTo(450, 580)
          ctx.lineTo(600, 150)
          ctx.lineTo(200, 250)
          ctx.fill();
          ctx.closePath();
        }`,
    },
    instructions: 'Use beginPath, moveTo and lineTo to draw a triangle',
    solution(userInput) {
      const exp = /ctx.lineTo/g;
      const matches = Array.from(userInput.matchAll(exp));
      if (matches && matches.length >= 3) {
        // console.log(`pixel: ${pixelCompare()}`);
        // console.log(`mse: ${mseCompare()}`);
        return (pixelCompare() < 5300 && mseCompare() < 680);
      }
    },
  },
  {
    currentLevel: 11,
    readOnlyLines: [0, 1],
    setup: {
      background: `
      const canvas = document.getElementById('background');
        if (canvas.getContext) {
          var ctx = canvas.getContext('2d');
          ctx.setLineDash([5]);
          ctx.beginPath();
          ctx.arc(400, 150, 100, 0, Math.PI * 2)
          ctx.stroke();
          ctx.closePath();
          ctx.beginPath();
          ctx.arc(400, 250, 100, Math.PI * 1.85, Math.PI + 0.5)
          ctx.stroke();
          ctx.closePath();
          ctx.beginPath();
          ctx.arc(400, 350, 100, Math.PI * 1.85, Math.PI + 0.5)
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(305, 380)
          ctx.lineTo(400, 650)
          ctx.lineTo(495, 380)
          ctx.stroke();
          ctx.closePath();

        }
    `,
      main: `let canvas = document.getElementById('canvas')\nlet ctx = canvas.getContext('2d')`,
      solution:`
        const canvas = document.getElementById('solution');
        if (canvas.getContext) {
          var ctx = canvas.getContext('2d');
          ctx.beginPath();
          ctx.arc(400, 150, 100, 0, Math.PI * 2);
          ctx.fill();
          ctx.closePath();
          ctx.beginPath();
          ctx.arc(400, 250, 100, 0, Math.PI * 2);
          ctx.fill();
          ctx.closePath();
          ctx.beginPath();
          ctx.arc(400, 350, 100, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.moveTo(305, 380)
          ctx.lineTo(400, 650)
          ctx.lineTo(495, 380)
          ctx.lineTo(305, 380)
          ctx.fill();
          ctx.closePath();
        }`,
    },
    instructions: 'Match the given shape as closely as possible! Use at least 3 arcs!',
    solution(userInput) {
      const exp = /ctx.arc/g;
      const matches = Array.from(userInput.matchAll(exp));
      if (matches && matches.length >= 3) {
        return (pixelCompare() < 10500 && mseCompare() < 1250);
      }
      return false;
    },
  },
  {
    currentLevel: 12,
    readOnlyLines: [0, 1],
    setup: {
      background: `
      const canvas = document.getElementById('background');
        if (canvas.getContext) {
          var ctx = canvas.getContext('2d');
          ctx.setLineDash([5]);
          ctx.beginPath();
          ctx.moveTo(200, 200);
          ctx.lineTo(500, 200);
          ctx.lineTo(200, 500);
          ctx.closePath();
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(625, 625);
          ctx.lineTo(625, 200);
          ctx.lineTo(200, 625);
          ctx.closePath();
          ctx.stroke();

        }
    `,
      main: `let canvas = document.getElementById('canvas')\nlet ctx = canvas.getContext('2d')`,
      solution: `
        const canvas = document.getElementById('solution');
        if (canvas.getContext) {
          var ctx = canvas.getContext('2d');
          ctx.beginPath();
          ctx.moveTo(200, 200);
          ctx.lineTo(500, 200);
          ctx.lineTo(200, 500);
          ctx.closePath();
          ctx.fill();

          ctx.beginPath();
          ctx.moveTo(625, 625);
          ctx.lineTo(625, 200);
          ctx.lineTo(200, 625);
          ctx.closePath();
          ctx.fill();
        }`,
    },
    instructions: 'The closePath() method is important for creating distince shapes and separating out our drawing logic. Use closePath() and lineTo() to create two triangles. The left filled and right dotted.',
    solution(userInput) {
      const exp = /ctx.lineTo/g;
      const exp2 = /ctx.closePath/;
      if(!exp2.test(userInput)){
        return false;
      }

      const matches = Array.from(userInput.matchAll(exp));
      if (matches && matches.length >= 4) {
        return (pixelCompare() < 14000 && mseCompare() < 1550);
      }
      return false;
    },
  },
  {
    currentLevel: 13,
    readOnlyLines: [0, 1, 2],
    setup: {
      background: `
      const canvas = document.getElementById('background');
        if (canvas.getContext) {
          var ctx = canvas.getContext('2d');
          ctx.setLineDash([5]);
          ctx.beginPath();
          ctx.moveTo(100, 200);
          ctx.bezierCurveTo(300, 210, 200, 350, 400, 350);
          ctx.stroke()

        }
    `,
      main: `let canvas = document.getElementById('canvas')\nlet ctx = canvas.getContext('2d');`,
      solution: `
        const canvas = document.getElementById('solution');
        if (canvas.getContext) {
          var ctx = canvas.getContext('2d');
          ctx.beginPath();
          ctx.moveTo(100, 200);
          ctx.bezierCurveTo(300, 210, 200, 350, 400, 350);
          ctx.stroke()
        }`,
    },
    instructions: 'Canvas also allows you to draw Bézier curves using bezierCurveto(). Using the bezierCurveTo() method draw a curve on the dotted line that closely resembles the shape.',
    solution(userInput) {
      const exp = /ctx.bezierCurveTo/g;


      const matches = Array.from(userInput.matchAll(exp));
      if (matches && matches.length === 1) {
        return (pixelCompare() < 220 && mseCompare() < 45);
      }
      return false;
    },
  },
  {
    currentLevel: 14,
    readOnlyLines: [0, 1, 2],
    setup: {
      background: `
      const canvas = document.getElementById('background');
        if (canvas.getContext) {
          var ctx = canvas.getContext('2d');
          ctx.setLineDash([5]);
          ctx.beginPath();
          ctx.moveTo(200, 600);
          ctx.quadraticCurveTo(350, 10, 500, 600);
          ctx.stroke()

        }
    `,
      main: `let canvas = document.getElementById('canvas')\nlet ctx = canvas.getContext('2d');`,
      solution: `
        const canvas = document.getElementById('solution');
        if (canvas.getContext) {
          var ctx = canvas.getContext('2d');
          ctx.beginPath();
          ctx.moveTo(200, 600);
          ctx.quadraticCurveTo(350, 10, 500, 600);
          ctx.stroke()
        }`,
    },
    instructions: 'Another type of curve you have access to is the quadratic Bézier curve. Using the quadraticCurveTo() method draw a curve on the dotted line that closely resembles the shape.',
    solution(userInput) {
      const exp = /ctx.quadraticCurveTo/g;


      const matches = Array.from(userInput.matchAll(exp));
      if (matches && matches.length === 1) {
        return (pixelCompare() < 565 && mseCompare() < 78);
      }
      return false;
    },
  },
  {
    currentLevel: 15,
    readOnlyLines: [0, 1, 2],
    setup: {
      background: `
      const canvas = document.getElementById('background');
        if (canvas.getContext) {
          var ctx = canvas.getContext('2d');
          ctx.setLineDash([5]);
          let path = new Path2D();
          path.ellipse(200,200,100,200,Math.PI * 0.2, 0, Math.PI*2)
          ctx.stroke(path)

        }
    `,
      main: `let canvas = document.getElementById('canvas')\nlet ctx = canvas.getContext('2d');`,
      solution: `
        const canvas = document.getElementById('solution');
        if (canvas.getContext) {
          var ctx = canvas.getContext('2d');
          let path = new Path2D();
          path.ellipse(200,200,100,200,Math.PI * 0.2, 0, Math.PI*2)
          ctx.fill(path)
        }`,
    },
    instructions: 'The Path2D constructor allows you to create a new Path2D object that gives you the ability to retain path information. Let\'s create a new Path2D object and call the Path#ellipse and Path#fill methods to create an ellipse. An ellipse takes an x, y, radiusY, rotation, startAngle and endAngle',
    solution(userInput) {
      const test1 = /new Path2D/;
      const test2 = /ellipse/;
      const test3 = /fill/;

      if (!(test1.test(userInput) && test2.test(userInput) && test3.test(userInput))){
        return false;
      }

      return (mseCompare() < 1300 && pixelCompare() < 12000)
    },
  },
  {
    currentLevel: 16,
    readOnlyLines: [0, 1, 2],
    setup: {
      background: `
      const canvas = document.getElementById('background');
        if (canvas.getContext) {
          var ctx = canvas.getContext('2d');
          ctx.setLineDash([5]);
          let path = new Path2D();
          path.rect(100,50,300,200);
          ctx.stroke(path);
        }
    `,
      main: `let canvas = document.getElementById('canvas')\nlet ctx = canvas.getContext('2d');`,
      solution: `
        const canvas = document.getElementById('solution');
        if (canvas.getContext) {
          var ctx = canvas.getContext('2d');
          let path = new Path2D();
          path.rect(100,50,300,200);
          ctx.fill(path);
          ctx.isPointInPath(100,49);
        }`,
    },
    instructions: 'Using our new knowledge of Path2D objects we can now use methods such as isPointInPath to check whether a point is within the current path. Let\'s create a new path2D rectangle and check whether our point is within our path. isPointInPath takes in three arguments: the pathObject, and x-coordinate and y-coordinate.',
    solution(userInput) {
      const test1 = /new Path2D/;
      const test2 = /ctx.fill/;
      const test3 = /isPointInPath\([a-zA-z]*\s*[,]*\s*(\d+)\s*,\s*(\d+)\s*\)/;
      const rect = /rect\(\s*(\d+)s*,\s*(\d+)\s*,\s*(\d+)s*,\s*(\d+)\s*\)/
      if (!(test1.test(userInput) && test2.test(userInput))){
        return false;
      }
      const matches = test3.exec(userInput)
      const matches2 = rect.exec(userInput)

      let [pointMatch, pointX, pointY] = matches.map((el) => parseInt(el, 10));
      let [r, x, y, width, height, args] = matches2.map((el) => parseInt(el, 10))

      if(matches && matches2){
        return (mseCompare() < 1100 && pointX >= x && pointX <= x + width && pointY >= y && pointY <= y + height);
      }
    },
  },
  {
    currentLevel: 17,
    readOnlyLines: [0, 1, 2],
    setup: {
      background: `
      const canvas = document.getElementById('background');
        if (canvas.getContext) {
          var ctx = canvas.getContext('2d');
          ctx.setLineDash([5]);
          ctx.rect(300,300,300,200)
          ctx.stroke()

        }
    `,
      main: `let canvas = document.getElementById('canvas')\nlet ctx = canvas.getContext('2d');`,
      solution: `
        const canvas = document.getElementById('solution');
        if (canvas.getContext) {
          var ctx = canvas.getContext('2d');
          ctx.beginPath();
          ctx.fillRect(300,300,300,200)
        }`,
    },
    instructions: 'Did you know you can also add event listeners to the canvas? See if you can combine addEventListener, isPointInPath and new Path2D to create a rectangle that changes color on mousemove.',
    solution(userInput) {
      const test1 = /new Path2D/;
      const test2 = /addEventListener/;
      const test3 = /isPointInPath/;
      const test4 = /mousemove|mouseover/;
      const test5 = /ctx.fill/;

      if (!(test1.test(userInput) && test2.test(userInput) && test3.test(userInput) && test4.test(userInput) && test5.test(userInput))){
        return false;
      }

      return (mseCompare() < 1100)
    },
  },
  {
    currentLevel: '18',
    readOnlyLines: [0, 1, 2],
    setup: {
      background: `
      const canvas = document.getElementById('background');
        if (canvas.getContext) {
          var ctx = canvas.getContext('2d');
          ctx.setLineDash([5]);
          ctx.translate(300,300)
          ctx.arc(0, 0, 50, 0, Math.PI * 2);
          ctx.stroke()
        }
    `,
      main: `let canvas = document.getElementById('canvas')\nlet ctx = canvas.getContext('2d');`,
      solution: `
        const canvas = document.getElementById('solution');
        if (canvas.getContext) {
          var ctx = canvas.getContext('2d');
          ctx.beginPath();
          ctx.translate(300,300)
          ctx.arc(0, 0, 50, 0, Math.PI * 2);
          ctx.fill()
        }`,
    },
    instructions: 'We\'ve been drawing all our shapes using coordinates where the top left corner is 0,0. We can use the translate method to translate the context horizontally and vertically. Use the translate method to shift the default position over 300px to the right and 300px down. Draw an arc with coordinates at the origin(0,0).',
    solution(userInput) {
      const test1 = /ctx.translate/;
      const test2 = /ctx.fill/;
      const test3 = /ctx.arc\(\s*(\d+)\s*,\s*(\d+)/;


      if (!(test1.test(userInput) && test2.test(userInput))){
        return false;
      }

      let matches = test3.exec(userInput);
      if(matches && matches.length >= 2) {
        return (mseCompare() < 1100 && parseInt(matches[1]) === 0 && parseInt(matches[2]) === 0);
      }

      return false;
    },
  },
];
