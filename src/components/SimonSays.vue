<template>
  <div id="game">
    <div class="redSquare" v-bind:class="{red_active: active.red === true}"></div>
    <div class="blueSquare" v-bind:class="{blue_active: active.blue === true}"></div>
    <div class="yellowSquare" v-bind:class="{yellow_active: active.yellow === true}"></div>
    <div class="greenSquare" v-bind:class="{green_active: active.green === true}"></div>
  </div>
</template>

<script>
export default {
  name: 'SimonSays',
  data () {
    return {
      active: {
        red: false,
        blue: false,
        green: false,
        yellow: false,
      },
      hexCodes: {
        red: "#FF0000",
        blue: "#1e90ff",
        yellow: "#ffff00",
        green: "#32cd32"
      }
    }
  },

  mounted () {
    const self = this
    let i = 0
    self.startGame(i)
  },



  methods: {
    startGame(i) {
      const self = this

      let random = self.returnRandomHexCode()
      self.setElementToTrue(random)

      if (i <= 10) { setTimeout(function() {
        self.startGame(++i)
        },2000)
      }
    },

    returnRandomHexCode() {
      const self = this
      let keys = Object.keys(self.hexCodes)

      return self.hexCodes[keys[ keys.length * Math.random() << 0]]
    },

    setElementToTrue(random) {
      const self = this

      let keysLength = Object.keys(self.hexCodes).length

      Object.entries(self.hexCodes).forEach(key => {
        if (key[1] == random) {
          self.active[key[0]] = true
          setTimeout(function() {
            self.toggleAllToFalse()
          }, 1000)
        }
        return self.active
      })
    },

    toggleAllToFalse() {
      const self = this

      Object.entries(self.active).forEach(key => {
        self.active[key[0]] = false
        return self.active
      })
    }

  }
}
</script>

<style scoped>


#game{
  margin: auto;
  width: 50%;
  padding: 10px;
}


.redSquare {
  float:left;
  position: relative;
  width: 35%;
  padding-bottom: 30%;
  margin:1.66%;
  background-position:center center;
  background-repeat:no-repeat;
  background-color: #B20000;
}

.blueSquare {
  float:left;
  position: relative;
  width: 35%;
  padding-bottom: 30%;
  margin:1.66%;
  background-position:center center;
  background-repeat:no-repeat;
  background-color: #2100B2;
}

.yellowSquare {
  float:left;
  position: relative;
  width: 35%;
  padding-bottom: 30%;
  margin:1.66%;
  background-position:center center;
  background-repeat:no-repeat;
  background-color: #CCCC00;
}

.greenSquare {
  float:left;
  position: relative;
  width: 35%;
  padding-bottom: 30%;
  margin:1.66%;
  background-position:center center;
  background-repeat:no-repeat;
  background-color: #006400;
}

.red_active {
  background-color: #FF0000;
}

.blue_active {
  background-color: #1e90ff;
}

.green_active {
  background-color: #32cd32;
}

.yellow_active {
  background-color: #ffff00;
}

</style>
