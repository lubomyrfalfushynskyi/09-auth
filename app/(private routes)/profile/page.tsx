'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import css from './page.module.css';

export default function ProfilePage() {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <a href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </a>
        </div>
        <div className={css.avatarWrapper}>
          {user.avatar ? (
            <img
              src={user.avatar}
              alt="User Avatar"
              width={120}
              height={120}
              className={css.avatar}
            />
          ) : null}
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
}
