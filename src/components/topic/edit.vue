<template>
    <div class="edit-wrapper">
        <el-dialog
                :visible.sync="dialog.visible"
                :title="title"
                :close-on-click-modal="false"
                width="600px"
        >
            <el-form
                    ref="editForm"
                    :model="editForm"
                    :rules="rules"
                    label-width="80px"
                    label-position="right"
                    size="medium"
            >

                <el-form-item label="" prop="id">
                <el-input
                        v-model="editForm.id"
                        placeholder="请输入"
                        clearable
                />
                </el-form-item>

                <el-form-item label="" prop="uuid">
                <el-input
                        v-model="editForm.uuid"
                        placeholder="请输入"
                        clearable
                />
                </el-form-item>

                <el-form-item label="题目" prop="topic">
                <el-input
                        v-model="editForm.topic"
                        placeholder="请输入题目"
                        clearable
                />
                </el-form-item>

                <el-form-item label="题目类型" prop="topicType">
                <el-select v-model="editForm.topicType" placeholder="请输入题目类型" filterable clearable>
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
                        v-model="editForm.answer"
                        placeholder="请输入答案"
                        type="textarea"
                        :autosize="{ minRows: 2 }"
                        clearable
                        maxlength="2000"
                        show-word-limit
                />
                </el-form-item>

                <el-form-item label="考点" prop="testSite">
                <el-input
                        v-model="editForm.testSite"
                        placeholder="请输入考点"
                        clearable
                />
                </el-form-item>

                <el-form-item label="参考资料" prop="reference">
                <el-input
                        v-model="editForm.reference"
                        placeholder="请输入参考资料"
                        type="textarea"
                        :autosize="{ minRows: 2 }"
                        clearable
                        maxlength="2000"
                        show-word-limit
                />
                </el-form-item>

                <el-form-item label="重要程度" prop="importance">
                <el-input
                        v-model="editForm.importance"
                        placeholder="请输入重要程度"
                        clearable
                />
                </el-form-item>

                <el-form-item label="编写人员" prop="writer">
                <el-input
                        v-model="editForm.writer"
                        placeholder="请输入编写人员"
                        clearable
                />
                </el-form-item>

                <el-form-item label="校对人员" prop="checker">
                <el-input
                        v-model="editForm.checker"
                        placeholder="请输入校对人员"
                        clearable
                />
                </el-form-item>

                <el-form-item label="逻辑删除(0代表存在 1代表删除)" prop="isDeleted">
                <el-input
                        v-model="editForm.isDeleted"
                        placeholder="请输入逻辑删除(0代表存在 1代表删除)"
                        clearable
                />
                </el-form-item>

                <el-form-item label="" prop="createUserId">
                <el-input
                        v-model="editForm.createUserId"
                        placeholder="请输入"
                        clearable
                />
                </el-form-item>

                <el-form-item label="" prop="createUserName">
                <el-input
                        v-model="editForm.createUserName"
                        placeholder="请输入"
                        clearable
                />
                </el-form-item>

                <el-form-item label="" prop="createTime">
                <el-date-picker
                        v-model="editForm.createTime"
                        type="date"
                        placeholder="请选择"
                        style="width: 100%">
                </el-date-picker>
                </el-form-item>

                <el-form-item label="" prop="updateUserId">
                <el-input
                        v-model="editForm.updateUserId"
                        placeholder="请输入"
                        clearable
                />
                </el-form-item>

                <el-form-item label="" prop="updateUserName">
                <el-input
                        v-model="editForm.updateUserName"
                        placeholder="请输入"
                        clearable
                />
                </el-form-item>

                <el-form-item label="" prop="updateTime">
                <el-date-picker
                        v-model="editForm.updateTime"
                        type="date"
                        placeholder="请选择"
                        style="width: 100%">
                </el-date-picker>
                </el-form-item>

            </el-form>
            <!--底部操作区-->
            <div class="edit-footer">
                <el-button
                        class="dialog-btn dialog-btn-commit"
                        type="primary"
                        size="medium"
                        @click="handleSubmit"
                >
                    保存
                </el-button>
                <el-button class="dialog-btn" size="medium" @click="handleCancel">
                    取消
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {
        createAaTopic,
        getAaTopic,
        getSelectList
    } from '@/api/aa/aaTopic';

    export default {
        components: { },
        props: {
            // 弹出框设定
            dialog: {
                type: Object,
                required: true,
                default() {
                    return {
                        // 是否显示编辑对话框
                        visible: false,
                        // 要编辑的数据id
                        dataId: 0,
                        // 要编辑的数据uuid
                        dataUuid: ''
                    }
                }
            },

        },
        data() {
            return {
                // 编辑页面表单数据
                editForm: {
                    // 
                    id: '',
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
                    createTime: '',
                    // 
                    updateUserId: '',
                    // 
                    updateUserName: '',
                    // 
                    updateTime: '',
                },
                // 校验规则
                rules: {
                    topic: [
                        { required: true, message: '题目不能为空', trigger: 'blur' }
                    ],
                    topicType: [
                        { required: true, message: '题目类型不能为空', trigger: 'blur' }
                    ],
                    answer: [
                        { required: true, message: '答案不能为空', trigger: 'blur' }
                    ],
                    isDeleted: [
                        { required: true, message: '逻辑删除(0代表存在 1代表删除)不能为空', trigger: 'blur' }
                    ],
                },
                /* =======下拉框数据========== */
                selectList: {
                    // 
                    topicTypeList: [],
                }
            }
        },
        computed: {
            // 编辑页面顶部标题
            title() {
                return (this.dialog.dataId > 0 ? '修改' : '新增') + '【请填写功能名称】'
            }
        },
        watch: {
            // 编辑组件关闭或显示时触发
            'dialog.visible': function (val) {
                // 关闭时
                if (val === false) {
                    return
                }

                // 重置表单校验信息
                this.resetForm('editForm')
                // 表单置空，避免上次修改数据Id影响本次新增或修改数据
                this.editForm = {}

                if (this.dialog.dataId > 0) {
                    // 加载编辑数据
                    getAaTopic({
                        id: this.dialog.dataId,
                        uuid: this.dialog.dataUuid
                    }).then((res) => {
                        this.editForm = res.data
                    })
                }
            }
        },
        created() {
            // 加载下拉框类型列表
            this.loadSelectData();
        },
        methods: {
            loadSelectData() {
                getSelectList().then((res) => {
                        this.selectList.topicTypeList = res.data.topicTypeList
                })
            },
            // 取消按钮
            handleCancel() {
                this.dialog.visible = false
            },

            // 保存按钮
            handleSubmit() {
                this.$refs['editForm'].validate((valid) => {
                    if (valid) {
                        this.saveData()
                    }
                })
            },

            // 执行新增或修改
            async saveData() {
                if (this.editForm.id) {
                    // 修改
                    createAaTopic(this.editForm).then((res) => {
                        this.savedSuccess('修改成功')
                    })
                } else {
                    // 新增
                    createAaTopic(this.editForm).then((res) => {
                        this.savedSuccess('新增成功')
                    })
                }
            },

            // 新增或修改成功后执行
            savedSuccess(msg) {
                this.msgSuccess(msg)

                this.handleCancel()
                // 重新加载表格数据
                this.$emit('reloadTable')
            },
        }
    }
</script>

<style scoped></style>
