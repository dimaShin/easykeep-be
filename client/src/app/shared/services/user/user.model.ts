import {ModelBase} from "../model.base";

export class User extends ModelBase {
  name: string;

  constructor(data) {
    super(data);
  }
}
