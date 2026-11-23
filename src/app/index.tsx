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
        setUsers(data);
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
          <ActivityIndicator />
          <ThemedText>Loading...</ThemedText>
        </ThemedView>
      ) : error ? (
        <ThemedText style={styles.error}>Could not load users: {error}</ThemedText>
      ) : (
        <ScrollView contentContainerStyle={styles.list}>
          {users.map((user) => (
            <ThemedView key={user.id} type="backgroundElement" style={styles.post}>
              <ThemedText type="subtitle" style={styles.postTitle}>
                {user.name}
              </ThemedText>
              <ThemedText>@{user.username}</ThemedText>
              <ThemedText>{user.email}</ThemedText>
            const customNames = ['tangol', 'gabo', 'dapdap', 'jason', 'ash', 'lims', 'nardo', 'jorge', 'dolps', 'jims'];
            
            setUsers(
              data.map((user, index) => ({
                ...user,
                name: customNames[index] ?? user.name,
              }))
            );            </ThemedView>
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
  },
  heading: {
    fontSize: 32,
    lineHeight: 40,
    marginBottom: Spacing.three,
  },
  status: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
  },
  list: {
    gap: Spacing.three,
    paddingBottom: Spacing.four,
  },
  post: {
    borderRadius: Spacing.two,
    padding: Spacing.three,
    gap: Spacing.two,
  },
  postTitle: {
    fontSize: 20,
    lineHeight: 28,
  },
  error: {
    color: '#d32f2f',
  },
});
