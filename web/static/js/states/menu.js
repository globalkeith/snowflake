export class MenuState extends Phaser.State {
  preload() {
    // this.load.script('filter', 'https://cdn.rawgit.com/photonstorm/phaser/master/filters/Fire.js');
  }

  labelClicked() {
    this.array = this.nextLevelSnowflake(this.array, this.fractal)
    this.drawSnowflakeBmd()
  }

  create() {
    // const label = this.addText("Snow flakes")
    // label.anchor.setTo(0.5)
    // label.y = 150

    let background = this.game.add.sprite(0, 0)
  	background.width = 800
  	background.height = 600

    let bmd = this.game.add.bitmapData(800, 600)
    let sprite = this.game.add.sprite(450, 310, bmd);
    sprite.anchor.setTo(0.5)

    // bmd.refreshBuffer();

    this.cursors = this.game.input.keyboard.createCursorKeys();

    // var graphics = this.game.add.graphics(100, 110)
    this.game.input.onDown.add(this.labelClicked, this);

  	let filter = this.game.add.filter("Fire", 800, 600)
  	filter.alpha = 0.0
  	background.filters = [filter]

    // this.label = label
    this.array = this.triangle(150, 300, 150)
    this.scale = 20
    // this.graphics = graphics
    this.sprite = sprite
    this.bitmapData = bmd
    this.background = background
    this.filter = filter

    this.drawSnowflakeBmd()
  }

  triangle( x, y, side) {
    return [
      { x: x, y: y },
      { x: x + side, y: y - side * Math.sqrt(3) },
      { x: x + (2 * side), y: y }
    ];
  }

  nextLevelSnowflake(array, fractal) {
    var newArray = [];
    var end = array.length - 1;
    var generatedPoints = [];

    for (var i = 0; i < end; i++) {
      var thisPoint = array[i]
      var nextPoint = array[i + 1]

      newArray.push(thisPoint)

      newArray = newArray.concat(fractal(thisPoint, nextPoint))
    }

    var thisPoint = array[end]
    var nextPoint = array[0]

    newArray.push(thisPoint)
    newArray = newArray.concat(fractal(thisPoint, nextPoint))

    return newArray;
  }

  drawSnowflakeBmd(lineWidth = 15) {
    var bmd = this.bitmapData;
    var array = this.array;
    bmd.clear();
    let ctx = bmd.ctx;

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.fillStyle = '#000040';
    ctx.lineWidth = lineWidth;

    ctx.beginPath();
    ctx.moveTo(array[0].x, array[0].y);
    for (var i = 1; i < array.length; i++) {
      var point = array[i];
      ctx.lineTo(point.x, point.y);
    }
    ctx.lineTo(array[0].x, array[0].y);
    ctx.lineTo(array[1].x, array[1].y);

    ctx.stroke();

    ctx.fill();
    ctx.closePath();
    bmd.render();
  }

  fractal(start, end) {
    var diff = { x: end.x - start.x, y: end.y - start.y }
    var length = Math.sqrt( diff.x * diff.x + diff.y * diff.y )

    var dir = { x: diff.x / length, y: diff.y / length }

    var altitude = Math.sqrt(3) / 2;

    var perp = {
      x: diff.y * altitude / 3,
      y: -diff.x * altitude / 3,
    }

    return [{
              x: start.x + diff.x / 3,
              y: start.y + diff.y / 3,
            },{
              x: start.x + perp.x + diff.x / 2,
              y: start.y + perp.y + diff.y / 2,
            },{
              x: start.x + 2 * diff.x / 3,
              y: start.y + 2 * diff.y / 3,
            }]
  }

  addText(message, style = { font: "45px Arial Black", fill: "#ffffff" }) {
    return this.add.text(this.world.centerX, this.world.centerY, message, style)
  }

	update() {
    this.filter.update()
    // this.menu.rotation += 0.02

    let sprite = this.sprite
    let cursors = this.cursors
    //  For example this checks if the up or down keys are pressed and moves the camera accordingly.
    if (cursors.up.isDown) {
      sprite.scale.x += 0.02
      sprite.scale.y += 0.02
      this.scale -= 0.1;
    } else if (cursors.down.isDown) {
      sprite.scale.x -= 0.02
      sprite.scale.y -= 0.02
      this.scale += 0.1;
    }

    if (cursors.left.isDown) {
      sprite.rotation -= 0.02
    } else if (cursors.right.isDown) {
      sprite.rotation += 0.02
    }

    this.drawSnowflakeBmd(this.scale)
  }
}
