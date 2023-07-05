import lume from "lume/mod.ts";
import date from "lume/plugins/date.ts";
import pt from "npm:date-fns/locale/pt/index.js";

const site = lume({
  src: "./src",
});

site.use(date({
  locales: { pt },
}));

site.copy("assets");

export default site;
