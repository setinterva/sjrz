<template>
  <div id="app">
    <keep-alive>     <!--使用keep-alive会将页面缓存-->
      <router-view v-if="$route.meta.keepAlive"></router-view>
   </keep-alive>
   <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
#app{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
