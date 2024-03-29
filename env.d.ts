declare namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV?: string;
      JWT_SECRET?: Secret | GetPublicKeyOrSecret;
    }
  }
  