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
      <el-button type="success" size="small" @click="submitAddTag">提交</el-button>
    </div>
  </div>
</template>

<script>
export default {
  inject: ['reload'],
  data() {
    return {
      input: {
        id: 0,
        name: ''
      },
      pagger: {
        current: 1
      },
      newid: 0
    }
  },
  created() {
    if (this.$route.params.id !== undefined) {
      this.input = this.$route.params;
    }
    this.queryListNum();
  },
  methods: {
    backtolist() {
      this.$router.push('/labellist');
      this.reload();
    },
    queryListNum() {
      let that = this;
      this.$axios.get('/tagslist', { params: { currentPageNum: 1 } })
        .then((response) => {
          const { data } = response;
          that.newid = data.data.totalElements + 1;
        }).catch((error) => {
          console.log(error);
        })
    },
    submitAddTag() {
      if (this.input.name.trim() === '') {
        this.$message.warning('请输入标签名称');
        return;
      }
      if (this.input.id === 0) {
        this.input.id = this.newid;
      }
      const addParams = this.input;
      this.$axios.post('/addtag', addParams)
        .then((response) => {
          const { data } = response;
          if (data.code === 200) {
            this.$message.success('添加成功');
            this.input.name = '';
          } else {
            this.$message.error('添加失败，类名重复');
          }
        }).catch((error) => {
          this.$message.error('添加失败');
          console.log(error);
        })
      this.queryListNum();
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