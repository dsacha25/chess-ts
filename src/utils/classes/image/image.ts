import { Area } from 'react-easy-crop/types';
import { BaseImage } from '../../types/util/base-image/base-image';

class Photo {
	getBase64(blob: Blob): Promise<string> {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(blob);
			reader.onload = () => {
				if (reader.result) {
					if (typeof reader.result === 'string') resolve(reader.result);
				}
			};
			reader.onerror = (error) => reject(error);
		});
	}

	async createImage(url: string | ArrayBuffer): Promise<HTMLImageElement> {
		return new Promise((resolve, reject) => {
			const image = new Image();
			image.addEventListener('load', () => resolve(image));
			image.addEventListener('error', (error) => reject(error));
			image.setAttribute('crossOrigin', 'anonymous');
			if (typeof url === 'string') {
				image.src = url;
			}
		});
	}

	async fileToBaseImage(file: File): Promise<BaseImage> {
		const image = await this.getBase64(file);

		return {
			image,
			upload: file,
			name: file.name,
		};
	}

	dataURLtoFile(dataURL: string, fileName: string) {
		let arr = dataURL.split(',');
		let match = arr[0].match(/:(.*?);/);
		let mime;
		if (match) {
			mime = match[1];
		}
		let baseString = atob(arr[1]);
		let n = baseString.length;
		let u8arr = new Uint8Array(n);

		while (n--) {
			u8arr[n] = baseString.charCodeAt(n);
		}

		return new File([u8arr], fileName, { type: mime });
	}

	getCroppedImage = async (
		inputImage: BaseImage,
		crop: Area
	): Promise<BaseImage> => {
		const image = await this.createImage(inputImage.image);
		const canvas = document.createElement('canvas');
		const context = canvas.getContext('2d');

		canvas.width = crop.width;
		canvas.height = crop.height;

		context?.drawImage(
			image,
			crop.x,
			crop.y,
			crop.width,
			crop.height,
			0,
			0,
			canvas.width,
			canvas.height
		);

		const reader = new FileReader();

		return new Promise((resolve) => {
			canvas.toBlob((blob) => {
				if (blob) {
					reader.readAsDataURL(blob);
					reader.onloadend = async () => {
						if (typeof reader.result === 'string') {
							const upload = this.dataURLtoFile(reader.result, inputImage.name);
							const file = await this.getBase64(upload);

							if (typeof file === 'string') {
								const image: BaseImage = {
									image: file,
									upload,
									name: inputImage.name,
								};

								resolve(image);
							}
						}
					};
				}
			}, 'image/jpeg');
		});
	};
}

export const photo = new Photo();

export default Photo;
