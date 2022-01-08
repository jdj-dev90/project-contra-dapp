import { Box } from "@mantine/core";
import AccountDetails from "../../../components/edit/accountDetails/accountDetails";
import Links from "../../../components/edit/links/links";
export default function Edit() {
  // const { getUser,  } = useGunContext();

  // const onSave = (values: typeof form["values"]) => getUser().put(values);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {/* <Title order={2}>Account Details</Title>
      <form onSubmit={form.onSubmit(onSave)}>
        <TextInput
          sx={{ padding: "5px 0" }}
          label="Display Name"
          placeholder="John Doe"
          {...form.getInputProps("displayName")}
        />
        <TextInput
          sx={{ padding: "5px 0" }}
          label="Bio"
          placeholder="..."
          {...form.getInputProps("bio")}
        />
        <Checkbox
          sx={{ padding: "10px 0" }}
          {...form.getInputProps("privacyType", { type: "checkbox" })}
          checked={form.values.privacyType === "PRIVATE"}
          onChange={(e: any) => {
            form.setFieldValue(
              "privacyType",
              e.currentTarget.checked ? "PRIVATE" : "PUBLIC"
            );
          }}
          label="Do you want to make your account private?"
        />
        <Button sx={{ margin: "5px 0" }} type="submit">
          save
        </Button>
      </form> */}
      <AccountDetails />
      <Links />
    </Box>
  );
}
