import { useState, useEffect, ReactNode, FC } from "react";
import { useRouter } from "next/router";

import { useGunContext } from "../../hooks/useGunContext";

export { RouteGuard };

interface PropTypes {
  children: ReactNode;
}

const RouteGuard: FC<PropTypes> = ({ children }) => {
  const router = useRouter();
  const { getUser } = useGunContext();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // on initial load - run auth check
    authCheck(router.asPath);

    // on route change start - hide page content by setting authorized to false
    const hideContent = () => setAuthorized(false);
    router.events.on("routeChangeStart", hideContent);

    // on route change complete - run auth check
    router.events.on("routeChangeComplete", authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function authCheck(url: string) {
    // redirect to login page if accessing a private page and not logged in
    const publicPaths = ["/signin", "signup"];
    const path = url.split("?")[0];
    if (!getUser() && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push({
        pathname: "/signin",
        query: { returnUrl: router.asPath }
      });
    } else {
      setAuthorized(true);
    }
  }

  return <>{authorized && children}</>;
};
