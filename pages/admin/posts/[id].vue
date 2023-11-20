<template>
  <div>
    <a-form ref="formRef" :model="formState" layout="vertical" :rules="rules">
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="Название" name="name">
            <a-input v-model:value="formState.name"/>
          </a-form-item>
          <a-form-item label="Категория" name="cat_id">
            <a-select v-model:value="formState.cat_id">
              <a-select-option value="">Not Choosed</a-select-option>

              <a-select-option v-for="category in pageInfo.categories" :value="category.id">{{ category.name }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="Краткое описание" name="description">
            <a-input v-model:value="formState.description"/>
          </a-form-item>
          <a-form-item label="Описание" name="content">
            <a-input v-model:value="formState.content"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-button type="primary" @click="saveForm"> {{ route.params.id == 'create' ? 'Create' : 'Change' }}</a-button>
    </a-form>
  </div>
</template>
<script setup lang="ts">
import {ref} from "vue"
import {useMyFetch} from "@/composables/useMyFetch";
import {useStorage} from '@vueuse/core'
import {notification} from "ant-design-vue";
import {useRoute, useRouter, onBeforeRouteLeave} from "vue-router";
import {onMounted} from 'vue';

const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();

const formRef = ref();
definePageMeta({
  layout: 'admin',
  middleware: 'auth'

});

import {PlusOutlined} from '@ant-design/icons-vue';
import type {UploadProps} from 'ant-design-vue';
import type {UnwrapRef} from 'vue';
import type {Rule} from 'ant-design-vue/es/form';

interface FormState {
  id: string,
  content: string;
  description: string;
  name: string;
  cat_id: string;
}

const pageInfo = reactive({
  categories: '',
});
const formState: UnwrapRef<FormState> = reactive({
  id: '',
  content: '',
  description: '',
  name: '',
  cat_id: '',
});
const rules: Record<string, Rule[]> = {
  name: [
    {required: true, message: 'Please input Post name', trigger: 'change'},
    {min: 3, message: 'Length should be min 3 ', trigger: 'blur'},
  ],
  content: [
    {required: true, message: 'Please input Content name', trigger: 'change'},
    {min: 3, message: 'Length should be min 3 ', trigger: 'blur'},
  ],
  description: [
    {required: true, message: 'Please input Description name', trigger: 'change'},
    {min: 3, message: 'Length should be min 3 ', trigger: 'blur'},
  ],
  cat_id: [
    {required: true, message: 'Please input Category name', trigger: 'change'},
  ],
}


const loadData = async () => {
  await useMyFetch('/cabinet/post-category', {
    method: 'get',
    headers: {
      Authorization: 'Bearer ' + useStorage('token', '').value,
    },
  }).then((res) => {
    console.log(res.data._value)
    pageInfo.categories = res.data._value.data;
  }).catch((error) => {
    console.error('API error', error);
  });
  if (route.params.id != 'create') {
    await useMyFetch('/cabinet/post/' + route.params.id, {
      method: 'get',
      headers: {
        Authorization: 'Bearer ' + useStorage('token', '').value,
      },
    }).then((res) => {
      formState.id = res.data._value.data.id;
      formState.name = res.data._value.data.name;
      formState.content = res.data._value.data.content;
      formState.description = res.data._value.data.description;
      formState.cat_id = res.data._value.data.cat_id;
    }).catch((error) => {
      console.error('API error', error);
    });
  }
}
const saveForm = async () => {
  formRef.value
      .validate()
      .then(() => {
        saveFormAsync();
      })
      .catch(error => {
        console.log('error', error);
      });

};
const saveFormAsync = async () => {
  await useMyFetch('/cabinet/post' + (route.params.id == 'create' ? '' : '/' + formState.id), {
    headers: {"cache-control": "no-cache", "Authorization": 'Bearer ' + useStorage('token', '').value},
    method: (route.params.id == 'create' ? 'POST' : 'PUT'),
    body: {...formState},
  }).then((res) => {
    console.log()
    {
      if (res.data._value.success == true) {
        notification['success']({
          message: 'Post',
          description: 'Success saved'
        })
        if (route.params.id == 'create') {
          router.push('/admin/posts/' + res.data._value.data.id)
        } else {
          loadData();
        }

      }
    }

  });
};
onMounted(() => {
  loadData();
});

</script>
