import { UserService } from '../services/user.service';
import { MockUserRepository } from '../repositories/mock.user.repository';
import cuid from 'cuid';
import { CreateUserDto, User } from '../../../database/entities/user';

describe('User component service logic testing', () => {
  const service = new UserService(new MockUserRepository());
  it('사용자를 생성할 수 있습니다.', () => {
    const createMockUserDto: CreateUserDto = {
      name: 'test user',
      nickname: 'test nickname',
      cellPhoneNumber: '010-1234-1234',
      gender: 'male',
    };
    const mockUser = service.createUser(createMockUserDto);
    expect(mockUser.name).toEqual(createMockUserDto.name);
    expect(mockUser.nickname).toEqual(createMockUserDto.nickname);
    expect(mockUser.cellPhoneNumber).toEqual(createMockUserDto.cellPhoneNumber);
    expect(mockUser.gender).toEqual(createMockUserDto.gender);
  });

  it('핸드폰 번호를 통해서 사용자를 조회할 수 있습니다.', async () => {
    const cellPhoneNumber = '010-1234-1234';
    const founded = await service.findUserByCellPhoneNumber({
      cellPhoneNumber,
    });
    expect(founded.cellPhoneNumber).toEqual(cellPhoneNumber);
  });

  it('uuid를 통해서 사용자를 조회할 수 있습니다.', async () => {
    const uuid = cuid();
    const founded = await service.findUserByUUID({
      uuid,
    });
    expect(founded.uuid).toEqual(uuid);
  });

  it('DeepPartial<User> type 의 input 으로 User entity 를 만들 수 있습니다.', async () => {
    const createMockUserDto: CreateUserDto = {
      name: 'test user',
      nickname: 'test nickname',
      cellPhoneNumber: '010-1234-1234',
      gender: 'male',
    };
    const mockUser = new User();
    mockUser.name = createMockUserDto.name;
    mockUser.nickname = createMockUserDto.nickname;
    mockUser.cellPhoneNumber = createMockUserDto.cellPhoneNumber;
    mockUser.gender = createMockUserDto.gender;
    const savedUser = await service.saveUser(mockUser);
    expect(savedUser.name).toEqual(createMockUserDto.name);
    expect(savedUser.nickname).toEqual(createMockUserDto.nickname);
    expect(savedUser.cellPhoneNumber).toEqual(
      createMockUserDto.cellPhoneNumber,
    );
    expect(savedUser.gender).toEqual(createMockUserDto.gender);
  });
});
