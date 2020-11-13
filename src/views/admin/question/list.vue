<template>
  <div class="app-container">
    <el-form ref="form" label-width="70px">
      <el-form-item>
        <el-button style="float: right" round @click="fetchData"
          ><i class="el-icon-refresh">刷新</i></el-button
        >
      </el-form-item>
    </el-form>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="40" />
      <el-table-column align="center" label="ID">
        <template slot-scope="scope">
          {{ scope.row.questionId }}
        </template>
      </el-table-column>
      <el-table-column label="标题">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="汤面">
        <template slot-scope="scope">
          <span>{{ scope.row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="热度"
        prop="years"
        width="100"
        align="center"
        sortable="custom"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.hot }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="是否推荐"
        align="center"
        prop="starCount"
        sortable="custom"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.recommend }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="下架/上架" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-value="1"
            inactive-value="0"
            @change="setStatus($event, scope.row.questionId, scope.$index)"
          />
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="createTime"
        label="最新更新时间"
        sortable="custom"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.updatedAt }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="edit(scope.row.questionId)"
            >修改</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button :disabled="selectedRows.length === 0" @click="deleteThis()"
        >批量删除</el-button
      >
    </div>
    <pagination
      :total="page.total"
      :page.sync="page.current"
      :limit.sync="page.limit"
      @pagination="fetchData"
    />
    <el-dialog title="编辑" :visible.sync="editDialogFormVisible" width="70%">
      <edit-form-components
        v-if="editDialogFormVisible"
        ref="editFormComponents"
        :select-question-id="selectQuestionId"
        @refreshThisPage="refreshThisPageFunction"
      />
    </el-dialog>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import { list, batchStatus } from "@/api/question/question";
import edit from "./edit.vue";

export default {
  components: { Pagination, "edit-form-components": edit },
  data() {
    return {
      list: null,
      listLoading: true,
      page: {
        total: 1,
        current: 1,
        limit: 20,
      },
      editDialogFormVisible: false,
      selectedRows: [],
      selectQuestionId: "",
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      list({ page: this.page.current, limit: this.page.limit }).then(
        (response) => {
          this.page.total = Number(response.data.totalCount);
          this.page.current = Number(response.data.current);
          this.page.limit = Number(response.data.perPage);
          this.list = response.data.item;
          this.listLoading = false;
        }
      );
    },
    // 跳转修改页面
    edit(id) {
      this.editDialogFormVisible = true;
      this.selectQuestionId = id;
    },
    // 是否刷新当前页面
    refreshThisPageFunction(refreshFlag) {
      if (refreshFlag === true) {
        this.fetchData();
      }
    },
    // 设置状态
    setStatus(event, id, index) {
      var formData = new FormData();
      formData.append("questionId", id);
      formData.append("status", event);
      batchStatus(formData).then((response) => {
        // 设置失败
        if (response.data !== true) {
          this.list[index].status = event === 1 ? 0 : 1;
        } else {
          this.$notify({ message: "修改成功", type: "success" });
        }
      });
    },
    // 多选
    handleSelectionChange(row) {
      this.selectedRows = row;
    },
    // 批量删除
    deleteThis() {
      var formData = new FormData();
      this.selectedRows.forEach((row) => {
        formData.append("questionId", row.questionId);
      });
      formData.append("status", 2);
      batchStatus(formData).then((response) => {
        if (response.data === true) {
          this.$notify({ message: "删除成功", type: "success" });
          this.fetchData();
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
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
