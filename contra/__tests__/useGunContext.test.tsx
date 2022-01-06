import { renderHook, act } from "@testing-library/react-hooks";
import { ReactNode } from "react";
import {
  GunContextProvider,
  useGun,
  useGunContext,
} from "../hooks/useGunContext";

test("get a valid certificate", () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <GunContextProvider>{children}</GunContextProvider>
  );
  const { result } = renderHook(() => useGunContext(), { wrapper });

  // act(() => {
  //   result.current.getCertificate();
  // });

  expect(result.current.getCertificate()).toBeInstanceOf(String);
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
