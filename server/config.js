import envalid from "envalid";

const { bool, num, str } = envalid;

export default envalid.cleanEnv(process.env, {
  API_URL: str(),
  HYDRA_ADMIN_URL: str(),
  HYDRA_TOKEN_URL: str(),
  HYDRA_OAUTH2_ERROR_URL: str({ default: "" }),
  HYDRA_SESSION_LIFESPAN: num({ default: 86400 }),
  MOCK_TLS_TERMINATION: bool({ default: false }),
  OAUTH2_CLIENT_DOMAINS: str({ default: "" }),
  ROOT_URL: str()
});
