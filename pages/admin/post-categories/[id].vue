<template>
  <div>
    <a-form ref="formRef" :model="formState" layout="vertical" :rules="rules">
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="Название" name="name">
            <a-input v-model:value="formState.name"/>
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
  layout: 'admin'
});
import {PlusOutlined} from '@ant-design/icons-vue';
import type {UploadProps} from 'ant-design-vue';
import type {UnwrapRef} from 'vue';
import type {Rule} from 'ant-design-vue/es/form';

interface FormState {
  id: string,
  name: string;
}

const formState: UnwrapRef<FormState> = reactive({
  id: '',
  name: '',
});
const rules: Record<string, Rule[]> = {
  name: [
    {required: true, message: 'Please input Post name', trigger: 'change'},
    {min: 3, message: 'Length should be min 3 ', trigger: 'blur'},
  ],
}


const loadData = async () => {
  if (route.params.id != 'create') {
    await useMyFetch('/cabinet/post-category/' + route.params.id, {
      method: 'get',
      headers: {
        Authorization: 'Bearer ' + useStorage('token', '').value,
      },
    }).then((res) => {
      formState.id = res.data._value.data.id;
      formState.name = res.data._value.data.name;
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
  await useMyFetch('/cabinet/post-category' + (route.params.id == 'create' ? '' : '/' + formState.id), {
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
          router.push('/admin/post-categories/' + res.data._value.data.id)
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
