

export class NotAuthenticated extends Error {
  constructor(message: string) {
    super("not_authenticated");
    this.name = this.constructor.name;
    this.message = message;

    Object.setPrototypeOf(this, new.target.prototype);
  }
}
