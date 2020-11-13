<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="标题">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="form.description" />
      </el-form-item>
      <el-form-item label="内容">
        <el-input type="textarea" v-model="form.content"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { get, edit } from "@/api/question/question";

export default {
  props: {
    selectQuestionId: {
      type: String,
      default: "",
    },
    refreshflag: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: {
        questionId: "",
        title: "",
        description: "",
        content: "",
        sort: 0,
        recommend: 0,
        status: 0,
      },
      dialogVisible: false,
    };
  },
  mounted() {
    this.form.questionId = this.selectQuestionId;
    this.getInfo();
  },
  methods: {
    getInfo() {
      get({ questionId: this.form.questionId }).then((response) => {
        this.form = response.data;
        console.log(response.data);
        console.log(this.form);
      });
    },
    onSubmit() {
      edit(this.form).then((response) => {
        if (response.data === true) {
          this.$message({ message: "修改成功", type: "success" });
          this.$emit("refreshThisPage", true);
        }
      });
    },
  },
};
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

