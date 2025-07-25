import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Button, KeyboardAvoidingView, Platform } from 'react-native';

const fights = [
  { id: '1', fighters: 'Alex vs Jordan' },
  { id: '2', fighters: 'Taylor vs Chris' },
  { id: '3', fighters: 'Morgan vs Sam' },
];

type Message = { id: string; sender: string; text: string };
type MessagesByFight = { [fightId: string]: Message[] };
const initialMessages: MessagesByFight = {
  '1': [
    { id: 'm1', sender: 'Alex', text: 'Ready for the fight?' },
    { id: 'm2', sender: 'Jordan', text: 'Absolutely!' },
  ],
  '2': [
    { id: 'm3', sender: 'Taylor', text: 'See you at the club.' },
  ],
  '3': [],
};

const InboxScreen = () => {
  const [selectedFight, setSelectedFight] = useState<string | null>(null);
  const [messages, setMessages] = useState<MessagesByFight>(initialMessages);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim() || !selectedFight) return;
    setMessages(prev => ({
      ...prev,
      [selectedFight]: [
        ...prev[selectedFight],
        { id: Date.now().toString(), sender: 'You', text: input },
      ],
    }));
    setInput('');
  };

  if (!selectedFight) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Chats by Fight</Text>
        <FlatList
          data={fights}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.fightItem} onPress={() => setSelectedFight(item.id)}>
              <Text style={styles.fightText}>{item.fighters}</Text>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={80}
    >
      <TouchableOpacity onPress={() => setSelectedFight(null)}>
        <Text style={styles.backBtn}>{'< Back to Fights'}</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Chat: {fights.find(f => f.id === selectedFight)?.fighters}</Text>
      <FlatList
        data={messages[selectedFight]}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={item.sender === 'You' ? styles.msgYou : styles.msgOther}>
            <Text style={styles.msgSender}>{item.sender}:</Text>
            <Text style={styles.msgText}>{item.text}</Text>
          </View>
        )}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
      />
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type a message..."
        />
        <Button title="Send" onPress={handleSend} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 18,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  fightItem: {
    padding: 16,
    backgroundColor: '#f7f7f7',
    borderRadius: 8,
  },
  fightText: {
    fontSize: 16,
    color: '#222',
  },
  separator: {
    height: 10,
  },
  backBtn: {
    color: '#007AFF',
    marginBottom: 8,
    fontSize: 16,
  },
  msgYou: {
    alignSelf: 'flex-end',
    backgroundColor: '#d1f7c4',
    borderRadius: 8,
    marginVertical: 4,
    padding: 8,
    maxWidth: '80%',
  },
  msgOther: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginVertical: 4,
    padding: 8,
    maxWidth: '80%',
  },
  msgSender: {
    fontWeight: 'bold',
    marginBottom: 2,
    fontSize: 13,
  },
  msgText: {
    fontSize: 15,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 8,
    fontSize: 15,
    backgroundColor: '#fafafa',
  },
});

export default InboxScreen;
