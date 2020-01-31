const requiredExp = require('../LevelList');

module.exports = (time, emitter) => {
  let hp = 0;
  let level = 1;
  let skillPoints = 0;
  let exp = Number(0);
  let damageRaw = 100;

  let requiredLevel = [0, 10, 15, 25, 40, 50, 55, 65, 80, 90];

  let skillsTree = [];

  let automaticSkills = [
    {
      name: 'autoAttack',
      level: 2,
      enabled: false,
      modifier: (damage) => {
        return damage / 2;
      },
      config() {
        let _that = this
        return {
          delay: 1000,
          loop: true,
          callback() {
            emitter.emit('attack', _that.modifier)
          }
        }
      }
    }
  ];

  const enableEventTimeEvent = (config) => {
    let availableSkills = getAvailableAutomaticSkills()

    availableSkills.forEach(skill => {
      if (!skill.enabled) {
        time.addEvent(skill.config());
        skill.enabled = true;
      }
    });
  }

  const getAvailableAutomaticSkills = () => {
    return automaticSkills.filter(skill => (skill.level <= level));
  }

  const getNextRequiredExp = () => {
    return requiredExp.filter(el => (el.level == level)).pop().exp
  }

  const getDamage = () => {
    return damageRaw;
  }

  const addExp = (val) => {
    exp += Number(val);
  }

  const getExp = () => {
    return exp;
  }

  const getLevel = () => {
    return level;
  }

  const getSkillPoints = () => {
    return skillPoints;
  }

  const levelUp = () => {
    level++;
    skillPoints++;
    exp = 0

    enableEventTimeEvent()
  }

  const getCurrentRequiredExp = (player) => {
    return requiredExp.filter(required => {
      return (getLevel() + 1) == required.level
    })
    .pop();
  }

  return {
    getExp,
    getLevel,
    getDamage,
    getSkillPoints,
    getNextRequiredExp,
    getCurrentRequiredExp,

    addExp,
    levelUp,
  }
}