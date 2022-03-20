# React + state manager  + hooks + optimizing render

Projeto desenvolvido para estudo de gerenciamento de estado em React e otimização de renderização com hooks. Nele contém 5 exemplos onde é possível observar as particularidades de implementação de cada estratégia na construção da mesma solução(chat de mensagens).

Baixe o projeto e execute:

    npm install

    npm run dev

<h1>Estratégias utilizadas em cada exemplo:</h1>
<ol>
    <li>
        <a href="https://medium.com/swlh/avoid-prop-drilling-with-react-context-a00392ee3d8" target="_black"> Props drilling</a> - Os estados são passados do componente pai para os componentes filhos por props.
    </li>
    <li>
        <a href="https://reactjs.org/docs/context.html" target="_blank">
        Context api</a> - Utiliza a Context api do React para gerenciamento e compartilhamento de estados entre componentes, sem a necessidade de passar por props.
    </li>
    <li>
        <a href="https://zustand.surge.sh/" target="_blank">
        Zustand</a> - Utiliza um gerenciador de estado para compartilhamento de estado entre componentes, previne renderizações desnecessárias.
    </li>
    <li>
        <a href="https://redux-toolkit.js.org/" target="_blank">
        Redux Toolkit</a> - Utiliza o gerenciador de estado redux com a ferramenta redux-tookit, previne renderizações desnecessárias.
    </li>
    <li>
        <a
        href="https://reactjs.org/docs/hooks-reference.html#usecallback"
        target="_blank"
        >
        Otimização de renderizações
        </a>desnecessárias utilizando os hooks useCallback e useMemo em um cenário com compartilhamento de estado por props.
    </li>  
</ol>


<h1>Tecnologias</h1>
<ul>
    <li>
        <a href="https://reactjs.org/docs/context.html" target="_blank">
        React v17 context-api
        </a>
    </li>
    <li>
        <a href="https://zustand.surge.sh/" target="_blank">
        Zustand v3.7 state-manager
        </a>
    </li>
    <li>
        <a href="https://redux-toolkit.js.org/" target="_blank">
        Redux Toolkit v1.8 state-manager
        </a>
    </li>
    <li>
        <a
        href="https://reactrouter.com/docs/en/v6/getting-started/installation"
        target="_blank"
        >
        React Router v6
        </a>
    </li>
    <li>
        <a href="https://vitejs.dev/" target="_blank">
        Vite v2.6
        </a>
    </li>
</ul>