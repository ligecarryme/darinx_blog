<template>
  <div class="list_container">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>分类列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-table :data="tableData" border stripe style="width: 100%">
        <el-table-column prop="id" label="ID" width="80"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column label="操作">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="editclassify">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="delclassify">删除</el-button>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination @current-change="handleCurrentChange" layout="total, prev, pager, next" :total="pagger.total" :hide-on-single-page="true"></el-pagination>
        <el-button type="success" plain size="small" @click="addNew">新增</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pagger:{
        current:1,
        size: 8,
        total: 0
      },
      tableData: [
        { id:'1' ,name: '基础知识学习'}
      ],
    }
  },
  created() {
    this.getList();
  },
  methods: {
    editclassify() {
      this.$message('编辑信息')
    },
    delclassify() {
      this.$message('删除信息')
    },
    getList() {
      let that = this;
      const pageParam = that.pagger;
      this.$axios.post('/typeslist',pageParam).then((response)=>{
        const {data} = response;
        that.tableData = data.data.content;
        that.pagger.total = data.data.totalElements;
      }).catch((error)=>{
        console.log(error)
      })
    },
    addNew(){
      this.$router.push('/classifyadd');
    },
    handleCurrentChange(val){
      this.pagger.current = val;
      this.getList();
    }
  }
}
</script>

<style lang="less" scoped>
.block {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
</style>