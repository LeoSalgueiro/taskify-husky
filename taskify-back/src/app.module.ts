import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './board/board.module';
import { TaskModule } from './task/task.module';
import { BoardController } from './board/board.controller';
import { BoardService } from './board/board.service';
import { TaskController } from './task/task.controller';
import { TaskService } from './task/task.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    BoardModule,
    TaskModule,
  ],
  controllers: [AppController, BoardController, TaskController],
  providers: [AppService, BoardService, TaskService],
})
export class AppModule {}
