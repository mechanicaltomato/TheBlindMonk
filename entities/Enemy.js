module.exports = ({ name, room, exp_rate: expRate, boss }) => {
  let hp = 318;

  const getCurrentHp = () => {
    return hp;
  }

  const getExp = () => {
    return expRate;
  }

  const takeDamage = (damage) => {
    hp -= damage
  }

  const isDead = () => {
    if (getCurrentHp() <= 0) {
      return true;
    }

    return false;
  }

  let isBoss = () => (boss);

  

  return {
    getCurrentHp,
    getExp,
    isDead,
    takeDamage,
    isBoss
  }
}