import { getCookie } from 'cookies-next';
import './FriendsSidebar.css';
import { cookies } from 'next/headers';
import { getUsersNames } from '../../functions/apiCalls';

export default async function FriendsSidebar() {
  const id = getCookie('user_id', { cookies });
  const onlineFriends = await getUsersNames(id);
  return (
    <div className="friends-sidebar">
      <h3>Online Friends</h3>
      <ul className="online-friends-list">
        {onlineFriends.map((friend, index) => (
          <li
            key={friend.id}
            className={`online-friend${
              index !== onlineFriends.length - 1 ? ' friend-separator' : ''
            }`}
          >
            <img
              src={friend.profilePic}
              alt={`${friend.name}'s profile`}
              className="profile-picture"
            />
            <span className="friend-name">{friend.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
