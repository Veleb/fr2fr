import { ComponentInterface, MetadataInterface } from "types/extractor-types";

export class Component implements ComponentInterface {
  name: string = '';
  decorator: string = '';
  metadata: MetadataInterface = {};

  setName(name: string) {
    this.name = name;
    return this;
  }

  setDecorator(decorator: string) {
    this.decorator = decorator;
    return this;
  }

  setMetadata(metadata: MetadataInterface) {
    this.metadata = metadata;
    return this;
  }
  
}
