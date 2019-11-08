const Phaser = require('phaser');

const Preload = require('./scene/Preload');
const Create = require('./scene/Create');
const Update = require('./scene/Update');

module.exports = () => {
  return new Phaser.Game({
    type: Phaser.WEBGL,
    parent: 'phaser-example',
    width : 375,
    height : 667,
    backgroundColor : '000',
    scene: {
      preload: Preload,
      create: Create,
      update: Update
    }
  });
}
