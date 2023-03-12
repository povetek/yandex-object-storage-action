export interface IActionInputs {
  accessKeyId: string;
  secretAccessKey: string;
  bucket: string;
  folderPath: string;
  clear: boolean;
}

export type Logger = (message: string) => void;

export const YANDEX_CLOUD_ENDPOINT = 'https://storage.yandexcloud.net';
export const YANDEX_CLOUD_REGION = 'ru-central1';
