# 💕 Nossa História - Dia dos Namorados

Um projeto web interativo estilo stories/reels com player de música no estilo Spotify para homenagear o Dia dos Namorados.

## 📱 Características

- ✨ Design responsivo e mobile-first com tema escuro (azul e roxo)
- 👆 Navegação por swipe (toque esquerda/direita)
- ⌨️ Suporte a navegação por teclado (setas)
- 🎵 Player de música integrado estilo Spotify
- ⏱️ Timeline interativa com progresso da música
- 🎚️ Controle de volume
- 🎯 Indicadores de navegação (dots)
- 💫 Animações suaves e efeitos visuais

## 🚀 Como Usar

### 1. Colocar os arquivos de mídia

Dentro da pasta `assets/`, você precisa adicionar:
- `capa_album.jpeg` - Foto sua com sua amada (será exibida como capa do álbum)
- `musica_tema.mp3` - A música "Gabriel Elias - Pequena Flor | Acústico"

```
juan_e_lari/
├── assets/
│   ├── capa_album.jpeg    ← Coloque a foto aqui
│   └── musica_tema.mp3    ← Coloque a música aqui
```

### 2. Abrir no navegador

Simplesmente abra o arquivo `index.html` em qualquer navegador moderno
   
### 3. Navegação

- **Mobile**: Deslize o dedo para esquerda (próxima story) ou direita (story anterior)
- **Desktop**: Use as setas do teclado ou clique e arraste
- **Dots**: Clique nos pontos abaixo para ir diretamente para uma story
- **Música**: Clique no botão play/pause para controlar a música

### 4. Testar em dispositivo

Para testar em um celular:

```bash
# Via Python
cd /Users/juan/GitHub/juan_e_lari
python3 -m http.server 8000

# Depois acesse no navegador do celular:
# http://[seu-ip-local]:8000
# Exemplo: http://192.168.1.100:8000
```

## 🎨 Primeiro Story - Player de Música

**Título:** "Para o meu grande amor 💙"

Contém:
- Capa do álbum (sua foto)
- Título: "Pequena Flor"
- Artista: "Gabriel Elias | Acústico"
- Player funcional com:
  - ▶️ Botão Play/Pause
  - ⏭️ Botões Previous/Next
  - 📊 Timeline interativa
  - 🎚️ Controle de volume
  - ⏱️ Duração em tempo real

## 💙 Segundo Story - Sobre o Casal

Contém:
- Título: "Sobre o casal"
- Foto do casal em `assets/image2.jpeg`
- Contador vivo desde `08/08/2023 as 00h00m00s`
- Blocos de tempo para:
  - anos, meses e dias
  - horas, minutos e segundos

## 🎵 Música Contínua Entre Stories

- A música não pausa ao trocar de story
- Se estiver tocando, continua ao avançar ou voltar telas
- O estado de play/pause é preservado enquanto você navega

## 📂 Estrutura do Projeto

```
juan_e_lari/
├── index.html          # 4 stories (1ª com player)
├── css/
│   └── style.css       # Estilos e animações
├── js/
│   └── script.js       # Lógica de navegação e player
├── assets/
│   ├── capa_album.jpeg # Sua foto
│   └── musica_tema.mp3 # A música
└── README.md           # Este arquivo
```

## 🎨 Personalização

### Mudar cores
Edite o arquivo `css/style.css` e procure por `.story-1 .story-background` para ajustar as cores dos gradientes.

### Mudar o título
Edite `index.html` e procure por "Para o meu grande amor" para personalizá-lo.

### Mudar música
Coloque um novo arquivo MP3 em `assets/musica_tema.mp3` ou altere o `src` no `index.html`.

## 💡 Próximas Stories (Placeholders)

- Story 3: [Aguardando conteúdo]
- Story 4: [Aguardando conteúdo]

## 🛠️ Tecnologias Usadas

- HTML5
- CSS3 (Flexbox, Animations, Gradients)
- JavaScript Vanilla (sem dependências)
- HTML5 Audio API

## 📝 Notas

- Sem dependências externas - funciona offline (exceto a música)
- Totalmente responsivo para qualquer tamanho de tela
- Otimizado para performance em dispositivos móveis
- Player com controle total sobre a música

## ⚙️ Controles do Player

| Botão | Função |
|-------|--------|
| ▶️ | Play/Pause |
| ⏮️ | Reiniciar música |
| ⏭️ | Pular para o final |
| Timeline | Clique para pular para um momento |
| 🎚️ | Ajustar volume |

---

Feito com ❤️ para o Dia dos Namorados
