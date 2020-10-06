<template>
  <div class="list_container">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>标签列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-table :data="tableData" border stripe style="width: 100%">
        <el-table-column type="index" prop="id" label="ID"></el-table-column>
        <el-table-column prop="tagname" label="名称"></el-table-column>
        <el-table-column label="操作">
          <template v-slot='scope'>
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="edittag(scope.$index, scope.row)">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deltag(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination :page-size="8" @current-change="handleCurrentChange" layout="total, prev, pager, next" :total="pagger.total"></el-pagination>
        <el-button type="success" plain size="small" @click="addNew">新增</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  inject:['reload'],
  data() {
    return {
      pagger:{
        current: 1,
        size: 8,
        total: 0
      },
      tableData: [
        { id: 1, tagname: 'Java' },
        { id: 2, tagname: 'JavaScript' }
      ],
    }
  },
  methods: {
    edittag(index, row) {
      console.log(index,row);
      this.$message('编辑信息');
    },
    deltag(index, row) {
      console.log(index,row);
      this.$message('删除信息')
    },
    addNew(){
      this.$router.push('/labeladd');
      this.reload();
    }
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