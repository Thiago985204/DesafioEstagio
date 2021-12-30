angular.module("nomeDoModulo", []);
    angular.module("nomeDoModulo").controller("controladorDaPagina", function($scope, $timeout,$http){
        vm = this;
        vm.imagem = "imagens/ideia.png";
        vm.marcas = [];
        vm.nome = "Thiago";
        vm.cor = "{'color':'blue'}";
        vm.exibirNome = false;
        vm.dados;

        vm.funcaoIniciar = function(){
          vm.urlDesafio('http://191.252.93.122/desafio-front-end/api/index.php')
        }
        vm.mostrarTitulo = function(nome){
            if(nome == 'hudson Sena'){ 
                vm.exibirNome = true;
            }
        }

        
       
        
        vm.urlDesafio = function(urlSelecionada){
            $http({
                method: 'GET',
                url: urlSelecionada
            }).then(function successCallback(response) {
               console.log(response.data)
               vm.dados = response.data;                  
            }, function errorCallback(response) {
                if(response.data == undefined){
                    window.scrollTo(0, 0);
                    vm.alert = "Os dados do veículo não foram encontrados!"
                    vm.limparMensagem();
                }
            });
        }
        
        
        vm.acinarAlert = function (mensagem){
            window.scrollTo(0, 0);
            vm.alert = mensagem;
            vm.limparMensagem();
        }

        vm.limparMensagem = function(){
            $timeout(function () {
                vm.alert = undefined;
            }, 3000);
        }
        
        
    });