import { AbstractTaskController } from './abstracts/abstract.task.controller';
import { NextFunction, Request, Response, Router } from 'express';
import passport from 'passport';
import { WashSwatStrategy } from '../auth/strategies/wash-swat-strategy';
import { AbstractFacadeTaskService } from './abstracts/abstract.facade.task.service';
import { AuthorizedUserInterface } from '../auth/interface/authorized-user.interface';
import { CreateAndSaveTaskDto, Task } from '../../database/entities/task';
import { CreateTaskByUuidDto } from './dto/create-task-by-uuid.dto';
import { DeleteTaskByTaskIdDto } from './dto/delete-task-by-task-id.dto';
import { FindTaskByTaskIdDto } from './dto/find-task-by-task-id.dto';
import { FindTaskByUuidDto } from './dto/find-task-by-uuid.dto';
import { successResponseWrapper } from '../../middlewares/response-wrappers/success-response.wrapper';
import { UpdateResult } from 'typeorm';
import { CanNotFindATaskWithThisTaskIdError } from './errors/can-not-find-a-task-with-this-task-id-error';

export class TaskController extends AbstractTaskController {
  private readonly taskRouter;
  constructor(private readonly taskService: AbstractFacadeTaskService) {
    super();
    this.taskRouter = Router();
    this.initializeRouter();
  }

  public initializeRouter() {
    const router = Router();
    const path = '/order';

    router.get('/', async (req: Request, res: Response) => {
      const result = await this.taskService.findAllTask();
      res.status(200).send(
        successResponseWrapper<Task[]>({
          message: `Success getting all tasks.`,
          statusCode: res.statusCode,
          data: result,
        }),
      );
    });

    router.get(
      '/my',
      passport.authenticate(WashSwatStrategy, { session: false }),
      async (req: Request, res: Response) => {
        const { uuid } = req.user as AuthorizedUserInterface;
        const result = await this.taskService.findTaskByUUID({
          uuid,
        } as FindTaskByUuidDto);
        res.status(201).send(
          successResponseWrapper<Task[]>({
            message: `Success getting a user's all tasks.`,
            statusCode: res.statusCode,
            data: result,
          }),
        );
      },
    );

    router.get(
      '/:taskId',
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { taskId } = req.params;
          const taskIdCastedToNumberType = parseInt(taskId);
          const result = await this.taskService.findTaskByTaskId({
            taskId: taskIdCastedToNumberType,
          } as FindTaskByTaskIdDto);
          res.status(201).send(
            successResponseWrapper<Task>({
              message: `Success getting a task with a specific task id`,
              statusCode: res.statusCode,
              data: result,
            }),
          );
        } catch (e) {
          next(e);
        }
      },
    );

    router.post(
      '/',
      passport.authenticate(WashSwatStrategy, { session: false }),
      async (req: Request, res: Response) => {
        try {
          const { uuid } = req.user as AuthorizedUserInterface;
          const createAndSaveTaskDto = req.body as CreateAndSaveTaskDto;
          const result = await this.taskService.createTaskByUUID({
            uuid,
            taskInformation: createAndSaveTaskDto,
          } as CreateTaskByUuidDto);
          res.status(201).send(
            successResponseWrapper<Task>({
              message: `Success creating a task.`,
              statusCode: res.statusCode,
              data: result,
            }),
          );
        } catch (e) {
          if (e instanceof CanNotFindATaskWithThisTaskIdError) {
            res.status(e.statusCode).send({
              statusCode: e.statusCode,
              message: e.message,
              action: e.action,
              solution: e.solution,
            });
          }
        }
      },
    );

    router.delete('/:taskId', async (req, res) => {
      const { taskId } = req.params;
      const taskIdCastedToNumberType = parseInt(taskId);
      const result = await this.taskService.deleteTaskByTaskId({
        taskId: taskIdCastedToNumberType,
      } as DeleteTaskByTaskIdDto);
      res.status(201).send(
        successResponseWrapper<UpdateResult>({
          message: `Success deleting a task with a specific task id`,
          statusCode: res.statusCode,
          data: result,
        }),
      );
    });
    this.taskRouter.use(path, router);
  }

  public getRouter() {
    return this.taskRouter;
  }
}
