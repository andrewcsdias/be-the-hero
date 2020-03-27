//necessário para todo lugar onde for usar componentes/JSX
import React/*, {useState}*/ from 'react'; // useState é para utilizar o conceito de Estado do React, atualizando componentes em tempo real

//import Header from './Header';

import './global.css';

import Routes from './routes'; // user o componente de rotas

// componente REACT
// JSX = JavaScript XML (HTML dentro do JS)
function App() {
  // Usar Estado do React
  // useState() retorna um array com [valor, função de atualização]
  // podemos desestruturar o array dessa forma
  /*const [counter, setCounter] = useState(0);

  function increment(){
    // não pode ser usado por causa da Imutabilidade do React, 
    // um Estado nunca deve ser alterado de maneira direta
    //counter++;

    // setCounter irá atualizar o Estado da variável do contador, respeitando a Imutabilidade
    setCounter(counter+1);
  }
  
  return (
    //<Header title="Be The Hero"/> //title é uma propriedade do componente
    // outra forma de passar uma propriedade é entre <Header></Header>, acessada depois com props.children
    <div>
      <Header>Be The Hero {counter}</Header>
      <button onClick={increment}>Incrementar</button>
    </div>
  );*/

  return (
    <Routes />
  );
}

export default App;
