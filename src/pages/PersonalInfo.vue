<template>
  <div class="row">
    <div class="col-md-8">
        <edit-personal-info-form :model="model"></edit-personal-info-form> 
    </div>
    <div class="col-md-4">
        <logout-card :model="model"></logout-card>
    </div>
  </div>
</template>
<script>
  import EditPersonalInfoForm from './PersonalInfo/EditPersonalInfoForm';
  import LogoutCard from './PersonalInfo/LogoutCard';
  
  const axios = require('axios');

  export default {
    components: {
      EditPersonalInfoForm,
      LogoutCard
    },
    mounted() {
      axios({
        method: 'post',
        url: 'https://bhcd-api.herokuapp.com/user-info/check/id',
        headers: {
          'Content-Type' : 'application/json'
        },
        data: {
          "data" : {
            "id" : "Ud20b48e6c0ff39f924fef4d5ffd9ce4a"
          }
        }
      }).then((response) => {
        this.model = response.data.data
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
