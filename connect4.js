class Connect4{
  constructor(selector){
    this.ROWS=6;
    this.COLUMNS=7;
    this.selector=selector;
    this.createGrid();
    this.setupEventListeners();
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

        const $column=$('<div>').addClass('column empty').attr("data-column",column).attr("data-row",row);//create columns and give them values

        $row.append($column); //appends the columns to each row, so each row has 7 columns
      }
      $board.append($row); //add rows(with the appeneded columns) to the board
    }
  }
  setupEventListeners() {

    const $board=$(this.selector);
    function findLastEmptyCell(column){
      // finds all the cells in the column that are empty
      const cells= $(`.column[data-column='${column}']`);
      for(let i=cells.length-1; i>=0; i--)
      {
        const $cell=$(cells[i]);
        if($cell.hasClass('empty'))
        {
          return $cell;
        }
      }
      return nulll;
    }
    // JQuery will listen to mouse entering a column
    $board.on("mouseenter",".column.empty",function(){
      const column=$(this).data('column');
      const $lastEmptyCell=findLastEmptyCell(column);
      $lastEmptyCell.addClass('next-red')
    //  console.log(column);
    })

    $board.on('mouseleave', '.column',function(){
      $('.column').removeClass('next-red');
    })
  }
}
