// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
// core components/views
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import { Sandbox } from "./../views/Sandbox/Sandbox";
import { ColorManager } from "./../views/Colors/ColorManager";
import { ProfileContainer } from "./../views/Profiles/ProfileContainer";
import { UsersContainer } from "./../views/Users/UsersContainer";
import { ClientContainer } from "./../views/Clients/ClientContainer";
// mis views

export class DashboardRoutes {
  get = () => {
    return this.routes;
  };

  routes = [
    {
      redirect: true,
      path: "/",
      to: "/dashboard",
      navbarName: "Redirect"
    },
    {
      path: "/dashboard",
      sidebarName: "Inicio",
      navbarName: "Inicio",
      icon: Dashboard,
      component: DashboardPage
    },
    {
      path: "/sandbox",
      sidebarName: "sandbox",
      navbarName: "sandbox",
      icon: "home",
      component: Sandbox
    },
    {
      path: "/users",
      sidebarName: "usuarios",
      navbarName: "usuarios",
      icon: "users",
      component: UsersContainer
    },
    {
      path: "/clients",
      sidebarName: "Clientes",
      navbarName: "Clientes",
      icon: "users",
      component: ClientContainer
    },
    {
      path: "/config/color",
      sidebarName: "Colores",
      navbarName: "Colores",
      icon: "brush",
      component: ColorManager
    },
    {
      path: "/config/permissions",
      sidebarName: "Perfiles",
      navbarName: "Perfiles",
      icon: "user-cog",
      component: ProfileContainer
    }
  ];
}
