##### 29/02/2024

Curso de Angular: componentização, formulários e interação com APIs

```
ng generate enviromnments
cd jornada-milhas-api
npm run start:dev
ng serve --open
sudo lsof -i :8080
kill -9 <PID>
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


#### 02/03/2024

@03-Dropdown de origem e destino

@@01
Projeto da aula anterior

Caso queira revisar o código até aqui ou começar a partir desse ponto, disponibilizamos os códigos realizados na aula anterior, para baixá-lo clique neste link ou veja nosso repositório do Github.

https://github.com/alura-cursos/jornada/archive/refs/heads/aula-2.zip

https://github.com/alura-cursos/jornada/tree/aula-2

@@02
Preparando a base

Chegou a hora de trabalhar na nossa origem e destino. Já temos o input pré-pronto para digitar livremente os estados no campo de busca.
Porém, como você pôde conferir no desafio anterior, esses estados (ou Unidades Federativas - UFs) virão da API.

Para conseguir linkar isso, podemos trocar esse componente e, ao invés de utilizar o input normal, utilizar o componente "Autocomplete" do Angular Material:

Página "Components > Autocomplete" da documentação do Angular Material.
Autocomplete
Essa página da documentação mostra como o componente funciona, oferecendo a marcação do HTML e o código TypeScript necessários.

No exemplo do componente, temos um input de texto chamado "Number" e, ao clicar nele, uma lista de itens desce do campo — One, Two e Three. Podemos digitar para filtrar as opções e selecionar a opção desejada com base no texto digitado:

input autocomplete de exemplo da documentação do Angular, conforme descrito acima.

Já sabendo que utilizaremos esse input, vamos clicar na aba "API" na barra superior da página. Logo no início, temos a referência API para importar o componente Autocomplete do Angular Material:

import {MatAutocompleteModule} from '@angular/material/autocomplete';
COPIAR CÓDIGO
Vamos dar esse primeiro passo no nosso App Module, copiando o código acima e retornando ao VSCode.

Importando o componente
Podemos fechar todos os arquivos abertos e acessar apenas o app.module.ts por enquanto.

Já temos uma série de imports do Angular Material, e vamos inserir o import do Autocomplete logo abaixo do import do Dialog. Também vamos aproveitar para dar espaços entre as chaves e o nome do componente:

// código omitido
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
COPIAR CÓDIGO
Agora, podemos definir esse componente no array de imports do App Module, inserindo-o abaixo de ReactiveFormsModule:

imports: [
     BrowserModule,
    // imports omitidos
     ReactiveFormsModule,
     MatAutocompleteModule
],
COPIAR CÓDIGO
Com isso em mãos, podemos começar a utilizar esse componente.

Base de implementação do Autocomplete
Vamos abrir o arquivo form-busca.component.html. Atualmente, temos dois mat-form-fields com origem e destino:

form-busca.component.html
<mat-form-field class="input-container" appearance="outline">
    <mat-label>Origem</mat-label>
<!-- código omitido --> 
<mat-form-field class="input-container" appearance="outline">
    <mat-label>Destino</mat-label>
<!-- código omitido --> 
COPIAR CÓDIGO
Devemos nos atentar a um pequeno detalhe da documentação: para utilizar o Autocomplete, precisamos implementar manualmente a função ngOnInit().

Se vamos utilizar esse componente duas vezes, podemos:

tentar replicar código e reaproveitar a lógica ou
separá-la num componente reaproveitável.
A segunda opção é a mais adequada. Assim, centralizamos a lógica num componente de Autocomplete de Unidades Federativas e passamos um para controlar a origem e outro para controlar o destino.

Vamos seguir esse caminho.

No VS Code, abrimos o terminal integrado para pedir para o Angular gerar esse componente. Para isso, digitamos ng g c.

Depois, passamos o caminho para a criação desse componente. Pelo menos por enquanto, utilizaremos esse componente apenas no formulário de busca. Então vamos criá-lo dentro do diretório form-busca, completando esse caminho com a subpasta dropdown-uf:

ng g c shared/form-busca/dropdown-uf
COPIAR CÓDIGO
Após executar esse comando, poderemos conferir a nova pasta "dropdown-uf" criada dentro de "form-busca" np Explorador de arquivos do VS Code.

Temos, inclusive, acesso ao arquivo TypeScript, a classe do componente (dropdown-uf.component.ts), e também ao HTML, o template do componente (dropdown-uf.component.html).

Voltando ao arquivo form-busca.component.html, vamos simplesmente comentar o primeiro e o segundo form-field.

Vamos usar o componente que acabamos de criar entre os dois, antes do mat-icon-button. Para isso, abrimos e fechamos a tag <app-dropdown-uf />. Como serão dois, o copiamos logo abaixo:

form-busca.component.html
<app-dropdown-uf />
<button mat-icon-button>
    <mat-icon>sync_alt</mat-icon>
</button>
<app-dropdown-uf />
COPIAR CÓDIGO
Pronto!

Agora, vamos ao navegador para verificar se esse componente está funcionando na página do JornadaMilhas. Nosso menu de busca de passagens está assim por enquanto:

menu "Passagens" do JornadaMilhas. abaixo dos botões selecionáveis de ida e volta, quantidade e tipo de passagens, temos os inputs de lugar e data. no lugar dos inputs de estado de origem e estado de destino, temos apenas um componente de texto "dropdown-uf works!"

Isso significa que a importação do componente foi bem-sucedida, pois a frase dropdown-uf works! consta no HTML do componente:

dropdown-uf.component.html
<p>dropdown-uf works!</p>
COPIAR CÓDIGO
Agora, precisamos fazer a marcação do HTML. Vamos copiar o código de form-field comentado para usar como base e colar no HTML do dropdown-uf, substituindo o <p>dropdown-uf works!</p>.

Depois, clicamos com o botão direito na área de código e selecionamos "Format Document" para formatar o código. Teremos o seguinte:

dropdown-uf.component.html
<mat-form-field class="input-container" appearance="outline">
    <mat-label>Origem</mat-label>
    <mat-icon matPrefix>
        flight_takeoff
    </mat-icon>
    <input matInput placeholder="Origem">
    <mat-icon matSuffix>search</mat-icon>
</mat-form-field>
COPIAR CÓDIGO
Temos alguns elementos fixos nesse componente, e que precisaremos mudar. São eles: o label e o placeholder, que trazem o nome "Origem"; o ícone do campo, que traz um avião decolando.

Nós precisamos flexibilizar esse componente para trazer tanto o nome "Origem" quanto "Destino", assim como um ícone de avião decolando no primeiro caso e um avião pousando no segundo.

Ou seja, precisamos receber esses elementos de algum lugar como parâmetros. Podemos usar o próprio input para isso.

No lugar da label "Origem", vamos utilizar a sintaxe de duas chaves para pegar o dado que está no template: {{ label }}.

No lugar de flight_takeoff no ícone, vamos colocar {{ matPrefix }}. Também receberemos o placeholder via input, então o colocamos entre colchetes recebendo apenas "placeholder".

Nosso componente ficará assim:

<mat-form-field class="input-container" appearance="outline">
    <mat-label>{{ label }}</mat-label>
    <mat-icon matPrefix>
        {{ matPrefix }}
    </mat-icon>
    <input matInput [placeholder]="placeholder">
    <mat-icon matSuffix>search</mat-icon>
</mat-form-field>
COPIAR CÓDIGO
Temos marcações em vermelho em label, matPrefix e placeholder, pois eles ainda não existem nesse componente.

Então, como já pensamos como queremos usar esse componente, vamos implementá-lo no arquivo TypeScript.

É hora de começar a construir e configurar os nossos inputs, ou seja, o que receberemos no nosso componente pai.

Vamos lá?

https://material.angular.io/components/autocomplete/overview

@@03
Recebendo os inputs

Agora que temos nossa base pronta, vamos evoluir e corrigir esses erros que o VS Code apontou.
Precisamos configurar nossos inputs de label, o prefixo que presenta o ícone a ser exibido, e o próprio placeholder.

Para isso, vamos abrir o arquivo dropdown-uf.component.ts!

Corrigindo os erros da base do input
Primeiramente, vamos criar nosso @Input dentro da classe DropdownUfComponent. O VS Code sugere importar esse componente do core do Angular, então aceitamos para importar automaticamente.

Esse componente é um decorator. Diremos que ele terá um label, cujo tipo é uma string, resultando em: @Input() label: string.

O VS Code reclamará a label, pois não temos um inicializador para essa propriedade, além de não termos nenhum construtor definindo seu valor.

Então, temos duas saídas:

Podemos dizer que essa propriedade começa com uma string vazia (recebendo ''); ou,
antes de tipar essa propriedade, forçar a tipagem colocando um ponto de exclamação depois do nome da propriedade (label!), dizendo para o TypeScript que sabemos o que estamos fazendo e que essa label vai existir.
Você pode escolher a abordagem que preferir. Nesta aula, optaremos pela primeira, menos invasiva, e iniciar label com uma string vazia.

O TypeScript do componente ficará assim:

dropdown-uf.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dropdown-uf',
  templateUrl: './dropdown-uf.component.html',
  styleUrls: ['./dropdown-uf.component.scss']
})
export class DropdownUfComponent {
  @Input() label: string = '';
}
COPIAR CÓDIGO
Vamos duplicar essa linha de @Input logo abaixo para conferir outra propriedade para esse componente: o ícone.

Nosso prefixo tem o nome de matPrefix, sendo o ícone do nosso input. Para tornar essa propriedade mais clara, vamos trocar esse nome para iconePrefixo no HTML:

dropdown-uf.component.html
<mat-form-field class="input-container" appearance="outline">
    <mat-label>{{ label }}</mat-label>
    <mat-icon matPrefix>
        {{ iconePrefixo }}
    </mat-icon>
<!-- código omitido --> 
COPIAR CÓDIGO
Agora, com esse novo nome, podemos voltar ao arquivo TypeScript e definir essa propriedade. Ela também será uma string, inicializada com uma string vazia:

dropdown-uf.component.ts
export class DropdownUfComponent {
  @Input() label: string = '';
    @Input() iconePrefixo: string = '';
}
COPIAR CÓDIGO
Além da label e do ícone, temos o placeholder nesse input, que também deve ser recebido como propriedade.

Mas, antes disso, vamos nos atentar a um detalhe: no nosso Figma, podemos notar que não estamos utilizando o placeholder em si. Temos, na verdade, uma label flutuante nesse input.

Ou seja, não precisamos de um placeholder. Vamos removê-lo do nosso HTML, simplificando o código:

dropdown-uf.component.html
<mat-form-field class="input-container" appearance="outline">
  <mat-label>{{ label }}</mat-label>
  <mat-icon matPrefix>
    {{ iconePrefixo }}
  </mat-icon>
  <input matInput>
  <mat-icon matSuffix>search</mat-icon>
</mat-form-field>
COPIAR CÓDIGO
Temos, então: o contêiner do input, a label, o ícone como prefixo e o sufixo de ícone search, a lupa de busca, que é sempre o mesmo.

Essa é a base do componente para começarmos a receber as informações necessárias por parâmetro.

Recebendo os inputs
No arquivo form-busca.component.html, vamos receber os valores variáveis do input nas tags <app-dropdown-uf/>.

O primeiro terá uma label que recebe a string "Origem". O segundo terá uma label que recebe "Destino".

Além disso, passaremos também a propriedade variável iconePrefixo: o primeiro input receberá "flight_takeoff", de avião decolando; o segundo receberá "flight_land", de avião pousando:

form-busca.component.html
<app-dropdown-uf label="Origem" iconePrefixo="flight_takeoff"/> 
<button mat-icon-button> 
    <mat-icon>sync_alt</mat-icon>
</button>
<app-dropdown-uf label="Destino" iconePrefixo="flight_land"/>
COPIAR CÓDIGO
Vamos verificar se isso é o suficiente.

De volta ao navegador, vamos recarregar a página da aplicação. Nosso input já está com o visual mais próximo do desejado:

menu de busca de passagens da JornadaMilhas. o input de seleção de estados de origem e destino já não estão mais exibindo apenas a frase "dropdown-uf works!", mas os campos de busca de Origem e Destino, com seus respectivos ícones de avião decolando e avião pousando, assim como o ícone de lupa de busca. os elementos não estão alinhados entre si.

Vamos clicar na página com o botão direito e selecionar a opção "Inspecionar > Elementos".

Na aba de inspeção à direita, podemos localizar o elemento correto no HTML da página. Maravilha!

Mas, parece que está faltando algum SCSS, pois os elementos não estão exatamente alinhados com os inputs de data de ida e volta.

Melhorando o estilo
Voltando ao VS Code, vamos abrir o arquivo form-busca.component.scss. Nele, temos um input-container que possui uma margem inferior negativa de 1,25.

Conforme o código comentado do arquivo HTML do formulário de busca, esse é o estilo que precisamos adicionar ao nosso input.

Então, vamos copiar esse estilo e colar no arquivo SCSS do dropdown-uf, que estava vazio até então:

dropdown-uf.component.scss
.input-container {
  margin-bottom: -1.25em;
}
COPIAR CÓDIGO
Vamos voltar ao navegador e recarregar a página. O visual do nosso input está um pouco melhor!

menu de busca de passagens da JornadaMilhas. agora, os elementos do input de Origem e Destino estão alinhados.

As labels e ícones foram recebidos corretamente, e os elementos do formulário estão alinhados.

Implementando o Autocomplete
Chegou a hora de evoluir esse input e transformá-lo num Autocomplete real.

Vamos retornar à documentação do Autocomplete do Angular Material para entender o que é necessário a nível de marcação para que ele funcione.

No código HTML do componente de exemplo, podemos notar que o mat-autocomplete está vinculado a um input, o que já temos.

Então, basicamente, o que precisamos fazer é adicionar uma diretiva para vincular os dois elementos:

Documentação
<form class="example-form">
  <mat-form-field class="example-full-width">
    <mat-label>Number</mat-label>
    <input type="text"
           placeholder="Pick one"
           aria-label="Number"
           matInput
           [formControl]="myControl"
           [matAutocomplete]="auto">
    <mat-autocomplete #auto="matAutocomplete">
      <mat-option *ngFor="let option of filteredOptions | async" [value]="option">
        {{option}}
      </mat-option>
    </mat-autocomplete>
  </mat-form-field>
</form>
COPIAR CÓDIGO
Vamos copiar a tag <mat-autocomplete> da documentação e colar no arquivo HTML do dropdown-uf, logo abaixo do nosso ícone de sufixo:

dropdown-uf.component.html
<mat-form-field class="input-container" appearance="outline">
  <mat-label>{{ label }}</mat-label>
  <mat-icon matPrefix>
    {{ iconePrefixo }}
  </mat-icon>
  <input matInput>
  <mat-icon matSuffix>search</mat-icon>
  <mat-autocomplete #auto="matAutocomplete">
    <mat-option *ngFor="let option of filteredOptions | async" [value]="option">
      {{ option }}
    </mat-option>
  </mat-autocomplete>
</mat-form-field>
COPIAR CÓDIGO
Esse código diz: precisamos de uma opção (option) para cada opção filtrada (filteredOptions).

O componente filteredOptions ainda não existe. Para não ter um erro de compilação, vamos iniciá-lo no arquivo TypeScript como um array vazio, ao final do código, dentro da classe DropdownUfComponent:

dropdown-uf.component.ts
filteredOptions = []
COPIAR CÓDIGO
Voltando para o HTML, o que falta fazer é vincular esse Autocomplete ao nosso input.

Conforme a documentação, precisamos criar uma diretiva [matAutocomplete] apontando para o #auto que acabamos de implementar.

Então, dentro da tag <input>, vamos dar um espaço depois de matInput e colar essa diretiva:

dropdown-uf.component.html
<!-- código omitido --> 
<input matInput [matAutocomplete]="auto">
<!-- código omitido --> 
COPIAR CÓDIGO
O "auto", que está agora na linha 6 e é o valor do [matAutocomplete], é justamente o #auto que vincula as duas coisas.

Vamos ver se isso será suficiente para, pelo menos, manter o Autocomplete funcionando sem quebrar.

De volta ao navegador, recarregamos a página da JornadaMilhas. Ela está nos apontando um erro de compilação. Vamos verificar no menu "Inspecionar > Console".

Corrigindo o erro
Temos um erro de Observable, porque um array fixo sempre vazio não é o mesmo que um Observable.

No VSCode, vamos voltar no arquivo HTML do dropdown-uf. Na linha nove, temos um | async ao lado de filteredOptions. Podemos removê-lo por enquanto, pois o filteredOptions ainda não é assíncrono:

dropdown-uf.component.html
<mat-form-field class="input-container" appearance="outline">
  <mat-label>{{ label }}</mat-label>
  <mat-icon matPrefix>
    {{ iconePrefixo }}
  </mat-icon>
  <input matInput [matAutocomplete]="auto">
  <mat-icon matSuffix>search</mat-icon>
  <mat-autocomplete #auto="matAutocomplete">
    <mat-option *ngFor="let option of filteredOptions" [value]="option">
      {{ option }}
    </mat-option>
  </mat-autocomplete>
</mat-form-field>
COPIAR CÓDIGO
Retornando ao navegador e recarregando a página, temos tudo funcionando normalmente!

Agora, o que podemos fazer é obter esses estados (UFs) e passá-los para o componente via propriedades.

@@04
Controles do form

Agora, o que precisamos é, de fato, trazer essas unidades federativas (UFs) brasileiras para o nosso dropdown.
Obtendo as unidades federativas
Podemos nos valer de diferentes estratégias para fazer isso, mas no desafio e na aula anterior, sugerimos trabalhar com uma camada de cache, guardando os resultados das unidades federativas em memória.

Assim, evitamos que vários pedidos sejam feitos, visto que essa não é uma lista que não vai mudar muito. É muito difícil que, no período de uma atualização de página, um estado brasileiro seja criado!

Sendo assim, como já deixamos tudo isso pronto no desafio e na aula anterior, o que precisamos fazer agora é usar o que temos.

No arquivo dropdown-uf.component.ts, vamos criar um construtor (constructor () {} recebendo o nosso serviço injetado. Então, entre os parênteses, chamamos o private unidadeFederativaService, cujo tipo será UnidadeFederativaService.

Além disso, diremos que a nossa classe DropdownUfComponent implementa o OnInit em sua declaração:

dropdown-uf.component.ts
export class DropdownUfComponent implements OnInit {
  @Input() label: string = '';
  @Input() iconePrefixo: string = '';

  filteredOptions = []

  constructor(
    private unidadeFederativaService: UnidadeFederativaService) {

  }
COPIAR CÓDIGO
Abaixo do fechamento do construtor, ainda dentro da classe, vamos adicionar o método ngOnInit(), automaticamente sugerido e completado pelo VS Code. Esse método não retorna nada, por isso o void {}.

Sabendo disso, podemos chamar nosso serviço dentro das chaves do void, com this.unidadeFederativaService e pedir o método listar().

Depois de listar, podemos fazer um subscribe() e, dentro desse método, teremos acesso aos dados que voltaram da API, então: dados => {}:

 ngOnInit(): void {
    this.unidadeFederativaService.listar()
      .subscribe(dados => {
            
            })
    }
COPIAR CÓDIGO
Podemos fazer o que quisermos com essa variável. Por exemplo, podemos criar uma lista de unidades federativas fora desse método, logo abaixo do @Input.

Essa lista se chamará unidadesFederativas e será do tipo UnidadeFederativa[], pois é um array (isso foi feito no desafio).

Teremos uma marcação em vermelho em unidadesFederativas, pois essa propriedade não foi inicializada e não é atribuída no construtor. Então, podemos inicializá-la com um array vazio:

unidadesFederativas: UnidadeFederativa[] = [];
COPIAR CÓDIGO
Assim, garantimos que tudo funciona e o TypeScript para de reclamar.

Além disso, estamos sendo mais defensivos. Imagine que o componente tentou fazer algo com essas unidadesFederativas antes da API responder.

Não teremos problema nesse caso, porque como é um array vazio, todos os métodos do array já estarão disponíveis. Ou seja, ele não será undefined e não receberemos aquele grande erro em vermelho no console.

Voltando para o nosso subscribe(), quando esses dados chegarem, podemos dizer que this.unidadesFederativas vai receber os dados que acabamos de sobescrever.

Para garantir que isso funciona, vamos dar um console.log() dos valores de unidadesFederativas.

Então, nosso método ngOnInit() ficará assim, por fim:

ngOnInit(): void {
    this.unidadeFederativaService.listar()
        .subscribe(dados => {
            this.unidadesFederativas = dados
            console.log(this.unidadesFederativas)
        })
}
COPIAR CÓDIGO
Agora, podemos testar se o que implementamos no desafio da aula anterior está funcionando.

Com tudo isso pronto, sem erros no VS Code, vamos (com um pouco de esperança!) para o nosso navegador para verificar se temos algum erro no console.

Ao recarregar a página da JornadaMilhas, não recebemos nenhum erro no menu Inspecionar!

Na aba "Network", podemos notar uma chamada única para os nossos estados; porém, temos dois console.log() desses estados. Ou seja, a nossa camada de cache está funcionando corretamente.

Desafio: Filtro do Autocomplete
O que precisamos fazer agora que já temos as unidades federativas em mãos?! Vincular isso com o Autocomplete que começamos a implementar!

Na documentação do Autocomplete do Angular Material, vamos abrir a aba de TypeScript to código do componente de exemplo para entender como fazer isso.

Podemos implementar um filtro (_filter), um método que mudará a exibição desse Autocomplete a depender do que a pessoa usuária digitar:

Documentação
private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
}
COPIAR CÓDIGO
Isso ficará como desafio para você! A prática consistirá em dois passos:

Criar um formControl para cada input desses: um para "Origem" e um para "Destino".
Esse formControl pode ser passado via input para o nosso componente. Nele, podemos fazer o que o Material sugere na documentação: this.myControl, usando o formControl que recebemos via input, .valueChanges.pipe() e, dentro desse método, inserir um código de RxJS para fazer o map() e filtrar os estados brasileiros.
Exemplo da documentação
ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
    );
}
COPIAR CÓDIGO
Deixaremos uma atividade a seguir, descrevendo o desafio mais detalhadamente para você praticar o que temos feito com o Angular até agora.

É essencial que você pratique porque, na próxima aula, precisaremos disso pronto. Combinado?!

Agora é a sua vez de brilhar! Contamos com você para continuar, e ainda há muito a fazer no JornadaMilhas.

@@05
Componentização dentro de formulários

A equipe decidiu componentizar esses inputs e torná-los reutilizáveis, permitindo a passagem de informações de label, ícone e formControl.
De acordo com essa situação, qual seria a melhor abordagem para implementar um componente de seleção de estados de origem e destino? Marque a alternativa correta.

Utilizar um único componente para a seleção de estados de origem e destino, implementando a lógica de seleção e exibição dos estados internamente, sem a necessidade do decorator @Input.
 
Essa abordagem não permite a flexibilidade de reutilização do componente em diferentes partes do aplicativo, pois a lógica de seleção e exibição dos estados estaria restrita a um único componente.
Alternativa correta
Adicionar diretamente o código HTML dos inputs de estado de origem e estado de destino nos locais onde são necessários, sem a utilização de componentes reutilizáveis.
 
Alternativa correta
Implementar dois componentes separados, um para o input de estado de origem e outro para o input de estado de destino, sem a passagem de informações de label, ícone e formControl.
 
Alternativa correta
Utilizar um serviço compartilhado para gerenciar os inputs de estado de origem e estado de destino, evitando a necessidade de criar um componente específico para esses inputs.

@@06
Desafio: depoimentos dinâmicos e buscando controles

Chegou a sua hora da aventura, parte 3! Nós já sabemos como criar serviços que obtém dados da API, inclusive lidando com cache!
O desafio dessa vez é ajustar nossa rotina que lista depoimentos, obtendo os dados da nossa API ao invés de exibirmos código estático. Claro, vamos precisar refatorar um pouco nosso código existente.

Depois, implemente no FormBuscaService um método que busca por um FormControl e lança um erro se não encontrar. Isso vai ajudar a gente em algumas rotinas mais pra frente.

Mão na massa!

Bora de código?
O meu serviço ficou assim:

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Depoimento } from '../types/type';

@Injectable({
  providedIn: 'root'
})
export class DepoimentoService {

  private apiUrl: string = environment.apiUrl

  constructor(
    private http: HttpClient
  ) { 
  }

  listar() : Observable<Depoimento[]>{
    return this.http.get<Depoimento[]>(`${this.apiUrl}/depoimentos`);
  }
}
COPIAR CÓDIGO
E os componentes:

<!-- src/app/pages/home/depoimentos/depoimentos.component.html -->
<div class="card-wrapper">
    <app-card-depoimento  *ngFor="let item of depoimentos" [depoimento]="item" />
</div>
COPIAR CÓDIGO
// src/app/pages/home/depoimentos/depoimentos.component.ts
import { Component } from '@angular/core';
import { DepoimentoService } from 'src/app/core/services/depoimento.service';
import { Depoimento } from 'src/app/core/types/type';

@Component({
  selector: 'app-depoimentos',
  templateUrl: './depoimentos.component.html',
  styleUrls: ['./depoimentos.component.scss']
})
export class DepoimentosComponent {
  depoimentos: Depoimento[] = [];
  constructor(private service: DepoimentoService) {
  }
  ngOnInit(): void {
    this.service.listar().subscribe(
      res => {
        this.depoimentos = res;
      }
    )
  }
}
COPIAR CÓDIGO
E o componente CardDepoimento:

<mat-card class="depoimento">
  <mat-card-content>
    <img src="assets/imagens/avatar3.png" alt="Avatar da pessoa autora do depoimento">
    <ul>
      <li>{{ depoimento.texto }}</li>
      <li>
        <strong>{{ depoimento.autor }}</strong>
      </li>
    </ul>
  </mat-card-content>
</mat-card>
COPIAR CÓDIGO
import { Component, Input } from '@angular/core';
import { Depoimento } from 'src/app/core/types/type';

@Component({
  selector: 'app-card-depoimento',
  templateUrl: './card-depoimento.component.html',
  styleUrls: ['./card-depoimento.component.scss']
})
export class CardDepoimentoComponent {
  @Input() depoimento!: Depoimento;

}
COPIAR CÓDIGO
E o último detalhe, aquele método que faltava no FormBuscaService:

  obterControle(nome:string): FormControl {
    const control = this.formBusca.get(nome);
    if (!control) {
      throw new Error(`FormControl com nome "${nome}" não existe.`);
    }
    return control as FormControl;
  }


#### 03/03/2024

@04-Controlando a modal

@@01
Projeto da aula anterior

Caso queira revisar o código até aqui ou começar a partir desse ponto, disponibilizamos os códigos realizados na aula anterior, para baixá-lo clique neste link ou veja nosso repositório do Github.

@@02
Preparando o ambiente: ajustes de estilo

Bora ajustar alguns detalhes da nossa aplicação?
Pra gente poder focar no Angular e no formulário de busca, vou deixar aqui pra você uns ajustes visuais que precisamos fazer no form de busca:

      <mat-chip (click)="openDialog()">
        <div class="inner">
          <mat-icon>check</mat-icon> 1 adulto
        </div>
      </mat-chip>
      <mat-chip (click)="openDialog()">
        <div class="inner">
          <mat-icon>check</mat-icon> Econômica
        </div>
      </mat-chip>
COPIAR CÓDIGO
E o SCSS:

.form-busca {
    margin: 40px 0;
    display: block;

    .flex-container {
        display: flex;
        align-items: center;
        gap: 12px;
        margin: 16px 0;
    }

    .input-container {
        margin-bottom: -1.25em;
    }

    .mat-button-toggle-checked {
        background-color: #F7F2FA;
    }

    h2 {
        font-size: 32px;
        margin-bottom: 20px;
    }

    mat-chip {
        .inner {
            overflow: visible;
            display: flex;
            align-items: center;
            gap: 8px;
            cursor: pointer;
        }
    }
}
COPIAR CÓDIGO
Com esses ajustes, temos a estrutura que precisamos para controlarmos a abertura da modal e exibirmos os dados que foram manipulados nela.

@@03
Abertura e fechamento

Agora já temos origem e destino com o desafio resolvido. Abrindo o projeto no navegador e clicando no campo Origem, se começarmos a digitar "Rio de Janeiro", ele encontra a cidade correta. Assim, o nosso auto complete está funcionando.
Podemos então focar no próximo passo: a modal. Nesta aula, deixamos uma atividade chamada "Preparando o Ambiente", para fazermos pequenos ajustes no chip da quantidade de passageiros e do tipo de passagem. Esse processo envolverá um pouco de CSS e HTML.

Feito isso, podemos ajustar e controlar os dados da modal. Abrindo o VS Code, acessaremos o arquivo "form-busca-component.ts", em "form-busca > dropdown-uf".

A ideia é controlar o estado da modal pelo form-busca-service. A modal é uma extensão do formulário, portanto, faz sentido que o serviço saiba como abri-la.

Desse arquivo, recortaremos o método openDialog usando o atalho "CTRL + X" do teclado.

openDialog() {
    this.dialog.open(ModalComponent, {
        width: '50%'
    })
}
COPIAR CÓDIGO
Colaremos esse trecho em "form-busca-service.ts", abaixo do restante do código. Obteremos um erro de que não existe dialog nem ModalComponent dentro dessa classe. Importaremos o ModalComponent e o dialog será um serviço injetado no construtor.

Voltaremos ao "form-busca-component.ts" e recortaremos o MatDialog do construtor, localizado em:

import class FormBuscaComponent {
    constructor(public dialog: MatDialog,
        public formBuscaService : FormBuscaService) {}
COPIAR CÓDIGO
O resultado será o seguinte:

import class FormBuscaComponent {
    constructor(
        public formBuscaService : FormBuscaService) {}
COPIAR CÓDIGO
Com isso, podemos também excluir as importações do MatDialog e do ModalComponent:

import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
COPIAR CÓDIGO
Salvaremos essas alterações e voltaremos ao arquivo "form-busca-service.ts" e colar o trecho recortado no construtor:

constructor(private dialog: MatDialog) {

// Trecho de código suprimido
COPIAR CÓDIGO
Ele não precisa ser público, pois quem abrirá o dialog é o próprio formulário. Encapsulamos o método dentro da função que acabamos de trazer do "form-busca-component.ts".

Em seguida, abriremos o arquivo "form-busca-component.html" e editaremos o trecho <mat-chip>. Ao clique, queremos chamar o formBuscaService.openDialog(). Faremos esse processo a partir dos dois chips:

// Trecho de código suprimido

<mat-chip (click)="formBuscaService.openDialog()">
    <div class="inner">
        <mat-icon>check</mat-icon> 1 adulto
    </div>
</mat-chip>
<mat-chip (click)="formBuscaService.openDialog()">
    <div class="inner">
        <mat-icon>check</mat-icon> Econômica
    </div>
</mat-chip>
COPIAR CÓDIGO
Com isso, migramos a responsabilidade de abrir a modal para o formBuscaService. Voltaremos ao navegador e recarregaremos a página. Quando tentamos abrir a modal, ela funciona corretamente, tanto ao clicarmos na quantidade de passageiros "1 adulto" quanto na modalidade da passagem "Econômica".

A seguir, precisamos alterar a categoria presente na modal a partir da interação da pessoa usuária. O próximo passo é criar um Form Control que cuidará disso.

Mas tem um detalhe: voltando ao VS Code, abriremos "app > shared > modal > modal.component.html" e nos preocuparemos em editar o <mat-chip-listbox>. Esse trecho é um componente do Material Design e não sabe trabalhar com o Form Control. Precisamos fazer essa troca manualmente.

Temos que ouvir essa alteração e cuidar do estado do formulário. Já temos uma fonte de verdade, o Form Control. Faremos tudo isso no próximo vídeo.

@@04
Chips e o form control

Agora, evoluiremos o mat-chip-listbox para trocar o valor. Começaremos criando o form control. Queremos iniciá-lo com o tipo Econômica selecionado, então podemos copiar essa palavra do arquivo "modal.component.html".
Percorreremos o caminho "core > services > form-busca.service.ts". Nesse arquivo, criaremos um novo form control dentro das chaves de FormGroup({}), passando como parâmetro a palavra "Econômica" como valor padrão:

tipo: new FormControl('Econômica')
COPIAR CÓDIGO
Em seguida, voltaremos ao arquivo "modal.component.html" e retiraremos o selected do mat-chip-option e trocaremos a ordem: a primeira opção será "Econômica" e a segunda, "Executiva". O trecho do código ficou da seguinte forma:

    <div class="selecao-categoria">
      <p><strong>Categoria</strong></p>
      <mat-chip-listbox aria-label="Seleção de passagens">
        <mat-chip-option>Econômica</mat-chip-option>
        <mat-chip-option>Executiva</mat-chip-option>
      </mat-chip-listbox>
    </div>
COPIAR CÓDIGO
O trecho que diz respeito à quantidade de pessoas está acima do nosso componente. Por enquanto, focaremos na categoria da passagem (econômica ou executiva). Podemos trazer o atributo value:

    <div class="selecao-categoria">
      <p><strong>Categoria</strong></p>
      <mat-chip-listbox aria-label="Seleção de passagens">
        <mat-chip-option value="Econômica">Econômica</mat-chip-option>
        <mat-chip-option value="Executiva">Executiva</mat-chip-option>
      </mat-chip-listbox>
    </div>
COPIAR CÓDIGO
O próximo passo é definir como saberemos se um valor está selecionado. Primeiro, quebraremos as linhas para esse trecho ficar mais compreensível:

    <div class="selecao-categoria">
      <p><strong>Categoria</strong></p>
      <mat-chip-listbox aria-label="Seleção de passagens">
        <mat-chip-option
                    value="Econômica"
                    >
                        >Econômica
                    </mat-chip-option>
        <mat-chip-option
                    value="Executiva
                >
                    Executiva
                </mat-chip-option>
      </mat-chip-listbox>
    </div>
COPIAR CÓDIGO
A partir daqui, acrescentaremos um selected que irá variar. Por isso, chamaremos formBuscaService. Obteremos um erro indicando que formBuscaService não existe, isso porque ainda não o injetamos.

Faremos isso acessando o arquivo "modal.componenet.ts" e, dentro das chaves de class ModalComponent, adicionaremos um construtor. Já que estamos acessando direto do template, teremos um formBuscaService público, do tipo FormBuscaService:

export class ModalComponent {
    constructor (public formBuscaService: FormBuscaService) {
    
    }
}
COPIAR CÓDIGO
Agora, voltaremos ao selected no arquivo "modal.component.html", acrescentando um .formBusca.get('tipo') logo após formBuscaService. O .get não garante que ele retornará um FormControl. Por isso, precisamos inserir um ponto de interrogação logo após a indicação do tipo. Assim, se value for exatamente igual (===) a Econômica, queremos que ele seja ativado:

    <div class="selecao-categoria">
      <p><strong>Categoria</strong></p>
      <mat-chip-listbox aria-label="Seleção de passagens">
        <mat-chip-option
                    value="Econômica"
                    [selected]="formBuscaService.formBusca.get('tipo')?.value === 'Econômica'"
                    >

// Trecho de código suprimido
COPIAR CÓDIGO
O mesmo acontece para a categoria "Executiva", mudando apenas o nome da seleção:

// Trecho de código suprimido

        <mat-chip-option
                    value="Executiva
                    [selected]="formBuscaService.formBusca.get('tipo')?.value === 'Executiva'"
                >
                    Executiva

// Trecho de código suprimido
COPIAR CÓDIGO
Teoricamente, isso fará com que, por padrão, a classe Econômica fique selecionada. Testaremos isso recarregando a página do navegador e clicando no botão para visualizar o modal. Percebemos, então, que a categoria Econômica está selecionada.

E se mudarmos para Executiva? Abriremos o arquivo "form-busca.service.ts" e editaremos o texto dentro do FormControl substituindo o "Econômica" por "Executiva":

tipo: new FormControl('Executiva')
COPIAR CÓDIGO
Voltaremos ao navegador, recarregaremos a página e abriremos a modal. O resultado é que agora a categoria Executiva está selecionada.

O nosso estado inicial está funcionando. Agora, precisamos fazer a troca quando a seleção mudar. Precisamos que esse valor se reflita no formulário.

Para fazer isso, abriremos o arquivo "modal.component.html". Logo abaixo da linha [selected] do valor "Executiva", ouviremos o evento selectionChange. Podemos inserir nele um formBuscaService.alterarTipo(). Seu parâmetro será o $event.

Com isso, teremos acesso ao que foi executado. Para facilitar o nosso trabalho, podemos passar o texto 'Executiva'" logo após o evento, separando ambos por uma vírgula.

// Trecho de código suprimido

        <mat-chip-option
                    value="Executiva
                    [selected]="formBuscaService.formBusca.get('tipo')?.value === 'Executiva'"
                    (selectionChange)="formBuscaService.alterarTipo($event, 'Executiva')"
                >
                    Executiva

// Trecho de código suprimido
COPIAR CÓDIGO
No valor "Econômica", faremos a mesma alteração:

// Trecho de código suprimido

        <mat-chip-option
                    value="Econômica"
                    [selected]="formBuscaService.formBusca.get('tipo')?.value === 'Econômica'"
                    (selectionChange)="formBuscaService.alterarTipo($event, 'Econômica')"
                    >

// Trecho de código suprimido
COPIAR CÓDIGO
Se observarmos com atenção, perceberemos que o VS Code está apontando um erro em alterarTipo, indicando que ele não existe. Para corrigir esse problema, vamos implementá-lo em "form-busca.service.ts".

Logo abaixo do método obterControle(), criaremos o método alterarTipo(). Ele receberá um evento do tipo MatChipSelectionChange. Como segundo argumento, recebemos o tipo string.

Nesse método, podemos criar uma condicional if para indicar que, se o evento for de seleção (evento.selected), atualizaremos o valor parcial do "form-busca", passando parcialmente o tipo. O trecho completo ficou da seguinte forma:

// Trecho de código suprimido

alterarTipo (evento: MatChipSelectionChange, tipo: string) {
    if (evento.selected) {
        this.formBusca.patchValue({
            tipo,
        )}
    }
}
COPIAR CÓDIGO
A única coisa que muda é o tipo. Salvaremos, retornaremos ao navegador e carregaremos a página para testar. Abrindo a modal, clicaremos em uma categoria por vez para verificar a troca e, por enquanto, tudo está funcionando corretamente.

Ainda não temos a submissão do formulário. Então, para testar, usaremos o console log.

Dentro das chaves de alterarTipo, escreveremos console.log('Tipo de passagem alterado para: ', tipo ):

// Trecho de código suprimido

alterarTipo (evento: MatChipSelectionChange, tipo: string) {
    if (evento.selected) {
        this.formBusca.patchValue({
            tipo,
        )}
        console.log('Tipo de passagem alterado para: ', tipo )
    }
}
COPIAR CÓDIGO
Voltando ao navegador, recarregaremos a página, limparemos o terminal e abriremos a modal. Ao clicar alternadamente em "Econômica" e "Executiva", observaremos as mensagens no Console:

Tipo de passagem alterado para: Executiva
Tipo de passagem alterado para: Econômica
O patch funciona corretamente, mas ainda temos mais coisas para fazer. Esperamos você no próximo vídeo!

@@05
Descrição de passageiros

Nossa modal já está sendo controlada pelo nosso serviço. O próximo passo é fazer o controle da quantidade de passageiros. Abriremos o navegador e clicaremos no modal.
Além das categorias "Executiva" e "Econômica", temos três campos que indicam a quantidade de pessoas adultas, crianças e bebês que farão a viagem.

Cada um deles tem um componente com dois botões: um com o sinal gráfico de soma e outro, de subtração. Ele tem também um valor numérico.

Por isso, precisamos de três controles: um para adultos, outro para crianças e um terceiro para bebês.

Abriremos o VS Code e acessaremos o arquivo "form-busca.service.ts". Dentro das chaves de this.formBusca = new FormGroup({}), escreveremos adultos: new FormControl(1), assim, o campo "adultos" começará com o número 1 por padrão.

Também teremos crianças. Logo, escreveremos criancas: new FormControl(0), começando com o valor zero. Podemos copiar e colar essa mesma linha, editando-a para integrar o campo bebes. O resultado é o seguinte:

    this.formBusca = new FormGroup({

// Trecho de código suprimido

        adultos: new FormControl(1)
        criancas: new FormControl(0)
        bebes: new FormControl(0)
    )}
COPIAR CÓDIGO
Com isso, estamos iniciando o controle de formulário. Ainda precisamos implementar a alteração.

Antes, voltaremos ao Figma para observar uma questão: no primeiro chip, que indica a quantidade de passageiros, temos o número de pessoas e o tipo. Assim, se tivermos um adulto, uma criança e um bebê, precisamos concatenar todas essas informações.

Para fazermos isso, voltaremos ao VS Code e logo abaixo do construtor, chamaremos um método getDescricaoPassageiros(), que retornará uma string. Dentro dele, começaremos uma descricao vazia, retornando-a no fim com o return descricao.

Primeiro, colocaremos o valor de adultos escrevendo const adultos = this.formBusca.get('adultos')?.value. Na linha debaixo, inseriremos uma condicional if para indicar que, se tivermos um valor adultos maior que zero, queremos inserir a descricao e concatenar uma string para começar a construir o texto.

getDescricaoPassageiros(): string {
    let descricao = ''
    
    const adultos = this.formBusca.get('adultos')?.value
    if (adultos && adultos > 0) {
        descricao += ''
    }
    
    return descricao
}
COPIAR CÓDIGO
A partir daqui, queremos te desafiar: trabalharemos uma parte puramente lógica. Baseado em condições, teremos que definir se as palavras virão no plural ou no singular, além de organizar a quantidade de adultos, crianças e bebês. Assim, gostaríamos que você pensasse e implementasse o trecho que falta no código.

Ao resolver o desafio, poste-o no Discord, no LinkedIn e em outras redes sociais, marcando o Vinícius Neves e mostrando a sua solução.

Incluiremos um gabarito na descrição do desafio para você conferir uma possibilidade de resolução para esse problema. Esperamos você na próxima aula!

@@06
Implementando os botões de seleção

A equipe de desenvolvimento do "Jornada Milhas" está trabalhando na implementação dos botões de seleção entre os tipos de passagem (econômica ou executiva) e já conseguiu aplicar o ícone de “check” ao botão selecionado:
Tela da aplicação “Jornada Milhas” exibindo a seção de escolha de categoria de passagens, em que as opções estão divididas nos botões de “Econômica” e “Executiva” e ao clicar em um desses botões, ele fica em destaque

No entanto, ao clicar em um desses botões de tipo de passagem, o valor do campo “tipo” no formulário não é alterado. Assim, ao testar o envio do formulário, não recebemos uma resposta indicando qual campo foi selecionado.

Pensando nisso, assinale a alternativa que traz a solução para que o tipo de passagem seja capturado pelo formulário de acordo com o botão selecionado:

Selecione uma alternativa

Utilizar o evento (selectionChange) dos botões de tipo de passagem para chamar um método para alterar o tipo no serviço de formulário de busca.
 
Utilizando o evento (selectionChange), é possível identificar quando há uma mudança na seleção do botão de tipo de passagem. Ao chamar o método alterarTipo() no serviço de formulário de busca, é possível atualizar o valor do campo tipo no formulário com base na nova seleção.
Alternativa correta
Adicionar um evento de clique para cada botão de tipo de passagem, chamando um método para alterar o tipo no serviço de formulário de busca.
 
Alternativa correta
Adicionar um evento de alteração de valor (change) para cada botão de tipo de passagem, chamando um método para alterar o tipo no serviço de formulário de busca.
 
Alternativa correta
Remover a propriedade [selected] dos botões de tipo de passagem, permitindo que o valor do campo tipo seja alterado independentemente da seleção do botão.

@@07
Desafio: descrevendo todos os passageiros

Chegou a sua hora da aventura, parte 4! E que tal um pouco de desafio de lógica? A gente precisa controlar o texto baseado na seleção do usuário: X passageiro(s), Y criança(s) e Z bebê(s).
O desafio é: precisamos exibir cada grupo se o valor selecionado for maior do que zero. Além disso, fica mais elegante se exibirmos o S do plural condicionalmente, apenas se for maior do que 1.

Bora de código? Vamos criar esse algorítimo que faz essas contas pra gente?
https://media.tenor.com/dlJSiLUJNmsAAAAC/math-calculate.gif

A minha versão final ficou assim:

  getDescricaoPassageiros (): string {
    let descricao = ''

    const adultos = this.formBusca.get('adultos')?.value;
    if (adultos && adultos > 0) {
      descricao += `${adultos} adulto${adultos > 1 ? 's' : ''}`;
    }
  
    const criancas = this.formBusca.get('criancas')?.value;
    if (criancas && criancas > 0) {
      descricao += `${descricao ? ', ' : ''}${criancas} criança${criancas > 1 ? 's' : ''}`;
    }
  
    const bebes = this.formBusca.get('bebes')?.value;
    if (bebes && bebes > 0) {
      descricao += `${descricao ? ', ' : ''}${bebes} bebê${bebes > 1 ? 's' : ''}`;
    }
  
    return descricao
  }
COPIAR CÓDIGO
Em getDescricaoPassageiros(), nós lidamos com várias técnicas interessantes de JavaScript. Vamos abordar cada uma delas e entender como elas contribuem para o funcionamento do código.

Interpolação de strings: Em JavaScript, podemos usar a sintaxe de interpolação de string (template literals) para inserir variáveis diretamente dentro das strings. Isso é feito usando a sintaxe ${}. No nosso código, utilizamos essa técnica para inserir a quantidade de adultos, crianças e bebês diretamente nas strings de descrição.
Operador ternário: O operador ternário é uma forma simplificada de escrever uma estrutura de controle if-else. A expressão antes do ? é a condição que está sendo verificada. Se essa condição for verdadeira, o código antes dos : é executado. Caso contrário, o código após os : é executado. No nosso código, usamos o operador ternário para decidir se devemos ou não adicionar o 's' no final dos nomes dos passageiros e para inserir uma vírgula antes dos nomes das crianças e bebês, se já tivermos uma descrição para os adultos.
O operador ? (optional chaining): Este operador é usado para ler o valor de propriedades aninhadas dentro de um objeto sem ter que verificar explicitamente se cada nível intermediário é null ou undefined. Em outras palavras, se tentarmos ler uma propriedade de undefined ou null, receberíamos um erro. Mas com o operador ?, o JavaScript retorna undefined em vez de lançar um erro. No nosso caso, utilizamos ? para ler os valores dos campos 'adultos', 'criancas' e 'bebes' de formBusca, sem ter que verificar se formBusca ou o resultado de formBusca.get('campo') são null ou undefined.
No fim das contas, a nossa descricao pode ficar algo tipo "2 adultos, 1 criança, 3 bebês".

@@08
O que aprendemos?

Nessa aula, você aprendeu como:
Controlar a abertura do modal através do serviço;
Fazer o controle de formulário dos chips de tipo de passagem;
Controlar o texto de seleção e quantidade de passageiros.

##### 04/03/2024

@05-Ajustes finais

@@01
Projeto da aula anterior

Caso queira revisar o código até aqui ou começar a partir desse ponto, disponibilizamos os códigos realizados na aula anterior, para baixá-lo clique neste link ou veja nosso repositório do Github.

https://github.com/alura-cursos/jornada/archive/refs/heads/aula-4.zip

https://github.com/alura-cursos/jornada/tree/aula-4

@@02
Componente de passageiros

Estamos chegando no final dos ajustes do nosso projeto para trazer comportamento ao Jornada Milhas que antes estava puramente visual.
Agora, vamos tratar do controle de passageiros. Atualmente, a nossa modal tem os botões de aumentar e diminuir o incremento de passageiros adultos, crianças e bebês. Mas, são apenas elementos visuais.

Precisamos evoluí-los para ter um controle, como se fosse um input de formulário.

No VS Code, vamos abrir o "src > app > shared > modal > modal.component.html". Dentro de uma div com a classe selecao-idade, temos um ul para cada grupo, ou seja, uma lista não ordenada para adulto, outra para crianças e também para bebês.

modal.component.html:
<div class="selecao-idade">
    <ul>
        <li><strong>Adultos</strong></li>
        <li>(Acima de 12 anos)</li>
        <li>
            <app-botao-controle operacao="decrementar"></app-botao-controle>
            <span>1</span>
            <app-botao-controle operacao="incrementar"></app-botao-controle>
        </li>
    </ul>
    <ul>
        <li><strong>Crianças</strong></li>
        <li>(Entre 2 e 11 anos)</li>
        <li>
            <app-botao-controle operacao="decrementar"></app-botao-controle>
            <span>1</span>
            <app-botao-controle operacao="incrementar"></app-botao-controle>
        </li>
    </ul>
    <ul>
        <li><strong>Bebês</strong></li>
        <li>(Até 2 anos)</li>
        <li>
            <app-botao-controle operacao="decrementar"></app-botao-controle>
            <span>1</span>
            <app-botao-controle operacao="incrementar"></app-botao-controle>
        </li>
    </ul>
</div>
COPIAR CÓDIGO
Essa tag ul fica responsável por exibir o título, o substítulo e as opções de controle de incrementar ou decrementar essa quantidade.

Como temos esse bloco repetido três vezes e nosso objeto é controlá-lo via um form control, podemos refatorar esse código para virar um componente.

Criar e estilizar componente de passageiros
Para criar esse componente, vamos abrir o terminal. Estamos dentro da pasta jornada-milhas. Vamos pedir para o Angular (ng) gerar (g) um componente (c) e podemos aceitar a sugestão de criar shared/seletor-passageiro.

Assim, podemos criar e extrair essa lógica para o componente de seletor de passageiros.

ng g c shared/seletor-passageiro
COPIAR CÓDIGO
Após gerar o componente, vamos voltar no VS Code. Ele já está registrado no app.module.ts e já gerou o componente seletor-passageiro na pasta "shared > seletor-passageiro".

O HTML vai ser o código de uma das tags ul que já temos. Portanto, podemos copiar a ul com o li de título, li de subtítulo e o terceiro li com os botões de quantidade do modal.component.html.

seletor-passageiro.component.html:
<ul>
    <li><strong>Adultos</strong></li>
    <li>(Acima de 12 anos)</li>
    <li>
        <app-botao-controle operacao="decrementar"></app-botao-controle>
        <span>1</span>
        <app-botao-controle operacao="incrementar"></app-botao-controle>
    </li>
</ul>
COPIAR CÓDIGO
Com o botão direito do mouse, vamos pedir para o VS Code formatar o documento (ou "Shift + Alt + F").

Agora, a classe selecao-idade tem um CSS que precisamos jogar para o componente. Por isso, vamos abrir o modal.component.scss e procurar por .selecao-idade.

Vamos recortar o trecho de CSS com "Ctrl + X", sendo somente os estilos do ul, li e span. Vamos colar com "Ctrl + V" no SCSS do componente:

seletor-passageiro.component.scss:
ul {
    list-style-type: none;
    margin: 0 0 0 -1em;
    padding: 0;
    li {
        margin-bottom: 10px;
        margin: 12px;
        font-weight: 400;
        font-size: 16px;
        line-height: 20px;
        color: #1D1B20;
        text-align: start;
        padding: 0;
        span {
            vertical-align: middle;
            padding: 0 12px;
        }
    }
}
COPIAR CÓDIGO
Feito isso, já temos o estilo e podemos começar a testar esse componente.

No modal.component.html, vamos fazer o mesmo que fizemos na refatoração do dropdown de estados. Vamos comentar as três ul que temos dentro da div de seleção de idade.

Dentro da div, podemos trazer o componente app-seletor-passageiro três vezes, pois vamos ter três seleções.

modal.component.html:
<div class="selecao-idade">
    <app-seletor-passageiro />
    <app-seletor-passageiro />
    <app-seletor-passageiro />

    <!-- Código comentado omitido -->

</div>
COPIAR CÓDIGO
Vamos conferir se esse código está funcional. No navegador, entramos na aba do Jornada Milhas e recarregamos a página com "F5". Clicamos em "1 Adulto" para abrir a modal.

Os estilos estão corretos, mas os títulos e subtítulos estão fixos. Já sabemos como fazer para receber esses dados via input.

Receber dados via input
No VS Code, vamos em seletor-passageiro.component.ts para começar a declarar os inputs.

Na classe SeletorPassageiroComponent, vamos ter um @Input() chamado titulo que vai ser do tipo string. O TypeScript avisa que é preciso inicializá-la. Por isso, vamos adicionar um valor padrão, uma string vazia.

Vamos duplicar a linha, pois, além do titulo, vamos ter um @Input chamado subtitulo. O título seria adulto e o subtítulo seria o texto explicativo de idade.

seletor-passageiro.component.ts:
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-seletor-passageiro',
  templateUrl: './seletor-passageiro.component.html',
  styleUrls: ['./seletor-passageiro.component.scss'],
})
export class SeletorPassageiroComponent {
  @Input() titulo: string = ''
  @Input() subtitulo: string = ''
}
COPIAR CÓDIGO
Com isso, podemos ir ao arquivo HTML do componente. Ao invés de exibir o texto Adulto diretamente, podemos exibir o que vamos receber via input.

Vamos aproveitar para quebrar a linha antes da abertura e depois do fechamento da tag strong para ficar em uma linha separada. Dentro do strong, vamos substituir Adulto para exibir o {{ titulo }}.

No próximo item de lista li, vamos substituir o texto (Acima de 12 anos) por {{ subtitulo }}.

seletor-passageiro.component.html:
<ul>
    <li>
        <strong>{{ titulo }}</strong>
    </li>
    <li>{{ subtitulo }}</li>
    <li>
        <app-botao-controle operacao="decrementar"></app-botao-controle>
        <span>1</span>
        <app-botao-controle operacao="incrementar"></app-botao-controle>
    </li>
</ul>
COPIAR CÓDIGO
Após salvar, podemos voltar no navegador e recarregar a página do Jornada Milhas. Após abrir o modal, os títulos e subtítulos estão vazios.

Vamos passar esses valores?

No VS Code, vamos até o arquivo modal.component.html. O que precisamos passar? Para cada componente app-selector-passageiro, precisamos passar um atributo titulo e subtitulo. Para isso, podemos usar o atalho "Alt" e clique para posicionar o cursor em várias linhas de uma vez.

Podemos pegar os títulos e subtítulos dos blocos comentados. O primeiro vai ser Adulto com subtítulo Acima de 12 anos entre parênteses. Para não precisar digitar novamente esses dados, basta recortar e colar.

O segundo terá título Crianças e subtítulo Entre 2 e 11 anos entre parênteses. Por último, o título Bebês tem subtítulo Até 2 anos entre parênteses.

modal.component.html:
<div class="selecao-idade">
    <app-seletor-passageiro titulo="Adultos" subtitulo="(Acima de 12 anos)"/>
    <app-seletor-passageiro titulo="Crianças" subtitulo="(Entre 2 e 11 anos)"/>
    <app-seletor-passageiro titulo="Bebês" subtitulo="(Até 2 anos)"/>

    <!-- Código comentado omitido -->

</div>
COPIAR CÓDIGO
Vamos salvar e conferir o resultado no navegador uma última vez. Após recarregar e abrir o modal, verificamos que recebemos os valores e exibimos as legendas corretamente.

Próximos passos
Para finalizar e ter um componente reaproveitável, seria interessante se entregássemos algo para passar um form control para a pessoa consumidora do seletor de passageiro.

Queríamos passar um controle de formulário para que a pessoa controle a quantidade que aumenta e diminui. Pensando nesse cenário, o Angular entrega uma interface que podemos implementar de forma que o componente receba esse form control.

É isso que vamos fazer no próximo vídeo!

@@03
Implementando o ControlValueAccessor

No arquivo modal.component.html, já podemos remover o trecho comentado.
Agora, precisamos passar esse formControl, pois queremos que o componente seja controlado por um formControl.

Implementar ControlValueAccessor
Para isso, vamos ao arquivo seletor-passageiro.component.ts. A classe que é responsável por definir esse comportamento que o Angular entrega é chamada ControlValueAccessor.

Vamos pedir para a classe SeletorPassageiroComponent implementar esse ControlValueAcessor. Ao implementar essa interface, vamos conseguir receber esse formControl.

Com isso, o ControleValueAccessor é importado automaticamente desde @angular/forms no início do documento.

Vamos pedir para o VS Code nos ajudar a implementar a interface, usando o quick fix (ou atalho "Ctrl + .") e aceitar a sugestão "Implement interface 'ControlValueAccessor'".

Com isso, a IDE entrega os quatro métodos que precisamos fazer. O único detalhe que vamos ajustar é trazer os inputs para o começo da classe, antes de implementar esses valores.

seletor-passageiro.component.ts:
import { Component, Input } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-seletor-passageiro',
  templateUrl: './seletor-passageiro.component.html',
  styleUrls: ['./seletor-passageiro.component.scss'],
})
export class SeletorPassageiroComponent implements ControlValueAccessor 

  @Input() titulo: string = ''
  @Input() subtitulo: string = ''

  writeValue(obj: any): void {
    throw new Error('Method not implemented.');
  }
  registerOnChange(fn: any): void {
    throw new Error('Method not implemented.');
  }
  registerOnTouched (fn: any): void {
    throw new Error('Method not implemented.');
  }
  setDisabledState? (isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }
}
COPIAR CÓDIGO
O método writeValue() é responsável por armazenar e escrever o valor do input. O registerOnChange() vai fazer o vínculo entre a alteração desse valor com o formulário dinâmico.

Temos o mesmo para o registerOnTouched() e o setDisabledState?(). Ou seja, esses métodos precisam estar definidos para que o nosso FormGroup (formulário dinâmico) saiba que pode contar com esses métodos existentes.

Com isso, já preparado. Podemos começar a fazer a implementação, porque atualmente todos os métodos fazem throw new Error() e nada iria funcionar.

Após definir o @Input substitulo, vamos definir o value que será um número nesse cenário. Portanto, vamos tipá-lo como number e inicializá-lo com 0. Ou seja, inicialmente o nosso valor é zero.

Depois de ter um number definido, podemos definir o onChange que vai receber uma função () => {} que vai fazer algo. Mas não vai fazer nada por enquanto.

Faremos o mesmo para o onTouch: vai ser uma função que inicialmente não vai fazer nada.

Por que fizemos isso? Porque o registerOnChange() vai armazenar a função fn: any que recebemos por parâmetro e vincular a essa função do onChange.

Em registerOnChange(), digitamos this.onChange vai receber essa função fn que o FormGroup injeta.

Similarmente, no registerOnTouched(), vamos registrar o this.onTouch vai receber a função fn que acabamos de receber como parâmetro.

O objeto que o writeValue() recebe será o nosso valor. Por isso, substituímos obj por val. Vamos atribuir esse valor ao value local, ou seja, this.value recebe val.

export class SeletorPassageiroComponent implements ControlValueAccessor {

  @Input() titulo: string = ''
  @Input() subtitulo: string = ''

  value: number = 0
  onChange = () => {}
  onTouch = () => {}

  writeValue(val: any): void {
    this.value = val
  }
  registerOnChange(fn: any): void {
    this.onChange = fn
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }
}
COPIAR CÓDIGO
Falta implementar somente uma maneira de alterar o valor conforme os cliques de incrementar e decrementar a quantidade de passageiros. Vamos fazê-lo no próximo vídeo.

@@04
Trabalhando com ControlValueAccessor

Após notar que uma parte do formulário de pesquisa de passagens se repetia, a equipe decidiu transformar um contador de número de passageiros adultos, bebês e crianças em um componente personalizado reutilizável. Agora, é necessário que esse componente utilize a interface ControlValueAccessor.
Qual o papel da interface ControlValueAccessor no componente Seletor Passageiros?

A interface ControlValueAccessor é responsável por realizar a função de incrementar e decrementar o número de passageiros no componente de contador personalizado.
 
Alternativa correta
A interface ControlValueAccessor é responsável por armazenar o valor do contador de passageiros e garantir a persistência desse valor durante a interação com o formulário.
 
A responsabilidade de armazenar o valor do contador de passageiros é do próprio componente personalizado, não da interface ControlValueAccessor.
Alternativa correta
A interface ControlValueAccessor é responsável por realizar a validação dos valores do contador de passageiros de acordo com as regras definidas no formulário.
 
A validação dos valores do contador de passageiros é uma responsabilidade do formulário ou de outras validações definidas no componente, não da interface ControlValueAccessor.
Alternativa correta
A interface ControlValueAccessor é responsável por estabelecer a comunicação entre o componente de contador de passageiros e o formulário, permitindo a integração e interação corretas entre eles.
 
A interface ControlValueAccessor é usada para permitir a integração do componente de contador de passageiros com o sistema de formulários do Angular, estabelecendo a comunicação bidirecional necessária para interagir com o formulário.

@@05
Para saber mais: ControlValueAccessor

A classe ControlValueAccessor é uma interface do Angular que permite que um componente personalizado tenha uma comunicação bidirecional com o Angular Forms.
Esta interface faz a interação com o formulário permitindo o uso das diretivas ngModel, formControl e formGroup. Ao implementar a interface ControlValueAccessor, um componente personalizado pode interagir com o estado e os valores dos controles de formulário do Angular.

A interface ControlValueAccessor possui quatro métodos principais que devem ser implementados:

writeValue(value: any): Este método é chamado pelo Angular Forms para atualizar o valor do componente personalizado com base no valor fornecido pelo formulário. O componente deve atualizar sua visualização e estado interno de acordo com o novo valor.
registerOnChange(fn: any): Este método é usado para registrar uma função de retorno de chamada que será chamada pelo componente personalizado sempre que houver alterações em seu valor interno. O componente deve chamar essa função sempre que o valor for alterado para notificar o Angular Forms sobre as alterações.
registerOnTouched(fn: any): Este método é usado para registrar uma função de retorno de chamada que será chamada pelo componente personalizado quando ele for tocado ou sofrer uma alteração no estado de foco. O componente deve chamar essa função sempre que ocorrer uma interação com ele, como um clique ou foco.
setDisabledState(isDisabled: boolean): Este método é usado para definir o estado de desabilitado do componente personalizado com base no valor fornecido pelo formulário. O componente deve atualizar sua visualização e comportamento de acordo com o estado de desabilitado.
Ao implementar a interface ControlValueAccessor, um componente personalizado se torna compatível com o sistema de formulários do Angular e pode ser usado de forma transparente, assim o componente pode receber valores do formulário, notificar o formulário sobre as alterações em seu valor interno e reagir a eventos como toque e alteração de foco.

@@06
Alterando o valor

Agora, podemos focar em implementar as ações de incremento e decremento.
Vamos abrir o HTML do componente chamado seletor-passageiro.component.html, onde já temos os botões separados em duas tags app-botao-controle. Um para decrementar (diminuir) e um para incrementar (aumentar) em 1.

Dado o clique nesses botões, queremos executar um método. Por isso, no botão decrementar, vamos chamar o evento de clique (click) que vai ser igual ao método decrementar entre aspas.

Além disso, vamos quebrar algumas linhas para organizar o HTML. Basta apertar "Enter" antes de operacao, também antes de (click) e, por fim, antes do fechamento da tag app-botao-controle. Assim, cada um fica em uma linha separada.

Por último, vamos fazer as mesmas alterações para o botão de incremento. Isto é, no segundo app-botao-controle, vamos quebrar as linhas necessárias.

Em seguida, logo após definir a operação que indica se aquele botão tem um ícone de - ou +, vamos chamar um (click) para que quando alguém clique, seja executado o método incrementar entre aspas.

seletor-passageiro.component.html:
<ul>
    <li>
        <strong>{{ titulo }}</strong>
    </li>
    <li>{{ subtitulo }}</li>
    <li>
        <app-botao-controle 
            operacao="decrementar" 
            (click)="decrementar"
        >
        </app-botao-controle>
        <span>1</span>
        <app-botao-controle 
            operacao="incrementar"
            (click)="incrementar"
        >
        </app-botao-controle>
    </li>
</ul>
COPIAR CÓDIGO
Porém, como o próprio VS Code indica, esses métodos incrementar() e decrementar() ainda não existem. Vamos criá-los em seletor-passageiro.component.ts.

Após setDisabledState?(), vamos definir uma função chamada incrementar() e outra chamada decrementar(). Com isso, o arquivo HTML já para de apontar um erro, pois agora os métodos existem.

O que queremos fazer quando alguém clicar em incrementar? Queremos pegar o this.value e aumentar 1, ou seja, += 1. Assim, pegamos o valor que já temos e incrementamos 1.

Além disso, temos que avisar para quem está ouvindo, que esse valor mudou. Para isso, devemos evocar a função que registramos. Basta digitarthis.onChange(), passando o this.value.

Dessa maneira, quem olha e ouve esse clique, vai receber esse novo valor.

O TypeScript aponta que o onChange() não espera nenhum argumento, mas passando um. Podemos consertar esse erro ao passar o parâmetro val do tipo number na definição do onChange.

Por último, devemos dizer que esse controle foi tocado e alterado. Por isso, chamamos a função this.onTouch() em incrementar(). Com isso, fizemos o incremento do valor.

Agora, precisamos fazer o mesmo para decrementar(). Basta copiar as linhas 32 a 34 que são o corpo da função incrementar() e colar dentro do método decrementar().

Porém, teremos uma pequena diferença: só queremos decrementar se o valor for atualmente maior do que zero. Pois, não queremos números negativos.

Por isso, acrescentamos um if() e as três linhas copiadas para dentro desse loop. Em seguida, vamos alterar o this.value para decrementar. Ou seja, this.value -= 1.

Qual a condição do if? Se this.value > 0. Se for maior do que zero, podemos decrementar. Se for zero, não vamos alterar o valor, pois os passageiros não podem ser negativos.

seletor-passageiro.component.ts:
export class SeletorPassageiroComponent implements ControlValueAccessor {

  @Input() titulo: string = ''
  @Input() subtitulo: string = ''

  value: number = 0
  onChange = (val: number) => {}
  onTouch = () => {}

  // código omitido…

  incrementar () {
    this.value += 1
    this.onChange(this.value)
    this.onTouch()
  }

  decrementar () {
    if (this.value > 0) {
      this.value -= 1
      this.onChange(this.value)
      this.onTouch()
    }
  }

}
COPIAR CÓDIGO
Com isso, já conseguimos implementar a interface. Agora, precisamos passar esse controle que temos no serviço de formulário e conectar essas peças que, por enquanto, ainda estão desconectadas. Até o próximo vídeo!

@@08
Desafio: últimos detalhes

Chegou a sua hora da aventura, última temporada! Pra gente ajustar os detalhes finais da última milha da nossa jornada!
Vamo de checklist:

limitar o tamanho do nosso dropdown-uf em 230px
ajustar a exibição da quantidade de passageiros
ajustar a exibição do tipo de passagem
alternar os valores de origem e destino
Coda daí que eu codo de cá e deixo o gabarito pra ti, se precisar dar aquele espiadinha.

Bora de código?
Pra limitar a largura do nosso auto-complete de Unidade Federativa eu fiz assim:

/* src/app/shared/form-busca/dropdown-uf/dropdown-uf.component.scss */
.mat-mdc-form-field {
    max-width: 230px;
}
COPIAR CÓDIGO
Pra ajustar os dados de passagem e passageiros nos chips, assim:

      <mat-chip (click)="formBuscaService.openDialog()">
        <div class="inner">
          <mat-icon>check</mat-icon> {{formBuscaService.getDescricaoPassageiros()}}
        </div>
      </mat-chip>
      <mat-chip (click)="formBuscaService.openDialog()">
        <div class="inner">
          <mat-icon>check</mat-icon> {{formBuscaService.obterControle('tipo').value}}
        </div>
      </mat-chip>
COPIAR CÓDIGO
E, por ultimo, pra alterarmos origem e destino:

  // src/app/core/services/form-busca.service.ts
  
  trocarOrigemDestino(): void {
    const origem = this.formBusca.get('origem')?.value;
    const destino = this.formBusca.get('destino')?.value;
  
    this.formBusca.patchValue({
      origem: destino,
      destino: origem
    });
  }
COPIAR CÓDIGO
E, no click do botão:

      <button mat-icon-button (click)="formBuscaService.trocarOrigemDestino()" >
        <mat-icon>sync_alt</mat-icon>
      </button>

@@09
Projeto final do curso

Caso queira revisar o código do projeto final do curso, você pode baixá-lo neste link ou acessar nosso repositório do Github.

https://github.com/alura-cursos/jornada/archive/refs/heads/aula-5.zip

https://github.com/alura-cursos/jornada/tree/aula-5

@@10
O que aprendemos?

Nessa aula, você aprendeu como:
Componentizar o seletor de passageiros;
Implementar o ControlValueAccessor;
Criar funções de incrementar e decrementar;
Integrar componente personalizado ao Angular Forms.

@@11
Parabéns!

Fala, Jedi! Você concluiu! 🎉
https://media.tenor.com/udYl1CJgloUAAAAd/yoda-star-wars.gif

Primeiramente, parabéns por ter concluído nosso épico curso de Angular! A dedicação e o esforço que você demonstrou ao longo desta jornada são dignos de um verdadeiro mestre Jedi.

Seu empenho nos módulos nos mostrou que você realmente mergulhou no mundo do Angular, e agora, você não só conhece o "Caminho", como também sabe caminhar por ele.

Nos primeiros passos, vimos como criar o primeiro serviço e manipular as variáveis de ambiente. Você se acostumou com o Observable, e explorou com muita sagacidade os segredos de 'provideIn'.

Depois, nos aprofundamos em design patterns, o coração da arquitetura do software. Você agora entende como o Angular se encaixa nisso e sabe que um bom design pattern pode fazer a diferença entre o lado sombrio e o lado da luz.

A jornada continuou, e você mergulhou no poderoso TypeScript, e provou ser um verdadeiro domador de serviços com o módulo de Unidades Federativas. E não posso deixar de mencionar o quão impressionante foi ver você manuseando o shareReplay para criar cache, assim como um Jedi manuseia seu sabre de luz.

E, claro, nos módulos finais, você construiu uma compreensão profunda dos controles de formulários, trabalhando com inputs dinâmicos e até mesmo criando uma descrição detalhada dos passageiros com o auxílio do ControlValueAccessor. Aprendemos a implementar e controlar nossos próprios componentes, e você, como um verdadeiro mestre, seguiu a jornada até o fim.

Agora, como um Jedi completo, você tem o conhecimento e a experiência para construir e controlar aplicativos Angular poderosos. Mas lembre-se, um verdadeiro Jedi está sempre aprendendo, sempre buscando conhecimento. Este é o caminho.

Por fim, lembre-se: A Força estará com você, sempre! 🌟

Continue aprendendo, continue crescendo e, acima de tudo, continue compartilhando seu conhecimento. Parabéns novamente, Jedi! Nos vemos na próxima aventura! 🚀

Até a próxima Vinny

@@12
Conclusão

Estamos muito felizes de comemorar com você mais essa vitória: mais um curso de Angular para a sua prateleira de diplomas!
O que aprendemos?
Qual foi a nossa jornada de aprendizado? Começamos dando os primeiros passos em serviços e entende o escopo do serviço. Passamos por padrão de projetos, entendendo o que é o Singleton.

Também evoluímos nossa aplicação. A Jornada Milhas ainda não tinha comportamentos, somente a camada visual. Por isso, tivemos que refatorar e escrever novas funcionalidades.

Tivemos que decidir como controlar o estado da aplicação, portanto, criamos mais um serviço para fazer o controle do formulário. Ele ficou responsável por instanciar o grupo de formulário que usamos e definir os controles. Quem precisava ter acesso, simplesmente chamava o serviço e fazia o que precisava.

Além disso, conseguimos trabalhar com a camada de cache na hora de obter os estados e também concluímos o componente que implementa um form control. Ou seja, o componente que criamos do zero permite que a pessoa usuária ou desenvolvedora que for consumi-lo, passe para ele um form control e a quantidade de passageiros que diminui ou aumenta vai estar disponível dentro daquele controle.

Precisamos implementar muitas funcionalidades interessantes. Nesse curso, passamos pela experiência de vida real de uma pessoa desenvolvedora, ou seja, pegamos uma aplicação que não começamos, com apenas um Figma e um sonho, e implementamos as funcionalidades de acordo com o que precisávamos fazer.

Esperamos que você tenha se divertido e até a próxima!