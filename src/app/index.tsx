import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

const customNames = [
  'tangol',
  'gabo',
  'dapdap',
  'jason',
  'ash',
  'lims',
  'nardo',
  'jorge',
  'dolps',
  'jims',
];

export default function HomeScreen() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data: User[] = await response.json();
        setUsers(
          data.map((user, index) => ({
            ...user,
            name: customNames[index] ?? user.name,
          }))
        );
      } catch (fetchError) {
        setError(fetchError instanceof Error ? fetchError.message : 'Unable to load users.');
      } finally {
        setIsLoading(false);
      }
    }

    void fetchUsers();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.heading}>
        User List
      </ThemedText>

      {isLoading ? (
        <ThemedView style={styles.status}>
          <ActivityIndicator color="#ff334f" />
          <ThemedText style={styles.loadingText}>Loading...</ThemedText>
        </ThemedView>
      ) : error ? (
        <ThemedText style={styles.error}>Could not load users: {error}</ThemedText>
      ) : (
        <ScrollView contentContainerStyle={styles.list}>
          {users.map((user) => (
            <ThemedView key={user.id} style={styles.userCard}>
              <ThemedText type="subtitle" style={styles.userName}>
                {user.name}
              </ThemedText>
              <ThemedText style={styles.username}>@{user.username}</ThemedText>
              <ThemedText style={styles.email}>{user.email}</ThemedText>
            </ThemedView>
          ))}
        </ScrollView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.four,
    backgroundColor: '#090909',
  },
  heading: {
    fontSize: 32,
    lineHeight: 40,
    marginBottom: Spacing.three,
    color: '#ff334f',
  },
  status: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
    backgroundColor: '#090909',
  },
  loadingText: {
    color: '#f5f5f5',
  },
  list: {
    gap: Spacing.three,
    paddingBottom: Spacing.four,
  },
  userCard: {
    borderRadius: Spacing.two,
    padding: Spacing.three,
    gap: Spacing.two,
    backgroundColor: '#171717',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#75202d',
    borderLeftWidth: 4,
    borderLeftColor: '#e50914',
  },
  userName: {
    fontSize: 20,
    lineHeight: 28,
    color: '#ff334f',
  },
  username: {
    color: '#f5f5f5',
  },
  email: {
    color: '#bdbdbd',
  },
  error: {
    color: '#ff334f',
  },
});
