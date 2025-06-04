# Guia de Uso e Personalização do Site Jericoacoara Férias

Este documento contém instruções detalhadas sobre como usar e personalizar o site Jericoacoara Férias, desenvolvido com HTML, CSS e JavaScript totalmente comentados para fins de estudo.

## Estrutura de Arquivos

O site está organizado da seguinte forma:

```
jericoacoara_ferias/
├── css/
│   └── style.css           # Arquivo CSS principal com todos os estilos
├── img/
│   ├── Logo/               # Logotipos da empresa
│   └── fotos/              # Fotos para a galeria e banners
├── js/
│   └── script.js           # Arquivo JavaScript principal
├── pages/
│   ├── fotos.html          # Página da galeria de fotos
│   ├── valores.html        # Página de valores e preços
│   └── contato.html        # Página de contato
└── index.html              # Página inicial do site
```

## Personalização do Conteúdo

### Textos

Para personalizar os textos do site, localize as seções comentadas nos arquivos HTML. Por exemplo:

```html
<!-- Seção Sobre a empresa -->
<section class="sobre" id="sobre">
    <div class="container">
        <h2>Bem-vindo à Jericoacoara Férias</h2>
        <div class="sobre-content">
            <div class="sobre-text">
                <!-- Espaço reservado para o cliente adicionar texto sobre a empresa -->
                <p>Somos especializados em proporcionar a melhor experiência em Jericoacoara...</p>
                <p>Oferecemos transfers de/para aeroportos, entre cidades como Fortaleza...</p>
                <!-- Fim do espaço reservado -->
            </div>
        </div>
    </div>
</section>
```

Substitua os textos dentro das tags `<p>` pelos seus próprios conteúdos.

### Imagens

Para substituir as imagens:

1. Coloque suas novas imagens na pasta `img/fotos/`
2. Atualize os caminhos nos arquivos HTML. Por exemplo:

```html
<img src="../img/fotos/sua-nova-imagem.jpg" alt="Descrição da imagem">
```

### Informações de Contato

Atualize as informações de contato nos seguintes locais:

1. No rodapé de todas as páginas
2. Na página de contato (`pages/contato.html`)

### Valores e Preços

Para atualizar os preços dos serviços, edite a página `pages/valores.html` e localize as tabelas de preços:

```html
<table class="tabela-precos">
    <thead>
        <tr>
            <th>Rota</th>
            <th>Tipo</th>
            <th>Duração</th>
            <th>Preço por pessoa</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="tipo-servico">Aeroporto de Jeri / Jeri</td>
            <td>Compartilhado</td>
            <td>30 min</td>
            <td class="preco">R$ 50,00</td>
        </tr>
        <!-- Adicione ou modifique as linhas conforme necessário -->
    </tbody>
</table>
```

## Personalização Visual

### Cores

As cores do site são definidas como variáveis CSS no início do arquivo `css/style.css`:

```css
:root {
    /* Cores principais conforme especificado */
    --cor-preto: #0c0a08;
    --cor-creme: #fbf3dc;
    --cor-laranja: #fa934d;
    --cor-marrom: #996548;
    --cor-marrom-claro: #b19782;
    
    /* Cores complementares */
    --cor-azul-escuro: #002037;
    --cor-verde-agua: #186663;
    --cor-cinza-claro: #A6B5B4;
    --cor-marrom-medio: #8C7361;
    --cor-bege: #D2AF94;
    
    /* Variáveis para uso específico */
    --cor-texto: var(--cor-preto);
    --cor-texto-claro: var(--cor-creme);
    --cor-fundo: #ffffff;
    --cor-fundo-escuro: var(--cor-azul-escuro);
    --cor-destaque: var(--cor-laranja);
    --cor-link: var(--cor-verde-agua);
    --cor-borda: var(--cor-cinza-claro);
}
```

Para alterar a paleta de cores, modifique os valores dessas variáveis.

### Fontes

As fontes são importadas do Google Fonts no cabeçalho de cada página HTML:

```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">
```

Para alterar as fontes, modifique esta linha e atualize as variáveis de fonte no arquivo CSS:

```css
:root {
    /* Variáveis de fonte */
    --fonte-principal: 'Poppins', sans-serif;
    --fonte-titulos: 'Montserrat', sans-serif;
}
```

## Funcionalidades JavaScript

O arquivo `js/script.js` contém várias funcionalidades comentadas:

1. **Menu Mobile**: Controla o comportamento do menu em dispositivos móveis
2. **Navegação Suave**: Permite rolagem suave para links internos
3. **Efeitos de Scroll**: Adiciona efeitos visuais durante a rolagem
4. **Slider de Parceiros**: Controla o carrossel de logos de parceiros

Cada função está detalhadamente comentada para facilitar o entendimento e personalização.

## Adicionando Novas Páginas

Para adicionar uma nova página:

1. Duplique um dos arquivos HTML existentes na pasta `pages/`
2. Renomeie o arquivo conforme necessário
3. Atualize o conteúdo e os links no menu de navegação em todas as páginas

## Hospedagem do Site

Para publicar o site:

1. Contrate um serviço de hospedagem web
2. Faça upload de todos os arquivos e pastas para o diretório raiz do seu servidor
3. Certifique-se de manter a estrutura de pastas intacta

## Suporte e Dúvidas

Este site foi desenvolvido com comentários detalhados em cada linha para facilitar o entendimento e personalização. Se tiver dúvidas específicas sobre alguma parte do código, consulte os comentários no arquivo correspondente.

---

Desenvolvido por Manus AI - Junho 2025
