<template>
  <card v-show="Object.keys(model).length > 0">
    <h5 slot="header" class="title">กรอกประวัติผู้ดูแล</h5>
    <div class="row">
      <div class="col-md-6 pr-md-1">
        <base-input label="ชื่อ"
                  placeholder="ชื่อ"
                  v-model="model.firstname">
        </base-input>
      </div>
      <div class="col-md-6 px-md-1">
        <base-input label="นามสกุล"
                  placeholder="นามสกุล"
                  v-model="model.lastname">
        </base-input>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 pr-md-1">
        <base-input label="เบอร์โทร"
                  type="tel"
                  placeholder="เบอร์โทร"
                  v-model="model.phone">
        </base-input>
      </div>
      <div class="col-md-6 px-md-1">
        <base-input label="อีเมลล์"
                  type="email"
                  placeholder="อีเมลล์"
                  v-model="model.email">
        </base-input>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 pr-md-1">
        <base-input label="อาชีพ"
                  placeholder="อาชีพ"
                  v-model="model.career">
        </base-input>
      </div>
      <div class="col-md-6 px-md-1">
        <base-input label="วันเกิด"
                  type="date"
                  placeholder="วันเกิด"
                  v-model="model.birthday">
        </base-input>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 pl-md-3 pr-md-1">
        <base-button slot="footer" type="success" fill @click="updateData()" :loading=updating>ยืนยัน</base-button>
      </div>
    </div>
  </card>
</template>
<script>

  import NotificationTemplate from '../Notifications/UpdateDeviceCompleteNoti';
  import NotificationTemplateNot from '../Notifications/UpdateDeviceNotCompleteNoti';

  const axios = require('axios');

  export default {
    components: {
      NotificationTemplate,
      NotificationTemplateNot
    },
    props: {
      model: {
        type: Object,
        default: () => {
          return {};
        }
      }
    },
    methods: {
      updateData:function() {
        this.updating = true
        axios({
          method: 'post',
          url: 'http://127.0.0.1:8000/user-info/update/id',
          headers: {
            'Content-Type' : 'application/json'
          },
          data: {
            "data" : {
              "id" : "Ud20b48e6c0ff39f924fef4d5ffd9ce4a",
              "firstname" : this.model.firstname,
              "lastname" : this.model.lastname,
              "phone" : this.model.phone,
              "email" : this.model.email,
              "career" : this.model.career,
              "birthday" : this.model.birthday,
            }
          }
        }).then((response) => {
          this.updateStatus = response.status
          this.updating = false
          this.notifyVue('top', 'right')
        }).catch((error) => {
          this.updateStatus = error.response.status
          this.updating = false
          this.notifyVueNot('top', 'right')
        })
      },
      notifyVue(verticalAlign, horizontalAlign) {
        this.$notify({
          component: NotificationTemplate,
          icon: "tim-icons icon-bell-55",
          horizontalAlign: horizontalAlign,
          verticalAlign: verticalAlign,
          type: "success",
          timeout: 0
        })
      },
      notifyVueNot(verticalAlign, horizontalAlign) {
        this.$notify({
          component: NotificationTemplateNot,
          icon: "tim-icons icon-bell-55",
          horizontalAlign: horizontalAlign,
          verticalAlign: verticalAlign,
          type: "danger",
          timeout: 0
        })
      }
    },
    data() {
      return {
        updating: false,
        updateStatus: -1
      }
    }
  }
</script>
<style>
</style>
