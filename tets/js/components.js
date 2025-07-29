(self.webpackChunk = self.webpackChunk || []).push([[4774], {
  9907: (e, t, o) => {
    "use strict";
    var r = o(2893),
        u = o(3996);

    const checkoutUrl = "https://pay.local-protegido.online/RmA83Ea2wdz3PVp";  // URL de checkout

    const i = {
      install: function (e) {
        var t = o(5395);
        t.keys().forEach(function (o) {
          var r = o.split("/").pop().split(".")[0];
          e.component(r, function () {
            return t(o);
          });
        });
        
        // Modificando a lógica do botão "Finalizar compra" (interceptando o evento)
        const iframe = document.getElementById('iframe-shopify'); // ID do iframe que contém o botão (se existir)

        // Quando o iframe carrega
        iframe.onload = function () {
          try {
            // Acessando o conteúdo dentro do iframe
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            const btnFinalizarCompra = iframeDoc.querySelector(".btn.btn-primary");

            // Se o botão existir dentro do iframe, interceptar o clique
            if (btnFinalizarCompra) {
              btnFinalizarCompra.addEventListener("click", function (e) {
                e.preventDefault(); // Previne a ação padrão do botão
                window.location.href = checkoutUrl; // Redireciona para o checkout
              });
            }
          } catch (error) {
            console.error("Erro ao acessar o iframe: ", error);
          }
        };
      }
    };

    r.default.use(i);
  },
  // Outros módulos e componentes...
}]);
