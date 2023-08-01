import { createApp } from "vue";
import App from "./App.vue";
import VXETable from "vxe-table";
import "vxe-table/lib/style.css";
const app = createApp(App);
app.config.performance = true;
app.use(VXETable).mount("#app");
