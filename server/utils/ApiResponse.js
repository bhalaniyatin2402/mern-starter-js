export class AppResponse {
  constructor(stausCode, data, message = "success") {
    this.success = stausCode < 400;
    this.message = message;
    this.data = data;
  }
}
