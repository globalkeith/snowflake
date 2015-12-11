export class MenuState extends Phaser.State {
  preload() {
    this.load.script('filter', 'https://cdn.rawgit.com/photonstorm/phaser/master/filters/Fire.js');
  }

  labelClicked() {
    this.array = this.nextLevelSnowflake(this.array, this.fractal)
    this.drawSnowflake()
  }

  create() {
    // const label = this.addText("Snow flakes")
    // label.anchor.setTo(0.5)
    // label.y = 150

    let background = this.game.add.sprite(0, 0)
  	background.width = 800
  	background.height = 600

    // let bmd = this.game.add.bitmapData(800, 600)
    // let color = 'white';
    //
    // bmd.ctx.beginPath();
    // bmd.ctx.lineWidth = "4";
    // bmd.ctx.strokeStyle = color;
    // bmd.ctx.stroke();
    // let sprite = this.game.add.sprite(0, 0, bmd);
    //
    // bmd.clear();
    // bmd.ctx.beginPath();
    // bmd.ctx.moveTo(10, 10);
    // bmd.ctx.lineTo(100, 100);
    // bmd.ctx.lineWidth = 4;
    // bmd.ctx.stroke();
    // bmd.ctx.closePath();
    // bmd.render();
    // bmd.refreshBuffer();

    //this.bitmapData.lineStyle(2, 0xffd900, 1)
    //  Draw a circle to it
    //  The first 2 paramters are the x/y coordinates of the center
    //  The third is the radius (100px)
    // bmd.circle(150, 150, 150, 'rgb(0,200,0)');

    // var ctx=bmd.context;
    // // ctx.setLineWidth(5.0);
    // // ctx.setFillColor(255,0,0,0);
    // ctx.fillStyle = '#999999';
    // ctx.lineWidth = 2;
    // ctx.beginPath();
    // ctx.moveTo(0, 0);
    // ctx.lineTo(100, 100);
    // ctx.lineTo(250, 100);
    // this.game.add.sprite(50, 50, bmd);

    var graphics = this.game.add.graphics(100, 100)
    this.game.input.onDown.add(this.labelClicked, this);

    // // set a fill and line style
    graphics.lineStyle(2, 0xffd900, 1)
    // // graphics.lineTo(250, 220)
    // // graphics.lineTo(50, 220)
    // // graphics.lineTo(50, 50)
    //
    // window.graphics = graphics;
    //
    // window.initializeFractalGenerator();

    var datumX = 100;
    var datumY = 200;
    var side = 150;
    var pointsArray = [
      { x: datumX, y: datumY },
      { x: datumX + 1*side, y: datumY - side * Math.sqrt(3) },
      { x: datumX + 2*side, y: datumY }
    ];

    this.array = pointsArray
    this.graphics = graphics

    this.drawSnowflake(pointsArray, graphics)

  	let filter = this.game.add.filter("Fire", 800, 600)
  	filter.alpha = 0.0

  	background.filters = [filter]

    // this.label = label
    this.background = background
    this.filter = filter
  }

  nextLevelSnowflake(array, fractal) {
    var newArray = [];
    var end = array.length - 1;
    var generatedPoints = [];

    for (var i = 0; i < end; i++) {
      var thisPoint = array[i];
      var nextPoint = array[i + 1];

      newArray.push(thisPoint);

      generatedPoints = fractal(thisPoint, nextPoint);

      for (var j = 0; j < generatedPoints.length; j++) {
        newArray.push(generatedPoints[j]);
      }
    }

    var thisPoint = array[end];
    var nextPoint = array[0];

    newArray.push(thisPoint);
    var generatedPoints = fractal(thisPoint, nextPoint);

    for (var j = 0; j < generatedPoints.length; j++) {
      newArray.push(generatedPoints[j]);
    }

    return newArray;
  }

  drawSnowflake() {
    var graphics = this.graphics
    var array = this.array
    graphics.beginFill(null)

    graphics.moveTo(array[0].x, array[0].y);
    for (var i = 1; i < array.length; i++) {
      var point = array[i];
      graphics.lineTo(point.x, point.y);
    }
    graphics.lineTo(array[0].x, array[0].y)
    graphics.endFill()
  }

  fractal(start, end) {
    var d = { x: end.x - start.x, y: end.y - start.y }
    var length = Math.sqrt(d.x*d.x + d.y*d.y)

    var dir = {
      x: d.x / length,
      y: d.y / length,
    };

    var equilateralTriangleHeightToSideRatio = Math.sqrt(3) / 2;

    var perp = {
      x: dir.y * length * equilateralTriangleHeightToSideRatio / 3,
      y: -dir.x * length * equilateralTriangleHeightToSideRatio / 3,
    };

    return [{
      x: start.x + d.x / 3,
      y: start.y + d.y / 3,
    },
    {
      x: start.x + perp.x + d.x / 2,
      y: start.y + perp.y + d.y / 2,
    },
    {
      x: start.x + 2*d.x/3,
      y: start.y + 2*d.y/3,
    }]
  }

  addText(message, style = { font: "45px Arial Black", fill: "#ffffff" }) {
    return this.add.text(this.world.centerX, this.world.centerY, message, style)
  }

	update() {
    this.filter.update()
    // this.menu.rotation += 0.02
  }
}
