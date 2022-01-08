import { AbstractFacadeTaskService } from './abstracts/abstract.facade.task.service';
import { AbstractImageService } from '../image/abstracts/abstract.image.service';
import { AbstractInformationService } from '../information/abstracts/abstract.information.service';
import { AbstractItemService } from '../item/abstracts/abstract.item.service';
import { AbstractMissionService } from '../mission/abstracts/abstract.mission.service';
import { AbstractTaskService } from './abstracts/abstract.task.service';
import { CreateImageDto, Image } from '../../database/entities/image';
import { CreateInformationDto } from '../../database/entities/information';
import { CreateTimeDto } from '../../database/entities/time';
import { AbstractUserService } from '../user/abstracts/abstract.user.service';
import { AbstractAddressService } from '../address/abstracts/abstract.address.service';
import { CreateAddressDto } from '../../database/entities/address';
import { AbstractTimeService } from '../time/abstracts/abstract.time.service';
import {
  CreateItemDto,
  CreateItemWithCreateImageListAndTagList,
  Item,
} from '../../database/entities/item';
import { Mission } from '../../database/entities/mission';
import { CreateAndSaveTaskDto, Task } from '../../database/entities/task';
import { AbstractTagService } from '../tag/abstracts/abstract.tag.service';
import { CreateTagDto, Tag } from '../../database/entities/tag';
import { CreateTaskByUuidDto } from './dto/create-task-by-uuid.dto';
import { DeleteTaskByTaskIdDto } from './dto/delete-task-by-task-id.dto';
import { FindTaskByTaskIdDto } from './dto/find-task-by-task-id.dto';
import { FindTaskByUuidDto } from './dto/find-task-by-uuid.dto';
import { UpdateResult } from 'typeorm';
import { CanNotFindATaskWithThisTaskIdError } from './errors/can-not-find-a-task-with-this-task-id-error';

export class FacadeTaskService extends AbstractFacadeTaskService {
  constructor(
    private readonly userService: AbstractUserService,
    private readonly imageService: AbstractImageService,
    private readonly addressService: AbstractAddressService,
    private readonly informationService: AbstractInformationService,
    private readonly timeService: AbstractTimeService,
    private readonly itemService: AbstractItemService,
    private readonly missionService: AbstractMissionService,
    private readonly tagService: AbstractTagService,
    private readonly taskService: AbstractTaskService,
  ) {
    super();
  }

  // ---------------- information section ----------------
  private creatTime(createTimeDto: CreateTimeDto) {
    return this.timeService.createTime(createTimeDto);
  }

  private createInformation(createInformationDto: CreateInformationDto) {
    return this.informationService.createInformation(createInformationDto);
  }

  private createAddress(createAddressDto: CreateAddressDto) {
    return this.addressService.createAddress(createAddressDto);
  }

  private async createAndSaveInformationWithTimeAndAddress(
    createTimeDto: CreateTimeDto,
    createInformationDto: CreateInformationDto,
    createAddressDto: CreateAddressDto,
  ) {
    const information = this.createInformation(createInformationDto);
    const time = this.creatTime(createTimeDto);
    const address = this.createAddress(createAddressDto);
    information.time = time;
    information.address = address;
    return await this.informationService.saveInformation(information);
  }

  // ---------------- item section ----------------
  private createTag(createTagDto: CreateTagDto) {
    return this.tagService.create(createTagDto);
  }

  private createImage(createImageDto: CreateImageDto) {
    return this.imageService.create(createImageDto);
  }

  private createItem(createItemDto: CreateItemDto) {
    return this.itemService.create(createItemDto);
  }

  private createItemWithImagesAndTags(
    createItemDto: CreateItemDto,
    createTagListDto: CreateTagDto[],
    createImageListDto: CreateImageDto[],
  ) {
    const imageList = createImageListDto.map<Image>((image) =>
      this.createImage(image),
    );
    const tagList = createTagListDto.map<Tag>((tag) => this.createTag(tag));
    const item = this.createItem(createItemDto);
    item.images = imageList;
    item.tagList = tagList;
    return item;
  }

  // ---------------- mission section  ----------------
  private async createAndSaveMissionWithItemList(
    createItemListDto: CreateItemWithCreateImageListAndTagList[],
  ) {
    const missionEntity = new Mission();
    missionEntity.items = createItemListDto.map<Item>((dto) => {
      const { createImageListDto, ...others } = dto;
      const {
        name,
        message,
        representativeItemImage,
        ...stringArrayForTagList
      } = others;
      const createTagListDto =
        stringArrayForTagList.createTagListDto.map<CreateTagDto>((strValue) => {
          return { tagName: strValue };
        });
      return this.createItemWithImagesAndTags(
        { name, message, representativeItemImage } as CreateItemDto,
        createTagListDto,
        createImageListDto,
      );
    });
    return await this.missionService.save(missionEntity);
  }

  // ---------------- task section  ----------------
  private async createAndSaveTask(createAndSaveTaskDto: CreateAndSaveTaskDto) {
    const {
      createInformationDto,
      createAddressDto,
      createTimeDto,
      createItemListWithImageListAndTagListDto,
    } = createAndSaveTaskDto;
    const informationEntity =
      await this.createAndSaveInformationWithTimeAndAddress(
        createTimeDto,
        createInformationDto,
        createAddressDto,
      );
    const missionEntity = await this.createAndSaveMissionWithItemList(
      createItemListWithImageListAndTagListDto,
    );
    const taskEntity = this.taskService.create();
    taskEntity.information = informationEntity;
    taskEntity.mission = missionEntity;
    const result = await this.taskService.save(taskEntity);
    console.log(result);
    return result;
  }

  // ---------------- describe public method  ----------------
  public async createTaskByUUID(
    createTaskDtoByUuid: CreateTaskByUuidDto,
  ): Promise<Task> {
    try {
      const { uuid, taskInformation } = createTaskDtoByUuid;
      const taskEntity = await this.createAndSaveTask(taskInformation);
      const userEntity = await this.userService.findUserByUUIDWithConditions(
        { uuid },
        { relations: ['tasks'] },
      );
      userEntity.tasks.push(taskEntity);
      const userWithTaskEntity = await this.userService.saveUser(userEntity);
      return userWithTaskEntity.tasks[userWithTaskEntity.tasks.length - 1];
    } catch (e) {
      throw e;
    }
  }

  public async findAllTask(): Promise<Task[]> {
    try {
      return await this.taskService.findAll({
        relations: [
          'information',
          'information.time',
          'mission',
          'mission.items',
          'mission.items.images',
          'mission.items.tagList',
        ],
      });
    } catch (e) {
      throw e;
    }
  }

  public async findTaskByTaskId(
    findTaskByTaskIdDto: FindTaskByTaskIdDto,
  ): Promise<Task> {
    try {
      try {
        const { taskId } = findTaskByTaskIdDto;
        return await this.taskService.findOne({
          where: { id: taskId },
          relations: [
            'information',
            'information.time',
            'mission',
            'mission.items',
            'mission.items.images',
            'mission.items.tagList',
          ],
        });
      } catch (e) {
        throw new CanNotFindATaskWithThisTaskIdError({
          name: 'CanNotFindATaskWithThisTaskIdError',
          message: `There is no task with this task id`,
          statusCode: 404,
          action: `Find a task with invalid task id`,
          solution: `Check your task id's validity before retry to find a task again`,
        });
      }
    } catch (e) {
      throw e;
    }
  }

  public async findTaskByUUID(
    findTaskByUuidDto: FindTaskByUuidDto,
  ): Promise<Task[]> {
    const { uuid } = findTaskByUuidDto;
    const { tasks } = await this.userService.findUserByUUIDWithConditions(
      { uuid },
      {
        relations: [
          'tasks',
          'tasks.information',
          'tasks.information.time',
          'tasks.mission',
          'tasks.mission.items',
          'tasks.mission.items.images',
          'tasks.mission.items.tagList',
        ],
      },
    );
    return tasks;
  }

  public async deleteTaskByTaskId(
    deleteTaskByTaskIdDto: DeleteTaskByTaskIdDto,
  ): Promise<UpdateResult> {
    try {
      const { taskId } = deleteTaskByTaskIdDto;
      const result = await this.taskService.softDelete({ id: taskId });
      if (result.affected && result.affected >= 1) {
        return result;
      }
      throw new Error('there is no task with this id');
    } catch (e) {
      throw e;
    }
  }
}
