// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
// core components/views
import DashboardPage from "views/Dashboard/Dashboard.jsx";
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
    }
  ];
}
