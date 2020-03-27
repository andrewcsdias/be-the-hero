import React from 'react';

export default function Header({children}){ //outra forma de exportar o componente
    // as propriedades são acessadas pelo parâmetro props (props.title , por ex),
    // ou, o objeto props pode ser desestruturado
    return (
        <header>
            <h1>{children}</h1> 
        </header>
    );
}