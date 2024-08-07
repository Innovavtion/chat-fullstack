import {
  UpdateUserEmail,
  UpdateUserName,
  UpdateUserPassword,
} from "@/services/user.service";
import {
  getAuthUserInfo,
  selectUser,
  updateEmail,
  updateName,
  updatePassword,
} from "@/store/slice/user.slice";
import { useAppDispatch } from "@/store/store";
import { GearIcon } from "@radix-ui/react-icons";
import {
  Button,
  Dialog,
  Avatar,
  Flex,
  Box,
  Text,
  TextField,
  Tabs,
} from "@radix-ui/themes";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import styles from "./user.module.css";

const ValidateName = z.object({
  firstName: z
    .string()
    .nonempty("This string don't any empty")
    .min(3, { message: "Must be 3 or more characters long" }),
  lastName: z
    .string()
    .nonempty("This string don't any empty")
    .min(3, { message: "Must be 3 or more characters long" }),
});

function FormNameHooks() {
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UpdateUserName>({
    resolver: zodResolver(ValidateName),
  });

  async function updateUserName(e: UpdateUserName) {
    try {
      dispatch(updateName(e));
    } catch (e) {
      console.log(e);
    }
  }

  const handleUpdateName = handleSubmit((e) => updateUserName(e));

  return {
    SubmitName: handleUpdateName,
    DataName: register,
    ErrorName: errors,
  };
}

const ValidateEmail = z.object({
  email: z.string().nonempty("This string don't any empty").email(),
  password: z.string().nonempty("This string don't any empty"),
});

function FormEmailHooks() {
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UpdateUserEmail>({
    resolver: zodResolver(ValidateEmail),
  });

  async function updateUserName(e: UpdateUserEmail) {
    try {
      dispatch(updateEmail(e));
    } catch (e) {
      console.log(e);
    }
  }

  const handleUpdateName = handleSubmit((e) => updateUserName(e));

  return {
    SubmitEmail: handleUpdateName,
    DataEmail: register,
    ErrorEmail: errors,
  };
}

const ValidatePassword = z.object({
  newPassword: z
    .string()
    .nonempty("This string don't any empty")
    .min(7, { message: "Must be 7 or more characters long" }),
  oldPassword: z.string().nonempty("This string don't any empty"),
});

function FormPasswordHooks() {
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UpdateUserPassword>({
    resolver: zodResolver(ValidatePassword),
  });

  async function updateUserName(e: UpdateUserPassword) {
    try {
      dispatch(updatePassword(e));
    } catch (e) {
      console.log(e);
    }
  }

  const handleUpdateName = handleSubmit((e) => updateUserName(e));

  return {
    SubmitPassword: handleUpdateName,
    DataPassword: register,
    ErrorPassword: errors,
  };
}

export default function UserModal() {
  const dispatch = useAppDispatch();
  const userInfo = useSelector(selectUser);

  const { SubmitName, DataName, ErrorName } = FormNameHooks();
  const { SubmitEmail, DataEmail, ErrorEmail } = FormEmailHooks();
  const { SubmitPassword, DataPassword, ErrorPassword } = FormPasswordHooks();

  useEffect(() => {
    dispatch(getAuthUserInfo());
  }, [dispatch]);

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <GearIcon
          width="20"
          height="20"
          color="gray"
          cursor="hover"
          style={{ cursor: "pointer" }}
        />
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Account Settings</Dialog.Title>

        <Tabs.Root defaultValue="account">
          <Tabs.List style={{ justifyContent: "center" }}>
            <Tabs.Trigger value="account" style={{ flexGrow: 1 }}>
              Account
            </Tabs.Trigger>
            <Tabs.Trigger value="email" style={{ flexGrow: 1 }}>
              Email
            </Tabs.Trigger>
            <Tabs.Trigger value="password" style={{ flexGrow: 1 }}>
              Password
            </Tabs.Trigger>
          </Tabs.List>

          <Box pt="5">
            <Tabs.Content value="account">
              <form onSubmit={SubmitName}>
                <Flex direction="row" gap="3">
                  <Avatar
                    size="8"
                    src={userInfo.user?.avatar}
                    radius="full"
                    fallback={userInfo.user?.firstName.charAt(0)}
                  />
                  <Box
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                      width: "100%",
                    }}
                  >
                    <label>
                      <Text as="div" size="2" mb="1" weight="bold">
                        Имя
                      </Text>
                      <TextField.Root
                        {...DataName("firstName")}
                        id="firstName"
                        name="firstName"
                        type="text"
                        defaultValue={userInfo.user?.firstName}
                      />
                      {ErrorName.firstName && (
                        <label className={styles.Validation}>
                          {ErrorName.firstName?.message}
                        </label>
                      )}
                    </label>
                    <label>
                      <Text as="div" size="2" mb="1" weight="bold">
                        Фамилия
                      </Text>
                      <TextField.Root
                        {...DataName("lastName")}
                        id="lastName"
                        name="lastName"
                        type="text"
                        defaultValue={userInfo.user?.lastName}
                      />
                      {ErrorName.lastName && (
                        <label className={styles.Validation}>
                          {ErrorName.lastName?.message}
                        </label>
                      )}
                    </label>
                  </Box>
                </Flex>
                <Flex justify="end" gap="3" mt="5">
                  <Dialog.Close>
                    <Button variant="soft" color="gray">
                      Cancel
                    </Button>
                  </Dialog.Close>
                  <Button>Save</Button>
                </Flex>
              </form>
            </Tabs.Content>

            <Tabs.Content value="email">
              <form onSubmit={SubmitEmail}>
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    width: "100%",
                  }}
                >
                  <label>
                    <Text as="div" size="2" mb="1" weight="bold">
                      Current Email
                    </Text>
                    <TextField.Root
                      value={userInfo.user?.email}
                      placeholder="email"
                      type="email"
                      disabled
                    />
                  </label>
                  <label>
                    <Text as="div" size="2" mb="1" weight="bold">
                      New Email
                    </Text>
                    <TextField.Root
                      {...DataEmail("email")}
                      defaultValue=""
                      placeholder="New email"
                      type="email"
                    />
                    {ErrorEmail.email && (
                      <label className={styles.Validation}>
                        {ErrorEmail.email?.message}
                      </label>
                    )}
                  </label>
                  <label>
                    <Text as="div" size="2" mb="1" weight="bold">
                      Current Password
                    </Text>
                    <TextField.Root
                      {...DataEmail("password")}
                      defaultValue=""
                      placeholder="Enter current password"
                      type="password"
                    />
                    {ErrorEmail.password && (
                      <label className={styles.Validation}>
                        {ErrorEmail.password?.message}
                      </label>
                    )}
                    {userInfo.status === "failed" && (
                      <label className={styles.Validation}>
                        This uncorrected password
                      </label>
                    )}
                  </label>
                </Box>
                <Flex justify="end" gap="3" mt="5">
                  <Dialog.Close>
                    <Button variant="soft" color="gray">
                      Cancel
                    </Button>
                  </Dialog.Close>
                  <Button>Reset Email</Button>
                </Flex>
              </form>
            </Tabs.Content>

            <Tabs.Content value="password">
              <form onSubmit={SubmitPassword}>
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    width: "100%",
                  }}
                >
                  <label>
                    <Text as="div" size="2" mb="1" weight="bold">
                      New Password
                    </Text>
                    <TextField.Root
                      {...DataPassword("newPassword")}
                      type="password"
                      placeholder="Enter new password"
                    />
                    {ErrorPassword.newPassword && (
                      <label className={styles.Validation}>
                        {ErrorPassword.newPassword?.message}
                      </label>
                    )}
                  </label>
                  <label>
                    <Text as="div" size="2" mb="1" weight="bold">
                      Current Password
                    </Text>
                    <TextField.Root
                      {...DataPassword("oldPassword")}
                      type="password"
                      placeholder="Enter current password"
                    />
                    {ErrorPassword.oldPassword && (
                      <label className={styles.Validation}>
                        {ErrorPassword.oldPassword?.message}
                      </label>
                    )}
                    {userInfo.status === "failed" && (
                      <label className={styles.Validation}>
                        This uncorrected password
                      </label>
                    )}
                  </label>
                </Box>
                <Flex justify="end" gap="3" mt="5">
                  <Dialog.Close>
                    <Button variant="soft" color="gray">
                      Cancel
                    </Button>
                  </Dialog.Close>
                  <Button>Reset Password</Button>
                </Flex>
              </form>
            </Tabs.Content>
          </Box>
        </Tabs.Root>
      </Dialog.Content>
    </Dialog.Root>
  );
}
