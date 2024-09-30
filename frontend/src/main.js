import "./style.css";
import "./assets/styles.css";
import "vue-toastification/dist/index.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Toast from "vue-toastification";

const app = createApp(App);

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
});

app.use(vuetify);
app.use(router);
app.use(Toast, {
  timeout: 3000,
});
app.mount("#app");
