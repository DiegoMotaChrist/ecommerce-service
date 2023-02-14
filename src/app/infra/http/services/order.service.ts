import { HttpService } from '@nestjs/axios/dist';
import { HttpException, Injectable } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class OrderService {
  private readonly receiverURL = `http://localhost:3001/order` || '';

  constructor(private httpService: HttpService) {}

  async findById(request: any) {
    const { id } = request;
    const { data } = await firstValueFrom(
      this.httpService.get(`${this.receiverURL}/${id}`).pipe(
        catchError((error: any) => {
          throw new HttpException(
            error.response.data.message,
            error.response.status || 0,
          );
        }),
      ),
    );
    return data;
  }

  async findAll() {
    const { data } = await firstValueFrom(
      this.httpService.get(`${this.receiverURL}`).pipe(
        catchError((error: any) => {
          throw new HttpException(
            error.response.data.message,
            error.response.status || 0,
          );
        }),
      ),
    );
    return data;
  }
}
