import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { WithAuthMiddleware } from './middlewares/with-auth.middleware';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { PrismaModule } from './prisma.module';
import { JwtConfigModule } from './auth/jwt.module';
import { WorkoutsController } from './workouts/workouts.controller';
import { WorkoutsService } from './workouts/workouts.service';
import { WorkoutsModule } from './workouts/workouts.module';
import { SetsModule } from './sets/sets.module';
import { ExGroupsModule } from './ex-groups/ex-groups.module';
import { WeightDataModule } from './weight-data/weight-data.module';
import { SetsController } from './sets/sets.controller';
import { SetsService } from './sets/sets.service';
import { ExercisesModule } from './exercises/exercises.module';
import { ExercisesController } from './exercises/exercises.controller';
import { WeightDataController } from './weight-data/weight-data.controller';
import { WeightDataService } from './weight-data/weight-data.service';
import { ExGroupsController } from './ex-groups/ex-groups.controller';
import { ExercisesService } from './exercises/exercises.service';
import { ExGroupsService } from './ex-groups/ex-groups.service';
import { WorkoutTemplateController } from './workout-templates/workout-template.controller';
import { WorkoutTemplateModule } from './workout-templates/workout-template.module';
import { WorkoutTemplateService } from './workout-templates/workout-template.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Делаем ConfigModule глобальным
    }),
    JwtConfigModule,
    UsersModule,
    AuthModule,
    PrismaModule,
    WorkoutsModule,
    SetsModule,
    ExGroupsModule,
    WeightDataModule,
    ExercisesModule,
    ExGroupsModule,
    WorkoutTemplateModule,
  ],
  controllers: [UsersController, AuthController, WorkoutsController, SetsController, WeightDataController, ExercisesController, ExGroupsController, WorkoutTemplateController],
  providers: [UsersService, PrismaService, WithAuthMiddleware, WorkoutsService, SetsService, WeightDataService, ExercisesService, ExGroupsService, WorkoutTemplateService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(WithAuthMiddleware)
      .exclude('users/register', 'auth/login')
      .forRoutes(UsersController, WorkoutsController, SetsController, ExercisesController, ExGroupsController, WeightDataController, WorkoutTemplateController);
  }
}
