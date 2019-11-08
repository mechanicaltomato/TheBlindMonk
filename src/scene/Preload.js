const EventEmitter = require('wolfy87-eventemitter');

const EnemyList = require('../EnemyList');
const Player = require('../player/Player');
const Enemy = require('../player/Enemy');

const FightHandler= require('../FightHandler');
const GameInterface = require('../gameInterface/GameInterface');

let enemies = EnemyList.map(data => Enemy(data));

module.exports = function() {
  let emitter = new EventEmitter();
  let player = Player();

  this['gameInterface'] = GameInterface(this.load, this.add, emitter);
  this['fightHandler'] = FightHandler(player, enemies, emitter);

  this['player'] = player;
  this['enemies'] = enemies;

  this.gameInterface.loadAssets();
  this.gameInterface.loadSprites();
}
