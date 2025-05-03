let motoristas = [];
let caminhoes = [];
let entregas = [];


function mostrarTela(id) {
  document.querySelectorAll('.tela').forEach(div => div.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
  atualizarSelects();
}

function cadastrarMotorista() {
  const nome = document.getElementById('nomeMotorista').value;
  const cpf = document.getElementById('cpfMotorista').value;
  const cnh = document.getElementById('cnhMotorista').value;
  motoristas.push({ nome, cpf, cnh });
  document.getElementById('listaMotoristas').innerHTML += `<p>${nome} - ${cpf} - ${cnh}</p>`;
  document.getElementById('nomeMotorista').value = '';
  document.getElementById('cpfMotorista').value = '';
  document.getElementById('cnhMotorista').value = '';
}

function cadastrarCaminhao() {
  const placa = document.getElementById('placaCaminhao').value;
  const modelo = document.getElementById('modeloCaminhao').value;
  const ano = document.getElementById('anoCaminhao').value;
  const capacidade = document.getElementById('capacidadeCaminhao').value;
  caminhoes.push({ placa, modelo, ano, capacidade });
  document.getElementById('listaCaminhoes').innerHTML += `<p>${placa} - ${modelo} - ${ano} - ${capacidade}kg</p>`;
  document.getElementById('placaCaminhao').value = '';
  document.getElementById('modeloCaminhao').value = '';
  document.getElementById('anoCaminhao').value = '';
  document.getElementById('capacidadeCaminhao').value = '';
}

function atualizarSelects() {
  const motoristaSel = document.getElementById('selectMotorista');
  const caminhaoSel = document.getElementById('selectCaminhao');
  const pesquisaSel = document.getElementById('selectPesquisa');
  motoristaSel.innerHTML = motoristas.map(m => `<option>${m.nome}</option>`).join('');
  caminhaoSel.innerHTML = caminhoes.map(c => `<option>${c.placa}</option>`).join('');
  pesquisaSel.innerHTML = caminhoes.map(c => `<option>${c.placa}</option>`).join('');
}

function registrarEntrega() {
  const motorista = document.getElementById('selectMotorista').value;
  const caminhao = document.getElementById('selectCaminhao').value;
  const separador = document.getElementById('nomeSeparador').value;
  const carregador = document.getElementById('nomeCarregador').value;
  const destino = document.getElementById('destinoEntrega').value;
  const produtos = document.getElementById('produtosEntrega').value;
  entregas.push({ motorista, caminhao, separador, carregador, destino, produtos });
  alert('Entrega registrada!');
}

function pesquisarEntrega() {
  const caminhao = document.getElementById('selectPesquisa').value;
  const entrega = entregas.find(e => e.caminhao === caminhao);
  if (entrega) {
    document.getElementById('resultadoEntrega').innerHTML =
      `<p><strong>Motorista:</strong> ${entrega.motorista}</p>
       <p><strong>Separador:</strong> ${entrega.separador}</p>
       <p><strong>Carregador:</strong> ${entrega.carregador}</p>
       <p><strong>Destino:</strong> ${entrega.destino}</p>
       <p><strong>Notas:</strong><br>${entrega.produtos.replace(/\n/g, '<br>')}</p>`;
  } else {
    document.getElementById('resultadoEntrega').innerHTML = '<p>Entrega não encontrada.</p>';
  }
}

function gerarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const text = document.getElementById('resultadoEntrega').innerText;
  doc.text(text, 10, 10);
  doc.save('entrega.pdf');
}