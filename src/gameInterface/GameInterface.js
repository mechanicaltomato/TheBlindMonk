const bars = require('../Bars');
const assets = require('../Assets');

module.exports = function(loader = null, add = null, emitter = null) {
  let interfaceObjects = {
    bars: {}
  };

  const createBars = () => {
    bars.forEach(bar => {
      interfaceObjects.bars[bar.name] = add.graphics();
    });

    bars.forEach(bar => {
      let { x, y, width, height, radius } = bar.dimensions;

      interfaceObjects.bars[bar.name].fillStyle(bar.color, bar.alpha);
      interfaceObjects.bars[bar.name].fillRoundedRect(x, y, width, height, radius);
    });

    console.log(interfaceObjects.bars);
  }

  const loadAssets = () => {
    assets
      .images
      .forEach(asset => 
        loader.image(asset.name, asset.file)
      );
  }

  const loadSprites = () => {
    assets
      .sprites
      .forEach(sprite => 
        loader.spritesheet(sprite.name, sprite.file, sprite.frame)
      );
  }

  const addAssets = () => {
    assets
      .images
      .concat(
        assets.sprites
      )
      .forEach(asset => {
        let obj = add.sprite(
          asset.coordinates.x,
          asset.coordinates.y,
          asset.name
        )
        .setOrigin(asset.origin);

        if (asset.scale != 1) {
          obj.setScale(asset.scale);
        }

        if (asset.isInteractive) {
          obj.setInteractive();
        }

        interfaceObjects[asset.name] = obj;
      });
  }

  const bindEvents = () => {
    interfaceObjects['attackButton'].on('pointerdown', function (pointer) {
      this.setTint(0xff0000);
      emitter.emitEvent('attack');
    });

    interfaceObjects['attackButton'].on('pointerup', function (pointer) {
      this.clearTint();
    });

    emitter.addListener('updateHealthBar', function([enemyHp]) {
      interfaceObjects.bars.enemyHealth.clear()
      interfaceObjects.bars.enemyHealth.fillStyle(0xff0000, 1)
      interfaceObjects.bars.enemyHealth.fillRoundedRect(28, 132, enemyHp, 28, 3)
    });

    emitter.addListener('resetHealthBar', function([enemyHp]) {
      interfaceObjects.bars.enemyHealth.clear()
      interfaceObjects.bars.enemyHealth.fillStyle(0xff0000, 1)
      interfaceObjects.bars.enemyHealth.fillRoundedRect(28, 132, 318, 28, 3)
    });

    emitter.addListener('updateExpBar', function([playerExp]) {
      interfaceObjects.bars.expBar.clear()
      interfaceObjects.bars.expBar.fillStyle(0xffff00, 1)
      interfaceObjects.bars.expBar.fillRoundedRect(139, 49, (playerExp), 28, 3)
    });
  }

  return {
    loadAssets,
    loadSprites,
    createBars,
    addAssets,
    bindEvents
  }
}
