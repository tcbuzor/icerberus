export interface ICerbacWhatPropView {
  name?: string;
  value?: string;
  condition?: string;
}

export class CerbacWhatPropView implements ICerbacWhatPropView {
  constructor(
    public name?: string,
    public value?: string,
    public condition?: string,
  ) {}
}

