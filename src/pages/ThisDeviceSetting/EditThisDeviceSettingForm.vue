<template>
  <card v-show="Object.keys(model).length!=0">
    <h5 slot="header" class="title">กรอกประวัติผู้ดูแล</h5>
    <div class="row">
      <div class="col-md-12 pl-md-3">
        <base-input label="หมายเลข"
                  placeholder="หมายเลข"
                  v-model="model.device_id"
                  disabled>
        </base-input>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 pr-md-1">
        <base-input label="ชื่อ"
                  placeholder="ชื่อ"
                  v-model="model.name">
        </base-input>
      </div>
      <div class="col-md-6 pl-md-1">
        <label>เพศ</label><br>
        <div class="btn-group btn-group-toggle" data-toggle="buttons">
          <label class="btn btn-sm btn-info btn-simple" :class="{active: model.sex == 'male'}">
            <input type="radio" name="options" autocomplete="off" @click="model.sex='male'"> ชาย
          </label>
          <label class="btn btn-sm btn-info btn-simple" :class="{active: model.sex == 'female'}">
            <input type="radio" name="options" autocomplete="off" @click="model.sex='female'"> หญิง
          </label>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 pr-md-1">
        <base-input label="ส่วนสูง"
                  placeholder="ส่วนสูง"
                  v-model="model.height">
        </base-input>
      </div>
      <div class="col-md-6 pl-md-1">
        <base-input label="น้ำหนัก"
                  placeholder="น้ำหนัก"
                  v-model="model.weight">
        </base-input>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 pr-md-1">
        <base-input label="โรคประจำตัว"
                  placeholder="โรคประจำตัว"
                  v-model="model.disease">
        </base-input>
      </div>
      <div class="col-md-6 pl-md-1">
        <base-input label="ที่อยู่"
                  placeholder="ที่อยู่"
                  v-model="model.address">
        </base-input>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 pr-md-1">
        <base-input label="เบอร์โทร"
                  placeholder="เบอร์โทร"
                  v-model="model.phone"
                  type="tel">
        </base-input>
      </div>
      <div class="col-md-6 pl-md-1">
        <base-input label="วันเกิด"
                  placeholder="วันเกิด"
                  v-model="model.birthday"
                  type="date">
        </base-input>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 pl-md-3 pr-md-1">
        <base-button slot="footer" type="success" fill @click="updateData()" :loading=updating>ยืนยัน</base-button>
        <a href="/#/device-setting" slot="footer" class="btn">ย้อนกลับ</a>
      </div>
    </div>
    <!-- <div class="row">
      <div class="col-md-12 pl-md-3 pr-md-1 pt-3">
        <p v-if="updateStatus==400" class="text-danger">การยืนยันไม่สำเร็จ</p>
        <p v-if="updateStatus==200" class="text-success">การยืนยันสำเร็จ</p>
      </div>
    </div> -->
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
          url: 'http://127.0.0.1:8000/device-info/update/id',
          headers: {
            'Content-Type' : 'application/json'
          },
          data: {
            "data" : {
              "deviceid" : this.$route.params.id,
              "name" : this.model.name,
              "sex" : this.model.sex,
              "height" : this.model.height,
              "weight" : this.model.weight,
              "disease" : this.model.disease,
              "phone" : this.model.phone,
              "birthday" : this.model.birthday,
              "address" : this.model.address,
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
