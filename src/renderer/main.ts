import { createApp } from "vue";
import "./assets/style.css";
import "./assets/icon/iconfont.css";
import App from "./App.vue";
import { router } from "./router";
import { createPinia } from "pinia";
import { db } from "../common/db";
db("Chat")
  .first()
  .then((obj) => {
    console.log(obj);
  });
createApp(App).use(createPinia()).use(router).mount("#app");
