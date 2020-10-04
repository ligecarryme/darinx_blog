<template>
  <div id="app">
    <el-container>
      <!-- 头部 -->
      <el-header>
        <div class="left-header">
          <div style="width:185px;">
            <span>
              <h3>Blog管理系统</h3>
            </span>
          </div>
          <div class="menu-header">
            <el-menu
              :default-active="activeIndexheader"
              class="el-menu-demo"
              mode="horizontal"
              @select="handleSelectVertical"
              background-color="#303643"
              text-color="#D8D8D8"
              active-text-color="#ffffff"
            >
              <!--router  route="/bloglist"  route="/labellist" route="/classifylist" -->
              <el-menu-item index="blog">博客管理</el-menu-item>
              <el-menu-item index="label">标签管理</el-menu-item>
              <el-menu-item index="classify">分类管理</el-menu-item>
            </el-menu>
          </div>
        </div>

        <div>
          <el-button type="info" @click="logout">退出</el-button>
        </div>
      </el-header>
      <el-container>
        <!-- 侧边栏 -->
        <el-aside style="width:220px;">
          <el-menu
            :default-active="activeIndexAside"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            @select="handleSelectHorizontal"
            router
          >
            <div v-if="sideBarid == 'blog'">
              <el-menu-item index="/bloglist">
                <i class="el-icon-tickets"></i>
                <span>博客列表</span>
              </el-menu-item>
              <el-menu-item index="/blogpublish">
                <i class="el-icon-document"></i>
                <span>博客发布</span>
              </el-menu-item>
            </div>
            <div v-else-if="sideBarid == 'label'">
              <el-menu-item index="/labellist">
                <i class="el-icon-collection"></i>
                <span>标签列表</span>
              </el-menu-item>
              <el-menu-item index="/labeladd">
                <i class="el-icon-collection-tag"></i>
                <span>标签新增</span>
              </el-menu-item>
            </div>
            <div v-else>
              <el-menu-item index="/classifylist">
                <i class="el-icon-receiving"></i>
                <span>分类列表</span>
              </el-menu-item>
              <el-menu-item index="/classifyadd">
                <i class="el-icon-files"></i>
                <span>分类新增</span>
              </el-menu-item>
            </div>
          </el-menu>
        </el-aside>
        <!-- 主体 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndexheader: 'blog',
      activeIndexAside: '',
      sideBarid: 'blog',
    }
  },
  computed: {},
  mounted() {
    this.activeIndexheader = this.$route.name
    this.activeIndexAside = this.$route.path
    if (this.$route.name !== undefined) {
      this.sideBarid = this.$route.name
    }
  },
  methods: {
    logout() {
      this.$axios.get("/logout");
      window.sessionStorage.clear();
      this.$message.success('注销成功');
      this.$router.push('/login');
    },
    handleSelectVertical(key, keyPath) {
      this.sideBarid = keyPath
      console.log('Vertical' + key, keyPath)
    },
    handleSelectHorizontal(key, keyPath) {
      // this.activeIndexAside = keyPath;
      console.log('Horizontal' + key, keyPath)
    },
  },
}
</script>

<style lang="less" scoped>
.el-main {
  background: url('../assets/bg.png');
}
.el-menu-demo {
  height: 60px !important;
}

.left-header {
  display: flex;
  height: 60px;
  padding-left: 1em;
}
.menu-header {
  overflow: hidden;
}
.el-container {
  height: 100%;
}

.el-header {
  background-color: #303643;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
}

.el-aside {
  background-color: #545c64;
  width: 220px;
}

.el-main {
  background-color: #eaedf1;
  padding: 20px;
}

.el-menu-vertical-demo {
  border-right: solid 1px #545c64;
}
</style>