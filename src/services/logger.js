import * as Sentry from "@sentry/browser";

const init = () => {
  Sentry.init({
    dsn: "https://9d9f15ab78f347c5be75b73b574c0092@sentry.io/5175181"
  });
};

const log = error => {
  Sentry.captureException(error);
};

export default {
  init,
  log
};
