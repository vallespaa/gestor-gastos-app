import 'dotenv/config';

export default {
  expo: {
    name: 'gestor-gastos-app',
    slug: 'gestor-gastos-app',
    version: '0.3.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    newArchEnabled: true,
    splash: {
      image: './assets/splash-icon.png',
      resizeMode: 'contain',
      backgroundColor: '#3B82F6',
      dark: {
        image: './assets/splash-icon.png',
        backgroundColor: '#121212'
      }
    },
    ios: {
      supportsTablet: true,
      icon: {
        light: './assets/ios-light.png',
        dark: './assets/ios-dark.png',
        tinted: './assets/ios-tinted.png'
      }
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        monochromeImage: './assets/adaptive-icon.png',
        backgroundColor: '#3B82F6'
      },
      edgeToEdgeEnabled: true,
      package: 'com.vallespaa.gestorgastosapp'
    },
    web: {
      favicon: './assets/adaptive-icon.png'
    },
    extra: {
      eas: {
        projectId: 'ce549c28-2a4b-4539-9ddf-971425830c38'
      },
      feedbackEmail: process.env.FEEDBACK_EMAIL
    }
  }
};
