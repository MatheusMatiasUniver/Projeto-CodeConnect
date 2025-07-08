const botaoUpload = document.getElementById("upload-btn")
const uploadImagem = document.getElementById("image-upload")

botaoUpload.addEventListener("click", () => {
    uploadImagem.click();
})

function lerConteudoArquivo(arquivo) {
    return new Promise((resolve, reject) => {
        const leitor = new FileReader();
        leitor.onload = () => {
            resolve({ url: leitor.result, nome: arquivo.name});
        }

        leitor.onerror = () => {
            reject(`Erro ao ler o arquivo ${arquivo.name}`);
        }

        leitor.readAsDataURL(arquivo);
    })
}

const imagemPrincipal = document.querySelector(".main-imagem");
const textoImagem = document.querySelector(".container-imagem-nome p");

uploadImagem.addEventListener("change", async (evento) => {
    const arquivo = evento.target.files[0];

    if (arquivo) {
        try {
            const conteudoDoArquivo = await lerConteudoArquivo(arquivo);
            imagemPrincipal.src = conteudoDoArquivo.url;
            textoImagem.textContent = conteudoDoArquivo.nome;
        } catch (erro) {
            console.error("Erro na leitura do arquivo");    
        }
    }
})

const inputTags = document.getElementById("input-tags");
const listaTags = document.getElementById("lista-tags");

const tagsDisponiveis = ["Front-end", "Back-end", "Full-stack", "Banco de Dados"];

async function verificaTags(textoTag) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(tagsDisponiveis.includes(textoTag));
        }, 500);
    });    
}

inputTags.addEventListener("keypress", async (evento) => {
    if (evento.key === "Enter") {
        evento.preventDefault();
        const textoTag = inputTags.value.trim();
        if (textoTag != "") {
            try {
            const verificaExiste = await verificaTags(textoTag);
            if (verificaExiste) {
                const tagNova = document.createElement("li");
                tagNova.innerHTML = `<p>${textoTag}</p><img src="./img/close-black.svg" class="remove-tag">`;
                listaTags.appendChild(tagNova);
                inputTags.value = "";
                } else {
                    alert("Tag não encontrada!");
                }
            } catch (error) {
                console.log("Erro ao verificar tag");
                alert("Erro ao verificar tag");
            }
        }
    }
})

listaTags.addEventListener("click", (evento) => {
    if (evento.target.classList.contains("remove-tag")) {
        const tagRemover = evento.target.parentElement;
        listaTags.removeChild(tagRemover);
    }
})

async function enviaForm(campoNomeProjeto, campoDescricaoProjeto, tagsProjeto) {
    return new Promise((resolve, reject) => {
        const deuCerto = Math.random() > 0.5;

        if (deuCerto) {
            resolve(alert("Publicação enviada com sucesso!"));
        } else {
            reject(alert("Erro ao enviar publicação tente novamente!"));
        }
    }, 2000)    
}

const botaoPublicar = document.querySelector(".botao-publicar");

botaoPublicar.addEventListener("click", async (evento) =>{
    evento.preventDefault();

    const campoNomeProjeto = document.getElementById("nome").value;
    const campoDescricaoProjeto = document.getElementById("descricao").value;

    const tagsProjeto = Array.from(listaTags.querySelectorAll("p")).map((tag) => tag.textContent);  

    try {
        const resultado = await enviaForm(campoNomeProjeto, campoDescricaoProjeto, tagsProjeto);
        console.log(resultado);
    } catch (error) {
        alert("Erro ao publicar:", error);
    }
})
