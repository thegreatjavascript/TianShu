<template>
  <div class="title" @click="$router.push('/')">
    <span>
      天
    </span>
    <span>
      书
    </span>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.title {
  cursor: pointer;
  width: fit-content;
  margin: 50px auto 20px auto;
  color: #000;
  font-size: 2em;
  font-weight: bold;
  span:last-child {
    color: #ffffff;
    background: #b11116;
    padding: 5px 10px;
    border-radius: 7px;
  }
}
</style>
