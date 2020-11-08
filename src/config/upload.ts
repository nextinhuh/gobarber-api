/* eslint-disable @typescript-eslint/ban-types */
import path from 'path'; // módulo para ter o campinho da pasta independente do sistema operacional utilizando o __dirname
import multer, { StorageEngine } from 'multer';
import crypto from 'crypto'; // módulo do node qwue serve para criar Hash's e criptografica

const tempFolder = path.resolve(__dirname, '..', '..', 'tmp');

interface IUploadConfig {
  driver: 's3' | 'disk';

  tempFolder: string;

  uploadFolder: string;

  multer: {
    storage: StorageEngine;
  };

  config: {
    disk: {};
    aws: {
      bucket: string;
    };
  };
}

export default {
  driver: process.env.STORAGE_DRIVER,

  tempFolder,
  uploadFolder: path.resolve(tempFolder, 'uploads'),

  multer: {
    storage: multer.diskStorage({
      destination: tempFolder,
      filename(request, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex');
        const fileName = `${fileHash}-${file.originalname}`;

        return callback(null, fileName);
      },
    }),
  },

  config: {
    disk: {},
    aws: {
      bucket: 'app-gobarber-50',
    },
  },
} as IUploadConfig;
