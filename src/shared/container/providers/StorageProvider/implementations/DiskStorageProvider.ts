import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';
import IStorageProvider from '../models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tempFolder, file),
      path.resolve(uploadConfig.uploadFolder, file),
    );

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadFolder, file);

    // verifica se o arquivo existe
    try {
      // retorna informações sobre o arquivo, se naõ encontrar ele retorna um erro, que o catch pega
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    // deleta o arquivo em questão
    await fs.promises.unlink(filePath);
  }
}

export default DiskStorageProvider;
