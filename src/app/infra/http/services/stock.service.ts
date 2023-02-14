import { HttpService } from '@nestjs/axios/dist';
import { HttpException, Injectable } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class StockService {
  private readonly receiverURL = `http://localhost:3001/stock` || '';

  constructor(private httpService: HttpService) {}

  async create(body: any) {
    await firstValueFrom(
      this.httpService.post(`${this.receiverURL}`, body).pipe(
        catchError((error: any) => {
          const message = error.response.data.message;
          throw new HttpException(
            Array.isArray(message) ? message.toString() : message,
            error.response.status || 0,
          );
        }),
      ),
    );
  }

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

  async edit(request: any) {
    const { id, body } = request;
    const { data } = await firstValueFrom(
      this.httpService.patch(`${this.receiverURL}/${id}`, body).pipe(
        catchError((error: any) => {
          const message = error.response.data.message;
          throw new HttpException(
            Array.isArray(message) ? message.toString() : message,
            error.response.status || 0,
          );
        }),
      ),
    );
    return data;
  }

  async delete(request: any) {
    const { id } = request;
    const { data } = await firstValueFrom(
      this.httpService.patch(`${this.receiverURL}/delete/${id}`).pipe(
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
