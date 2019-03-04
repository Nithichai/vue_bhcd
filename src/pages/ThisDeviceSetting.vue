<template>
  <div class="row">
    <div class="col-md-8">
        <edit-this-device-setting-form :model="model"></edit-this-device-setting-form> 
    </div>
    <div class="col-md-4">
        <delete-device-info-card :model="model"></delete-device-info-card>
    </div>
  </div>
</template>
<script>
  import EditThisDeviceSettingForm from './ThisDeviceSetting/EditThisDeviceSettingForm';
  import DeleteDeviceInfoCard from './ThisDeviceSetting/DeleteDeviceInfoCard';
  
  const axios = require('axios');

  export default {
    components: {
      EditThisDeviceSettingForm,
      DeleteDeviceInfoCard
    },
    mounted() {
      axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/device-info/check/deviceid',
        headers: {
          'Content-Type' : 'application/json'
        },
        data: {
          "data" : {
            "deviceid" : this.$route.params.id
          }
        }
      }).then((response) => {
        if (response.status == 200) {
          this.model = response.data.data
        }
      })
    },
    data() {
      return {
        model: {}
      }
    },
  }
</script>
<style>
</style>
