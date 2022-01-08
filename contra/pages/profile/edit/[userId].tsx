import { Box, Divider } from "@mantine/core";
import AccountDetails from "../../../components/edit/accountDetails/accountDetails";
import Links from "../../../components/edit/links/links";

export default function Edit() {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "500px",
          padding: "45px 0px",
        }}
      >
        <AccountDetails />
        <Divider sx={{ width: "100%", marginBottom: 25 }} />
        <Links />
      </Box>
    </Box>
  );
}
