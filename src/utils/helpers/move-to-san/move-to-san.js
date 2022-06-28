var PAWN = 'p'
var KNIGHT = 'n'
var BISHOP = 'b'
var ROOK = 'r'
var QUEEN = 'q'
var KING = 'k'

var BITS = {
    NORMAL: 1,
    CAPTURE: 2,
    BIG_PAWN: 4,
    EP_CAPTURE: 8,
    PROMOTION: 16,
    KSIDE_CASTLE: 32,
    QSIDE_CASTLE: 64,
  }


/*****************************************************************************
   * UTILITY FUNCTIONS
   ****************************************************************************/
   function rank(i) {
    return i >> 4
  }

  function file(i) {
    return i & 15
  }

  function algebraic(i) {
    var f = file(i),
      r = rank(i)
    return 'abcdefgh'.substring(f, f + 1) + '87654321'.substring(r, r + 1)
  }


  
  /* this function is used to uniquely identify ambiguous moves */
  function get_disambiguator(move, moves) {
    var from = move.from
    var to = move.to
    var piece = move.piece

    var ambiguities = 0
    var same_rank = 0
    var same_file = 0

    for (var i = 0, len = moves.length; i < len; i++) {
      var ambig_from = moves[i].from
      var ambig_to = moves[i].to
      var ambig_piece = moves[i].piece

      /* if a move of the same piece type ends on the same to square, we'll
       * need to add a disambiguator to the algebraic notation
       */
      if (piece === ambig_piece && from !== ambig_from && to === ambig_to) {
        ambiguities++

        if (rank(from) === rank(ambig_from)) {
          same_rank++
        }

        if (file(from) === file(ambig_from)) {
          same_file++
        }
      }
    }

    if (ambiguities > 0) {
      /* if there exists a similar moving piece on the same rank and file as
       * the move in question, use the square as the disambiguator
       */
      if (same_rank > 0 && same_file > 0) {
        return algebraic(from)
      } else if (same_file > 0) {
        /* if the moving piece rests on the same file, use the rank symbol as the
         * disambiguator
         */
        return algebraic(from).charAt(1)
      } else {
        /* else use the file symbol */
        return algebraic(from).charAt(0)
      }
    }

    return ''
  }


  
  function make_move(move) {
    var us = turn
    var them = swap_color(us)
    push(move)

    board[move.to] = board[move.from]
    board[move.from] = null

    /* if ep capture, remove the captured pawn */
    if (move.flags & BITS.EP_CAPTURE) {
      if (turn === BLACK) {
        board[move.to - 16] = null
      } else {
        board[move.to + 16] = null
      }
    }

    /* if pawn promotion, replace with new piece */
    if (move.flags & BITS.PROMOTION) {
      board[move.to] = { type: move.promotion, color: us }
    }

    /* if we moved the king */
    if (board[move.to].type === KING) {
      kings[board[move.to].color] = move.to

      /* if we castled, move the rook next to the king */
      if (move.flags & BITS.KSIDE_CASTLE) {
        var castling_to = move.to - 1
        var castling_from = move.to + 1
        board[castling_to] = board[castling_from]
        board[castling_from] = null
      } else if (move.flags & BITS.QSIDE_CASTLE) {
        var castling_to = move.to + 1
        var castling_from = move.to - 2
        board[castling_to] = board[castling_from]
        board[castling_from] = null
      }

      /* turn off castling */
      castling[us] = ''
    }

    /* turn off castling if we move a rook */
    if (castling[us]) {
      for (var i = 0, len = ROOKS[us].length; i < len; i++) {
        if (
          move.from === ROOKS[us][i].square &&
          castling[us] & ROOKS[us][i].flag
        ) {
          castling[us] ^= ROOKS[us][i].flag
          break
        }
      }
    }

    /* turn off castling if we capture a rook */
    if (castling[them]) {
      for (var i = 0, len = ROOKS[them].length; i < len; i++) {
        if (
          move.to === ROOKS[them][i].square &&
          castling[them] & ROOKS[them][i].flag
        ) {
          castling[them] ^= ROOKS[them][i].flag
          break
        }
      }
    }

    /* if big pawn move, update the en passant square */
    if (move.flags & BITS.BIG_PAWN) {
      if (turn === 'b') {
        ep_square = move.to - 16
      } else {
        ep_square = move.to + 16
      }
    } else {
      ep_square = EMPTY
    }

    /* reset the 50 move counter if a pawn is moved or a piece is captured */
    if (move.piece === PAWN) {
      half_moves = 0
    } else if (move.flags & (BITS.CAPTURE | BITS.EP_CAPTURE)) {
      half_moves = 0
    } else {
      half_moves++
    }

    if (turn === BLACK) {
      move_number++
    }
    turn = swap_color(turn)
  }



 function moveToSan(move, moves) {
    var output = ''

    if (move.flags & BITS.KSIDE_CASTLE) {
      output = 'O-O'
    } else if (move.flags & BITS.QSIDE_CASTLE) {
      output = 'O-O-O'
    } else {
      if (move.piece !== PAWN) {
        var disambiguator = get_disambiguator(move, moves)
        output += move.piece.toUpperCase() + disambiguator
      }

      if (move.flags & (BITS.CAPTURE | BITS.EP_CAPTURE)) {
        if (move.piece === PAWN) {
          output += algebraic(move.from)[0]
        }
        output += 'x'
      }

      output += algebraic(move.to)

      if (move.flags & BITS.PROMOTION) {
        output += '=' + move.promotion.toUpperCase()
      }
    }

    make_move(move)
    if (in_check()) {
      if (in_checkmate()) {
        output += '#'
      } else {
        output += '+'
      }


    return output
  }

export default moveToSan