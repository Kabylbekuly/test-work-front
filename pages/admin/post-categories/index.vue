<template>
  <div>
    <div class="row pb-4">
      <div class="col-md-6">

      </div>
      <div class="col-md-6">
        <div class="d-flex justify-content-end">
          <a-button type="primary" @click="router.push('/admin/post-categories/create')"
          >
            Create Post Category
          </a-button>
        </div>
      </div>
    </div>
    <a-table :columns="columns" :data-source="pageData.data.data">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'status'">
          <a-tag color="#2db7f5">{{ record.status_name }}</a-tag>
        </template>
        <template v-else-if="column.key === 'action'">
          <a-button type="primary" @click="router.push('/admin/post-categories/'+record.id)">Изменить</a-button>
        </template>
      </template>
    </a-table>

  </div>
</template>
<script setup lang="ts">

import {useStorage} from '@vueuse/core'
import {notification} from "ant-design-vue";
import {useRoute, useRouter, onBeforeRouteLeave} from "vue-router";
import {onMounted} from 'vue';

const route = useRoute();
const router = useRouter();
definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})
const pageData = reactive({
  data: '',
})
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Actions',
    key: 'action',
  },
];
const loadData = async () => {
  const {data, pending, error, refresh} = await useMyFetch('/cabinet/post-category', {
    method: 'get',
    headers: {
      Authorization: 'Bearer ' + useStorage('token', '').value,
    },
    onRequestError({request, options, error}) {
    },
    onResponse({request, response, options}) {
      if (response._data.success == true) {
        pageData.data = response._data
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
