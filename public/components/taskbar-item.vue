<template>
  <div @click="open" :class="{running: window.running, active: isActive, app: true}">
    <img :src="window.icon">
    <span class="title">{{window.title}}</span>
    <span class="close" @click="close($index)">&times;</span>

  </div>
</template>

<script>
  import WindowManager from '../js/window_manager_2';
 export default {
   data() {
     return {
       activeWindows: WindowManager.activeWindows
     };
   },
   props: ['window', 'index'],
   methods: {
     close () {
        WindowManager.closeWindow(this.index);
     },
     open () {
       WindowManager.maximizeWindow(this.index);
     }
   },
   computed: {
     isActive () {
       var activeIndex = this.activeWindows.indexOf(this.window.windowId);
       return activeIndex > -1;
     }
   }
 }
</script>

<style>

</style>
