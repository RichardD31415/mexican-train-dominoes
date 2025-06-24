export default class Dominoe {
  private _faceA: number;
  private _faceB: number;
  private _isDouble: boolean;
  private _connectingDominoeFront: Dominoe | undefined;
  private _connectingDominoeBack: Dominoe | undefined;

  constructor(faceA?: number, faceB?: number) {
    if (faceA !== undefined && (faceA < 0 || faceA > 12)) {
      throw new Error("Face A must be between 0 and 12.");
    }
    if (faceB !== undefined && (faceB < 0 || faceB > 12)) {
      throw new Error("Face B must be between 0 and 12.");
    }
    this._faceA = faceA ?? Math.floor(Math.random() * 12);
    this._faceB = faceB ?? Math.floor(Math.random() * 12);
    this._isDouble = this._faceA === this._faceB;
  }

  get faceA(): number {
    return this._faceA;
  }

  set faceA(value: number) {
    this._faceA = value;
    this._isDouble = this._faceA === this._faceB;
  }

  get faceB(): number {
    return this._faceB;
  }

  set faceB(value: number) {
    this._faceB = value;
  }

  get isDouble(): boolean {
    return this._isDouble;
  }

  get connectingDominoeFront(): Dominoe | undefined {
    return this._connectingDominoeFront;
  }

  set connectingDominoeFront(value: Dominoe | undefined) {
    this._connectingDominoeFront = value;
  }

  get connectingDominoeBack(): Dominoe | undefined {
    return this._connectingDominoeBack;
  }

  set connectingDominoeBack(value: Dominoe | undefined) {
    this._connectingDominoeBack = value;
  }

  public toString(): string {
    return `Dominoe(${this._faceA}, ${this._faceB})`;
  }

  public hasFace(face: number): boolean {
    return this._faceA === face || this._faceB === face;
  }

  public sharesFaceWith(dominoe: Dominoe): boolean {
    return (
      this._faceA === dominoe._faceA ||
      this._faceA === dominoe._faceB ||
      this._faceB === dominoe._faceA ||
      this._faceB === dominoe._faceB
    );
  }

  public isConnectedTo(dominoe: Dominoe): boolean {
    return (
      this._connectingDominoeFront === dominoe ||
      this._connectingDominoeBack === dominoe
    );
  }

  public isHead(): boolean {
    return this._connectingDominoeFront === undefined;
  }

  public isTail(): boolean {
    return this._connectingDominoeBack === undefined;
  }

  public connectToFront(dominoe: Dominoe): void {
    if (dominoe === this) {
      throw new Error("Cannot connect a dominoe to itself.");
    }
    if (this._connectingDominoeFront) {
      throw new Error(
        "This dominoe's front is already connected to another dominoe."
      );
    }
    if (
      dominoe._connectingDominoeBack &&
      dominoe._connectingDominoeBack !== this
    ) {
      throw new Error(
        "The target dominoe is already connected to another dominoe in its back spot."
      );
    }
    if (!dominoe.hasFace(this._faceA) && !dominoe.hasFace(this._faceB)) {
      throw new Error(
        "Cannot connect to a dominoe that does not share a face with this dominoe."
      );
    }

    this._connectingDominoeFront = dominoe;
    dominoe._connectingDominoeBack = this;
  }

  public connectToBack(dominoe: Dominoe): void {
    if (dominoe === this) {
      throw new Error("Cannot connect a dominoe to itself.");
    }
    if (this._connectingDominoeBack) {
      throw new Error(
        "This dominoe's back is already connected to another dominoe."
      );
    }
    if (
      dominoe._connectingDominoeFront &&
      dominoe._connectingDominoeFront !== this
    ) {
      throw new Error(
        "The target dominoe is already connected to another dominoe in its front spot."
      );
    }
    if (!dominoe.hasFace(this._faceA) && !dominoe.hasFace(this._faceB)) {
      throw new Error(
        "Cannot connect to a dominoe that does not share a face with this dominoe."
      );
    }

    this._connectingDominoeBack = dominoe;
    dominoe._connectingDominoeFront = this;
  }

  public disconnectFromFront(): void {
    if (this._connectingDominoeFront) {
      this._connectingDominoeFront._connectingDominoeBack = undefined;
      this._connectingDominoeFront = undefined;
    }
  }

  public disconnectFromBack(): void {
    if (this._connectingDominoeBack) {
      this._connectingDominoeBack._connectingDominoeFront = undefined;
      this._connectingDominoeBack = undefined;
    }
  }

  public resetConnections(): void {
    this.disconnectFromFront();
    this.disconnectFromBack();
  }

  public clone(): Dominoe {
    const clone = new Dominoe(this._faceA, this._faceB);
    clone._isDouble = this._isDouble;
    return clone;
  }

  public equals(other: Dominoe): boolean {
    return (
      (this._faceA === other._faceA &&
        this._faceB === other._faceB &&
        this._isDouble === other._isDouble) ||
      (this._faceA === other._faceB &&
        this._faceB === other._faceA &&
        this._isDouble === other._isDouble)
    );
  }
}
