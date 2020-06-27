import User from '../models/user.model';
import Profile from '../models/profile.model';

export function mapUserToProfile(user: User): Profile {
  const { id, email, username, profileImage, karma, role } = user;
  return { id, email, username, profileImage, karma, role };
}
