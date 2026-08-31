import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'client-app',
  webDir: '../../dist/apps/client-app/browser',
  server: {
    androidScheme: 'https',
  },
};

export default config;
