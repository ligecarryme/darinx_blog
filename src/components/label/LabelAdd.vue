<template>
  <div class="add_container">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>添加标签</el-breadcrumb-item>
    </el-breadcrumb>
    <el-input clearable placeholder="请输入内容" v-model="input.name">
      <template slot="prepend">标签名称：</template>
    </el-input>
    <div class="btns">
      <el-button type="info" size="small" @click="backtolist">返回</el-button>
      <el-button type="success" size="small">提交</el-button>
    </div>
  </div>
</template>

<script>
export default {
  inject:['reload'],
  data() {
    return {
      input: {
        id: 0,
        name: ''
      },
      pagger: {
        current: 1,
        size: 0,
        total: 0
      }
    }
  },
  methods:{
    backtolist(){
      this.$router.push('/labellist');
      this.reload();
    }
  }
}
</script>

<style lang="less" scoped>
.btns {
  float: right;
  margin-top: 1em;
}
</style>