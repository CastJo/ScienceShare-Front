npm <template>
    <div>
        <el-dialog :before-close="handleClose" :visible.sync="this.dialogVisible" title="专家认证">
            您的姓名：<el-autocomplete
                class="inline-input"
                v-model="value1"
                :fetch-suggestions="querySearch1"
                placeholder="请输入内容"
        ></el-autocomplete>
            您所在的机构：<el-autocomplete
                    class="inline-input"
                    v-model="value2"
                    :fetch-suggestions="querySearch2"
                    placeholder="请输入内容"
            ></el-autocomplete>
            <mavon-editor :boxShadow="false" defaultOpen="edit" placeholder="请添加申请材料" v-model="content">
            </mavon-editor>
            <div class="dialog-footer" slot="footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button @click="sendApplication" type="primary">确 定</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
    export default {
        name: "Certification",
        data() {
            return {
                // expert:{
                //     loading: false,
                //     value: [],
                //     options: [],
                //     states: [],
                //     list: [],
                // },
                // school:{
                //     loading: false,
                //     value: [],
                //     options: [],
                //
                //     states: [],
                //     list: [],
                // },
                options1:[],
                options2:[],
                value1:"",
                value2:"",
                content: '',
                cb: [],
                dialogVisible:this.visible,
            }
        },
        created() {
            this.getSchool();
        },
        watch: {
            dialogVisible(val) {
                this.$emit('update:visible', val)
            },
            visible(val) {
                this.dialogVisible = val
            },
            value2(val){
              console.log(this.value2);
            }
        },
        methods: {
            getSchool(){
                this.$axios.get('usercenter/getCollegeByKeyword', {
                    params: {
                        keyword: this.value2,
                    }
                }).then((res) => {
                    this.options2 = res.data;
                });

            },
            querySearch2(queryString, callback) {
                this.$axios.get('usercenter/getCollegeByKeyword', {
                    params: {
                        keyword: queryString,
                    }
                }).then((res) => {
                    for(var i = 0; i < res.data.length; ++i){
                        res.data[i].value = res.data[i].name;
                    }
                    console.log(res.data)
                    callback(res.data)
                });
            },
            querySearch1(queryString, callback) {
                this.$axios.get('litcenter/getTop5Authors', {
                    params: {
                        name: queryString,
                    }
                }).then((res) => {
                    for(var i = 0; i < res.data.length; ++i){
                        res.data[i].value = res.data[i].name;
                    }
                    console.log(res.data)
                    callback(res.data)
                });
            },

            handleClose() {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        this.closeDialog();
                    })
                    .catch(_ => {
                    });
            },
            closeDialog() {
                this.dialogVisible = false;
            },
            sendApplication() {
                if (this.form.content === '')
                    this.$alert('内容不能为空')
                else {
                    this.$confirm('是否?', '', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                    }).then(() => {
                        this.postToBackEnd();
                    }).catch(() => {
                    });
                }
            },
            remoteMethodE(query) {
                if (query !== '') {
                    this.expert.loading = true;
                    setTimeout(() => {
                        this.expert.loading = false;
                        this.expert.options = this.expert.list.filter(item => {
                            return item.label.toLowerCase()
                                .indexOf(query.toLowerCase()) > -1;
                        });
                    }, 200);
                } else {
                    this.expert.options = [];
                }
            },
            remoteMethodS(query) {
                if (query !== '') {
                    this.school.loading = true;
                    setTimeout(() => {
                        this.school.loading = false;
                        this.school.options = this.school.list.filter(item => {
                            return item.label.toLowerCase()
                                .indexOf(query.toLowerCase()) > -1;
                        });
                    }, 200);
                } else {
                    this.school.options = [];
                }
            }
        },
        props: ['visible',
        ],

};
</script>
<style scoped></style>
