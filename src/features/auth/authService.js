import {
  ClientAuthError,
  InteractionRequiredAuthError,
  UserAgentApplication,
} from "msal";

import { Identity } from "./models";
import { InteractiveSignInRequired } from "./utils";
import { msalConfig, loginRequest } from "./authConfig";

class AuthService {
  constructor() {
    this.msalClient = new UserAgentApplication(msalConfig);
    console.log("AuthService:: initialized: ", msalConfig);
  }

  get serviceName() {
    return "Microsoft";
  }

  async signIn() {
    const response = await this.msalClient.loginPopup(loginRequest);
    return new Identity(response);
  }

  signOut() {
    this.msalClient.logout();
  }

  async getIdentity() {
    const account = this.msalClient.getAccount();
    if (account) {
      try {
        const response = await this.msalClient.acquireTokenSilent(loginRequest);
        return new Identity(response);
      } catch (error) {
        if (error instanceof InteractionRequiredAuthError) {
          throw new InteractiveSignInRequired();
        }
        if (error instanceof ClientAuthError) {
          // On mobile devices, ClientAuthError is sometimes thrown when we
          // can't do silent auth - this isn't generally an issue here.

          if (error.errorCode === "block_token_requests") {
            throw new InteractiveSignInRequired();
          }
          console.warn("ClientAuthError: error code = ", error.errorCode);
        }
        throw error;
      }
    }
    throw new InteractiveSignInRequired();
  }
}

const authService = new AuthService();

export default authService;
