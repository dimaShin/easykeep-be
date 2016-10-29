export class ModelBase {

  id: string = '';
  createdAt: Date;
  updatedAt: Date;

  constructor(data) {
    Object.assign(this, data, {
      createdAt: new Date((data.createdAt as string)),
      updatedAt: new Date((data.updatedAt as string))
    });
  }

}
