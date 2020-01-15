const EventEmitter = require('wolfy87-eventemitter');

const EnemyList = require('../EnemyList');

const Enemy = require('../entities/Enemy');
const Player = require('../entities/Player');

const FightHandler= require('../handlers/FightHandler');
const GameInterface = require('../gameInterface/GameInterface');

const enemies = EnemyList.map(data => Enemy(data));

module.exports = function() {
  this.emitter = new EventEmitter();
  let player = Player(this.time, this.emitter);

  this.gameInterface = GameInterface(this.load, this.add, this.emitter);
  this.fightHandler = FightHandler(player, enemies, this.emitter);

  this.player = player;
  this.enemies = enemies;

  this.gameInterface.loadAssets();
  this.gameInterface.loadSprites();
}