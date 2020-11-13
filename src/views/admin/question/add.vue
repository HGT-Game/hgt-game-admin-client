<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="绘画作品标题">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="form.description" />
      </el-form-item>
      <el-form-item label="作品介绍内容">
        <el-input type="textarea" v-model="form.content"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { EventBus } from '@/utils/event-bus'
import { add } from '@/api/question/question'

export default {
  data() {
    return {
      form: {
        title: '',
        description: '',
        content: ''
      },
    }
  },
  mounted() {
    EventBus.$emit('setTinymceEditorImageParams', ({ category: this.contentCategory, scene: this.contentScene }))
  },
  methods: {
    onSubmit() {
      // 取最后一张图，多图可以换写法
      add(this.form).then(response => {
        if (response.data === true) {
          this.$message({ message: '添加成功', type: 'success' })
        }
        this.$router.push({ path: '/admin/question/question-list' })
      })
    },
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

