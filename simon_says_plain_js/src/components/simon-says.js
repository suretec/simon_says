((() => {
  const html = `
  <div id="game">

    <!-- The Modal -->
    <div id="myModal" class="modal"  v-bind:class="{hide_model: !showModal}"">
      <!-- Modal content -->
      <div class="modal-content">
        <p>Level {{ level }} </p>
         <input type="button" class="close" value="begin" v-on:click="hideModal()"">
         <p v-if=lose>Oops!</p>
      </div>
    </div>

    <div class="red" v-bind:class="{red_active: active.red === true}" v-on:click= "handleClick($event)"></div>
    <div class="blue" v-bind:class="{blue_active: active.blue === true}" v-on:click="handleClick($event)"></div>
    <div class="yellow" v-bind:class="{yellow_active: active.yellow === true}" v-on:click="handleClick($event)"></div>
    <div class="green" v-bind:class="{green_active: active.green === true}" v-on:click="handleClick($event)"></div>
  </div>
  `

  Vue.component("simon-says", {
    template: html,
    data() {
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
        toggle: 3000,
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
        if (self.round % 10 === 0) {
          return self.toggle -= 100
        } else {
          return self.toggle
        }
      }
    },

    methods: {
      hideModal() {
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
        }, self.delayToggle)
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
        }, self.delayTrue)
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
  })
}))()