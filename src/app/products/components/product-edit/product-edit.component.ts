import { Component, OnInit, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Product } from '../../product';
import { GenericValidator } from '../../../shared/generic-validator';
import { NumberValidators } from '../../../shared/number.validator';

@Component({
  selector: 'pm-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductEditComponent implements OnInit, OnChanges {

  @Input() selectedProduct: Product;
  @Input() errorMessage: string;

  @Output() deleteProduct = new EventEmitter<number>();
  @Output() createProduct = new EventEmitter<Product>();
  @Output() updateProduct = new EventEmitter<Product>();

  pageTitle = 'Product Edit';
  product: Product | null;
  productForm: FormGroup;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(private fb: FormBuilder) {

    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      productName: {
        required: 'Product name is required.',
        minlength: 'Product name must be at least three characters.',
        maxlength: 'Product name cannot exceed 50 characters.'
      },
      productCode: {
        required: 'Product code is required.'
      },
      starRating: {
        range: 'Rate the product between 1 (lowest) and 5 (highest).'
      }
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    // Define the form group
    this.productForm = this.fb.group({
      productName: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      productCode: ["", Validators.required],
      starRating: ["", NumberValidators.range(1, 5)],
      description: ""
    });

    // Watch for value changes
    this.productForm.valueChanges.subscribe(value => this.displayMessage = this.genericValidator.processMessages(this.productForm));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedProduct) {
      this.displayProduct(<Product>changes.selectedProduct.currentValue);
    }
  }

  // Also validate on blur
  // Helpful if the user tabs through required fields
  blur(): void {
    this.displayMessage = this.genericValidator.processMessages(this.productForm);
  }

  displayProduct(product: Product | null): void {
    // Set the local product property
    this.product = product;

    if (this.product && this.productForm) {
      this.productForm.reset();
      this.updateComponentTitle();

      this.productForm.patchValue({
        productName: this.product.productName,
        productCode: this.product.productCode,
        starRating: this.product.starRating,
        description: this.product.description
      });
    }
  }

  cancelEdit(): void {
    this.displayProduct(this.product);
  }

  delete(): void {
    if (this.product && this.product.id) {
      if (confirm(`Really delete the product: ${this.product.productName}?`))
        this.deleteProduct.emit(this.product.id);
    }
  }

  saveProduct(): void {
    if (this.productForm.valid) {
      if (this.productForm.dirty) {

        const product = { ...this.product, ...this.productForm.value };

        product.id === 0
          ? this.createProduct.emit(product)
          : this.updateProduct.emit(product);
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  private updateComponentTitle(): void {
    this.product.id === 0
      ? this.pageTitle = 'Add Product'
      : this.pageTitle = `Edit Product: ${this.product.productName}`;
  }

}