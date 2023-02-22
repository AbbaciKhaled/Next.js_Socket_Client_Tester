import { useEffect, useState } from "react";
import "../styles/globals.css";
const { io } = require("socket.io-client");

function useSocket(url, token) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketIo = io(url, {
      auth: {
        token: token?.user_token,
      },
    });

    setSocket(socketIo);

    function cleanup() {
      socketIo.disconnect();
    }
    return cleanup;
  }, [token?.user_token, url]);

  return socket;
}

export default function App({ Component, pageProps }) {
  const token = {
    user_token: "USER_TOKEN",
  };

  const socket = useSocket("http://localhost:4000", token);

  useEffect(() => {
    if (token.user_token) {
      if (socket) {
        socket.on("newNotification", (data) => {
          alert(JSON.stringify(data));
        });
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  return <Component {...pageProps} />;
}
