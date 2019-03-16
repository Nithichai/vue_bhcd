<template>
    <div v-show="!this.loading">
      <div class="row">
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
                      <a :href="'/#/this-health-info/'+ item[column] + '/'" class="btn">ดูข้อมูลสุขภาพ</a>
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
    </div>
</template>
<script>

  const axios = require('axios');

  const tableColumns = ["หมายเลข", "ผู้ใช้งาน", "แก้ไข"];
  const tableData = [];

  export default {
    data() {
      return {
        title: "ข้อมูลสุขภาพ",
        columns: [...tableColumns],
        data: [...tableData],
        loading: true
      };
    },
    mounted() {
      this.loading = true
      axios({
        method: 'post',
        url: 'https://bhcd-api.herokuapp.com/user-line-device-info/list/id',
        headers: {
          'Content-Type' : 'application/json'
        },
        data: {
            "data" : {
              "id" : "Ud20b48e6c0ff39f924fef4d5ffd9ce4a"
            }
          }
      }).then((response) => {
        this.loading = false
        this.data = response.data.data
      })
    }
  };
</script>
<style>
</style>