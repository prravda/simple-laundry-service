import { User } from '../../database/entities/user';
import cuid from 'cuid';

const mockUser = new User();
mockUser.uuid = cuid();
mockUser.name = 'test';
mockUser.nickname = 'test-nickname';
mockUser.cellPhoneNumber = '010-3333-3333';
mockUser.gender = 'male';
mockUser.createdAt = new Date();
mockUser.updatedAt = new Date();
