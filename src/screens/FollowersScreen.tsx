import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Button, ActivityIndicator, Alert } from 'react-native';
import { supabase } from '../supabaseClient'; // adjust path as needed

const FollowersScreen = () => {
  const [followers, setFollowers] = useState<any[]>([])
  ;
  const [loading, setLoading] = useState(true);
  const [addValue, setAddValue] = useState('');
  const [adding, setAdding] = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);

  // Replace with your actual user id logic
  const user_id = '48586985-b0c7-41a3-9cb8-460dfcff25bc';

  const fetchFollowers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('sparring_followers')
      .select('*')
      .eq('user_id', user_id);
    if (data) setFollowers(data);
    setLoading(false);
    if (error) Alert.alert('Error', 'Failed to fetch followers.');
  };

  useEffect(() => {
    fetchFollowers();
  }, []);

  const addFollower = async () => {
    if (!addValue.trim()) return;
    setAdding(true);
    // Example: add by username or email (adjust as needed)
    const { error } = await supabase
      .from('sparring_followers')
      .insert([{ user_id: user_id, follower_id: addValue.trim() }]);
    setAdding(false);
    if (error) {
      Alert.alert('Error', 'Failed to add follower.');
    } else {
      setAddValue('');
      fetchFollowers();
    }
  };

  const removeFollower = async (id: string) => {
    setRemovingId(id);
    const { error } = await supabase
      .from('sparring_followers')
      .delete()
      .eq('id', id);
    setRemovingId(null);
    if (error) {
      Alert.alert('Error', 'Failed to remove follower.');
    } else {
      fetchFollowers();
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}><ActivityIndicator size="large" color="#007AFF" /></View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Followers</Text>
      <View style={styles.addRow}>
        <TextInput
          style={styles.input}
          placeholder="Username or Email"
          value={addValue}
          onChangeText={setAddValue}
        />
        <Button title={adding ? 'Adding...' : 'Add'} onPress={addFollower} disabled={adding} />
      </View>
      <FlatList
        data={followers}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.followerRow}>
            <Text style={styles.followerName}>{item.follower}</Text>
            <TouchableOpacity onPress={() => removeFollower(item.id)} disabled={removingId === item.id}>
              <Text style={[styles.removeBtn, removingId === item.id && { color: '#aaa' }]}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No followers yet.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  addRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 4, fontSize: 15, marginRight: 8 },
  followerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderColor: '#eee' },
  followerName: { fontSize: 16, color: '#222' },
  removeBtn: { color: '#FF3C3C', fontWeight: 'bold', fontSize: 14, marginLeft: 12 },
  empty: { textAlign: 'center', color: '#888', marginTop: 32 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default FollowersScreen;
