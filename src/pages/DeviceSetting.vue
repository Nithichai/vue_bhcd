<template>
    <div>
      <div class="row" v-show="!this.loading">
        <div class="col-12">
          <card class="card-plain">
            <div class="table-full-width table-responsive">
              <!-- <base-table :title="table1.title" :data="table1.data" :columns="table1.columns"></base-table> -->
              <table class="table tablesorter">
                <thead>
                <tr>
                  <th v-for="column in columns" :key="column">{{column}}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in data" :key="index">
                  <td v-for="(column, index) in columns" :key="index">
                    <div v-if="column=='แก้ไข'">
                      <a :href="'/this-device-setting/'+ item[column]" class="btn">แก้ไข</a>
                    </div>
                    <div v-else>
                      {{item[column]}}
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </card>
        </div>
      </div>
      <card>
        <h5>เพิ่มอุปกรณ์</h5>
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addDeviceModal" @click="addDeviceModalVisible = true">
          เพิ่มอุปกรณ์
        </button>
      </card>
      <modal :show.sync="addDeviceModalVisible"
              class="modal-search"
              id="addDeviceModal"
              :centered="false"
              :show-close="true">
        <div slot="header">
          <p class="text-muted">เพิ่มอุปกรณ์</p>
        </div>
        <div slot="footer">
          <div class="row">
            <base-input label="หมายเลข"
                      placeholder="หมายเลข"
                      v-model="deviceid">
            </base-input>
          </div>
          <div class="row">
            <base-input label="รหัสผ่าน"
                      placeholder="รหัสผ่าน"
                      v-model="password"
                      type="password">
            </base-input>
          </div>
          <div class="row">
            <base-button type="primary" @click="registerDevice" :loading=inserting>ยืนยัน</base-button>
          </div>
          <div class="row">
              <div class="col-md-12 pl-md-3 pr-md-1 pt-3">
                <p v-if="insertStatus==400" class="text-danger">การยืนยันไม่สำเร็จ</p>
                <p v-if="insertStatus==401" class="text-danger">รหัสผ่านไม่ถูกต้อง</p>
                <p v-if="insertStatus==404" class="text-danger">ไม่มีอุปกรณ์ในระบบ</p>
                <p v-if="insertStatus==200" class="text-danger">มีอุปกรณ์ในระบบแล้ว</p>
              </div>
            </div>
        </div>
      </modal>
    </div>
</template>
<script>

  import Modal from '@/components/Modal';
  import NotificationTemplate from './Notifications/InsertDeviceCompleteNoti';

  const axios = require('axios');

  const tableColumns = ["หมายเลข", "ผู้ใช้งาน", "แก้ไข"];
  const tableData = [];

  export default {
    components: {
      Modal
    },
    data() {
      return {
        title: "จัดการข้อมูลผู้ใช้งาน",
        columns: [...tableColumns],
        data: [...tableData],
        addDeviceModalVisible: false,
        deviceid: '',
        password: '',
        inserting: false,
        insertStatus: -1,
        loading: true,
        userInfo: ''
      };
    },
    mounted() {
      const axios = require('axios');
      const jwt = require('jsonwebtoken');
      
      var idToken = localStorage.id_token
      this.userInfo = jwt.decode(idToken)

      axios({
        method: 'post',
        url: 'https://bhcd-api.herokuapp.com/user-line-device-info/list/id',
        headers: {
          'Content-Type' : 'application/json'
        },
        data: {
            "data" : {
              "id" : this.userInfo.sub
            }
          }
      }).then((response) => {
        this.loading = false
        this.data = response.data.data
      })
    },
    methods: {
      registerDevice() {
        this.inserting = true
        axios({
          method: 'post',
          url: 'https://bhcd-api.herokuapp.com/device-info/new/onlyid',
          headers: {
            'Content-Type' : 'application/json'
          },
          data: {
            "data" : {
              "deviceid" : this.deviceid,
              "password" : this.password
            }
          }
        }).then((response) => {
          axios({
            method: 'post',
            url: 'https://bhcd-api.herokuapp.com/user-line/new',
            headers: {
              'Content-Type' : 'application/json'
            },
            data: {
              "data" : {
                "id" : this.userInfo.sub,
                "esp" : this.deviceid
              }
            }
          }).then((response) => {
            this.insertStatus = response.status
            this.inserting = false
            if (this.insertStatus == 201) {
              this.addDeviceModalVisible = false
              this.notifyVue('top', 'right')
              setTimeout(function() {
                location.reload()
              }, 3000);
            }
          }).catch((error) => {
            this.insertStatus = error.response.status
            this.inserting = false
          })
        }).catch((error) => {
          this.insertStatus = error.response.status
          this.inserting = false
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
      }
    }
  };
</script>
<style>
</style>