import { Service, signal, WritableSignal } from '@angular/core';
import { SampleData } from '@org/models';

@Service()
export class AuthService {
  public data: WritableSignal<SampleData> = signal({
    name: 'name',
    age: 22,
  });
}
