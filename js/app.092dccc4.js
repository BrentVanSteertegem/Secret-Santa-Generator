(function(){"use strict";var e={3823:function(e,n,t){var o=t(5130),r=(t(4114),t(6768)),u=t(144);const s={class:"flex justify-center bg-inherit"},a={class:"flex flex-col w-60 gap-2"};var c={__name:"AddForm",emits:["addPerson","jumpscare"],setup(e,{emit:n}){const t=n,c=(0,u.KR)("");function i(){t("addPerson",{name:c.value}),"jelle"===c.value.trim().toLowerCase()&&t("jumpscare"),c.value=""}function l(e){"Enter"===e.code&&i()}return(e,n)=>((0,r.uX)(),(0,r.CE)("div",s,[(0,r.Lk)("div",a,[(0,r.bo)((0,r.Lk)("input",{type:"text","onUpdate:modelValue":n[0]||(n[0]=e=>c.value=e),onKeypress:l,class:"border border-white bg-inherit p-2 rounded-lg text-center focus:outline-none"},null,544),[[o.Jo,c.value]]),(0,r.Lk)("button",{onClick:i,class:"border border-white p-2 rounded-lg"},"Add")])]))}};const i=c;var l=i,f=t(4232);const d={class:"bg-red-800 p-2 rounded-lg w-60 justify-between"};var p={__name:"PersonCard",props:{name:String},emits:["removePerson"],setup(e,{emit:n}){const t=e,o=n;function u(e){o("removePerson",e)}return(e,n)=>{const o=(0,r.g2)("font-awesome-icon");return(0,r.uX)(),(0,r.CE)("section",d,[(0,r.Lk)("p",null,(0,f.v_)(t.name),1),(0,r.Lk)("button",{onClick:u},[(0,r.bF)(o,{icon:["far","trash-can"]})])])}}};const v=p;var m=v;const h={class:"bg-green-950 text-neutral-50 w-screen h-screen p-4 flex flex-col gap-8"},b={class:"flex flex-wrap justify-center gap-2"};var g={__name:"App",setup(e){const n=(0,u.KR)([]);function t(e){s||a(),n.value.push(e)}function o(e){n.value.splice(e,1)}let s;function a(){s=document.querySelector(".c-overlay")}function c(){const e=Math.floor(2e3*Math.random())+1e3,n=Math.floor(10*Math.random())+100;setTimeout((()=>{s.classList.remove("hidden"),setTimeout((()=>{s.classList.add("hidden")}),n)}),e)}return(e,u)=>((0,r.uX)(),(0,r.CE)("div",h,[(0,r.bF)(l,{onAddPerson:t,onJumpscare:c}),u[0]||(u[0]=(0,r.Lk)("div",{class:"c-overlay hidden absolute h-screen w-screen top-0 left-0"},null,-1)),(0,r.Lk)("ul",b,[((0,r.uX)(!0),(0,r.CE)(r.FK,null,(0,r.pI)(n.value,((n,t)=>((0,r.uX)(),(0,r.CE)("li",{key:t},[(0,r.bF)(m,{name:n.name,onRemovePerson:()=>o(t),onSelectPerson:e.selectPerson},null,8,["name","onRemovePerson","onSelectPerson"])])))),128))])]))}};const w=g;var y=w,k=t(8950),x=t(92),j=t(292);k.Yv.add(x.sjs),(0,o.Ef)(y).component("font-awesome-icon",j.gc).mount("#app")}},n={};function t(o){var r=n[o];if(void 0!==r)return r.exports;var u=n[o]={exports:{}};return e[o].call(u.exports,u,u.exports,t),u.exports}t.m=e,function(){var e=[];t.O=function(n,o,r,u){if(!o){var s=1/0;for(l=0;l<e.length;l++){o=e[l][0],r=e[l][1],u=e[l][2];for(var a=!0,c=0;c<o.length;c++)(!1&u||s>=u)&&Object.keys(t.O).every((function(e){return t.O[e](o[c])}))?o.splice(c--,1):(a=!1,u<s&&(s=u));if(a){e.splice(l--,1);var i=r();void 0!==i&&(n=i)}}return n}u=u||0;for(var l=e.length;l>0&&e[l-1][2]>u;l--)e[l]=e[l-1];e[l]=[o,r,u]}}(),function(){t.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return t.d(n,{a:n}),n}}(),function(){t.d=function(e,n){for(var o in n)t.o(n,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:n[o]})}}(),function(){t.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)}}(),function(){var e={524:0};t.O.j=function(n){return 0===e[n]};var n=function(n,o){var r,u,s=o[0],a=o[1],c=o[2],i=0;if(s.some((function(n){return 0!==e[n]}))){for(r in a)t.o(a,r)&&(t.m[r]=a[r]);if(c)var l=c(t)}for(n&&n(o);i<s.length;i++)u=s[i],t.o(e,u)&&e[u]&&e[u][0](),e[u]=0;return t.O(l)},o=self["webpackChunksecret_santa_generator"]=self["webpackChunksecret_santa_generator"]||[];o.forEach(n.bind(null,0)),o.push=n.bind(null,o.push.bind(o))}();var o=t.O(void 0,[504],(function(){return t(3823)}));o=t.O(o)})();
//# sourceMappingURL=app.092dccc4.js.map