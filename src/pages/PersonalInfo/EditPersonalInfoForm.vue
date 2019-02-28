<template>
  <card>
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
    <base-button slot="footer" type="success" fill>Save</base-button>
  </card>
</template>
<script>
  export default {
    props: {
      model: {
        type: Object,
        default: () => {
          return {};
        }
      }
    }
  }
</script>
<style>
</style>
