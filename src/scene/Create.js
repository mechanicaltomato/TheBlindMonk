module.exports = function() {
  this.gameInterface.addAssets();
  this.gameInterface.createBars();
  this.gameInterface.createTexts(this.player);

  this.gameInterface.bindEvents();
  this.fightHandler.bindEvents();
}
