<template>
  <div id="app">
    <aside class="app-aside">
      <ul>
        <router-link
          v-for="(path) in constantRouter"
          tag="li"
          :key="path.path"
          :to="path.path"
          exact
          class="slider-nav"
        >{{ path.name}}</router-link>
      </ul>
    </aside>
    <article class="app-artcle">
      <router-view v-if="$route.path!=='/'"></router-view>
      <div v-else class="app-example-box">组件库-调试界面</div>
    </article>
  </div>
</template>

<script>
import { constantRouter } from './router'
export default {
  name: "App",
  data: function() {
    return {
      constantRouter
    }
  }
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}
#app {
  margin: 0;
  padding: 0;
  min-height: 100%;
  display: flex;
}
.app-aside {
  width: 200px;
  flex: none;
  background: #000000;
}
.app-artcle {
  width: 100%;
  flex: 1;
}
.slider-nav {
  color:#ffffff;
  padding: 10px;
  cursor: pointer;
}
.router-link-active {
  color: #d57da7;
}
.app-example-box {
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  height: 100%;
  flex-wrap: wrap;
}
.app-example-block {
  width: 100%;
  text-align: center;
}
</style>