import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Modal, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
// import { supabase } from '../supabaseClient'; // Uncomment and use for real backend

const WalletScreen = () => {
  // Replace with real balance fetch from Supabase if needed
  const [balance, setBalance] = useState(100.0);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<'topup' | 'withdraw' | null>(null);
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const openModal = (type: 'topup' | 'withdraw') => {
    setModalType(type);
    setAmount('');
    setModalVisible(true);
  };

  const handleAction = async () => {
    const num = parseFloat(amount);
    if (isNaN(num) || num <= 0) {
      Alert.alert('Invalid amount');
      return;
    }
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setModalVisible(false);
      if (modalType === 'topup') {
        setBalance(b => b + num);
        Alert.alert('Success', `Topped up £${num.toFixed(2)}`);
      } else if (modalType === 'withdraw') {
        if (num > balance) {
          Alert.alert('Error', 'Insufficient balance');
        } else {
          setBalance(b => b - num);
          Alert.alert('Success', `Withdrew £${num.toFixed(2)}`);
        }
      }
    }, 1000);
    // For real backend, use supabase update here
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Wallet</Text> */}
      <Text style={styles.balanceLabel}>Current Balance</Text>
      <Text style={styles.balance}>£{balance.toFixed(2)}</Text>
      <View style={styles.buttonRow}>
        <Button title="Top Up" onPress={() => openModal('topup')} />
        <Button title="Withdraw" onPress={() => openModal('withdraw')} />
      </View>
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{modalType === 'topup' ? 'Top Up' : 'Withdraw'} Amount</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter amount"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />
            {loading ? (
              <ActivityIndicator size="small" color="#007AFF" />
            ) : (
              <TouchableOpacity style={styles.actionBtn} onPress={handleAction}>
                <Text style={styles.actionBtnText}>{modalType === 'topup' ? 'Top Up' : 'Withdraw'}</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.cancelBtn} onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
  balanceLabel: { fontSize: 16, color: '#888', textAlign: 'center' },
  balance: { fontSize: 36, fontWeight: 'bold', color: '#222', textAlign: 'center', marginBottom: 32 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 24 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: '#fff', borderRadius: 10, padding: 24, width: '80%', alignItems: 'center' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, paddingHorizontal: 12, paddingVertical: 8, fontSize: 16, width: '100%', marginBottom: 16 },
  actionBtn: { backgroundColor: '#007AFF', borderRadius: 6, paddingVertical: 10, paddingHorizontal: 24, marginBottom: 12 },
  actionBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  cancelBtn: { padding: 8 },
  cancelBtnText: { color: '#888', fontSize: 15 },
});

export default WalletScreen;
