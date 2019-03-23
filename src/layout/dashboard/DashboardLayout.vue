<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <sidebar-link to="/personal-info" :name="$t('sidebar.personal-info')" icon="tim-icons icon-single-02"/>
        <sidebar-link to="/device-setting" :name="$t('sidebar.device-setting')" icon="tim-icons icon-settings-gear-63"/>
        <sidebar-link to="/health-info" :name="$t('sidebar.health-info')" icon="tim-icons icon-bell-55"/>
        <!-- <sidebar-link to="/profile" :name="$t('sidebar.userProfile')" icon="tim-icons icon-single-02"/> -->
        <!-- <sidebar-link to="/table-list" :name="$t('sidebar.tableList')" icon="tim-icons icon-puzzle-10"/> -->
        <!-- <sidebar-link to="/typography" :name="$t('sidebar.typography')" icon="tim-icons icon-align-center"/> -->
        <!-- <sidebar-link to="/dashboard?enableRTL=true" :name="$t('sidebar.rtlSupport')" icon="tim-icons icon-world"/> -->
      </template>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar">

      </dashboard-content>

      <!-- <content-footer></content-footer> -->
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "./MobileMenu";
const axios = require('axios');
export default {
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
    MobileMenu
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    }
  },
  mounted() {
    axios({
        method: 'get',
        url: 'https://bhcd-line-login.herokuapp.com',
      }).then((response) => {
        if (response.status == 200) {
          window.location.replace("https://basic-health-care-device.herokuapp.com/#")
        }
      }).catch((error) => {
        console.log(error.response.status)
        if (error.response.status == 404) {
          window.location.replace("https://bhcd-line-login.herokuapp.com/login/line")
        }
      })
  }
};
</script>
