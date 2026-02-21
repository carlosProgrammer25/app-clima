import './css/Search.css';
import { useState } from 'react';



export default function Search(props) {

    //criando estado sem valor
    const [cidade, setCidade] = useState(null);

    //funcao onde sera buscado api
    function searchInput(props) {
        props.preventDefault();

        //pegando valor da propriedade searchInput
        const currentValue = props.target.elements.searchInput.value;

        //se currentValue for vazio retorne
        // ! inverte o valor = se for false(vazio) ! inverte para true
        if (!currentValue) return;

        //cria uma url dinamica para buscar na api da OpenWeatherMap
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${currentValue}&appid=4d8fb5b93d4af21d66a2948710284366&units=metric&lang=pt_br`;

        //fetch funcao js para fazer requisicao http, retorna uma promise
        //
        fetch(url)
        //resposta da api vem em formato .json | json() é chamado para transformar em um objeto js
        .then(response => response.json()).then(response_json => {
            //sys contem informacoes do sistema da cidade
            //weather array com informacoes do clima
            if (response_json.sys && response_json.weather) {
                setCidade(response_json); // Guarda os dados da API
            } else {
                setCidade(null);
            }
        })
        //caso o retorno de fecth seja erro
            .catch(err => {
                console.error(err);
                setCidade(null);
            });
    };


    return (
        <div className="searchWraper">
            <div className="Search">

                <h2>Digite a cidade...</h2>

                <form onSubmit={searchInput}>
                    <input placeholder={props.passar} type="text" name="searchInput" />
                    <input type="submit" value="Pesquisar por cidade!" />
                </form>

            </div>


            {/* Dados do clima */}
            {cidade ? (
                //sucesso
                <div className="ClimaCard">
                    <p className="Temperatura">{cidade.main.temp} °C</p>
                    <p className="Pais">{cidade.sys.country}</p>
                    <p className="Cidade">{cidade.name}</p>
                    <p className="Descricao">{cidade.weather[0].description}</p>
                    <img
                        className="IconeClima" src={`https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${cidade.weather[0].icon}.svg`} alt="Ícone do clima"
                    />
                </div>
            ) : (
                //erro
                <div className="Mensagem">Pesquise por algo acima...</div>
            )}
        </div>
    );
}



/*
React para criar interfaces de usuário dinâmicas, permitindo atualizar a página sem recarregar, usando o conceito de componentes e estado (componente é um bloco de código que atualiza toda vez que o estado muda).

Recursos principais usados: funções, fetch API para enviar requisições HTTP, promises e template strings para URLs dinâmicas.

HTML e CSS para estrutura e estilos da página web.

API OpenWeatherMap, o front-end faz requisições para obter a previsão do clima da cidade (não há backend próprio, todas as requisições são feitas diretamente para a API).
*/
