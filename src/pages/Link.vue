<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 95%"
      :row-class-name="tableRowClassName"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="id" label="编号" width="180"> </el-table-column>
      <el-table-column prop="name" label="链接名称" width="180">
      </el-table-column>
      <el-table-column prop="url" label="链接地址"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="修改链接" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="链接编号" :label-width="formLabelWidth">
          <el-input
            v-model="form.id"
            autocomplete="off"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="链接名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="链接地址" :label-width="formLabelWidth">
          <el-input v-model="form.url" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitLink">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style>
.el-table {
  margin: 2%;
}

.cell {
  text-align: center;
}
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>

<script>
import { getAllLink, deleteLink, getLinkInfo,updateLink } from "@/api/link";

export default {
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    handleDelete(index, row) {
      deleteLink({ id: row.id }).then(response => {
        this.$message({
            message : "删除成功",
            type : "success"
          });
        this.getAllData();
      });
    },
    getAllData() {
      getAllLink().then(response => {
        this.tableData = response.data;
      });
    },
    handleEdit(index, row) {
      getLinkInfo({ id: row.id }).then(response => {
        if (response.status == 200) {
          this.form.id = response.data.id;
          this.form.name = response.data.name;
          this.form.url = response.data.url;
          this.dialogFormVisible = true;
        }
      });
    },
    submitLink() {
      updateLink(this.form).then(response => {
        this.dialogFormVisible = false
        if(response.status == 200) {
          this.$message({
            message : "修改成功",
            type : "success"
          });
        } else {
          this.$message({
            message : "修改失败",
            type : "error"
          })
        }
      });
    }
  },
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      form: {
        id: "",
        name: "",
        url: ""
      },
      formLabelWidth: "120px"
    };
  },
  created() {
    this.getAllData();
  }
};
</script>
