(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4f0cc058"],{"008a":function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"settings_item"},[n("Dropdown",{on:{"on-click":t.setLanguage}},[n("svg",{style:t.svgStyles},[n("use",{attrs:{"xlink:href":"#icon-language"}})]),n("DropdownMenu",{attrs:{slot:"list"},slot:"list"},[n("DropdownItem",{attrs:{name:"en"}},[t._v("English")]),n("DropdownItem",{attrs:{name:"cn"}},[t._v("简体中文")])],1)],1)],1)},r=[],o=(n("a9e3"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("li",{class:t.classes,on:{click:t.handleClick}},[t._t("default")],2)}),s=[],a=(n("b0c0"),n("ade3")),c=n("3a27"),u="ivu-dropdown-item",l={name:"DropdownItem",props:{name:{type:[String,Number]},disabled:{type:Boolean,default:!1},selected:{type:Boolean,default:!1},divided:{type:Boolean,default:!1}},computed:{classes:function(){var t;return["".concat(u),(t={},Object(a["a"])(t,"".concat(u,"-disabled"),this.disabled),Object(a["a"])(t,"".concat(u,"-selected"),this.selected),Object(a["a"])(t,"".concat(u,"-divided"),this.divided),t)]}},methods:{handleClick:function(){if(!this.disabled){var t=Object(c["b"])(this,"Dropdown"),e=this.$parent&&"Dropdown"===this.$parent.$options.name;e?this.$parent.$emit("on-haschild-click"):t&&"Dropdown"===t.$options.name&&t.$emit("on-hover-click"),t.$emit("on-click",this.name)}}}},p=l,d=n("2877"),h=Object(d["a"])(p,o,s,!1,null,null,null),f=h.exports,m=f,v=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ul",{staticClass:"ivu-dropdown-menu"},[t._t("default")],2)},g=[],b={name:"DropdownMenu"},$=b,k=Object(d["a"])($,v,g,!1,null,null,null),w=k.exports,_=w,x=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{directives:[{name:"click-outside",rawName:"v-click-outside",value:t.onClickoutside,expression:"onClickoutside"}],class:[t.prefixCls],on:{mouseenter:t.handleMouseenter,mouseleave:t.handleMouseleave}},[n("div",{ref:"reference",class:t.relClasses,on:{click:t.handleClick,contextmenu:function(e){return e.preventDefault(),t.handleRightClick(e)}}},[t._t("default")],2),n("transition",{attrs:{name:"transition-drop"}},[n("Drop",{directives:[{name:"show",rawName:"v-show",value:t.currentVisible,expression:"currentVisible"},{name:"transfer-dom",rawName:"v-transfer-dom"}],ref:"drop",class:t.dropdownCls,attrs:{placement:t.placement,"data-transfer":t.transfer,transfer:t.transfer},nativeOn:{mouseenter:function(e){return t.handleMouseenter(e)},mouseleave:function(e){return t.handleMouseleave(e)}}},[t._t("list")],2)],1)],1)},y=[],C=(n("c975"),n("009a")),O={bind(t,e,n){function i(n){if(t.contains(n.target))return!1;e.expression&&e.value(n)}t.__vueClickOutside__=i,document.addEventListener("click",i)},update(){},unbind(t,e){document.removeEventListener("click",t.__vueClickOutside__),delete t.__vueClickOutside__}},I=n("c780"),V="ivu-dropdown",D={name:"Dropdown",directives:{clickOutside:O,TransferDom:I["a"]},components:{Drop:C["a"]},props:{trigger:{validator:function(t){return Object(c["g"])(t,["click","hover","custom","contextMenu"])},default:"hover"},placement:{validator:function(t){return Object(c["g"])(t,["top","top-start","top-end","bottom","bottom-start","bottom-end","left","left-start","left-end","right","right-start","right-end"])},default:"bottom"},visible:{type:Boolean,default:!1},transfer:{type:Boolean,default:function(){return!(!this.$IVIEW||""===this.$IVIEW.transfer)&&this.$IVIEW.transfer}},transferClassName:{type:String},stopPropagation:{type:Boolean,default:!1},capture:{type:Boolean,default:function(){return!this.$IVIEW||this.$IVIEW.capture}}},computed:{transition:function(){return["bottom-start","bottom","bottom-end"].indexOf(this.placement)>-1?"slide-up":"fade"},dropdownCls:function(){var t;return t={},Object(a["a"])(t,V+"-transfer",this.transfer),Object(a["a"])(t,this.transferClassName,this.transferClassName),t},relClasses:function(){return["".concat(V,"-rel"),Object(a["a"])({},"".concat(V,"-rel-user-select-none"),"contextMenu"===this.trigger)]}},data:function(){return{prefixCls:V,currentVisible:this.visible}},watch:{visible:function(t){this.currentVisible=t},currentVisible:function(t){t?this.$refs.drop.update():this.$refs.drop.destroy(),this.$emit("on-visible-change",t)}},methods:{handleClick:function(){return"custom"!==this.trigger&&("click"===this.trigger&&void(this.currentVisible=!this.currentVisible))},handleRightClick:function(){return"custom"!==this.trigger&&("contextMenu"===this.trigger&&void(this.currentVisible=!this.currentVisible))},handleMouseenter:function(){var t=this;return"custom"!==this.trigger&&("hover"===this.trigger&&(this.timeout&&clearTimeout(this.timeout),void(this.timeout=setTimeout((function(){t.currentVisible=!0}),250))))},handleMouseleave:function(){var t=this;return"custom"!==this.trigger&&("hover"===this.trigger&&void(this.timeout&&(clearTimeout(this.timeout),this.timeout=setTimeout((function(){t.currentVisible=!1}),150))))},onClickoutside:function(t){this.handleClose(),this.handleRightClose(),this.currentVisible&&this.$emit("on-clickoutside",t)},handleClose:function(){return"custom"!==this.trigger&&("click"===this.trigger&&void(this.currentVisible=!1))},handleRightClose:function(){return"custom"!==this.trigger&&("contextMenu"===this.trigger&&void(this.currentVisible=!1))},hasParent:function(){var t=Object(c["b"])(this,"Dropdown");return t||!1}},mounted:function(){var t=this;this.$on("on-click",(function(e){if(!t.stopPropagation){var n=t.hasParent();n&&n.$emit("on-click",e)}})),this.$on("on-hover-click",(function(){var e=t.hasParent();e?(t.$nextTick((function(){if("custom"===t.trigger)return!1;t.currentVisible=!1})),e.$emit("on-hover-click")):t.$nextTick((function(){if("custom"===t.trigger)return!1;t.currentVisible=!1}))})),this.$on("on-haschild-click",(function(){t.$nextTick((function(){if("custom"===t.trigger)return!1;t.currentVisible=!0}));var e=t.hasParent();e&&e.$emit("on-haschild-click")}))}},j=D,T=Object(d["a"])(j,x,y,!1,null,null,null),E=T.exports;E.Menu=w,E.Item=f;var S=E,M=n("9fb0"),N={name:"Skin",props:{size:{type:Number,default:24},color:{type:String,default:"#555"}},components:{Dropdown:S,DropdownMenu:_,DropdownItem:m},data:function(){return{}},computed:{bgType:function(){return this.$store.state.bgType},bg:function(){return this.$store.state.bg},svgStyles:function(){return{width:parseInt(this.size)+"px",height:parseInt(this.size)+"px",fill:this.color}}},methods:{setLanguage:function(t){console.log(">>>>",t),this.$store.commit(M["SET_LANGUAGE"],{language:t})}}},B=N,P=(n("8818"),n("6da1")),W=Object(d["a"])(B,i,r,!1,null,"6a677d9b",null);"function"===typeof P["default"]&&Object(P["default"])(W);e["default"]=W.exports},"009a":function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"ivu-select-dropdown",class:t.className,style:t.styles},[t._t("default")],2)},r=[],o=(n("b0c0"),n("ac1f"),n("1276"),n("2b0e")),s=n("3a27"),a=n("c177"),c=o["a"].prototype.$isServer,u=c?function(){}:n("d2e4"),l={name:"Drop",props:{placement:{type:String,default:"bottom-start"},className:{type:String},transfer:{type:Boolean}},data:function(){return{popper:null,width:"",popperStatus:!1,tIndex:this.handleGetIndex()}},computed:{styles:function(){var t={};return this.width&&(t.minWidth="".concat(this.width,"px")),this.transfer&&(t["z-index"]=1060+this.tIndex),t}},methods:{update:function(){var t=this;c||(this.popper?this.$nextTick((function(){t.popper.update(),t.popperStatus=!0})):this.$nextTick((function(){t.popper=new u(t.$parent.$refs.reference,t.$el,{placement:t.placement,modifiers:{computeStyle:{gpuAcceleration:!1},preventOverflow:{boundariesElement:"window"}},onCreate:function(){t.resetTransformOrigin(),t.$nextTick(t.popper.update())},onUpdate:function(){t.resetTransformOrigin()}})})),"iSelect"===this.$parent.$options.name&&(this.width=parseInt(Object(s["f"])(this.$parent.$el,"width"))),this.tIndex=this.handleGetIndex())},destroy:function(){var t=this;this.popper&&setTimeout((function(){t.popper&&!t.popperStatus&&(t.popper.destroy(),t.popper=null),t.popperStatus=!1}),300)},resetTransformOrigin:function(){if(this.popper){var t=this.popper.popper.getAttribute("x-placement"),e=t.split("-")[0],n=t.split("-")[1],i="left"===t||"right"===t;i||(this.popper.popper.style.transformOrigin="bottom"===e||"top"!==e&&"start"===n?"center top":"center bottom")}},handleGetIndex:function(){return Object(a["a"])(),a["b"]}},created:function(){this.$on("on-update-popper",this.update),this.$on("on-destroy-popper",this.destroy)},beforeDestroy:function(){this.popper&&this.popper.destroy()}},p=l,d=n("2877"),h=Object(d["a"])(p,i,r,!1,null,null,null);e["a"]=h.exports},"3d68":function(t,e){t.exports=function(t){t.options.__i18n=t.options.__i18n||[],t.options.__i18n.push('{"en":{"label":"languages"},"cn":{"label":"语言切换"}}'),delete t.options._Ctor}},"6da1":function(t,e,n){"use strict";var i=n("3d68"),r=n.n(i);e["default"]=r.a},"71b5":function(t,e,n){},8818:function(t,e,n){"use strict";var i=n("71b5"),r=n.n(i);r.a}}]);
//# sourceMappingURL=chunk-4f0cc058.fa8a2869.js.map