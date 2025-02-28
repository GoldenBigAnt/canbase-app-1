import io from "socket.io-client";
import { UPLOAD_URI } from "@/config/env";

const Socket = io(UPLOAD_URI as string, {
  transports: ["websocket", "polling"],
});

export default Socket;
