<script setup>
const { isMobile, keepAliveMap } = storeToRefs(store.useLayout());
const standardWidth = 750, mobileMaxWidth = 900; // 移动端设计图基准宽度，最大移动设备宽度
const listener = useListener();
listener.add('resize', onResize);
onResize();
function onResize() {
  const width = parseFloat(getComputedStyle(document.documentElement).width);
  isMobile.value = width <= mobileMaxWidth;
  if (window.responsive) {
    document.documentElement.style.fontSize = `${ window.fontSizeScale * (width > mobileMaxWidth ? (standardWidth / 750 * 0.5) : (width / standardWidth)) }px`;
  }
}
</script>

<template>
  <div id="nav">
    <router-link to="/home">首页</router-link>
    <span> | </span>
    <router-link to="/404">404</router-link>
  </div>

  <router-view v-slot="{ Component, route }">
    <keep-alive :include="Object.keys(keepAliveMap)">
      <component :is="Component" :key="keepAliveMap[route.name]?.key" />
    </keep-alive>
  </router-view>
</template>

<style lang="scss">
div#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  text-align: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#nav {
  padding: 30px;
  font-size: 18px;

  a {
    font-weight: bold;
    text-decoration: underline;

    &.router-link-exact-active {
      color: #42b983;
    }
  }

  span {
    position: relative;
    top: -1px;
  }
}
</style>
<style lang="scss" scoped>

</style>
