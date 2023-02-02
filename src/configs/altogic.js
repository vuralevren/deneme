import { createClient } from "altogic";

// This `envUrl` and `clientKey` is sample you need to create your own.
const envUrl = process.env.REACT_APP_ALTOGIC_ENV_URL;
const clientKey = process.env.REACT_APP_ALTOGIC_CLIENT_KEY;

const altogic = createClient(envUrl, clientKey, {
  signInRedirect: "/login",
});

export const { db, auth, storage, endpoint, queue, realtime, cache } = altogic;
