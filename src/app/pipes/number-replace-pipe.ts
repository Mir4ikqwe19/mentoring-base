import { Pipe, PipeTransform } from "@angular/core";
import { pipe } from "rxjs";

@Pipe({
    name: 'CustomNumberPipe',
    standalone: true
})
export class CustomNumberPipe implements PipeTransform {
    transform(phone: string | undefined): string {
        if (!phone) return '';
        return phone.replace(/[-()x\s.]/g, '');
    }
}