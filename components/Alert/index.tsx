import React from 'react'
import { View, Text, StyleSheet, Modal, Button } from 'react-native'

interface Props {
  message: string;
  visible: boolean;
  onCancel: () => void;
  onAccept: () => void;
}

const Alert: React.FC<Props> = ({message,visible,onCancel,onAccept}) => {
    return (
        <Modal
          animationType="none"
          transparent={true}
          visible={visible}
          onRequestClose={onCancel}
        >
          <View 
            className='flex-1 justify-center items-center' 
            style={{
                backgroundColor:'rgba(0,0,0,0.5)'
            }}
        >
            <View className='bg-white p-5'>
              <Text className='text-lg'>{message}</Text>
              <View className='flex-row justify-around mt-6'>
                <Text 
                    className='bg-[#00CCBB] w-[45%] text-center py-2 shadow-lg shadow-slate-600 text-white'
                    onPress={onAccept}
                >Yes</Text>
                <Text 
                    className='bg-white w-[45%] text-center py-2 shadow-lg shadow-slate-600 text-[#00CCBB]'
                    onPress={onCancel}
                >No</Text>
              </View>
            </View>
          </View>
        </Modal>
    )
}

export default Alert
