<template>
  <div class="add_container">
    <el-input placeholder="请输入标题" v-model="input" class="input-with-select">
      <el-select v-model="select" slot="prepend" placeholder="请选择">
        <el-option label="原创" value="1"></el-option>
        <el-option label="转载" value="2"></el-option>
      </el-select>
    </el-input>
    <el-input
      type="textarea"
      :autosize="{ minRows: 2, maxRows: 4}"
      placeholder="请输入内容"
      v-model="textarea"
      style="margin-top:1em;"
    ></el-input>
    <div class="tagsandclassify">
      <el-input placeholder="请输入内容" v-model="tagsinput">
        <template slot="prepend">分类</template>
      </el-input>
      <el-input placeholder="请输入内容" v-model="classifyinput">
        <template slot="prepend">标签</template>
      </el-input>
    </div>
    <el-input placeholder="请输入内容" v-model="classifyinput">
      <template slot="prepend">首图</template>
    </el-input>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: '',
      select: '1',
      textarea: '',
      tagsinput: '',
      classifyinput: '',
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
  margin-top: 1em;
}
</style>