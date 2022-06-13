function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      monsterHealth: 100,
      playersHealth: 100,
      currentRound: 0,
      winner: null,
      log: [],
    };
  },
  watch: {
    playersHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "monster";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playersHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "player";
      }
    },
  },
  computed: {
    monsterHealthbar() {
      if (this.monsterHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.monsterHealth + "%" };
    },
    playersHealthbar() {
      if (this.playersHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.playersHealth + "%" };
    },
    spacialAttackHandler() {
      return this.currentRound % 3 == 0;
    },
  },
  methods: {
    start() {
      this.monsterHealth = 100;
      this.playersHealth = 100;
      this.currentRound = 0;
      this.winner = null;
      this.log = [];
    },
    attackMonster() {
      this.currentRound++;
      const attackValue = getRandom(5, 12);
      this.monsterHealth -= attackValue;
      this.logMessage("player", "attack", attackValue);
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = getRandom(8, 13);
      this.playersHealth -= attackValue;
      this.logMessage("monster", "attack", attackValue);
    },
    spacialAttack() {
      this.currentRound++;
      const attackValue = getRandom(15, 20);
      this.monsterHealth -= attackValue;
      this.logMessage("player", "attack", attackValue);
      this.attackPlayer();
    },
    heal() {
      this.currentRound++;
      const healValue = getRandom(12, 18);
      if (this.playersHealth + healValue > 100) {
        this.playersHealth = 100;
      } else {
        this.playersHealth += healValue;
      }
      this.logMessage("player", "heal", healValue);
      this.attackPlayer();
    },
    surrender() {
      this.winner = "monster";
    },
    logMessage(who, what, value) {
      this.log.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
});

app.mount("#game");
