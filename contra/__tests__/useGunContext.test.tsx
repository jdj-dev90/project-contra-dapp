import { renderHook, act } from "@testing-library/react-hooks";
import { ReactNode } from "react";
import { GunContextProvider, useGunContext } from "../hooks/useGunContext";
import "gun/gun";
import "gun/sea";
import "../hooks/gun.unset";
import { IGunStatic } from "gun/types/static";

const Gun: IGunStatic = jest.createMockFromModule("gun/gun");

let gun: any, user: any, userData: any;

// beforeAll(() => {
//   gun = Gun(["http://localhost:8765/gun"]);
//   // user = gun.user().recall({ sessionStorage: true });
//   userData = { username: "test_username", password: "test_password" };
// });

test("signup", (done) => {
  // const gun = Gun({
  //   file: "radataclient",
  //   peers: ["http://localhost:8765/gun"],
  // });

  // console.log({ userData, gun }, "asjkdhakjsdhajkdshasld");
  const wrapper = ({ children }: { children: ReactNode }) => (
    <GunContextProvider>{children}</GunContextProvider>
  );
  const { result } = renderHook(() => useGunContext(), {
    wrapper,
  });
  // act(() => {
  //   result.current.signup(userData.username, userData.password);
  // });
  // // await waitForNextUpdate()
  // expect(result.current.authError).toBeNull();
});

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
