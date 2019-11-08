const requiredExp = require('../LevelList');

module.exports = () => {
  let hp = 0;
  let level = 1;
  let exp = Number(0);
  let damageRaw = 60;

  const getDamage = () => {
    return damageRaw;
  }

  const addExp = (e) => {
    exp += Number(e)
  }

  const getExp = () => {
    return exp;
  }

  const getLevel = () => {
    return level;
  }

  const levelUp = () => {
    level++;
  }

  const getCurrentRequiredExp = (player) => {
    return requiredExp.filter(required => {
      return (getLevel() + 1) == required.level
    })
    .pop();
  }

  // const canLevelUp = () => {
    // if (getExp() >= currentRequiredExp.exp) {
      // player.levelUp();
      
      // return true;
    // }

    // return false;
  // }

  return {
    getExp,
    addExp,
    getCurrentRequiredExp,
    getDamage
  }
}
