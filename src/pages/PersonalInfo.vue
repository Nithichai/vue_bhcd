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
  const jwt = require('jsonwebtoken');

  export default {
    components: {
      EditPersonalInfoForm,
      LogoutCard
    },
    mounted() {
      var idToken = localStorage.id_token
      var userInfo = jwt.decode(idToken)
      axios({
        method: 'post',
        url: 'https://bhcd-api.herokuapp.com/user-info/check/id',
        headers: {
          'Content-Type' : 'application/json'
        },
        data: {
          "data" : {
            "id" : userInfo.sub
          }
        }
      }).then((response) => {
        this.model = response.data.data
        this.model.displayName = localStorage.name
        this.model.pic = localStorage.picture
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
