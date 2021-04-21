<template>
  <div class="tool-side">
    <slot></slot>
  </div>
</template>

<style scoped>
.tool-side {
  position: fixed;
  top: 0;
  left: 200px;
  width: 170px;
  height: 100vh;
  padding: 20px;
}
.tool-side > * {
  width: 100%;
}
.tool-side::after {
  box-shadow: 2px 0 3px 0 rgb(0 0 0 / 7%);
  display: block;
  position: fixed;
  top: 0;
  left: 408px;
  color: rgba(0, 0, 0, 0.07);
  content: "";
  height: 100%;
  width: 2px;
}
</style>
