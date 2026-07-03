// ==UserScript==
// @name         Medical Workspace
// @namespace    medicalworkspace
// @version      1.0.0-alpha
// @description  Medical Workspace for ChatGPT
// @author       Marcelo Monteiro + ChatGPT
// @match        https://chatgpt.com/*
// @match        https://chat.openai.com/*
// @grant        GM_setClipboard
// ==/UserScript==

(function () {

'use strict';

const MW = {

version: "1.0.0-alpha",

config: {},

prompts: {},

ui: {},

clipboard: {},

toolbar: {},

menu: {},

init: {}

};

/* ============================================================
   CONFIGURAÇÃO
============================================================ */

MW.config = {

buttonColor:"#1565C0",

hoverColor:"#0D47A1",

border:"#D0D7DE",

radius:"10px",

fontSize:"13px",

shadow:"0 6px 18px rgba(0,0,0,.12)"

};

/* ============================================================
   PROMPTS
============================================================ */

MW.prompts = {

anamnese:
`Faça uma anamnese completa para prontuário em texto corrido, organizada em HMA, antecedentes relevantes, exame físico, impressão diagnóstica e conduta.`,

exames:
`Recebo exames. Faça um resumo para prontuário, destaque os principais achados e correlacione clinicamente.`,

recado:
`Recebo um recado do paciente. Analise o conteúdo e elabore uma resposta adequada.`,

longitudinal:
`Faça uma análise longitudinal do prontuário identificando evolução clínica, resposta aos tratamentos e padrões clínicos.`,

estudo:
`Faça uma revisão da literatura baseada em evidências sobre o tema apresentado.`

};
  /* ============================================================
   CLIPBOARD
============================================================ */

MW.clipboard.copy = async function(text){

    try{

        await navigator.clipboard.writeText(text);

        return true;

    }catch(e){

        console.error("Medical Workspace:",e);

        return false;

    }

};
  /* ============================================================
   UI
============================================================ */

MW.ui.button=function(label){

    const b=document.createElement("button");

    b.type="button";

    b.textContent=label;

    b.style.border="1px solid "+MW.config.border;

    b.style.background="white";

    b.style.padding="6px 12px";

    b.style.borderRadius=MW.config.radius;

    b.style.cursor="pointer";

    b.style.fontSize=MW.config.fontSize;

    b.style.fontWeight="600";

    b.style.transition="all .15s";

    b.onmouseenter=()=>{

        b.style.background=MW.config.buttonColor;

        b.style.color="white";

    };

    b.onmouseleave=()=>{

        b.style.background="white";

        b.style.color="black";

    };

    return b;

};
  /* ============================================================
   TOOLBAR
============================================================ */

MW.toolbar.build=function(){

    if(document.getElementById("mw-toolbar")) return;

    const form=document.querySelector("form");

    if(!form) return;

    const toolbar=document.createElement("div");

    toolbar.id="mw-toolbar";

    toolbar.style.display="flex";
    toolbar.style.flexWrap="wrap";
    toolbar.style.gap="8px";
    toolbar.style.marginBottom="10px";
    toolbar.style.padding="6px";

    const botoes=[

        {
            titulo:"📝 Anamnese",
            prompt:MW.prompts.anamnese
        },

        {
            titulo:"🧪 Exames",
            prompt:MW.prompts.exames
        },

        {
            titulo:"💬 Recado",
            prompt:MW.prompts.recado
        },

        {
            titulo:"📋 Longitudinal",
            prompt:MW.prompts.longitudinal
        },

        {
            titulo:"📚 Estudo",
            prompt:MW.prompts.estudo
        }

    ];

    botoes.forEach(item=>{

        const botao=MW.ui.button(item.titulo);

        botao.onclick=async()=>{

            const ok=await MW.clipboard.copy(item.prompt);

            if(ok){

                const antigo=botao.textContent;

                botao.textContent="✅ Copiado";

                setTimeout(()=>{

                    botao.textContent=antigo;

                },900);

            }

        };

        toolbar.appendChild(botao);

    });

    form.parentNode.insertBefore(toolbar,form);

};
  /* ============================================================
   INIT
============================================================ */

MW.init.start=function(){

    MW.toolbar.build();

};

new MutationObserver(()=>{

    MW.init.start();

}).observe(document.body,{

    childList:true,

    subtree:true

});

MW.init.start();

})();
