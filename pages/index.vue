<template>
  <div class="h-100">
    <a-row :gutter="16">
      <a-col :span="8" v-for="item in pageData.data" style="margin-bottom: 20px;">
        <a-card  :title="item.name" :bordered="false">
          <p> {{ item.description }}</p>
          <a-tag color="green">{{ item.category.name }}</a-tag>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script setup lang="ts">
import {useStorage} from '@vueuse/core'
import {notification} from "ant-design-vue";
import {useRoute, useRouter, onBeforeRouteLeave} from "vue-router";
import {onMounted} from 'vue';

const pageData = reactive({
  data: '',
})
const route = useRoute();
const router = useRouter();
const loadData = async () => {
  const {data, pending, error, refresh} = await useMyFetch('/cabinet/post', {
    method: 'get',
    onRequestError({request, options, error}) {
    },
    onResponse({request, response, options}) {
      if (response._data.success == true) {
        pageData.data = response._data.data
      } else {
      }
    },
    onResponseError({request, response, options}) {
      if (response.status == 422) {
        Object.entries(response._data.data.errors).forEach(([key, value]) => notification['error']({
          message: 'Ошибка',
          description: value,
        }))
      }
    }
  })
}
loadData();
</script>
