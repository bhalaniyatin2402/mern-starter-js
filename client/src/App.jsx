import { useEffect } from "react";
import { useDispatch } from "react-redux";

import CustomRoutes from "./routes/CustomRoutes";
import { closeWebSocket, setupWebSocket } from "./redux/websocket";

import "./App.css";

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    // Setup WebSocket connection-
    setupWebSocket(dispatch)

    // Cleanup function to close WebSocket when component unmounts
    return () => closeWebSocket()
  },[])

  return (
    <>
      <CustomRoutes />
    </>
  );
}

export default App;
