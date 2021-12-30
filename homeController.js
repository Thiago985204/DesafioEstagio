angular.module("nomeDoModulo", []);
    angular.module("nomeDoModulo").controller("controladorDaPagina", function($scope, $timeout,$http){
        vm = this;
        vm.dados;
        vm.emCurso = 0;
        vm.emSelecao = 0;
        vm.chamando = 0;


        vm.funcaoIniciar = function(){
          vm.urlDesafio('http://191.252.93.122/desafio-front-end/api/index.php')
        }

        setInterval(() => {
            vm.emCurso = 0;
            vm.emSelecao = 0;
            vm.chamando = 0;
           vm.urlDesafio('http://191.252.93.122/desafio-front-end/api/index.php') 
        }, 60000);
        
        vm.urlDesafio = function(urlSelecionada){
            $http({
                method: 'GET',
                url: urlSelecionada
            }).then(function successCallback(response) {
               console.log(response.data)
               vm.dados = response.data;
               vm.dados.forEach(item => {
                   console.log(item.estado)
                   if (item.estado == "chamando" ){
                       item.cor = "progress-bar bg-warning"
                    vm.chamando = vm.chamando+1;
                   }
                   if(item.estado == "em selecao de fluxo"){
                    item.cor = "progress-bar bg-primary"
                      vm.emSelecao = vm.emSelecao+1;
                   }
                   if(item.estado == "em curso"){
                    item.cor = "progress-bar bg-success"
                    vm.emCurso = vm.emCurso+1;

                   }
                   console.log(item.estado)
               });                  
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