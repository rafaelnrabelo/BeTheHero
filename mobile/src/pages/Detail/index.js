import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Image, Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import LogoImg from '../../assets/logo.png';
import styles from './styles';

export default function Incidents() {
    const navigation = useNavigation();
    const route = useRoute();
    const [incident, setIncident] = useState([]);
    const message = `Olá ${incident.name} estou entrando em contato pois gostaria de ajudar no Caso "${incident.title}" com o valor de ${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}`;

    useEffect(() => {
        setIncident(route.params.incident)
    },[])

    function navigateToIncidents() {
        navigation.navigate('Incidents');
    }

    function sendMail() {
        MailComposer.composeAsync({
            subject: `Herói do caso: ${incident.title}`,
            recipients: [incident.email],
            body: message
        })
    }

    function sendWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);
    }

    return (
        <>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image source={LogoImg} />
                    <TouchableOpacity onPress={navigateToIncidents} style={styles.detailsButton}>
                        <Feather name="arrow-left" size={25} color='#e02041' />
                    </TouchableOpacity>
                </View>

                <View style={styles.incident}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View style={{flexDirection: 'column'}}>
                                <Text style={[styles.incidentProperty, { marginTop: 0 }]}>ONG:</Text>    
                                <Text style={styles.incidentValue}>{incident.name}</Text>
                            </View>
                            <View style={{flexDirection: 'column', marginRight: 15}}>
                                <Text style={[styles.incidentProperty, { marginTop: 0 }]}>Local:</Text>    
                                <Text style={styles.incidentValue}>{incident.city}-{incident.uf}</Text>
                            </View>
                        </View>

                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View style={{flexDirection: 'column'}}>
                                <Text style={styles.incidentProperty}>CASO:</Text>    
                                <Text style={styles.incidentValue}>{incident.title}</Text>
                            </View>
                            <View style={{flexDirection: 'column', marginRight: 15}}>
                                <Text style={styles.incidentProperty}>Valor:</Text>    
                                <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</Text>
                            </View>
                        </View>
                        

                        <Text style={styles.incidentProperty}>DESCRIÇÃO:</Text>    
                        <Text style={styles.incidentValue}>{incident.description}</Text>
                </View>

                <View style={styles.incident}>
                    <Text style={styles.title}>Salve o dia!</Text>
                    <Text style={styles.title}>Seja o herói desse caso</Text>
                    <Text style={styles.description}>Entre em contato</Text>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity onPress={sendWhatsapp} style={styles.button}>
                            <FontAwesome name="whatsapp" size={22} color='#fff' />
                            <Text style={styles.buttonText}>WhatsApp</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={sendMail} style={styles.button}>
                            <Feather name="mail" size={22} color='#fff' />
                            <Text style={styles.buttonText}>E-mail</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </>
    );
}