<template>
  <div>
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <a-layout-sider v-model="settingsPage.collapsed"
                      mode="inline"
                      collapsible>
        <div class="sapartime_logo">Admin</div>
        <a-menu
            theme="dark" mode="inline"
        >
          <a-menu-item key="dash" @click="$router.push('/admin')">
            <a-icon type="user"/>
            <span>Dashboard</span>
          </a-menu-item>
          <a-menu-item key="sub2" @click="$router.push('/admin/posts')">
            <a-icon type="tags"></a-icon>
            <span>Post</span>
          </a-menu-item>
          <a-menu-item key="sub3" @click="$router.push('/admin/post-categories/')">
            <a-icon type="home"></a-icon>
            <span>Post Category</span>
          </a-menu-item>
          <a-sub-menu key="sub6">
            <template #title>
            <span>
              <span>Profile</span>
            </span>
            </template>
            <a-menu-item key="profile1" @click="$router.push('/admin/profile')">
              <span>Profile</span>
            </a-menu-item>
            <a-menu-item key="profile4">
              <a-button type="primary" @click="logout">Logout</a-button>
            </a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <!--        <a-layout-header ></a-layout-header>-->
        <a-layout-content style="margin: 0 16px">
          <a-breadcrumb style="margin: 16px 0">
            <a-breadcrumb-item>User</a-breadcrumb-item>
            <a-breadcrumb-item>Bill</a-breadcrumb-item>
          </a-breadcrumb>
          <a-card>
            <slot/>
          </a-card>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>


<script setup lang="ts">

import {useRoute, useRouter, onBeforeRouteLeave} from "vue-router";
import {reactive} from "vue";

const router = useRouter();
const settingsPage = reactive({
  collapsed: false
})
const logout = () => {
  localStorage.clear();
  router.push('/')
};
</script>

<style scoped>
.sapartime_logo {
  border: 1px solid;
  background: #1bc7b4;
  padding: 10px 20px;
  font-size: 20px;
  color: #fff;
  width: 100%;
  font-weight: bold;
  text-align: center;
}
</style>
