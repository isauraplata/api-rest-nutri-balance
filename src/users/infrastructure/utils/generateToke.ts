import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();
const generateTokens = async (user: any) => {
  const { id, uuid } = user;

  // Verificar que las claves secretas estén definidas
  const accessTokenPrivateKey = process.env.ACCESS_TOKEN_PRIVATE_KEY;
  const refreshTokenPrivateKey = process.env.REFRESH_TOKEN_PRIVATE_KEY;

  if (!accessTokenPrivateKey || !refreshTokenPrivateKey) {
    throw new Error("Access or refresh token private key is not defined");
  }

  const payload = { _id: id, uuid };

  try {
    const accessToken = jwt.sign(payload, accessTokenPrivateKey, { expiresIn: "20m" });
    const refreshToken = jwt.sign(payload, refreshTokenPrivateKey, { expiresIn: "7d" });

    return { accessToken, refreshToken }; 
  } catch (error) {
    console.error("Error generating tokens:", error);
    throw new Error("Failed to generate tokens");
  }
};

export default generateTokens;
