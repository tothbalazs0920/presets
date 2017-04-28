export class Preset {
  _id: string;
  name: string;
  technology: string;
  soundcloudUrl: string;
  description: string;
  genre: string[];
  numberOfDownLoads: number;
  amp: string[];
  cabinet: string[];
  michrophones: string[];
  presetAuthor: string;
  lead: boolean;
  clean: boolean;
  rythm: boolean;
  author: string;
  album: string;
  songTitle: string;
  presetId: string;
  img: string;
  price: number;
  currency: string;
  audioFileId: string;
  originalAudoFileName: string;
  email: string;
  constructor(theName: string) { this.name = theName; }
}