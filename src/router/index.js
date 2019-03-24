import VueRouter from "vue-router";
import routes from "./routes";
import { nextTick } from "q";
const axios = require('axios')

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkExactActiveClass: "active",
  scrollBehavior: (to) => {
    if (to.hash) {
      return {selector: to.hash}
    } else {
      return { x: 0, y: 0 }
    }
  }
});

router.beforeEach((to, from, next) => {
  console.log('axios')
  axios({
    method: 'get',
    url: 'https://bhcd-line-login.herokuapp.com',
  }).then((response) => {
    next()
  }).catch((error) => {
    console.log(error.response.status)
    window.location.replace("https://bhcd-line-login.herokuapp.com/login/line")
  })
});

export default router;
