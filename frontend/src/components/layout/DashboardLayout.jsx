import {
  Outlet,
  useLocation,
  useNavigate,
  useOutletContext,
} from "react-router-dom";

import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";

import Inventory2Icon from "@mui/icons-material/Inventory2";
import GroupIcon from "@mui/icons-material/Group";

const drawerWidth = 240;

const menuItems = [
  {
    label: "Items",
    path: "/items",
    icon: <Inventory2Icon />,
  },
  {
    label: "Members",
    path: "/members",
    icon: <GroupIcon />,
  },
];

const DashboardLayout = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const context = useOutletContext();

  return (
    <Box sx={{ display: "flex", flex: 1 }}>
      {/* SIDEBAR */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,

          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            position: "relative",
            height: "calc(100vh - 64px)",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto", mt: 2 }}>
          <List>
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <ListItemButton
                  key={item.path}
                  selected={isActive}
                  onClick={() => navigate(item.path)}
                  sx={{
                    mx: 1,
                    borderRadius: 2,
                    mb: 1,
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>

                  <ListItemText primary={item.label} />
                </ListItemButton>
              );
            })}
          </List>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          bgcolor: "#f5f5f5",

          width: `calc(100% - ${drawerWidth}px)`,

          overflowX: "auto",

          minWidth: 0,

          height: "calc(100vh - 64px)",

          overflowY: "auto",
        }}
      >
        <Outlet context={context} />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
