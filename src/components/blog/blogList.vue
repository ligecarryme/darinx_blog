<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>博客列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索添加区域 -->
      <div style="margin-top: 10px;">
        <el-row>
          <el-col :xs="24" :sm="16" :md="12" :lg="8">
            <el-input placeholder="请输入内容" class="input-with-select" v-model="input" clearable>
              <el-select v-model="select" slot="prepend" placeholder="请选择">
                <el-option label="餐厅名" value="1"></el-option>
                <el-option label="订单号" value="2"></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </el-col>
        </el-row>
      </div>
      <!-- 博客列表 -->
      <div class="bloglisttable">
        <el-table :data="tableData" stripe border style="width: 100%">
          <el-table-column type="index" label="ID"></el-table-column>
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
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagenum"
            :page-sizes="[2, 6, 12]"
            :page-size="6"
            layout="total, sizes, prev, pager, next, jumper"
            :total="24"
          ></el-pagination>
          <el-button type="success" plain size="small">新增</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      select: "",
      input: "",
      pagenum: 1,
      tableData: [
        {
          title: "Java实战",
          recommend: "是",
          status: "草稿",
          date: "2020-9-19 17：33",
        },
        {
          title: "JavaScript实战",
          recommend: "是",
          status: "正文",
          date: "2020-9-19 21：00",
        },
        {
          title: "VUE实战",
          recommend: "是",
          status: "正文",
          date: "2020-9-19 21：10",
        },
      ],
    };
  },
  methods: {
    // async getBlogList() {
    //   const { data: res } = await this.$http.get("blogs", {
    //     params: this.queryinfo,
    //   });
    //   if (res.meta.status != 200) {
    //     return this.$message.error("获取博客列表失败");
    //   }
    //   console.log(res);
    // },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
};
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