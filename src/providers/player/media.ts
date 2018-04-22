export default class Media {
    name: string;
    id: string;
    type: string;
    duration: string;
    rawName: string;
    constructor(filename: string) {
      // decode the path
      let obj = JSON.parse(atob(filename))
      this.rawName = filename
      this.name = obj.name
      this.id = obj.id
      this.type = obj.type,
      this.duration = obj.duration
    }

}
