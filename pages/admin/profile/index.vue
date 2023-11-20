<template>
  <div>
    <a-form ref="profileForm" :model="formState" label-position="top" :rules="rules">
      <a-form-item label="Name" prop="name">
        <a-input v-model:value="formState.name"/>
      </a-form-item>
      <a-form-item label="Email" prop="email">
        <a-input type="email" v-model:value="formState.email"/>
      </a-form-item>
      <a-button type="primary" @click="updateUser" :loading="isLoading">Сохранить</a-button>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import {useStorage} from "@vueuse/core";
import {notification} from "ant-design-vue";

definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})

interface FormState {
  email: string;
  phone: string;
  name: string;
}

const formState = reactive<FormState>({
  phone: '',
  email: '',
  name: '',
});
const isLoading = false;
const {data, pending, error, refresh} = await useMyFetch('/auth/me', {
  method: 'get',
  headers: {
    Authorization: 'Bearer ' + useStorage('token', '').value,
  },
  onRequestError({request, options, error}) {
  },
  onResponse({request, response, options}) {
    formState.email = response._data.data.user.email
    formState.name = response._data.data.user.name
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
const updateUser = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
const rules = {
  phone: [
    {
      required: true,
      message: 'Пожалуйста, введите ваш телефон',
      trigger: 'blur'
    },
    {
      type: 'phone',
      message: 'Пожалуйста, введите правильный номер',
      trigger: ['blur', 'change']
    }
  ]
};
</script>
