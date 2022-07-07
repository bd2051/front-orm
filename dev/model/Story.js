import {Author} from "./Author";
import {FormEntity, FormString} from "../../src";

export class Story {
  constructor() {
    this.name = new FormString()
    this.author = new FormEntity(Author)
  }
}