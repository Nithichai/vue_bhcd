<template>
    <div></div>
</template>
<script>

  export default {
    mounted() {
      const axios = require('axios')
      const querystring = require('querystring')
      const jwt = require('jsonwebtoken');

      var code = this.$route.query.code
      var state = this.$route.query.state

      if (code == undefined || state == undefined) {
        console.log("error")
      } else {
        axios({
            method: 'post',
            url: 'https://api.line.me/oauth2/v2.1/token',
            headers: {
              'Content-Type' : 'application/x-www-form-urlencoded'
            },
            data: querystring.stringify({ 
              grant_type: 'authorization_code',
              code: code,
              redirect_uri: 'https://basic-health-care-device.herokuapp.com/login/return',
              client_id: process.env.CLIENT_ID,
              client_secret: process.env.CLIENT_SECRET
            })
        }).then((response) => {
          for(var key in response.data) {
            localStorage[key] = response.data[key]
          }
          var idToken = localStorage.id_token
          var userInfo = jwt.decode(idToken)
          axios({
            method: 'post',
            url: 'https://bhcd-api.herokuapp.com/user-info/new',
            headers: {
              'Content-Type' : 'application/json'
            },
            data: { 
              "data": {
                "id": userInfo.sub,
                "email": userInfo.email,
                "displayName": userInfo.name,
                "pic": userInfo.picture
              }
            }
          }).then((response1) => {
            window.location.replace("https://basic-health-care-device.herokuapp.com")
          }).catch((error1) => {
            console.log(error1.response)  
          })
        }).catch((error) => {
          console.log(error.response)
        })
      }
      
    }
  };
</script>
<style>
</style>