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
          <el-input placeholder="请输入标题" class="input-with-select" v-model="search.title" clearable>
            <el-select v-model="search.type" slot="prepend" placeholder="类型" style="width:105px">
              <el-option v-for="item in typelist" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
            <el-checkbox v-model="search.recommend" slot="append">推荐</el-checkbox>
          </el-input>
        </el-col>
        <el-col>
          <el-button icon="el-icon-search" type="primary" style="margin-left:1em;" @click="searchblog">搜索</el-button>
        </el-col>
      </el-row>
      <!-- 博客列表  局部渲染表格-->
      <div class="bloglisttable">
        <el-table :data="blogtableData" stripe border style="width: 100%">
          <el-table-column type="index" :index="indexMethod"></el-table-column>
          <el-table-column prop="title" label="标题"></el-table-column>
          <el-table-column prop="isrecommend" label="推荐" width="50px;"></el-table-column>
          <el-table-column prop="status" label="状态" width="50px;"></el-table-column>
          <el-table-column prop="updateTime" label="更新时间" width="180px"></el-table-column>
          <el-table-column label="操作" width="200px">
            <template v-slot='scope'>
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="editblog(scope.$index,scope.row)">编辑</el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteblog(scope.$index,scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="block">
          <el-pagination @current-change="handleCurrentChange" :current-page="pagenum" :page-size="8" layout="total, prev, pager, next, jumper" :total="pagetotal"></el-pagination>
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
      pagenum: 1,
      pagetotal: 0,
      search: {
        title: '',
        type: null,
        recommend: true,
      },
      blogtableData: [
        {
          title: 'Java概述',
          isrecommend: '是',
          status: '草稿',
          updateTime: '2020-9-19 17：33',
        },
        {
          title: 'JavaScript入门',
          isrecommend: '是',
          status: '正文',
          updateTime: '2020-9-19 21：00',
        },
        {
          title: 'VUE基础',
          isrecommend: '是',
          status: '正文',
          updateTime: '2020-9-19 21：10',
        },
      ],
      typelist: [
        { id: '1', name: '学习' },
        { id: '2', name: '生活' },
      ],
    }
  },
  created() {
    this.querybloglist();
    this.querytype();
  },
  methods: {
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.pagenum = val;
      this.querybloglist();
    },
    addnew() {
      this.$router.push('/blogpublish');
      this.reload();
    },
    querybloglist() {
      let that = this;
      this.$axios.get('/bloglist', { params: { currentPage: that.pagenum } }).then((res) => {
        const { data } = res;
        if (data.code === 200) {
          let blogdata = data.data.content;
          that.blogtableData = that.handleBlogContent(blogdata);
          that.pagetotal = data.data.totalElements;
        }
        // console.log(res);
      }).catch((err) => {
        console.log(err);
      })
    },
    searchblog() {
      let that = this;
      var typeid = parseInt(this.search.type);
      if (isNaN(typeid)) {
        typeid = null;
      }
      const searchparam = {
        title: that.search.title,
        recommend: that.search.recommend,
        typeid: typeid
      }
      if (searchparam.title.trim() === '') {
        this.$message.warning('请输入标题');
        that.querybloglist();
        return;
      }
      this.$axios.get('/bloglist/search', { params: searchparam }).then((res) => {
        const { data } = res
        if (data.code === 200 && data.data.content.length > 0) {
          that.blogtableData = that.handleBlogContent(data.data.content);
          that.pagetotal = data.data.totalElements;
          // console.log(that.blogtableData)
        } else {
          this.$message.warning('未查询到')
        }
      }).catch((err) => {
        console.log(err);
      })
    },
    handleBlogContent(content) {
      for (let item of content) {
        if (item.published) {
          item.status = '正文';
        } else {
          item.status = '草稿';
        }
        if (item.recommend) {
          item.isrecommend = '是';
        } else {
          item.isrecommend = '否';
        }
        // const formatdate = item.updateTime.split(/[T.]/);
        // item.updateTime = formatdate[0] + ' ' + formatdate[1];
      }
      return content;
    },
    editblog(index, row) {
      const editparam = {
        id: row.id,
        flag: row.flag,
        title: row.title,
        content: row.content,
        typeid: row.type.id,
        tagsid: this.handletags(row.tags),
        firstPicture: row.firstPicture,
        recommend: row.recommend,
        shareStatement: row.shareStatement,
        appreciation: row.appreciation,
        commentabled: row.commentabled,
        published: row.published,
        description: row.description,
        username: row.user.username
      }
      this.$router.push({name:'blogpublish',params:editparam})
      this.$message({
        message: '编辑博客',
        duration: 1500
      })
      this.reload();
      // console.log(index, row)
    },
    deleteblog(index, row) {
      let that = this;
      that.$confirm('此操作将永久删除该博客, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.get('/bloglist/delete/' + row.id).then((res) => {
          const { data } = res;
          if (data.code === 200) {
            that.blogtableData.splice(index, 1);
            that.$message.success('删除成功');
            that.reload();
          } else {
            that.$message.error('删除失败');
          }
        }).catch((err) => { console.log(err) });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      })
      // console.log(index, row)
    },
    indexMethod(index) {
      return (this.pagenum - 1) * 8 + index + 1;
    },
    handletags(tags){
      let arr = [];
      for (let item of tags) {
        arr.push(item.id);
      }
      return arr;
    },
    querytype() {
      let that = this;
      this.$axios.get('/getTypes').then((res) => {
        // console.log(res);
        const { data } = res;
        that.typelist = data.data;
      }).catch((err) => {
        console.log(err);
      })
    },
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