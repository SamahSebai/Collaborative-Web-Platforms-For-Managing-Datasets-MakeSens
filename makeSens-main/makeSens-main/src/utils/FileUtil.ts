
export class FileUtil {
    public static loadImageBase64(fileData: File): Promise<string | ArrayBuffer> {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          
          reader.onload = () => {
            const base64Data = reader.result;
            resolve(base64Data);
          };
          
          reader.onerror = reject;
          reader.readAsDataURL(fileData);
        });
      }
      

      public static loadImage(fileData: File): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
      
          reader.onload = () => {
            const arrayBuffer = reader.result as ArrayBuffer;
            const blob = new Blob([arrayBuffer], { type: fileData.type });
            const url = URL.createObjectURL(blob);
            
            const image = new Image();
            image.src = url;
            image.onload = () => resolve(image);
            image.onerror = reject;
          };
          
          reader.onerror = reject;
          reader.readAsArrayBuffer(fileData);
        });
      }
      
      

    public static loadImages(fileData: File[]): Promise<HTMLImageElement[]> {
        return new Promise((resolve, reject) => {
            const promises: Promise<HTMLImageElement>[] = fileData.map((data: File) => FileUtil.loadImage(data));
            Promise
                .all(promises)
                .then((values: HTMLImageElement[]) => resolve(values))
                .catch((error) => reject(error));
        });
    }

    public static readFile(fileData: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = (event: any) => {
                resolve(event?.target?.result);
            };
            reader.onerror = reject;
            reader.readAsText(fileData);
        });
    }

    public static readFiles(fileData: File[]): Promise<string[]> {
        return new Promise((resolve, reject) => {
            const promises: Promise<string>[] = fileData.map((data: File) => FileUtil.readFile(data));
            Promise
                .all(promises)
                .then((values: string[]) => resolve(values))
                .catch((error) => reject(error));
        });
    }

    public static extractFileExtension(name: string): string | null {
        const parts = name.split('.');
        return parts.length > 1 ? parts[parts.length - 1] : null;
    }

    public static extractFileName(name: string): string | null {
        const splitPath = name.split('.');
        let fName = '';
        for (const idx of Array(splitPath.length - 1).keys()) {
            if (fName === '') fName += splitPath[idx];
            else fName += '.' + splitPath[idx];
        }
        return fName;
    }
}