import { Pipe, PipeTransform, Type } from "@angular/core";
import { IUser } from "../users/users-interface/users-interface";

@Pipe({
    name: 'CustomPipe',
    standalone: true
})
export class CustomPipe implements PipeTransform{
    transform(text: string): string {
    return `${text.substring(0, 19)}...`;
    }
}