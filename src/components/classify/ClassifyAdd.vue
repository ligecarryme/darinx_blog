<template>
  <div class="add_container">
    <el-input clearable placeholder="请输入内容" v-model="input">
      <template slot="prepend">分类名称：</template>
    </el-input>
    <div class="btns">
      <el-button type="info" size="small">返回</el-button>
      <el-button type="success" size="small">提交</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: '',
    }
  },
}
</script>

<style lang="less" scoped>
.btns {
  float: right;
  margin-top: 1em;
}
</style>