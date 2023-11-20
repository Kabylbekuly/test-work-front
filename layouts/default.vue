<template>
  <div>
    <a-layout class="layout">
      <a-layout-header>
        <div class="logo"/>
        <a-menu
            v-model:selectedKeys="selectedKeys"
            theme="dark"
            mode="horizontal"
            :style="{ lineHeight: '64px' }"
        >
          <a-menu-item key="1"><router-link to="/">Posts</router-link></a-menu-item>
          <a-menu-item key="2"><router-link to="/categories">Category</router-link></a-menu-item>
          <a-menu-item key="3"><router-link to="/auth/login">Auth</router-link></a-menu-item>
        </a-menu>
      </a-layout-header>
      <a-layout-content style="padding: 40px 0px; min-height: 500px">
        <slot/>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </div>
</template>
