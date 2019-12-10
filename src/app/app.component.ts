import { Component, ViewEncapsulation } from "@angular/core";
import { FormGroup, FormArray, FormControl } from "@angular/forms";
import { CustomerOption } from "./Model/CustomerOption";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { debounceTime, tap } from "rxjs/operators";
import { Order } from "./Model/Order";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "DemoAngular";

  public orderForm: FormGroup;
  public customerOptions: CustomerOption[] = [];

  constructor(
    // private orderService: OrderService,
    // private optionsService: OptionsService,
    // private router: Router
    // private location: Location
    // private route: ActivatedRoute,
  ) {}

  public ngOnInit() {
    this.orderForm = new FormGroup({
      customerID: new FormControl(""),
      details: new FormArray([]),
      employeeID: new FormControl(""),
      freight: new FormControl(""),
      orderDate: new FormControl(""),
      requiredDate: new FormControl(""),
      shipAddress: new FormControl(""),
      shipCity: new FormControl(""),
      shipCountry: new FormControl(""),
      shipName: new FormControl(""),
      shipPostalCode: new FormControl(""),
      shipRegion: new FormControl(""),
      shipVia: new FormControl(""),
      shippedDate: new FormControl("")
    });

    this.orderForm
      .get("customerID")
      .valueChanges.pipe(
        debounceTime(300),
        tap(val => {
          console.log("keyword:" + val);
        })
      )
      .subscribe(inputKeyword => {
        this.customerOptions = [];
        this.customerOptions.push({
          customerID: "CustA",
          companyName: "CustCompA"
        });
        this.customerOptions.push({
          customerID: "CustB",
          companyName: "CustCompB"
        });
        this.customerOptions.push({
          customerID: "CustC",
          companyName: "CustCompC"
        });
        this.customerOptions.push({
          customerID: "CustD",
          companyName: "CustCompD"
        });
        this.customerOptions.push({
          customerID: "CustE",
          companyName: "CustCompE"
        });
      });
  }

  public highlightFiltered(customerName: string) {
    console.log("highlightFiltered");

    const inputCustomerKeyword = this.orderForm.get("customerID").value;
    if (typeof inputCustomerKeyword === "string") {
      const pattern = inputCustomerKeyword
        .replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
        .split(" ")
        .filter(t => t.length > 0)
        .join("|");
      const regex = new RegExp(pattern, "gi");

      return inputCustomerKeyword
        ? customerName.replace(
            regex,
            match => `<span class="autocomplete-highlight">${match}</span>`
          )
        : customerName;
    }
    return customerName;
  }

  public displayCustomer(customOption: CustomerOption): string {
    if (customOption) {
      return `${customOption.customerID} / ${customOption.companyName}`;
    } else {
      return "";
    }
  }

  public onSubmit(submitData: Order) {
    if (typeof submitData.customerID === "object") {
      submitData.customerID = (submitData.customerID as CustomerOption).customerID;
    }
    console.log(submitData);
  }

  public onCustomerOptionChanged(e: MatAutocompleteSelectedEvent) {}
}
