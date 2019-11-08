module.exports = (player, enemies, emitter) => {
  let currentEnemy = 0;

  let callNextEnemy = () => {
    currentEnemy++;
  }

  const bindEvents = () => {
    emitter.addListener('attack', function () {
      let damage = player.getDamage() * (318 / enemies[currentEnemy].getCurrentHp());

      enemies[currentEnemy].takeDamage(damage);

      if (enemies[currentEnemy].isDead()) {
        let expBar = enemies[currentEnemy].getExp() * (150 / player.getCurrentRequiredExp().exp);

        console.log(expBar);

        // expBar += enemyExp*(150/req)
        // 150/req -> define a unidade do incremento(UI)
        // enemyExp-> define quantos UI incrementar
        // expBar -> incrementa ao valor anterior

        player.addExp(enemies[currentEnemy].getExp());

        callNextEnemy();
        emitter.emit('resetHealthBar', [enemies[currentEnemy].getCurrentHp()]);
        emitter.emit('updateExpBar', [player.getExp()]);

        // player.canLevelUp();

        return
      }

      emitter.emit('updateHealthBar', [enemies[currentEnemy].getCurrentHp()]);
    })
  }

  return {
    bindEvents
  }
}
