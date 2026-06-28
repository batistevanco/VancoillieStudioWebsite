const required = (name: string) => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
};

export const env = {
  database: {
    host: () => required("DATABASE_HOST"),
    port: () => Number(process.env.DATABASE_PORT ?? "3306"),
    name: () => required("DATABASE_NAME"),
    user: () => required("DATABASE_USER"),
    password: () => required("DATABASE_PASSWORD"),
  },
  security: {
    sessionSecret: () => required("SESSION_SECRET"),
    appEncryptionKey: () => required("APP_ENCRYPTION_KEY"),
    isProduction: process.env.NODE_ENV === "production",
  },
  app: {
    baseUrl: () => process.env.APP_BASE_URL ?? "http://127.0.0.1:3000",
  },
  providers: {
    google: {
      clientId: () => required("GOOGLE_CLIENT_ID"),
      clientSecret: () => required("GOOGLE_CLIENT_SECRET"),
    },
    microsoft: {
      clientId: () => required("MICROSOFT_CLIENT_ID"),
      clientSecret: () => required("MICROSOFT_CLIENT_SECRET"),
      tenant: () => process.env.MICROSOFT_TENANT_ID ?? "common",
    },
  },
};
