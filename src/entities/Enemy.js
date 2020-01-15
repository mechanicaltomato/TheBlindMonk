module.exports = ({ name, room, exp_rate: expRate }) => {
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

  return {
    getCurrentHp,
    getExp,
    isDead,
    takeDamage
  }
}
