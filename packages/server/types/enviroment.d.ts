declare namespace NodeJS {
  interface ProcessEnv {
    SECRET: string;
    EMAIL: string;
    EMAIL_PASSWORD: string;
    SERVER_URL: string;
    PORT: number;
    CLIENT_URL: string;
    ALLOW_IMAGES: string;
    CLOUD_NAME: string;
    CLOUDINARY_API_KEY: string;
    API_SECRET: string;
    PAYPAL_SANDBOX_ACCOUNT: string;
    PAYPAL_CLIENTID: string;
    PAYPAL_SECRET: string;
  }
}
