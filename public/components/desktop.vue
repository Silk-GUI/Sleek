<template>
  <div id="desktop">
    <div v-for="window in windows" class="window" v-show="!window.minimized" :style="{zIndex: window.zIndex}">
      <iframe v-if="window.running" class="content" @load="buildChannel($index)" :src="window.url"
              data-name="{{window.title}}"></iframe>
    </div>
    <div id="appNotifications"></div>
  </div>
</template>

<script>
  import WindowManager from '../js/window_manager_2';
  import Channel from '../js/channel';

  export default {
    data() {
      return {
        windows: WindowManager.windows
      }
    },
    methods: {
      buildChannel (index) {
        console.log('channel');
        new Channel(index);
      },
      minimize (index) {
        WindowManager.minimizeWindow(index);
      },
      close (index) {
        WindowManager.closeWindow(index);
      }
    }
  };
</script>

<style>
  #desktop .window {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-bottom: 50px;
  }

  .window * {
    -webkit-user-select: none;
  }

  #desktop .window iframe {
    background-color: white;
    border: none;
    width: 100%;
    height: 100%;
    margin: 0px;
    box-sizing: border-box;
  }
</style>
