<template>
  <div>
    <card v-show="Object.keys(model).length!=0">
      <h5>ยกเลิกบริการ</h5>
      <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#confirmModal" @click="confirmModalVisible = true">
        ยกเลิกบริการ
      </button>
    </card>
    <modal :show.sync="confirmModalVisible" class="modal-search" id="confirmModal" :centered="false" :show-close="true">
      <div slot="header">
        <p class="text-muted">ต้องการยกเลิกบริการ ?</p>
      </div>
      <div slot="footer">
        <div class="row">
          <div class="col-md-12">
            <p class="text-muted">หากลบจะไม่สามารถทำการกู้คืนข้อมูลได้</p>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <base-button type="danger" @click="deleteDevice(model.id)" :loading=deleting>ลบ</base-button>
          </div>
        </div>
        <div class="row">
            <div class="col-md-12 pl-md-3 pr-md-1 pt-3">
              <p v-if="deleteStatus==400" class="text-danger">การยืนยันไม่สำเร็จ</p>
            </div>
          </div>
      </div>
    </modal>
  </div>
</template>
<script>

  import Modal from '@/components/Modal';
  import NotificationTemplate from '../Notifications/DeleteDeviceCompleteNoti';

  const axios = require('axios');

  export default {
    components: {
      Modal,
      NotificationTemplate
    },
    props: {
      model: {
        type: Object,
        default: () => {
          return {};
        }
      }
    },
    data() {
      return {
        confirmModalVisible: false,
        deleting: false,
        deleteStatus: -1,
      }
    },
    methods: {
      deleteDevice:function(id) {
        this.deleting = true
        axios({
          method: 'post',
          url: 'https://bhcd-api.herokuapp.com/user-line/delete/id',
          headers: {
            'Content-Type' : 'application/json'
          },
          data: {
            "data" : {
              "id" : id,
            }
          }
        }).then((response) => {
          axios({
            method: 'post',
            url: 'https://bhcd-api.herokuapp.com/user-info/delete/id',
            headers: {
              'Content-Type' : 'application/json'
            },
            data: {
              "data" : {
                "id" : id,
              }
            }
          }).then((response) => {
            this.deleteStatus = response.status
            this.deleting = false
            localStorage.clear()
          }).catch((error) => {
            this.deleteStatus = error.response.status
            this.deleting = false
          })
        }).catch((error) => {
          console.log(error.response.status == 404)
          if (error.response.status == 404) {
            axios({
              method: 'post',
              url: 'https://bhcd-api.herokuapp.com/user-info/delete/id',
              headers: {
                'Content-Type' : 'application/json'
              },
              data: {
                "data" : {
                  "id" : id,
                }
              }
            }).then((response) => {
              this.deleteStatus = response.status
              this.deleting = false
              localStorage.clear()
              this.notifyVue('top', 'right')
              setTimeout(function() {
                location.reload()
              }, 3000);
            }).catch((error) => {
              this.deleteStatus = error.response.status
              this.deleting = false
            })
          } else {
            this.deleteStatus = error.response.status
            this.deleting = false
          }
        })
      },
      notifyVue(verticalAlign, horizontalAlign) {
        this.$notify({
          component: NotificationTemplate,
          icon: "tim-icons icon-bell-55",
          horizontalAlign: horizontalAlign,
          verticalAlign: verticalAlign,
          type: "danger",
          timeout: 0
        })
      }
    }
  }
</script>
<style>
</style>