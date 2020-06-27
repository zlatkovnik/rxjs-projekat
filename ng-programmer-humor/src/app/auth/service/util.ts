import User from '../../profile/models/user.model';
import Auth from '../models/auth.model';

export function mapUserToAuth(user: User): Auth {
  const { id, email, username, profileImage, karma, role } = user;
  return { id, email, username, profileImage, karma, role };
}
