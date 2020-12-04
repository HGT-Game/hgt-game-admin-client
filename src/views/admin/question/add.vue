<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="标题">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="form.category" placeholder="类型">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="来源">
        <el-input v-model="form.source" placeholder="例如：网络/作者名称/原创" />
      </el-form-item>
      <el-form-item label="汤面">
        <el-input v-model="form.description" />
      </el-form-item>
      <el-form-item label="汤底">
        <el-input
          id="soup-content"
          type="textarea"
          v-model="form.content"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { EventBus } from "@/utils/event-bus";
import { add } from "@/api/question/question";

export default {
  data() {
    return {
      form: {
        title: "",
        description: "",
        content: "",
        source: "",
        category: 1,
      },
      options: [
        {
          value: 1,
          label: "恐怖氛围",
        },
        {
          value: 2,
          label: "诡秘脑洞",
        },
        {
          value: 3,
          label: "断案推理",
        },
        {
          value: 4,
          label: "剧情故事",
        },
        {
          value: 5,
          label: "趣味猜谜",
        },
        {
          value: 6,
          label: "仙境迷踪",
        },
        {
          value: 7,
          label: "新闻实事",
        },
      ],
    };
  },
  mounted() {
    EventBus.$emit("setTinymceEditorImageParams", {
      category: this.contentCategory,
      scene: this.contentScene,
    });
  },
  methods: {
    onSubmit() {
      // 取最后一张图，多图可以换写法
      add(this.form).then((response) => {
        if (response.data === true) {
          this.$message({ message: "添加成功", type: "success" });
        }
        this.$router.push({ path: "/admin/question/question-list" });
      });
    },
  },
};
</script>

<style>
.line {
  text-align: center;
}
#soup-content {
  height: 300px;
}
</style>

