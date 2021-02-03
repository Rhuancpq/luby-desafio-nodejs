"use strict";

const { validate } = use("Validator");

class AuthController {
  async signIn({ request, response, auth }) {
    const rules = {
      username: "required",
      password: "required",
    };

    const { username, password } = request.only(["username", "password"]);

    const validation = await validate({ username, password }, rules);

    if (!validation.fails()) {
      try {
        return await auth.withRefreshToken().attempt(username, password);
      } catch (err) {
        response.unauthorized("Incorrect username or password");
      }
    } else {
      response.unauthorized(validation.messages());
    }
  }
}

module.exports = AuthController;
