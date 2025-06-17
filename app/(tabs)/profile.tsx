import React, { useEffect, useState } from 'react';
import { Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const POPUP_COUNT = 19;
const BACKGROUND_IMAGE = { uri: 'https://i.pinimg.com/736x/43/3c/18/433c181d16b295710f5688e8ce57719b.jpg' };

const ProfileScreen = (): React.ReactElement => {
  const [visiblePopups, setVisiblePopups] = useState<number[]>([]);

  const startPopups = (): void => {
    setVisiblePopups([]);
    for (let i = 0; i < POPUP_COUNT; i++) {
      setTimeout(() => {
        setVisiblePopups(prev => [...prev, i]);
      }, i * 300);
    }
  };

  useEffect(() => {
    startPopups();
  }, []);

  const handleClose = (id: number): void => {
    setVisiblePopups(prev => prev.filter(popupId => popupId !== id));
  };

  return (
    <ImageBackground source={BACKGROUND_IMAGE} style={styles.background} resizeMode="cover">
      <View style={styles.container}>
        {visiblePopups.length > 0 ? (
          visiblePopups.map((id) => (
            <View
              key={id}
              style={[
                styles.outerPopup,
                {
                  top: 50 + (id * 35) % (Dimensions.get('window').height - 150),
                  left: 20 + (id * 30) % (Dimensions.get('window').width - 250),
                },
              ]}
            >
              <View style={styles.innerPopup}>
                <Text style={styles.popupText}>Welcome to Maxèe</Text>
                <TouchableOpacity onPress={() => handleClose(id)} style={styles.closeBtn} activeOpacity={0.7}>
                  <Text style={styles.closeBtnText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <View style={[styles.outerPopup, { top: 290, left: 50 }]}>
            <View style={styles.innerPopup}>
              <Text style={[styles.popupText, { marginBottom: 18 }]}>You thought you were done?</Text>
              <TouchableOpacity onPress={startPopups} style={styles.closeBtn} activeOpacity={0.7}>
                <Text style={styles.closeBtnText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  outerPopup: {
    position: 'absolute',
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderTopColor: '#FFFFFF',
    borderLeftColor: '#FFFFFF',
    borderBottomColor: '#404040',
    borderRightColor: '#404040',
    backgroundColor: '#808080',
    padding: 2,
  },
  innerPopup: {
    backgroundColor: '#D4D0C8',
    width: 230,
    padding: 12,
    justifyContent: 'space-between',
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderTopColor: '#FFFFFF',
    borderLeftColor: '#FFFFFF',
    borderBottomColor: '#404040',
    borderRightColor: '#404040',
  },
  popupText: {
    color: '#000000',
    fontWeight: 'normal',
    fontFamily: 'Tahoma, Courier New, monospace',
    fontSize: 14,
  },
  closeBtn: {
    alignSelf: 'flex-end',
    paddingVertical: 6,
    paddingHorizontal: 16,
    backgroundColor: '#D4D0C8',
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderTopColor: '#FFFFFF',
    borderLeftColor: '#FFFFFF',
    borderBottomColor: '#404040',
    borderRightColor: '#404040',
  },
  closeBtnText: {
    fontFamily: 'Tahoma, Courier New, monospace',
    fontWeight: 'normal',
    fontSize: 14,
    color: '#000000',
  },
});

export default ProfileScreen;