import LoginIndex from "../Pages/logAndRegistr/loginAndRegPage.jsx";
import Chat from "../Pages/chat/ChatPage.jsx";

export default [
  {
    path: "/",
    element: <LoginIndex />,
  },
  {
    path: "/chat",
    element: <Chat />,
  },
];
