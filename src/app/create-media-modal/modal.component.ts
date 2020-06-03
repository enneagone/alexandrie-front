import {
  Component,
  ViewEncapsulation,
  ElementRef,
  Input,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from './modal.service';

@Component({
  selector: 'alx, jw-modal',
  templateUrl: 'modal.component.html',
  styleUrls: ['modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() id: string;
  private readonly element: any;
  addMediaForm: FormGroup;
  submitted = false;

  constructor(
    private modalService: ModalService,
    private el: ElementRef,
    private formBuilder: FormBuilder,
  ) {
    this.element = el.nativeElement;
  }
  get form() {
    return this.addMediaForm.controls;
  }

  ngOnInit(): void {
    // ensure id attribute exists
    if (!this.id) {
      console.error('modal must have an id');
      return;
    }
    this.addMediaForm = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      author: ['', Validators.required],
      date: ['', Validators.required],
      description: ['', Validators.required],
    });
    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    document.body.appendChild(this.element);
    // close modal on background click
    this.element.addEventListener('click', (el: any) => {
      if (el.target.className === 'jw-modal') {
        this.close();
      }
    });

    this.modalService.add(this);
  }

  // remove self from modal service when component is destroyed
  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.remove();
  }

  // open modal
  open(): void {
    this.element.style.display = 'block';
    document.body.classList.add('jw-modal-open');
  }

  // close modal
  close(): void {
    this.element.style.display = 'none';
    document.body.classList.remove('jw-modal-open');
    this.addMediaForm.reset();
  }

  onSubmit() {
    this.submitted = true;
    if (this.addMediaForm.valid) {
      this.close();
      console.warn('Done');
      this.addMediaForm.reset();
    }
  }
}
