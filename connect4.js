class Connect4{
  constructor(selector){
    this.ROWS=6;
    this.COLUMNS=7;
    this.selector=selector;
    this.createGrid();
  }
  //$ is shortcut for jquery
  createGrid(){
    const $board = $(this.selector);
    for(let row=0; row<this.ROWS; row++)
    {
      const $row=$('<div>').addClass('row'); //each row will creat this div
      //  .addClass('row'); //adds it to class row

      for(let column=0; column<this.COLUMNS; column++)
      {
        const $column=$('<div>').addClass('column empty');//create columnds

        $row.append($column); //appends the columns to each row, so each row has 7 columns
      }
      $board.append($row); //add rows(with the appeneded columns) to the board
    }
  }
}
