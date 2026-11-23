import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

type Post = {
  id: number;
  title: string;
  body: string;
};

export default function HomeScreen() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data: Post[] = await response.json();
        setPosts(data);
      } catch (fetchError) {
        setError(fetchError instanceof Error ? fetchError.message : 'Unable to load posts.');
      } finally {
        setIsLoading(false);
      }
    }

    void fetchPosts();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.heading}>
        Latest Posts
      </ThemedText>

      {isLoading ? (
        <ThemedView style={styles.status}>
          <ActivityIndicator />
          <ThemedText>Loading...</ThemedText>
        </ThemedView>
      ) : error ? (
        <ThemedText style={styles.error}>Could not load posts: {error}</ThemedText>
      ) : (
        <ScrollView contentContainerStyle={styles.list}>
          {posts.map((post) => (
            <ThemedView key={post.id} type="backgroundElement" style={styles.post}>
              <ThemedText type="subtitle" style={styles.postTitle}>
                {post.title}
              </ThemedText>
              <ThemedText>{post.body}</ThemedText>
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
