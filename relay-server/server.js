const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
let Gun = require("gun");
const SEA = require("gun/sea");
// const AXE = require("gun/axe");

// implements forked version of bullet catcher with
// additional error handling
require("bullet-catcher");
require("dotenv").config();

const app = express();
const port = 8765;
const APP_KEY_PAIR = {
  pub: "vwBGXfs1ld5bMgKK5bG-ymM5LWSZpq2W9tx6T6mrxyM.gINLNurjzrcZSkElYQsAf3vN4VZsPc5NDrRhs4bp7lY",
  priv: "YKGPutAv6CdSr5JKz9OEM8X7NbT-QuKRgmPdLTP6rtI",
  epub: "DweRBBAMpB4GKSJwWyRgKtBHSZ_7sREr5-5XIocBCCU.qg8K0uANmxzQjofyjoAaSvemo0mL_iQjDTGqlShlV9o",
  epriv: "NC_WnezGlYgkLdD6tEcnuhJUMZBTvtkKxOV-Espg040",
};
const APP_TOKEN_SECRET = "SECRET_TOCHANGE_PLAZ";

app.use(Gun.serve);

const server = app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

// verify JWT from gun message
function verifyToken(msg) {
  // console.log({ msg, accessToken: msg?.headers?.accessToken });
  if (msg?.headers?.accessToken) {
    try {
      jwt.verify(msg.headers.accessToken, APP_TOKEN_SECRET);

      return true;
    } catch (err) {
      const error = new Error("Invalid access token");

      if (err.name === "TokenExpiredError") {
        // you might want to implement silent refresh here
        error.expiredAt = err.expiredAt;
      }

      return error;
    }
  }

  return false;
}

const gun = Gun({
  web: server,
  isValid: verifyToken,
});

// Sync everything
gun.on("out", { get: { "#": { "*": "" } } });

// Authorize this app as a user
gun.user().auth(APP_KEY_PAIR, ({ err }) => {
  // TODO handle app auth error
  if (err) {
    console.error(err);
  }
});

// parse application/json
app.use(express.json());
// if you're allowing gun access to more than one http origin,
// you'll want to make sure that CORs for API routes is configured
app.use(cors());

app.post("/api/certificates", async (req, res) => {
  const { username, pub: userPubKey } = req.body;
  console.log({ username, pub: userPubKey });
  // See https://gun.eco/docs/SEA.certify for policies
  const policy = [
    // allow users to add and edit their profiles with:
    //   gun
    //     .get('~'+app.pub)
    //     .get('profiles')
    //     .get(user.pub)
    //     .put({ name: 'alice' }, null, {opt: { cert: certificate }} )
    // { "*": `~${APP_KEY_PAIR.pub}` },
    // { "*": `~${APP_KEY_PAIR.pub}*` },
    // `~${APP_KEY_PAIR.pub}/profiles`,
    // { "#": { "*": "" } },
    // { "#": "*" },
    // { "*": "profiles" },
  ];

  // expire in 2 hours
  const expiresAt = Date.now() + 60 * 60 * 1000 * 2;

  const certificate = await SEA.certify(
    [userPubKey],
    policy,
    APP_KEY_PAIR,
    ({ err }) => {
      if (err) {
        console.log(`Error creating certificate for ${username}:`, err);
      } else {
        console.log(`Successfully created certificate for ${username}`);
      }
    },
    // FIXME neither expiry or block seem to be working?
    // https://github.com/amark/gun/issues/1143
    {
      // expiry: expiresAt,
      // // name of path to blocked/banned users
      // block: 'blocked',
    }
  );
  console.log({ certificate });
  res.status(201).send({
    certificate,
    expires_at: expiresAt,
  });
});

app.post("/api/tokens", async (req, res) => {
  const { username, pub } = req.body;

  const token = jwt.sign({ username, pub }, APP_TOKEN_SECRET, {
    expiresIn: "1h",
  });

  res.status(201).send({
    accessToken: token,
  });
});
