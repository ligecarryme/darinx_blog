<template>
  <div class="list_container">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>分类列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-table :data="tableData" border stripe style="width: 100%">
        <el-table-column type="index" label="ID" width="80" :index="indexMethod"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column label="操作">
          <template v-slot='scope'>
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editclassify(scope.$index, scope.row)">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="delclassify(scope.$index, scope.row)">删除</el-button>
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
  inject: ['reload'],
  data() {
    return {
      pagger: {
        current: 1,
        size: 8,
        total: 0
      },
      tableData: [
        { id: '1', name: '基础知识学习' }
      ],
    }
  },
  created() {
    this.getList();
  },
  methods: {
    editclassify(index, row) {
      // console.log(index, row);
      this.$router.push({ name: 'classifyadd', params: { id: row.id, name: row.name } })
      this.$message('编辑分类名称');
      this.reload();
    },
    delclassify(index, row) {
      // console.log(index, row);
      let that = this;
      this.$confirm('此操作将删除该类型, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        that.$axios.get('/deletetype/' + row.id)
          .then((response) => {
            const { data } = response;
            if (data.code === 200) {
              that.tableData.splice(index, 1);
              this.$message.success('删除成功');
              that.reload();
            } else {
              this.$message.error('删除失败')
            }
          }).catch((error) => {
            console.log(error);
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    getList() {
      let that = this;
      const { current } = that.pagger;
      this.$axios.get('/typeslist', { params: { currentPageNum: current } })
        .then((response) => {
          const { data } = response;
          that.tableData = data.data.content;
          that.pagger.total = data.data.totalElements;
        }).catch((error) => {
          console.log(error)
        })
    },
    addNew() {
      this.$router.push('/classifyadd');
      this.reload();
    },
    handleCurrentChange(val) {
      this.pagger.current = val;
      this.getList();
    },
    indexMethod(index) {
      return (this.pagger.current - 1) * 8 + index + 1;
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