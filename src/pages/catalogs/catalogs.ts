import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';


@IonicPage()
@Component({
  selector: 'page-catalogs',
  templateUrl: 'catalogs.html',
})
export class CatalogsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private document: DocumentViewer, private file: File,
  private transfer: FileTransfer, private platform: Platform) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CatalogsPage');
  }

  openLocalPdf(){
    console.log("Open Local PDF");
    const options: DocumentViewerOptions = {
      // Create list of options here.
      title: 'PDF document'
    };
    this.document.viewDocument('assets/5-tools.pdf', 'application/pdf', options);
  }

  downloadAndOpenPdf(){
    console.log("Download and Open PDF");

    let path = null;

    if(this.platform.is('ios')){
      path = this.file.documentsDirectory;
    } else {
      path = this.file.dataDirectory;
    }

    const transfer  = this.transfer.create();
    transfer.download('https://devdatic.com/html/5-simple-hacks-LBT.pdf', path + 'myfile.pdf')
    .then(entry => {
      let url = entry.toUrl();
      this.document.viewDocument(url, 'application/pdf', {});
    });
  }

}
