<template>
  <div>
    <card v-show="Object.keys(model).length!=0">
      <h5>ลบการเชื่อมต่อ</h5>
      <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#confirmModal" @click="confirmModalVisible = true">
        ลบการเชื่อมต่อ
      </button>
    </card>
    <modal :show.sync="confirmModalVisible" class="modal-search" id="confirmModal" :centered="false" :show-close="true">
      <div slot="header">
        <p class="text-muted">ต้องการลบการเชื่อมต่ออุปกรณ์ ?</p>
      </div>
      <div slot="footer">
        <div class="row">
          <div class="col-md-12">
            <p class="text-muted">หากลบจะไม่สามารถทำการกู้คืนข้อมูลได้</p>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <base-button type="danger" @click="deleteDevice" :loading=deleting>ลบ</base-button>
            <!-- <base-button @click="deleteDevice">ยกเลิก</base-button> -->
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
        deleteStatus: -1
      }
    },
    methods: {
      deleteDevice:function() {
        this.deleting = true
        axios({
          method: 'post',
          url: 'http://127.0.0.1:8000/device-info/delete/id',
          headers: {
            'Content-Type' : 'application/json'
          },
          data: {
            "data" : {
              "deviceid" : this.$route.params.id,
            }
          }
        }).then((response) => {
          this.deleteStatus = response.status
          this.deleting = false
          if (this.deleteStatus == 200) {
            this.confirmModalVisible = false
            this.notifyVue('top', 'right')
            setTimeout(function() {
              window.location.replace("http://localhost:8080/#/device-setting/")
            }, 3000);
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