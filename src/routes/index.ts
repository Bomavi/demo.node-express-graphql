/* npm imports */
import express, { Router } from 'express';

/* root imports */
import { isAuthenticated, errorHandler } from '~/middleware';
import { AuthController, UsersController, TasksController } from '~/controllers';

const api = (): Router => {
	const router = express();

	router.use('/users', isAuthenticated, UsersController());
	router.use('/tasks', isAuthenticated, TasksController());
	router.use('/auth', AuthController());

	router.use(errorHandler);

	return router;
};

export { api };
