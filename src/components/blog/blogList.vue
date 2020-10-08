<template>
  <div class="list_container">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>博客列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索添加区域 -->
      <el-row type="flex">
        <el-col :xs="24" :sm="24" :lg="12">
          <el-input placeholder="请输入标题" class="input-with-select" v-model="input" clearable>
            <el-select v-model="select" slot="prepend" placeholder="请选择">
              <el-option label="练习清单" value="1"></el-option>
              <el-option label="基础知识" value="2"></el-option>
            </el-select>
            <el-checkbox v-model="recommend" slot="append">推荐</el-checkbox>
          </el-input>
        </el-col>
        <el-col>
          <el-button icon="el-icon-search" type="primary" style="margin-left:1em;">搜索</el-button>
        </el-col>
      </el-row>
      <!-- 博客列表  局部渲染表格-->
      <div class="bloglisttable">
        <el-table :data="tableData" stripe border style="width: 100%">
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="title" label="标题"></el-table-column>
          <el-table-column prop="recommend" label="推荐" width="50px;"></el-table-column>
          <el-table-column prop="status" label="状态" width="50px;"></el-table-column>
          <el-table-column prop="date" label="更新时间"></el-table-column>
          <el-table-column label="操作" width="180px">
            <template v-slot>
              <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="block">
          <el-pagination @current-change="handleCurrentChange" :current-page="pagenum" :page-size="8" layout="total, prev, pager, next, jumper" :total="24"></el-pagination>
          <el-button type="success" plain size="small" @click="addnew">新增</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  inject: ['reload'],
  data() {
    return {
      select: '',
      input: '',
      pagenum: 1,
      pagetotal: 0,
      recommend: true,
      tableData: [
        {
          id: 0,
          flag: '',
          title: 'Java实战',
          content: '',
          
          recommend: '是',
          status: '草稿',
          date: '2020-9-19 17：33',
        },
        {
          title: 'JavaScript实战',
          recommend: '是',
          status: '正文',
          date: '2020-9-19 21：00',
        },
        {
          title: 'VUE实战',
          recommend: '是',
          status: '正文',
          date: '2020-9-19 21：10',
        },
      ],
    }
  },
  created() {
    this.querybloglist();
  },
  methods: {
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    addnew(){
      this.$router.push('/blogpublish');
      this.reload();
    },
    querybloglist() {
      let that = this;
      this.$axios.get('/bloglist',{params: {currentPage: that.pagenum}}).then((res)=>{
        const {data} = res;
        if (data.code === 200) {
          
        }
        console.log(res);
      }).catch((err)=>{
        console.log(err);
      })
    }
  },

}
</script>

<style lang="less" scoped>
.el-select {
  width: 130px;
}
.input-with-select {
  .el-input-group__prepend {
    background-color: #fff;
  }
}
.bloglisttable {
  margin-top: 10px;
  .el-table {
    font-size: 13px;
  }
}
.block {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}
</style>