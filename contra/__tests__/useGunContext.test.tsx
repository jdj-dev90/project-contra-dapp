import { renderHook, act } from "@testing-library/react-hooks";
import { ReactNode } from "react";
import {
  GunContextProvider,
  useGun,
  useGunContext
} from "../hooks/useGunContext";
import Gun from "gun";
import "gun/sea";
import "../hooks/gun.unset";
const radisk = require("gun/lib/radisk");
import { IGunStatic } from "gun/types/static";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import Signin from "../pages/signin";
import App from "../pages/_app";
import Home from "../pages";

// var Rad = require('gun/lib/radisk'); // in NodeJS
const mkdirp = require("mkdirp");
// import { LocalStorage } from "node-localstorage";
// // jest.mock("gun");
// (global as any).window = {};
// (window as any).Radisk = radisk;
console.log({ window, radisk });

// global.window.localStorage = new LocalStorage("./localStorage.tmp");

// (global as any).gun = Gun({
//   localStorge: false,
//   peers: ["http://localhost:8765/gun"],
//   axe: true,
//   multicast: false
// });
// (global as any).Gun = Gun;
// let gun: any, user: any, userData: any;

// const customRender = (
//   ui: ReactNode,
//   { providerProps, ...renderOptions }: any
// ) => {
//   return render(
//     <GunContextProvider {...providerProps}>{ui}</GunContextProvider>,
//     renderOptions
//   );
// };

// beforeAll(() => {
//   gun = Gun(["http://localhost:8765/gun"]);
//   // user = gun.user().recall({ sessionStorage: true });
//   userData = { username: "test_username", password: "test_password" };
// });

test("loads items eventually", async () => {
  // mkdirp.sync("testdb");

  const dbfilename = "testdb/" + new Date().getTime().toString() + ".json";
  console.log({ dbfilename });

  const gun = Gun({
    peers: ["http://localhost:8765/gun"],
    file: dbfilename,
    radisk: true,
    localStorage: false
  });
  console.log({ gun });
  // customRender(<Home />, {});

  // await waitFor(() =>
  //   expect(screen.getByText(/^home/)).toHaveTextContent("home page")
  // );

  // Click button
  // fireEvent.click(screen.getByText("Load"));

  // // Wait for page to update with query text
  // const items = await screen.findAllByText(/Item #[0-9]: /);
  // expect(items).toHaveLength(10);
});
// test("signup", done => {
//   // const gun = Gun({
//   //   file: "radataclient",
//   //   peers: ["http://localhost:8765/gun"],
//   // });

//   // console.log({ userData, gun }, "asjkdhakjsdhajkdshasld");
//   const wrapper = ({ children }: { children: ReactNode }) => (
//     <GunContextProvider>{children}</GunContextProvider>
//   );
//   const { result } = renderHook(() => useGunContext(), {
//     wrapper
//   });
//   console.log({ result });
//   act(() => {
//     result.current.signup(userData.username, userData.password);
//   });
//   // await waitForNextUpdate()
//   expect(result.current.authError).toBeNull();
// });

// test("get a valid certificate", () => {
//   const wrapper = ({ children }: { children: ReactNode }) => (
//     <GunContextProvider>{children}</GunContextProvider>
//   );
//   const { result } = renderHook(() => useGunContext(), { wrapper });

//   // act(() => {
//   //   result.current.getCertificate();
//   // });

//   expect(result.current.getCertificate()).toBeInstanceOf(String);
// });
