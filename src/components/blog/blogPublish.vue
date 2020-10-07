<template>
  <div class="add_container">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>博客发布</el-breadcrumb-item>
    </el-breadcrumb>
    <el-input placeholder="请输入标题" v-model="input" class="input-with-select">
      <el-select v-model="select" slot="prepend" placeholder="请选择">
        <el-option label="原创" value="1"></el-option>
        <el-option label="转载" value="2"></el-option>
        <el-option label="翻译" value="3"></el-option>
      </el-select>
    </el-input>
    <div class="editorMd pt-1">
      <mavon-editor :ishljs="true" v-model="textarea" style="min-height:500px"></mavon-editor>
    </div>
    <div class="tagsandclassify pt-1">
      <el-select v-model="typeselect" clearable style="width:49%" placeholder="请选择类型">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="tagselect" multiple clearable style="width:49%" placeholder="请选择标签">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </div>
    <el-input placeholder="请输入链接" v-model="firstpic" class="pt-1">
      <template slot="prepend">首图链接</template>
    </el-input>
    <div class="pt-1">
      <el-checkbox-group v-model="checkList">
        <el-checkbox label="推荐"></el-checkbox>
        <el-checkbox label="转载声明"></el-checkbox>
        <el-checkbox label="赞赏"></el-checkbox>
        <el-checkbox label="评论"></el-checkbox>
      </el-checkbox-group>
    </div>
    <el-row class="btns pt-1">
      <el-button type="info" size="small">返回</el-button>
      <el-button type="primary" size="small">保存</el-button>
      <el-button type="success" size="small">发布</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: '',
      select: '1',
      textarea: '',
      tagselect: [],
      typeselect: '',
      checkList: ['推荐'],
      firstpic: '',
      options: [
        { value: '选项1', label: '黄金糕' },
        { value: '选项2', label: '双皮奶' },
        { value: '选项3', label: '蚵仔煎' }
      ],
    }
  },
}
</script>

<style lang="less" scoped>
.el-select {
  width: 100px;
}
.tagsandclassify {
  display: flex;
  justify-content: space-between;
}
.btns {
  float: right;
}
</style>