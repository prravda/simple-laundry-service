import { Router } from 'express';

export abstract class AbstractController {
  abstract initializeRouter(): void;
  abstract getRouter(): Router;
}
