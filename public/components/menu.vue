<template>
  <div id="menu" v-if="menuState.show">
    <h1>Apps <img @click="close()" src="../img/Close-48.png"></h1>
    <ul>
      <li track-by="$index" class="{{app.isExternal ? 'external': ''}}" v-for="app in apps" @click="open(app.id)">
        <img :src="app.icon">{{app.name}}
      </li>
    </ul>
  </div>
</template>

<script>
  import Menu from '../js/menu.js';
  var WindowManager = require('../js/window_manager');
  export default {
    data () {
      return {
        menuState: Menu.state,
        apps: WindowManager.appData
      }
    },
    methods: {
      close () {
        this.menuState.show = false;
      },
      open (id) {
        console.log(id);
        WindowManager.open(id);
        this.menuState.show = false;
      }
    }
  }
</script>

<style>
  #menu li.external:hover {
    box-shadow: 0px 3px 0px #37B37F;
  }
</style>
