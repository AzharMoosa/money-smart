import { API_URL } from "../../config/index";
import axios from "axios";

export default async function loginHandler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `${API_URL}/api/users/login`,
      { email, password },
      config
    );

    if (data) {
      res.status(200).json(data);
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
