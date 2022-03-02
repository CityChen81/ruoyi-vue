<template>
    <div>
        <div class="list-wrapper">
            <div class="list-filter">

    <el-form
                        ref="searchForm"
                        :model="searchParam"
                        :inline="true"
                        size="medium"
                >
                    <el-form-item label="" prop="uuid">
                        <el-input
                                v-model="searchParam.uuid"
                                placeholder="请输入"
                                clearable
                        />
                    </el-form-item>
                    <el-form-item label="题目" prop="topic">
                        <el-input
                                v-model="searchParam.topic"
                                placeholder="请输入题目"
                                clearable
                        />
                    </el-form-item>
                    <el-form-item label="题目类型" prop="topicType">
                        <el-select v-model="searchParam.topicType" filterable clearable>
                            <el-option
                                    v-for="item in selectList.topicTypeList"
                                    :key="item"
                                    :label="item"
                                    :value="item"
                            />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="答案" prop="answer">
                        <el-input
                                v-model="searchParam.answer"
                                placeholder="请输入答案"
                                clearable
                        />
                    </el-form-item>
                    <el-form-item label="考点" prop="testSite">
                        <el-input
                                v-model="searchParam.testSite"
                                placeholder="请输入考点"
                                clearable
                        />
                    </el-form-item>
                    <el-form-item label="参考资料" prop="reference">
                        <el-input
                                v-model="searchParam.reference"
                                placeholder="请输入参考资料"
                                clearable
                        />
                    </el-form-item>
                    <el-form-item label="重要程度" prop="importance">
                        <el-input
                                v-model="searchParam.importance"
                                placeholder="请输入重要程度"
                                clearable
                        />
                    </el-form-item>
                    <el-form-item label="编写人员" prop="writer">
                        <el-input
                                v-model="searchParam.writer"
                                placeholder="请输入编写人员"
                                clearable
                        />
                    </el-form-item>
                    <el-form-item label="校对人员" prop="checker">
                        <el-input
                                v-model="searchParam.checker"
                                placeholder="请输入校对人员"
                                clearable
                        />
                    </el-form-item>
                    <el-form-item label="逻辑删除(0代表存在 1代表删除)" prop="isDeleted">
                        <el-input
                                v-model="searchParam.isDeleted"
                                placeholder="请输入逻辑删除(0代表存在 1代表删除)"
                                clearable
                        />
                    </el-form-item>
                    <el-form-item label="" prop="createUserId">
                        <el-input
                                v-model="searchParam.createUserId"
                                placeholder="请输入"
                                clearable
                        />
                    </el-form-item>
                    <el-form-item label="" prop="createUserName">
                        <el-input
                                v-model="searchParam.createUserName"
                                placeholder="请输入"
                                clearable
                        />
                    </el-form-item>
                    <el-form-item label="" prop="updateUserId">
                        <el-input
                                v-model="searchParam.updateUserId"
                                placeholder="请输入"
                                clearable
                        />
                    </el-form-item>
                    <el-form-item label="" prop="updateUserName">
                        <el-input
                                v-model="searchParam.updateUserName"
                                placeholder="请输入"
                                clearable
                        />
                    </el-form-item>
    </el-form>
            </div>

            <!--    按钮列表 -->
            <div class="list-buttons">
                <el-button
                        type="primary"
                        icon="el-icon-search"
                        size="small"
                        class="list-btn-search"
                        @click="handleSearch"
                >
                    搜索
                </el-button>
                <el-button
                        icon="el-icon-refresh-right"
                        size="small"
                        class="list-btn-reset"
                        @click="handleReset"
                >
                    重置
                </el-button>
                <el-button
                        icon="el-icon-plus"
                        size="small"
                        class="list-btn-add"
                        @click="handleCreate"
                >
                    新增
                </el-button>
                <el-button
                        icon="el-icon-delete"
                        size="small"
                        class="list-btn-delete"
                        @click="handleDelete"
                >
                    删除
                </el-button>
            </div>

            <!-- 表格 -->
            <div class="list-table">
                <el-table
                        border
                        stripe
                        :data="tableDataList"
                        row-key="id"
                        @selection-change="handleSelectionChange"
                >
                    <el-table-column type="selection" width="40" align="center" />
                    <el-table-column
                            prop="uuid"
                            label=""
                            :show-overflow-tooltip="true"
                    />
                    <el-table-column
                            prop="topic"
                            label="题目"
                            :show-overflow-tooltip="true"
                    />
                    <el-table-column
                            prop="topicType"
                            label="题目类型"
                            :show-overflow-tooltip="true"
                    />
                    <el-table-column
                            prop="answer"
                            label="答案"
                            :show-overflow-tooltip="true"
                    />
                    <el-table-column
                            prop="testSite"
                            label="考点"
                            :show-overflow-tooltip="true"
                    />
                    <el-table-column
                            prop="reference"
                            label="参考资料"
                            :show-overflow-tooltip="true"
                    />
                    <el-table-column
                            prop="importance"
                            label="重要程度"
                            :show-overflow-tooltip="true"
                    />
                    <el-table-column
                            prop="writer"
                            label="编写人员"
                            :show-overflow-tooltip="true"
                    />
                    <el-table-column
                            prop="checker"
                            label="校对人员"
                            :show-overflow-tooltip="true"
                    />
                    <el-table-column
                            prop="isDeleted"
                            label="逻辑删除(0代表存在 1代表删除)"
                            :show-overflow-tooltip="true"
                    />
                    <el-table-column
                            prop="createUserId"
                            label=""
                            :show-overflow-tooltip="true"
                    />
                    <el-table-column
                            prop="createUserName"
                            label=""
                            :show-overflow-tooltip="true"
                    />
                    <el-table-column
                            prop="updateUserId"
                            label=""
                            :show-overflow-tooltip="true"
                    />
                    <el-table-column
                            prop="updateUserName"
                            label=""
                            :show-overflow-tooltip="true"
                    />
                    <el-table-column
                            label="操作"
                            class-name="list-table-popover-cells"
                            width="60"
                            align="center"
                    >
                        <template v-slot="scope">
                            <el-popover
                                    placement="left"
                                    popper-class="list-table-popover-buttons"
                                    trigger="hover"
                            >
                                <ul>
                                    <li class="popover-btn-edit" @click="handleEdit(scope.row)">
                                        <i class="el-icon-edit" />
                                        <span>修改</span>
                                    </li>
                                    <li
                                            class="popover-btn-delete"
                                            @click="handleDelete(scope.row)"
                                    >
                                        <i class="el-icon-delete" />
                                        <span>删除</span>
                                    </li>
                                </ul>
                                <div slot="reference" class="list-table-popover-trigger">
                                    <i class="el-icon-setting" />
                                </div>
                            </el-popover>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <!--底部-->
            <div class="list-footer">
                <!--分页-->
                <pagination
                        :total="total"
                        :page.sync="searchParam.page"
                        :limit.sync="searchParam.size"
                        @pagination="loadTable"
                />
            </div>
        </div>
        <!--编辑组件-->
        <Edit
                :dialog="dialogEdit"
                :dict-type-options="getSelectList"
                @reloadTable="handleSearch"
        />
    </div>
</template>

<script>
    import Edit from './edit.vue.vm'


    import { deleteConfirm } from '@/utils/confirm'
    import {
        searchAaTopic,
        deleteAaTopic,
        getSelectList
    } from '@/api/aa/aaTopic'

    export default {
        components: { Edit },
        data() {
            return {
                /* =======查询条件相关数据========== */

                // 查询参数
                searchParam: {
                    // 当前页
                    page: 1,
                    // 每页条数
                    size: 10,
                    // 
                    uuid: '',
                    // 题目
                    topic: '',
                    // 题目类型
                    topicType: '',
                    // 答案
                    answer: '',
                    // 考点
                    testSite: '',
                    // 参考资料
                    reference: '',
                    // 重要程度
                    importance: '',
                    // 编写人员
                    writer: '',
                    // 校对人员
                    checker: '',
                    // 逻辑删除(0代表存在 1代表删除)
                    isDeleted: '',
                    // 
                    createUserId: '',
                    // 
                    createUserName: '',
                    // 
                    updateUserId: '',
                    // 
                    updateUserName: '',
                },

                /* =======表格相关数据========== */
                // 表格数据
                tableDataList: [],
                // 分页查询结果总条数
                total: 0,
                // 当前勾选的行Id数组
                selectRowIds: [],

                /* =======编辑组件相关========== */
                dialogEdit: {
                    // 是否显示编辑对话框
                    visible: false,
                    // 新增还是编辑
                    isEdit: false,
                    // 要编辑的数据id
                    dataId: 0,
                    // 要编辑的数据uuid
                    dataUuid: ''
                },
                /* =======下拉框数据========== */
                selectList: {
                   // 
                   topicTypeList: [],
                }
            }
        },
        created() {
            // 加载元数据类型列表
            this.loadSelectData()
            // 加载表格数据
            this.loadTable()
        },
        methods: {
            /* =======初始化加载数据========== */
            // 加载元数据类型列表
            loadSelectData() {
                getSelectList().then((res) => {
                    this.selectList.topicTypeList = res.data.topicTypeList
                })
            },
            /* =======按钮区域相关操作========== */
            // 点击搜索按钮
            handleSearch() {
                this.searchParam.page = 1
                this.loadTable()
            },

            // 点击重置搜索条件按钮
            handleReset() {
                this.resetForm('searchForm')
            },

            // 点击新增按钮
            handleCreate() {
                this.dialogEdit.visible = true
                this.dialogEdit.dataId = 0
            },

            // 点击修改
            handleEdit(row) {
                this.dialogEdit.visible = true
                this.dialogEdit.dataId = row.id
                this.dialogEdit.dataUuid = row.uuid
            },

            /* =======表格相关操作========== */

            // 加载表格数据
            loadTable() {
                searchAaTopic(this.searchParam).then((res) => {
                    this.tableDataList = res.data.records
                    this.total = res.data.total
                })
            },

            // 点击勾选某行
            handleSelectionChange(selectRows) {
                this.selectRowIds = selectRows.map((row) => {
                    return { id: row.id, uuid: row.uuid }
                })
            },

            // 点击删除某行数据
            handleDelete(row) {
                const deleteIds = row.id
                        ? [{ id: row.id, uuid: row.uuid }]
                        : this.selectRowIds

                if (deleteIds.length === 0) {
                    this.$message.warning('请选择需要删除的数据')
                            return
                }

                deleteConfirm()
                        .then(async () => {
                            return deleteAaTopic({
                                toDeleteList: deleteIds
                            })
                        })
                        .then(() => {
                            this.msgSuccess('删除成功')
                            this.loadTable()
                        })
            }
        }
    }
</script>

<style scoped></style>
