<template>
  <div id="game">

    <!-- The Modal -->
    <div id="myModal" class="modal"  v-bind:class="{hide_model: !showModel}"">
      <!-- Modal content -->
      <div class="modal-content">
        <p>Level {{ level }} </p>
         <input type="button" class="close" value="begin" v-on:click="hideModel()"">
         <p v-if=lose>Oops!</p>
      </div>
    </div>

    <div class="red" v-bind:class="{red_active: active.red === true}" v-on:click= "handleClick($event)"></div>
    <div class="blue" v-bind:class="{blue_active: active.blue === true}" v-on:click="handleClick($event)"></div>
    <div class="yellow" v-bind:class="{yellow_active: active.yellow === true}" v-on:click="handleClick($event)"></div>
    <div class="green" v-bind:class="{green_active: active.green === true}" v-on:click="handleClick($event)"></div>
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
      },

      colorSequence: [],
      clickCount: 0,
      round: 1,
      showModal: true,
      level: 1,
      lose: false,
      delay: 1500,
      toggle: 1000,
    }
  },

  computed: {

    currentIndex() {
      const self = this

      return self.colorSequence[self.clickCount]
    },

    delayTrue() {
      const self = this

      if (self.round % 10 === 0) {
        return self.delay -= 100
      } else {
        return self.delay
      }
    },

    delayToggle() {
      const self = this

      if (self.toggle % 10 === 0) {
        return self.toggle -= 100
      } else {
        return self.toggle
      }
    }
  },

  methods: {

    hideModel() {
      const self = this
      ++self.round
      self.showModal = false
      self.startGame()
    },

    startGame() {
      const self = this

      setTimeout(function() {
        let randomHex = self.returnRandomHexCode()
        self.setElementToTrue(randomHex)
        if (--self.level){
          self.startGame()
        }
      }, self.delay)
    },

    returnRandomHexCode() {
      const self = this
      let keys = Object.keys(self.hexCodes)

      return self.hexCodes[keys[ keys.length * Math.random() << 0]]
    },

    setElementToTrue(randomHex) {
      const self = this

      Object.entries(self.hexCodes).forEach(key => {
        if (key[1] == randomHex) {
          self.active[key[0]] = true
          self.colorSequence.push(key[0])
          self.toggleToFalse()
        }
      })
    },

    toggleToFalse(key) {
      const self = this

      setTimeout(function() {
        Object.entries(self.active).forEach(key => {
          self.active[key[0]] = false
        })
      }, self.toggle)
    },

    handleClick(target) {
      const self = this

      if (target.currentTarget.className === self.currentIndex) {
        self.highlight()
        ++self.clickCount
        if(self.clickCount === self.colorSequence.length) { self.next() }
      } else {
        self.restart()
      }
    },

    next() {
      const self = this
      self.colorSequence = []
      self.showModal = true
      self.level = self.round
      self.clickCount = 0
    },

    restart() {
      const self = this
      self.colorSequence = []
      self.showModal = true
      self.level = 1
      self.clickCount = 0
      self.lose = true
      self.round = 1

      setTimeout(function() {
        self.lose = false
        self.next()
      }, 2000)
    },

    highlight() {
      const self = this

      Object.keys(self.active).forEach(key => {
        if (self.currentIndex === key) {
          self.active[key] = true
          setTimeout(function() {
            self.active[key] = false
        },100)
        }
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


.red {
  float:left;
  position: relative;
  width: 35%;
  padding-bottom: 30%;
  margin:1.66%;
  background-position:center center;
  background-repeat:no-repeat;
  background-color: #B20000;
}

.blue {
  float:left;
  position: relative;
  width: 35%;
  padding-bottom: 30%;
  margin:1.66%;
  background-position:center center;
  background-repeat:no-repeat;
  background-color: #2100B2;
}

.yellow {
  float:left;
  position: relative;
  width: 35%;
  padding-bottom: 30%;
  margin:1.66%;
  background-position:center center;
  background-repeat:no-repeat;
  background-color: #CCCC00;
}

.green {
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


/* The Modal (background) */
.modal {
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 15%; /* Could be more or less, depending on screen size */
  display: block;
  height: 40%;
}

.hide_model{
  display: none;
}

/* The Close Button */

.close {
  background: #3498db;
  background-image: -webkit-linear-gradient(top, #3498db, #2980b9);
  background-image: -moz-linear-gradient(top, #3498db, #2980b9);
  background-image: -ms-linear-gradient(top, #3498db, #2980b9);
  background-image: -o-linear-gradient(top, #3498db, #2980b9);
  background-image: linear-gradient(to bottom, #3498db, #2980b9);
  -webkit-border-radius: 28;
  -moz-border-radius: 28;
  border-radius: 28px;
  font-family: Arial;
  color: #ffffff;
  font-size: 20px;
  padding: 10px 20px 10px 20px;
  text-decoration: none;
}

.close:hover {
  background: #3cb0fd;
  background-image: -webkit-linear-gradient(top, #3cb0fd, #3498db);
  background-image: -moz-linear-gradient(top, #3cb0fd, #3498db);
  background-image: -ms-linear-gradient(top, #3cb0fd, #3498db);
  background-image: -o-linear-gradient(top, #3cb0fd, #3498db);
  background-image: linear-gradient(to bottom, #3cb0fd, #3498db);
  text-decoration: none;
}

</style>
