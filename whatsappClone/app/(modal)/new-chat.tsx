import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { AlphabetList } from "react-native-section-alphabet-list";


import contacts from '@/assets/data/contacts.json';
import Colors from '@/constants/Colors'
import { defaultStyles } from '@/constants/Styles';

const Page = () => {
    // Transform contacts data to match the expected format for AlphabetList
    const data = contacts.map((contact, index) => ({
        value: `${contact.first_name} ${contact.last_name}`,
        name: `${contact.first_name} ${contact.last_name}`,
        img: contact.img,
        desc: contact.desc,
        key: `${contact.first_name} ${contact.last_name}-${index}`,
    }));

    return (
        <View style={{ flex: 1, paddingTop: 110, backgroundColor: Colors.background }}>
            <AlphabetList
                data={data} // Array of objects with 'value' and 'key' properties
                indexLetterStyle={{
                    color: Colors.primary,
                    fontSize: 12,
                }} // Style for the index letters (the side with A, B, C, etc.)
                indexContainerStyle={{
                    width: 24,
                    backgroundColor: Colors.background,
                }} // Style for the index container (the side with letters)
                renderCustomItem={(item: any) => (
                    <>
                        <View style={styles.listItemContainer}>
                            <Image source={{ uri: item.img }} style={styles.listItemImage} />
                            <View>
                                <Text style={{ color: '#000', fontSize: 16 }}>{item.value}</Text>
                                <Text style={{ color: Colors.gray, fontSize: 12 }}>
                                    {item.desc.length > 40 ? `${item.desc.substring(0, 40)}...` : item.desc}
                                </Text>
                            </View>
                        </View>
                        <View style={[defaultStyles.separator, { marginLeft: 50 }]} />
                    </>
                )} // Custom item component (rendered for each item in the list)
                renderCustomSectionHeader={(section) => (
                    <View style={styles.sectionHeaderContainer}>
                        <Text style={{ color: Colors.gray }}>{section.title}</Text>
                    </View>
                )} // Section header component (rendered above each section)
                style={{
                    marginLeft: 14,
                }} // Style for the entire list (to make it fit the screen)
            />
        </View>
    )
}
const styles = StyleSheet.create({
    listItemContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        height: 50,
        paddingHorizontal: 14,
        backgroundColor: '#fff',
    },

    listItemImage: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },

    sectionHeaderContainer: {
        height: 30,
        backgroundColor: Colors.background,
        justifyContent: 'center',
        paddingHorizontal: 14,
    },
})

export default Page