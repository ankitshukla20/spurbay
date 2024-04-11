import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SvgIconProps,
  SvgIconTypeMap,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

interface Props {
  to: string;
  children: ReactNode;
  onClick: () => void;
  Icon?: OverridableComponent<SvgIconTypeMap<SvgIconProps, "svg">>;
}

export default function SidebarNavButton({
  to,
  children,
  onClick,
  Icon,
}: Props) {
  const location = useLocation();

  return (
    <ListItem disablePadding>
      <ListItemButton
        onClick={onClick}
        component={Link}
        to={to}
        sx={{
          mb: Icon ? 2 : 1,
          textAlign: Icon ? "left" : "center",
          color: location.pathname === to ? "primary.main" : "inherit",
        }}
      >
        {Icon && (
          <ListItemIcon>
            <Icon
              sx={{
                color: location.pathname === to ? "primary.main" : "inherit",
              }}
            />
          </ListItemIcon>
        )}

        <ListItemText primary={children} />
      </ListItemButton>
    </ListItem>
  );
}
