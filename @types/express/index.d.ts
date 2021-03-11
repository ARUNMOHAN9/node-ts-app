import User from '../../src/utilities/models/user.model';

declare global {
    namespace Express {
        interface Request {
            user: User;
        }
    }
}