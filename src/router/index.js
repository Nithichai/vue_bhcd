import VueRouter from "vue-router";
import routes from "./routes";
import { nextTick } from "q";
const axios = require('axios')

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  mode: 'history',
  linkExactActiveClass: "active",
  scrollBehavior: (to) => {
    if (to.hash) {
      return {selector: to.hash}
    } else {
      return { x: 0, y: 0 }
    }
  }
});

// router.beforeEach((to, from, next) => {
//   console.log(process.env.CLIENTID)
//   if (to.path.localeCompare("/login/return") != 0) {
//     var accessToken = localStorage.access_token
//     axios({
//       method: 'get',
//       url: 'https://api.line.me/v2/profile',
//       headers: {
//         'Authorization' : 'Bearer ' + accessToken
//       },
//     }).then((response) => {
//       next()
//     }).catch((error) => {
//       localStorage.clear();
//       window.location.replace("https://access.line.me/oauth2/v2.1/authorize?bot_prompt=normal&response_type=code&redirect_uri=https%3A%2F%2Fbasic-health-care-device.herokuapp.com%2Flogin%2Freturn&scope=profile%20openid%20email&state=KGn1K1mqzr&client_id=1556734128")
//     })
//   } else {
//     next()
//   }
// });

export default router;
