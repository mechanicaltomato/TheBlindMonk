module.exports = function() {
  this.gameInterface.addAssets();
  this.gameInterface.createBars();

  this.gameInterface.bindEvents();
  this.fightHandler.bindEvents();
}
