   // Dados armazenados em memória
   let motoristas = [];
   let caminhoes = [];
   let entregas = [];
   
   // Funções para abrir as abas
   function openTab(evt, tabName) {
       let i, tabcontent, tablinks;
       
       tabcontent = document.getElementsByClassName("tabcontent");
       for (i = 0; i < tabcontent.length; i++) {
           tabcontent[i].style.display = "none";
       }
       
       tablinks = document.getElementsByClassName("tablinks");
       for (i = 0; i < tablinks.length; i++) {
           tablinks[i].className = tablinks[i].className.replace(" active", "");
       }
       
       document.getElementById(tabName).style.display = "block";
       evt.currentTarget.className += " active";
   }
   
   // Cadastrar Motorista
   function cadastrarMotorista() {
       const nome = document.getElementById('motoristaNome').value;
       const cpf = document.getElementById('motoristaCPF').value;
       const cnh = document.getElementById('motoristaCNH').value;
       
       if (!nome || !cpf || !cnh) {
           document.getElementById('motoristaMsg').innerHTML = '<p style="color: red;">Preencha todos os campos!</p>';
           return;
       }
       
       const motorista = {
           nome: nome,
           cpf: cpf,
           cnh: cnh
       };
       
       motoristas.push(motorista);
       atualizarTabelaMotoristas();
       atualizarSelectMotoristas();
       
       document.getElementById('motoristaNome').value = '';
       document.getElementById('motoristaCPF').value = '';
       document.getElementById('motoristaCNH').value = '';
       document.getElementById('motoristaMsg').innerHTML = '<p style="color: green;">Motorista cadastrado com sucesso!</p>';
   }
   
   // Cadastrar Caminhão
   function cadastrarCaminhao() {
       const placa = document.getElementById('caminhaoPlaca').value;
       const modelo = document.getElementById('caminhaoModelo').value;
       const ano = document.getElementById('caminhaoAno').value;
       const capacidade = document.getElementById('caminhaoCapacidade').value;
       
       if (!placa || !modelo || !ano || !capacidade) {
           document.getElementById('caminhaoMsg').innerHTML = '<p style="color: red;">Preencha todos os campos!</p>';
           return;
       }
       
       const caminhao = {
           placa: placa,
           modelo: modelo,
           ano: ano,
           capacidade: capacidade
       };
       
       caminhoes.push(caminhao);
       atualizarTabelaCaminhoes();
       atualizarSelectCaminhoes();
       
       document.getElementById('caminhaoPlaca').value = '';
       document.getElementById('caminhaoModelo').value = '';
       document.getElementById('caminhaoAno').value = '';
       document.getElementById('caminhaoCapacidade').value = '';
       document.getElementById('caminhaoMsg').innerHTML = '<p style="color: green;">Caminhão cadastrado com sucesso!</p>';
   }
   
   // Registrar Entrega
   function registrarEntrega() {
       const caminhaoPlaca = document.getElementById('entregaCaminhao').value;
       const motoristaCPF = document.getElementById('entregaMotorista').value;
       const separador = document.getElementById('separadorNome').value;
       const carregador = document.getElementById('carregadorNome').value;
       const destino = document.getElementById('entregaDestino').value;
       const produtos = document.getElementById('entregaProdutos').value;
       
       if (!caminhaoPlaca || !motoristaCPF || !separador || !carregador || !destino || !produtos) {
           document.getElementById('entregaMsg').innerHTML = '<p style="color: red;">Preencha todos os campos!</p>';
           return;
       }
       
       // Encontrar motorista e caminhão selecionados
       const motorista = motoristas.find(m => m.cpf === motoristaCPF);
       const caminhao = caminhoes.find(c => c.placa === caminhaoPlaca);
       
       const entrega = {
           id: Date.now(), // ID único baseado no timestamp
           caminhao: caminhao,
           motorista: motorista,
           separador: separador,
           carregador: carregador,
           destino: destino,
           produtos: produtos,
           data: new Date().toLocaleString()
       };
       
       entregas.push(entrega);
       
       document.getElementById('separadorNome').value = '';
       document.getElementById('carregadorNome').value = '';
       document.getElementById('entregaDestino').value = '';
       document.getElementById('entregaProdutos').value = '';
       document.getElementById('entregaMsg').innerHTML = '<p style="color: green;">Entrega registrada com sucesso!</p>';
   }
   
   // Pesquisar Entrega
   function pesquisarEntrega() {
       const caminhaoPlaca = document.getElementById('pesquisaCaminhao').value;
       if (!caminhaoPlaca) {
           alert('Selecione um caminhão para pesquisar!');
           return;
       }
       
       const entregasCaminhao = entregas.filter(e => e.caminhao.placa === caminhaoPlaca);
       
       const resultadoDiv = document.getElementById('resultadoPesquisa');
       resultadoDiv.innerHTML = '';
       
       if (entregasCaminhao.length === 0) {
           resultadoDiv.innerHTML = '<p>Nenhuma entrega encontrada para este caminhão.</p>';
           return;
       }
       
       // Mostrar apenas a entrega mais recente (poderia ser ajustado para mostrar todas)
       const ultimaEntrega = entregasCaminhao[entregasCaminhao.length - 1];
       
       let html = `
           <h3>Última entrega registrada para este caminhão</h3>
           <table>
               <tr>
                   <th>Data/Hora:</th>
                   <td>${ultimaEntrega.data}</td>
               </tr>
               <tr>
                   <th>Caminhão:</th>
                   <td>${ultimaEntrega.caminhao.placa} - ${ultimaEntrega.caminhao.modelo}</td>
               </tr>
               <tr>
                   <th>Motorista:</th>
                   <td>${ultimaEntrega.motorista.nome} (CNH: ${ultimaEntrega.motorista.cnh})</td>
               </tr>
               <tr>
                   <th>Quem separou:</th>
                   <td>${ultimaEntrega.separador}</td>
               </tr>
               <tr>
                   <th>Quem carregou:</th>
                   <td>${ultimaEntrega.carregador}</td>
               </tr>
               <tr>
                   <th>Destino:</th>
                   <td>${ultimaEntrega.destino}</td>
               </tr>
               <tr>
                   <th>Produtos:</th>
                   <td>${ultimaEntrega.produtos}</td>
               </tr>
           </table>
       `;
       
       resultadoDiv.innerHTML = html;
   }
   
   // Atualizar tabelas de visualização
   function atualizarTabelaMotoristas() {
       const tbody = document.querySelector('#tabelaMotoristas tbody');
       tbody.innerHTML = '';
       
       motoristas.forEach(motorista => {
           const tr = document.createElement('tr');
           tr.innerHTML = `
               <td>${motorista.nome}</td>
               <td>${motorista.cpf}</td>
               <td>${motorista.cnh}</td>
           `;
           tbody.appendChild(tr);
       });
   }
   
   function atualizarTabelaCaminhoes() {
       const tbody = document.querySelector('#tabelaCaminhoes tbody');
       tbody.innerHTML = '';
       
       caminhoes.forEach(caminhao => {
           const tr = document.createElement('tr');
           tr.innerHTML = `
               <td>${caminhao.placa}</td>
               <td>${caminhao.modelo}</td>
               <td>${caminhao.ano}</td>
               <td>${caminhao.capacidade} kg</td>
           `;
           tbody.appendChild(tr);
       });
   }
   
   // Atualizar selects (dropdowns)
   function atualizarSelectMotoristas() {
       const select = document.getElementById('entregaMotorista');
       select.innerHTML = '<option value="">Selecione um motorista</option>';
       
       motoristas.forEach(motorista => {
           const option = document.createElement('option');
           option.value = motorista.cpf;
           option.textContent = `${motorista.nome} (${motorista.cnh})`;
           select.appendChild(option);
       });
   }
   
   function atualizarSelectCaminhoes() {
       const selectEntrega = document.getElementById('entregaCaminhao');
       const selectPesquisa = document.getElementById('pesquisaCaminhao');
       
       selectEntrega.innerHTML = '<option value="">Selecione um caminhão</option>';
       selectPesquisa.innerHTML = '<option value="">Selecione um caminhão</option>';
       
       caminhoes.forEach(caminhao => {
           const option1 = document.createElement('option');
           option1.value = caminhao.placa;
           option1.textContent = `${caminhao.placa} - ${caminhao.modelo}`;
           selectEntrega.appendChild(option1);
           
           const option2 = document.createElement('option');
           option2.value = caminhao.placa;
           option2.textContent = `${caminhao.placa} - ${caminhao.modelo}`;
           selectPesquisa.appendChild(option2);
       });
   }
   
   // Inicialização
   document.addEventListener('DOMContentLoaded', function() {
       // Adicionar alguns dados de exemplo
       motoristas = [
           { nome: 'João Silva', cpf: '123.456.789-00', cnh: '123456789' },
           { nome: 'Maria Souza', cpf: '987.654.321-00', cnh: '987654321' }
       ];
       
       caminhoes = [
           { placa: 'ABC-1234', modelo: 'Volvo FH 540', ano: 2020, capacidade: 30000 },
           { placa: 'DEF-5678', modelo: 'Scania R500', ano: 2019, capacidade: 28000 }
       ];
       
       atualizarTabelaMotoristas();
       atualizarTabelaCaminhoes();
       atualizarSelectMotoristas();
       atualizarSelectCaminhoes();
   });