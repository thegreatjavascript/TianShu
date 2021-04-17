import Vue from "vue";
import Router from "vue-router";
import ToImage from "@/components/ToImage";
import ToMarsText from "@/components/ToMarsText";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "ToImage",
      component: ToImage
    },
    {
      path: "/marstext",
      name: "MarsText",
      component: ToMarsText
    },
    {
      path : "/dancetext",
      name :"DanceText",
      component : ()=>import("@/components/DanceText")
    }
  ]
});
