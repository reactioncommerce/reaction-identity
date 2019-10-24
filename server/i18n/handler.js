import { WebApp } from "meteor/webapp";
import translations from "./translations.js";

// i18next browser lib always sends a language so this is only
// used if you hit the route directly.
const DEFAULT_LANGUAGE = "en";

WebApp.connectHandlers.use("/locales/resources.json", (req, res) => {
  const { lng = DEFAULT_LANGUAGE } = req.query;

  // Default behavior of i18next browser client is to separate multiple
  // lng and ns with `+`, which becomes a space-delimited string on this end.
  const requestedLanguages = lng.split(" ");

  // Filter `resources` as requested before sending back.
  // We always include all requested languages and namespaces
  // to avoid the browser throwing load errors. But if the language
  // file isn't there, then the translations will be just an empty {}.
  const filteredResources = {};
  for (const language of requestedLanguages) {
    const translation = translations[language] || {};
    filteredResources[language] = { translation };
  }

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(filteredResources));
});
