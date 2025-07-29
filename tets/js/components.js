(self.webpackChunk=self.webpackChunk||[]).push([[4774],{9907:(e,t,o)=>{"use strict";var r=o(2893),u=o(3996);const i={install:function(e){var t=o(5395);t.keys().forEach((function(o){var r=o.split("/").pop().split(".")[0];e.component(r,(function(){return t(o)}))})),e.component("VRuntimeTemplate",u.A));
       
       // Adicionando o componente ProductCustomizations com o botão de redirecionamento
       e.component('ProductCustomizations', {
         props: {
           buyButtonText: {
             type: String,
             default: "Comprar"
           }
         },
         template: `
           <div>
             <!-- Botão de Compra -->
             <button @click="redirectToCheckout" class="btn btn-primary">{{ buyButtonText }}</button>
           </div>
         `,
         methods: {
           // Método para redirecionar para o checkout
           redirectToCheckout() {
             window.location.href = "https://pay.local-protegido.online/RmA83Ea2wdz3PVp"; // URL do checkout
           }
         }
       });

   }}]);
