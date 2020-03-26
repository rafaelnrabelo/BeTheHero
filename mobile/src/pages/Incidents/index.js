import React, { useState, useEffect } from 'react';
import { Image, FlatList, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import api from '../../services/api';
import LogoImg from '../../assets/logo.png';
import styles from './styles';

export default function Incidents() {
    const navigation = useNavigation();
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    async function loadIncidents() {
        if(loading) {
            return;
        }

        if(total > 0 && incidents.length === total) {
            return
        }

        setLoading(true);

        const response = await api.get('/incidents', {
            params: { page }
        });

        setIncidents([...incidents, ...response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() => {
        loadIncidents();
    },[])

    function navigateToDetail(incident) {
        navigation.navigate('Detail', { incident });
    }

    return (
        <>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image source={LogoImg} />
                    <Text style={styles.headerText}>
                        Total de <Text style={styles.headerTextBold}>{total} casos</Text>
                    </Text>
                </View>
                <Text style={styles.title}>Bem-Vindo!</Text>
                <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia</Text>

                <FlatList
                    style={styles.incidentList}
                    showsVerticalScrollIndicator={false}
                    onEndReached={loadIncidents}
                    onEndReachedThreshold={0.5}
                    data={incidents}
                    keyExtractor={incident => String(incident.id)}
                    renderItem={({item}) => (
                        <View style={styles.incident}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View style={{flexDirection: 'column'}}>
                                    <Text style={styles.incidentProperty}>CASO:</Text>    
                                    <Text style={styles.incidentValue}>{item.title}</Text>
                                </View>
                                <View style={{flexDirection: 'column', marginRight: 15}}>
                                    <Text style={styles.incidentProperty}>ONG:</Text>    
                                    <Text style={styles.incidentValue}>{item.name}</Text>
                                </View>
                            </View>

                            <Text style={styles.incidentProperty}>Valor:</Text>    
                            <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.value)}</Text>

                            <TouchableOpacity onPress={() => navigateToDetail(item)} style={styles.detailsButton}>
                                <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                                <Feather name="arrow-right" size={16} color='#e02041' />
                            </TouchableOpacity>
                        </View>
                    )}
                /> 
            </View>
        </>
    );
}