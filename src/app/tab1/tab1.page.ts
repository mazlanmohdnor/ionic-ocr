import { Component } from '@angular/core';
import { OCR, OCRResult, OCRSourceType } from '@ionic-native/ocr/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

const win: any = window;

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
    text: string;
    image = 'assets/scan.png';
    foundText: boolean = false;

    constructor(
        private ocr: OCR,
        private camera: Camera,
    ) {
    }

    async onScan() {
        // camera
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.PNG,
            mediaType: this.camera.MediaType.PICTURE,
            saveToPhotoAlbum: false,
            allowEdit: false,
            sourceType: 1,
            correctOrientation: true
        };
        const imageData = await this.camera.getPicture(options);
        console.log('imageData :', imageData);
        this.image = win.Ionic.WebView.convertFileSrc(imageData);
        const ocrResult: OCRResult = await this.ocr.recText(OCRSourceType.NORMFILEURL, imageData);
        console.log('ocrResult :', ocrResult);
        this.foundText = ocrResult.foundText;
        this.text = ocrResult && ocrResult.blocks && ocrResult.blocks.blocktext.toString();
    }


    reset() {
        this.foundText = false;
        this.image = undefined;
        this.text = undefined;
        this.camera.cleanup();
    }
}
