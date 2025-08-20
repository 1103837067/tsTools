import 'react-i18next';
import zhCN from '../locales/zh-CN.json';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      translation: typeof zhCN;
    };
  }
}
