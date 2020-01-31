const bars = require('./interfaceObjects/Bars');
const assets = require('./interfaceObjects/Assets');
const texts = require('./interfaceObjects/Texts');


module.exports = function(loader = null, add = null, emitter = null) {
  let expBar = 0;
  let timer = 318;
  let activateBossTimer = false;

  
  let interfaceObjects = {
    bars: {},
    texts: {}
  };

  const createTexts = (player) => {
    texts.forEach(text => {
      interfaceObjects.texts[text.name] = add.text();
    });

    texts.forEach(text => {
      interfaceObjects.texts[text.name].setFont(text.fontName);
      interfaceObjects.texts[text.name].setFontSize(text.fontSize);

      if (text.fn) {
        interfaceObjects.texts[text.name].setText(player[text.fn]());
      }

      if (text.position) {
        let { x, y } = text.position;
        interfaceObjects.texts[text.name].setPosition(x, y);
      }

      if (text.color) {
        interfaceObjects.texts[text.name].setTint(text.color);
      }
    });
  }

  const createBars = () => {
    bars.forEach(bar => {
      interfaceObjects.bars[bar.name] = add.graphics();
    });

    bars.forEach(bar => {
      let { x, y, width, height, radius } = bar.dimensions;

      interfaceObjects.bars[bar.name].fillStyle(bar.color, bar.alpha);
      interfaceObjects.bars[bar.name].fillRoundedRect(x, y, width, height, radius);
    });
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
      emitter.emit('attack', null);
    });

    interfaceObjects['attackButton'].on('pointerup', function (pointer) {
      this.clearTint();
    });

    emitter.addListener('displayDamage', function([damage]) {
      interfaceObjects.texts.damageText.setPosition((Math.random()*280)+25, (Math.random()*194)+158);
      interfaceObjects.texts.damageText.setText(Math.floor(damage));
    });

    emitter.addListener('printLevel', function([player]) {
      interfaceObjects.texts.levelText.setText(player.getLevel())
      interfaceObjects.texts.skillPointsText.setText(player.getSkillPoints())
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

    emitter.addListener('updateExpBar', function([exp]) {
      expBar += exp;

      interfaceObjects.bars.expBar.clear()
      interfaceObjects.bars.expBar.fillStyle(0xffff00, 1)
      interfaceObjects.bars.expBar.fillRoundedRect(139, 49, expBar, 28, 3)
    });

    emitter.addListener('clearBar', function() {
      expBar = 0

      interfaceObjects.bars.expBar.clear()
      interfaceObjects.bars.expBar.fillStyle(0xffff00, 1)
      interfaceObjects.bars.expBar.fillRoundedRect(139, 49, 0, 28, 3)
    });

    emitter.addListener('bossCheck', function(isBoss) {
      if(isBoss!='FALSE'){
        activateBossTimer=true;
      }
    })

    emitter.addListener('updateTimerBar', function(){
      if(activateBossTimer==true){
        if(timer>0){
          timer-=0.7;
        }
        if(timer<0){
          timer=0;
          emitter.emit('lostBattle');
        }

        interfaceObjects.bars.timerBar.clear();
        interfaceObjects.bars.timerBar.fillStyle(0xff00ff, 1);
        interfaceObjects.bars.timerBar.fillRoundedRect(28, 147, timer, 28, 3);
      }else{
        interfaceObjects.bars.timerBar.clear();
        interfaceObjects.bars.timerBar.fillStyle(0xff00ff, 1);
        interfaceObjects.bars.timerBar.fillRoundedRect(28, 147, 0, 28, 3);
      }
    });




  }
   

  return {
    loadAssets,
    loadSprites,
    createBars,
    createTexts,
    addAssets,
    bindEvents
  }
}