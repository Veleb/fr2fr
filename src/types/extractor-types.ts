export interface ComponentInterface {
  name: string,
  decorator: string,
}

export interface MetadataInterface {
  [key: string]: string | string[] | boolean | undefined;
  selector?: string;
  templateUrl?: string;
  styleUrls?: string | string[];
  imports?: string | string[];
  standalone?: boolean;
}
