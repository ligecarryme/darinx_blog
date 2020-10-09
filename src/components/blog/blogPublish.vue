<template>
  <div class="add_container">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>博客发布</el-breadcrumb-item>
    </el-breadcrumb>
    <el-input placeholder="请输入标题" v-model="blog.title" class="input-with-select">
      <el-select v-model="blog.flag" slot="prepend" placeholder="请选择">
        <el-option label="原创" value="1"></el-option>
        <el-option label="转载" value="2"></el-option>
        <el-option label="翻译" value="3"></el-option>
      </el-select>
    </el-input>
    <div class="editorMd pt-1">
      <mavon-editor :ishljs="true" v-model="blog.content" style="min-height:500px"></mavon-editor>
    </div>
    <div class="tagsandclassify pt-1">
      <div class="prepend">博客类型</div>
      <el-select v-model="blog.typeid" clearable style="width:39%" placeholder="请选择类型">
        <el-option v-for="item in typelist" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
      <div class="prepend">博客标签</div>
      <el-select v-model="blog.tagsid" multiple clearable filterable style="width:40%" placeholder="请选择标签">
        <el-option v-for="item in taglist" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
    </div>
    <el-input placeholder="请输入链接" v-model="blog.firstPicture" class="pt-1">
      <template slot="prepend">首图链接</template>
    </el-input>
    <div class="pt-1">
      <el-checkbox label="推荐" v-model="blog.recommend"></el-checkbox>
      <el-checkbox label="转载声明" v-model="blog.shareStatement"></el-checkbox>
      <el-checkbox label="赞赏" v-model="blog.appreciation"></el-checkbox>
      <el-checkbox label="评论" v-model="blog.commentabled"></el-checkbox>
    </div>
    <el-row class="btns pt-1">
      <el-button type="info" size="small" @click="backtolist">返回</el-button>
      <el-button type="primary" size="small" @click="savetodraft">保存</el-button>
      <el-button type="success" size="small" @click="publish">发布</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  inject: ['reload'],
  data() {
    return {
      blog: {
        id: 0,
        flag: '原创',
        title: '',
        content: '',
        typeid: '',
        tagsid: [],
        firstPicture: '',
        recommend: true,
        shareStatement: false,
        appreciation: true,
        commentabled: true,
        published: true
      },
      typelist: [
        { id: '1', name: '学习' },
        { id: '2', name: '生活' },
      ],
      taglist: [
        { id: '1', name: 'Java' },
        { id: '2', name: 'JavaScript' },
        { id: '3', name: 'VUE' }
      ],
    }
  },
  created() {
    this.querytype();
    this.querytag();
  },                                                          
  methods: {
    backtolist() {
      this.$router.push('/bloglist');
      this.reload();
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
    querytag() {
      let that = this;
      this.$axios.get('/getTags').then((res) => {
        // console.log(res);
        const { data } = res;
        that.taglist = data.data;
      }).catch((err) => {
        console.log(err);
      })
    },
    savetodraft() {
      const param = {
        ...this.blog,
        tagsid : this.handletags(this.blog.tagsid),
        typeid : parseInt(this.blog.typeid),
        published : false
      }
      if (this.chacknotnull(param) === false) {
        return;
      }
      this.$axios.post('/addblog',param).then((res)=>{
        // console.log(res);
        if(res.data.code === 200){
          this.$message.success('保存成功');
        }else{
          this.$message.warning('保存失败，请填必属字段');
        }
      }).catch((err)=>{
        console.log(err);
      })
    },
    publish() {
      const param = {
        ...this.blog,
        tagsid : this.handletags(this.blog.tagsid),
        typeid : parseInt(this.blog.typeid),
      }
      if (this.chacknotnull(param) === false) {
        return;
      }
      this.$axios.post('/addblog',param).then((res)=>{
        // console.log(res);
        if(res.data.code === 200){
          this.$message.success('保存成功');
        }else{
          this.$message.warning('保存失败，请填必属字段');
        }
      }).catch((err)=>{
        console.log(err);
      })
    },
    handletags(tags){
      let listToStr = tags + "";
      return listToStr;
    },
    chacknotnull(param){
      if (param.title.trim() === '') {
        this.$message.warning('标题不能为空');
        return false;
      }
      if (param.content === '') {
        this.$message.warning('博客内容不能为空');
        return false;
      }
      if (!param.typeid) {
        this.$message.warning('类型不能为空');
        return false;
      }
      if (param.tagsid === '') {
        this.$message.warning('标签不能为空');
        return false;
      }
      if (param.firstPicture === '') {
        this.$message.warning('首图地址不能为空');
        return false;
      }
    }
  }
}
</script>

<style lang="less" scoped>
.el-select {
  width: 100px;
}
.tagsandclassify {
  display: flex;
  justify-content: flex-start;
}
.btns {
  float: right;
}
.prepend {
  width: 10%;
  background-color: #f5f7fa;
  color: #909399;
  padding: 10px 20px;
  font-size: 14px;
  border: 1px solid #DCDFE6;
  white-space: nowrap;
}
</style>