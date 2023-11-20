<template>
  <div>
    <div class="row" style="margin:120px 0px;">
      <div class="col-md-4"/>
      <div class="col-md-4">
        <a-card>
          <div class="text-center">
            <h1 class="h4 text-gray-900 mb-4">
              Login
            </h1>
          </div>
          <div class="box">
            <a-form :layout="'vertical'" ref="registerForm" :model="formState" :rules="rules" class="user">
              <a-form-item label="Email" name="email">
                <a-input type="email" v-model:value="formState.email"/>
              </a-form-item>
              <a-form-item label="Password" name="password">
                <a-input type="password" v-model:value="formState.password"/>
              </a-form-item>
              <div class="d-flex justify-content-center">
                <a-button type="primary" @click="login">
                  Login
                </a-button>
              </div>
            </a-form>
          </div>
          <hr>
        </a-card>


      </div>
      <div class="col-md-4"/>
    </div>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  middleware: 'redirect-if-authenticated'
})
import {useMyFetch} from "~/composables/useMyFetch";
import {ref} from "vue";
import {useRoute, useRouter, onBeforeRouteLeave} from "vue-router";
import {notification} from 'ant-design-vue';
import {useStorage} from "@vueuse/core/index";
const router = useRouter();
import {authStore} from '@/stores/auth'
import type {UnwrapRef} from 'vue';
import type {Rule} from 'ant-design-vue/es/form';
import {reactive} from 'vue';
import {cursor} from "sisteransi";

const userStore = authStore()
const login = async (value: string) => {
  registerForm.value
      .validate()
      .then(() => {
        loginAsync()
      })
      .catch(error => {
        console.log('error', error);
      });
}
const loginAsync = async (value: string) => {
  const {data, pending, error, refresh} = await useMyFetch('/auth/login', {
    method: 'post',
    body: {
      email: formState.email,
      password: formState.password,
    }, onRequestError({request, options, error}) {

    },
    onResponse({request, response, options}) {
      console.log(response._data)

      if (response._data.data.success == true) {
        userStore.setToken(response._data.data.token)
        userStore.setUser(response._data.data)
        notification['success']({
          message: 'Авторизация',
          description: 'Вы успешно авторизовались'
        })

        if (response._data.data.role == 'partner' || response._data.data.role == 'partnermanager') {
          router.push('/cabinet')
        } else if (response._data.data.role == 'admin') {
          router.push('/admin')
        } else if (response._data.data.role == 'user') {
          router.push('/personal-cabinet')
        } else {
          router.push('/');
        }
      } else {
        notification['error']({
          message: 'Ошибка',
          description: response._data.data.message
        })
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
  refresh();
};


const registerForm = ref();
interface FormState {
  email: string;
  password: string;
}
const formState: UnwrapRef<FormState> = reactive({
  email: '',
  password: '',
});
const rules: Record<string, Rule[]> = {
  email: [
    {
      required: true,
      message: 'Please,input your email',
      trigger: 'blur'
    },
    {min: 3, message: 'Length should be min 3', trigger: 'blur'},
    {
      type: 'email',
      message: 'Please input correct email',
      trigger: ['blur', 'change']
    }
  ],
  password: [{required: true, message: 'Please input your password!'}, {
    min: 3,
    message: 'Length should be min 3',
    trigger: 'blur'
  },
  ]
};



</script>
