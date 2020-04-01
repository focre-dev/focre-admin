<template>
    <v-container id="admin" fluid fill-height dark>
        <v-row style="height: 100%">
            <v-col cols="12" lg="2" sm="3">
                <v-card style="height: 100%">
                    <v-sheet class="pa-1 lighten-2" align="center" justify="center">
                        <p class="text-center ma-3">{{ $t('label.common.organization') }}</p>
                    </v-sheet>
                    <v-divider></v-divider>
                    <v-treeview
                        ref="treeView"
                        v-model="tree"
                        :open="treeViewOpen"
                        :items="treeData"
                        activatable
                        item-key="name"
                    >
                        <template v-slot:prepend="{ item, open }">
                            <v-icon v-if="!item.file">
                                {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
                            </v-icon>
                            <v-icon v-else>
                                {{ files[item.file] }}
                            </v-icon>
                        </template>
                        <template slot="label" slot-scope="{ item }">
                            <div @click="searchDept(item)">{{ item.name }}</div>
                        </template>
                    </v-treeview>
                </v-card>
            </v-col>
            <v-col cols="12" lg="10" sm="9">
                <v-card style="height: 100%" class="pa-4">
                    <v-data-table
                        :headers="tableHeaders"
                        :items="adminList"
                        :options.sync="dataTableOptions"
                        :server-items-length="adminListTotal"
                        :loading="loading"
                        class="elevation-1"
                        height="540"
                    >
                        <template v-slot:top>
                            <v-row class="pl-4 pr-4">
                                <v-col cols="12" md="3">
                                    <v-text-field
                                        v-model="queryKeywords"
                                        :label="$t('label.common.accountOrName')"
                                        prepend-icon="mdi-account"
                                        clearable
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" md="3">
                                    <v-menu
                                        v-model="regTimeShow"
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="290px"
                                    >
                                        <template v-slot:activator="{ on }">
                                            <v-text-field
                                                v-model="queryCreateTime"
                                                v-on="on"
                                                :label="$t('label.common.createTime')"
                                                prepend-icon="mdi-calendar-range"
                                                readonly
                                                clearable
                                            ></v-text-field>
                                        </template>
                                        <v-date-picker
                                            v-model="queryCreateTime"
                                            @input="regTimeShow = false"
                                            no-title
                                        ></v-date-picker>
                                    </v-menu>
                                </v-col>
                                <v-col cols="12" md="2">
                                    <v-btn @click="search()" class="ma-2" tile color="info">
                                        <v-icon left>mdi-magnify</v-icon> {{ $t('label.common.search') }}
                                    </v-btn>
                                </v-col>
                            </v-row>
                            <v-row class="pl-2 pr-4" no-gutters>
                                <v-col cols="12" md="2">
                                    <v-btn @click="openAddDialog()" class="ma-2" tile color="info">
                                        <v-icon left>mdi-plus</v-icon> {{ $t('label.common.add') }}
                                    </v-btn>
                                </v-col>
                            </v-row>
                            <v-dialog v-model="dialog" @click:outside="resetValue()" max-width="500px">
                                <v-card>
                                    <v-card-title>
                                        <span class="headline">{{ formTitle }}</span>
                                    </v-card-title>

                                    <v-card-text>
                                        <v-container>
                                            <v-form ref="addOrEditForm" v-model="valid" lazy-validation>
                                                <v-row>
                                                    <v-col cols="12" sm="6" md="6">
                                                        <v-text-field
                                                            ref="username"
                                                            v-model="username"
                                                            :label="$t('label.common.username') + '*'"
                                                            :readonly="isEditDialog"
                                                            :rules="usernameRules"
                                                            :counter="20"
                                                        ></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12" sm="6" md="6">
                                                        <v-text-field
                                                            v-model="name"
                                                            :label="$t('label.common.fullName')"
                                                            :rules="nameRules"
                                                            :counter="20"
                                                        ></v-text-field>
                                                    </v-col>
                                                    <template v-if="isAddDialog">
                                                        <v-col cols="12" sm="6" md="6">
                                                            <v-text-field
                                                                v-model="password"
                                                                :label="$t('label.common.password') + '*'"
                                                                :rules="passwordRules"
                                                                :counter="100"
                                                                :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
                                                                :type="passwordShow ? 'text' : 'password'"
                                                                @click:append="passwordShow = !passwordShow"
                                                            ></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" sm="6" md="6">
                                                            <v-text-field
                                                                v-model="confirmPassword"
                                                                :label="$t('label.common.confirmPassword') + '*'"
                                                                :rules="[
                                                                    confirmPasswordRules,
                                                                    passwordConfirmationRule
                                                                ]"
                                                                :counter="100"
                                                                :append-icon="
                                                                    confirmPasswordShow ? 'mdi-eye' : 'mdi-eye-off'
                                                                "
                                                                :type="confirmPasswordShow ? 'text' : 'password'"
                                                                @click:append="
                                                                    confirmPasswordShow = !confirmPasswordShow
                                                                "
                                                            ></v-text-field>
                                                        </v-col>
                                                    </template>
                                                    <v-col cols="12" sm="6" md="6">
                                                        <v-text-field
                                                            v-model="roleIds"
                                                            :label="$t('label.common.role') + '*'"
                                                        ></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12" sm="6" md="6">
                                                        <v-text-field
                                                            v-model="dept"
                                                            :label="$t('label.common.department') + '*'"
                                                            :rules="deptRules"
                                                            @click="openDeptDialog()"
                                                        ></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12" sm="6" md="6">
                                                        <v-text-field
                                                            v-model="email"
                                                            :label="$t('label.common.email')"
                                                            :rules="emailRules"
                                                            :counter="45"
                                                        ></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12" sm="6" md="6">
                                                        <v-text-field
                                                            v-model="phone"
                                                            :label="$t('label.common.phone')"
                                                        ></v-text-field>
                                                    </v-col>
                                                </v-row>
                                            </v-form>
                                        </v-container>
                                    </v-card-text>

                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <template v-if="isEditDialog">
                                            <v-btn @click="save()" color="blue darken-1" text>
                                                {{ $t('label.common.save') }}
                                            </v-btn>
                                        </template>
                                        <template v-else>
                                            <v-btn @click="add()" color="blue darken-1" text>
                                                {{ $t('label.common.add') }}
                                            </v-btn>
                                        </template>
                                        <v-btn @click="close()" color="blue darken-1" text>
                                            {{ $t('label.common.cancel') }}
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                            <v-dialog v-model="deptDialog" persistent transition max-width="300px">
                                <v-card>
                                    <v-card-title>
                                        <span class="headline">{{ $t('label.common.selectDepartment') }}</span>
                                    </v-card-title>

                                    <v-card-text>
                                        <v-container>
                                            <v-row>
                                                <v-col cols="12" sm="12">
                                                    <v-treeview
                                                        ref="deptTreeView"
                                                        v-model="deptTree"
                                                        :open="treeViewOpen"
                                                        :items="deptTreeData"
                                                        activatable
                                                        item-key="name"
                                                    >
                                                        <template v-slot:prepend="{ item, open }">
                                                            <v-icon v-if="!item.file">
                                                                {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
                                                            </v-icon>
                                                            <v-icon v-else>
                                                                {{ files[item.file] }}
                                                            </v-icon>
                                                        </template>
                                                        <template slot="label" slot-scope="{ item }">
                                                            <div @click="clickDeptTree(item)">{{ item.name }}</div>
                                                        </template>
                                                    </v-treeview>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-card-text>

                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn @click="saveDeptDialog()" color="blue darken-1" text>
                                            {{ $t('label.common.save') }}
                                        </v-btn>
                                        <v-btn @click="closeDeptDialog()" color="blue darken-1" text>
                                            {{ $t('label.common.cancel') }}
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                            <v-dialog v-model="deleteDialog" persistent max-width="290">
                                <v-card>
                                    <v-card-title class="headline">{{ $t('label.admin.delAdmin') }}</v-card-title>
                                    <v-card-text>{{ $t('label.admin.isDeleteAdmin') }}</v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn @click="closeDeleteDialog()" color="green darken-1" text>{{
                                            $t('label.common.cancel')
                                        }}</v-btn>
                                        <v-btn @click="confirmDelete()" color="red darken-1" text>{{
                                            $t('label.common.confirm')
                                        }}</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                            <v-dialog v-model="setStatusDialog" persistent max-width="290">
                                <v-card>
                                    <v-card-title class="headline">{{ $t('label.common.remind') }}</v-card-title>
                                    <v-card-text>{{ setStatusText }}</v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn @click="closeSetStatusDialog()" color="green darken-1" text>{{
                                            $t('label.common.cancel')
                                        }}</v-btn>
                                        <v-btn @click="setStatus()" color="red darken-1" text>{{
                                            $t('label.common.confirm')
                                        }}</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                            <v-dialog v-model="resetPasswordDialog" persistent max-width="290">
                                <v-card>
                                    <v-card-title class="headline">{{ $t('label.common.resetPassword') }}</v-card-title>
                                    <v-card-text>{{ $t('label.admin.isResetPassword') }}</v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn @click="closeResetPasswordDialog()" color="green darken-1" text>{{
                                            $t('label.common.cancel')
                                        }}</v-btn>
                                        <v-btn @click="resetAdminPassword()" color="red darken-1" text>{{
                                            $t('label.common.confirm')
                                        }}</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                            <v-dialog v-model="showResetPasswordDialog" persistent max-width="360">
                                <v-card>
                                    <v-card-title class="headline">{{
                                        $t('label.admin.rememberPassword')
                                    }}</v-card-title>
                                    <v-card-text>
                                        <p>{{ $t('label.common.administrator') + ':' + resetName }}</p>
                                        <p>{{ $t('label.common.password') + ':' + resetPassword }}</p>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn @click="closeShowResetPasswordDialog()" color="green darken-1" text>{{
                                            $t('label.common.confirm')
                                        }}</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </template>
                        <template v-slot:item.index="{ item }">
                            {{
                                (pageTo - 1) * 10 +
                                    (adminList
                                        .map(function(x) {
                                            return x.id
                                        })
                                        .indexOf(item.id) +
                                        1)
                            }}
                        </template>
                        <template v-slot:item.status="{ item }">
                            <v-chip
                                :color="item.status === 1 ? 'green' : 'red'"
                                class="ma-2 left"
                                small
                                text-color="white"
                            >
                                {{ item.status === 1 ? $t('label.common.enable') : $t('label.common.disable') }}
                            </v-chip>
                        </template>
                        <template v-slot:item.action="{ item }">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                    <v-icon @click="openEditDialog(item.id)" v-on="on" color="info" small class="mr-2">
                                        mdi-square-edit-outline
                                    </v-icon>
                                </template>
                                <span>{{ $t('label.common.modify') }}</span>
                            </v-tooltip>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                    <v-icon @click="openDelDialog(item.id)" v-on="on" color="red" small class="mr-2">
                                        mdi-delete
                                    </v-icon>
                                </template>
                                <span>{{ $t('label.common.delete') }}</span>
                            </v-tooltip>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                    <v-icon
                                        @click="openSetStatusDialog(item.id, item.status === 1 ? 2 : 1)"
                                        v-on="on"
                                        :color="item.status === 1 ? 'red' : 'green'"
                                        small
                                        class="mr-2"
                                    >
                                        {{
                                            item.status === 1
                                                ? 'mdi-alert-circle-outline'
                                                : 'mdi-alert-circle-check-outline'
                                        }}
                                    </v-icon>
                                </template>
                                <span>{{
                                    item.status === 1 ? $t('label.common.disable') : $t('label.common.enable')
                                }}</span>
                            </v-tooltip>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                    <v-icon
                                        @click="openResetPasswordDialog(item.id)"
                                        v-on="on"
                                        color="gray"
                                        small
                                        class="mr-2"
                                    >
                                        mdi-reload
                                    </v-icon>
                                </template>
                                <span>{{ $t('label.common.resetPassword') }}</span>
                            </v-tooltip>
                        </template>
                    </v-data-table>
                </v-card>
                <v-snackbar v-model="snackbar" :timeout="snackbarTimeOut" :color="isSuccess ? 'success' : 'error'" top>
                    {{ isSuccess ? successText : errorText }}
                </v-snackbar>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import drawerJs from '~/assets/js/common/drawer'
import Regex from '@/assets/utils/regex'
import FocreUtil from '@/assets/utils/focre-util'
export default {
    name: 'AdminIndex',
    layout: 'frame',
    data() {
        return {
            treeViewOpen: ['public'],
            tree: [],
            queryKeywords: '',
            queryCreateTime: '',
            regTimeShow: false,
            treeData: [],
            loading: false,
            dataTableOptions: {},
            tableHeaders: [],
            adminList: [],
            adminListTotal: 0,
            dialog: false,
            isEditDialog: false,
            isAddDialog: false,
            username: '',
            name: '',
            password: '',
            passwordShow: false,
            confirmPassword: '',
            confirmPasswordShow: false,
            dept: '',
            roleIds: 0,
            email: '',
            phone: '',
            formTitle: '',
            deptDialog: false,
            deptTree: [],
            deptTreeData: [],
            deptId: 0,
            addDialogDeptId: -1,
            valid: true,
            usernameRules: [
                (v) => !!v || this.$t('validate.notEmpty.common.username'),
                (v) => (v && v.length <= 20) || this.$t('validate.stringLength.common.username', { num: 20 })
            ],
            nameRules: [
                (v) =>
                    (v && v.length <= 20) || v.length === 0 || this.$t('validate.stringLength.common.name', { num: 20 })
            ],
            passwordRules: [
                (v) => !!v || this.$t('validate.notEmpty.common.password'),
                (v) => (v && v.length <= 100) || this.$t('validate.stringLength.common.password', { num: 100 })
            ],
            confirmPasswordRules: [
                (v) => !!v || this.$t('validate.notEmpty.common.confirmPassword'),
                (v) => (v && v.length <= 100) || this.$t('validate.stringLength.common.confirmPassword', { num: 100 })
            ],
            deptRules: [(v) => !!v || this.$t('validate.notEmpty.dept.self')],
            emailRules: [
                (v) =>
                    (v && v.length <= 45) ||
                    v.length === 0 ||
                    this.$t('validate.stringLength.common.email', { num: 45 }),
                (v) => Regex.email().test(v) || v.length === 0 || this.$t('validate.format.email')
            ],
            successText: '',
            isSuccess: true,
            errorText: '',
            snackbar: false,
            snackbarTimeOut: 1500,
            deleteId: 0,
            deleteDialog: false,
            editId: 0,
            setStatusId: 0,
            adminStatus: 0,
            setStatusDialog: false,
            setStatusText: '',
            resetPasswordId: 0,
            resetPasswordDialog: false,
            showResetPasswordDialog: false,
            resetName: '',
            resetPassword: '',
            pageTo: 0,
            pageSize: 0
        }
    },
    computed: {
        passwordConfirmationRule() {
            const self = this
            return () => self.password === self.confirmPassword || self.$t('validate.notMatch.password')
        }
    },
    watch: {
        dataTableOptions: {
            handler() {
                this.getAdminListData()
            },
            deep: true
        }
    },
    mounted() {
        const self = this
        self.breadcrumbsText(self.$t('label.title.userManagement'))

        // 初始化表格头部
        self.tableHeaders = [
            {
                text: self.$t('label.common.serialNumber'),
                align: 'left',
                sortable: false,
                value: 'index'
            },
            {
                text: self.$t('label.common.username'),
                value: 'username'
            },
            {
                text: self.$t('label.common.fullName'),
                value: 'name'
            },
            {
                text: self.$t('label.common.role'),
                value: 'role'
            },
            {
                text: self.$t('label.common.department'),
                value: 'dept'
            },
            {
                text: self.$t('label.common.status'),
                align: 'center',
                value: 'status'
            },
            {
                text: self.$t('label.common.email'),
                value: 'email'
            },
            {
                text: self.$t('label.common.phone'),
                value: 'phone'
            },
            {
                text: self.$t('label.common.createTime'),
                value: 'createTime'
            },
            {
                text: self.$t('label.common.updateTime'),
                value: 'updateTime'
            },
            {
                text: self.$t('label.common.actions'),
                value: 'action'
            }
        ]

        self.getDeptTree()

        // 初始化加载管理员列表
        self.getAdminListData()
    },
    methods: {
        breadcrumbsText(text) {
            drawerJs.$emit('breadcrumbsEvent', text)
        },
        async getDeptTree() {
            const self = this
            const result = await this.$Dept.tree()
            const data = result.data
            if (result.code === 200) {
                self.treeData = data
                setTimeout(function() {
                    self.$refs.treeView.updateAll(true)
                }, 1000)
            } else {
                self.isSuccess = false
                self.errorText = result.msg
                self.snackbar = true
            }
        },
        async getAdminListData() {
            const self = this
            self.loading = true
            const { sortBy, sortDesc, page, itemsPerPage } = self.dataTableOptions
            self.pageTo = page
            self.pageSize = itemsPerPage
            const params = {
                deptId: self.deptId,
                keyword: self.queryKeywords,
                createTime: self.queryCreateTime,
                pageTo: page,
                pageSize: itemsPerPage
            }
            const result = await this.$Admin.list(params)
            const data = result.data
            if (result.code === 200) {
                self.adminList = data
                self.adminListTotal = result.total
                if (sortBy.length === 1 && sortDesc.length === 1) {
                    self.adminList = self.adminList.sort((a, b) => {
                        const sortA = a[sortBy[0]]
                        const sortB = b[sortBy[0]]

                        if (sortDesc[0]) {
                            if (sortA < sortB) return 1
                            if (sortA > sortB) return -1
                            return 0
                        } else {
                            if (sortA < sortB) return -1
                            if (sortA > sortB) return 1
                            return 0
                        }
                    })
                }
                setTimeout(() => {
                    self.loading = false
                }, 1000)
            } else {
                self.isSuccess = false
                self.errorText = result.msg
                self.snackbar = true
            }
        },
        search() {
            const self = this
            self.getAdminListData()
        },
        openAddDialog() {
            const self = this
            self.dialog = true
            self.isAddDialog = true
            self.formTitle = self.$t('label.admin.addAdmin')
        },
        async openEditDialog(id) {
            const self = this
            self.dialog = true
            self.isEdit = true
            self.isEditDialog = true
            self.editId = id
            const params = {
                id
            }
            const result = await this.$Admin.getById(params)
            const data = result.data
            if (result.code === 200) {
                self.username = data.username
                self.name = data.name
                self.roleIds = data.roleIds
                self.dept = data.dept
                self.email = data.email
                self.phone = data.phone
            } else {
                self.isSuccess = false
                self.errorText = result.msg
                self.snackbar = true
            }
        },
        async save() {
            const self = this
            const params = {
                id: self.editId,
                username: self.username,
                name: self.name,
                password: self.password,
                deptId: self.addDialogDeptId,
                email: self.email,
                phone: self.phone
            }
            const result = await self.$Admin.edit(params)
            if (result.code === 200) {
                self.isSuccess = true
                self.successText = result.msg
                self.snackbar = true
                await self.getAdminListData()
                self.dialog = false
                self.resetValue()
                // self.$refs.addOrEditForm.reset()
                self.$refs.addOrEditForm.resetValidation()
            } else {
                self.isSuccess = false
                self.errorText = result.msg
                self.snackbar = true
            }
        },
        openDelDialog(id) {
            const self = this
            self.deleteId = id
            self.deleteDialog = true
        },
        closeDeleteDialog() {
            const self = this
            self.deleteId = 0
            self.deleteDialog = false
        },
        async confirmDelete() {
            const self = this
            const params = {
                id: self.deleteId
            }
            const result = await this.$Admin.delete(params)
            if (result.code === 200) {
                self.isSuccess = true
                self.successText = result.msg
                self.snackbar = true
                await self.getAdminListData()
                self.deleteDialog = false
            } else {
                self.isSuccess = false
                self.errorText = result.msg
                self.snackbar = true
                self.deleteDialog = false
            }
        },
        resetValue() {
            const self = this
            self.username = ''
            self.name = ''
            self.password = ''
            self.confirmPassword = ''
            self.roleIds = ''
            self.dept = ''
            self.email = ''
            self.phone = ''
            self.isEditDialog = false
            self.isAddDialog = false
        },
        async add() {
            const self = this
            const params = {
                username: self.username,
                name: self.name,
                password: FocreUtil.md5ForCount(2, self.password),
                deptId: self.addDialogDeptId,
                email: self.email,
                phone: self.phone
            }
            const result = await self.$Admin.add(params)
            if (result.code === 200) {
                self.isSuccess = true
                self.successText = result.msg
                self.snackbar = true
                await self.getAdminListData()
                self.dialog = false
                self.resetValue()
                // self.$refs.addOrEditForm.reset()
                self.$refs.addOrEditForm.resetValidation()
            } else {
                self.isSuccess = false
                self.errorText = result.msg
                self.snackbar = true
            }
        },
        close() {
            this.dialog = false
        },
        async openDeptDialog() {
            const self = this
            self.deptDialog = true

            const result = await this.$Dept.tree()
            const data = result.data
            if (result.code === 200) {
                self.deptTreeData = data
                setTimeout(function() {
                    self.$refs.deptTreeView.updateAll(true)
                }, 100)
            } else {
                self.errorText = result.msg
            }
        },
        saveDeptDialog() {
            const self = this
            self.deptDialog = false
        },
        clickDeptTree(obj) {
            const self = this
            self.addDialogDeptId = obj.id
            self.dept = obj.name
        },
        searchDept(obj) {
            const self = this
            self.deptId = obj.id
            self.getAdminListData()
        },
        closeDeptDialog() {
            const self = this
            self.deptDialog = false
            self.addDialogDeptId = -1
            self.dept = ''
        },
        openSetStatusDialog(id, status) {
            const self = this
            self.setStatusId = id
            self.adminStatus = status
            self.setStatusDialog = true
            if (status === 2) {
                self.setStatusText = self.$t('label.admin.isEnableAdmin')
            } else if (status === 1) {
                self.setStatusText = self.$t('label.admin.isDisableAdmin')
            }
        },
        closeSetStatusDialog() {
            const self = this
            self.setStatusId = 0
            self.adminStatus = 0
            self.setStatusDialog = false
            self.setStatusText = ''
        },
        async setStatus() {
            const self = this
            const params = {
                id: self.setStatusId,
                status: self.adminStatus
            }
            const result = await self.$Admin.setStatus(params)
            if (result.code === 200) {
                await self.getAdminListData()
                self.setStatusDialog = false
            } else {
                self.isSuccess = false
                self.errorText = result.msg
                self.snackbar = true
            }
        },
        openResetPasswordDialog(id) {
            const self = this
            self.resetPasswordId = id
            self.resetPasswordDialog = true
        },
        closeResetPasswordDialog() {
            const self = this
            self.resetPasswordId = 0
            self.resetPasswordDialog = false
        },
        async resetAdminPassword() {
            const self = this
            const params = {
                id: self.resetPasswordId
            }
            const result = await self.$Admin.resetPassword(params)
            const data = result.data
            if (result.code === 200) {
                await self.getAdminListData()
                self.resetPasswordDialog = false

                self.resetName = data.username
                self.resetPassword = data.password
                self.showResetPasswordDialog = true
            } else {
                self.isSuccess = false
                self.errorText = result.msg
                self.snackbar = true
            }
        },
        closeShowResetPasswordDialog() {
            const self = this
            self.showResetPasswordDialog = false
        }
    }
}
</script>

<style lang="scss">
@import '~assets/styles/admin/index.scss';
</style>
