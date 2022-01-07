import { AbstractTaskController } from './abstracts/abstract.task.controller';
import { Request, Response, Router } from 'express';
import passport from 'passport';
import { WashSwotStrategy } from '../auth/strategies/wash-swot-strategy';
import { AbstractFacadeTaskService } from './abstracts/abstract.facade.task.service';
import { AuthorizedUserInterface } from '../auth/interface/authorized-user.interface';
import { CreateAndSaveTaskDto } from '../../database/entities/task';
import { CreateTaskByUuidDto } from './dto/create-task-by-uuid.dto';
import { DeleteTaskByTaskIdDto } from './dto/delete-task-by-task-id.dto';
import { FindTaskByTaskIdDto } from './dto/find-task-by-task-id.dto';
import { FindTaskByUuidDto } from './dto/find-task-by-uuid.dto';

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
      res.send(result);
    });

    router.get(
      '/my',
      passport.authenticate(WashSwotStrategy, { session: false }),
      async (req: Request, res: Response) => {
        const { uuid } = req.user as AuthorizedUserInterface;
        const result = await this.taskService.findTaskByUUID({
          uuid,
        } as FindTaskByUuidDto);
        res.send(result);
      },
    );

    router.get('/:taskId', async (req: Request, res: Response) => {
      const { taskId } = req.params;
      const taskIdCastedToNumberType = parseInt(taskId);
      const result = await this.taskService.findTaskByTaskId({
        taskId: taskIdCastedToNumberType,
      } as FindTaskByTaskIdDto);
      res.send(result);
    });

    router.post(
      '/',
      passport.authenticate(WashSwotStrategy, { session: false }),
      async (req: Request, res: Response) => {
        const { uuid } = req.user as AuthorizedUserInterface;
        const createAndSaveTaskDto = req.body as CreateAndSaveTaskDto;
        const result = await this.taskService.createTaskByUUID({
          uuid,
          taskInformation: createAndSaveTaskDto,
        } as CreateTaskByUuidDto);
        res.send(result);
      },
    );

    router.delete('/:taskId', async (req, res) => {
      const { taskId } = req.params;
      const taskIdCastedToNumberType = parseInt(taskId);
      const result = await this.taskService.deleteTaskByTaskId({
        taskId: taskIdCastedToNumberType,
      } as DeleteTaskByTaskIdDto);
      res.send(result);
    });

    this.taskRouter.use(path, router);
  }

  public getRouter() {
    return this.taskRouter;
  }
}
