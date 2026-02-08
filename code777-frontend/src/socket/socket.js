import { ENV } from "../../env.js";

export const socket = io(ENV.BACKEND_URL);