<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="题目名称" prop="topicName">
        <el-input
          v-model="queryParams.topicName"
          placeholder="请输入题目名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="题目类型" prop="topicType">
        <el-select v-model="queryParams.topicType" placeholder="请选择题目类型" clearable size="small">
          <el-option
            v-for="dict in topicTypeOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="重要程度" prop="importance">
        <el-input
          v-model="queryParams.importance"
          placeholder="请输入重要程度"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="编写人" prop="authorName">
        <el-input
          v-model="queryParams.authorName"
          placeholder="请输入编写人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="审核人" prop="checkerName">
        <el-input
          v-model="queryParams.checkerName"
          placeholder="请输入审核人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="负责人" prop="chargeName">
        <el-input
          v-model="queryParams.chargeName"
          placeholder="请输入负责人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="线路" prop="line">
        <el-input
          v-model="queryParams.line"
          placeholder="请输入线路"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['brush:topic:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['brush:topic:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['brush:topic:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="info"
          plain
          icon="el-icon-upload2"
          size="mini"
          @click="handleImport"
          v-hasPermi="['brush:topic:import']"
        >导入</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['brush:topic:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="topicList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="线路" align="center" prop="id" />
      <el-table-column label="题目名称" align="center" prop="topicName" />
      <el-table-column label="题目类型" align="center" prop="topicType" :formatter="topicTypeFormat" />
      <el-table-column label="答案" align="center" prop="topicAnswer" />
      <el-table-column label="考点" align="center" prop="examPoint" />
      <el-table-column label="重要程度" align="center" prop="importance" />
      <el-table-column label="编写人" align="center" prop="authorName" />
      <el-table-column label="审核人" align="center" prop="checkerName" />
      <el-table-column label="负责人" align="center" prop="chargeName" />
      <el-table-column label="线路" align="center" prop="line" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['brush:topic:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['brush:topic:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改easy_brush对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="题目名称" prop="topicName">
          <el-input v-model="form.topicName" placeholder="请输入题目名称" />
        </el-form-item>
        <el-form-item label="题目类型" prop="topicType">
          <el-select v-model="form.topicType" placeholder="请选择题目类型">
            <el-option
              v-for="dict in topicTypeOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="parseInt(dict.dictValue)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="答案" prop="topicAnswer">
          <el-input v-model="form.topicAnswer" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="考点" prop="examPoint">
          <el-input v-model="form.examPoint" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="参考资料" prop="reference">
          <el-input v-model="form.reference" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="重要程度" prop="importance">
          <el-input v-model="form.importance" placeholder="请输入重要程度" />
        </el-form-item>
        <el-form-item label="编写人" prop="authorName">
          <el-input v-model="form.authorName" placeholder="请输入编写人" />
        </el-form-item>
        <el-form-item label="审核人" prop="checkerName">
          <el-input v-model="form.checkerName" placeholder="请输入审核人" />
        </el-form-item>
        <el-form-item label="负责人" prop="chargeName">
          <el-input v-model="form.chargeName" placeholder="请输入负责人" />
        </el-form-item>
        <el-form-item label="线路" prop="line">
          <el-input v-model="form.line" placeholder="请输入线路" />
        </el-form-item>
        <el-form-item label="选项A" prop="optionA">
          <el-input v-model="form.optionA" placeholder="请输入选项A" />
        </el-form-item>
        <el-form-item label="选项B" prop="optionB">
          <el-input v-model="form.optionB" placeholder="请输入选项B" />
        </el-form-item>
        <el-form-item label="选项C" prop="optionC">
          <el-input v-model="form.optionC" placeholder="请输入选项C" />
        </el-form-item>
        <el-form-item label="选项D" prop="optionD">
          <el-input v-model="form.optionD" placeholder="请输入选项D" />
        </el-form-item>
        <el-form-item label="选项E" prop="optionE">
          <el-input v-model="form.optionE" placeholder="请输入选项E" />
        </el-form-item>
        <el-form-item label="选项F" prop="optionF">
          <el-input v-model="form.optionF" placeholder="请输入选项F" />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 题目导入对话框 -->
    <el-dialog :title="upload.title" :visible.sync="upload.open" width="400px" append-to-body>
      <el-upload
        ref="upload"
        :limit="1"
        accept=".xlsx, .xls"
        :headers="upload.headers"
        :action="upload.url + '?updateSupport=' + upload.updateSupport"
        :disabled="upload.isUploading"
        :on-progress="handleFileUploadProgress"
        :on-success="handleFileSuccess"
        :auto-upload="false"
        drag
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">
          <el-checkbox v-model="upload.updateSupport" />是否更新已经存在的用户数据
          <el-link type="info" style="font-size:12px" @click="importTemplate">下载模板</el-link>
        </div>
        <div class="el-upload__tip" style="color:red" slot="tip">提示：仅允许导入“xls”或“xlsx”格式文件！</div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFileForm">确 定</el-button>
        <el-button @click="upload.open = false">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { listTopic, getTopic, delTopic, addTopic, updateTopic, exportTopic, importTemplate  } from "@/api/brush/topic";
import { getToken } from "@/utils/auth";

export default {
  name: "Topic",
  components: {
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // easy_brush表格数据
      topicList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 题目类型字典
      topicTypeOptions: [],
      // 用户导入参数
      upload: {
        // 是否显示弹出层（用户导入）
        open: false,
        // 弹出层标题（用户导入）
        title: "",
        // 是否禁用上传
        isUploading: false,
        // 是否更新已经存在的用户数据
        updateSupport: 0,
        // 设置上传的请求头部
        headers: { Authorization: "Bearer " + getToken() },
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + "/brush/topic/importData"
      },
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        topicName: null,
        topicType: null,
        topicAnswer: null,
        examPoint: null,
        reference: null,
        importance: null,
        authorName: null,
        checkerName: null,
        chargeName: null,
        line: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        topicName: [
          { required: true, message: "题目名称不能为空", trigger: "blur" }
        ],
        topicType: [
          { required: true, message: "题目类型不能为空", trigger: "change" }
        ],
        topicAnswer: [
          { required: true, message: "答案不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
    this.getDicts("topic_type").then(response => {
      this.topicTypeOptions = response.data;
    });
  },
  methods: {
    /** 查询easy_brush列表 */
    getList() {
      this.loading = true;
      listTopic(this.queryParams).then(response => {
        this.topicList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 题目类型字典翻译
    topicTypeFormat(row, column) {
      return this.selectDictLabel(this.topicTypeOptions, row.topicType);
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        topicName: null,
        topicType: null,
        topicAnswer: null,
        examPoint: null,
        reference: null,
        importance: null,
        authorName: null,
        checkerName: null,
        chargeName: null,
        line: null,
        optionA: null,
        optionB: null,
        optionC: null,
        optionD: null,
        optionE: null,
        optionF: null,
        createBy: null,
        createTime: null,
        modifiedBy: null,
        modifiedTime: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加easy_brush";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getTopic(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改easy_brush";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateTopic(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addTopic(this.form).then(response => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除easy_brush编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delTopic(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
    /** 导入按钮操作 */
    handleImport() {
      this.upload.title = "题目导入";
      this.upload.open = true;
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有easy_brush数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportTopic(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    },
    /** 下载模板操作 */
    importTemplate() {
      importTemplate().then(response => {
        this.download(response.msg);
      });
    },
    // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true;
    },
    // 文件上传成功处理
    handleFileSuccess(response, file, fileList) {
      this.upload.open = false;
      this.upload.isUploading = false;
      this.$refs.upload.clearFiles();
      this.$alert(response.msg, "导入结果", { dangerouslyUseHTMLString: true });
      this.getList();
    },
    // 提交上传文件
    submitFileForm() {
      this.$refs.upload.submit();
    }
  }
};
</script>
