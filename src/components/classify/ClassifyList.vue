<template>
  <div class="list_container">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>分类列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-table :data="tableData" border stripe style="width: 100%">
        <el-table-column type="index" label="ID"></el-table-column>
        <el-table-column prop="classifyname" label="名称"></el-table-column>
        <el-table-column label="操作">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="editclassify">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="delclassify">删除</el-button>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination layout="prev, pager, next" :total="20" :hide-on-single-page="true"></el-pagination>
        <el-button type="success" plain size="small">新增</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      tableData: [
        {
          classifyname: '练习清单',
        },
        {
          classifyname: '基础知识学习',
        },
      ],
    }
  },
  methods: {
    editclassify() {
      this.$message('编辑信息')
    },
    delclassify() {
      this.$message('删除信息')
    },
  },
}
</script>

<style lang="less" scoped>
.block {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
</style>