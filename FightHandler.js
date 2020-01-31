module.exports = (player, enemies, emitter) => {
  let currentEnemy = 0;


  let callNextEnemy = () => {
    currentEnemy++;
    emitter.emit('bossCheck', [enemies[currentEnemy].isBoss()]);
  }

  const bindEvents = () => {
    emitter.addListener('attack', function (modifier) {
      let damage = player.getDamage() * (318 / enemies[currentEnemy].getCurrentHp());

      if (modifier) {
        damage = modifier(damage)
      }

      enemies[currentEnemy].takeDamage(damage);

      emitter.emit('displayDamage', [damage]);

      if (enemies[currentEnemy].isDead()) {
        player.addExp(enemies[currentEnemy].getExp());

        let requiredExp = player.getNextRequiredExp();
        let hasLeveledUp = (player.getExp() >= requiredExp) ? true : false;

        if (!hasLeveledUp) {
          let pixelPerc = (enemies[currentEnemy].getExp() * 100) / (requiredExp);
          let percBar = ((150 * pixelPerc) / 100);

          emitter.emit('updateExpBar', [percBar, hasLeveledUp]);
        }

        if (hasLeveledUp) {
          player.levelUp();
          emitter.emit('printLevel', [player])
          emitter.emit('clearBar');
        }

        callNextEnemy();
      }

      emitter.emit('updateHealthBar', [enemies[currentEnemy].getCurrentHp()]);

    });
    emitter.emit('bossCheck', [enemies[currentEnemy].isBoss()]);
    emitter.addListener('lostBattle', function(){
      if(currentEnemy<10){
        currentEnemy=0;
      }else currentEnemy -= 10;
    })

  }
  

  return {
    bindEvents,
  }
}
