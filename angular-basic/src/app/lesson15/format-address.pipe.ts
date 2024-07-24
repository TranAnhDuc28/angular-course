import {Pipe, PipeTransform} from "@angular/core";

interface Address {
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

@Pipe({
  name: 'formatAddress'
})
export class FormatAddressPipe implements PipeTransform {

  transform(address: Address, param1?: string): string {
    console.log('pipe formatAddress', address, param1)
    return address.address1 + ' ' +
      address.address2 + ', ' +
      address.city + ', ' +
      address.state + ' ' +
      address.zip + ', ' +
      address.country
  }
}
