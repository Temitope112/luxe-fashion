
// import { getCurrentUser } from "../../../../lib/auth/user";
// import NavbarVisibility from "./NavbarVisibility";

// export default async function NavbarWrapper() {
//   const user = await getCurrentUser();

//   return (
//     <NavbarVisibility
//       isAuthenticated={Boolean(user)}
//       isAdmin={user?.role === "ADMIN"}
//     />
//   

import Navbar from "./Navbar";
import { getCurrentUser } from "../../../../lib/auth/user";

export default async function NavbarWrapper() {
  const user = await getCurrentUser();

  return (
    <Navbar
      isAuthenticated={Boolean(user)}
      isAdmin={user?.role === "ADMIN"}
    />
  );
}

