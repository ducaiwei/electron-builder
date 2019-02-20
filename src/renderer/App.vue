<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'notes',
    data () {
      return {
      }
    }
  }
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
html,body {
  height: 100%;
}
ul, li {
  list-style: none;
}
input, select, button, input:focus{
  border: none;
  -webkit-appearance: none;
}
button {
  outline: none
}
#app {
  height: 100%;
  overflow: auto;
}
</style>
