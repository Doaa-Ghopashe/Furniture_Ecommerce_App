import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faExclamationTriangle, faTimesCircle, faUpload } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-upload-area',
  templateUrl: './upload-area.component.html',
  styleUrls: ['./upload-area.component.css']
})
export class UploadAreaComponent {
  @Output() newItemEvent = new EventEmitter<DataTransfer>();
  
  form!: FormGroup; 

  @Input() isMultiple = false;

  dataTransfer!: DataTransfer;

  errorIcon!: IconDefinition;
  xIcon!: IconDefinition;
  uploadIcon!: IconDefinition;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.xIcon = faTimesCircle;
    this.uploadIcon = faUpload
    this.errorIcon = faExclamationTriangle;

    this.form = this.fb.group({
      image: ['', [Validators.required]]
    })

    this.dataTransfer = new DataTransfer();
  }

  selectFile() {
    let element = document.querySelector('input[type=file]') as HTMLInputElement
    element.click();
    setTimeout(() => {
      this.form.controls['image'].markAsTouched()
    }, 1000);
  }

  fetchFiles(e: any) {

    if (this.isMultiple) {
      if ((e.target.files.length > 5 || this.dataTransfer.items.length > 5)) {
        return console.log("the limit of images should not exceed 5")
      }
      for (const file of e.target.files) {
        this.dataTransfer.items.add(file);
      }
    } else {
      this.dataTransfer.clearData();
      this.dataTransfer.items.add(e.target.files[0]);
    }
    this.newItemEvent.emit(this.dataTransfer)
    this.mapFiles();
  }

  mapFiles() {
    const listOfImgs = document.getElementsByClassName('list-group')[0];
    listOfImgs.innerHTML = '';

    if (this.dataTransfer.files.length > 0) {

      for (let i = 0; i < this.dataTransfer.files.length; i++) {

        const imgName = this.dataTransfer.files[i].name,
          imgSize = (this.dataTransfer.files[i].size / (1024)).toFixed(2),
          imgType = this.dataTransfer.files[i].type.split('/')[1],
          imgSrc = URL.createObjectURL(this.dataTransfer.files[i]);

        this.displayImg(listOfImgs, imgName, Number(imgSize), imgType, imgSrc, i);
      }
    }
  }


  displayImg(Imgs: Element, name: string, size: number, type: string, src: string, index: number) {

    const listItem = document.createElement('li'),
      itemInfo = document.createElement('span'),
      deletebtn = document.createElement('i'),
      image = document.createElement('img');

    image.src = src;

    itemInfo.innerHTML = "<b>File name</b>: " +
      ((name.length > 10) ?
        name.substring(0, 20) + '...' + type
        : name);

    itemInfo.innerHTML += "</br><b>File size</b>: " + size + " KB";

    image.classList.add('uploaded-image')

    listItem.appendChild(image);

    listItem.appendChild(itemInfo);

    listItem.classList.add('uploaded-image-data')

    deletebtn.setAttribute('class', 'deletebtn fa-solid fa-circle-xmark')

    deletebtn.setAttribute('id', String(index));

    deletebtn.onclick = this.deleteImg

    listItem.appendChild(deletebtn);

    Imgs.appendChild(listItem);

  }

  deleteImg = (e: any) => {

    const index = e.target.id;

    this.dataTransfer.items.remove(index);

    if(this.dataTransfer.items.length ==0){
      this.form.controls['image'].setValue('')
    }
    this.mapFiles();

  }

}
