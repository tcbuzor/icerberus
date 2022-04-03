export interface ICerbacWhoPropView {
  name?: string;
  value?: string;
  condition?: string;
}

export class CerbacWhoPropView implements ICerbacWhoPropView {
  constructor(
    public name?: string,
    public value?: string,
    public condition?: string,
  ) {}
}

