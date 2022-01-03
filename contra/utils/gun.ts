import GUN from "gun";
import "gun/sea";
import "gun/axe";
import { IGunChainReference } from "gun/types/chain";

// Database
export const gun = GUN({
  peers: ["http:localhost:8000/gun"], // Put the relay node that you want here
});
type User = IGunChainReference & {
  is: { alias: string; epub: string; pub: string };
};
// Gun User
export const user = gun.user().recall({ sessionStorage: true }) as User;

// Current User's username
// export const username = writable('');

// user.get('alias').on(v => username.set(v))

// db.on('auth', async(event) => {
//     const alias = await user.get('alias'); // username string
//     username.set(alias);

//     console.log(`signed in as ${alias}`);
// });
