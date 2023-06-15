import * as path from 'path';
import * as fs from 'fs';

export function getAllFilesFromDirectory(
  directoryPath: string,
  fileExtension?: string,
): string[] {
  // Проверяем, существует ли указанная директория
  if (!fs.existsSync(directoryPath)) {
    console.log(`Директория ${directoryPath} не существует.`);
    return [];
  }

  const files: string[] = fs.readdirSync(directoryPath);

  let result: string[] = [];

  for (const file of files) {
    const filePath = path.join(directoryPath, file);
    if (fs.statSync(filePath).isFile()) {
      if (fileExtension && path.extname(file) === fileExtension) {
        result.push(file);
      } else if (!fileExtension) {
        result.push(file);
      }
    } else {
      const nestedFiles = getAllFilesFromDirectory(filePath, fileExtension);
      result = result.concat(nestedFiles);
    }
  }

  return result;
}

export function getFilePath(dirPath: string, fileName: string) {
  return path.join(dirPath, fileName);
}

export function convertFileToBase64(buffer: Buffer) {
  return Buffer.from(buffer).toString('base64');
}
