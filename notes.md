##### 29/02/2024

Curso de Angular: componentização, formulários e interação com APIs

```
ng generate enviromnments
cd jornada-milhas-api
npm run start:dev
ng serve --open
```

@01-Serviços e injeção de dependencia 

@@01
Apresentação

Olá! Boas-vindas a mais um curso de Angular! Eu sou Vinicios Neves e vou te acompanhar nessa jornada.
Vinícios Neves é um homem de pele clara com rosto oval. Tem olhos castanho-escuros, sobrancelhas grossas, nariz comprido e boca larga. No rosto, tem barba e bigode, além de um óculos de grau com armação quadrada preta. No corpo, uma camiseta cinza. Está sentado em uma cadeira cinza. Ao fundo, uma parede lisa com iluminação em degradê nas cores azul e rosa.
Vamos evoluir o projeto Jornada Milhas. No curso anterior apresentado pela instrutora Nay e eu, implementamos a camada visual com a ajuda do Figma. Recomendamos que ele seja assistido antes deste, contudo, se não houver interesse, disponibilizaremos esse projeto base finalizado.

Com a camada visual implementada, focaremos em desenvolver o comportamento do formulário de busca.

Observando-o superficialmente, parece uma tarefa simples. Contudo, precisaremos compartilhar o estado entre as partes do formulário armazenadas em modais e em outros componentes. Para chegar a esse resultado, experimentaremos diversas situações diferentes, nas quais traçaremos estratégias para atingir nossos objetivos.

Além disso, subiremos o back-end e trabalharemos com requisições, buscando estados brasileiros, promoções e depoimentos.

Para quem é este curso?
Se você:

Já conhece o Angular
Sabe como criar componentes
Entende os ciclos de vida dos componentes
Te convidamos a embarcar conosco no Jornada Milhas mais uma vez e desenvolver toda a aplicação, tornando-a pronta para os próximos passos. Este é só mais um pedaço do que implementaremos nessa aplicação.

Te esperamos no primeiro vídeo!

https://cursos.alura.com.br/course/angular-componentizacao-design-angular-material

@@02
Preparando o ambiente

E aí, dev!
Prepare-se para a aventura de componentização com Angular! Espero que você esteja pronto para essa maratona!

https://media.tenor.com/YlsiZ6Rbf8gAAAAC/adventure-thehobbit.gif

Primeiramente, precisamos alinhar nossas ferramentas. Estou usando o Angular na versão 16 durante esse curso e recomendo que você faça o mesmo, para podermos evitar percalços no caminho. Para checar qual a versão você está usando, é simples, basta executar o comando 'ng version' no terminal.

Se por acaso o Angular ainda não está na sua máquina ou está em uma versão diferente da recomendada, não tem problema, é só rodar o comando abaixo no terminal e partir para o abraço:

 npm install -g @angular/cli@16.0.0
COPIAR CÓDIGO
Você vai precisar do backend do Jornada, que você pode baixar aqui ou clonar usando o seguinte comando:

git clone https://github.com/viniciosneves/jornada-milhas-api.git
COPIAR CÓDIGO
Depois, precisamos instalar as dependências e executar o script que inicia o projeto:

npm i
COPIAR CÓDIGO
E:

npm run start:dev	
COPIAR CÓDIGO
Durante nossa jornada, vamos partir de um design já pronto e dar vida a ele, transformando-o em código. Para acessar esse layout, é só clicar aqui.

Por fim, precisamos do projeto do curso anterior. Se você ainda não tem o seu, não se preocupe! Pode baixá-lo aqui. Depois de fazer download do arquivo zip e descompactar a pasta, basta instalar as dependências:

npm i
COPIAR CÓDIGO
E se surgir alguma dúvida nesse percurso? Não se preocupe! Estamos todos aprendendo juntos. Dê um pulo no Discord da Alura e pode chamar. Você pode me encontrar lá (#vinnyneves), junto com a Nayanne Batista no perfil #nayannebatista, o Diego Carlos no perfil #diegocarls e a Rafa Silvério,no perfil #rafasilverio e todos nós podemos te ajudar nesse percurso Angular. E mesmo que você não tenha dúvidas, apareça por lá! Queremos ver o seu progresso e compartilhar esse aprendizado.

Bora começar essa aventura? Let's vamos!

https://www.figma.com/file/SI696t31Q9zlsXKttCoqKP/Angular%3A-Componentização-e-Design-com-Angular-Material-%7C-Jornada-Milhas?type=design&node-id=4-6408&mode=design&t=mbPrjVmfW9SNTi3U-0

https://cursos.alura.com.br/course/angular-componentizacao-design-angular-material

https://github.com/alura-cursos/jornada/archive/1a1a3c686d3f2b708b5964b91fc455a418fffd67.zip

@@03
Entendendo o providedIn

Para evoluir o Jornada Milhas, nos preocuparemos em criar a camada de comunicação que obterá dados de promoções da API (a fonte de verdade).
Instalando e configurando o projeto
Após clonar o projeto do curso anterior em uma pasta denominada "jornada-milhas" e alocar a API em uma pasta denominada "api-jornada-milhas", vamos abrir o terminal, por meio do qual acessaremos a pasta da API com o comando abaixo.

cd api-jornada-milhas
COPIAR CÓDIGO
Em seu interior, rodaremos o comando abaixo para garantir que tudo está atualizado.

npm i
COPIAR CÓDIGO
Para subir a API, rodaremos o comando abaixo.

npm run start:dev
COPIAR CÓDIGO
Como resultado, a API ficará disponível na porta 8080. Vamos abrir uma nova guia do navegador e digitar o caminho abaixo para acessá-la.

localhost:8080/api
COPIAR CÓDIGO
Em seu interior, veremos o título "Jornada Milhas 1.0" e uma lista de métodos disponíveis. Inicialmente, vamos focar no método que buscará promoções.

GET/promocoes
COPIAR CÓDIGO
Essa documentação é o Swagger e nos permite experimentar a execução deste método para verificar seu funcionamento. Vamos clicar nele para abrir uma seção abaixo dele, no interior da qual buscaremos o botão "Try it out" (Testar) no canto superior direito.

Após o clique neste botão, será exibido abaixo dele um botão denominado "Execute" (Executar), ocupando toda a largura da tela. Após clicarmos nele, dentro do Swagger ocorrerá uma divisão que o transformará em dois botões: "Execute" à esquerda e "Clear" (Limpar)" à direita.

Abaixo de ambos, serão exibidas três seções: a primeira delas, intitulada "Curl" é a superior, dentro da qual veremos que ele executou uma requisição do tipo GET em localhost:8080/promocoes.

curl -X 'GET' \
    'http://localhost:8080/promocoes' \
    -H 'accept: application/json'
COPIAR CÓDIGO
A seção do meio se chama "Request URL" (URL da requisição) e possui a URL utilizada.

http://localhost:8080/promocoes
COPIAR CÓDIGO
Já a maior seção, abaixo da segunda, denomina-se "Server Response" (Resposta do Servidor). Nela, temos duas colunas: à esquerda, a coluna "Code" com o código de status "200"; à direita, "Details" (Detalhes), que possui o bloco intitulado "Response body" (Corpo da resposta). Este último trouxe a estrutura da promoção, constituída de um ID, um destino, a URL de uma imagem e o preço.

[
    {
    "id": 11,
    "destino": "Atacama",
    "imagem": "http://localhost:8080/public/atacama.png",
    "preco": 2500
    },
    {
    "id": 12,
    "destino": "Veneza",
    "imagem": "http://localhost:8080/public/veneza.png",
    "preco": 1500
    },
    {
    "id": 13,
    "destino": "Patagônia",
    "imagem": "http://localhost:8080/public/patagonia.png",
    "preco": 750
    },
*Trecho do retorno omitido*
]
COPIAR CÓDIGO
Vamos conectar o Jornada Milhas nesse back-end. Para isso, voltaremos ao terminal, no qual abriremos uma nova aba. Nesta, voltaremos ao Desktop com o comando abaixo.

cd ..
COPIAR CÓDIGO
Listaremos as pastas com o comando abaixo.

ll
COPIAR CÓDIGO
Nos resultados, veremos as pastas "api-jornada-milhas" e "jornada-milhas".

drwxr-xr-x 21 vinny staff 672B Jun 28 20:39 api-jornada-milhas
drwxr-xr-x 15 vinny staff 480B Jun 28 20:28 jornada-milhas

Entraremos na pasta do curso anterior por meio de um cd nela.

cd jornada-milhas
COPIAR CÓDIGO
Rodaremos o comando abaixo para instalar todas as dependências desse projeto.

npm i
COPIAR CÓDIGO
Observação: O npm i constitui o atalho para o comando npm install.
Após a instalação dos pacotes, faremos um ng serve para subir o ambiente de desenvolvimento do Angular.

ng serve
COPIAR CÓDIGO
Enquanto isso, abriremos uma terceira aba no terminal, onde solicitaremos a execução do VS Code a partir da pasta "jornada-milhas".

code .
COPIAR CÓDIGO
Neste momento, temos a janela do VS Code, o terminal, cuja segunda aba está executando o Angular na porta 4200 e a primeira aba está executando a API. Temos que manter ambos rodando.

Voltando ao navegador, abriremos uma nova guia na qual acessaremos a URL abaixo

localhost:4200
COPIAR CÓDIGO
Essa URL carregará a página inicial do Jornada Milhas, na qual temos modais ativados pelos filtros de categorias — por exemplo, na seção "Passagens", temos dois botões para as categorias "1 adulto" e "Econômica", respectivamente. Clicando em uma delas, um modal intitulado "Viajante" será exibido, onde temos a opção de selecionar e buscar uma dessas categorias.

Na mesma seção, abaixo dos botões, temos campos de busca e de data para configurar nossas viagens. Podemos ver que nosso projeto base funciona, contudo, ele é estático.

Se descermos a tela para a seção "Promoções" veremos vários cartões iguais, representando uma viagem para Veneza por R$ 500,00. Vamos mudar isso e trazer dinamismo para o projeto.

Voltando à guia do navegador com a página do Swagger aberta na porta 8080, veremos o retorno que já abordamos e que contém a estrutura de uma promoção — ou seja, nossa interface. Ela possui:

Um ID numérico;
Um o destino do tipo string;
Uma imagem do tipo string;
Um preço numérico.
A partir dessas informações, voltaremos ao VS Code e acessaremos o explorador lateral, no qual percorreremos o caminho de pastas "src > app" e criaremos dentro desta última a pasta "core". Em seu interior, alocaremos tudo o que for global na aplicação.

Dentro de "core", criaremos outra pasta denominada "types", em cujo interior criaremos o arquivo types.ts, que alocará todas as interfaces.

Dica: Também é possível separar cada interface em um arquivo. Fica a critério de cada dev.
No interior do arquivo types.ts, criaremos uma interface de Promocao, exportando-a ao mesmo tempo, com o comando export interface Promocao. À sua direita, abriremos um bloco de chaves, dentro do qual receberá os atributos vistos:

id: number
destino: string
imagem: string
preco: number
export interface Promocao {
    id: number
    destino: string
    imagem: string
    preco: number
}
COPIAR CÓDIGO
Com a forma da interface de Promocao criada, podemos pedir ao Angular que gere um serviço para realizar a camada de comunicação entre nossa aplicação e o back-end.

Gerando o serviço de Promoções
Voltando ao terminal, temos a terceira aba com acesso à pasta "jornada-milhas", parada e disponível. Dentro dessa pasta, pediremos para que o angular (ng) gere um serviço (g s).

Vamos solicitar que seja criada a pasta "services" (serviços) e o arquivo promocao dentro da pasta "core", por meio do comando core/services/promocao.

ng g s core/servicos/promocao
COPIAR CÓDIGO
Pressionaremos "Enter" para rodar o comando acima. O terminal nos avisará que a geração foi efetuada, mas conferiremos no VS Code.

Por meio do explorador, expandiremos o caminho de pastas "app > core > services" e veremos dois arquivos:

promocao.service.spec.ts, referente aos testes;
promocao.service.ts, referente ao serviço em si.
No interior do arquivo de serviço, veremos que ele foi criado como Injectable — ou seja, podemos injetá-lo em nossas classes do Angular. Além disso, ele provém do root — isso significa que só haverá uma instância deste serviço para a aplicação inteira.

O nome deste padrão de projetos é Singleton — caso queira mergulhar neste assunto, disponibilizaremos nessa aula uma atividade sobre ele.

import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PromocaoService {

    constructor() { }
}
COPIAR CÓDIGO
Com a base pronta e os serviços gerados, configuraremos a camada HTTP necessária para se comunicar com o back-end. Faremos isso a seguir.

@@04
Manipulando variáveis de ambiente

O Angular, similar a um canivete suíço com mil e uma utilidades, nos entrega a camada que abstrai as requisições HTTP necessárias para que o Jornada Milhas funcione integrado ao back-end.
Criando a camada de comunicação
Acessaremos o VS Code e, no interior do arquivo promocao-service.ts, injetaremos o nosso HttpClient entre os parênteses do constructor(). Vamos pressionar "Enter" neste local e adicionar o nível de acesso private junto a um httpClient com "h" minúsculo.

Vamos tipá-lo como HttpClient com "h" maiúsculo para que o Angular saiba o que queremos injetar aqui.

@Injectable({
    providedIn: 'root'
})
export class PromocaoService {

    constructor(
            private httpClient: HttpClient
        ) { }
}
COPIAR CÓDIGO
Ao digitar "HttpClient", o VS Code abrirá uma lista de sugestões, entre as quais há a importação do HttpClient proveniente da rota "@angular/common/http".

Vamos selecioná-la, permitindo que seja importada no início do arquivo atual por meio do comando abaixo.

import { HttpClient } from '@angular/common/http';
COPIAR CÓDIGO
Vamos salvar o código e voltar ao navegador, onde verificaremos a aba da aplicação na porta 4200 em busca do resultado.

Vamos recarregar a página e abrir a aba do inspecionador de elementos por meio do botão direito e da opção "Inspecionar Elemento". Acessaremos esse inspecionador na aba lateral direita, selecionando a guia do console e verificando que não há erros apontados.

Com isso, temos nosso HttpClient disponível para uso. Voltaremos ao VS Code e seguiremos para a próxima etapa.

No mesmo arquivo promocao-service.ts, abaixo do HttpClient, adicionaremos um método. Considerando que se trata de um serviço que trata exclusivamente de promoções, listando as disponíveis, podemos chamar esse método de listar().

@Injectable({
    providedIn: 'root'
})
export class PromocaoService {

    constructor(
            private httpClient: HttpClient
        ) { }
        
        listar() {
        
        }
}
COPIAR CÓDIGO
Vamos tipá-lo, pedindo que retorne um Observable. Ao digitar "Observable", o VS Code abrirá uma lista de sugestões, entre as quais há a importação do Observable proveniente de "rxjs".

Vamos selecioná-la, permitindo que seja importada no início do arquivo atual por meio do comando abaixo.

import { Observable } from 'rxjs';
COPIAR CÓDIGO
Esse Observable, no qual adicionaremos o Generics do TypeScript por meio dos sinais de menor e maior para dizer em seu interior que ele trabalha com Promocao. Este último é o type, ou seja, a interface que acabamos de criar.

O Promocao é um arranjo com uma lista de promoções, portanto, adicionaremos um par de colchetes à sua direita.

@Injectable({
    providedIn: 'root'
})
export class PromocaoService {

    constructor(
            private httpClient: HttpClient
        ) { }
        
        listar() : Observable<Promocao[]>{
        
        }
}
COPIAR CÓDIGO
No interior das chaves de listar, adicionaremos um this.httpClient.get<Promocao>() que retornará um arranjo de promoção, por isso utilizaremos o Generics. À esquerda desta linha, adicionaremos um return.

Entre os parênteses, adicionaremos aspas simples, entre as quais informaremos a URL na qual a requisição será efetuada.

@Injectable({
    providedIn: 'root'
})
export class PromocaoService {

    constructor(
            private httpClient: HttpClient
        ) { }
        
        listar() : Observable<Promocao[]>{
            return this.httpClient.get<Promocao>('')
        }
}
COPIAR CÓDIGO
Quando falamos em URL, temos a API rodando no navegador em "localhost:8080". No ambiente de desenvolvimento, esta é a URL utilizada.

Quando publicarmos a aplicação, é provável que o endereço mude. Pensando nisso, qualquer aplicação robusta, inclusive o Angular, entrega uma forma para lidar com essas variáveis de ambiente.

No navegador, voltaremos à guia aberta com a documentação do Angular, onde buscaremos a seção "Configuring application environments" (Configurando ambientes da aplicação).

Nela, o primeiro comando é solicitar ao ng que gere os ambientes.

ng generate environments
COPIAR CÓDIGO
Vamos copiar esse código e voltar à terceira aba do terminal, que está disponível. Lembrando que temos outras duas abas rodando o front-end (Angular) e o back-end. Ambas não podem ser fechadas.

Vamos colar o código na aba disponível e pressionar "Enter". No retorno, o terminal dirá que o arquivo angular.json foi criado e atualizado.

UPDATE angular.json (3283 bytes)
Vamos voltar ao VS Code, rolar a aba do explorador para baixo e localizar a pasta "environments", dentro da qual encontraremos dois arquivos: environment.development.ts (o ambiente de desenvolvimento) e environment.ts (o ambiente produtivo).

Dentro de environment.development.ts, temos um bloco de chaves do export const environment. Entre as chaves, criaremos a apiUrl que receberá a string do endereço base da API. Vamos recolhê-la no Swagger.

Voltando ao navegador, na aba do Swagger, veremos o endereço "localhost:8080/api#/default/PromocoesController_findAll". Ou seja, usaremos a porta 8080.

A API mencionada nesse endereço se refere ao endereço da documentação do Swagger. Dentro da página em si, temos a seção "Request URL", onde veremos o exemplo com o endereço a ser utilizado: "http://localhost:8080/promocoes".

A partir do endereço de exemplo, copiaremos somente a base.

http://localhost:8080
COPIAR CÓDIGO
Voltando ao VS Code, colaremos o conteúdo copiado entre as aspas simples de apiUrl, dentro do ambiente de desenvolvimento.

export const environment = {
    apiUrl = 'http://localhost:8080'
}
COPIAR CÓDIGO
Por meio do explorador, acessaremos o arquivo environment.ts, referente ao ambiente produtivo. Entre as chaves de export const environment, adicionaremos a mesma apiUrl que receberá entre aspas simples a URL final — que, neste caso, será http://api.jornadamilhas.com.

Essa URL não existirá, por enquanto. Contudo, servirá para alcançar o objetivo de alinhar os arquivos, criando uma entrada de produção correspondente a cada entrada de desenvolvimento.

export const environment = {
    apiUrl = 'http://api.jornadamilhas.com'
}
COPIAR CÓDIGO
Após criar os ambientes, temos que "derrubar" o Angular e subi-lo novamente, permitindo que ele saiba lidar com os novos elementos. Para isso, acessaremos a segunda aba do terminal, na qual pressionaremos "Ctrl+C" para parar a execução.

Vamos limpar esse terminal e rodar em seguida o ng serve para servir a aplicação.

ng serve
COPIAR CÓDIGO
Durante este momento, ele sobrescreverá automaticamente o environment com o environment.development, permitindo o acesso à API http://localhost:8080 que funcionará somente em nossa máquina.

Com o acesso disponível, voltaremos ao serviço promocao.service.ts, onde criaremos um atributo private chamado apiUrl tipado como string. Ele será adicionado na primeira linha entre as chaves do export class PromocaoServico.

Vamos importar o arquivo environment. Para que o Angular funcione, sempre devemos importar este, e não o environment.development, portanto, selecionaremos na lista de sugestões do editor a opção "environment" proveniente do caminho "src/environments/environment".

Importação automática do VS Code:

import { environment } from 'src/environments/environment';
COPIAR CÓDIGO
Se adicionarmos um ponto à direita de environment, o editor sugere apiUrl. Vamos selecioná-lo.

Código da classe atual:

@Injectable({
    providedIn: 'root'
})
export class PromocaoService {

    private apiUrl: string = environment.apiUrl;

    constructor(
            private httpClient: HttpClient
        ) { }
        
        listar() : Observable<Promocao[]>{
            return this.httpClient.get<Promocao>('')
        }
}
COPIAR CÓDIGO
Por último, entre os parênteses de this.httpClient.get<Promocao>(''), retiraremos as aspas simples e adicionaremos um this.apiUrl e concatenaremos o /promocao. Para isso, adicionaremos crases e chaves ao redor de this.apiUrl. À esquerda da chave de abertura, adicionaremos um dólar ($).

Com isso, a string será interpolada. À direita da chave de fechamento, adicionaremos o restante da URL: /promocoes.

@Injectable({
    providedIn: 'root'
})
export class PromocaoService {

    private apiUrl: string = environment.apiUrl;

    constructor(
            private httpClient: HttpClient
        ) { }
        
        listar() : Observable<Promocao[]>{
            return this.httpClient.get<Promocao>(`${this.apiUrl}/promocoes`)
        }
}
COPIAR CÓDIGO
Com essa configuração, temos uma forma de realizar a requisição HTTP. Tudo pronto para testarmos.

Por meio do explorador, buscaremos a pasta "pages", dentro da qual acessaremos o arquivo home.component.ts.

Em seu interior, entre as chaves de export class HomeComponent, criaremos um constructor() acompanhado de um bloco de chaves. Entre seus parênteses, configuraremos o modificador de acesso private denominado servicoPromocao que receberá o tipo PromocaoService.

export class HomeComponent {
    constructor(private servico Promocao: PromocaoService) {
    
    }
}
COPIAR CÓDIGO
Ao digitar o tipo, o editor sugerirá a importação de PromocaoService proveniente de "src/app/core/services/promocao.service". Vamos selecioná-la, permitindo a importação automática dela através do comando abaixo.

import PromocaoService } from 'src/app/core/services/promocao.service';
COPIAR CÓDIGO
À direita de HomeComponent, faremos um implements OnInit. Com isso, a classe HomeComponent será sublinhada em vermelho, apresentando um erro. Se posicionarmos o cursor em cima dele, o editor exibirá um diálogo avisando que, para implementar o OnInit, essa classe deve implementar o método ngOnInit.

Para implementá-lo, clicaremos no ícone de lâmpada azul, localizada acima da linha atual, no canto esquerdo. Ele abrirá uma caixa de sugestão, na qual selecionaremos "Implement interface 'OnInit'" (Implementar interface 'OnInit').

Após o clique, o VS Code construirá o método ngOninit() abaixo do construtor.

export class HomeComponent {
    constructor(private servico Promocao: PromocaoService) {
    
    }
    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }
}
COPIAR CÓDIGO
Ele não fará um throw new Error, por isso, deletaremos essa linha e a substituiremos por um this.servicoPromocao.listar().

export class HomeComponent {
    constructor(private servico Promocao: PromocaoService) {
    
    }
    ngOnInit(): void {
        this.servicoPromocao.listar();
    }
}
COPIAR CÓDIGO
Vamos verificar no navegador se essa requisição será feita. Na aba da aplicação Jornada Milhas, recarregaremos a página e veremos um erro de muitas linhas na aba lateral do console, indicando que não há um provedor HttpClient e consequentemente o Angular não consegue realizar a entrega.

ERROR Error: Uncaught (in promise):
NullInjectorError: R3InjectorError (AppModule) [PromocaoService -> HttpClient-> HttpClient]:

NullInjectorError: No provider for HttpClient!

Retorno omitido

Isso ocorreu porque não configuramos o módulo HTTP.

Voltando ao VS Code, no explorador, acessaremos o arquivo app.module.ts dentro do caminho de pastas "src > app". Em seu interior, buscaremos o arranjo de imports, dentro do qual adicionaremos como último elemento um HttpClientModule.

imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatButtonToggleModule,
    MatIconModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    HttpClientModule
]
COPIAR CÓDIGO
Voltando ao navegador, veremos que o erro não aparece mais no console. Vamos recarregar a página e constatar que tudo funciona bem.

À direita da aba "Console", clicaremos na aba "Network", recarregaremos a página e veremos que a requisição não será feita.

Temos o serviço funcionando, realizamos as injeções, mas não conseguimos verificar a execução da requisição nem visualizar os dados. As seguir, veremos como resolver esse problema.

@@05
De olho no observable

Temos o serviço que sabe listar promoções, mas não conseguimos visualizar as requisições, nem realizamos um console.log() com essa resposta.
Verificando o problema com console.log()
Voltando ao VS Code, acessaremos o método OnInit no interior do arquivo home.component.ts. À direita do método this.servicoPromocao.listar(), pressionaremos "Enter" e adicionaremos um .subscribe() nesse método para nos inscrevermos nesse Observable.

Quando ele estiver pronto, retornará uma resposta. Para isso, adicionaremos o comando resposta => {}entre os parênteses de subscribe(). Entre as chaves, por sua vez, faremos um console.log() de resposta.

export class HomeComponent {
    constructor(private servico Promocao: PromocaoService) {
    
    }
    ngOnInit(): void {
        this.servicoPromocao.listar()
                .subscribe(
                    resposta => {
                        console.log(resposta)
                    }
                )
    }
}
COPIAR CÓDIGO
Com isso, visualizaremos o conteúdo entregue pelo Observable através do log do console.

Voltando ao navegador, recarregaremos a página da aplicação e verificaremos a aba "Network", onde veremos que a requisição "promocoes" apareceu na resposta, precisamente na aba secundária "Name", no trecho central.

Desceremos a aba "Network" até a porção inferior, onde arrastaremos para cima a borda superior barra de menus secundária que contém a guia "Console". Com isso, ampliaremos seu tamanho.

Em seu interior, veremos um log do console listando as seis promoções.

(6) [{-},{-}, {-}, {-}, {-}, {-}]
> 0: {id: 11, destino: 'Atacama', imagem: 'http://localhost:8080/public/atacama.png', preco: 2500}
> 
> 1:{id: 12, destino: 'Veneza', "imagem": "http://localhost:8080/public/veneza.png", preco: 1500}
> 
> 2: {id: 13, destino: 'Patagônia', imagem: 'http://localhost:8080/public/patagonia.png', preco: 750}
> 
> *Retorno omitido*
COPIAR CÓDIGO
Recarregaremos a página da aplicação e conseguiremos visualizar a requisição sendo efetuada. Na porção central da aba de inspeção, na aba secundária "Name", clicaremos na requisição "promocoes", exibindo à sua direita uma barra de menus com a opção "Preview" (prévia) selecionada.

No interior desta, veremos a lista de promoções contidas por essa requisição, ou seja, o resultado retornado pela API.

[{id: 11, destino: "Atacama", imagem: "http://localhost:8080/public/atacama.png", preco: 2500},
{id: 12, destino: "Veneza", imagem: "http://localhost:8080/public/veneza.png", preco: 1500},

{"id": 13, destino: "Patagônia", imagem: "http://localhost:8080/public/patagonia.png", preco: 750},

Retorno omitido

Clicando na guia "Headers" (cabeçalhos), à esquerda de "Preview", veremos a seção "General", dentro da qual veremos a URL utilizada consultando o campo "Request URL", o método utilizado no campo "Request Method" e o código de status retornado no campo "Status Code".

General
Request URL: http://localhost:8080/promocoes.

Request method: GET

Status Code: 200 OK

Abaixo de "General", há as seções "Response Headers" e "Request Headers", com outros cabeçalhos injetados automaticamente pelo HttpClient.

Com as promoções aparecendo, podemos refatorar a aplicação e interromper a exibição estática delas.

Desafio
Temos um desafio para você, se decidir aceitá-lo: implemente a refatoração por conta própria, esquematizando a melhor composição possível e delegando a responsabilidade de recolher as promoções para quem achar adequado. Na atividade após este vídeo, disponibilizaremos um gabarito para ser consultado.

Basicamente, você deve exibir as promoções dinamicamente, substituindo a exibição repetida de "Veneza".

Após o desafio, daremos o próximo passo: observar o formulário de passagens — ou seja, a funcionalidade que se localiza no cabeçalho da nossa página inicial e permite que a pessoa usuária busque por passagens. Nela, teremos:

Uma origem e um destino;
As datas de ida
Configurações de compartilhamento em vários componentes diferentes
Nos vemos no próximo vídeo.

@@06
Listando as promoções

Chegamos em um momento do desenvolvimento do jornada milhas que é necessário listar promoções por meio de uma API utilizando o Angular.
// servicePromocao
listar() : Observable<Promocao[]>{
    return this.http.get<Promocao[]>(this.api_url);
}
COPIAR CÓDIGO
// home
ngOnInit(): void { 	
    this.servicePromocao.listar() 		
        .subscribe( 			
            resposta => console.log(resposta)
        )
}
COPIAR CÓDIGO
// json
[
    {
        /* promoção 1... */
    },
]
COPIAR CÓDIGO
O código fornecido mostra um exemplo de utilização de um serviço chamado servicePromocao para obter uma lista de promoções e exibir o resultado no console.

Considerando o código fornecido, marque as alternativas corretas:

O método listar() do serviço servicePromocao retorna um Observable de um array de objetos do tipo Promocao.
 
O tipo de retorno do método listar() é Observable<Promocao[]>, indicando que ele retorna um Observable que emite um array de objetos do tipo Promocao.
Alternativa correta
A função subscribe() é usada para obter a resposta da requisição e exibir no console.
 
A função subscribe() é utilizada para se inscrever e obter a resposta da requisição assíncrona. Nesse caso, a resposta é exibida no console por meio da função de callback (resposta => console.log(resposta)).
Alternativa correta
O código fornecido está completo e não requer nenhuma modificação adicional para listar as promoções corretamente.
 
Alternativa correta
O resultado esperado da operação é uma lista de promoções exibidas no console.
 
O código fornecido realiza uma requisição HTTP para obter a lista de promoções e, ao receber a resposta, exibe essa lista no console. Portanto, o resultado esperado é que as promoções sejam exibidas no console.

@@07
Desafio: ajustes de layout e novos serviços

Chegou a sua hora da aventura! Nós já temos o serviço que obtém as promoções direto da API. O que falta agora é usar esses dados e atualizar a nossa interface, certo?
Aproveita esse momento para praticar. Eu super recomendo que você experimente, teste e tente chegar no resultado desejado: exibir as promoções baseadas no retorno da API do Jornada. Aqui abaixo eu vou deixar a forma que eu fiz, então não deixe de compartilhar nas redes sociais, no discord ou mesmo no fórum da Alura a forma com que você desenvolveu o seu desafio.

Bora de código?
Eu criei um componente que sabe listar as promoções e renderiza um card de promoção pra cada resultado retornado da API:

<!-- src/app/pages/home/promocoes/promocoes.component.html -->
<div class="card-wrapper">
    <app-card-busca  *ngFor="let item of promocoes" [promocao]="item" />
</div>
COPIAR CÓDIGO
// src/app/pages/home/promocoes/promocoes.component.ts
import { Component, OnInit } from '@angular/core';
import { PromocaoService } from 'src/app/core/services/promocao.service';
import { Promocao } from 'src/app/core/types/type';

@Component({
  selector: 'app-promocoes',
  templateUrl: './promocoes.component.html',
  styleUrls: ['./promocoes.component.scss']
})
export class PromocoesComponent implements OnInit {
  promocoes!: Promocao[];
  constructor(private service: PromocaoService) {
  }
  ngOnInit(): void {
    this.service.listar().subscribe(
      res => {
        this.promocoes = res;
      }
    )
  }
}
COPIAR CÓDIGO
Migrei também o seguinte estilo pros nossos estilos globais:

/*  src/styles.scss */
.card-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    row-gap: 16px;
    margin-bottom: 40px;
}
COPIAR CÓDIGO
E o componente CardBusca:

<mat-card class="card-busca">
  <img mat-card-image src="{{ promocao.imagem }}" alt="Imagem de Veneza">
  <mat-card-content>
    <ul>
      <li>{{promocao.destino}}</li>
      <li>R$ {{promocao.preco }}</li>
    </ul>
  </mat-card-content>
  <mat-card-actions>
    <button mat-flat-button color="primary">VER DETALHES</button>
  </mat-card-actions>
</mat-card>
COPIAR CÓDIGO
import { Component, Input } from '@angular/core';
import { Promocao } from 'src/app/core/types/type';

@Component({
  selector: 'app-card-busca',
  templateUrl: './card-busca.component.html',
  styleUrls: ['./card-busca.component.scss']
})
export class CardBuscaComponent {
  @Input() promocao!: Promocao;
}
COPIAR CÓDIGO
Aqui, utilizei uma forma de solucionar o desafio, mas que não é a única. Se você descobrir outra maneira que também funcione, fique à vontade para compartilhar com outras pessoas na nossa comunidade do Discord, no fórum do curso ou mencionar a Alura nas redes sociais com a hashtag #AprendiNaAlura. Estamos todos juntos nessa!

@@08
Para saber mais: trabalhando com Serviços Singleton

No Angular, os serviços são classes que têm a responsabilidade de fornecer funcionalidades específicas e compartilhadas em toda a aplicação. Ele é fundamental para separação de preocupações isolando a lógica de negócios e manipulação de dados do restante do código.
Estes serviços são injetáveis, o que significa que eles podem ser facilmente utilizados e compartilhados entre componentes, diretivas e outros serviços, e podem ser instanciados várias vezes, dependendo da forma como são utilizados. Mas, e quando queremos ter uma única instância de um serviço em toda a aplicação? Para isso é possível torná-lo um Singleton.

O Singleton é um design pattern que visa garantir que apenas uma única instância de uma determinada classe exista em todo o sistema. Ele é útil quando é necessário controlar e restringir o número de instâncias de uma classe específica, garantindo que todos os componentes que dependem dela acessem a mesma instância compartilhada. E para configurar um serviço para ser um Singleton, pode fornecer no nível raiz da hierarquia de injeção de dependência ou usando o modificador providedIn: 'root', como no código abaixo:

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyService {
  // Implementação do serviço
}
COPIAR CÓDIGO
O uso deste padrão é benéfico quando se precisa ter controle sobre a criação de instâncias e garantir que apenas uma única instância seja utilizada no sistema. Isso pode ser útil em casos como gerenciamento de recursos compartilhados, acesso a bancos de dados, configurações globais, entre outros.

Porém, é importante tomar cuidado ao utilizar o padrão Singleton, pois ele pode introduzir dependências globais e dificultar o teste unitário. É preciso avaliar se a utilização desse padrão é realmente necessária e se há alternativas mais adequadas para o contexto específico do problema a ser resolvido.

@@09
O que aprendemos?

Nessa aula, você aprendeu como:
Criar interface de promoções;
Criar serviço para lidar com as promoções;
Interagir com a API para buscar promoções.

#### 01/03/2024

@02-Fomulário controlado

@@02
Analisando o form de busca

Agora que já começamos a conectar o Jornada Milhas à API e temos as promoções vindas da fonte de dados (back-end), podemos continuar evoluindo. O próximo ponto que vamos atacar é a parte de busca de passagens.
Analisando o formulário de busca
A pessoa usuária deverá interagir com um formulário para buscar as passagens. Na nossa aplicação, temos esse formulário com os campos de alternância "Ida e volta" e "Somente ida", da quantidade de pessoas (adultas, crianças ou bebês), e de categoria da passagem (econômica ou executiva). Além disso, temos os campos de origem, destino, e datas da viagem.

Sendo assim, teremos um FormGroup que será compartilhado por vários componentes diferentes. Nesse momento, precisamos tomar a decisão de como fazer isso, de modo que o código fique organizado e não seja necessário passar inputs, ou controles via props, e assim por diante.

Para tomar essa decisão, precisamos entender as possibilidades. Poderíamos ter uma abordagem mais agressiva em relação à gestão de estado e colocar um RxJS ou algo do tipo para controlar o estado global do formulário. Porém, como já aprendemos na aula anterior, quando temos um serviço providedIn: 'root', temos um singleton, isto é, uma instância única do serviço.

Dito isso, podemos usar esse próprio mecanismo do Angular para criar um serviço de controle do formulário, e injetá-lo em todos os componentes que precisarem ter acesso a algum FormControl que estará disponível nesse serviço.

Criando o serviço FormBuscaService
Já sabemos como criar um serviço usando a ferramenta do Angular CLI, então vamos à prática.

Com o terminal aberto na pasta "jornada-milhas", vamos pedir para o Angular gerar um serviço com os comandos g (ou generate) e s (ou service), mantendo na mesma pasta "core/services/" o arquivo form-busca.service que será criado.

ng g s core/services/form-busca
COPIAR CÓDIGO
Executado o comando, vamos acessar o VS Code para verificar se o serviço foi criado corretamente. Poderemos encontrá-lo em "src > app > core > services > form-busca.service.ts".

Formulário de serviço:
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormBuscaService {

  constructor() { }
}
COPIAR CÓDIGO
Podemos começar a construir o formulário com a propriedade formBusca, que será um grupo de controle de formulário. Para isso, existe uma classe do Angular chamada FormGroup.

formBusca: FormGroup;
COPIAR CÓDIGO
Ao fazer isso, a importação será feita automaticamente na segunda linha de código:

import { FormGroup } from '@angular/forms';
COPIAR CÓDIGO
Agora podemos iniciar o FormGroup dentro do construtor (constructor()). Quando iniciamos e instanciamos a classe, dizemos que this.formBusca recebe um novo FormGroup.

this.formBusca = new FormGroup()
COPIAR CÓDIGO
A classe FormGroup espera receber um objeto ({}) contendo vários controles, os quais podemos adicionar à medida que for necessário.

Resultado do arquivo form-busca.service.ts até o momento:
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormBuscaService {

  formBusca: FormGroup;

  constructor() { 

    this.formBusca = new FormGroup({

    })
  }
}
COPIAR CÓDIGO
Conclusão
Nesse momento, temos um serviço que é um singleton, isto é, uma instância única que irá controlar o formulário, e poderemos injetar esse serviço em todos os componentes necessários, ou seja, onde for necessário manipular o serviço.

Dessa forma, isolamos a lógica de controle do formulário em uma classe de serviço, e delegamos toda a responsabilidade de definir o estado, controlar, e os métodos comuns a todos os instantes da nossa busca, deixando isso desacoplado dos nossos componentes visuais.

Agora que temos o serviço em mãos, podemos partir para os componentes para começar a criar os controles e guardar os valores de acordo com a interação da pessoa usuária. Vamos fazer isso?

@@03
Um serviço para a todos governar

Agora que já temos o serviço que irá controlar o formulário de busca e governar o estado, podemos começar a injetá-lo e criar de acordo com nossa necessidade, adicionando os controles de formulário conforme começarmos a manipular os inputs com que a pessoa usuária vai interagir.
Injetando o serviço no componente formBusca
Para isso, precisamos encontrar o local do formulário no projeto. Começaremos acessando o arquivo home.component.html, localizado em "pages > home".

Na linha de código 7 desse arquivo, temos a tag <app-form-busca>. Vamos clicar sobre ela com a tecla "Ctrl" (ou "Command", caso utilize o Mac) pressionada. Dessa forma, seremos redirecionados para o componente form-busca.component.ts.

import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-form-busca',
  templateUrl: './form-busca.component.html',
  styleUrls: ['./form-busca.component.scss']
})
export class FormBuscaComponent {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(ModalComponent, {
      width: '50%'
    })
  }
}
COPIAR CÓDIGO
É justamente esse arquivo que irá conter todos os nossos inputs. Para garantir, vamos analisar o HTML desse componente (form-busca.component.html).

Nesse arquivo, encontramos as tags <mat-button-toggle> de "IDA E VOLTA" e "SOMENTE IDA", as tags <mat-label> de "Origem", "Destino", "Data de ida" e "Data da volta", e o botão (<button>) de "BUSCAR".

Sabendo que estamos no lugar certo, no arquivo form-busca.component.ts, além de injetar o MatDialog que controla o modal, vamos injetar de forma privada (private) o formBuscaService. Vamos definir o tipo dele como FormBuscaService, para o Angular injetar o serviço corretamente.

constructor(public dialog: MatDialog, 
  private formBuscaService : FormBuscaService) {}
COPIAR CÓDIGO
Quebramos a linha no constructor(), para deixar o parâmetro public dialog na linha 12 e o private formBuscaService na linha 13.
Nesse momento, o VS Code fará a importação de FormBuscaService automaticamente:

import { FormBuscaService } from 'src/app/core/services/form-busca.service';
COPIAR CÓDIGO
Com o FormBuscaService em mãos, podemos retornar ao primeiro componente do <mat-button-toggle-group> em form-busca.component.html, isto é, o componente "IDA E VOLTA", e criar um controle para esse grupo.

Para fazer isso, vamos retornar ao arquivo de serviço (form-busca.service.ts). Na primeira linha dentro do FormGroup() (linha de código 14), onde ele recebe um objeto de controle, podemos iniciar o controle somenteIda.

Esse controle será um FormControl do Angular, ou seja, faremos o formulário controlado. O FormControl por si só é uma classe, então precisamos adicionar new antes dele.

Em seguida, podemos definir um valor padrão, dizendo que somenteIda é false.

somenteIda: new FormControl()
COPIAR CÓDIGO
O VS Code fará a importação automática de FormControl na linha 2:

import { FormControl, FormGroup } from '@angular/forms';
COPIAR CÓDIGO
Resultado do arquivo form-busca.service.ts:
import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormBuscaService {

  formBusca: FormGroup;

  constructor() { 

    this.formBusca = new FormGroup({
      somenteIda: new FormControl(false)
    })
  }
}
COPIAR CÓDIGO
Conclusão
Já temos um formulário com a classe FormControl, que estará disponível para nós no FormBusca. Perceba que existe uma delimitação evidente da responsabilidade de cada elemento: o FormBuscaService irá cuidar do formulário e de todos os controles, enquanto o FormBuscaComponent irá apenas usá-lo.

Agora, de alguma forma, precisamos vincular o FormControl ao componente HTML. Sabendo que temos o FormBuscaService, ele fará a ponte para nós, de modo que a interação da pessoa usuária fique armazenada no estado dentro desse serviço.

Abordaremos esse assunto no próximo vídeo. Te vejo lá!

@@04
TypeScript a nosso favor

Agora que já temos o FormBuscaService disponível no componente FormBuscaComponent, podemos acessar o template no arquivo HTML (form-busca.component.html) para analisar alguns pontos.
Usando o TypeScript a nosso favor
Na linha de código 2, temos a tag de formulário <form>. Dentro dela, podemos dizer entre colchetes, usando uma diretiva do Angular, que o formGroup será formBuscaService.formBusca.

<form [formGroup]="formBuscaService.formBusca">
COPIAR CÓDIGO
Ao fazer isso, o TypeScript irá nos ajudar em dois sentidos:

Ele já faz o autocomplete, então ele entende o que é formBuscaService e entende que ele tem um formBusca público, ou seja, podemos acessá-lo de fora pela instância;
E ele indica um erro, dizendo que não conhece a propriedade formGroup.
Vamos salvar as alterações e avaliar o que o Angular dirá sobre esse erro. Acessaremos o navegador para obter mais informações.

Com o console aberto no DevTools, temos a indicação de que há um erro em FormBuscaComponent: não conhecemos o atributo formGroup de um formulário, então falta alguma informação. Essa informação é justamente um módulo que precisamos registrar.

Então, nosso próximo passo será injetar esse módulo em AppComponent. Para isso, vamos abrir o VS Code e abrir o arquivo app.module.ts. Na lista imports, vamos importar o módulo de formulário reativo do Angular.

ReactiveFormsModule
COPIAR CÓDIGO
É esse módulo que vai complementar para nós e permitir que o Angular entenda a diretiva que queremos usar. De volta ao arquivo form-busca.component.html, não teremos mais a indicação de erro em formGroup.

Agora temos a reclamação do seguinte erro: formBuscaService é privado, sendo acessível somente dentro da classe. Dito isso, vamos até o arquivo form-busca.component.ts e alterar de private para public na linha 13.

public formBuscaService : FormBuscaService) {}
COPIAR CÓDIGO
Feito isso, o erro será corrigido no arquivo HTML. Dessa forma, o formBuscaService tem o formBusca, e agora o Angular e o TypeScript entendem o que é a diretiva formGroup.

Recapitulando: o que fizemos foi injetar o ReactiveFormsModule na linha 65 do arquivo app.module.ts, no array de módulos importados. Agora estão disponíveis globalmente todos os poderes oferecidos por esse módulo do Angular.

Com o módulo disponível, a próxima etapa é definir no componente de ida e volta o nome do controle que estará vinculado a ele.

No arquivo form-busca.component.html, teremos na linha 5 a tag <mat-button-toggle-group. Ela espera receber uma diretiva chamada formControlName, que será uma string somenteIda.

<mat-button-toggle-group aria-label="Tipo de passagem" formControlName="somenteIda">
COPIAR CÓDIGO
Assim, definimos que o controle de formulário para esse elemento é somenteIda. Agora, o FormControl do arquivo form-busca.service.ts está vinculado ao componente.

Vamos fechar todos os arquivos abertos no VS Code, mantendo somente o form-busca.component.html. De volta ao navegador, vamos recarregar a página para garantir que tudo continua funcionando normalmente.

Não temos nenhum erro no console, o que é um bom sinal. Porém, há um detalhe: atualmente, exibimos o ícone de confirmação (✓) nos dois cenários do toggle, tanto no "IDA E VOLTA" quanto no "SOMENTE IDA". De alguma forma, precisamos esconder o ícone se o campo não está selecionado. Vamos fazer isso?

Controlando a exibição do ícone de confirmação
Retornando ao VS Code, no arquivo HTML que mantivemos aberto, temos a tag <mat-icon> na linha 7, que contém o "check" indicando qual ícone colocamos. Para solucionar o problema, vamos usar a diretiva ngIf, passando para ela a seguinte condição:

Ir até o formBuscaService;
Pegar o formBusca;
Usar o método get() para obter um controle pelo nome. Esse nome é somenteIda;
E pegar o value após somenteIda.
<mat-button-toggle>
  <mat-icon *ngIf="!formBuscaService.formBusca.get('somenteIda')?.value">check</mat-icon>
  IDA E VOLTA
</mat-button-toggle>
COPIAR CÓDIGO
Note que, ao fazer isso, o VS Code adiciona automaticamente o operador nullable, representado por um ponto de interrogação (?). Com isso, indicamos que o value será coletado apenas se o FormControl chamado somenteIda existir dentro do formBusca.

Além disso, adicionamos o sinal de negação (!) após a abertura de aspas duplas, para negar a primeira condição. Assim, se "IDA E VOLTA" for true, será exibido o check no lado esquerdo, correspondente ao campo de ida e volta.

Feito isso, vamos copiar a linha 7 e colar no <mat-button-toggle> de "SOMENTE IDA", porém, removendo o sinal de negação.

<mat-button-toggle>
  <mat-icon *ngIf="formBuscaService.formBusca.get('somenteIda')?.value">check</mat-icon>
  SOMENTE IDA
</mat-button-toggle>
COPIAR CÓDIGO
Por último, precisamos definir o valor das tags <mat-button-toggle>, pois no momento, o Angular não sabe o valor quando cada campo está selecionado. Para o campo de "IDA E VOLTA", vamos definir o valor como false. Já para "SOMENTE IDA", o valor será true.

É importante lembrar de remover a opção explícita checked da tag de "IDA E VOLTA", pois não queremos mais dizer qual campo está marcado por padrão. Agora o formulário controla isso.
<mat-button-toggle [value]="false">
COPIAR CÓDIGO
<mat-button-toggle [value]="true">
COPIAR CÓDIGO
Dessa forma, o ícone irá aparecer em um campo ou no outro. Agora estamos conectando todas as peças que preparamos até o momento.

Vamos testar? De volta ao navegador, vamos recarregar a página. Ao alternar entre as opções "IDA E VOLTA" e "SOMENTE IDA", o ícone deverá ser exibido de acordo com o campo selecionado.

Conclusão
Concluímos nossa tarefa e agora o FormControl funciona corretamente, com o FormBuscaService controlando o estado de ida e volta, se é somente ida ou não.

Da mesma forma que controlamos esse estado booleano, podemos expandi-lo aos poucos para os demais campos da busca de passagens. É isso que faremos na sequência, e até o final do curso, iremos evoluir bastante essa busca.

Te vejo no próximo vídeo!

@@05
Controlando o formulário em um serviço

Durante o desenvolvimento da aplicação "Jornada Milhas", você se depara com o seguinte código:
import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormBuscaService {

  formBusca: FormGroup;

  constructor() { 
    this.formBusca = new FormGroup({
      somenteIda: new FormControl(false)
    });
  }
}
COPIAR CÓDIGO
O time de desenvolvimento optou por criar o serviço acima para controlar o formulário de busca de passagens ao invés de fazer isso diretamente no componente.

Analisando a implementação acima, selecione as alternativas que apresentam as vantagens que justificam o porque o time de desenvolvimento escolheu criar um serviço para lidar com o formulário de busca de passagens aéreas.

Selecione 3 alternativas

Permitir a reutilização do mesmo formulário em vários componentes.
 
O serviço permite que o mesmo formulário possa ser injetado e reutilizado em diferentes componentes, o que economiza tempo e esforço, pois não é necessário duplicar o código do formulário em cada componente que o utiliza.
Alternativa correta
Organizar o código de forma mais eficiente e manter o componente focado em sua funcionalidade principal.
 
Ao utilizar um serviço, é possível isolar a lógica relacionada ao formulário em um local separado, tornando o componente mais limpo e direcionado à sua funcionalidade principal, o que facilita a manutenção do código e aumenta a legibilidade.
Alternativa correta
Melhorar o desempenho da aplicação, reduzindo o tempo de processamento do formulário.
 
Alternativa correta
Permitir o compartilhamento do estado do formulário entre diferentes componentes.
 
Ao utilizar um serviço como intermediário, é possível compartilhar o estado do formulário entre diferentes componentes, o que é útil no formulário de busca de passagens aéreas já que ele precisará interagir com diversos componentes.

@@06
Desafio: Serviço de Unidades Federativas

Chegou a sua hora da aventura, parte 2! Nós já sabemos como criar serviços que obtêm dados da API. Agora, precisamos de um novo serviço que vai buscar os estados brasileiros.
Essa aventura é ousada, então queria aproveitar esse momento para pensarmos em otimização. Precisamos de uma camada de cache para evitar chamadas desnecessárias à API, porque a lista de unidades federativas não é algo que muda com muita frequência, não é mesmo?

De maneira simples, shareReplay é um operador RxJS que, ao ser combinado com o método pipe, nos permite armazenar em cache o resultado de um Observable. Isso nos permite fazer exatamente o que queremos aqui: evitar requisições HTTP desnecessárias. Uma vez que os dados já foram buscados, eles ficam guardadinhos esperando para serem reutilizados, o que é um salva-vidas quando a ideia é otimizar o desempenho da aplicação.

Agora, se você quiser dar um mergulho ainda mais profundo nessa história toda de shareReplay, dá uma passada na documentação oficial. Lá tem uma galera que sabe das coisas e pode te dar mais detalhes de como isso funciona por debaixo dos panos.

https://rxjs.dev/api/operators/shareReplay

Bora de código? Hora de implementar o nosso serviço, tomando aquele cuidado especial com a camada de cache. Dá uma olhada em como ficou o meu resultado:
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UnidadeFederativa } from '../types/type';

@Injectable({
  providedIn: 'root'
})
export class UnidadeFederativaService {
  private apiUrl: string = environment.apiUrl
  private cache$?: Observable<UnidadeFederativa[]>;

  constructor(
    private http: HttpClient
  ) { 
  }

  listar() : Observable<UnidadeFederativa[]> {
    if (!this.cache$) {
      this.cache$ = this.requestEstados().pipe(
        shareReplay(1)
      );
    }

    return this.cache$;
  }

  private requestEstados(): Observable<UnidadeFederativa[]> {
    return this.http.get<UnidadeFederativa[]>(`${this.apiUrl}/estados`);
  }
}
COPIAR CÓDIGO
Primeiro, os detalhes mais administrativos: a classe UnidadeFederativaService é uma injeção de dependência @Injectable fornecida no escopo 'root', o que quer dizer que ela é instanciada uma única vez durante todo o ciclo de vida do app. O Angular é cheio desses truques Jedi, e lembre-se que temos um “para saber mais” falando exatamente sobre na aula anterior!

https://media.tenor.com/buuh81xjVgEAAAAC/ahsoka-tano.gif

Dentro do nosso serviço, nós temos a variável apiUrl que guarda a URL base da API - sacada diretamente das variáveis de ambiente. Também temos a cache$, uma variável opcional que vai guardar um Observable de um array de UnidadeFederativa.

A mágica começa no método listar(). Quando chamado, ele checa se já existe algo na nossa cache$. Se não tiver nada lá, ele chama o método requestEstados(), que faz uma requisição GET para a rota '/estados' da nossa API. A resposta dessa requisição é então armazenada na cache$ com o uso do operador shareReplay, que faz com que o valor buscado fique guardado para futuras subscrições.

Agora, toda vez que chamarmos listar(), se já tivermos uma resposta armazenada na cache$, ela é retornada direto, evitando uma nova requisição HTTP. Uma maravilha para a performance, como se tivéssemos o próprio Yoda otimizando nosso código!

E é basicamente isso que esse código está fazendo. Lembra que mencionei antes sobre a documentação oficial do RxJS? Vale a pena dar uma olhada lá para entender ainda mais sobre esse operador incrível.

Se tiver mais alguma dúvida, conte comigo. E que a Força esteja com você, sempre! 😉

@@07
Para saber mais: cache com shareReplay

O operador shareReplay é uma funcionalidade poderosa do RxJS que permite armazenar em cache o resultado de um Observable. Isso é especialmente útil quando lidamos com dados que não mudam com frequência, como a lista de unidades federativas do formulário de busca de passagens aéreas.
Ao utilizar o shareReplay, podemos evitar chamadas desnecessárias à API. Uma vez que os dados já foram buscados, eles são armazenados em cache e podem ser reutilizados, proporcionando um melhor desempenho e otimização da aplicação.

No contexto do serviço de Unidades Federativas, utilizamos o shareReplay para armazenar a resposta da requisição HTTP feita à rota '/estados'. Quando o método listar() é chamado, é verificado se já existe uma resposta armazenada em cache. Se sim, essa resposta é retornada diretamente, evitando uma nova chamada à API. Caso contrário, é feita a requisição e o resultado é armazenado em cache para futuras requisições.

OshareReplay é uma ferramenta incrível que nos ajuda a melhorar o desempenho das aplicações. Se você quiser saber mais detalhes sobre como ele funciona debaixo dos panos, confira a documentação oficial do shareReplay do RxJS.

https://rxjs.dev/api/index/function/shareReplay

@@08
O que aprendemos?

Nessa aula, você aprendeu como:
Criar um serviço para controlar o formulário de busca de passagens aéreas;
Injetar o serviço de formulário de busca no componente "form-busca";
Controlar o campo "somenteIda" através do serviço;
Criar o serviço de busca de estados brasileiros.
