(function(){"use strict";var e={6068:function(e,n,t){var r=t(5130),o=(t(4114),t(6768)),u=t(144);const s={class:"flex justify-center bg-inherit"},c={class:"flex flex-col w-60 gap-2"};var a={__name:"AddForm",emits:["addPerson","jumpscare"],setup(e,{emit:n}){const t=n,a=(0,u.KR)("");function i(){t("addPerson",{name:a.value}),"jelle"===a.value.trim().toLowerCase()&&t("jumpscare"),a.value=""}function l(e){"Enter"===e.code&&i()}return(e,n)=>((0,o.uX)(),(0,o.CE)("div",s,[(0,o.Lk)("div",c,[(0,o.bo)((0,o.Lk)("input",{type:"text","onUpdate:modelValue":n[0]||(n[0]=e=>a.value=e),onKeypress:l,class:"border border-white bg-inherit p-2 rounded-lg text-center focus:outline-none"},null,544),[[r.Jo,a.value]]),(0,o.Lk)("button",{onClick:i,class:"border border-white p-2 rounded-lg"},"Add")])]))}};const i=a;var l=i,f=t(4232);const d={class:"bg-red-800 p-2 rounded-lg w-60 justify-between"};var p={__name:"PersonCard",props:{name:String},emits:["removePerson"],setup(e,{emit:n}){const t=e,r=n;function u(e){r("removePerson",e)}return(e,n)=>{const r=(0,o.g2)("font-awesome-icon");return(0,o.uX)(),(0,o.CE)("section",d,[(0,o.Lk)("p",null,(0,f.v_)(t.name),1),(0,o.Lk)("button",{onClick:u},[(0,o.bF)(r,{icon:["far","trash-can"]})])])}}};const v=p;var m=v;const b={class:"bg-green-950 text-neutral-50 w-screen h-screen p-4 flex flex-col gap-8"},h={class:"flex flex-wrap justify-center gap-2"};var g={__name:"App",setup(e){const n=(0,u.KR)([]);function t(e){s||c(),n.value.push(e)}function r(e){n.value.splice(e,1)}let s;function c(){s=document.querySelector(".c-overlay")}function a(){setTimeout((()=>{s.classList.remove("hidden"),setTimeout((()=>{s.classList.add("hidden")}),200)}),2e3)}return(e,u)=>((0,o.uX)(),(0,o.CE)("div",b,[(0,o.bF)(l,{onAddPerson:t,onJumpscare:a}),u[0]||(u[0]=(0,o.Lk)("div",{class:"c-overlay hidden absolute h-screen w-screen top-0 left-0"},null,-1)),(0,o.Lk)("ul",h,[((0,o.uX)(!0),(0,o.CE)(o.FK,null,(0,o.pI)(n.value,((n,t)=>((0,o.uX)(),(0,o.CE)("li",{key:t},[(0,o.bF)(m,{name:n.name,onRemovePerson:()=>r(t),onSelectPerson:e.selectPerson},null,8,["name","onRemovePerson","onSelectPerson"])])))),128))])]))}};const w=g;var y=w,k=t(8950),x=t(92),j=t(292);k.Yv.add(x.sjs),(0,r.Ef)(y).component("font-awesome-icon",j.gc).mount("#app")}},n={};function t(r){var o=n[r];if(void 0!==o)return o.exports;var u=n[r]={exports:{}};return e[r].call(u.exports,u,u.exports,t),u.exports}t.m=e,function(){var e=[];t.O=function(n,r,o,u){if(!r){var s=1/0;for(l=0;l<e.length;l++){r=e[l][0],o=e[l][1],u=e[l][2];for(var c=!0,a=0;a<r.length;a++)(!1&u||s>=u)&&Object.keys(t.O).every((function(e){return t.O[e](r[a])}))?r.splice(a--,1):(c=!1,u<s&&(s=u));if(c){e.splice(l--,1);var i=o();void 0!==i&&(n=i)}}return n}u=u||0;for(var l=e.length;l>0&&e[l-1][2]>u;l--)e[l]=e[l-1];e[l]=[r,o,u]}}(),function(){t.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return t.d(n,{a:n}),n}}(),function(){t.d=function(e,n){for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})}}(),function(){t.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)}}(),function(){var e={524:0};t.O.j=function(n){return 0===e[n]};var n=function(n,r){var o,u,s=r[0],c=r[1],a=r[2],i=0;if(s.some((function(n){return 0!==e[n]}))){for(o in c)t.o(c,o)&&(t.m[o]=c[o]);if(a)var l=a(t)}for(n&&n(r);i<s.length;i++)u=s[i],t.o(e,u)&&e[u]&&e[u][0](),e[u]=0;return t.O(l)},r=self["webpackChunksecret_santa_generator"]=self["webpackChunksecret_santa_generator"]||[];r.forEach(n.bind(null,0)),r.push=n.bind(null,r.push.bind(r))}();var r=t.O(void 0,[504],(function(){return t(6068)}));r=t.O(r)})();
//# sourceMappingURL=app.489cc8d2.js.map