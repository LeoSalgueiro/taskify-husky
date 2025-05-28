import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardService {
  constructor(private prisma: PrismaService) {}

  async createBoard(userId: string, createBoardDto: CreateBoardDto) {
    return this.prisma.board.create({
      data: {
        ...createBoardDto,
        userId,
      },
      include: {
        columns: true,
      },
    });
  }

  async addColumn(boardId: string, createColumnDto: CreateColumnDto) {
    return this.prisma.column.create({
      data: {
        ...createColumnDto,
        boardId,
      },
    });
  }

  async getBoardWithColumns(boardId: string) {
    return this.prisma.board.findUnique({
      where: { id: boardId },
      include: {
        columns: {
          include: {
            tasks: true,
          },
        },
      },
    });
  }

  async deleteBoard(boardId: string) {
    return this.prisma.$transaction(async (prisma) => {
      // Eliminamos todas las tareas asociadas a las columnas del tablero
      await prisma.task.deleteMany({
        where: {
          column: {
            boardId: boardId
          }
        }
      });

      // Eliminamos todas las columnas del tablero
      await prisma.column.deleteMany({
        where: {
          boardId: boardId
        }
      });

      // Finalmente eliminamos el tablero
      return prisma.board.delete({
        where: { id: boardId },
      });
    });
  }

  async deleteColumn(boardId: string, columnId: string) {
    return this.prisma.$transaction(async (prisma) => {
      // Eliminamos las tareas de la columna
      await prisma.task.deleteMany({
        where: { columnId }
      });

      // Eliminamos la columna
      return prisma.column.delete({
        where: { 
          id: columnId,
          boardId // Verificamos que la columna pertenezca al tablero
        }
      });
    });
  }

  async updateColumn(boardId: string, columnId: string, updateColumnDto: UpdateColumnDto) {
    return this.prisma.column.update({
      where: {
        id: columnId,
        boardId // Verificamos que la columna pertenezca al tablero
      },
      data: updateColumnDto
    });
  }

  async updateBoard(boardId: string, updateBoardDto: UpdateBoardDto) {
    return this.prisma.board.update({
      where: { id: boardId },
      data: updateBoardDto
    });
  }
}
