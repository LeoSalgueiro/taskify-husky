import { Controller, Post, Body, Param, Get, UseGuards, Delete, Patch } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';

@Controller('board')
@UseGuards(JwtAuthGuard)
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  createBoard(
    @GetUser('id') userId: string,
    @Body() createBoardDto: CreateBoardDto,
  ) {
    return this.boardService.createBoard(userId, createBoardDto);
  }

  @Post(':boardId/column')
  addColumn(
    @Param('boardId') boardId: string,
    @Body() createColumnDto: CreateColumnDto,
  ) {
    return this.boardService.addColumn(boardId, createColumnDto);
  }

  @Get(':boardId')
  getBoardWithColumns(@Param('boardId') boardId: string) {
    return this.boardService.getBoardWithColumns(boardId);
  }

  @Patch(':boardId')
  updateBoard(@Param('boardId') boardId: string, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardService.updateBoard(boardId, updateBoardDto);
  }

  @Patch(':boardId/column/:columnId')
  updateColumn(@Param('boardId') boardId: string, @Param('columnId') columnId: string, @Body() updateColumnDto: UpdateColumnDto) {
    return this.boardService.updateColumn(boardId, columnId, updateColumnDto);
  }


  @Delete(':boardId')
  deleteBoard(@Param('boardId') boardId: string) {
    return this.boardService.deleteBoard(boardId);
  }

  @Delete(':boardId/column/:columnId')
  deleteColumn(@Param('boardId') boardId: string, @Param('columnId') columnId: string) {
    return this.boardService.deleteColumn(boardId, columnId);
  }
}
