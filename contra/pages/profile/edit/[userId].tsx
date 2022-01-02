import { useRouter } from "next/router";
import { useContext } from "react";
// import Link from 'next/link'

export default function Edit() {
  const router = useRouter();
  const { userId } = router.query;
  console.log("edit userId", { userId });

  return <>Edit</>;
}
