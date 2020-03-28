import React, {useState, useEffect} from 'react';
import {Feather} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native'
import {View, FlatList, Image, Text, TouchableOpacity} from 'react-native';

import api from '../../api';

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Incidents() {
    // para navegação entre páginas
    const navigation = useNavigation();

    // objeto de incidents
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    // controlar se o carregamento de mais dados está em andamento
    const [loading, setLoading] = useState(false);

    // carrega os casos
    async function loadIncidents(){
        // evitar que mais de uma requisição seja feita sem que a anterior acabe
        if (loading) {
            return;
        }

        // impede a requisição caso não haja mais itens para serem carregados
        if (total > 0 && incidents.length === total) {
            return;
        }

        // incida o início da requisição
        setLoading(true);
        
        const response = await api.get('incidents',{
            params: {page}
        });

        // preenche o objeto com o resultado da requisição
        // ao invés de sobrescrever, iremos ir adicionando o resultado da requisição
        setIncidents([...incidents, ...response.data]);
        // total de casos (vem no response header)
        setTotal(response.headers['x-total-count']);
        // incrementa o número de página
        setPage(page+1);
        // incida o fim da requisição
        setLoading(false);
    }

    // 1º paramêtro: função a ser executada
    // 2º paramêtro: array de dependência da execução, [] para executar apenas uma vez
    useEffect(() => {
        loadIncidents();
    }, []);

    // vai para a rota Detail
    function navigateToDetail(incident){
        navigation.navigate('Detail', {incident});
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
                </Text>
            </View>

            <Text style={styles.title}>Bem vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

            <FlatList data={incidents} 
                style={styles.incidentList} 
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({item: incident}) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>

                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentValue}>
                            {Intl
                                .NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
                                .format(incident.value)
                            }
                        </Text>

                        <TouchableOpacity style={styles.detailsButton} 
                            onPress={() => navigateToDetail(incident)}
                        >
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#E02041" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}