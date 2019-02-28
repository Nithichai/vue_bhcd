import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
import NotFound from "@/pages/NotFoundPage.vue";

const PersonalInfo = () => import("@/pages/PersonalInfo.vue");
const DeviceSetting = () => import("@/pages/DeviceSetting.vue");
const HealthInfo = () => import("@/pages/HealthInfo.vue");

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    // redirect: "/personal-info",
    children: [
      {
        path: "personal-info",
        name: "ข้อมูลผู้ใช้งาน",
        component: PersonalInfo
      },
      {
        path: "health-info",
        name: "health-info",
        component: HealthInfo
      },
      {
        path: "device-setting",
        name: "device-setting",
        component: DeviceSetting
      }
    ]
  },
  { 
    path: "*", 
    component: NotFound 
  },
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
