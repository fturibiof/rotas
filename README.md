# Rotas de viagem

Um turista deseja viajar pelo mundo pagando o menor preço possível independentemente do número de conexões necessárias. Vamos construir um programa que facilite ao nosso turista, escolher a melhor rota para sua viagem.

# Instalação
Para instalar basta rodar o seguinte comando:
```
npm i
```

# Execução
Para rodar o programa, utilize o seguinte comando:
```
node index csfFile.csv
```
Sendo que o argumento ```csfFile.csv``` é o nome do arquivo desejado. Caso nenhum valor seja fornecido, será utilizado o arquivo default ```input-routes.csv```

## Interface console
Neste modo, insira o caminho desejado na forma XXX-YYY.
A rota com o menor custo será exibida em seguida.

## Interface API Rest
Por padrão, o programa inicializa um servidor no localhost, porta 3000.
Para fazer uma consulta, faça uma chamada GET para ```localhost:3000/?from=XXX&to=YYY```

Para inserir uma nova rota, faça uma chamada POST, com um corpo no formato JSON para para ```localhost:3000/``` :
```
{
    "from": "ORL",
    "to": "GRU",
    "value": 10
}
```

# Arquivos
A aplicação conta com 5 arquivos javascript, separados por funcionalidade:

### index.js
É o arquivo de entrada onde se encontra a função main, responsável por pegar o dar o start no servidor, pegar o input do usuário e chamar as outras funções necessárias para o funcionamento do programa

### PathFinding.js
Onde se encontra a lógica do cálculo de custo de viagem. Foi implementado com base no algoritmo Dijkstra, que encontra o caminho mais curto numa rede de grafos com arestas de pesos não negativos.

### Route.js
Contém as classes Node e Edge, que foram utilizadas para a construção do grafo no PathFinding.

### FileHandler.js
Responsável por manipular o arquivo csv onde se encontram as rotas. Pode ler e adicionar novas rotas.

### Server.js
Arquivo que contém o servidor, que utiliza o ```express.js```. Libera dois endpoints, descritos acima na seção Interface API Rest
