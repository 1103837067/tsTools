import { toast as sonnerToast } from 'sonner';

/**
 * Toast 类型定义
 */
export interface ToastOptions {
  description?: string;
  duration?: number;
}

/**
 * 全局 Toast Hook
 * 提供统一的消息提示功能
 */
export const toast = {
  /**
   * 显示成功消息
   * @param message 消息内容
   * @param options 可选配置
   */
  success: (message: string, options?: ToastOptions) => {
    return sonnerToast.success(message, options);
  },

  /**
   * 显示错误消息
   * @param message 消息内容
   * @param options 可选配置
   */
  error: (message: string, options?: ToastOptions) => {
    return sonnerToast.error(message, options);
  },

  /**
   * 显示警告消息
   * @param message 消息内容
   * @param options 可选配置
   */
  warning: (message: string, options?: ToastOptions) => {
    return sonnerToast.warning(message, options);
  },

  /**
   * 显示信息消息
   * @param message 消息内容
   * @param options 可选配置
   */
  info: (message: string, options?: ToastOptions) => {
    return sonnerToast.info(message, options);
  },

  /**
   * 显示普通消息
   * @param message 消息内容
   * @param options 可选配置
   */
  message: (message: string, options?: ToastOptions) => {
    return sonnerToast(message, options);
  },

  /**
   * 显示加载消息
   * @param message 消息内容
   * @param options 可选配置
   */
  loading: (message: string, options?: ToastOptions) => {
    return sonnerToast.loading(message, options);
  },

  /**
   * 显示Promise消息
   * @param promise Promise对象
   * @param messages 不同状态的消息
   */
  promise: <T>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: Error) => string);
    }
  ) => {
    return sonnerToast.promise(promise, messages);
  },

  /**
   * 关闭指定的toast
   * @param toastId toast ID
   */
  dismiss: (toastId?: string | number) => {
    return sonnerToast.dismiss(toastId);
  },
};

export default toast;
