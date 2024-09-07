import { useState } from "react";
import { Group, Code, UnstyledButton } from "@mantine/core";
import {
  IconFingerprint,
  IconKey,
  IconSettings,
  Icon2fa,
  IconDatabaseImport,
  IconReceipt2,
  IconSwitchHorizontal,
  IconLogout,
  IconDashboard,
} from "@tabler/icons-react";
// import { MantineLogo } from "@mantinex/mantine-logo";
import classes from "./Sidebar.module.css";
import { useAppDispatch } from "../store/store";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";

const data = [
  { link: "/", label: "Dashboard", icon: IconDashboard },
  { link: "/billing", label: "Billing", icon: IconReceipt2 },
  { link: "", label: "Security", icon: IconFingerprint },
  { link: "", label: "SSH Keys", icon: IconKey },
  { link: "", label: "Databases", icon: IconDatabaseImport },
  { link: "", label: "Authentication", icon: Icon2fa },
  { link: "", label: "Other Settings", icon: IconSettings },
];

export function Sidebar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [active, setActive] = useState("Billing");

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={() => {
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          {/* <MantineLogo size={28} inverted style={{ color: "white" }} /> */}
          <Code fw={700} className={classes.version}>
            v3.1.2
          </Code>
        </Group>
        {links}
      </div>

      <div className={classes.footer}>
        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </a>

        <UnstyledButton
          className={classes.link}
          onClick={handleLogout}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </UnstyledButton>
      </div>
    </nav>
  );
}
