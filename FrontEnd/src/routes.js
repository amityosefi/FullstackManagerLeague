import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage")
  },
  {
    path: "/PlayerPage/:playerId",
    name: "PlayerPage",
    component: () => import("./components/PlayerPage")
  },
  {
    path: "/CoachPage/:coachId",
    name: "CoachPage",
    component: () => import("./components/CoachPage")
  },
  {
    path: "/TeamHomePage/:teamId",
    name: "TeamHomePage",
    component: () => import("./components/TeamHomePage")
  },
  {
    path: "/Search",
    name: "Search",
    component: () => import("./pages/SearchPage")
  },
  {
    path: "/About",
    name: "About",
    component: () => import("./pages/AboutPage")
  },
  {
    path: "/CurrentStageGames",
    name: "CurrentStageGames",
    component: () => import("./pages/CurrentStageGamesPage")
  },
  {
    path: "/Manager",
    name: "Manager",
    component: () => import("./pages/ManagerPage")
  },
  {
    path: "/FavoriteGames",
    name: "FavoriteGames",
    component: () => import("./pages/FavoriteGamesPage")
  },
  {
    path: "/FavoriteTeams",
    name: "FavoriteTeams",
    component: () => import("./pages/FavoriteTeamsPage")
  },
  {
    path: "/FavoritePlayers",
    name: "FavoritePlayers",
    component: () => import("./pages/FavoritePlayersPage")
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound
  },
];

export default routes;
