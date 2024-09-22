// import jwt from "jsonwebtoken";

// const generateTokens = async (user: any) => {
//   try {
//     const payload = { _id: user.id, uuid: user.uuid, email: user.email };
    
//     const accessToken = jwt.sign(
//       payload,
//       process.env.ACCESS_TOKEN_PRIVATE_KEY as string,
//       { expiresIn: "20m" }
//     );

//     const refreshToken = jwt.sign(
//       payload,
//       process.env.REFRESH_TOKEN_PRIVATE_KEY as string,
//       { expiresIn: "7d" }
//     );

//     return Promise.resolve({ accessToken, refreshToken });
//   } catch (error) {
//     return Promise.reject(error);
//   }
// };

// export default generateTokens;

import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();
const generateTokens = async (user: any) => {
  const { id, uuid, email } = user;

  // Verificar que las claves secretas estén definidas
  const accessTokenPrivateKey = process.env.ACCESS_TOKEN_PRIVATE_KEY;
  const refreshTokenPrivateKey = process.env.REFRESH_TOKEN_PRIVATE_KEY;

  if (!accessTokenPrivateKey || !refreshTokenPrivateKey) {
    throw new Error("Access or refresh token private key is not defined");
  }

  const payload = { _id: id, uuid, email };

  try {
    const accessToken = jwt.sign(payload, accessTokenPrivateKey, { expiresIn: "20m" });
    const refreshToken = jwt.sign(payload, refreshTokenPrivateKey, { expiresIn: "7d" });

    return { accessToken, refreshToken }; // Simplificado, no es necesario Promise.resolve
  } catch (error) {
    console.error("Error generating tokens:", error);
    throw new Error("Failed to generate tokens");
  }
};

export default generateTokens;
