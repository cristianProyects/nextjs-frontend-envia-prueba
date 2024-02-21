"use client";
import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button, Divider, Grid } from "@mui/material";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

// FONTS
import { Didact_Gothic } from "next/font/google";

//ICONS
import MenuIcon from "@mui/icons-material/Menu";
import PeopleIcon from "@mui/icons-material/People";
import BadgeIcon from "@mui/icons-material/Badge";
import GroupsIcon from "@mui/icons-material/Groups";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InventoryIcon from "@mui/icons-material/Inventory";
import AddCircleIcon from "@mui/icons-material/AddCircle";

//COMPONENTS
import ProtectedPage from "../../components/auth";

const drawerWidth = 240;
const gothic = Didact_Gothic({ subsets: ["latin"], weight: "400" });
import io from "socket.io-client";
import Link from "next/link";
const data = {
  origin: {
    name: "Alex",
    company: "envia",
    email: "noreply@envia.com",
    phone: "8110000000",
    street: "shreeji sadan 24 bhandarkar rd",
    number: "opposite matunga kabutar khana",
    city: "Monterrey",
    state: "NL",
    category: 1,
    country: "MX",
    postalCode: "66236",
  },
  destination: {
    name: "new delhi",
    company: "new delhi",
    email: "new@delhi.com",
    phone: "8180000000",
    street: "yashwant place commercial complex",
    number: "123",
    city: "Monterrey",
    state: "NL",
    category: 1,
    country: "MX",
    postalCode: "66236",
  },
  packages: [
    {
      content: "shoes",
      boxCode: "",
      amount: 1,
      type: "box",
      weight: 1,
      insurance: 0,
      declaredValue: 0,
      weightUnit: "KG",
      lengthUnit: "CM",
      dimensions: {
        length: 11,
        width: 15,
        height: 20,
      },
    },
  ],
  shipment: {
    carrier: "fedex",
    service: "ground",
    type: 1,
  },
  settings: {
    printFormat: "PDF",
    printSize: "STOCK_4X6",
    currency: "USD",
    cashOnDelivery: "1000.00",
    comments: "",
  },
  additionalServices: [],
};
const socket = io("http://localhost:4000");
function ResponsiveDrawer({ children }, props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [count, setCount] = React.useState(0);
  const firstMenu = [
    {
      title: "Usuarios",
      path: "/dashboard/users",
      icon: <PeopleIcon style={{ color: "black" }}></PeopleIcon>,
    },
    {
      title: "Empleados",
      path: "/dashboard/employes",
      icon: <BadgeIcon style={{ color: "black" }}></BadgeIcon>,
    },
    {
      title: "Clientes",
      path: "/dashboard/customers",
      icon: <GroupsIcon style={{ color: "black" }}></GroupsIcon>,
    },
    {
      title: "Mi perfil",
      path: "/dashboard/profile",
      icon: <AccountCircleIcon style={{ color: "black" }}></AccountCircleIcon>,
    },
    {
      title: "Inventario",
      path: "/dashboard/inventory",
      icon: <InventoryIcon style={{ color: "black" }}></InventoryIcon>,
    },
  ];

  const handleRequestQuoteShipment = () => {
    socket.emit("generateQuote", data);
  };

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div style={{ marginTop: "20px" }}>
      <Grid
        container
        justifyContent={"center"}
        alignItems={"center"}
        marginBottom={"20px"}
      >
        <img
          style={{
            objectFit: "cover",
            imageRendering: "auto",
            margin: "10px",
          }}
          width={200}
          src="https://s3.us-east-2.amazonaws.com/enviapaqueteria/uploads/landing/images/countries/MEX/logo-dark.svg"
          alt="Logo Envia"
        />
      </Grid>

      {/* )} */}
      <Divider variant="middle" />
      <List>
        {firstMenu.map(({ path, title, icon }, index) => (
          <ListItem key={index} disablePadding>
            <Link
              href={path}
              style={{
                textDecoration: "none",
                color: "black",
                fontWeight: "bold",
              }}
            >
              <ListItemButton>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText style={{ fontWeight: "bold" }} primary={title} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </div>
  );

  React.useEffect(() => {
    socket.emit("inicio", 1); // Emmit id for user signed in app

    return () => {
      socket.off("mensaje");
    };
  }, []);

  socket.on("count", (data) => {
    console.log("Mensaje recibido:", data);
    setCount(count + parseInt(data));
  });
  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <ProtectedPage>
      <Box sx={{ display: "flex" }} fontStyle={gothic}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            display: { sm: "none" },
          }}
          style={{
            background: "rgb(0,152,158)",
            background:
              "linear-gradient(159deg, rgba(0,152,158,1) 0%, rgba(255,255,255,1) 100%)",
          }}
        >
          <Grid></Grid>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div"></Typography>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onTransitionEnd={handleDrawerTransitionEnd}
            onClose={handleDrawerClose}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                background: "rgb(0,152,158)",
                background:
                  "linear-gradient(159deg, rgba(0,152,158,1) 0%, rgba(255,255,255,1) 100%)",
                border: "none",
              },
            }}
          >
            {drawer}
          </Drawer>

          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                background: "rgb(0,152,158)",
                background:
                  "linear-gradient(159deg, rgba(0,152,158,1) 0%, rgba(255,255,255,1) 100%)",
                border: "none",
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Grid
          container
          alignItems={"start"}
          justifyContent={"center"}
          style={{
            width: "100vw",
            height: "100vh",
          }}
        >
          <Grid
            container
            item
            alignItems={"center"}
            justifyContent={"center"}
            p={2}
          >
            <Grid
              container
              item
              justifyContent={"center"}
              alignItems={"center"}
              gap={1}
              style={{ marginTop: "50px" }}
            >
              {count > 0 && (
                <Alert severity="info">
                  <AlertTitle>
                    Se han generado {count} cotizaciones que aún están
                    pendientes de revisión en su bandeja de entrada.
                  </AlertTitle>
                </Alert>
              )}
              <Button
                onClick={handleRequestQuoteShipment}
                variant="contained"
                endIcon={<AddCircleIcon />}
              >
                Solicitar Cotizacion
              </Button>
            </Grid>
          </Grid>
          {children}
        </Grid>
      </Box>
    </ProtectedPage>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
