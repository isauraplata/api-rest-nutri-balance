import jwt from "jsonwebtoken";
import generateTokens from "../../users/infrastructure/utils/generateToke";

// Mock del módulo `jsonwebtoken`
jest.mock("jsonwebtoken");

describe("generateTokens", () => {
  const mockUser = {
    id: 1,
    uuid: "mock-uuid",
    email: "a@example.com",
  };

  beforeEach(() => {
    // Limpiar los mocks antes de cada test
    jest.clearAllMocks();

    // Simular las variables de entorno
    process.env.ACCESS_TOKEN_PRIVATE_KEY = "mockAccessTokenPrivateKey";
    process.env.REFRESH_TOKEN_PRIVATE_KEY = "mockRefreshTokenPrivateKey";
  });

  it("should generate access and refresh tokens for a valid user", async () => {
    // Mock de los valores de los tokens
    const mockAccessToken = "mockAccessToken";
    const mockRefreshToken = "mockRefreshToken";

    // Mock del comportamiento de `jwt.sign`
    (jwt.sign as jest.Mock)
      .mockReturnValueOnce(mockAccessToken) // Primer llamado genera el accessToken
      .mockReturnValueOnce(mockRefreshToken); // Segundo llamado genera el refreshToken

    // Llamar a la función para generar los tokens
    const tokens = await generateTokens(mockUser);

    // Verificar que se llamaron correctamente los métodos de `jwt.sign`
    expect(jwt.sign).toHaveBeenCalledTimes(2);
    expect(jwt.sign).toHaveBeenCalledWith(
      { _id: mockUser.id, uuid: mockUser.uuid },
      process.env.ACCESS_TOKEN_PRIVATE_KEY,
      { expiresIn: "20m" }
    );
    expect(jwt.sign).toHaveBeenCalledWith(
      { _id: mockUser.id, uuid: mockUser.uuid },
      process.env.REFRESH_TOKEN_PRIVATE_KEY,
      { expiresIn: "7d" }
    );

    // Verificar que la respuesta contiene los tokens generados
    expect(tokens).toEqual({
      accessToken: mockAccessToken,
      refreshToken: mockRefreshToken,
    });
  });
});
