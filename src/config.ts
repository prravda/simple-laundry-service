import * as dotenv from 'dotenv';
dotenv.config();

export interface ConfigList {
  jwtSecret: string;
  portNumber: string;
  jwtAlgorithm: string;
  databaseName: string;
  jwtAudience: string;
  jwtIssuer: string;
  accessTokenExpiresIn: string;
  refreshTokenExpiresIn: string;
}

export const getConfig = (): ConfigList => {
  const {
    PORT,
    JWT_ALGORITHM,
    JWT_SECRET,
    JWT_AUDIENCE,
    JWT_ISSUER,
    DATABASE_NAME,
    ACCESS_TOKEN_EXPIRES_IN,
    REFRESH_TOKEN_EXPIRES_IN,
  } = process.env;
  if (
    !PORT ||
    !JWT_ALGORITHM ||
    !JWT_SECRET ||
    !JWT_AUDIENCE ||
    !JWT_ISSUER ||
    !DATABASE_NAME ||
    !ACCESS_TOKEN_EXPIRES_IN ||
    !REFRESH_TOKEN_EXPIRES_IN
  ) {
    throw new Error(); // TODO: Define the case of this error
  }
  return {
    jwtSecret: JWT_SECRET,
    jwtAlgorithm: JWT_ALGORITHM,
    portNumber: PORT,
    jwtAudience: JWT_AUDIENCE,
    jwtIssuer: JWT_ISSUER,
    databaseName: DATABASE_NAME,
    accessTokenExpiresIn: ACCESS_TOKEN_EXPIRES_IN,
    refreshTokenExpiresIn: REFRESH_TOKEN_EXPIRES_IN,
  };
};
