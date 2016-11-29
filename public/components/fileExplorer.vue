<template>
  <div id="filePicker" class="content">
    <div v-if="$loadingAsyncData">Loading...</div>
    <div v-if="!$loadingAsyncData">
      <iframe @load="createChannel" class="file-picker-iframe" :src="fileSystems[selectedFileSystem].url + '?filePicker=file&type=*'"></iframe>
    </div>
  </div>
</template>

<script>

  import Remote from '../js/remote.js';
  export default {
    data () {
      return {
        fileSystems: [],
        selectedFileSystem: 0
      }
    },
    props: ['popup'],
    asyncData: function (resolve, reject) {
      DocumentHost.get('sleek/fileSystems')
        .then(function (data) {
          console.log('result', data);
          resolve({
            fileSystems: data
          });
        }, function (error) {
          console.log('error', error);
        });
    },
    methods: {
      createChannel () {
        this.popup.createChannel(this.$el);
        console.log(this);
      }
    }
  }
</script>

<style>
.file-picker-iframe {
  height: 300px;
  width: 500px;
}
</style>
