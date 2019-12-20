<template>
    <div>
        <el-dialog :before-close="handleClose" :visible.sync="this.dialogVisible" title="专家认证">
            您的姓名：
            <el-autocomplete
                    class="inline-input"
                    v-model="value1"
                    :fetch-suggestions="querySearch1"
                    @select="recordId"
                    placeholder="请输入内容"
            />
            您所在的机构：
            <el-autocomplete
                    class="inline-input"
                    v-model="value2"
                    :fetch-suggestions="querySearch2"
                    placeholder="请输入内容"
            />
            <mavon-editor :boxShadow="false" defaultOpen="edit" placeholder="请添加申请材料" v-model="content">
            </mavon-editor><br/>
            <el-select
                    style="width: 800px"
                    v-model="value3"
                    multiple
                    filterable
                    allow-create
                    default-first-option
                    @change="handleS"
                    @select="handleS"
                    placeholder="请选择属于您的文章">
                <el-option
                        v-for="item in this.pubs"
                        :key="item.title"
                        :label="item.title"
                        :value="item.id">
                </el-option>
            </el-select>
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
                options1: [],
                options2: [],
                value1: "",
                value2: "",
                value3: [],
                content: '',
                cb: [],
                dialogVisible: this.visible,
                expertID: '',
                curExpert:[],
                pubs:[],
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
            value2(val) {
                console.log(this.value2);
            }
        },
        methods: {
            getSchool() {
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
                    for (var i = 0; i < res.data.length; ++i) {
                        res.data[i].value = res.data[i].name;
                    }
                    callback(res.data);
                });
            },
            querySearch1(queryString, callback) {
                this.$axios.get('litcenter/getTop5Authors', {
                    params: {
                        name: queryString,
                    }
                }).then((res) => {
                    for (var i = 0; i < res.data.length; ++i) {
                        res.data[i].value = res.data[i].name;
                    }
                    callback(res.data)
                });
            },
            handleS(){
                console.log(this.value3)
            },
            recordId(item){
                this.expertID = item.id;
                this.curExpert = item;
                let i = 0;
                for(let cnt = 0; cnt < this.curExpert.n_pubs; cnt++){
                    this.$axios.get('litcenter/getLIT',{
                        params:{
                            id:this.curExpert.pubs[cnt].i,
                        }
                    }).then((res)=>{
                        if(res.status === 200 && res.data !== ""){
                            this.pubs[i] = res.data;
                            i++;
                        }
                    })
                }
                //todo
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
                if (this.content === '')
                    this.$alert('内容不能为空')
                else {
                    this.$confirm('确认发送专家申请', '', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                    }).then(() => {
                        console.log(this.content);
                        this.postToBackEnd();
                    }).catch(() => {
                    });
                }
            },
            postToBackEnd(){
                this.$axios.get('usercenter/sendApplication', {
                    params: {
                        username: this.$store.state.user.username,
                        content: this.content,
                        authorId: this.expertID,
                        affiliation: this.value2,
                        realName: this.value1,
                    }
                }).then((res)=>{
                    console.log(res);
                })

            }
        },
        props: ['visible',
        ]
    };
    /*
    value2(val) {
      console.log(this.value2);
    }
    */

</script>
<style scoped></style>
