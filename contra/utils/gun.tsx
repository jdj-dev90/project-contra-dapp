import GUN from "gun";
import "gun/sea";
import { User } from "../types";
import "./gun.unset";

// Database
export const gun = GUN({
  peers: ["http:localhost:8000/gun"], // Put the relay node that you want here
});

// Gun User
export const user = gun.user().recall({ sessionStorage: true }) as User;
