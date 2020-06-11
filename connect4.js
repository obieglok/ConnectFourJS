class Connect4{
  constructor(selector){
    this.ROWS=6;
    this.COLUMNS=7;
    this.selector=selector;
    this.player='red';
    this.isGameOver=false;
    this.onPlayerMove = function() {};
    this.createGrid();
    this.setupEventListeners();
  }
  //$ is shortcut for jquery
  createGrid(){
    const $board = $(this.selector);
    $board.empty();
    this.isGameOver=false;
    this.player='red';
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
    const $board =$(this.selector);
    const that=this;
  //  const $board=$(this.selector);
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
      return null;
    }
    // JQuery will listen to mouse entering a column
    $board.on("mouseenter",".column.empty",function(){
      const column=$(this).data('column');
      const $lastEmptyCell=findLastEmptyCell(column);
      $lastEmptyCell.addClass(`next-${that.player}`)
    //  console.log(column);
    })

    $board.on('mouseleave', '.column',function(){
      $('.column').removeClass(`next-${that.player}`);
    })
    $board.on('click','.column.empty', function(){
      if(that.isGameOver) return;
      const col=$(this).data('column');
      const row=$(this).data('row');
      const $lastEmptyCell=findLastEmptyCell(col);
      $lastEmptyCell.removeClass(`empty next-${that.player}`);
      $lastEmptyCell.addClass(that.player);
      $lastEmptyCell.data('player',that.player);

      const winner=that.checkForWin($lastEmptyCell.data('row'),$lastEmptyCell.data('column'));

      if(winner){
        that.isGameOver=true;
        alert(`Game Over Player ${that.player} has won!`);
        $('.column.empty').removeClass('empty');
        return;
      }
      that.player=(that.player === 'red') ? 'black' :'red';
      that.onPlayerMove();
      $(this).trigger('mouseenter')
    });
  }
  checkForWin(row,column){
    const that=this;
    function $getCell(i,j){
      return $(`.column[data-row='${i}'][data-column='${j}']`);
    }
    function checkDirection(direction)
    {
      let total=0;
      let i=row+direction.i;
      let j=column+direction.j;
      let $next=$getCell(i,j);
      while(i>=0 && i<that.ROWS && j>=0 && j<that.COLUMNS && $next.data('player')===that.player)
      {
        total++;
        i+=direction.i;
        j+=direction.j;
        $next= $getCell(i,j);
      }
      return total;
    }
    function checkWin(directionA,directionB){
      const total=1+ checkDirection(directionA)+ checkDirection(directionB);
      if(total>=4){
        return that.player;
      }
      else{
        return null;
      }
    }
    function checkDiagonalBottomToTopLeft(){
      return checkWin({i:1, j:-1},{i:1,j:1})
    }
    function checkDiagonalTopLefttoBottomRight(){
      return checkWin({i:1, j:1},{i:-1,j:-1})
    }
    function checkVerticals(){
      return checkWin({i:-1, j:0}, {i:1, j:0});
    }
    function checkHorizontals(){
      return checkWin({i:0, j:-1}, {i:0,j:1});
    }
    return checkVerticals() || checkHorizontals() || checkDiagonalBottomToTopLeft() ||checkDiagonalTopLefttoBottomRight();

  }
  restart () {
  this.createGrid();
  this.onPlayerMove();
    }
}
