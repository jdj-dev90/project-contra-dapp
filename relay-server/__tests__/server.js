const Gun = require("gun/gun");
require("gun/sea");

const createUserProfile = ({
  username = "",
  avatar = "",
  displayName = "",
  bio = "",
  privacyType = "PUBLIC",
}) => ({
  username: username,
  avatar: avatar,
  displayName: displayName,
  bio: bio,
  privacyType: privacyType,
});
// const Gun: IGunStatic = jest.createMockFromModule("gun/gun");

let gun, user, userData;

beforeAll(() => {
  gun = Gun(["http://localhost:8765/gun"]);
  user = gun
    .user()
    .recall
    // { sessionStorage: true }
    ();
  userData = { username: "test_username", password: "test_password" };
  console.log({
    gun,
    user,
    userData,
  });
});

test("signup", (done) => {
  gun.get(`~@${userData.username}`).once((user) => {
    console.log({ user });
    if (user) {
      setAuthError("Username already taken");
    } else {
      user.create(userData.username, userData.password, ({ err, pub }) => {
        console.log({ err, pub });
        expect(pub).toBeInstanceOf(String);
        // if (err) {
        //   setAuthError(err);
        // } else {
        //   _login(username, password);
        // }
      });
    }
  });
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
