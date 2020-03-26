import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 20
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 48
    },

    incident: {
        padding: 24,
        borderRadius: 8,
        backgroundColor: '#fff',
        marginBottom:30
    },

    incidentProperty: {
        fontSize: 14,
        color: '#41414d',
        fontWeight: 'bold',
        marginTop: 24
    },

    incidentValue: {
        marginTop: 8,
        fontSize: 15,
        color: '#737380'
    },

    title: {
        fontSize: 20,
        color: '#13131a',
        fontWeight: 'bold',
        lineHeight: 30
    },

    description: {
        fontSize: 15,
        color: '#737380',
        marginVertical: 16
    },

    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    button: {
        backgroundColor: '#e02041',
        borderRadius: 8,
        height: 50,
        width: '48%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 8,
        fontSize: 15
    }
});