import Logger from "@reactioncommerce/logger";
import fetch from "node-fetch";
import config from "./config.js";

const {
  HYDRA_ADMIN_URL,
  HYDRA_TOKEN_URL,
  MOCK_TLS_TERMINATION
} = config;

let mockTlsTermination = {};
if (MOCK_TLS_TERMINATION) {
  mockTlsTermination = {
    "X-Forwarded-Proto": "https"
  };
}

/**
 * @name get
 * @method
 * @private
 * @param  {String} flow Request or Consent
 * @param  {String} challenge To fetch information about the login/consent
 * @returns {Object|String} API res
 */
const get = async (flow, challenge) => {
  try {
    const res = await fetch(
      `${HYDRA_ADMIN_URL}/oauth2/auth/requests/${flow}?${flow}_challenge=${challenge}`,
      {
        headers: {
          ...mockTlsTermination
        }
      }
    );
    if (res.status < 200 || res.status > 302) {
      const json = await res.json();
      Logger.error(`An error occurred while making GET ${flow}-${challenge} HTTP request to Hydra: `, json.error_description);
      return Promise.reject(new Error(json.error_description));
    }
    return res.json();
  } catch (err) {
    Logger.error(
      `An error occurred while making GET ${HYDRA_ADMIN_URL}/oauth2/auth/requests/${flow}?${flow}_challenge=${challenge} HTTP request to Hydra: `,
      err
    );
    throw err;
  }
};

/**
 * @name put
 * @method
 * @private
 * @param  {String} flow Request or Consent
 * @param  {String} action Accept/Reject
 * @param  {String} challenge To fetch information about the login/consent
 * @param  {String} body Request body
 * @returns {Object|String} API res
 */
const put = async (flow, action, challenge, body) => {
  try {
    const res = await fetch(`${HYDRA_ADMIN_URL}/oauth2/auth/requests/${flow}/${action}?${flow}_challenge=${challenge}`, {
      method: "PUT",
      body: body && JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        ...mockTlsTermination
      }
    });
    if (res.status < 200 || res.status > 302) {
      const json = await res.json();
      Logger.error(`An error occurred while making PUT ${flow}-${challenge} request to Hydra: `, json.error_description);
      return Promise.reject(new Error(json.error_description));
    }
    return res.json();
  } catch (err) {
    Logger.error(`An error occurred while making PUT  ${flow}-${challenge} request to Hydra`, err);
    throw err;
  }
};

/**
 * @name deleteUserSession
 * @method
 * @private
 * @param  {String} id userId
 * @returns {Object|String} API res
 */
function deleteUserSession(id) {
  return fetch(`${HYDRA_ADMIN_URL}/oauth2/auth/sessions/login?subject=${id}`, { method: "DELETE" })
    .then(async (res) => {
      if (res.status < 200 || res.status > 302) {
        const json = await res.json();
        Logger.error(`An error occurred while deleting session in Hydra for user ${id} `, json.error_description);
        throw new Error(json.error_description);
      }
      return null;
    });
}

/**
 * @name refreshAuthToken
 * @method
 * @private
 * @param  {String} options options
 * @returns {Object|String} API res
 */
async function refreshAuthToken({ refreshToken, clientId, clientSecret }) {
  const response = await fetch(HYDRA_TOKEN_URL, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    method: "POST",
    body: `grant_type=refresh_token&refresh_token=${refreshToken}&response_type=token&client_id=${clientId}&client_secret=${clientSecret}`
  });

  return response.json();
}

export default {
  getLoginRequest: (challenge) => get("login", challenge),
  acceptLoginRequest: (challenge, body) => put("login", "accept", challenge, body),
  rejectLoginRequest: (challenge) => put("login", "reject", challenge),
  getLogoutRequest: (challenge) => get("logout", challenge),
  acceptLogoutRequest: (challenge) => put("logout", "accept", challenge),
  rejectLogoutRequest: (challenge) => put("logout", "reject", challenge),
  getConsentRequest: (challenge) => get("consent", challenge),
  acceptConsentRequest: (challenge, body) => put("consent", "accept", challenge, body),
  rejectConsentRequest: (challenge, body) => put("consent", "reject", challenge, body),
  deleteUserSession,
  refreshAuthToken
};
