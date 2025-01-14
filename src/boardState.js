class BoardState {
  constructor() {
    this.squares = [null, null, null, null, null, null, null, null, null];
    this.coveredNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    this.actionsTaken = [];
  }

  uncover(index, value) {
    this.squares[index] = value;
    this.actionsTaken.push({ name: "uncover", index: index, value: value });
    this.coveredNumbers.splice(this.coveredNumbers.indexOf(value), 1);
  }

  undo() {
    const action = this.actionsTaken.pop();
    if (action.name === "uncover") {
      this.coveredNumbers.push(this.squares[action.index]);
      this.squares[action.index] = null;
    }
  }

  clone() {
    const newBoardState = new BoardState();
    for (let action of this.actionsTaken) {
      if (action.name === "uncover") {
        newBoardState.uncover(action.index, action.value);
      }
    }
    return newBoardState;
  }
}

export default BoardState;
