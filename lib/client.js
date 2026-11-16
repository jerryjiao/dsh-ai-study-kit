window.__ModuleLoader__.load({
  id: "dsh-ai-study-kit",
  factory: (require) => {
    var module = { exports: {} }; var exports = module.exports;
var Gl=Object.create;var lr=Object.defineProperty;var zl=Object.getOwnPropertyDescriptor;var Vl=Object.getOwnPropertyNames;var jl=Object.getPrototypeOf,Xl=Object.prototype.hasOwnProperty;var $l=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(a){throw t=0,a}},Kl=(e,t)=>{for(var a in t)lr(e,a,{get:t[a],enumerable:!0})},Jo=(e,t,a,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of Vl(t))!Xl.call(e,o)&&o!==a&&lr(e,o,{get:()=>t[o],enumerable:!(r=zl(t,o))||r.enumerable});return e};var ur=(e,t,a)=>(a=e!=null?Gl(jl(e)):{},Jo(t||!e||!e.__esModule?lr(a,"default",{value:e,enumerable:!0}):a,e)),Ql=e=>Jo(lr({},"__esModule",{value:!0}),e);var El=$l((my,Ml)=>{var Al=`
  /* 3D \u6309\u538B\u6309\u94AE\u7684\u6309\u538B\u6001\uFF08\u539F\u578B .btn3d:active\uFF09\uFF1A\u4E0B\u6C89 4px + \u9634\u5F71\u6536\u6210 1px\u3002
     !important \u662F\u6709\u610F\u7684\u2014\u2014\u6309\u538B\u6001\u5FC5\u987B\u538B\u8FC7 shadow-btn-* \u5DE5\u5177\u7C7B\uFF08\u540C\u4E3A box-shadow\uFF0C
     \u6587\u6863\u987A\u5E8F\u4E0D\u53EF\u63A7\uFF09\uFF0C\u4E14 :not(:disabled) \u4FDD\u8BC1\u7981\u7528\u6001\u4E0D\u4E0B\u6C89\u3002 */
  .btn3d:active:not(:disabled) {
    transform: translateY(4px);
    box-shadow: 0 1px 0 rgb(0 0 0 / 0.25) !important;
  }

  /* \u7B54\u5BF9\u7EFF\u52FE\u63CF\u8FB9\u52A8\u6548\uFF08v0.25 \u7968\u2462\uFF0Cspec #110\uFF09\uFF1A\u52FE\u56FE\u6807\u7684 SVG \u63CF\u8FB9"\u753B\u51FA"\u3002
     \u6302\u5728\u52FE\u56FE\u6807\u7684\u5916\u5C42\u5BB9\u5668\u4E0A\uFF0C\u4F5C\u7528\u4E8E\u5185\u90E8 lucide <svg><path>\uFF08stroke \u8DEF\u5F84\u603B\u957F\u7EA6 25\uFF0C
     dasharray \u53D6 30 \u8986\u76D6\uFF09\uFF1B\u914D\u5408 tailwind \u7684 animate-check-pop \u5BB9\u5668\u56DE\u5F39\u4E00\u8D77\u7528\u3002
     \u4EC5\u5728"\u672C\u6B21\u63D0\u4EA4\u89E6\u53D1"\u7684\u63ED\u6653\u4E0A\u6302\uFF08OptionList \u7684 justRevealed\uFF09\uFF0C\u56DE\u770B\u5DF2\u63ED\u6653\u5361\u4E0D\u91CD\u64AD\u3002
     reduced-motion \u4E0B\u88AB\u4E0A\u65B9\u5168\u5C40\u89C4\u5219\u964D\u7EA7\u4E3A\u77AC\u65F6\u5B8C\u6210\u3002 */
  .draw-check svg path {
    stroke-dasharray: 30;
    stroke-dashoffset: 30;
    animation: draw-check-stroke 0.35s ease-out forwards;
  }
  @keyframes draw-check-stroke {
    to {
      stroke-dashoffset: 0;
    }
  }
.dsh-study-root .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
}
.dsh-study-root .pointer-events-none {
    pointer-events: none;
}
.dsh-study-root .fixed {
    position: fixed;
}
.dsh-study-root .absolute {
    position: absolute;
}
.dsh-study-root .relative {
    position: relative;
}
.dsh-study-root .sticky {
    position: sticky;
}
.dsh-study-root .inset-0 {
    inset: 0px;
}
.dsh-study-root .-bottom-2\\.5 {
    bottom: -0.625rem;
}
.dsh-study-root .left-1\\.5 {
    left: 0.375rem;
}
.dsh-study-root .left-\\[16px\\] {
    left: 16px;
}
.dsh-study-root .left-\\[24px\\] {
    left: 24px;
}
.dsh-study-root .left-\\[2px\\] {
    left: 2px;
}
.dsh-study-root .right-0 {
    right: 0px;
}
.dsh-study-root .right-\\[24px\\] {
    right: 24px;
}
.dsh-study-root .top-0 {
    top: 0px;
}
.dsh-study-root .top-2 {
    top: 0.5rem;
}
.dsh-study-root .top-\\[20px\\] {
    top: 20px;
}
.dsh-study-root .top-\\[2px\\] {
    top: 2px;
}
.dsh-study-root .top-\\[54px\\] {
    top: 54px;
}
.dsh-study-root .top-\\[calc\\(100\\%\\+6px\\)\\] {
    top: calc(100% + 6px);
}
.dsh-study-root .z-10 {
    z-index: 10;
}
.dsh-study-root .z-20 {
    z-index: 20;
}
.dsh-study-root .z-30 {
    z-index: 30;
}
.dsh-study-root .z-40 {
    z-index: 40;
}
.dsh-study-root .z-50 {
    z-index: 50;
}
.dsh-study-root .z-\\[1\\] {
    z-index: 1;
}
.dsh-study-root .m-auto {
    margin: auto;
}
.dsh-study-root .mx-3\\.5 {
    margin-left: 0.875rem;
    margin-right: 0.875rem;
}
.dsh-study-root .mx-5 {
    margin-left: 1.25rem;
    margin-right: 1.25rem;
}
.dsh-study-root .mx-auto {
    margin-left: auto;
    margin-right: auto;
}
.dsh-study-root .my-4 {
    margin-top: 1rem;
    margin-bottom: 1rem;
}
.dsh-study-root .-mt-1 {
    margin-top: -0.25rem;
}
.dsh-study-root .-mt-2 {
    margin-top: -0.5rem;
}
.dsh-study-root .-mt-3 {
    margin-top: -0.75rem;
}
.dsh-study-root .mb-1 {
    margin-bottom: 0.25rem;
}
.dsh-study-root .mb-1\\.5 {
    margin-bottom: 0.375rem;
}
.dsh-study-root .mb-2 {
    margin-bottom: 0.5rem;
}
.dsh-study-root .mb-2\\.5 {
    margin-bottom: 0.625rem;
}
.dsh-study-root .mb-3 {
    margin-bottom: 0.75rem;
}
.dsh-study-root .mb-3\\.5 {
    margin-bottom: 0.875rem;
}
.dsh-study-root .mb-4 {
    margin-bottom: 1rem;
}
.dsh-study-root .mb-5 {
    margin-bottom: 1.25rem;
}
.dsh-study-root .ml-0\\.5 {
    margin-left: 0.125rem;
}
.dsh-study-root .ml-1 {
    margin-left: 0.25rem;
}
.dsh-study-root .ml-2 {
    margin-left: 0.5rem;
}
.dsh-study-root .ml-auto {
    margin-left: auto;
}
.dsh-study-root .mr-auto {
    margin-right: auto;
}
.dsh-study-root .mt-0\\.5 {
    margin-top: 0.125rem;
}
.dsh-study-root .mt-1 {
    margin-top: 0.25rem;
}
.dsh-study-root .mt-1\\.5 {
    margin-top: 0.375rem;
}
.dsh-study-root .mt-2 {
    margin-top: 0.5rem;
}
.dsh-study-root .mt-2\\.5 {
    margin-top: 0.625rem;
}
.dsh-study-root .mt-3 {
    margin-top: 0.75rem;
}
.dsh-study-root .mt-3\\.5 {
    margin-top: 0.875rem;
}
.dsh-study-root .mt-4 {
    margin-top: 1rem;
}
.dsh-study-root .mt-5 {
    margin-top: 1.25rem;
}
.dsh-study-root .mt-\\[2px\\] {
    margin-top: 2px;
}
.dsh-study-root .mt-px {
    margin-top: 1px;
}
.dsh-study-root .block {
    display: block;
}
.dsh-study-root .inline-block {
    display: inline-block;
}
.dsh-study-root .flex {
    display: flex;
}
.dsh-study-root .inline-flex {
    display: inline-flex;
}
.dsh-study-root .grid {
    display: grid;
}
.dsh-study-root .inline-grid {
    display: inline-grid;
}
.dsh-study-root .hidden {
    display: none;
}
.dsh-study-root .h-11 {
    height: 2.75rem;
}
.dsh-study-root .h-14 {
    height: 3.5rem;
}
.dsh-study-root .h-16 {
    height: 4rem;
}
.dsh-study-root .h-2 {
    height: 0.5rem;
}
.dsh-study-root .h-2\\.5 {
    height: 0.625rem;
}
.dsh-study-root .h-3 {
    height: 0.75rem;
}
.dsh-study-root .h-3\\.5 {
    height: 0.875rem;
}
.dsh-study-root .h-4 {
    height: 1rem;
}
.dsh-study-root .h-5 {
    height: 1.25rem;
}
.dsh-study-root .h-6 {
    height: 1.5rem;
}
.dsh-study-root .h-7 {
    height: 1.75rem;
}
.dsh-study-root .h-8 {
    height: 2rem;
}
.dsh-study-root .h-9 {
    height: 2.25rem;
}
.dsh-study-root .h-\\[13px\\] {
    height: 13px;
}
.dsh-study-root .h-\\[14px\\] {
    height: 14px;
}
.dsh-study-root .h-\\[18px\\] {
    height: 18px;
}
.dsh-study-root .h-\\[21px\\] {
    height: 21px;
}
.dsh-study-root .h-\\[26px\\] {
    height: 26px;
}
.dsh-study-root .h-\\[30px\\] {
    height: 30px;
}
.dsh-study-root .h-\\[46px\\] {
    height: 46px;
}
.dsh-study-root .h-\\[54px\\] {
    height: 54px;
}
.dsh-study-root .h-\\[5px\\] {
    height: 5px;
}
.dsh-study-root .h-\\[calc\\(100vh-54px\\)\\] {
    height: calc(100vh - 54px);
}
.dsh-study-root .h-full {
    height: 100%;
}
.dsh-study-root .max-h-\\[60vh\\] {
    max-height: 60vh;
}
.dsh-study-root .max-h-\\[85vh\\] {
    max-height: 85vh;
}
.dsh-study-root .max-h-\\[90vh\\] {
    max-height: 90vh;
}
.dsh-study-root .min-h-0 {
    min-height: 0px;
}
.dsh-study-root .min-h-\\[40vh\\] {
    min-height: 40vh;
}
.dsh-study-root .min-h-full {
    min-height: 100%;
}
.dsh-study-root .w-11 {
    width: 2.75rem;
}
.dsh-study-root .w-14 {
    width: 3.5rem;
}
.dsh-study-root .w-16 {
    width: 4rem;
}
.dsh-study-root .w-2\\.5 {
    width: 0.625rem;
}
.dsh-study-root .w-3 {
    width: 0.75rem;
}
.dsh-study-root .w-3\\.5 {
    width: 0.875rem;
}
.dsh-study-root .w-4 {
    width: 1rem;
}
.dsh-study-root .w-5 {
    width: 1.25rem;
}
.dsh-study-root .w-6 {
    width: 1.5rem;
}
.dsh-study-root .w-60 {
    width: 15rem;
}
.dsh-study-root .w-7 {
    width: 1.75rem;
}
.dsh-study-root .w-8 {
    width: 2rem;
}
.dsh-study-root .w-\\[13px\\] {
    width: 13px;
}
.dsh-study-root .w-\\[14px\\] {
    width: 14px;
}
.dsh-study-root .w-\\[18px\\] {
    width: 18px;
}
.dsh-study-root .w-\\[19rem\\] {
    width: 19rem;
}
.dsh-study-root .w-\\[21px\\] {
    width: 21px;
}
.dsh-study-root .w-\\[26px\\] {
    width: 26px;
}
.dsh-study-root .w-\\[30px\\] {
    width: 30px;
}
.dsh-study-root .w-\\[32px\\] {
    width: 32px;
}
.dsh-study-root .w-\\[3px\\] {
    width: 3px;
}
.dsh-study-root .w-\\[44px\\] {
    width: 44px;
}
.dsh-study-root .w-\\[46px\\] {
    width: 46px;
}
.dsh-study-root .w-\\[52px\\] {
    width: 52px;
}
.dsh-study-root .w-full {
    width: 100%;
}
.dsh-study-root .w-max {
    width: -moz-max-content;
    width: max-content;
}
.dsh-study-root .min-w-0 {
    min-width: 0px;
}
.dsh-study-root .min-w-\\[1\\.25rem\\] {
    min-width: 1.25rem;
}
.dsh-study-root .min-w-\\[230px\\] {
    min-width: 230px;
}
.dsh-study-root .min-w-\\[6px\\] {
    min-width: 6px;
}
.dsh-study-root .max-w-2xl {
    max-width: 42rem;
}
.dsh-study-root .max-w-3xl {
    max-width: 48rem;
}
.dsh-study-root .max-w-4xl {
    max-width: 56rem;
}
.dsh-study-root .max-w-\\[12rem\\] {
    max-width: 12rem;
}
.dsh-study-root .max-w-\\[15rem\\] {
    max-width: 15rem;
}
.dsh-study-root .max-w-\\[62px\\] {
    max-width: 62px;
}
.dsh-study-root .max-w-full {
    max-width: 100%;
}
.dsh-study-root .max-w-lg {
    max-width: 32rem;
}
.dsh-study-root .max-w-md {
    max-width: 28rem;
}
.dsh-study-root .max-w-sm {
    max-width: 24rem;
}
.dsh-study-root .max-w-xs {
    max-width: 20rem;
}
.dsh-study-root .flex-1 {
    flex: 1 1 0%;
}
.dsh-study-root .shrink-0 {
    flex-shrink: 0;
}
.dsh-study-root .translate-x-\\[20px\\] {
    --tw-translate-x: 20px;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.dsh-study-root .translate-x-\\[3px\\] {
    --tw-translate-x: 3px;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.dsh-study-root .rotate-180 {
    --tw-rotate: 180deg;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.dsh-study-root .rotate-90 {
    --tw-rotate: 90deg;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
@keyframes card-next {
    0% {
        opacity: 0;
        transform: translateX(12px);
    }
    100% {
        opacity: 1;
        transform: none;
    }
}
.dsh-study-root .animate-card-next {
    animation: card-next .22s ease-out;
}
@keyframes check-pop {
    0% {
        transform: scale(.5);
    }
    70% {
        transform: scale(1.25);
    }
    100% {
        transform: scale(1);
    }
}
.dsh-study-root .animate-check-pop {
    animation: check-pop .3s ease-out;
}
@keyframes fade-in {
    0% {
        opacity: 0;
        transform: translateY(4px);
    }
    100% {
        opacity: 1;
        transform: none;
    }
}
.dsh-study-root .animate-fade-in {
    animation: fade-in .2s ease-out;
}
@keyframes flip-in {
    0% {
        opacity: 0;
        transform: translateY(8px) scale(.98);
    }
    60% {
        opacity: 1;
    }
    100% {
        opacity: 1;
        transform: none;
    }
}
.dsh-study-root .animate-flip-in {
    animation: flip-in .25s ease-out;
}
@keyframes scale-in {
    0% {
        opacity: 0;
        transform: scale(.96);
    }
    100% {
        opacity: 1;
        transform: none;
    }
}
.dsh-study-root .animate-scale-in {
    animation: scale-in .15s ease-out;
}
@keyframes shake {
    0%, 100% {
        transform: translateX(0);
    }
    20% {
        transform: translateX(-6px);
    }
    40% {
        transform: translateX(6px);
    }
    60% {
        transform: translateX(-4px);
    }
    80% {
        transform: translateX(4px);
    }
}
.dsh-study-root .animate-shake {
    animation: shake .4s ease-in-out;
}
@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
.dsh-study-root .animate-spin {
    animation: spin 1s linear infinite;
}
.dsh-study-root .cursor-default {
    cursor: default;
}
.dsh-study-root .cursor-pointer {
    cursor: pointer;
}
.dsh-study-root .select-none {
    -webkit-user-select: none;
       -moz-user-select: none;
            user-select: none;
}
.dsh-study-root .resize {
    resize: both;
}
.dsh-study-root .appearance-none {
    -webkit-appearance: none;
       -moz-appearance: none;
            appearance: none;
}
.dsh-study-root .grid-cols-1 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
}
.dsh-study-root .grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
}
.dsh-study-root .grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
}
.dsh-study-root .flex-col {
    flex-direction: column;
}
.dsh-study-root .flex-wrap {
    flex-wrap: wrap;
}
.dsh-study-root .place-items-center {
    place-items: center;
}
.dsh-study-root .items-end {
    align-items: flex-end;
}
.dsh-study-root .items-center {
    align-items: center;
}
.dsh-study-root .items-baseline {
    align-items: baseline;
}
.dsh-study-root .justify-end {
    justify-content: flex-end;
}
.dsh-study-root .justify-center {
    justify-content: center;
}
.dsh-study-root .justify-between {
    justify-content: space-between;
}
.dsh-study-root .gap-0\\.5 {
    gap: 0.125rem;
}
.dsh-study-root .gap-1 {
    gap: 0.25rem;
}
.dsh-study-root .gap-1\\.5 {
    gap: 0.375rem;
}
.dsh-study-root .gap-2 {
    gap: 0.5rem;
}
.dsh-study-root .gap-2\\.5 {
    gap: 0.625rem;
}
.dsh-study-root .gap-3 {
    gap: 0.75rem;
}
.dsh-study-root .gap-3\\.5 {
    gap: 0.875rem;
}
.dsh-study-root .gap-4 {
    gap: 1rem;
}
.dsh-study-root .gap-6 {
    gap: 1.5rem;
}
.dsh-study-root .gap-\\[18px\\] {
    gap: 18px;
}
.dsh-study-root .gap-x-2 {
    -moz-column-gap: 0.5rem;
         column-gap: 0.5rem;
}
.dsh-study-root .gap-x-2\\.5 {
    -moz-column-gap: 0.625rem;
         column-gap: 0.625rem;
}
.dsh-study-root .gap-x-3 {
    -moz-column-gap: 0.75rem;
         column-gap: 0.75rem;
}
.dsh-study-root .gap-x-4 {
    -moz-column-gap: 1rem;
         column-gap: 1rem;
}
.dsh-study-root .gap-y-1 {
    row-gap: 0.25rem;
}
.dsh-study-root .gap-y-1\\.5 {
    row-gap: 0.375rem;
}
.dsh-study-root .gap-y-2\\.5 {
    row-gap: 0.625rem;
}
.dsh-study-root :is(.space-y-1 > :not([hidden]) ~ :not([hidden])) {
    --tw-space-y-reverse: 0;
    margin-top: calc(0.25rem * calc(1 - var(--tw-space-y-reverse)));
    margin-bottom: calc(0.25rem * var(--tw-space-y-reverse));
}
.dsh-study-root :is(.space-y-1\\.5 > :not([hidden]) ~ :not([hidden])) {
    --tw-space-y-reverse: 0;
    margin-top: calc(0.375rem * calc(1 - var(--tw-space-y-reverse)));
    margin-bottom: calc(0.375rem * var(--tw-space-y-reverse));
}
.dsh-study-root :is(.space-y-2 > :not([hidden]) ~ :not([hidden])) {
    --tw-space-y-reverse: 0;
    margin-top: calc(0.5rem * calc(1 - var(--tw-space-y-reverse)));
    margin-bottom: calc(0.5rem * var(--tw-space-y-reverse));
}
.dsh-study-root :is(.space-y-2\\.5 > :not([hidden]) ~ :not([hidden])) {
    --tw-space-y-reverse: 0;
    margin-top: calc(0.625rem * calc(1 - var(--tw-space-y-reverse)));
    margin-bottom: calc(0.625rem * var(--tw-space-y-reverse));
}
.dsh-study-root :is(.space-y-3 > :not([hidden]) ~ :not([hidden])) {
    --tw-space-y-reverse: 0;
    margin-top: calc(0.75rem * calc(1 - var(--tw-space-y-reverse)));
    margin-bottom: calc(0.75rem * var(--tw-space-y-reverse));
}
.dsh-study-root :is(.space-y-3\\.5 > :not([hidden]) ~ :not([hidden])) {
    --tw-space-y-reverse: 0;
    margin-top: calc(0.875rem * calc(1 - var(--tw-space-y-reverse)));
    margin-bottom: calc(0.875rem * var(--tw-space-y-reverse));
}
.dsh-study-root :is(.space-y-4 > :not([hidden]) ~ :not([hidden])) {
    --tw-space-y-reverse: 0;
    margin-top: calc(1rem * calc(1 - var(--tw-space-y-reverse)));
    margin-bottom: calc(1rem * var(--tw-space-y-reverse));
}
.dsh-study-root :is(.space-y-7 > :not([hidden]) ~ :not([hidden])) {
    --tw-space-y-reverse: 0;
    margin-top: calc(1.75rem * calc(1 - var(--tw-space-y-reverse)));
    margin-bottom: calc(1.75rem * var(--tw-space-y-reverse));
}
.dsh-study-root :is(.divide-y > :not([hidden]) ~ :not([hidden])) {
    --tw-divide-y-reverse: 0;
    border-top-width: calc(1px * calc(1 - var(--tw-divide-y-reverse)));
    border-bottom-width: calc(1px * var(--tw-divide-y-reverse));
}
.dsh-study-root :is(.divide-border > :not([hidden]) ~ :not([hidden])) {
    --tw-divide-opacity: 1;
    border-color: rgb(var(--color-border) / var(--tw-divide-opacity, 1));
}
.dsh-study-root .self-center {
    align-self: center;
}
.dsh-study-root .overflow-auto {
    overflow: auto;
}
.dsh-study-root .overflow-hidden {
    overflow: hidden;
}
.dsh-study-root .overflow-x-auto {
    overflow-x: auto;
}
.dsh-study-root .overflow-y-auto {
    overflow-y: auto;
}
.dsh-study-root .truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.dsh-study-root .whitespace-nowrap {
    white-space: nowrap;
}
.dsh-study-root .whitespace-pre-line {
    white-space: pre-line;
}
.dsh-study-root .whitespace-pre-wrap {
    white-space: pre-wrap;
}
.dsh-study-root .break-words {
    overflow-wrap: break-word;
}
.dsh-study-root .break-all {
    word-break: break-all;
}
.dsh-study-root .rounded {
    border-radius: 0.25rem;
}
.dsh-study-root .rounded-2xl {
    border-radius: 1rem;
}
.dsh-study-root .rounded-\\[10px\\] {
    border-radius: 10px;
}
.dsh-study-root .rounded-\\[14px\\] {
    border-radius: 14px;
}
.dsh-study-root .rounded-\\[3px\\] {
    border-radius: 3px;
}
.dsh-study-root .rounded-full {
    border-radius: 9999px;
}
.dsh-study-root .rounded-lg {
    border-radius: 0.5rem;
}
.dsh-study-root .rounded-md {
    border-radius: 0.375rem;
}
.dsh-study-root .rounded-xl {
    border-radius: 0.75rem;
}
.dsh-study-root .rounded-t-2xl {
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
}
.dsh-study-root .rounded-t-3xl {
    border-top-left-radius: 1.5rem;
    border-top-right-radius: 1.5rem;
}
.dsh-study-root .border {
    border-width: 1px;
}
.dsh-study-root .border-0 {
    border-width: 0px;
}
.dsh-study-root .border-2 {
    border-width: 2px;
}
.dsh-study-root .border-\\[2\\.5px\\] {
    border-width: 2.5px;
}
.dsh-study-root .border-\\[3px\\] {
    border-width: 3px;
}
.dsh-study-root .border-b {
    border-bottom-width: 1px;
}
.dsh-study-root .border-b-2 {
    border-bottom-width: 2px;
}
.dsh-study-root .border-r-2 {
    border-right-width: 2px;
}
.dsh-study-root .border-t-2 {
    border-top-width: 2px;
}
.dsh-study-root .border-dashed {
    border-style: dashed;
}
.dsh-study-root .border-border {
    --tw-border-opacity: 1;
    border-color: rgb(var(--color-border) / var(--tw-border-opacity, 1));
}
.dsh-study-root .border-border-strong {
    --tw-border-opacity: 1;
    border-color: rgb(var(--color-border-strong) / var(--tw-border-opacity, 1));
}
.dsh-study-root .border-st-blue {
    --tw-border-opacity: 1;
    border-color: rgb(var(--st-blue) / var(--tw-border-opacity, 1));
}
.dsh-study-root .border-st-blue\\/40 {
    border-color: rgb(var(--st-blue) / 0.4);
}
.dsh-study-root .border-st-gold-border {
    --tw-border-opacity: 1;
    border-color: rgb(var(--st-gold-border) / var(--tw-border-opacity, 1));
}
.dsh-study-root .border-st-gold-border\\/60 {
    border-color: rgb(var(--st-gold-border) / 0.6);
}
.dsh-study-root .border-st-green {
    --tw-border-opacity: 1;
    border-color: rgb(var(--st-green) / var(--tw-border-opacity, 1));
}
.dsh-study-root .border-st-green-dark {
    --tw-border-opacity: 1;
    border-color: rgb(var(--st-green-dark) / var(--tw-border-opacity, 1));
}
.dsh-study-root .border-st-green\\/30 {
    border-color: rgb(var(--st-green) / 0.3);
}
.dsh-study-root .border-st-green\\/40 {
    border-color: rgb(var(--st-green) / 0.4);
}
.dsh-study-root .border-st-green\\/50 {
    border-color: rgb(var(--st-green) / 0.5);
}
.dsh-study-root .border-st-red {
    --tw-border-opacity: 1;
    border-color: rgb(var(--st-red) / var(--tw-border-opacity, 1));
}
.dsh-study-root .border-st-red-border {
    --tw-border-opacity: 1;
    border-color: rgb(var(--st-red-border) / var(--tw-border-opacity, 1));
}
.dsh-study-root .border-st-red-dark {
    --tw-border-opacity: 1;
    border-color: rgb(var(--st-red-dark) / var(--tw-border-opacity, 1));
}
.dsh-study-root .border-text-faint {
    --tw-border-opacity: 1;
    border-color: rgb(var(--color-text-faint) / var(--tw-border-opacity, 1));
}
.dsh-study-root .border-t-st-green {
    --tw-border-opacity: 1;
    border-top-color: rgb(var(--st-green) / var(--tw-border-opacity, 1));
}
.dsh-study-root .bg-amber-100 {
    --tw-bg-opacity: 1;
    background-color: rgb(254 243 199 / var(--tw-bg-opacity, 1));
}
.dsh-study-root .bg-amber-50 {
    --tw-bg-opacity: 1;
    background-color: rgb(255 251 235 / var(--tw-bg-opacity, 1));
}
.dsh-study-root .bg-amber-500 {
    --tw-bg-opacity: 1;
    background-color: rgb(245 158 11 / var(--tw-bg-opacity, 1));
}
.dsh-study-root .bg-bg-app {
    --tw-bg-opacity: 1;
    background-color: rgb(var(--color-bg-app) / var(--tw-bg-opacity, 1));
}
.dsh-study-root .bg-bg-hover {
    --tw-bg-opacity: 1;
    background-color: rgb(var(--color-bg-hover) / var(--tw-bg-opacity, 1));
}
.dsh-study-root .bg-bg-subtle {
    --tw-bg-opacity: 1;
    background-color: rgb(var(--color-bg-subtle) / var(--tw-bg-opacity, 1));
}
.dsh-study-root .bg-bg-subtle\\/50 {
    background-color: rgb(var(--color-bg-subtle) / 0.5);
}
.dsh-study-root .bg-bg-subtle\\/60 {
    background-color: rgb(var(--color-bg-subtle) / 0.6);
}
.dsh-study-root .bg-bg-surface {
    --tw-bg-opacity: 1;
    background-color: rgb(var(--color-bg-surface) / var(--tw-bg-opacity, 1));
}
.dsh-study-root .bg-black\\/20 {
    background-color: rgb(0 0 0 / 0.2);
}
.dsh-study-root .bg-black\\/30 {
    background-color: rgb(0 0 0 / 0.3);
}
.dsh-study-root .bg-black\\/40 {
    background-color: rgb(0 0 0 / 0.4);
}
.dsh-study-root .bg-border {
    --tw-bg-opacity: 1;
    background-color: rgb(var(--color-border) / var(--tw-bg-opacity, 1));
}
.dsh-study-root .bg-red-600 {
    --tw-bg-opacity: 1;
    background-color: rgb(220 38 38 / var(--tw-bg-opacity, 1));
}
.dsh-study-root .bg-sky-50 {
    --tw-bg-opacity: 1;
    background-color: rgb(240 249 255 / var(--tw-bg-opacity, 1));
}
.dsh-study-root .bg-sky-600 {
    --tw-bg-opacity: 1;
    background-color: rgb(2 132 199 / var(--tw-bg-opacity, 1));
}
.dsh-study-root .bg-slate-800 {
    --tw-bg-opacity: 1;
    background-color: rgb(30 41 59 / var(--tw-bg-opacity, 1));
}
.dsh-study-root .bg-st-blue {
    --tw-bg-opacity: 1;
    background-color: rgb(var(--st-blue) / var(--tw-bg-opacity, 1));
}
.dsh-study-root .bg-st-blue-soft {
    --tw-bg-opacity: 1;
    background-color: rgb(var(--st-blue-soft) / var(--tw-bg-opacity, 1));
}
.dsh-study-root .bg-st-gold {
    --tw-bg-opacity: 1;
    background-color: rgb(var(--st-gold) / var(--tw-bg-opacity, 1));
}
.dsh-study-root .bg-st-gold-soft {
    --tw-bg-opacity: 1;
    background-color: rgb(var(--st-gold-soft) / var(--tw-bg-opacity, 1));
}
.dsh-study-root .bg-st-gold-soft\\/70 {
    background-color: rgb(var(--st-gold-soft) / 0.7);
}
.dsh-study-root .bg-st-green {
    --tw-bg-opacity: 1;
    background-color: rgb(var(--st-green) / var(--tw-bg-opacity, 1));
}
.dsh-study-root .bg-st-green-soft {
    --tw-bg-opacity: 1;
    background-color: rgb(var(--st-green-soft) / var(--tw-bg-opacity, 1));
}
.dsh-study-root .bg-st-green-soft\\/70 {
    background-color: rgb(var(--st-green-soft) / 0.7);
}
.dsh-study-root .bg-st-red {
    --tw-bg-opacity: 1;
    background-color: rgb(var(--st-red) / var(--tw-bg-opacity, 1));
}
.dsh-study-root .bg-st-red-soft {
    --tw-bg-opacity: 1;
    background-color: rgb(var(--st-red-soft) / var(--tw-bg-opacity, 1));
}
.dsh-study-root .bg-st-red-soft\\/40 {
    background-color: rgb(var(--st-red-soft) / 0.4);
}
.dsh-study-root .bg-st-track {
    --tw-bg-opacity: 1;
    background-color: rgb(var(--st-track) / var(--tw-bg-opacity, 1));
}
.dsh-study-root .bg-transparent {
    background-color: transparent;
}
.dsh-study-root .bg-white {
    --tw-bg-opacity: 1;
    background-color: rgb(255 255 255 / var(--tw-bg-opacity, 1));
}
.dsh-study-root .bg-white\\/20 {
    background-color: rgb(255 255 255 / 0.2);
}
.dsh-study-root .bg-bar-green {
    background-image: repeating-linear-gradient(45deg, rgb(var(--st-green)) 0 12px, rgb(var(--st-stripe)) 12px 24px);
}
.dsh-study-root .fill-st-gold {
    fill: rgb(var(--st-gold) / 1);
}
.dsh-study-root .stroke-st-gold {
    stroke: rgb(var(--st-gold) / 1);
}
.dsh-study-root .stroke-text-muted {
    stroke: rgb(var(--color-text-muted) / 1);
}
.dsh-study-root .p-1 {
    padding: 0.25rem;
}
.dsh-study-root .p-1\\.5 {
    padding: 0.375rem;
}
.dsh-study-root .p-2 {
    padding: 0.5rem;
}
.dsh-study-root .p-3 {
    padding: 0.75rem;
}
.dsh-study-root .p-4 {
    padding: 1rem;
}
.dsh-study-root .p-5 {
    padding: 1.25rem;
}
.dsh-study-root .p-6 {
    padding: 1.5rem;
}
.dsh-study-root .p-8 {
    padding: 2rem;
}
.dsh-study-root .px-0 {
    padding-left: 0px;
    padding-right: 0px;
}
.dsh-study-root .px-0\\.5 {
    padding-left: 0.125rem;
    padding-right: 0.125rem;
}
.dsh-study-root .px-1 {
    padding-left: 0.25rem;
    padding-right: 0.25rem;
}
.dsh-study-root .px-1\\.5 {
    padding-left: 0.375rem;
    padding-right: 0.375rem;
}
.dsh-study-root .px-2 {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
}
.dsh-study-root .px-2\\.5 {
    padding-left: 0.625rem;
    padding-right: 0.625rem;
}
.dsh-study-root .px-3 {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
}
.dsh-study-root .px-3\\.5 {
    padding-left: 0.875rem;
    padding-right: 0.875rem;
}
.dsh-study-root .px-4 {
    padding-left: 1rem;
    padding-right: 1rem;
}
.dsh-study-root .px-5 {
    padding-left: 1.25rem;
    padding-right: 1.25rem;
}
.dsh-study-root .px-6 {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
}
.dsh-study-root .py-0\\.5 {
    padding-top: 0.125rem;
    padding-bottom: 0.125rem;
}
.dsh-study-root .py-1 {
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
}
.dsh-study-root .py-1\\.5 {
    padding-top: 0.375rem;
    padding-bottom: 0.375rem;
}
.dsh-study-root .py-10 {
    padding-top: 2.5rem;
    padding-bottom: 2.5rem;
}
.dsh-study-root .py-16 {
    padding-top: 4rem;
    padding-bottom: 4rem;
}
.dsh-study-root .py-2 {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
}
.dsh-study-root .py-2\\.5 {
    padding-top: 0.625rem;
    padding-bottom: 0.625rem;
}
.dsh-study-root .py-3 {
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
}
.dsh-study-root .py-3\\.5 {
    padding-top: 0.875rem;
    padding-bottom: 0.875rem;
}
.dsh-study-root .py-4 {
    padding-top: 1rem;
    padding-bottom: 1rem;
}
.dsh-study-root .py-6 {
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
}
.dsh-study-root .py-8 {
    padding-top: 2rem;
    padding-bottom: 2rem;
}
.dsh-study-root .py-px {
    padding-top: 1px;
    padding-bottom: 1px;
}
.dsh-study-root .pb-1 {
    padding-bottom: 0.25rem;
}
.dsh-study-root .pb-1\\.5 {
    padding-bottom: 0.375rem;
}
.dsh-study-root .pb-2 {
    padding-bottom: 0.5rem;
}
.dsh-study-root .pb-2\\.5 {
    padding-bottom: 0.625rem;
}
.dsh-study-root .pb-3 {
    padding-bottom: 0.75rem;
}
.dsh-study-root .pb-5 {
    padding-bottom: 1.25rem;
}
.dsh-study-root .pl-1\\.5 {
    padding-left: 0.375rem;
}
.dsh-study-root .pr-1 {
    padding-right: 0.25rem;
}
.dsh-study-root .pt-0\\.5 {
    padding-top: 0.125rem;
}
.dsh-study-root .pt-1 {
    padding-top: 0.25rem;
}
.dsh-study-root .pt-1\\.5 {
    padding-top: 0.375rem;
}
.dsh-study-root .pt-3 {
    padding-top: 0.75rem;
}
.dsh-study-root .pt-4 {
    padding-top: 1rem;
}
.dsh-study-root .pt-\\[3px\\] {
    padding-top: 3px;
}
.dsh-study-root .text-left {
    text-align: left;
}
.dsh-study-root .text-center {
    text-align: center;
}
.dsh-study-root .text-right {
    text-align: right;
}
.dsh-study-root .font-mono {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}
.dsh-study-root .text-2xl {
    font-size: 1.5rem;
    line-height: 2rem;
}
.dsh-study-root .text-3xl {
    font-size: 1.875rem;
    line-height: 2.25rem;
}
.dsh-study-root .text-4xl {
    font-size: 2.25rem;
    line-height: 2.5rem;
}
.dsh-study-root .text-\\[10px\\] {
    font-size: 10px;
}
.dsh-study-root .text-\\[11px\\] {
    font-size: 11px;
}
.dsh-study-root .text-\\[12\\.5px\\] {
    font-size: 12.5px;
}
.dsh-study-root .text-\\[12px\\] {
    font-size: 12px;
}
.dsh-study-root .text-\\[13\\.5px\\] {
    font-size: 13.5px;
}
.dsh-study-root .text-\\[13px\\] {
    font-size: 13px;
}
.dsh-study-root .text-\\[15px\\] {
    font-size: 15px;
}
.dsh-study-root .text-\\[16px\\] {
    font-size: 16px;
}
.dsh-study-root .text-\\[17px\\] {
    font-size: 17px;
}
.dsh-study-root .text-\\[22px\\] {
    font-size: 22px;
}
.dsh-study-root .text-\\[30px\\] {
    font-size: 30px;
}
.dsh-study-root .text-base {
    font-size: 1rem;
    line-height: 1.5rem;
}
.dsh-study-root .text-lg {
    font-size: 1.125rem;
    line-height: 1.75rem;
}
.dsh-study-root .text-sm {
    font-size: 0.875rem;
    line-height: 1.25rem;
}
.dsh-study-root .text-xl {
    font-size: 1.25rem;
    line-height: 1.75rem;
}
.dsh-study-root .text-xs {
    font-size: 0.75rem;
    line-height: 1rem;
}
.dsh-study-root .font-bold {
    font-weight: 700;
}
.dsh-study-root .font-extrabold {
    font-weight: 800;
}
.dsh-study-root .font-medium {
    font-weight: 500;
}
.dsh-study-root .font-semibold {
    font-weight: 600;
}
.dsh-study-root .uppercase {
    text-transform: uppercase;
}
.dsh-study-root .tabular-nums {
    --tw-numeric-spacing: tabular-nums;
    font-variant-numeric: var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction);
}
.dsh-study-root .leading-4 {
    line-height: 1rem;
}
.dsh-study-root .leading-none {
    line-height: 1;
}
.dsh-study-root .leading-relaxed {
    line-height: 1.625;
}
.dsh-study-root .leading-snug {
    line-height: 1.375;
}
.dsh-study-root .leading-tight {
    line-height: 1.25;
}
.dsh-study-root .tracking-\\[2px\\] {
    letter-spacing: 2px;
}
.dsh-study-root .tracking-tight {
    letter-spacing: -0.025em;
}
.dsh-study-root .tracking-wide {
    letter-spacing: 0.025em;
}
.dsh-study-root .text-amber-500 {
    --tw-text-opacity: 1;
    color: rgb(245 158 11 / var(--tw-text-opacity, 1));
}
.dsh-study-root .text-amber-600 {
    --tw-text-opacity: 1;
    color: rgb(217 119 6 / var(--tw-text-opacity, 1));
}
.dsh-study-root .text-amber-700 {
    --tw-text-opacity: 1;
    color: rgb(180 83 9 / var(--tw-text-opacity, 1));
}
.dsh-study-root .text-green-700 {
    --tw-text-opacity: 1;
    color: rgb(21 128 61 / var(--tw-text-opacity, 1));
}
.dsh-study-root .text-sky-700 {
    --tw-text-opacity: 1;
    color: rgb(3 105 161 / var(--tw-text-opacity, 1));
}
.dsh-study-root .text-st-blue {
    --tw-text-opacity: 1;
    color: rgb(var(--st-blue) / var(--tw-text-opacity, 1));
}
.dsh-study-root .text-st-blue-ink {
    --tw-text-opacity: 1;
    color: rgb(var(--st-blue-ink) / var(--tw-text-opacity, 1));
}
.dsh-study-root .text-st-gold {
    --tw-text-opacity: 1;
    color: rgb(var(--st-gold) / var(--tw-text-opacity, 1));
}
.dsh-study-root .text-st-gold-ink {
    --tw-text-opacity: 1;
    color: rgb(var(--st-gold-ink) / var(--tw-text-opacity, 1));
}
.dsh-study-root .text-st-gold-ink\\/80 {
    color: rgb(var(--st-gold-ink) / 0.8);
}
.dsh-study-root .text-st-green {
    --tw-text-opacity: 1;
    color: rgb(var(--st-green) / var(--tw-text-opacity, 1));
}
.dsh-study-root .text-st-green-ink {
    --tw-text-opacity: 1;
    color: rgb(var(--st-green-ink) / var(--tw-text-opacity, 1));
}
.dsh-study-root .text-st-green-ink\\/70 {
    color: rgb(var(--st-green-ink) / 0.7);
}
.dsh-study-root .text-st-green-ink\\/80 {
    color: rgb(var(--st-green-ink) / 0.8);
}
.dsh-study-root .text-st-green-low-dark {
    --tw-text-opacity: 1;
    color: rgb(var(--st-green-low-dark) / var(--tw-text-opacity, 1));
}
.dsh-study-root .text-st-red {
    --tw-text-opacity: 1;
    color: rgb(var(--st-red) / var(--tw-text-opacity, 1));
}
.dsh-study-root .text-st-red-ink {
    --tw-text-opacity: 1;
    color: rgb(var(--st-red-ink) / var(--tw-text-opacity, 1));
}
.dsh-study-root .text-text-faint {
    --tw-text-opacity: 1;
    color: rgb(var(--color-text-faint) / var(--tw-text-opacity, 1));
}
.dsh-study-root .text-text-muted {
    --tw-text-opacity: 1;
    color: rgb(var(--color-text-muted) / var(--tw-text-opacity, 1));
}
.dsh-study-root .text-text-primary {
    --tw-text-opacity: 1;
    color: rgb(var(--color-text-primary) / var(--tw-text-opacity, 1));
}
.dsh-study-root .text-text-secondary {
    --tw-text-opacity: 1;
    color: rgb(var(--color-text-secondary) / var(--tw-text-opacity, 1));
}
.dsh-study-root .text-white {
    --tw-text-opacity: 1;
    color: rgb(255 255 255 / var(--tw-text-opacity, 1));
}
.dsh-study-root .text-white\\/80 {
    color: rgb(255 255 255 / 0.8);
}
.dsh-study-root .underline {
    text-decoration-line: underline;
}
.dsh-study-root .decoration-current {
    text-decoration-color: currentColor;
}
.dsh-study-root .underline-offset-2 {
    text-underline-offset: 2px;
}
.dsh-study-root .opacity-30 {
    opacity: 0.3;
}
.dsh-study-root .opacity-50 {
    opacity: 0.5;
}
.dsh-study-root .opacity-60 {
    opacity: 0.6;
}
.dsh-study-root .opacity-70 {
    opacity: 0.7;
}
.dsh-study-root .opacity-90 {
    opacity: 0.9;
}
.dsh-study-root .opacity-95 {
    opacity: 0.95;
}
.dsh-study-root .shadow-\\[0_2px_0_rgb\\(var\\(--color-border\\)\\)\\] {
    --tw-shadow: 0 2px 0 rgb(var(--color-border));
    --tw-shadow-colored: 0 2px 0 var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.dsh-study-root .shadow-\\[0_3px_0_rgb\\(var\\(--st-blue\\)\\/0\\.4\\)\\] {
    --tw-shadow: 0 3px 0 rgb(var(--st-blue)/0.4);
    --tw-shadow-colored: 0 3px 0 var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.dsh-study-root .shadow-\\[0_3px_0_rgb\\(var\\(--st-gold-border\\)\\)\\2c 0_0_0_6px_rgb\\(var\\(--st-gold-soft\\)\\)\\] {
    --tw-shadow: 0 3px 0 rgb(var(--st-gold-border)),0 0 0 6px rgb(var(--st-gold-soft));
    --tw-shadow-colored: 0 3px 0 var(--tw-shadow-color), 0 0 0 6px var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.dsh-study-root .shadow-\\[0_3px_0_rgb\\(var\\(--st-green\\)\\/0\\.5\\)\\] {
    --tw-shadow: 0 3px 0 rgb(var(--st-green)/0.5);
    --tw-shadow-colored: 0 3px 0 var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.dsh-study-root .shadow-\\[0_3px_0_rgb\\(var\\(--st-green-dark\\)\\)\\] {
    --tw-shadow: 0 3px 0 rgb(var(--st-green-dark));
    --tw-shadow-colored: 0 3px 0 var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.dsh-study-root .shadow-\\[0_3px_0_rgb\\(var\\(--st-red-border\\)\\)\\] {
    --tw-shadow: 0 3px 0 rgb(var(--st-red-border));
    --tw-shadow-colored: 0 3px 0 var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.dsh-study-root .shadow-\\[0_3px_0_rgb\\(var\\(--st-red-dark\\)\\)\\] {
    --tw-shadow: 0 3px 0 rgb(var(--st-red-dark));
    --tw-shadow-colored: 0 3px 0 var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.dsh-study-root .shadow-\\[0_3px_0_rgb\\(var\\(--st-track\\)\\)\\] {
    --tw-shadow: 0 3px 0 rgb(var(--st-track));
    --tw-shadow-colored: 0 3px 0 var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.dsh-study-root .shadow-btn-blue {
    --tw-shadow: 0 5px 0 rgb(var(--st-blue-dark));
    --tw-shadow-colored: 0 5px 0 var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.dsh-study-root .shadow-btn-gold {
    --tw-shadow: 0 5px 0 rgb(var(--st-gold-border));
    --tw-shadow-colored: 0 5px 0 var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.dsh-study-root .shadow-btn-green {
    --tw-shadow: 0 5px 0 rgb(var(--st-green-dark));
    --tw-shadow-colored: 0 5px 0 var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.dsh-study-root .shadow-btn-plain {
    --tw-shadow: 0 5px 0 rgb(var(--color-border-strong));
    --tw-shadow-colored: 0 5px 0 var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.dsh-study-root .shadow-btn-red {
    --tw-shadow: 0 5px 0 rgb(var(--st-red-dark));
    --tw-shadow-colored: 0 5px 0 var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.dsh-study-root .shadow-card-3d {
    --tw-shadow: 0 3px 0 rgb(var(--color-border));
    --tw-shadow-colored: 0 3px 0 var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.dsh-study-root .shadow-md {
    --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.dsh-study-root .shadow-pop {
    --tw-shadow: 0 8px 24px -4px rgb(0 0 0 / 0.12), 0 2px 6px -2px rgb(0 0 0 / 0.06);
    --tw-shadow-colored: 0 8px 24px -4px var(--tw-shadow-color), 0 2px 6px -2px var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.dsh-study-root .shadow-sm {
    --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.dsh-study-root .shadow-soft {
    --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.04), 0 1px 3px 0 rgb(0 0 0 / 0.06);
    --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color), 0 1px 3px 0 var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.dsh-study-root .shadow-xl {
    --tw-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
    --tw-shadow-colored: 0 20px 25px -5px var(--tw-shadow-color), 0 8px 10px -6px var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.dsh-study-root .outline-none {
    outline: 2px solid transparent;
    outline-offset: 2px;
}
.dsh-study-root .ring {
    --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
    --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);
    box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
.dsh-study-root .ring-2 {
    --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
    --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
    box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
.dsh-study-root .ring-border {
    --tw-ring-opacity: 1;
    --tw-ring-color: rgb(var(--color-border) / var(--tw-ring-opacity, 1));
}
.dsh-study-root .ring-st-blue\\/30 {
    --tw-ring-color: rgb(var(--st-blue) / 0.3);
}
.dsh-study-root .ring-st-gold\\/40 {
    --tw-ring-color: rgb(var(--st-gold) / 0.4);
}
.dsh-study-root .ring-st-green\\/30 {
    --tw-ring-color: rgb(var(--st-green) / 0.3);
}
.dsh-study-root .ring-st-red\\/30 {
    --tw-ring-color: rgb(var(--st-red) / 0.3);
}
.dsh-study-root .blur {
    --tw-blur: blur(8px);
    filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}
.dsh-study-root .filter {
    filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}
.dsh-study-root .backdrop-blur-\\[2px\\] {
    --tw-backdrop-blur: blur(2px);
    backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);
}
.dsh-study-root .backdrop-blur-sm {
    --tw-backdrop-blur: blur(4px);
    backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);
}
.dsh-study-root .backdrop-filter {
    backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);
}
.dsh-study-root .transition {
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
}
.dsh-study-root .transition-\\[width\\] {
    transition-property: width;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
}
.dsh-study-root .transition-all {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
}
.dsh-study-root .transition-colors {
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
}
.dsh-study-root .transition-opacity {
    transition-property: opacity;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
}
.dsh-study-root .transition-transform {
    transition-property: transform;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
}
.dsh-study-root .duration-200 {
    transition-duration: 200ms;
}
.dsh-study-root .duration-300 {
    transition-duration: 300ms;
}
.dsh-study-root .ease-out {
    transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
}

/* \u2500\u2500 \u8BBE\u8BA1\u4EE4\u724C\u5355\u6E90\uFF08v0.25 \u7968\u2460\uFF0Cspec #110\uFF09\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
 *    \u5168\u7AD9\u552F\u4E00\u989C\u8272\u6743\u5A01\uFF1A\u4E2D\u6027\u9762 + \u72B6\u6001\u8272\uFF08\u7EFF=\u5B8C\u6210/\u63A8\u8FDB/\u4E3B\u884C\u52A8\u3001\u91D1=\u5F53\u524D\u5173\u5361\u3001
 *    \u7EA2=\u9519\u9898/\u8584\u5F31\u3001\u84DD=\u6B21\u7EA7/\u9009\u4E2D\uFF09\u3002\u8272\u53F7\u4EE5\u89C6\u89C9\u539F\u578B proto.css \u4E3A\u51C6\uFF08\u5341\u516D\u8FDB\u5236\u89C1\u6CE8\u91CA\uFF09\u3002
 *    \u503C\u7528\u7A7A\u683C\u5206\u9694\u7684 R G B \u4E09\u6570\uFF08\u914D\u5408 rgb(var(\u2026) / <alpha-value>) \u8BED\u6CD5\uFF0C\u652F\u6301 opacity \u4FEE\u9970\u5668\uFF09\u3002
 *    tailwind.config.js \u7684 bg-* / text-* / st-* \u5DE5\u5177\u7C7B\u5168\u90E8\u6307\u5411\u8FD9\u91CC\u2014\u2014\u6539\u8272\u53EA\u6539\u672C\u6587\u4EF6\u3002
 *    \u5207\u591C\u95F4 = html.classList.toggle('dark')\uFF0C\u53D8\u91CF\u81EA\u52A8\u5207\u6362\uFF08\u6697\u8272\u6BCF\u679A\u4EE4\u724C\u90FD\u6709\u5BF9\u5E94\u503C\uFF09\u3002
 *
 *    \u547D\u540D\u7EA6\u5B9A\uFF1A
 *    - --color-*   \u4E2D\u6027\u8BED\u4E49\u9762\uFF08\u5E95/\u5361/\u5B57/\u7EBF\uFF09\uFF0C\u6CBF\u7528 v0.24 \u67B6\u6784\uFF1B
 *    - --st-*      \u72B6\u6001\u8272\u65CF\uFF1ADEFAULT \u4E3B\u8272 / -dark 3D \u8FB9\uFF08\u6309\u538B\u9634\u5F71\uFF09/
 *                  -soft \u6D45\u5E95 / -ink \u6D45\u5E95\u4E0A\u7684\u53EF\u8BFB\u6587\u5B57\u8272\uFF08\u6697\u8272\u4E0B\u63D0\u4EAE\uFF0C\u4FDD\u8BC1\u5BF9\u6BD4\u5EA6\uFF09/
 *                  -low \u4F4E\u8FDB\u5EA6\u6D45\u7EFF\uFF08\u4E0D\u60E9\u7F5A\uFF09/ -border \u5FBD\u7AE0\u63CF\u8FB9\uFF1B
 *    - --st-track  \u8FDB\u5EA6\u6761/\u5F00\u5173\u7684\u8F68\u9053\u8272\uFF1B--st-stripe \u6761\u7EB9\u8FDB\u5EA6\u6761\u7684\u7B2C\u4E8C\u6BB5\u7EFF\u3002 */
:root {
  /* \u4E2D\u6027\u9762\uFF08\u539F\u578B\uFF1Abg #F2F7FC / card #FFFFFF / ink #2B3A55 / ink-soft #6B7B99 / line #E2E8F2 / track #E9EFF7\uFF09 */
  --color-bg-app: 242 247 252;        /* #F2F7FC */
  --color-bg-surface: 255 255 255;    /* #FFFFFF */
  --color-bg-subtle: 233 239 247;     /* #E9EFF7 */
  --color-bg-hover: 226 232 242;      /* #E2E8F2 */
  --color-text-primary: 43 58 85;     /* #2B3A55 */
  --color-text-secondary: 107 123 153;/* #6B7B99 */
  --color-text-muted: 126 141 168;    /* #7E8DA8 */
  --color-text-faint: 151 163 188;    /* #97A3BC */
  /* \u4E3B\u884C\u52A8\u5F3A\u8C03\uFF08\u539F\u975B\u84DD\u5DF2\u9000\u5F79\uFF09\uFF1A\u7EFF\u7CFB\u63A8\u8FDB\u8272 */
  --color-text-accent: 70 163 2;      /* #46A302 */
  --color-border: 226 232 242;        /* #E2E8F2 */
  --color-border-strong: 203 213 227; /* #CBD5E3 */

  /* \u72B6\u6001\u8272\uFF08\u539F\u578B proto.css \u539F\u7248\u8272\u53F7\uFF09 */
  --st-green: 88 204 2;               /* #58CC02 \u5B8C\u6210/\u63A8\u8FDB/\u4E3B\u884C\u52A8 */
  --st-green-dark: 70 163 2;          /* #46A302 3D \u8FB9 */
  --st-green-soft: 232 246 220;       /* #E8F6DC */
  --st-green-ink: 70 163 2;           /* #46A302 \u6D45\u5E95\u4E0A\u7684\u6587\u5B57 */
  --st-green-low: 134 217 44;         /* #86D92C \u4F4E\u8FDB\u5EA6\u6D45\u7EFF\uFF08\u4E0D\u60E9\u7F5A\uFF09 */
  --st-green-low-dark: 95 163 21;     /* #5FA315 */
  --st-blue: 28 176 246;              /* #1CB0F6 \u6B21\u7EA7/\u9009\u4E2D/\u770B\u9898 */
  --st-blue-dark: 24 153 214;         /* #1899D6 */
  --st-blue-soft: 225 244 253;        /* #E1F4FD */
  --st-blue-ink: 24 153 214;          /* #1899D6 */
  --st-gold: 255 200 0;               /* #FFC800 \u5F53\u524D\u5173\u5361/\u5728\u5B66 */
  --st-gold-dark: 201 143 0;          /* #C98F00 */
  --st-gold-border: 229 166 0;        /* #E5A600 \u91D1\u8272 3D \u8FB9/\u5FBD\u7AE0\u63CF\u8FB9 */
  --st-gold-soft: 255 244 214;        /* #FFF4D6 */
  --st-gold-ink: 201 143 0;           /* #C98F00 */
  --st-red: 255 75 75;                /* #FF4B4B \u9519\u9898/\u8584\u5F31 */
  --st-red-dark: 225 63 63;           /* #E13F3F */
  --st-red-soft: 255 229 229;         /* #FFE5E5 */
  --st-red-border: 245 179 179;       /* #F5B3B3 */
  --st-red-ink: 225 63 63;            /* #E13F3F */
  --st-stripe: 111 213 34;            /* #6FD522 \u6761\u7EB9\u8FDB\u5EA6\u6761\u7B2C\u4E8C\u6BB5\u7EFF */
  --st-track: 233 239 247;            /* #E9EFF7 */
  color-scheme: light;
}
.dark {
  /* \u4E2D\u6027\u9762\uFF1A\u58A8\u84DD\u7CFB\u6697\u8272\uFF08\u4E0E\u72B6\u6001\u8272\u540C\u65CF\uFF0C\u907F\u514D slate \u7070\u504F\uFF09 */
  --color-bg-app: 23 33 52;           /* #172134 */
  --color-bg-surface: 33 46 70;       /* #212E46 */
  --color-bg-subtle: 27 39 61;        /* #1B273D */
  --color-bg-hover: 43 58 85;         /* #2B3A55 */
  --color-text-primary: 232 238 248;  /* #E8EEF8 */
  --color-text-secondary: 185 198 220;/* #B9C6DC */
  --color-text-muted: 147 163 191;    /* #93A3BF */
  --color-text-faint: 110 127 156;    /* #6E7F9C */
  --color-text-accent: 137 224 56;    /* #89E038 */
  --color-border: 51 66 95;           /* #33425F */
  --color-border-strong: 70 88 122;   /* #46587A */

  /* \u72B6\u6001\u8272\u6697\u8272\u5BF9\u5E94\u503C\uFF1A\u4E3B\u8272/3D \u8FB9\u4FDD\u6301\u54C1\u724C\u8272\u53F7\uFF08\u6697\u5E95\u4E0A\u4F9D\u7136\u6210\u7ACB\uFF09\uFF1B
     soft \u53D8\u4E3A\u6DF1\u8272\u4E95\uFF08\u540C\u8272\u76F8\u6697\u5E95\uFF09\uFF1Bink \u63D0\u4EAE\u4FDD\u8BC1\u6697\u5E95\u53EF\u8BFB */
  --st-green: 88 204 2;
  --st-green-dark: 70 163 2;
  --st-green-soft: 26 43 16;          /* #1A2B10 */
  --st-green-ink: 137 224 56;         /* #89E038 */
  --st-green-low: 134 217 44;
  --st-green-low-dark: 95 163 21;
  --st-blue: 28 176 246;
  --st-blue-dark: 24 153 214;
  --st-blue-soft: 14 40 60;           /* #0E283C */
  --st-blue-ink: 94 200 247;          /* #5EC8F7 */
  --st-gold: 255 200 0;
  --st-gold-dark: 201 143 0;
  --st-gold-border: 229 166 0;
  --st-gold-soft: 47 38 12;           /* #2F260C */
  --st-gold-ink: 255 213 79;          /* #FFD54F */
  --st-red: 255 75 75;
  --st-red-dark: 225 63 63;
  --st-red-soft: 55 26 26;            /* #371A1A */
  --st-red-border: 138 58 58;         /* #8A3A3A */
  --st-red-ink: 255 123 123;          /* #FF7B7B */
  --st-stripe: 111 213 34;
  --st-track: 39 52 76;               /* #27344C */
  color-scheme: dark;
}

/* \u2500\u2500 \u9762\u677F\u5185\u6700\u5C0F preflight\uFF08\u4F5C\u7528\u57DF\u6536\u7A84\u5230 .dsh-study-root\uFF09\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
 *    \u8001\u7AD9\u8DD1\u5728 Vite \u91CC\u5E26 Tailwind preflight\uFF1B\u5BBF\u4E3B\u9875\u9762\u4E0D\u80FD\u5403 preflight\uFF08\u4F1A\u6C61\u67D3 DSH \u5168\u5C40\u6837\u5F0F\uFF09\uFF0C
 *    \u6240\u4EE5\u8FD9\u91CC\u628A preflight \u91CC**\u5F71\u54CD\u76D2\u6A21\u578B/\u63A7\u4EF6\u9ED8\u8BA4\u5916\u89C2**\u7684\u90E8\u5206\u6309\u5B50\u6811\u4F5C\u7528\u57DF\u8865\u56DE\u6765\uFF0C
 *    \u5426\u5219 content-box \u4F1A\u8BA9\u6240\u6709 padding \u6491\u5927\u76D2\u5B50\u3001\u6309\u94AE/\u6807\u9898\u4F1A\u5E26\u4E0A UA \u9ED8\u8BA4\u6837\u5F0F\u3002 */
.dsh-study-root,
.dsh-study-root *,
.dsh-study-root *::before,
.dsh-study-root *::after {
  box-sizing: border-box;
  border-width: 0;
  border-style: solid;
  border-color: rgb(var(--color-border));
}
.dsh-study-root img,
.dsh-study-root svg,
.dsh-study-root video,
.dsh-study-root canvas {
  display: block;
  max-width: 100%;
}
.dsh-study-root button,
.dsh-study-root input,
.dsh-study-root select,
.dsh-study-root textarea {
  font: inherit;
  color: inherit;
  letter-spacing: inherit;
  margin: 0;
  padding: 0;
  background: transparent;
}
.dsh-study-root button { cursor: pointer; }
.dsh-study-root button:disabled { cursor: not-allowed; }
.dsh-study-root h1, .dsh-study-root h2, .dsh-study-root h3,
.dsh-study-root h4, .dsh-study-root h5, .dsh-study-root h6,
.dsh-study-root p, .dsh-study-root figure, .dsh-study-root blockquote {
  margin: 0;
  font-size: inherit;
  font-weight: inherit;
}
.dsh-study-root ul, .dsh-study-root ol { margin: 0; padding: 0; list-style: none; }
.dsh-study-root a { color: inherit; text-decoration: inherit; }
.dsh-study-root hr { height: 0; color: inherit; border-top-width: 1px; }

/* \u2500\u2500 \u9762\u677F\u6839\u4E0A\u7684\u57FA\u7840\u89C4\u5219\uFF08\u5BBF\u4E3B\u5185\u4E0D\u5F15\u5165 Tailwind preflight\uFF09\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
 *    \u8001\u7AD9\u8FD9\u6BB5\u653E\u5728 @layer base \u91CC\u3002\u642C\u8FDB DSH \u9762\u677F\u540E\u6709\u4E24\u4E2A\u53D8\u5316\uFF1A
 *    1) \u4E0D\u518D\u5199 @layer base \u2014\u2014 \u6CA1\u6709 @tailwind base \u6307\u4EE4\u65F6 Tailwind \u4F1A\u76F4\u63A5\u62A5
 *       "'@layer base' is used but no matching '@tailwind base' directive is present"\uFF0C
 *       \u800C\u52A0\u4E0A @tailwind base \u4F1A\u628A preflight \u6CFC\u8FDB\u5BBF\u4E3B\u7684\u5168\u5C40\u6837\u5F0F\u3002\u6240\u4EE5\u6539\u6210\u666E\u901A CSS\u3002
 *    2) \u9009\u62E9\u5668\u5168\u90E8\u6536\u7A84\u5230\u9762\u677F\u6839 .dsh-study-root\uFF08\u5BBF\u4E3B index.jsx \u6E32\u67D3\u7684\u90A3\u4E2A div\uFF0C
 *       \u6697\u8272\u7C7B .dark \u4E5F\u6302\u5728\u5B83\u4E0A\u9762\uFF09\uFF0C\u539F html/body \u89C4\u5219\u6539\u5199\u6210\u6839\u5BB9\u5668\u81EA\u8EAB\u7684\u5C5E\u6027\uFF0C
 *       \u7EDD\u4E0D\u6C61\u67D3 DSH \u7684 <html>/<body>\u3002 */
.dsh-study-root {
  /* \u5E03\u5C40\u57FA\u5EA7\uFF1Atailwind.config \u7528\u4E86 important: '.dsh-study-root'\uFF0C\u6240\u6709\u5DE5\u5177\u7C7B\u90FD\u88AB\u7F16\u8BD1\u6210
     \u300C.dsh-study-root .flex\u300D\u8FD9\u79CD\u540E\u4EE3\u9009\u62E9\u5668\uFF0C\u9762\u677F\u6839\u5143\u7D20\u81EA\u5DF1\u8EAB\u4E0A\u7684 flex/h-full \u4E00\u5F8B\u4E0D\u751F\u6548
     \uFF08\u5B9E\u6D4B\u6839 div \u8BA1\u7B97\u503C display:block\u3001height:530px\uFF0C\u5185\u5BB9\u53EA\u94FA\u5230\u534A\u5C4F\uFF09\u3002\u6240\u4EE5\u6839\u5BB9\u5668\u7684\u5E03\u5C40
     \u5FC5\u987B\u5199\u5728\u8FD9\u91CC\uFF0C\u4E0D\u4F9D\u8D56\u5DE5\u5177\u7C7B\u3002 */
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  align-self: stretch;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  scroll-behavior: smooth;
  -webkit-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: rgb(var(--color-bg-app));
  color: rgb(var(--color-text-primary));
}
/* \u9762\u677F\u5185\u53EF\u89C1\u7126\u70B9\u73AF\uFF1A\u952E\u76D8\u53EF\u8FBE\u6027\uFF08WCAG focus-states\uFF09\uFF0C\u4EC5\u952E\u76D8\u805A\u7126\u65F6\u663E\u793A\uFF0C\u4E0D\u5F71\u54CD\u9F20\u6807\u4F53\u9A8C\u3002
   \u7126\u70B9\u73AF\u8D70\u72B6\u6001\u84DD\uFF08\u6B21\u7EA7/\u4EA4\u4E92\uFF09\uFF0C\u4E0D\u5360\u7528\u7EFF/\u7EA2/\u91D1\u7684\u72B6\u6001\u8BED\u4E49 */
.dsh-study-root :focus-visible {
  outline: 2px solid rgb(var(--st-blue));
  outline-offset: 2px;
  border-radius: 2px;
}
/* \u5C0A\u91CD\u7CFB\u7EDF\u300C\u51CF\u5C11\u52A8\u6001\u6548\u679C\u300D\u504F\u597D\uFF08WCAG reduced-motion\uFF09\uFF0C\u53EA\u4F5C\u7528\u4E8E\u9762\u677F\u5185\u90E8 */
@media (prefers-reduced-motion: reduce) {
  .dsh-study-root *,
  .dsh-study-root *::before,
  .dsh-study-root *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
.dsh-study-root .placeholder\\:text-text-faint::-moz-placeholder {
    --tw-text-opacity: 1;
    color: rgb(var(--color-text-faint) / var(--tw-text-opacity, 1));
}
.dsh-study-root .placeholder\\:text-text-faint::placeholder {
    --tw-text-opacity: 1;
    color: rgb(var(--color-text-faint) / var(--tw-text-opacity, 1));
}
.dsh-study-root .hover\\:-translate-y-0\\.5:hover {
    --tw-translate-y: -0.125rem;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.dsh-study-root .hover\\:border-border-strong:hover {
    --tw-border-opacity: 1;
    border-color: rgb(var(--color-border-strong) / var(--tw-border-opacity, 1));
}
.dsh-study-root .hover\\:border-st-blue\\/50:hover {
    border-color: rgb(var(--st-blue) / 0.5);
}
.dsh-study-root .hover\\:bg-bg-hover:hover {
    --tw-bg-opacity: 1;
    background-color: rgb(var(--color-bg-hover) / var(--tw-bg-opacity, 1));
}
.dsh-study-root .hover\\:bg-bg-hover\\/50:hover {
    background-color: rgb(var(--color-bg-hover) / 0.5);
}
.dsh-study-root .hover\\:bg-slate-700:hover {
    --tw-bg-opacity: 1;
    background-color: rgb(51 65 85 / var(--tw-bg-opacity, 1));
}
.dsh-study-root .hover\\:bg-st-gold-soft\\/70:hover {
    background-color: rgb(var(--st-gold-soft) / 0.7);
}
.dsh-study-root .hover\\:bg-st-green-soft:hover {
    --tw-bg-opacity: 1;
    background-color: rgb(var(--st-green-soft) / var(--tw-bg-opacity, 1));
}
.dsh-study-root .hover\\:bg-st-green-soft\\/70:hover {
    background-color: rgb(var(--st-green-soft) / 0.7);
}
.dsh-study-root .hover\\:bg-white\\/20:hover {
    background-color: rgb(255 255 255 / 0.2);
}
.dsh-study-root .hover\\:bg-white\\/30:hover {
    background-color: rgb(255 255 255 / 0.3);
}
.dsh-study-root .hover\\:text-st-blue-ink:hover {
    --tw-text-opacity: 1;
    color: rgb(var(--st-blue-ink) / var(--tw-text-opacity, 1));
}
.dsh-study-root .hover\\:text-st-green-ink:hover {
    --tw-text-opacity: 1;
    color: rgb(var(--st-green-ink) / var(--tw-text-opacity, 1));
}
.dsh-study-root .hover\\:text-st-red-ink:hover {
    --tw-text-opacity: 1;
    color: rgb(var(--st-red-ink) / var(--tw-text-opacity, 1));
}
.dsh-study-root .hover\\:text-text-accent:hover {
    --tw-text-opacity: 1;
    color: rgb(var(--color-text-accent) / var(--tw-text-opacity, 1));
}
.dsh-study-root .hover\\:text-text-muted:hover {
    --tw-text-opacity: 1;
    color: rgb(var(--color-text-muted) / var(--tw-text-opacity, 1));
}
.dsh-study-root .hover\\:text-text-primary:hover {
    --tw-text-opacity: 1;
    color: rgb(var(--color-text-primary) / var(--tw-text-opacity, 1));
}
.dsh-study-root .hover\\:text-text-secondary:hover {
    --tw-text-opacity: 1;
    color: rgb(var(--color-text-secondary) / var(--tw-text-opacity, 1));
}
.dsh-study-root .hover\\:opacity-80:hover {
    opacity: 0.8;
}
.dsh-study-root .focus\\:border-st-blue:focus {
    --tw-border-opacity: 1;
    border-color: rgb(var(--st-blue) / var(--tw-border-opacity, 1));
}
.dsh-study-root .focus\\:outline-none:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
}
.dsh-study-root .active\\:bg-bg-hover:active {
    --tw-bg-opacity: 1;
    background-color: rgb(var(--color-bg-hover) / var(--tw-bg-opacity, 1));
}
.dsh-study-root .disabled\\:cursor-not-allowed:disabled {
    cursor: not-allowed;
}
.dsh-study-root .disabled\\:opacity-40:disabled {
    opacity: 0.4;
}
.dsh-study-root .disabled\\:opacity-50:disabled {
    opacity: 0.5;
}
.dsh-study-root .disabled\\:active\\:translate-y-0:active:disabled {
    --tw-translate-y: 0px;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.dsh-study-root :is(.group:hover .group-hover\\:translate-x-0\\.5) {
    --tw-translate-x: 0.125rem;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.dsh-study-root .dark\\:bg-sky-900\\/40:is(.dark *) {
    background-color: rgb(12 74 110 / 0.4);
}
.dsh-study-root .dark\\:bg-slate-700:is(.dark *) {
    --tw-bg-opacity: 1;
    background-color: rgb(51 65 85 / var(--tw-bg-opacity, 1));
}
.dsh-study-root .dark\\:text-green-400:is(.dark *) {
    --tw-text-opacity: 1;
    color: rgb(74 222 128 / var(--tw-text-opacity, 1));
}
.dsh-study-root .dark\\:text-sky-300:is(.dark *) {
    --tw-text-opacity: 1;
    color: rgb(125 211 252 / var(--tw-text-opacity, 1));
}
.dsh-study-root .dark\\:hover\\:bg-slate-600:hover:is(.dark *) {
    --tw-bg-opacity: 1;
    background-color: rgb(71 85 105 / var(--tw-bg-opacity, 1));
}
@media (min-width: 420px) {
    .dsh-study-root .min-\\[420px\\]\\:inline {
        display: inline;
    }
}
@media (min-width: 480px) {
    .dsh-study-root .min-\\[480px\\]\\:block {
        display: block;
    }
    .dsh-study-root .min-\\[480px\\]\\:pl-6 {
        padding-left: 1.5rem;
    }
}
@media (min-width: 520px) {
    .dsh-study-root .min-\\[520px\\]\\:flex {
        display: flex;
    }
}
@media (min-width: 640px) {
    .dsh-study-root .sm\\:top-\\[22px\\] {
        top: 22px;
    }
    .dsh-study-root .sm\\:top-\\[60px\\] {
        top: 60px;
    }
    .dsh-study-root .sm\\:h-12 {
        height: 3rem;
    }
    .dsh-study-root .sm\\:h-6 {
        height: 1.5rem;
    }
    .dsh-study-root .sm\\:h-8 {
        height: 2rem;
    }
    .dsh-study-root .sm\\:h-\\[30px\\] {
        height: 30px;
    }
    .dsh-study-root .sm\\:h-\\[60px\\] {
        height: 60px;
    }
    .dsh-study-root .sm\\:h-\\[calc\\(100vh-60px\\)\\] {
        height: calc(100vh - 60px);
    }
    .dsh-study-root .sm\\:w-12 {
        width: 3rem;
    }
    .dsh-study-root .sm\\:w-8 {
        width: 2rem;
    }
    .dsh-study-root .sm\\:w-\\[30px\\] {
        width: 30px;
    }
    .dsh-study-root .sm\\:w-auto {
        width: auto;
    }
    .dsh-study-root .sm\\:max-w-\\[540px\\] {
        max-width: 540px;
    }
    .dsh-study-root .sm\\:max-w-md {
        max-width: 28rem;
    }
    .dsh-study-root .sm\\:grid-cols-2 {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .dsh-study-root .sm\\:grid-cols-4 {
        grid-template-columns: repeat(4, minmax(0, 1fr));
    }
    .dsh-study-root .sm\\:grid-cols-\\[2fr_1fr_1fr\\] {
        grid-template-columns: 2fr 1fr 1fr;
    }
    .dsh-study-root .sm\\:flex-row {
        flex-direction: row;
    }
    .dsh-study-root .sm\\:items-center {
        align-items: center;
    }
    .dsh-study-root .sm\\:gap-1 {
        gap: 0.25rem;
    }
    .dsh-study-root .sm\\:gap-2 {
        gap: 0.5rem;
    }
    .dsh-study-root .sm\\:gap-2\\.5 {
        gap: 0.625rem;
    }
    .dsh-study-root .sm\\:rounded-2xl {
        border-radius: 1rem;
    }
    .dsh-study-root .sm\\:rounded-\\[14px\\] {
        border-radius: 14px;
    }
    .dsh-study-root .sm\\:rounded-\\[20px\\] {
        border-radius: 20px;
    }
    .dsh-study-root .sm\\:p-2 {
        padding: 0.5rem;
    }
    .dsh-study-root .sm\\:p-7 {
        padding: 1.75rem;
    }
    .dsh-study-root .sm\\:p-8 {
        padding: 2rem;
    }
    .dsh-study-root .sm\\:px-3\\.5 {
        padding-left: 0.875rem;
        padding-right: 0.875rem;
    }
    .dsh-study-root .sm\\:px-4 {
        padding-left: 1rem;
        padding-right: 1rem;
    }
    .dsh-study-root .sm\\:px-5 {
        padding-left: 1.25rem;
        padding-right: 1.25rem;
    }
    .dsh-study-root .sm\\:px-\\[18px\\] {
        padding-left: 18px;
        padding-right: 18px;
    }
    .dsh-study-root .sm\\:pr-2 {
        padding-right: 0.5rem;
    }
    .dsh-study-root .sm\\:text-2xl {
        font-size: 1.5rem;
        line-height: 2rem;
    }
    .dsh-study-root .sm\\:text-\\[0\\.8125rem\\] {
        font-size: 0.8125rem;
    }
    .dsh-study-root .sm\\:text-\\[1\\.75rem\\] {
        font-size: 1.75rem;
    }
    .dsh-study-root .sm\\:text-\\[15px\\] {
        font-size: 15px;
    }
    .dsh-study-root .sm\\:text-\\[17px\\] {
        font-size: 17px;
    }
    .dsh-study-root .sm\\:text-base {
        font-size: 1rem;
        line-height: 1.5rem;
    }
    .dsh-study-root .sm\\:text-lg {
        font-size: 1.125rem;
        line-height: 1.75rem;
    }
    .dsh-study-root .sm\\:text-sm {
        font-size: 0.875rem;
        line-height: 1.25rem;
    }
    .dsh-study-root .sm\\:text-xl {
        font-size: 1.25rem;
        line-height: 1.75rem;
    }
}
`;if(typeof document<"u"){let e=document.createElement("style");e.setAttribute("data-dsh-ai-study-kit",""),e.appendChild(document.createTextNode(Al)),document.head.appendChild(e)}Ml.exports=Al});var Hc={};Kl(Hc,{apply:()=>Bc,inject:()=>Tc,name:()=>Nc});module.exports=Ql(Hc);var be=require("react");var en="/dsh-ai-study-kit";var ia={snapshot:"snapshot",saveProgress:"progress.save",setProject:"project.set",setTheme:"theme.set",setSettings:"settings.set"},Yl={extOn:!0,autoAdvance:!0,dailyNewCards:20,lang:"zh"},Gc=Object.keys(Yl);var kl=require("react");var Q=ur(require("react")),qu=ur(require("react-dom"));var M=ur(require("react"));function ir(){return ir=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)({}).hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e},ir.apply(null,arguments)}var Ae;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(Ae||(Ae={}));function on(e){e===void 0&&(e={});let{initialEntries:t=["/"],initialIndex:a,v5Compat:r=!1}=e,o;o=t.map((c,f)=>p(c,typeof c=="string"?null:c.state,f===0?"default":void 0));let n=l(a??o.length-1),s=Ae.Pop,d=null;function l(c){return Math.min(Math.max(c,0),o.length-1)}function u(){return o[n]}function p(c,f,h){f===void 0&&(f=null);let b=Jl(o?u().pathname:"/",c,f,h);return Or(b.pathname.charAt(0)==="/","relative pathnames are not supported in memory history: "+JSON.stringify(c)),b}function i(c){return typeof c=="string"?c:Ot(c)}return{get index(){return n},get action(){return s},get location(){return u()},createHref:i,createURL(c){return new URL(i(c),"http://localhost")},encodeLocation(c){let f=typeof c=="string"?Ge(c):c;return{pathname:f.pathname||"",search:f.search||"",hash:f.hash||""}},push(c,f){s=Ae.Push;let h=p(c,f);n+=1,o.splice(n,o.length,h),r&&d&&d({action:s,location:h,delta:1})},replace(c,f){s=Ae.Replace;let h=p(c,f);o[n]=h,r&&d&&d({action:s,location:h,delta:0})},go(c){s=Ae.Pop;let f=l(n+c),h=o[f];n=f,d&&d({action:s,location:h,delta:c})},listen(c){return d=c,()=>{d=null}}}}function oe(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function Or(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function Zl(){return Math.random().toString(36).substr(2,8)}function Jl(e,t,a,r){return a===void 0&&(a=null),ir({pathname:typeof e=="string"?e:e.pathname,search:"",hash:""},typeof t=="string"?Ge(t):t,{state:a,key:t&&t.key||r||Zl()})}function Ot(e){let{pathname:t="/",search:a="",hash:r=""}=e;return a&&a!=="?"&&(t+=a.charAt(0)==="?"?a:"?"+a),r&&r!=="#"&&(t+=r.charAt(0)==="#"?r:"#"+r),t}function Ge(e){let t={};if(e){let a=e.indexOf("#");a>=0&&(t.hash=e.substr(a),e=e.substr(0,a));let r=e.indexOf("?");r>=0&&(t.search=e.substr(r),e=e.substr(0,r)),e&&(t.pathname=e)}return t}var tn;(function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"})(tn||(tn={}));function cr(e,t,a){return a===void 0&&(a="/"),eu(e,t,a,!1)}function eu(e,t,a,r){let o=typeof t=="string"?Ge(t):t,n=ct(o.pathname||"/",a);if(n==null)return null;let s=nn(e);tu(s);let d=null,l=dn(n);for(let u=0;d==null&&u<s.length;++u)d=iu(s[u],l,r);return d}function nn(e,t,a,r){t===void 0&&(t=[]),a===void 0&&(a=[]),r===void 0&&(r="");let o=(n,s,d)=>{let l={relativePath:d===void 0?n.path||"":d,caseSensitive:n.caseSensitive===!0,childrenIndex:s,route:n};l.relativePath.startsWith("/")&&(oe(l.relativePath.startsWith(r),'Absolute route path "'+l.relativePath+'" nested under path '+('"'+r+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),l.relativePath=l.relativePath.slice(r.length));let u=We([r,l.relativePath]),p=a.concat(l);n.children&&n.children.length>0&&(oe(n.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+u+'".')),nn(n.children,t,p,u)),!(n.path==null&&!n.index)&&t.push({path:u,score:lu(u,n.index),routesMeta:p})};return e.forEach((n,s)=>{var d;if(n.path===""||!((d=n.path)!=null&&d.includes("?")))o(n,s);else for(let l of sn(n.path))o(n,s,l)}),t}function sn(e){let t=e.split("/");if(t.length===0)return[];let[a,...r]=t,o=a.endsWith("?"),n=a.replace(/\?$/,"");if(r.length===0)return o?[n,""]:[n];let s=sn(r.join("/")),d=[];return d.push(...s.map(l=>l===""?n:[n,l].join("/"))),o&&d.push(...s),d.map(l=>e.startsWith("/")&&l===""?"/":l)}function tu(e){e.sort((t,a)=>t.score!==a.score?a.score-t.score:uu(t.routesMeta.map(r=>r.childrenIndex),a.routesMeta.map(r=>r.childrenIndex)))}var au=/^:[\w-]+$/,ru=3,ou=2,nu=1,su=10,du=-2,an=e=>e==="*";function lu(e,t){let a=e.split("/"),r=a.length;return a.some(an)&&(r+=du),t&&(r+=ou),a.filter(o=>!an(o)).reduce((o,n)=>o+(au.test(n)?ru:n===""?nu:su),r)}function uu(e,t){return e.length===t.length&&e.slice(0,-1).every((r,o)=>r===t[o])?e[e.length-1]-t[t.length-1]:0}function iu(e,t,a){a===void 0&&(a=!1);let{routesMeta:r}=e,o={},n="/",s=[];for(let d=0;d<r.length;++d){let l=r[d],u=d===r.length-1,p=n==="/"?t:t.slice(n.length)||"/",i=it({path:l.relativePath,caseSensitive:l.caseSensitive,end:u},p),m=l.route;if(!i&&u&&a&&!r[r.length-1].route.index&&(i=it({path:l.relativePath,caseSensitive:l.caseSensitive,end:!1},p)),!i)return null;Object.assign(o,i.params),s.push({params:o,pathname:We([n,i.pathname]),pathnameBase:pu(We([n,i.pathnameBase])),route:m}),i.pathnameBase!=="/"&&(n=We([n,i.pathnameBase]))}return s}function it(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[a,r]=cu(e.path,e.caseSensitive,e.end),o=t.match(a);if(!o)return null;let n=o[0],s=n.replace(/(.)\/+$/,"$1"),d=o.slice(1);return{params:r.reduce((u,p,i)=>{let{paramName:m,isOptional:c}=p;if(m==="*"){let h=d[i]||"";s=n.slice(0,n.length-h.length).replace(/(.)\/+$/,"$1")}let f=d[i];return c&&!f?u[m]=void 0:u[m]=(f||"").replace(/%2F/g,"/"),u},{}),pathname:n,pathnameBase:s,pattern:e}}function cu(e,t,a){t===void 0&&(t=!1),a===void 0&&(a=!0),Or(e==="*"||!e.endsWith("*")||e.endsWith("/*"),'Route path "'+e+'" will be treated as if it were '+('"'+e.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+e.replace(/\*$/,"/*")+'".'));let r=[],o="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(s,d,l)=>(r.push({paramName:d,isOptional:l!=null}),l?"/?([^\\/]+)?":"/([^\\/]+)"));return e.endsWith("*")?(r.push({paramName:"*"}),o+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):a?o+="\\/*$":e!==""&&e!=="/"&&(o+="(?:(?=\\/|$))"),[new RegExp(o,t?void 0:"i"),r]}function dn(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return Or(!1,'The URL path "'+e+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+t+").")),e}}function ct(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let a=t.endsWith("/")?t.length-1:t.length,r=e.charAt(a);return r&&r!=="/"?null:e.slice(a)||"/"}function qr(e,t){t===void 0&&(t="/");let{pathname:a,search:r="",hash:o=""}=typeof e=="string"?Ge(e):e,n;return a?(a=ln(a),a.startsWith("/")?n=rn(a.substring(1),"/"):n=rn(a,t)):n=t,{pathname:n,search:mu(r),hash:hu(o)}}function rn(e,t){let a=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(o=>{o===".."?a.length>1&&a.pop():o!=="."&&a.push(o)}),a.length>1?a.join("/"):"/"}function Ur(e,t,a,r){return"Cannot include a '"+e+"' character in a manually specified "+("`to."+t+"` field ["+JSON.stringify(r)+"].  Please separate it out to the ")+("`to."+a+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function fu(e){return e.filter((t,a)=>a===0||t.route.path&&t.route.path.length>0)}function fr(e,t){let a=fu(e);return t?a.map((r,o)=>o===a.length-1?r.pathname:r.pathnameBase):a.map(r=>r.pathnameBase)}function pr(e,t,a,r){r===void 0&&(r=!1);let o;typeof e=="string"?o=Ge(e):(o=ir({},e),oe(!o.pathname||!o.pathname.includes("?"),Ur("?","pathname","search",o)),oe(!o.pathname||!o.pathname.includes("#"),Ur("#","pathname","hash",o)),oe(!o.search||!o.search.includes("#"),Ur("#","search","hash",o)));let n=e===""||o.pathname==="",s=n?"/":o.pathname,d;if(s==null)d=a;else{let i=t.length-1;if(!r&&s.startsWith("..")){let m=s.split("/");for(;m[0]==="..";)m.shift(),i-=1;o.pathname=m.join("/")}d=i>=0?t[i]:"/"}let l=qr(o,d),u=s&&s!=="/"&&s.endsWith("/"),p=(n||s===".")&&a.endsWith("/");return!l.pathname.endsWith("/")&&(u||p)&&(l.pathname+="/"),l}var ln=e=>e.replace(/\/\/+/g,"/"),We=e=>ln(e.join("/")),pu=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),mu=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,hu=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function mr(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}var un=["post","put","patch","delete"],Vc=new Set(un),gu=["get",...un],jc=new Set(gu);function ca(){return ca=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)({}).hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e},ca.apply(null,arguments)}var Ht=M.createContext(null),gr=M.createContext(null);var Me=M.createContext(null),pa=M.createContext(null),Ee=M.createContext({outlet:null,matches:[],isDataRoute:!1}),mn=M.createContext(null);function _r(e,t){let{relative:a}=t===void 0?{}:t;It()||oe(!1);let{basename:r,navigator:o}=M.useContext(Me),{hash:n,pathname:s,search:d}=_t(e,{relative:a}),l=s;return r!=="/"&&(l=s==="/"?r:We([r,s])),o.createHref({pathname:l,search:d,hash:n})}function It(){return M.useContext(pa)!=null}function Ne(){return It()||oe(!1),M.useContext(pa).location}function hn(e){M.useContext(Me).static||M.useLayoutEffect(e)}function Ct(){let{isDataRoute:e}=M.useContext(Ee);return e?Eu():Su()}function Su(){It()||oe(!1);let e=M.useContext(Ht),{basename:t,future:a,navigator:r}=M.useContext(Me),{matches:o}=M.useContext(Ee),{pathname:n}=Ne(),s=JSON.stringify(fr(o,a.v7_relativeSplatPath)),d=M.useRef(!1);return hn(()=>{d.current=!0}),M.useCallback(function(u,p){if(p===void 0&&(p={}),!d.current)return;if(typeof u=="number"){r.go(u);return}let i=pr(u,JSON.parse(s),n,p.relative==="path");e==null&&t!=="/"&&(i.pathname=i.pathname==="/"?t:We([t,i.pathname])),(p.replace?r.replace:r.push)(i,p.state,p)},[t,r,s,n,e])}function Wr(){let{matches:e}=M.useContext(Ee),t=e[e.length-1];return t?t.params:{}}function _t(e,t){let{relative:a}=t===void 0?{}:t,{future:r}=M.useContext(Me),{matches:o}=M.useContext(Ee),{pathname:n}=Ne(),s=JSON.stringify(fr(o,r.v7_relativeSplatPath));return M.useMemo(()=>pr(e,JSON.parse(s),n,a==="path"),[e,s,n,a])}function gn(e,t){return xn(e,t)}function xn(e,t,a,r){It()||oe(!1);let{navigator:o}=M.useContext(Me),{matches:n}=M.useContext(Ee),s=n[n.length-1],d=s?s.params:{},l=s?s.pathname:"/",u=s?s.pathnameBase:"/",p=s&&s.route,i=Ne(),m;if(t){var c;let x=typeof t=="string"?Ge(t):t;u==="/"||(c=x.pathname)!=null&&c.startsWith(u)||oe(!1),m=x}else m=i;let f=m.pathname||"/",h=f;if(u!=="/"){let x=u.replace(/^\//,"").split("/");h="/"+f.replace(/^\//,"").split("/").slice(x.length).join("/")}let b=cr(e,{pathname:h}),w=Ru(b&&b.map(x=>Object.assign({},x,{params:Object.assign({},d,x.params),pathname:We([u,o.encodeLocation?o.encodeLocation(x.pathname).pathname:x.pathname]),pathnameBase:x.pathnameBase==="/"?u:We([u,o.encodeLocation?o.encodeLocation(x.pathnameBase).pathname:x.pathnameBase])})),n,a,r);return t&&w?M.createElement(pa.Provider,{value:{location:ca({pathname:"/",search:"",hash:"",state:null,key:"default"},m),navigationType:Ae.Pop}},w):w}function vu(){let e=wn(),t=mr(e)?e.status+" "+e.statusText:e instanceof Error?e.message:JSON.stringify(e),a=e instanceof Error?e.stack:null,r="rgba(200,200,200, 0.5)",o={padding:"0.5rem",backgroundColor:r},n={padding:"2px 4px",backgroundColor:r};return M.createElement(M.Fragment,null,M.createElement("h2",null,"Unexpected Application Error!"),M.createElement("h3",{style:{fontStyle:"italic"}},t),a?M.createElement("pre",{style:o},a):null,null)}var ku=M.createElement(vu,null),Hr=class extends M.Component{constructor(t){super(t),this.state={location:t.location,revalidation:t.revalidation,error:t.error}}static getDerivedStateFromError(t){return{error:t}}static getDerivedStateFromProps(t,a){return a.location!==t.location||a.revalidation!=="idle"&&t.revalidation==="idle"?{error:t.error,location:t.location,revalidation:t.revalidation}:{error:t.error!==void 0?t.error:a.error,location:a.location,revalidation:t.revalidation||a.revalidation}}componentDidCatch(t,a){console.error("React Router caught the following error during render",t,a)}render(){return this.state.error!==void 0?M.createElement(Ee.Provider,{value:this.props.routeContext},M.createElement(mn.Provider,{value:this.state.error,children:this.props.component})):this.props.children}};function Pu(e){let{routeContext:t,match:a,children:r}=e,o=M.useContext(Ht);return o&&o.static&&o.staticContext&&(a.route.errorElement||a.route.ErrorBoundary)&&(o.staticContext._deepestRenderedBoundaryId=a.route.id),M.createElement(Ee.Provider,{value:t},r)}function Ru(e,t,a,r){var o;if(t===void 0&&(t=[]),a===void 0&&(a=null),r===void 0&&(r=null),e==null){var n;if(!a)return null;if(a.errors)e=a.matches;else if((n=r)!=null&&n.v7_partialHydration&&t.length===0&&!a.initialized&&a.matches.length>0)e=a.matches;else return null}let s=e,d=(o=a)==null?void 0:o.errors;if(d!=null){let p=s.findIndex(i=>i.route.id&&d?.[i.route.id]!==void 0);p>=0||oe(!1),s=s.slice(0,Math.min(s.length,p+1))}let l=!1,u=-1;if(a&&r&&r.v7_partialHydration)for(let p=0;p<s.length;p++){let i=s[p];if((i.route.HydrateFallback||i.route.hydrateFallbackElement)&&(u=p),i.route.id){let{loaderData:m,errors:c}=a,f=i.route.loader&&m[i.route.id]===void 0&&(!c||c[i.route.id]===void 0);if(i.route.lazy||f){l=!0,u>=0?s=s.slice(0,u+1):s=[s[0]];break}}}return s.reduceRight((p,i,m)=>{let c,f=!1,h=null,b=null;a&&(c=d&&i.route.id?d[i.route.id]:void 0,h=i.route.errorElement||ku,l&&(u<0&&m===0?(Nu("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),f=!0,b=null):u===m&&(f=!0,b=i.route.hydrateFallbackElement||null)));let w=t.concat(s.slice(0,m+1)),x=()=>{let L;return c?L=h:f?L=b:i.route.Component?L=M.createElement(i.route.Component,null):i.route.element?L=i.route.element:L=p,M.createElement(Pu,{match:i,routeContext:{outlet:p,matches:w,isDataRoute:a!=null},children:L})};return a&&(i.route.ErrorBoundary||i.route.errorElement||m===0)?M.createElement(Hr,{location:a.location,revalidation:a.revalidation,component:h,error:c,children:x(),routeContext:{outlet:null,matches:w,isDataRoute:!0}}):x()},null)}var Ln=(function(e){return e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e})(Ln||{}),hr=(function(e){return e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId",e})(hr||{});function Du(e){let t=M.useContext(Ht);return t||oe(!1),t}function Au(e){let t=M.useContext(gr);return t||oe(!1),t}function Mu(e){let t=M.useContext(Ee);return t||oe(!1),t}function yn(e){let t=Mu(e),a=t.matches[t.matches.length-1];return a.route.id||oe(!1),a.route.id}function wn(){var e;let t=M.useContext(mn),a=Au(hr.UseRouteError),r=yn(hr.UseRouteError);return t!==void 0?t:(e=a.errors)==null?void 0:e[r]}function Eu(){let{router:e}=Du(Ln.UseNavigateStable),t=yn(hr.UseNavigateStable),a=M.useRef(!1);return hn(()=>{a.current=!0}),M.useCallback(function(o,n){n===void 0&&(n={}),a.current&&(typeof o=="number"?e.navigate(o):e.navigate(o,ca({fromRouteId:t},n)))},[e,t])}var cn={};function Nu(e,t,a){!t&&!cn[e]&&(cn[e]=!0)}var qt=(e,t,a)=>(""+t+("You can use the `"+e+"` future flag to opt-in early. ")+("For more information, see "+a+"."),void 0);function bn(e,t){e?.v7_startTransition===void 0&&qt("v7_startTransition","React Router will begin wrapping state updates in `React.startTransition` in v7","https://reactrouter.com/v6/upgrading/future#v7_starttransition"),e?.v7_relativeSplatPath===void 0&&(!t||t.v7_relativeSplatPath===void 0)&&qt("v7_relativeSplatPath","Relative route resolution within Splat routes is changing in v7","https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath"),t&&(t.v7_fetcherPersist===void 0&&qt("v7_fetcherPersist","The persistence behavior of fetchers is changing in v7","https://reactrouter.com/v6/upgrading/future#v7_fetcherpersist"),t.v7_normalizeFormMethod===void 0&&qt("v7_normalizeFormMethod","Casing of `formMethod` fields is being normalized to uppercase in v7","https://reactrouter.com/v6/upgrading/future#v7_normalizeformmethod"),t.v7_partialHydration===void 0&&qt("v7_partialHydration","`RouterProvider` hydration behavior is changing in v7","https://reactrouter.com/v6/upgrading/future#v7_partialhydration"),t.v7_skipActionErrorRevalidation===void 0&&qt("v7_skipActionErrorRevalidation","The revalidation behavior after 4xx/5xx `action` responses is changing in v7","https://reactrouter.com/v6/upgrading/future#v7_skipactionerrorrevalidation"))}var Tu="startTransition",fn=M[Tu];function Gr(e){let{basename:t,children:a,initialEntries:r,initialIndex:o,future:n}=e,s=M.useRef();s.current==null&&(s.current=on({initialEntries:r,initialIndex:o,v5Compat:!0}));let d=s.current,[l,u]=M.useState({action:d.action,location:d.location}),{v7_startTransition:p}=n||{},i=M.useCallback(m=>{p&&fn?fn(()=>u(m)):u(m)},[u,p]);return M.useLayoutEffect(()=>d.listen(i),[d,i]),M.useEffect(()=>bn(n),[n]),M.createElement(Vr,{basename:t,children:a,location:l.location,navigationType:l.action,navigator:d,future:n})}function zr(e){let{to:t,replace:a,state:r,relative:o}=e;It()||oe(!1);let{future:n,static:s}=M.useContext(Me),{matches:d}=M.useContext(Ee),{pathname:l}=Ne(),u=Ct(),p=pr(t,fr(d,n.v7_relativeSplatPath),l,o==="path"),i=JSON.stringify(p);return M.useEffect(()=>u(JSON.parse(i),{replace:a,state:r,relative:o}),[u,i,o,a,r]),null}function et(e){oe(!1)}function Vr(e){let{basename:t="/",children:a=null,location:r,navigationType:o=Ae.Pop,navigator:n,static:s=!1,future:d}=e;It()&&oe(!1);let l=t.replace(/^\/*/,"/"),u=M.useMemo(()=>({basename:l,navigator:n,static:s,future:ca({v7_relativeSplatPath:!1},d)}),[l,d,n,s]);typeof r=="string"&&(r=Ge(r));let{pathname:p="/",search:i="",hash:m="",state:c=null,key:f="default"}=r,h=M.useMemo(()=>{let b=ct(p,l);return b==null?null:{location:{pathname:b,search:i,hash:m,state:c,key:f},navigationType:o}},[l,p,i,m,c,f,o]);return h==null?null:M.createElement(Me.Provider,{value:u},M.createElement(pa.Provider,{children:a,value:h}))}function jr(e){let{children:t,location:a}=e;return gn(fa(t),a)}var Zc=new Promise(()=>{});function fa(e,t){t===void 0&&(t=[]);let a=[];return M.Children.forEach(e,(r,o)=>{if(!M.isValidElement(r))return;let n=[...t,o];if(r.type===M.Fragment){a.push.apply(a,fa(r.props.children,n));return}r.type!==et&&oe(!1),!r.props.index||!r.props.children||oe(!1);let s={id:r.props.id||n.join("-"),caseSensitive:r.props.caseSensitive,element:r.props.element,Component:r.props.Component,index:r.props.index,path:r.props.path,loader:r.props.loader,action:r.props.action,errorElement:r.props.errorElement,ErrorBoundary:r.props.ErrorBoundary,hasErrorBoundary:r.props.ErrorBoundary!=null||r.props.errorElement!=null,shouldRevalidate:r.props.shouldRevalidate,handle:r.props.handle,lazy:r.props.lazy};r.props.children&&(s.children=fa(r.props.children,n)),a.push(s)}),a}function xr(){return xr=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)({}).hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e},xr.apply(null,arguments)}function Cn(e,t){if(e==null)return{};var a={};for(var r in e)if({}.hasOwnProperty.call(e,r)){if(t.indexOf(r)!==-1)continue;a[r]=e[r]}return a}function Hu(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function _u(e,t){return e.button===0&&(!t||t==="_self")&&!Hu(e)}function Xr(e){return e===void 0&&(e=""),new URLSearchParams(typeof e=="string"||Array.isArray(e)||e instanceof URLSearchParams?e:Object.keys(e).reduce((t,a)=>{let r=e[a];return t.concat(Array.isArray(r)?r.map(o=>[a,o]):[[a,r]])},[]))}function Wu(e,t){let a=Xr(e);return t&&t.forEach((r,o)=>{a.has(o)||t.getAll(o).forEach(n=>{a.append(o,n)})}),a}var Gu=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],zu=["aria-current","caseSensitive","className","end","style","to","viewTransition","children"];var Vu="6";try{window.__reactRouterVersion=Vu}catch{}var ju=Q.createContext({isTransitioning:!1});var Xu="startTransition",Sf=Q[Xu],$u="flushSync",vf=qu[$u],Ku="useId",kf=Q[Ku];var Qu=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",Yu=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,pe=Q.forwardRef(function(t,a){let{onClick:r,relative:o,reloadDocument:n,replace:s,state:d,target:l,to:u,preventScrollReset:p,viewTransition:i}=t,m=Cn(t,Gu),{basename:c}=Q.useContext(Me),f,h=!1;if(typeof u=="string"&&Yu.test(u)&&(f=u,Qu))try{let L=new URL(window.location.href),y=u.startsWith("//")?new URL(L.protocol+u):new URL(u),B=ct(y.pathname,c);y.origin===L.origin&&B!=null?u=B+y.search+y.hash:h=!0}catch{}let b=_r(u,{relative:o}),w=Ju(u,{replace:s,state:d,target:l,preventScrollReset:p,relative:o,viewTransition:i});function x(L){r&&r(L),L.defaultPrevented||w(L)}return Q.createElement("a",xr({},m,{href:f||b,onClick:h||n?r:x,ref:a,target:l}))}),ma=Q.forwardRef(function(t,a){let{"aria-current":r="page",caseSensitive:o=!1,className:n="",end:s=!1,style:d,to:l,viewTransition:u,children:p}=t,i=Cn(t,zu),m=_t(l,{relative:i.relative}),c=Ne(),f=Q.useContext(gr),{navigator:h,basename:b}=Q.useContext(Me),w=f!=null&&ei(m)&&u===!0,x=h.encodeLocation?h.encodeLocation(m).pathname:m.pathname,L=c.pathname,y=f&&f.navigation&&f.navigation.location?f.navigation.location.pathname:null;o||(L=L.toLowerCase(),y=y?y.toLowerCase():null,x=x.toLowerCase()),y&&b&&(y=ct(y,b)||y);let B=x!=="/"&&x.endsWith("/")?x.length-1:x.length,N=L===x||!s&&L.startsWith(x)&&L.charAt(B)==="/",H=y!=null&&(y===x||!s&&y.startsWith(x)&&y.charAt(x.length)==="/"),V={isActive:N,isPending:H,isTransitioning:w},de=N?r:void 0,A;typeof n=="function"?A=n(V):A=[n,N?"active":null,H?"pending":null,w?"transitioning":null].filter(Boolean).join(" ");let g=typeof d=="function"?d(V):d;return Q.createElement(pe,xr({},i,{"aria-current":de,className:A,ref:a,style:g,to:l,viewTransition:u}),typeof p=="function"?p(V):p)});var $r;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})($r||($r={}));var In;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(In||(In={}));function Zu(e){let t=Q.useContext(Ht);return t||oe(!1),t}function Ju(e,t){let{target:a,replace:r,state:o,preventScrollReset:n,relative:s,viewTransition:d}=t===void 0?{}:t,l=Ct(),u=Ne(),p=_t(e,{relative:s});return Q.useCallback(i=>{if(_u(i,a)){i.preventDefault();let m=r!==void 0?r:Ot(u)===Ot(p);l(e,{replace:m,state:o,preventScrollReset:n,relative:s,viewTransition:d})}},[u,l,p,r,o,a,e,n,s,d])}function Wt(e){let t=Q.useRef(Xr(e)),a=Q.useRef(!1),r=Ne(),o=Q.useMemo(()=>Wu(r.search,a.current?null:t.current),[r.search]),n=Ct(),s=Q.useCallback((d,l)=>{let u=Xr(typeof d=="function"?d(o):d);a.current=!0,n("?"+u,l)},[n,o]);return[o,s]}function ei(e,t){t===void 0&&(t={});let a=Q.useContext(ju);a==null&&oe(!1);let{basename:r}=Zu($r.useViewTransitionState),o=_t(e,{relative:t.relative});if(!a.isTransitioning)return!1;let n=ct(a.currentLocation.pathname,r)||a.currentLocation.pathname,s=ct(a.nextLocation.pathname,r)||a.nextLocation.pathname;return it(o.pathname,s)!=null||it(o.pathname,n)!=null}var Te=require("react");var E=require("react/jsx-runtime"),Sn="dsh-ai-study-kit-theme",ti={zh:{title:"\u5B66\u4E60\u53F0",tabs:{home:"\u9996\u9875",practice:"\u7B54\u9898",flashcards:"\u95EA\u5361",panorama:"\u5168\u666F"},project:"\u9879\u76EE",theme:"\u4E3B\u9898",chooseProject:"\u9009\u62E9\u5B66\u4E60\u9879\u76EE",projectRoot:"\u9879\u76EE\u6839\u76EE\u5F55",projectHint:"\u6307\u5411\u542B examples/ \u7684\u5B66\u4E60\u9879\u76EE\uFF1B\u4E5F\u53EF\u4EE5\u76F4\u63A5\u7C98\u8D34\u7EDD\u5BF9\u8DEF\u5F84\u3002",pathPlaceholder:"~/Documents/study-kit",apply:"\u4F7F\u7528\u6B64\u76EE\u5F55",applying:"\u6B63\u5728\u6253\u5F00\u2026",detect:"\u68C0\u6D4B\u5230\u7684\u9879\u76EE",noProject:"\u672A\u68C0\u6D4B\u5230\u9879\u76EE",source:{remembered:"\u4E0A\u6B21\u4F7F\u7528",home:"\u9ED8\u8BA4\u76EE\u5F55",cwd:"\u5F53\u524D\u5DE5\u4F5C\u533A",manual:"\u624B\u52A8\u6307\u5B9A",none:"\u672A\u68C0\u6D4B"},noThemes:"\u8FD9\u4E2A\u9879\u76EE\u91CC\u8FD8\u6CA1\u6709\u4E3B\u9898\uFF08examples/ \u4E3A\u7A7A\uFF09",questions:"\u9898",cards:"\u5361",current:"\u5F53\u524D",settings:"\u8BBE\u7F6E",dailyNewCards:"\u6BCF\u65E5\u65B0\u5361",autoAdvance:"\u7B54\u5BF9\u81EA\u52A8\u4E0B\u4E00\u9898",extOn:"\u663E\u793A\u62D3\u5C55\u5185\u5BB9",lang:"English",dark:"\u6DF1\u8272",light:"\u6D45\u8272",close:"\u5173\u95ED"},en:{title:"Study Desk",tabs:{home:"Home",practice:"Practice",flashcards:"Cards",panorama:"Panorama"},project:"Project",theme:"Theme",chooseProject:"Choose study project",projectRoot:"Project root",projectHint:"A folder containing examples/. An absolute path works too.",pathPlaceholder:"/Users/you/Documents/study-kit",apply:"Use this folder",applying:"Opening\u2026",detect:"Detected project",noProject:"No project",source:{remembered:"Last used",home:"Default folder",cwd:"Current workspace",manual:"Manual",none:"Not detected"},noThemes:"No themes yet (examples/ is empty)",questions:"questions",cards:"cards",current:"Current",settings:"Settings",dailyNewCards:"New cards / day",autoAdvance:"Auto-advance when correct",extOn:"Show extras",lang:"\u4E2D\u6587",dark:"Dark",light:"Light",close:"Close"}};function ai(e){let t=e?.settings?.lang==="en"?"en":"zh";return ti[t]}function ri(e,t){let a=(0,Te.useRef)(null);return(0,Te.useEffect)(()=>{if(!e)return;let r=n=>{a.current&&!a.current.contains(n.target)&&t()},o=n=>{n.key==="Escape"&&t()};return document.addEventListener("mousedown",r),document.addEventListener("keydown",o),()=>{document.removeEventListener("mousedown",r),document.removeEventListener("keydown",o)}},[e,t]),a}function kn({snapshot:e,onSetProject:t,onSetTheme:a,onSetSettings:r}){let o=ai(e),[n,s]=(0,Te.useState)(null),[d,l]=(0,Te.useState)(""),[u,p]=(0,Te.useState)(!1),[i,m]=(0,Te.useState)(""),[c,f]=(0,Te.useState)(()=>{try{return localStorage.getItem(Sn)==="1"}catch{return!1}}),h=()=>s(null),b=ri(n!==null,h),{pathname:w}=Ne();(0,Te.useEffect)(()=>{let g=document.querySelector(".dsh-study-root");if(g){g.classList.toggle("dark",c);try{localStorage.setItem(Sn,c?"1":"0")}catch{}}},[c]);let x=e?.project??{root:"",source:"none",legacy:!1},L=e?.themes??[],y=e?.theme??null,B=L.find(g=>g.slug===y),N=({isActive:g})=>`px-2.5 sm:px-3.5 py-1.5 rounded-xl text-[13px] sm:text-sm font-bold whitespace-nowrap transition-colors ${g?"bg-st-green-soft text-st-green-ink":"text-text-secondary hover:text-text-primary hover:bg-bg-hover"}`,H="grid place-items-center h-8 w-8 rounded-[10px] border-2 border-border bg-bg-surface text-text-muted hover:text-text-secondary hover:border-border-strong transition-colors",V="absolute right-0 top-[calc(100%+6px)] z-40 w-[19rem] rounded-xl border-2 border-border bg-bg-surface p-2 shadow-pop",de=async()=>{let g=d.trim();if(g){p(!0),m("");try{await t?.(g),h()}catch(D){m(D?.message??String(D))}finally{p(!1)}}},A=g=>{r?.(g)};return(0,E.jsx)("header",{ref:b,className:"relative z-20 shrink-0 h-[54px] bg-bg-surface border-b-2 border-border",children:(0,E.jsxs)("div",{className:"h-full px-3 sm:px-4 flex items-center gap-1.5 sm:gap-2",children:[(0,E.jsxs)("span",{className:"hidden min-[520px]:flex items-center gap-2 pr-1 text-sm font-bold text-text-primary tracking-tight select-none shrink-0",children:[(0,E.jsx)(ni,{}),o.title]}),(0,E.jsxs)("nav",{className:"flex items-center gap-0.5 sm:gap-1 min-w-0",children:[(0,E.jsx)(ma,{to:"/",end:!0,className:N,children:o.tabs.home}),(0,E.jsx)(ma,{to:"/practice/all",className:N,children:o.tabs.practice}),(0,E.jsx)(ma,{to:"/flashcards",className:N,children:o.tabs.flashcards}),(0,E.jsx)(ma,{to:"/panorama",className:N,children:o.tabs.panorama})]}),(0,E.jsx)("div",{className:"flex-1"}),(0,E.jsxs)("div",{className:"flex items-center gap-1 shrink-0",children:[(0,E.jsxs)("div",{className:"relative",children:[(0,E.jsxs)("button",{type:"button",onClick:()=>s(n==="project"?null:"project"),className:"h-8 max-w-[15rem] px-2.5 rounded-[10px] border-2 border-border bg-bg-surface text-text-secondary hover:text-text-primary hover:border-border-strong text-[12px] font-bold flex items-center gap-1.5 transition-colors",title:x.root||o.chooseProject,children:[(0,E.jsx)(si,{}),(0,E.jsx)("span",{className:"truncate",children:x.root?oi(x.root):o.noProject})]}),n==="project"&&(0,E.jsxs)("div",{className:V,children:[(0,E.jsx)("p",{className:"px-1.5 pt-1 pb-1.5 text-[11px] font-bold uppercase tracking-wide text-text-muted",children:o.projectRoot}),(0,E.jsxs)("p",{className:"px-1.5 pb-1 text-[12px] leading-relaxed text-text-secondary break-all",children:[x.root||o.noProject,x.root?(0,E.jsxs)("span",{className:"ml-1 text-text-faint",children:["\uFF08",o.source[x.source]??x.source,x.legacy?" \xB7 \u65E7\u5E03\u5C40":"","\uFF09"]}):null]}),(0,E.jsxs)("form",{onSubmit:g=>{g.preventDefault(),de()},className:"mt-1",children:[(0,E.jsx)("input",{value:d,onChange:g=>l(g.target.value),placeholder:o.pathPlaceholder,spellCheck:!1,className:"w-full h-8 px-2 rounded-lg border-2 border-border bg-bg-subtle text-[12px] text-text-primary placeholder:text-text-faint outline-none focus:border-st-blue"}),(0,E.jsx)("p",{className:"px-1 pt-1.5 text-[11px] leading-relaxed text-text-faint",children:o.projectHint}),i?(0,E.jsx)("p",{className:"px-1 pt-1.5 text-[11px] leading-relaxed text-st-red",children:i}):null,(0,E.jsx)("button",{type:"submit",disabled:u||!d.trim(),className:"mt-2 w-full h-8 rounded-lg bg-st-green text-white text-[12px] font-bold disabled:opacity-40",children:u?o.applying:o.apply})]})]})]}),(0,E.jsxs)("div",{className:"relative",children:[(0,E.jsxs)("button",{type:"button",onClick:()=>s(n==="theme"?null:"theme"),disabled:!L.length,className:"h-8 max-w-[12rem] px-2.5 rounded-[10px] border-2 border-border bg-bg-surface text-text-secondary hover:text-text-primary hover:border-border-strong text-[12px] font-bold flex items-center gap-1.5 transition-colors disabled:opacity-40",title:B?.title??o.theme,children:[(0,E.jsx)("span",{className:"truncate",children:B?.title??o.theme}),(0,E.jsx)(di,{})]}),n==="theme"&&(0,E.jsx)("div",{className:`${V} max-h-[60vh] overflow-auto`,children:L.length===0?(0,E.jsx)("p",{className:"px-1.5 py-2 text-[12px] text-text-muted",children:o.noThemes}):L.map(g=>{let D=g.slug===y;return(0,E.jsxs)("button",{type:"button",onClick:()=>{a?.(g.slug),h()},className:`w-full text-left px-2 py-1.5 rounded-lg flex items-center gap-2 ${D?"bg-st-green-soft":"hover:bg-bg-hover"}`,children:[(0,E.jsx)("span",{className:`flex-1 truncate text-[12.5px] font-bold ${D?"text-st-green-ink":"text-text-primary"}`,children:g.title}),(0,E.jsxs)("span",{className:"text-[11px] text-text-faint whitespace-nowrap",children:[g.questionCount," ",o.questions," \xB7 ",g.cardCount," ",o.cards]})]},g.slug)})})]}),(0,E.jsx)("button",{type:"button",onClick:()=>A({lang:e?.settings?.lang==="en"?"zh":"en"}),className:H+" text-[11px] font-bold",title:o.lang,children:e?.settings?.lang==="en"?"\u4E2D":"EN"}),(0,E.jsx)("button",{type:"button",onClick:()=>f(g=>!g),className:H,title:c?o.light:o.dark,"aria-pressed":c,children:c?(0,E.jsx)(ii,{}):(0,E.jsx)(ui,{})}),(0,E.jsxs)("div",{className:"relative",children:[(0,E.jsx)("button",{type:"button",onClick:()=>s(n==="settings"?null:"settings"),className:H,title:o.settings,children:(0,E.jsx)(li,{})}),n==="settings"&&(0,E.jsxs)("div",{className:V,children:[(0,E.jsx)("p",{className:"px-1.5 pt-1 pb-2 text-[11px] font-bold uppercase tracking-wide text-text-muted",children:o.settings}),(0,E.jsxs)("label",{className:"px-1.5 py-1.5 flex items-center justify-between gap-3",children:[(0,E.jsx)("span",{className:"text-[12.5px] font-bold text-text-primary",children:o.dailyNewCards}),(0,E.jsx)("input",{type:"number",min:1,max:200,value:e?.settings?.dailyNewCards??20,onChange:g=>{let D=Number(g.target.value);Number.isFinite(D)&&D>0&&A({dailyNewCards:Math.min(200,Math.round(D))})},className:"w-16 h-7 px-1.5 rounded-lg border-2 border-border bg-bg-subtle text-[12px] text-right text-text-primary outline-none focus:border-st-blue"})]}),(0,E.jsx)(vn,{label:o.autoAdvance,on:e?.settings?.autoAdvance!==!1,onChange:g=>A({autoAdvance:g})}),(0,E.jsx)(vn,{label:o.extOn,on:e?.settings?.extOn!==!1,onChange:g=>A({extOn:g})})]})]})]})]})})}function vn({label:e,on:t,onChange:a}){return(0,E.jsxs)("button",{type:"button",onClick:()=>a(!t),className:"w-full px-1.5 py-1.5 flex items-center justify-between gap-3 rounded-lg hover:bg-bg-hover","aria-pressed":t,children:[(0,E.jsx)("span",{className:"text-[12.5px] font-bold text-text-primary text-left",children:e}),(0,E.jsx)("span",{className:`relative h-[18px] w-[32px] rounded-full transition-colors ${t?"bg-st-green":"bg-bg-hover border border-border"}`,children:(0,E.jsx)("span",{className:`absolute top-[2px] h-[14px] w-[14px] rounded-full bg-white transition-all ${t?"left-[16px]":"left-[2px]"}`})})]})}function oi(e){let t=String(e).split(/[\\/]/).filter(Boolean);return t[t.length-1]||e}function ni(){return(0,E.jsxs)("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:[(0,E.jsx)("path",{d:"M12 4 2.6 8.4 12 12.8l9.4-4.4L12 4Z"}),(0,E.jsx)("path",{d:"M6.2 10.6v4.1c0 1.6 2.6 2.9 5.8 2.9s5.8-1.3 5.8-2.9v-4.1"})]})}function si(){return(0,E.jsx)("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:(0,E.jsx)("path",{d:"M3 7a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"})})}function di(){return(0,E.jsx)("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.4",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:(0,E.jsx)("path",{d:"m6 9 6 6 6-6"})})}function li(){return(0,E.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:[(0,E.jsx)("circle",{cx:"12",cy:"12",r:"3"}),(0,E.jsx)("path",{d:"M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.56V21a2 2 0 1 1-4 0v-.09a1.7 1.7 0 0 0-1.06-1.56 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.56-1H3a2 2 0 1 1 0-4h.09a1.7 1.7 0 0 0 1.56-1.06 1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34H9a1.7 1.7 0 0 0 1-1.56V3a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1 1.56 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87V9a1.7 1.7 0 0 0 1.56 1H21a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.51 1Z"})]})}function ui(){return(0,E.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:(0,E.jsx)("path",{d:"M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"})})}function ii(){return(0,E.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:[(0,E.jsx)("circle",{cx:"12",cy:"12",r:"4"}),(0,E.jsx)("path",{d:"M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"})]})}var ie=require("react");var Lr=require("react");var Pn=e=>e?.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();function Rn(e,t,a=[]){if(t==null)throw new Error("[lucide]: iconNode is required when icon name is used");return{name:Pn(e),size:24,node:t,...a.length>0?{aliases:a}:{}}}var Dn=e=>{let t="",a=!1;for(let r of e){if(r==="-"||r==="_"||r<=" "){a=t.length>0;continue}t.length===0?t+=r.toLowerCase():t+=a?r.toUpperCase():r,a=!1}return t};var An=e=>{let t=Dn(e);return t.charAt(0).toUpperCase()+t.slice(1)};var ga=require("react");var ha=(...e)=>e.filter((t,a,r)=>!!t&&t.trim()!==""&&r.indexOf(t)===a).join(" ").trim();var ft={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};function Kr(e){return e!=null}function Mn(e,t={}){let a=t.attributeNames??{},r=m=>a[m]??m,o=e.size??e.width??ft.width,n=e.size??e.height??ft.height,s=e.aliases?.filter(m=>typeof m=="string"&&m.trim()!=="").map(m=>`lucide-${m}`)??[],d=[...e.name?[`lucide-${e.name}`]:[],...s],l=t.className?.split(" ").filter(Boolean)??[],u=t.includeDefaultClasses===!1?ha(...l):ha("lucide",...d,...l),p=t.absoluteStrokeWidth?Number(t.strokeWidth??ft["stroke-width"])*Number(e.size??e.width??ft.width)/Number(t.size??t.width??ft.width):t.strokeWidth??ft["stroke-width"];return["svg",{...Object.entries(ft).reduce((m,[c,f])=>(m[r(c)]=f,m),{}),..."color"in t&&t.color&&{[r("stroke")]:t.color},..."size"in t&&Kr(t.size)&&{[r("width")]:t.size,[r("height")]:t.size},..."width"in t&&Kr(t.width)&&{[r("width")]:t.width},..."height"in t&&Kr(t.height)&&{[r("height")]:t.height},[r("stroke-width")]:p,...u&&{[r("class")]:u},[r("viewBox")]:`0 0 ${o} ${n}`,...t.hasA11yProp===!1?{[r("aria-hidden")]:"true"}:{},..."attributes"in t&&t.attributes},e.node.map(m=>{let[c,f,h]=m,b=t.nonScalingStroke?{[r("vector-effect")]:"non-scaling-stroke",...f}:f;return h?[c,b,h]:[c,b]})]}function En(e,t={}){return Mn(e,{...t,attributeNames:{...t.attributeNames,class:"className","stroke-width":"strokeWidth","stroke-linecap":"strokeLinecap","stroke-linejoin":"strokeLinejoin","vector-effect":"vectorEffect"}})}var Nn=e=>{for(let t in e)if(t.startsWith("aria-")||t==="role"||t==="title")return!0;return!1};var Gt=require("react");var ci=(0,Gt.createContext)({});var Tn=()=>(0,Gt.useContext)(ci);var Fn=(0,ga.forwardRef)(({color:e,size:t,width:a,height:r,strokeWidth:o,absoluteStrokeWidth:n,nonScalingStroke:s,className:d="",children:l,iconNode:u=[],icon:p={node:u,aliases:[],size:24},...i},m)=>{let{size:c=24,strokeWidth:f=2,absoluteStrokeWidth:h=!1,nonScalingStroke:b=!1,color:w="currentColor",className:x=""}=Tn()??{},L=!!l||Nn(i),[y,B,N=[]]=En(p,{color:e??w,width:a??t??c,height:r??t??c,strokeWidth:o??f,absoluteStrokeWidth:n??h,nonScalingStroke:s??b,className:ha(x,d),hasA11yProp:L,attributes:i});return(0,ga.createElement)(y,{ref:m,...B},[...N.map(([H,V])=>(0,ga.createElement)(H,V)),...Array.isArray(l)?l:[l]])});function P(e,t=[],a=[]){let r=typeof e=="string"?Rn(e,t,a):e,o=(0,Lr.forwardRef)(({className:n,...s},d)=>(0,Lr.createElement)(Fn,{ref:d,icon:r,className:n,...s}));return r.name&&(o.displayName=An(r.name)),o}var Bn={name:"app-window",size:24,node:[["rect",{x:"2",y:"4",width:"20",height:"16",rx:"2",key:"izxlao"}],["path",{d:"M10 4v4",key:"pp8u80"}],["path",{d:"M2 8h20",key:"d11cs7"}],["path",{d:"M6 4v4",key:"1svtjw"}]]};Bn.node;var xa=P(Bn);var Un={name:"arrow-right",size:24,node:[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]};Un.node;var La=P(Un);var On={name:"binary",size:24,node:[["rect",{x:"14",y:"14",width:"4",height:"6",rx:"2",key:"p02svl"}],["rect",{x:"6",y:"4",width:"4",height:"6",rx:"2",key:"xm4xkj"}],["path",{d:"M6 20h4",key:"1i6q5t"}],["path",{d:"M14 10h4",key:"ru81e7"}],["path",{d:"M6 14h2v6",key:"16z9wg"}],["path",{d:"M14 4h2v6",key:"1idq9u"}]]};On.node;var ya=P(On);var qn={name:"book-open",size:24,node:[["path",{d:"M12 5v16",key:"1f6ucr"}],["path",{d:"M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z",key:"1fyvmf"}]]};qn.node;var Fe=P(qn);var Hn={name:"boxes",size:24,node:[["path",{d:"M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z",key:"lc1i9w"}],["path",{d:"m7 16.5-4.74-2.85",key:"1o9zyk"}],["path",{d:"m7 16.5 5-3",key:"va8pkn"}],["path",{d:"M7 16.5v5.17",key:"jnp8gn"}],["path",{d:"M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z",key:"8zsnat"}],["path",{d:"m17 16.5-5-3",key:"8arw3v"}],["path",{d:"m17 16.5 4.74-2.85",key:"8rfmw"}],["path",{d:"M17 16.5v5.17",key:"k6z78m"}],["path",{d:"M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z",key:"1xygjf"}],["path",{d:"M12 8 7.26 5.15",key:"1vbdud"}],["path",{d:"m12 8 4.74-2.85",key:"3rx089"}],["path",{d:"M12 13.5V8",key:"1io7kd"}]]};Hn.node;var pt=P(Hn);var _n={name:"calendar-clock",size:24,node:[["path",{d:"M16 14v2.2l1.6 1",key:"fo4ql5"}],["path",{d:"M16 2v3",key:"otl347"}],["path",{d:"M21 7.338V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h2.338",key:"7hb8p4"}],["path",{d:"M3 9h5.859",key:"numkqi"}],["path",{d:"M8 2v3",key:"1ioesn"}],["circle",{cx:"16",cy:"16",r:"6",key:"qoo3c4"}]]};_n.node;var wa=P(_n);var Wn={name:"calendar-days",size:24,node:[["path",{d:"M8 2v3",key:"1ioesn"}],["path",{d:"M16 2v3",key:"otl347"}],["rect",{x:"3",y:"3",width:"18",height:"18",rx:"2",key:"h1oib"}],["path",{d:"M3 9h18",key:"1pudct"}],["path",{d:"M8 13h.01",key:"1sbv64"}],["path",{d:"M12 13h.01",key:"y0uutt"}],["path",{d:"M16 13h.01",key:"wip0gl"}],["path",{d:"M8 17h.01",key:"p3bg7i"}],["path",{d:"M12 17h.01",key:"p32p05"}],["path",{d:"M16 17h.01",key:"ql8jdd"}]]};Wn.node;var ba=P(Wn);var Gn={name:"check",size:24,node:[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]};Gn.node;var ze=P(Gn);var zn={name:"chevron-down",size:24,node:[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]};zn.node;var Ia=P(zn);var Vn={name:"chevron-left",size:24,node:[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]};Vn.node;var Ca=P(Vn);var jn={name:"chevron-right",size:24,node:[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]};jn.node;var ve=P(jn);var Xn={name:"circle-check",size:24,node:[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m16 9-5.5 5.5L8 12",key:"xofnsj"}]],aliases:["check-circle-2"]};Xn.node;var Re=P(Xn);var $n={name:"cloud",size:24,node:[["path",{d:"M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z",key:"p7xjir"}]]};$n.node;var Sa=P($n);var Kn={name:"code-xml",size:24,node:[["path",{d:"m18 16 4-4-4-4",key:"1inbqp"}],["path",{d:"m6 8-4 4 4 4",key:"15zrgr"}],["path",{d:"m14.5 4-5 16",key:"e7oirm"}]],aliases:["code-2"]};Kn.node;var mt=P(Kn);var Qn={name:"compass",size:24,node:[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z",key:"9ktpf1"}]]};Qn.node;var va=P(Qn);var Yn={name:"cpu",size:24,node:[["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M17 20v2",key:"1rnc9c"}],["path",{d:"M17 2v2",key:"11trls"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M2 17h2",key:"7oei6x"}],["path",{d:"M2 7h2",key:"asdhe0"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"M20 17h2",key:"1fpfkl"}],["path",{d:"M20 7h2",key:"1o8tra"}],["path",{d:"M7 20v2",key:"4gnj0m"}],["path",{d:"M7 2v2",key:"1i4yhu"}],["rect",{x:"4",y:"4",width:"16",height:"16",rx:"2",key:"1vbyd7"}],["rect",{x:"8",y:"8",width:"8",height:"8",rx:"1",key:"z9xiuo"}]]};Yn.node;var ka=P(Yn);var Zn={name:"database",size:24,node:[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3",key:"msslwz"}],["path",{d:"M3 5V19A9 3 0 0 0 21 19V5",key:"1wlel7"}],["path",{d:"M3 12A9 3 0 0 0 21 12",key:"mv7ke4"}]]};Zn.node;var Pa=P(Zn);var Jn={name:"flame",size:24,node:[["path",{d:"M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4",key:"1slcih"}]]};Jn.node;var tt=P(Jn);var es={name:"flask-conical",size:24,node:[["path",{d:"M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2",key:"18mbvz"}],["path",{d:"M6.453 15h11.094",key:"3shlmq"}],["path",{d:"M8.5 2h7",key:"csnxdl"}]]};es.node;var Ra=P(es);var ts={name:"gauge",size:24,node:[["path",{d:"m12 14 4-4",key:"9kzdfg"}],["path",{d:"M3.34 19a10 10 0 1 1 17.32 0",key:"19p75a"}]]};ts.node;var Da=P(ts);var as={name:"git-branch",size:24,node:[["path",{d:"M15 6a9 9 0 0 0-9 9V3",key:"1cii5b"}],["circle",{cx:"18",cy:"6",r:"3",key:"1h7g24"}],["circle",{cx:"6",cy:"18",r:"3",key:"fqmcym"}]]};as.node;var Aa=P(as);var rs={name:"globe",size:24,node:[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]]};rs.node;var Ma=P(rs);var os={name:"house",size:24,node:[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"r6nss1"}]],aliases:["home"]};os.node;var ht=P(os);var ns={name:"layers",size:24,node:[["path",{d:"M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",key:"zw3jo"}],["path",{d:"M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",key:"1wduqc"}],["path",{d:"M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",key:"kqbvx6"}]],aliases:["layers-3"]};ns.node;var Be=P(ns);var ss={name:"list-checks",size:24,node:[["path",{d:"M13 5h8",key:"a7qcls"}],["path",{d:"M13 12h8",key:"h98zly"}],["path",{d:"M13 19h8",key:"c3s6r1"}],["path",{d:"m3 17 2 2 4-4",key:"1jhpwq"}],["path",{d:"m3 7 2 2 4-4",key:"1obspn"}]]};ss.node;var at=P(ss);var ds={name:"lock",size:24,node:[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]]};ds.node;var Ea=P(ds);var ls={name:"log-out",size:24,node:[["path",{d:"m16 17 5-5-5-5",key:"1bji2h"}],["path",{d:"M21 12H9",key:"dn1m92"}],["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}]]};ls.node;var Na=P(ls);var us={name:"magnet",size:24,node:[["path",{d:"m12 15 4 4",key:"lnac28"}],["path",{d:"M2.352 10.648a1.205 1.205 0 0 0 0 1.704l2.296 2.296a1.205 1.205 0 0 0 1.704 0l6.029-6.029a1 1 0 1 1 3 3l-6.029 6.029a1.205 1.205 0 0 0 0 1.704l2.296 2.296a1.205 1.205 0 0 0 1.704 0l6.365-6.367A1 1 0 0 0 8.716 4.282z",key:"nlhkjb"}],["path",{d:"m5 8 4 4",key:"j6kj7e"}]]};us.node;var Ta=P(us);var is={name:"party-popper",size:24,node:[["path",{d:"M5.8 11.3 2 22l10.7-3.79",key:"gwxi1d"}],["path",{d:"M4 3h.01",key:"1vcuye"}],["path",{d:"M22 8h.01",key:"1mrtc2"}],["path",{d:"M15 2h.01",key:"1cjtqr"}],["path",{d:"M22 20h.01",key:"1mrys2"}],["path",{d:"m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10",key:"hbicv8"}],["path",{d:"m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11c-.11.7-.72 1.22-1.43 1.22H17",key:"1i94pl"}],["path",{d:"m11 2 .33.82c.34.86-.2 1.82-1.11 1.98C9.52 4.9 9 5.52 9 6.23V7",key:"1cofks"}],["path",{d:"M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z",key:"4kbmks"}]]};is.node;var Fa=P(is);var cs={name:"pen-line",size:24,node:[["path",{d:"M13 21h8",key:"1jsn5i"}],["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}]],aliases:["edit-3"]};cs.node;var gt=P(cs);var fs={name:"play",size:24,node:[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",key:"10ikf1"}]]};fs.node;var rt=P(fs);var ps={name:"refresh-cw",size:24,node:[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]};ps.node;var Ve=P(ps);var ms={name:"repeat",size:24,node:[["path",{d:"m17 2 4 4-4 4",key:"nntrym"}],["path",{d:"M3 11v-1a4 4 0 0 1 4-4h14",key:"84bu3i"}],["path",{d:"m7 22-4-4 4-4",key:"1wqhfi"}],["path",{d:"M21 13v1a4 4 0 0 1-4 4H3",key:"1rx37r"}]]};ms.node;var St=P(ms);var hs={name:"rotate-ccw-clock",size:24,node:[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}],["path",{d:"M12 7v5l4 2",key:"1fdv2h"}]],aliases:["history"]};hs.node;var xt=P(hs);var gs={name:"rotate-ccw",size:24,node:[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]]};gs.node;var Lt=P(gs);var xs={name:"settings",size:24,node:[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",key:"1i5ecw"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]};xs.node;var Ba=P(xs);var Ls={name:"shapes",size:24,node:[["path",{d:"M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z",key:"1bo67w"}],["rect",{x:"3",y:"14",width:"7",height:"7",rx:"1",key:"1bkyp8"}],["circle",{cx:"17.5",cy:"17.5",r:"3.5",key:"w3z12y"}]]};Ls.node;var Ua=P(Ls);var ys={name:"shield-check",size:24,node:[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]};ys.node;var Oa=P(ys);var ws={name:"shuffle",size:24,node:[["path",{d:"m18 14 4 4-4 4",key:"10pe0f"}],["path",{d:"m18 2 4 4-4 4",key:"pucp1d"}],["path",{d:"M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22",key:"1ailkh"}],["path",{d:"M2 6h1.972a4 4 0 0 1 3.6 2.2",key:"km57vx"}],["path",{d:"M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45",key:"os18l9"}]]};ws.node;var vt=P(ws);var bs={name:"skip-forward",size:24,node:[["path",{d:"M21 4v16",key:"7j8fe9"}],["path",{d:"M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z",key:"zs4d6"}]]};bs.node;var qa=P(bs);var Is={name:"sparkles",size:24,node:[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",key:"1s2grr"}],["path",{d:"M20 2v4",key:"1rf3ol"}],["path",{d:"M22 4h-4",key:"gwowj6"}],["circle",{cx:"4",cy:"20",r:"2",key:"6kqj1y"}]],aliases:["stars"]};Is.node;var je=P(Is);var Cs={name:"timer",size:24,node:[["line",{x1:"10",x2:"14",y1:"2",y2:"2",key:"14vaq8"}],["line",{x1:"12",x2:"15",y1:"14",y2:"11",key:"17fdiu"}],["circle",{cx:"12",cy:"14",r:"8",key:"1e1u0o"}]]};Cs.node;var Ha=P(Cs);var Ss={name:"workflow",size:24,node:[["rect",{width:"8",height:"8",x:"3",y:"3",rx:"2",key:"by2w9f"}],["path",{d:"M7 11v4a2 2 0 0 0 2 2h4",key:"xkn7yn"}],["rect",{width:"8",height:"8",x:"13",y:"13",rx:"2",key:"1cgmvn"}]]};Ss.node;var _a=P(Ss);var vs={name:"x",size:24,node:[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]};vs.node;var Xe=P(vs);var X=[];function ks(e){X=Array.isArray(e)?e:[]}var ue=[];function Ps(e){ue=Array.isArray(e)?e:[]}var he={units:[]};function Rs(e){he=e&&typeof e=="object"&&Array.isArray(e.units)?e:{units:[]}}var yr={theme:"",examPoints:{},examDays:{}},Ue=yr;function Ds(e){if(!e||typeof e!="object")return{};let t={};for(let[a,r]of Object.entries(e))typeof r=="string"&&(t[a]=r);return t}function As(e){yr.theme=typeof e?.theme=="string"?e.theme:"",yr.examPoints=Ds(e?.examPoints),yr.examDays=Ds(e?.examDays)}var Ms={theme:"",generatedAt:"",courseTaughtAll:!1,points:[],graph:null},ot=Ms;function Es(e){ot=e&&typeof e=="object"&&Array.isArray(e.points)?e:{...Ms,points:[]}}var me={};function Ns(e){me=e&&typeof e=="object"?e:{}}var fi={Boxes:pt,Layers:Be,BookOpen:Fe,Shuffle:vt,Timer:Ha,Cpu:ka,AppWindow:xa,Globe:Ma,ShieldCheck:Oa,Database:Pa,Workflow:_a,GitBranch:Aa,Shapes:Ua,Binary:ya,Code2:mt,Gauge:Da,Cloud:Sa,FlaskConical:Ra,History:xt,ListChecks:at,Repeat:St,Sparkles:je,Lock:Ea};function Ts(e){return e&&fi[e]||pt}var Wa=me.layerTopics??[];function Fs(){Wa=me.layerTopics??[]}function nt(e,t=me){return t.topicLabels?.[e]??e}function zt(e){return e.replace(/^[A-Za-z0-9_-]+[·:-]/,"")}var za=me.topicOrder??[],Qr=me.sourceLabels??{};function Us(){za=me.topicOrder??[],Qr=me.sourceLabels??{}}function kt(e,t=me){return t.sourceLayers?.[e]??null}function Le(e,t=me){return kt(e.source,t)!=="\u62D3\u5C55"}var pi=["\u4E00","\u4E8C","\u4E09","\u56DB","\u4E94","\u516D","\u4E03","\u516B","\u4E5D","\u5341","\u5341\u4E00","\u5341\u4E8C"];function Bs(e){let t=e.match(/[一二三四五六七八九十]+$/);return t?pi.indexOf(t[0]):-1}function Ga(e,t,a=me){let r=a.subtopics?.[e];if(!r)return[];let o=new Set;for(let s of t)s.topic===e&&s.subtopic&&o.add(s.subtopic);let n=[];for(let s of r){let d=[...o].filter(l=>l===s||l.startsWith(s));d.sort((l,u)=>{let p=Bs(l),i=Bs(u);return(p===-1?-1:p)-(i===-1?-1:i)}),n.push(...d);for(let l of d)o.delete(l)}return n.push(...o),n}function Os(e,t=me){let a=t.topicOrder??[],r=[];for(let n of a){let s=Ga(n,e,t);if(s.length>0)for(let d of s)r.push({topic:n,subtopic:d});else e.some(d=>d.topic===n)&&r.push({topic:n,subtopic:""})}let o=new Set(e.map(n=>n.topic).filter(n=>!!n&&!a.includes(n)));for(let n of[...o].sort()){let s=Ga(n,e,t);if(s.length>0)for(let d of s)r.push({topic:n,subtopic:d});else r.push({topic:n,subtopic:""})}return r}function qs(e,t){return t?zt(t):e}function Hs(e,t,a,r=me){let o=new Map,n=new Map;for(let l of e){if(!Le(l,r))continue;let u=l.topic||"",p=o.get(u)??{a:0,t:0};if(p.t++,t.has(l.id)&&p.a++,o.set(u,p),l.subtopic){let i=n.get(l.subtopic)??{topic:u,a:0,t:0};i.t++,t.has(l.id)&&i.a++,n.set(l.subtopic,i)}}let s=r.topicOrder??[];return[...o.keys()].sort((l,u)=>{let p=s.indexOf(l),i=s.indexOf(u);return p!==-1||i!==-1?(p===-1?99:p)-(i===-1?99:i):l.localeCompare(u)}).map(l=>{let{a:u,t:p}=o.get(l),i=Ga(l,e,r).filter(m=>n.has(m));return{topic:l,answered:u,total:p,subs:i.map(m=>{let{a:c,t:f}=n.get(m),h=!!a&&a.topic===l&&a.subtopic===m;return{sub:m,answered:c,total:f,state:h?"current":f>0&&c>=f?"done":"todo"}})}})}var _s=[.5,.7,.85,.95,1],mi={1:.5,2:.8},hi=.85,gi=.5;function xi(e){return`${e.target}\0${e.correct}\0${e.at}\0${e.source??""}`}function Ws(e=[],t=[]){let a=new Set,r=[];for(let o of[...e,...t]){let n=xi(o);a.has(n)||(a.add(n),r.push(o))}return r.sort((o,n)=>o.at-n.at)}function Gs(e=[]){let t=[...e].sort((i,m)=>i.at-m.at),a=t.length,r=t.filter(i=>i.correct).length;if(a===0)return{asked:0,correct:0,score:null,status:"untouched"};let o=Math.min(_s.length,a),n=t.slice(-o),s=_s.slice(-o),d=s.reduce((i,m)=>i+m,0),l=n.reduce((i,m,c)=>i+s[c]*(m.correct?1:0),0)/d,u=mi[a];u!==void 0&&(l=Math.min(l,u));let p=!t[a-1].correct||l<gi?"weak":l>=hi?"mastered":"inProgress";return{asked:a,correct:r,score:Math.round(l*1e3)/1e3,status:p}}function Li(e,t={}){let a=String(e??"").trim(),r=a.match(/^(EP-\d+)\b/);if(r)return r[1];for(let[o,n]of Object.entries(t))if(n===a)return o;return null}function wr(e=[],t={}){let a=new Map;for(let r of e){let o=Li(r.target,t);if(!o)continue;let n=a.get(o);n?n.push(r):a.set(o,[r])}return a}function Vt(e=[],t){return t?e.filter(a=>!a.theme||a.theme===t):e}function yt(e){return e<=1?1:e===2?2:3}function jt(){return{version:1,answers:{},read:{}}}function zs(e){return e.deletedAt??e.submittedAt}function Vs(e){return e.deletedAt??e.updatedAt}function Va(e){return!!e&&e.deletedAt!==void 0}function ge(e){return Va(e)}function ja(e){return!!e&&e.fromRandom===!0&&!Va(e)}function st(e){return!!e&&e.deletedAt!==void 0}function Zr(e,t,a){return{...e,answers:{...e.answers,[t]:a}}}function $s(e,t){if(e===null)return t;if(e===!1)return 0;if(t!==void 0)return t+1}function Ks(e,t){return e===!1?(t??0)+1:t}function Qs(e,t){return{...e,read:{...e.read??{},[t]:Date.now()}}}function Jr(e,t){let a=e.read?.[t];if(a===void 0)return!1;let r=e.readTombstones?.[t];return r===void 0?!0:a>r}function Ys(e,t){let a=0;for(let r of t)Le(r)&&Jr(e,r.id)&&a++;return a}function Zs(e,t){let a=t.filter(l=>Le(l)),r=a.length,o=0,n=0,s=0,d=0;for(let l of a){let u=e.answers[l.id];!u||Va(u)||ja(u)||(o++,u.correct===!0?(n++,d++):u.correct===!1&&(s++,d++))}return{total:r,answered:o,correct:n,wrong:s,accuracy:d===0?0:n/d}}function Js(e,t){let a=t.length,r=0,o=0,n=0,s=0;for(let d of t){let l=e.answers[d.id];!l||Va(l)||(r++,l.correct===!0?(o++,s++):l.correct===!1&&(n++,s++))}return{total:a,answered:r,correct:o,wrong:n,accuracy:s===0?0:o/s}}function Pt(e,t){let a=t?new Set(t.map(r=>r.id)):null;return Object.entries(e.answers).filter(([,r])=>!Va(r)&&r.streak!==void 0&&r.streak<yt(r.wrongCount??1)).filter(([r])=>!a||a.has(r)).map(([r])=>r)}function Yr(e){return{selected:[],correct:null,submittedAt:e,deletedAt:e}}function ed(e,t=Date.now(),a){let r=a?new Set(a):null,o={};for(let[n,s]of Object.entries(e.answers))o[n]=s.streak!==void 0&&(!r||r.has(n))?Yr(t):s;return{...e,answers:o}}function td(e,t=Date.now(),a){let r=a?new Set(a):null,o={...e.readTombstones??{}};for(let n of Object.keys(e.read??{}))(!r||r.has(n))&&(o[n]=t);return{...e,readTombstones:o}}function eo(e,t,a=Date.now()){let r=new Set(t),o={},n=!1;for(let[s,d]of Object.entries(e.answers))r.has(s)?(o[s]=Yr(a),n=!0):o[s]=d;if(!n||r.size>Object.keys(o).length)for(let s of r)o[s]||(o[s]=Yr(a));return{...e,answers:o}}function to(e,t,a=Date.now()){let r={...e.readTombstones??{}};for(let o of t)r[o]=a;return{...e,readTombstones:r}}function ao(e,t=Date.now(),a){let r=a?new Set(a):null,o={};for(let[n,s]of Object.entries(e.srs??{}))o[n]=!r||r.has(n)?{...s,deletedAt:t}:s;return{...e,srs:o,srsMeta:void 0}}function ad(e){let t=new Date(e),a=t.getFullYear(),r=String(t.getMonth()+1).padStart(2,"0"),o=String(t.getDate()).padStart(2,"0");return`${a}-${r}-${o}`}function Xa(e,t=Date.now()){let a=e.srsMeta;return a&&a.newTodayDate===ad(t)?a.newToday:0}function rd(e,t=Date.now()){let a=ad(t),r=e.srsMeta,o=r&&r.newTodayDate===a?{newToday:r.newToday+1,newTodayDate:a}:{newToday:1,newTodayDate:a};return{...e,srsMeta:o}}function od(e,t,a){return{...e,srs:{...e.srs??{},[t]:a}}}function br(e,t){return`${e}/${t}`}function nd(e,t,a,r=Date.now()){return{...e,coursesRead:{...e.coursesRead??{},[br(t,a)]:r}}}function sd(e,t,a,r=Date.now()){return{...e,coursesReadTombstones:{...e.coursesReadTombstones??{},[br(t,a)]:r}}}function dd(e,t,a){let r=e.coursesRead?.[br(t,a)];if(r===void 0)return!1;let o=e.coursesReadTombstones?.[br(t,a)];return o===void 0?!0:r>o}function js(e,t){let a={},r=new Set([...Object.keys(e??{}),...Object.keys(t??{})]);for(let o of r){let n=e?.[o]??0,s=t?.[o]??0;a[o]=n>=s?n:s}return a}function yi(e,t){let a={},r=new Set([...Object.keys(e??{}),...Object.keys(t??{})]);for(let o of r){let n=e?.[o],s=t?.[o];n&&s?a[o]=Vs(n)>=Vs(s)?n:s:a[o]=n||s}return a}function Xs(e,t){let a={},r=new Set([...Object.keys(e??{}),...Object.keys(t??{})]);for(let o of r){let n=e?.[o]??0,s=t?.[o]??0;a[o]=n>=s?n:s}return a}function wi(e,t){if(!(!e&&!t))return e?t?e.newTodayDate===t.newTodayDate?{newTodayDate:e.newTodayDate,newToday:Math.max(e.newToday,t.newToday)}:e.newTodayDate>t.newTodayDate?e:t:e:t}function bi(e,t){return!e?.theme&&!t?.theme?{}:e?.theme?t?.theme?(e.themeUpdatedAt??0)>=(t.themeUpdatedAt??0)?{theme:e.theme,themeUpdatedAt:e.themeUpdatedAt}:{theme:t.theme,themeUpdatedAt:t.themeUpdatedAt}:{theme:e.theme,themeUpdatedAt:e.themeUpdatedAt}:{theme:t.theme,themeUpdatedAt:t.themeUpdatedAt}}function Ii(e,t){return!e?.lang&&!t?.lang?{}:e?.lang?t?.lang?(e.langUpdatedAt??0)>=(t.langUpdatedAt??0)?{lang:e.lang,langUpdatedAt:e.langUpdatedAt}:{lang:t.lang,langUpdatedAt:t.langUpdatedAt}:{lang:e.lang,langUpdatedAt:e.langUpdatedAt}:{lang:t.lang,langUpdatedAt:t.langUpdatedAt}}function Ci(e,t){return!e?.settings&&!t?.settings?{}:e?.settings?t?.settings?(e.settingsUpdatedAt??0)>=(t.settingsUpdatedAt??0)?{settings:e.settings,settingsUpdatedAt:e.settingsUpdatedAt}:{settings:t.settings,settingsUpdatedAt:t.settingsUpdatedAt}:{settings:e.settings,settingsUpdatedAt:e.settingsUpdatedAt}:{settings:t.settings,settingsUpdatedAt:t.settingsUpdatedAt}}function Si(e,t){if(!(!e?.length&&!t?.length))return Ws(e??[],t??[])}function ld(e,t){let a={},r=new Set([...Object.keys(e.answers),...Object.keys(t.answers)]);for(let n of r){let s=e.answers[n],d=t.answers[n];s&&d?a[n]=zs(s)>=zs(d)?s:d:a[n]=s||d}let o=Si(e.oralAttempts,t.oralAttempts);return{version:1,answers:a,...o?{oralAttempts:o}:{},read:js(e.read,t.read),readTombstones:Xs(e.readTombstones,t.readTombstones),coursesRead:js(e.coursesRead,t.coursesRead),coursesReadTombstones:Xs(e.coursesReadTombstones,t.coursesReadTombstones),srs:yi(e.srs,t.srs),srsMeta:wi(e.srsMeta,t.srsMeta),...bi({theme:e.theme,themeUpdatedAt:e.themeUpdatedAt},{theme:t.theme,themeUpdatedAt:t.themeUpdatedAt}),...Ii({lang:e.lang,langUpdatedAt:e.langUpdatedAt},{lang:t.lang,langUpdatedAt:t.langUpdatedAt}),...Ci({settings:e.settings,settingsUpdatedAt:e.settingsUpdatedAt},{settings:t.settings,settingsUpdatedAt:t.settingsUpdatedAt})}}var z=require("react");function ud(e,t,a=Date.now()){return t.kind==="open"||!t.file?e:dd(e,t.theme,t.file)?sd(e,t.theme,t.file,a):nd(e,t.theme,t.file,a)}var ye=[1,10],Oe=[10],vi=20,ki=5,Pi=2.5,Cr=1.3,id=1,cd=4,Ri=.5,Rt={again:-.2,hard:-.15,easy:.15};function oo(e,t,a){if(!e)return fd(void 0,t,a);switch(e.phase){case"learning":return fd(e,t,a);case"relearning":return Ai(e,t,a);default:return Mi(e,t,a)}}function fd(e,t,a){let r=e?.ease??Pi,o=e?.phase==="learning"?e.stepIdx:0,n=e?.lapses??0,s=ye.length-1;switch(t){case"again":return ro(r,0,n,a+Xt(ye[0]),a);case"hard":{let d=Di(o);return ro(Math.max(Cr,r+Rt.hard),o,n,a+Xt(d),a,d)}case"good":{if(o>=s)return $a(r,id,1,n,a+id*864e5,a);let d=o+1;return ro(r,d,n,a+Xt(ye[d]),a)}case"easy":return $a(r+Rt.easy,cd,1,n,a+cd*864e5,a)}}function Xt(e){let t=Math.random()*ki;return(e+t)*6e4}function Di(e){return e<=0?ye.length>=2?(ye[0]+ye[1])/2:ye[0]*1.5:ye[e]??ye[0]}function Ai(e,t,a){let r=e.ease,o=e.lapses,n=Oe.length-1;switch(t){case"again":{let s=Oe[0];return Ir(r,0,o,a+Xt(s),a)}case"hard":{let s=Oe[e.stepIdx];return Ir(Math.max(Cr,r+Rt.hard),e.stepIdx,o,a+Xt(s),a)}case"good":{if(e.stepIdx>=n)return $a(r,e.interval,1,o,a+e.interval*864e5,a);let s=e.stepIdx+1,d=Oe[s];return Ir(r,s,o,a+Xt(d),a)}case"easy":return $a(r+Rt.easy,Math.max(1,e.interval+1),1,o,a+(e.interval+1)*864e5,a)}}function Mi(e,t,a){let r=e.ease,o=e.reps,n=e.interval,s=0,d=e.lapses;switch(t){case"again":{r=Math.max(Cr,r+Rt.again),o=0,s=Math.max(1,Math.round(n*Ri)),d=d+1;let u=Oe[0];return Ir(r,0,d,a+u*6e4,a,s)}case"hard":{r=Math.max(Cr,r+Rt.hard),s=o===0?1:Math.max(1,Math.round(n*1.2)),o+=1;break}case"good":{s=o===0?1:o===1?6:Math.max(1,Math.round(n*r)),o+=1;break}case"easy":{r+=Rt.easy,s=o===0?4:o===1?8:Math.max(1,Math.round(n*r*1.3)),o+=1;break}}let l=a+s*864e5;return $a(r,s,o,d,l,a)}function ro(e,t,a,r,o,n){let s=n??ye[t]??ye[0];return{ease:no(e),interval:s/24/60,reps:0,due:r,updatedAt:o,phase:"learning",stepIdx:t,lapses:a}}function Ir(e,t,a,r,o,n){let s=Oe[t]??Oe[0];return{ease:no(e),interval:n??s/24/60,reps:0,due:r,updatedAt:o,phase:"relearning",stepIdx:t,lapses:a}}function $a(e,t,a,r,o,n){return{ease:no(e),interval:t,reps:a,due:o,updatedAt:n,phase:"review",stepIdx:0,lapses:r}}function Ka(e,t){return e?e.due<=t:!0}function Qa(e,t){return e?e.due<=t+vi*6e4:!0}function Sr(e){return e?e.phase==="learning"&&e.stepIdx===0&&e.lapses===0&&e.reps===0:!0}function Dt(e){return!!e&&(e.phase==="learning"||e.phase==="relearning")}function $t(e){if(e<=0||e<1/24/60)return"<1m";if(e<1/24)return`${Math.round(e*24*60)}m`;if(e<1)return`${Math.round(e*24)}h`;if(e<30)return`${Math.round(e)}d`;if(e<365){let a=e/30;return`${pd(a)}mo`}let t=e/365;return`${pd(t)}y`}function Ya(e,t,a){if(e&&e.phase==="review"&&t==="again"){let s=Oe[0];return"<"+$t(s/24/60)}let r=oo(e,t,a),o=$t(r.interval);return(!e||e.phase==="learning"||e.phase==="relearning")&&r.interval<1?"<"+o:o}function no(e){return Math.round(e*100)/100}function pd(e){return Math.round(e*10)/10}var Ei="snapshot",Ni="progress.save",Ti="dsh-ai-study-kit-cache",Fi="dsh-ai-study-kit-pending",hd=null;function io(e){hd=e}function dt(e){try{hd?.(e)}catch{}}var Za=null;function gd(e){Za=typeof e=="function"?e:null}var Kt="default";function Bi(e){let t=2166136261;for(let a=0;a<e.length;a++)t^=e.charCodeAt(a),t=Math.imul(t,16777619)>>>0;return t.toString(36)}function xd(e){let t=e?.projectRoot??"",a=e?.theme??"";Kt=`${Bi(t)}-${encodeURIComponent(a)}`}function Ld(){return`${Ti}:${Kt}`}function lo(){return`${Fi}:${Kt}`}var uo=null;function Ja(e){let t=e;return!!t&&typeof t=="object"&&t.version===1&&!!t.answers}function yd(e){let t=Ja(e)?e:null;uo=t,t&&Qt(t)}function Ui(){try{let e=localStorage.getItem(Ld());if(!e)return jt();let t=JSON.parse(e);return Ja(t)?t:jt()}catch{return jt()}}function Qt(e){try{localStorage.setItem(Ld(),JSON.stringify(e))}catch{}}function Oi(){try{let e=localStorage.getItem(lo());if(!e)return[];let t=JSON.parse(e);if(!Array.isArray(t))return[];let a=[];for(let r of t)r&&typeof r=="object"&&r.scope===Kt&&Ja(r.progress)&&a.push({scope:Kt,progress:r.progress});return a}catch{return[]}}function wd(){return Oi().map(e=>e.progress)}function bd(e){try{if(e.length===0){localStorage.removeItem(lo());return}let t=e.map(a=>({scope:Kt,progress:a}));localStorage.setItem(lo(),JSON.stringify(t))}catch{}}function qi(e){let t=wd();t.push(e),bd(t)}var md=[1e3,2e3];function Hi(e){return new Promise(t=>{setTimeout(t,e)})}async function _i(e){if(!Za)throw new Error("RPC \u672A\u7ED1\u5B9A\uFF08StudyApp \u672A\u6536\u5230 call prop\uFF09");let a=(await Za(Ni,{progress:e}))?.progress;return Ja(a)?a:null}async function Id(e){let t=null;for(let a=0;a<=md.length;a++)try{return await _i(e)}catch(r){t=r;let o=md[a];if(o===void 0)break;await Hi(o)}throw t??new Error("progress.save \u5931\u8D25")}async function Cd(){if(uo){let t=uo;return Qt(t),dt("saved"),t}let e=Ui();if(!Za)return dt("error"),e;try{let a=(await Za(Ei))?.progress;if(!Ja(a))return dt("remote-invalid"),e;let r=ld(e,a);return Qt(r),dt("saved"),r}catch{return dt("error"),e}}async function Sd(){let e=wd();if(e.length===0)return!0;try{for(let t of e){let a=await Id(t);a&&Qt(a)}return bd([]),dt("saved"),!0}catch{return dt("error"),!1}}var so=Promise.resolve();function co(e){return Qt(e),so=so.then(async()=>{let t=await Id(e);t&&Qt(t),dt("saved")}).catch(()=>{qi(e),dt("error")}),so}var fo=null;function vd(e){fo=typeof e=="function"?e:null}function po(e){if(fo)try{Promise.resolve(fo(e)).catch(()=>{})}catch{}}var Rd=require("react/jsx-runtime"),kd=(0,z.createContext)(null);function Pd({children:e}){let[t,a]=(0,z.useState)(jt()),[r,o]=(0,z.useState)(!1),[n,s]=(0,z.useState)("saved");(0,z.useEffect)(()=>(io(A=>s(A)),()=>io(null)),[]),(0,z.useEffect)(()=>{let A=!1;return Cd().then(g=>{A||(a(g),o(!0))}),()=>{A=!0}},[]);let d=(0,z.useRef)(t);(0,z.useEffect)(()=>{d.current=t},[t]);let l=(0,z.useRef)(!1);(0,z.useEffect)(()=>{l.current&&(l.current=!1,co(d.current))},[t]);let u=(0,z.useCallback)(async()=>{let A=await Sd();s(A?"saved":"error")},[]),p=(0,z.useCallback)((A,g)=>{a(D=>{let k=D.answers[A],S=$s(g.correct,k?.streak),O=S===void 0?{...g}:{...g,streak:S},J=Ks(g.correct,k?.wrongCount),G=J===void 0?O:{...O,wrongCount:J};return Zr(D,A,G)}),l.current=!0},[]),i=(0,z.useCallback)(A=>{a(g=>Qs(g,A)),l.current=!0},[]),m=(0,z.useCallback)(A=>{let g=d.current,D=ud(g,A);D!==g&&(a(D),l.current=!0)},[]),c=(0,z.useCallback)((A,g)=>{a(D=>{let k=Sr(D.srs?.[A]),S=od(D,A,g);return k&&(S=rd(S)),S}),l.current=!0},[]),f=(0,z.useCallback)(async()=>{let A=d.current,g=Date.now(),D={version:1,answers:Object.fromEntries(Object.entries(A.answers).map(([k])=>[k,{selected:[],correct:null,submittedAt:g,deletedAt:g}])),read:A.read??{},readTombstones:Object.fromEntries(Object.keys(A.read??{}).map(k=>[k,g])),srs:Object.fromEntries(Object.entries(A.srs??{}).map(([k,S])=>[k,{...S,deletedAt:g}])),theme:A.theme,themeUpdatedAt:A.themeUpdatedAt,lang:A.lang,langUpdatedAt:A.langUpdatedAt,settings:A.settings,settingsUpdatedAt:A.settingsUpdatedAt};a(D),await co(D)},[]),h=(0,z.useCallback)(A=>{a(g=>ed(g,Date.now(),A)),l.current=!0},[]),b=(0,z.useCallback)(A=>{a(g=>td(g,Date.now(),A)),l.current=!0},[]),w=(0,z.useCallback)(A=>{a(g=>eo(g,A)),l.current=!0},[]),x=(0,z.useCallback)(A=>{a(g=>to(g,A)),l.current=!0},[]),L=(0,z.useCallback)(A=>{a(g=>ao(g,Date.now(),A)),l.current=!0},[]),y=(0,z.useCallback)((A,g)=>{a(D=>{let k=eo(D,A);return k=to(k,A),k=ao(k,Date.now(),g),k}),l.current=!0},[]),B=(0,z.useCallback)(A=>{a(g=>{let D=g.answers[A];if(!D||D.streak===void 0)return g;let k=yt(D.wrongCount??1);return Zr(g,A,{...D,streak:k})}),l.current=!0},[]),N=(0,z.useCallback)(A=>{a(g=>({...g,theme:A,themeUpdatedAt:Date.now()})),l.current=!0},[]),H=(0,z.useCallback)(A=>{a(g=>({...g,lang:A,langUpdatedAt:Date.now()})),l.current=!0,po({lang:A})},[]),V=(0,z.useCallback)(A=>{if(a(g=>({...g,settings:{...g.settings,...A},settingsUpdatedAt:Date.now()})),typeof A.dailyNewCards=="number")try{localStorage.setItem("ask-new-per-day",String(A.dailyNewCards))}catch{}l.current=!0,po(A)},[]),de=(0,z.useMemo)(()=>({progress:t,loaded:r,syncStatus:n,retrySync:u,submitAnswer:p,markRead:i,dispatchCourseEvent:m,reviewCard:c,reset:f,resetWrong:h,resetRead:b,resetAnswersByIds:w,resetReadByIds:x,resetSrs:L,resetTheme:y,dismissWrong:B,setTheme:N,setLang:H,updateSettings:V}),[t,r,n,u,p,i,m,c,f,h,b,w,x,L,y,B,N,H,V]);return(0,Rd.jsx)(kd.Provider,{value:de,children:e})}function Se(){let e=(0,z.useContext)(kd);if(!e)throw new Error("useProgress must be used within <ProgressProvider>");return e}var Yt=require("react/jsx-runtime");function er({label:e,value:t,color:a="slate",icon:r}){let n={slate:{box:"bg-bg-subtle text-text-secondary ring-border",icon:"text-text-faint"},green:{box:"bg-st-green-soft text-st-green-ink ring-st-green/30",icon:"text-st-green"},red:{box:"bg-st-red-soft text-st-red-ink ring-st-red/30",icon:"text-st-red"},blue:{box:"bg-st-blue-soft text-st-blue-ink ring-st-blue/30",icon:"text-st-blue"},gold:{box:"bg-st-gold-soft text-st-gold-ink ring-st-gold/40",icon:"text-st-gold"}}[a];return(0,Yt.jsxs)("div",{className:`rounded-xl px-3 py-3.5 text-center ring-2 ${n.box}`,children:[r&&(0,Yt.jsx)(r,{className:`mx-auto mb-1 h-4 w-4 ${n.icon}`,strokeWidth:2,"aria-hidden":!0}),(0,Yt.jsx)("div",{className:"text-2xl sm:text-[1.75rem] font-bold leading-none tracking-tight tabular-nums",children:t}),(0,Yt.jsx)("div",{className:"text-xs sm:text-[0.8125rem] mt-1.5 text-text-muted font-medium",children:e})]})}var mo=require("react/jsx-runtime"),Wi={green:"bg-st-green text-white shadow-btn-green",blue:"bg-st-blue text-white shadow-btn-blue",red:"bg-st-red text-white shadow-btn-red",gold:"bg-st-gold text-st-gold-ink shadow-btn-gold",plain:"border-2 border-border-strong bg-bg-surface text-text-primary shadow-btn-plain"},Gi={sm:"px-4 py-2.5 text-sm rounded-xl",md:"px-4 py-3 text-sm sm:px-5 sm:text-[15px] sm:rounded-[14px]"},zi="btn3d inline-flex items-center justify-center gap-1.5 font-bold tracking-wide select-none transition-transform disabled:opacity-40 disabled:cursor-not-allowed disabled:active:translate-y-0";function Vi(e,t,a){return[zi,Wi[e],Gi[t],a].filter(Boolean).join(" ")}function te({variant:e="green",size:t="sm",to:a,disabled:r,onClick:o,className:n,children:s,autoFocus:d,"aria-label":l,title:u}){let p=Vi(e,t,n);return a!==void 0?(0,mo.jsx)(pe,{to:a,className:p,"aria-label":l,title:u,onClick:o,children:s}):(0,mo.jsx)("button",{type:"button",className:p,disabled:r,onClick:o,autoFocus:d,"aria-label":l,title:u,children:s})}var Dd=require("react/jsx-runtime");function $e({className:e="",children:t}){return(0,Dd.jsx)("div",{className:`border-2 border-border bg-bg-surface rounded-2xl shadow-card-3d ${e}`,children:t})}var tr=require("react/jsx-runtime"),ji={green:"--st-green","green-low":"--st-green-low",blue:"--st-blue",gold:"--st-gold",red:"--st-red"};function ar({p:e,tone:t="green",size:a=52,thickness:r=6,className:o="",children:n,ariaHidden:s=!1}){let d=Math.max(0,Math.min(100,Math.round(e))),l=Math.max(0,a-r*2),u={width:a,height:a,background:`conic-gradient(rgb(var(${ji[t]})) ${d}%, rgb(var(--st-track)) 0)`};return(0,tr.jsxs)("span",{role:s?void 0:"progressbar","aria-hidden":s||void 0,"aria-valuenow":s?void 0:d,"aria-valuemin":s?void 0:0,"aria-valuemax":s?void 0:100,className:`relative inline-grid place-items-center rounded-full shrink-0 ${o}`,style:u,children:[(0,tr.jsx)("span",{"aria-hidden":!0,className:"absolute inset-0 m-auto rounded-full bg-bg-surface",style:{width:l,height:l}}),(0,tr.jsx)("span",{className:"relative z-10 grid place-items-center",children:n})]})}var vr=require("react/jsx-runtime");function ho({state:e,size:t=30,className:a=""}){let o=`shrink-0 grid place-items-center rounded-full border-2 font-bold ${t<=24?"text-[10px]":"text-sm"}`;return e==="done"?(0,vr.jsx)("span",{"aria-hidden":!0,className:`${o} bg-st-green border-st-green-dark text-white ${a}`,style:{width:t,height:t},children:"\u2713"}):e==="current"?(0,vr.jsx)("span",{"aria-hidden":!0,className:`${o} bg-st-gold-soft border-st-gold-border text-st-gold-ink ${a}`,style:{width:t,height:t},children:"\u25B6"}):(0,vr.jsx)("span",{"aria-hidden":!0,className:`${o} bg-st-track border-border text-text-muted tabular-nums ${a}`,style:{width:t,height:t},children:e})}var go=require("react/jsx-runtime");function Zt({total:e,on:t,tone:a="green",size:r=10,className:o=""}){let n=a==="green"?"bg-st-green":a==="blue"?"bg-st-blue":"bg-st-gold",s=Math.max(0,Math.min(e,t));return(0,go.jsx)("span",{className:`inline-flex items-center gap-1 ${o}`,"aria-hidden":!0,children:Array.from({length:e},(d,l)=>(0,go.jsx)("span",{className:`rounded-[3px] ${l<s?n:"bg-st-track"}`,style:{width:r,height:r}},l))})}var xo=require("react/jsx-runtime");function Lo({on:e,onChange:t,label:a,className:r=""}){return(0,xo.jsx)("button",{type:"button",role:"switch","aria-checked":e,"aria-label":a,onClick:()=>t(!e),className:`shrink-0 w-[44px] h-[26px] rounded-full border-2 transition-colors ${e?"bg-st-green border-st-green-dark":"bg-st-track border-border"} ${r}`,children:(0,xo.jsx)("span",{"aria-hidden":!0,className:`block h-[18px] w-[18px] rounded-full bg-white shadow-soft transition-transform ${e?"translate-x-[20px]":"translate-x-[3px]"}`})})}function Ke(e){let t=new Date(e),a=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${a(t.getMonth()+1)}-${a(t.getDate())}`}function wt(e){if(typeof e!="string"||!/^\d{4}-\d{2}-\d{2}$/.test(e))return null;let[t,a,r]=e.split("-").map(Number),o=new Date(t,a-1,r);return o.getFullYear()!==t||o.getMonth()!==a-1||o.getDate()!==r?null:o}function Qe(e,t){let a=wt(e),r=wt(t);return!a||!r?null:Math.round((r.getTime()-a.getTime())/864e5)}function Ad(e,t){let a=wt(e);return a.setDate(a.getDate()+t),Ke(a.getTime())}var Xi=["id","title","order","status","plannedDate","day","topic","doneDate"];function At(e){let t={};for(let a of Xi){let r=e[a];r!==void 0&&(t[a]=r)}return t}function yo(e){return(Array.isArray(e)?e:[]).filter(t=>!!t&&typeof t=="object")}var Jt=e=>typeof e.order=="number"&&Number.isFinite(e.order)?e.order:1/0,wo=e=>[...yo(e)].sort((t,a)=>Jt(t)-Jt(a)),qe=e=>e.status;function bo(e){let t=wo(e?.units),a={planned:0,"in-progress":0,done:0,paused:0};for(let o of t){let n=qe(o);n&&n in a&&a[n]++}let r=t.find(o=>qe(o)==="in-progress")??t.find(o=>qe(o)==="planned")??null;return{done:a.done,total:t.length,current:r?At(r):null,remaining:t.filter(o=>qe(o)!=="done").map(o=>At(o)),byStatus:a}}function Io(e,t){let a=Ke(t),r=wo(e?.units),o=[],n=[];for(let c of r)if(c.plannedDate!==void 0){if(!wt(c.plannedDate)){o.push(String(c.id));continue}n.push(c)}let s=r.filter(c=>qe(c)==="done").pop()??null,d={today:a,invalidDateUnits:o,shouldAt:null,actualAt:s?At(s):null,overdue:[],diffDays:null,state:null,available:!0,reason:null,note:null};if(n.length===0)return{...d,available:!1,reason:"no-dated-units",note:"\u8BA1\u5212\u91CC\u6CA1\u6709\u4EFB\u4F55\u53EF\u89E3\u6790\u7684 plannedDate\uFF0C\u65E5\u5386\u5BF9\u7167\u65E0\u951A\u70B9"};let l=(c,f)=>{let h=String(c.plannedDate),b=String(f.plannedDate);return h<b?-1:h>b?1:Jt(c)-Jt(f)},u=n.filter(c=>String(c.plannedDate)<=a).sort(l),p=u.length?u[u.length-1]:null,i=n.filter(c=>qe(c)!=="done"&&String(c.plannedDate)<a).sort(l).map(c=>({...At(c),daysOverdue:Qe(String(c.plannedDate),a)??0}));if(i.length>0){let c=i[i.length-1];return{...d,shouldAt:p?At(p):null,overdue:i,diffDays:-c.daysOverdue,state:"behind"}}let m=n.filter(c=>qe(c)!=="done"&&String(c.plannedDate)>=a).sort(l);if(m.length>0){let c=m[0],f=Qe(a,String(c.plannedDate))??0;return{...d,shouldAt:p?At(p):null,overdue:i,diffDays:f,state:f===0?"due-today":"slack"}}return{...d,shouldAt:p?At(p):null,overdue:i,state:"cleared",note:"\u6709\u65E5\u7A0B\u7684\u5355\u5143\u5DF2\u5168\u90E8\u5B8C\u6210\uFF1B\u5269\u4F59\u5355\u5143\uFF08\u82E5\u6709\uFF09\u65E0 plannedDate\uFF0C\u65E0\u5BF9\u7167\u951A\u70B9"}}function kr(e,t,a=14){let r=Ke(t),o=yo(e?.units),n=o.filter(b=>qe(b)!=="done").length,s=null,d=[];e?.deadline&&(wt(e.deadline)?s=e.deadline:d.push(`deadline "${e.deadline}" \u65E0\u6CD5\u89E3\u6790\uFF0C\u6309\u65E0 deadline \u5904\u7406`));let l={windowDays:a,remaining:n,deadline:s};if(o.length===0)return{...l,available:!1,reason:"no-units",note:"\u8BA1\u5212\u65E0\u5355\u5143\uFF0C\u65E0\u5916\u63A8\u53EF\u7B97",eventsInWindow:0,ratePerDay:null,estimatedDays:null,estimatedDoneDate:null,slackDays:null,state:null};if(n===0)return{...l,available:!1,reason:"complete",note:"\u5168\u90E8\u5355\u5143\u5DF2\u5B8C\u6210\uFF0C\u65E0\u9700\u5916\u63A8",eventsInWindow:0,ratePerDay:null,estimatedDays:null,estimatedDoneDate:null,slackDays:null,state:null};let u=Ad(r,-(a-1)),p=o.filter(b=>{let w=b.doneDate;return qe(b)==="done"&&typeof w=="string"&&!!wt(w)&&w>=u&&w<=r}).length;if(p===0)return{...l,available:!1,reason:"no-recent-completions",note:`\u8FD1 ${a} \u5929\uFF08${u}\uFF5E${r}\uFF09\u65E0\u5355\u5143\u5B8C\u6210\uFF08doneDate \u7F3A\u5931\u3001\u574F\u503C\u6216\u4E0D\u843D\u7A97\uFF09\uFF0C\u901F\u7387\u65E0\u6570\u636E\uFF0C\u4E0D\u786C\u7B97`,eventsInWindow:0,ratePerDay:null,estimatedDays:null,estimatedDoneDate:null,slackDays:null,state:null};let i=p/a,m=Math.ceil(n/i),c=Ad(r,m),f=s?Qe(c,s):null,h=s?(f??0)>=0?"slack":"deficit":"no-deadline";return{...l,available:!0,reason:null,eventsInWindow:p,ratePerDay:i,estimatedDays:m,estimatedDoneDate:c,slackDays:f,state:h,note:d.length?d.join("\uFF1B"):null}}function Co(e,t,a={}){let{questionIds:r,cardIds:o,theme:n}=a,s=r?new Set(r):null,d=o?new Set(o):null,l=null,u=(m,c)=>{if(typeof m=="number"&&Number.isFinite(m)){let f={at:m,source:c};(!l||f.at>l.at)&&(l=f)}};for(let[m,c]of Object.entries(e?.answers??{}))s&&!s.has(m)||u(c?.submittedAt,"answers");for(let[m,c]of Object.entries(e?.srs??{}))d&&!d.has(m)||u(c?.updatedAt,"srs");for(let[m,c]of Object.entries(e?.coursesRead??{}))n&&!m.startsWith(`${n}/`)||u(c,"coursesRead");let p=Array.isArray(a.oralAttempts)?a.oralAttempts:[];for(let m of[...e?.oralAttempts??[],...p])!m||typeof m!="object"||n&&m.theme&&m.theme!==n||u(m.at,"oral");let i=l;return i?{available:!0,reason:null,daysSinceLastContact:Qe(Ke(i.at),Ke(t)),lastContactAt:i.at,source:i.source}:{available:!1,reason:"no-contact",daysSinceLastContact:null,lastContactAt:null,source:null}}var So=3;function Md(e,t,a,r){let o=r??kr(e,t),n={gapDays:a.daysSinceLastContact,windowDays:o.windowDays,ratePerDay:null,daysPerUnit:null,remaining:null,estimatedDays:null,shiftDays:null,deadline:o.deadline,scheduledEnd:null};if(!a.available)return{...n,available:!1,reason:"no-contact"};if((a.daysSinceLastContact??0)<So)return{...n,available:!1,reason:"below-threshold"};if(!o.available)return{...n,available:!1,reason:"no-rate"};let d=o.deadline;if(!d){let i=Ke(t);for(let m of yo(e?.units)){if(qe(m)==="done")continue;let c=m.plannedDate;typeof c=="string"&&wt(c)&&(!d||c>d)&&(d=c)}if(d)n.scheduledEnd=d;else return{...n,available:!1,reason:"no-target"}}let l=Ke(t),u=Qe(l,d),p=(o.estimatedDays??0)-(u??0);return p<=0?{...n,available:!1,reason:"on-track"}:{...n,available:!0,reason:null,ratePerDay:o.ratePerDay,daysPerUnit:o.ratePerDay&&o.ratePerDay>0?1/o.ratePerDay:null,remaining:o.remaining,estimatedDays:o.estimatedDays,shiftDays:p}}var $i=7;function Pr(e,t){let a=(Array.isArray(e?.rescheduled)?e.rescheduled:[]).filter(p=>!!p&&typeof p=="object"),r=a[a.length-1];if(!r)return null;let o=r.at;if(typeof o!="number"||!Number.isFinite(o))return null;let n=Qe(Ke(o),Ke(t));if(n===null||n>$i)return null;let s=Ke(t),d=wo(e?.units).filter(p=>qe(p)!=="done"&&typeof p.plannedDate=="string"&&!!wt(p.plannedDate)).sort((p,i)=>{let m=String(p.plannedDate),c=String(i.plannedDate);return m<c?-1:m>c?1:Jt(p)-Jt(i)}),l=d.find(p=>String(p.plannedDate)>=s)??d[0]??void 0;if(!l)return null;let u=r.reason;return{available:!0,reason:u==="behind"||u==="gap"?u:"manual",at:o,nextUnit:{id:String(l.id),title:String(l.title),plannedDate:String(l.plannedDate)}}}function Rr({plan:e,progress:t,now:a,questionIds:r,cardIds:o,theme:n,oralAttempts:s}){return{coverage:bo(e),calendarDiff:Io(e,a),projection:kr(e,a),gap:Co(t,a,{questionIds:r,cardIds:o,theme:n,oralAttempts:s})}}function Ki(e){return!e||e.streak===void 0?!1:e.streak<yt(e.wrongCount??1)}function vo(e){return!!e&&!st(e)&&e.phase==="review"}function Qi(e,t){if(!e)return;let a=typeof e.get=="function"?e.get(t):e[t];return a==="untouched"?void 0:a??void 0}function Ed(e,t,a={},r=[],o={},n={}){let s=new Map;for(let p of r){if(!p.examPoint)continue;let i=s.get(p.examPoint)??[];i.push(p.id),s.set(p.examPoint,i)}let d=new Map,l=0;for(let p of e){let i=p.examPoint;if(!i){l++;continue}let m=d.get(i)??[];m.push(p.id),d.set(i,m)}let u=[];for(let[p,i]of d){let m=0,c=0,f=0,h=[];for(let H of i){let V=t[H];!V||ge(V)||ja(V)||(m++,V.correct===!0&&c++,V.correct===null&&f++,Ki(V)&&h.push(H))}let b=s.get(p)??[],w=b.filter(H=>!vo(o[H])),x=Qi(n,p),L=x!==void 0,y=!L||x==="mastered"||b.length>0&&w.length===0,B=h.length>0||c+f<m,N;m===0&&x!=="weak"?N="untouched":B||x==="weak"?N="weak":m===i.length&&c===i.length&&y?N="mastered":N="inProgress",u.push({ep:p,name:a[p]||p,questionIds:i,total:i.length,answered:m,correctNow:c,openWrongIds:h,flashMapped:b.length,flashGraduated:b.length-w.length,flashOpenIds:w,oralStatus:L?x:null,status:N})}return{points:u,untracked:l}}var Yi=200,Zi=80;function Td(e,t){return!!t&&t.length>0&&t.length<=Yi&&e<=Zi}var ko="\u672A\u6392\u7A0B";function ea(e,t,a={},r=[],o={},n=null,s={},d=[]){let l=new Map;for(let x of n?.points??[])l.set(x.ep,x);let u=new Map;for(let[x,L]of wr(d,a)){let y=Gs(L);u.set(x,{status:y.status,asked:y.asked,correct:y.correct})}let p={};for(let[x,L]of u)p[x]=L.status;for(let[x,L]of l)!u.has(x)&&L.oralStatus&&(p[x]=L.oralStatus);let{points:i}=Ed(e,t,a,r,o,p),m=n?.courseTaughtAll===!0,c=[];for(let x of i){let L=s[x.ep];L&&!c.includes(L)&&c.push(L)}c.sort((x,L)=>x.localeCompare(L,"zh-Hans-CN",{numeric:!0}));let f=new Map;for(let x of i){let L=s[x.ep]||ko;f.has(L)||f.set(L,[]);let y=l.get(x.ep),B=u.get(x.ep),N=B?{asked:B.asked,correct:B.correct}:y?.oral??null;f.get(L).push({ep:x.ep,name:x.name,taught:(y?.taught??!1)||m,practiced:x.answered>0||(N?.asked??0)>0,mastered:x.status==="mastered",status:x.status,answered:x.answered,total:x.total,openWrong:x.openWrongIds.length,oral:N,oralStatus:x.oralStatus})}let b=[...f.keys()].sort((x,L)=>{if(x===ko)return 1;if(L===ko)return-1;let y=c.indexOf(x),B=c.indexOf(L);return(y===-1?99:y)-(B===-1?99:B)}).map(x=>{let L=f.get(x);return{day:x,points:L,summary:{total:L.length,taught:L.filter(y=>y.taught).length,practiced:L.filter(y=>y.practiced).length,mastered:L.filter(y=>y.mastered).length}}}),w=b.flatMap(x=>x.points);return{summary:{examPoints:w.length,taught:w.filter(x=>x.taught).length,practiced:w.filter(x=>x.practiced).length,mastered:w.filter(x=>x.mastered).length},courseTaughtAll:m,groups:b}}function Fd(e){return e==="weak"||e==="unmastered"?e:"all"}function Bd(e,t){return t==="all"?!0:t==="weak"?e.status==="weak":e.status!=="mastered"}function Po(e){let t={mastered:0,inProgress:0,weak:0,untouched:0};for(let a of e)t[a.status]+=1;return t}function Nd(e){let t=e.match(/(\d+)$/);return t?[0,Number(t[1])]:[1,e]}function Ud(e,t){let a=Nd(e),r=Nd(t);return a[0]!==r[0]?a[0]-r[0]:typeof a[1]=="number"&&typeof r[1]=="number"?a[1]-r[1]:String(a[1]).localeCompare(String(r[1]))}function Od(e,t,a=[]){let r=new Map;for(let s of e)!s.examPoint||r.has(s.examPoint)||r.set(s.examPoint,s.topic||"");let o=new Map;for(let s of t){let d=r.get(s.ep)??"",l=o.get(d)??[];l.push(s),o.set(d,l)}return[...o.keys()].sort((s,d)=>{let l=a.indexOf(s),u=a.indexOf(d);return l!==-1||u!==-1?(l===-1?99:l)-(u===-1?99:u):s.localeCompare(d)}).map(s=>{let d=o.get(s).sort((l,u)=>Ud(l.ep,u.ep));return{topic:s,points:d,counts:Po(d)}})}function ta(e){return e.flatMap(t=>[...t.points].sort((a,r)=>Ud(a.ep,r.ep)))}function aa(e,t,a){if(!e.deadline)return null;let r=[];for(let n of e.overdue){let s=n.day;typeof s=="string"&&s!==""&&!r.includes(s)&&r.push(s)}let o=[];for(let n of r)for(let s of t)s.status!=="mastered"&&a[s.ep]===n&&o.push(s.ep);return{deadline:e.deadline,overdueEps:o,daysOverdue:Math.max(0,-(e.diffDays??0))}}function Ji(e,t){let a=new Map,r=new Set(e),o=!0;for(;o;){o=!1;for(let n of r){let s=t.get(n)??[];s.every(d=>a.has(d))&&(a.set(n,s.reduce((d,l)=>Math.max(d,a.get(l)+1),0)),r.delete(n),o=!0)}}for(let n of r)a.set(n,Number.MAX_SAFE_INTEGER);return a}function ra(e){let{points:t,edges:a,planGap:r}=e,o=new Map(t.map(L=>[L.ep,L])),n=new Map(t.map((L,y)=>[L.ep,y])),s=new Map,d=0;for(let L of a??[]){if(!L.prerequisite||!o.has(L.from)||!o.has(L.to))continue;let y=s.get(L.to)??[];y.includes(L.from)||(y.push(L.from),d++,s.set(L.to,y))}let l=d>0?"knowflow":"schedule",u=Ji([...o.keys()],s),p=[...t].sort((L,y)=>u.get(L.ep)-u.get(y.ep)||n.get(L.ep)-n.get(y.ep)),i=L=>o.get(L)?.status==="mastered",m=L=>{let y=p.find(B=>B.ep!==L&&B.status!=="mastered"&&(s.get(B.ep)??[]).every(N=>i(N)));return y?{ep:y.ep,name:y.name,status:y.status,reason:"unlocked"}:null},c=L=>p.filter(y=>y.status!=="mastered"&&(s.get(y.ep)??[]).includes(L)).map(y=>y.name),f=t.filter(L=>L.status==="weak").sort((L,y)=>y.openWrong-L.openWrong||n.get(L.ep)-n.get(y.ep))[0]??null,h=f?{ep:f.ep,name:f.name,status:f.status,reason:"weak",weak:{openWrong:f.openWrong,downstream:c(f.ep)}}:null,b=null;if(r){let L=r.overdueEps.find(B=>o.get(B)&&!i(B)),y=L!==void 0?o.get(L):void 0;y&&(b={ep:y.ep,name:y.name,status:y.status,reason:"behindSchedule",daysOverdue:r.daysOverdue})}let w=b??h??m();if(!w)return{primary:null,alt:null,structural:l};let x=w.reason==="behindSchedule"?h??m(w.ep):(w.reason==="weak",m(w.ep));return x&&x.ep===w.ep&&(x=m(w.ep)),{primary:w,alt:x,structural:l}}function ec(e,t){let a=t.answers[e.id];return!a||a.deletedAt!==void 0||a.fromRandom===!0}function qd(e,t,a){return e.length===0?null:e.find(r=>ec(r,t))??e.find(r=>a.has(r.id))??e[0]}function Hd(e,t,a){let r=e.filter(s=>Le(s)&&s.tier!=="ext");if(r.length===0)return null;let o=new Set(Pt(t,e));if(a){let s=r.filter(l=>l.examPoint===a.ep),d=qd(s,t,o);if(d){let l=a.reason==="behindSchedule"?"schedule":a.reason==="weak"?"weak":"structural";return{questionId:d.id,ep:a.ep,reason:l}}}let n=qd(r,t,o);return n?{questionId:n.id,ep:n.examPoint??"",reason:"fallback"}:null}var ke=require("react");var Ro={"app.title":"AI Study Kit \xB7 \u5B66\u4E60\u7EC3\u4E60\u7AD9","app.loading":"\u52A0\u8F7D\u8FDB\u5EA6\u4E2D\u2026","nav.home":"\u9996\u9875","nav.flashcards":"\u95EA\u5361","nav.courses":"\u8BFE\u7A0B","nav.panorama":"\u5168\u666F","nav.backHome":"\u8FD4\u56DE\u9996\u9875","home.heroTitle":"\u7EE7\u7EED\uFF0C\u4ECA\u5929\u4E5F\u8981\u8FC7\u5173","home.tagline":"\u5B66\u4E60\u7EC3\u4E60\u7AD9 \xB7 \u5171 {total} \u9898 \xB7 \u8FDB\u5EA6\u53EA\u5B58\u5728\u672C\u5730\u9879\u76EE\u91CC","home.taglineLocal":"\u5B66\u4E60\u7EC3\u4E60\u7AD9 \xB7 \u5171 {total} \u9898 \xB7 \u8FDB\u5EA6\u4FDD\u5B58\u5728\u6B64\u6D4F\u89C8\u5668","home.statAnswered":"\u5DF2\u7B54","home.statAccuracy":"\u6B63\u786E\u7387","home.statWrong":"\u9519\u9898","home.statRead":"\u5DF2\u770B","home.resumeCta":"\u7EE7\u7EED\u4E0A\u6B21","home.wrongRetry":"\u9519\u9898\u91CD\u7EC3\uFF08{n}\uFF09","home.random20":"\u968F\u673A {n} \u9898","home.byTopic":"\u6309\u4E3B\u9898\u95EF\u5173","home.nowTag":"\u5728\u5B66","home.qUnit":"\u9898","home.extTag":"\u62D3\u5C55 {n}","home.uncategorized":"(\u672A\u5206\u7C7B)","home.planTitle":"\u5B66\u4E60\u8BA1\u5212","home.planDone":"\u5B8C\u6210 {done}/{total}","home.planDeadlineIn":"\u8DDD deadline \u8FD8\u6709 {n} \u5929","home.planDeadlineToday":"deadline \u5C31\u662F\u4ECA\u5929","home.planDeadlineOver":"deadline \u5DF2\u8FC7 {n} \u5929","home.planPace":"\u8282\u594F","home.planRescheduled":"\u5DF2\u91CD\u6392\uFF1A\u4E0B\u4E00\u7AD9\u300C{unit}\u300D\uFF0C{date}","home.planSlack":"\u5BCC\u4F59 {n} \u5929","home.planDueToday":"\u4E0B\u4E00\u5355\u5143\u4ECA\u5929\u5230\u671F","home.planCleared":"\u65E5\u7A0B\u5DF2\u5168\u90E8\u5B8C\u6210","home.planNoCalendar":"\u8BA1\u5212\u65E0\u65E5\u7A0B\u65E5\u671F\uFF0C\u8282\u594F\u5BF9\u7167\u4E0D\u53EF\u7B97","home.planProjection":"\u6309\u8FD1 {window} \u5929\u901F\u7387\uFF0C\u9884\u8BA1 {date} \u5B8C\u6210","home.planProjSlack":"\u6BD4 deadline \u5BCC\u4F59 {n} \u5929","home.planProjDeficit":"\u6BD4 deadline \u7F3A\u53E3 {n} \u5929","home.planProjNoData":"\u8FD1 {window} \u5929\u65E0\u5B8C\u6210\u8BB0\u5F55\uFF0C\u901F\u7387\u4E0D\u8DB3\uFF0C\u4E0D\u786C\u7B97\u5916\u63A8","home.planProjComplete":"\u5168\u90E8\u5355\u5143\u5DF2\u5B8C\u6210","home.planGap":"\u8DDD\u4E0A\u6B21\u5B66\u4E60 {n} \u5929","home.planNoContact":"\u5C1A\u65E0\u5B66\u4E60\u63A5\u89E6\u8BB0\u5F55","home.todayTouched":"\u4ECA\u5929\u5DF2\u89E6\u8FBE","home.welcomeBack":"\u6B22\u8FCE\u56DE\u6765","home.warmupCta":"\u70ED\u8EAB\u4E00\u9898 \xB7 {name}","home.warmupCtaPlain":"\u70ED\u8EAB\u4E00\u9898","home.warmupHintSchedule":"\u65E5\u7A0B\u843D\u4E0B\u7684\u8003\u70B9\uFF0C\u5148\u505A\u4E00\u9898\u627E\u56DE\u624B\u611F","home.warmupHintWeak":"\u6700\u8584\u5F31\u7684\u8003\u70B9\uFF0C\u5148\u505A\u4E00\u9898\u627E\u56DE\u624B\u611F","home.warmupHintNext":"\u4E0B\u4E00\u7AD9\u8003\u70B9\uFF0C\u5148\u505A\u4E00\u9898\u627E\u56DE\u624B\u611F","home.shiftAdviceDeadline":"\u6309\u4F60\u7684\u5B9E\u6D4B\u901F\u7387\uFF08\u8FD1 {window} \u5929\u7EA6 {pace} \u5929/\u5355\u5143\uFF09\uFF0C\u5269\u4F59 {n} \u4E2A\u5355\u5143\u7EA6\u9700 {days} \u5929\u2014\u2014\u53EF\u91CD\u6392\uFF1A\u4E0B\u6B21\u89C1\u6559\u7EC3\u786E\u8BA4\u540E\uFF0C\u628A\u65E5\u7A0B\u6574\u4F53\u540E\u79FB {shift} \u5929","home.shiftAdviceNoDeadline":"\u6309\u4F60\u7684\u5B9E\u6D4B\u901F\u7387\uFF08\u8FD1 {window} \u5929\u7EA6 {pace} \u5929/\u5355\u5143\uFF09\uFF0C\u5269\u4F59 {n} \u4E2A\u5355\u5143\u7EA6\u9700 {days} \u5929\u2014\u2014\u53EF\u91CD\u6392\uFF1A\u4E0B\u6B21\u89C1\u6559\u7EC3\u786E\u8BA4\u540E\uFF0C\u628A\u65E5\u7A0B\u6574\u4F53\u540E\u79FB {shift} \u5929","home.planRemaining":"\u5269\u4F59 {n} \u5355\u5143","home.planStatusInProgress":"\u5728\u5B66","home.planStatusPaused":"\u6401\u7F6E","panorama.title":"\u5168\u666F","panorama.taught":"\u8BB2","panorama.practiced":"\u7EC3","panorama.mastered":"\u638C","panorama.answered":"\u7B54 {answered}/{total}","panorama.oral":"\u53E3\u5934 {correct}/{asked}","panorama.stale":"\u300C\u8BB2\u8FC7\u300D\u4FE1\u53F7\u622A\u81F3\u4E0A\u6B21\u6784\u5EFA\uFF1B\u7B54\u9898\u4E0E\u53E3\u8FF0\u5B9E\u65F6\uFF08\u65E0\u5B9E\u65F6\u53E3\u8FF0\u7684\u8003\u70B9\u56DE\u9000\u4E0A\u6B21\u6784\u5EFA\uFF09\u3002","panorama.graphHint":"\u8FDE\u7EBF\u6765\u81EA\u77E5\u8BC6\u56FE\u8C31\u6295\u5F71\uFF1A\u5B9E\u7EBF\u7BAD\u5934=\u524D\u7F6E\uFF08\u5148\u5B66\uFF09\uFF0C\u865A\u7EBF=\u5173\u8054\uFF1B\u8282\u70B9=\u638C\u63E1\u56DB\u6001\u3002","panorama.stateMastered":"\u5DF2\u638C\u63E1","panorama.stateInProgress":"\u5728\u5B66","panorama.stateWeak":"\u8584\u5F31","panorama.stateUntouched":"\u672A\u63A5\u89E6","panorama.totalPoints":"\u5171 {n} \u8003\u70B9","panorama.knowflowLabel":"\u524D\u7F6E\u5173\u7CFB\u8FDE\u7EBF","panorama.byTopic":"\u6309\u5927\u7C7B\u770B\u8003\u70B9","panorama.byTopicHint":"\u4E00\u4E2A\u8282\u70B9 = \u4E00\u4E2A\u8003\u70B9 \xB7 \u70B9\u8282\u70B9\u770B\u8F68\u8FF9 / \u76F4\u8FBE\u9898\u96C6","panorama.topicMasteredPrefix":"\u5DF2\u638C\u63E1","panorama.topicEpUnit":"\u8003\u70B9","panorama.noEp":"\u5F53\u524D\u9898\u5E93\u6CA1\u6709\u8003\u70B9\u6807\u8BB0\uFF08examPoint\uFF09\uFF0C\u65E0\u6CD5\u6D3E\u751F\u638C\u63E1\u5EA6\u3002","panorama.filterAll":"\u5168\u90E8","panorama.filterWeak":"\u53EA\u770B\u8584\u5F31","panorama.filterUnmastered":"\u53EA\u770B\u672A\u638C\u63E1","panorama.filterAria":"\u8003\u70B9\u7B5B\u9009","panorama.sheetClose":"\u5173\u95ED","panorama.sheetPractice":"\u53BB\u5237\u8FD9\u8003\u70B9\u7684\u9898","panorama.sheetCourse":"\u770B\u8BFE\u7A0B","panorama.statWrongTimes":"\u9519 {n} \u6B21","panorama.statFlash":"\u95EA\u5361 {graduated}/{mapped} \u6BD5\u4E1A","panorama.timelineTitle":"\u5B66\u4E60\u8F68\u8FF9","panorama.timelineEmpty":"\u8FD8\u6CA1\u6709\u5B66\u4E60\u75D5\u8FF9\u2014\u2014\u4ECE\u4E0B\u65B9\u5F00\u59CB\u8FD9\u4E2A\u8003\u70B9","panorama.tlToday":"\u4ECA\u5929","panorama.tlFirst":"\u9996\u6B21\u63A5\u89E6","panorama.tlCorrect":"\u7B54\u5BF9","panorama.tlWrong":"\u7B54\u9519","panorama.tlWrongRun":"\u8FDE\u9519 {n} \u9898","panorama.tlOralCorrect":"\u53E3\u8FF0\u7B54\u5BF9","panorama.tlOralWrong":"\u53E3\u8FF0\u7B54\u9519","panorama.tlFlash":"\u95EA\u5361\u6BD5\u4E1A","panorama.tlMastered":"\u8003\u70B9\u638C\u63E1","panorama.tlMasteredSub":"\u9898\u5168\u5BF9 + \u65E0\u672A\u6BD5\u4E1A\u9519\u9898","panorama.planDone":"\u8BA1\u5212\uFF1A\u5B8C\u6210 {done}/{total}","panorama.nextLabel":"\u4E0B\u4E00\u7AD9","panorama.nextGoWeak":"\u53BB\u8865\u8FD9\u4E00\u8BFE","panorama.nextGo":"\u53BB\u5B66\u8FD9\u4E00\u8BFE","panorama.nextWhyWeak":"\u6709 {n} \u9053\u672A\u6BD5\u4E1A\u9519\u9898","panorama.nextWhyWeakBlocks":"\u6709 {n} \u9053\u672A\u6BD5\u4E1A\u9519\u9898\uFF0C\u62D6\u4F4F\u4E86 {m} \u4E2A\u4E0B\u6E38\u8003\u70B9\uFF08{names}\uFF09","panorama.nextWhyUnlocked":"\u524D\u7F6E\u5DF2\u5168\u90E8\u89E3\u9501\uFF0C\u7ED3\u6784\u4E0A\u7684\u4E0B\u4E00\u7AD9","panorama.nextWhySchedule":"\u6309\u6392\u5E03\u8868\u987A\u63A8\u7684\u4E0B\u4E00\u7AD9","panorama.nextWhyBehind":"\u65E5\u7A0B\u5DF2\u843D\u540E {n} \u5929\uFF08\u76EE\u6807\u65E5 {date}\uFF09","panorama.nextAltWeakPref":"\u4E0D\u60F3\u8865\u5F31\uFF1F\u6309\u7ED3\u6784\u987A\u63A8 \u2192","panorama.nextAltWeakPrefSched":"\u4E0D\u60F3\u8865\u5F31\uFF1F\u6309\u6392\u5E03\u8868\u987A\u63A8 \u2192","panorama.nextAltGenPref":"\u6362\u4E2A\u4F18\u5148\u7EA7 \u2192","panorama.nextAltAfter":"\u63A5\u4E0B\u6765 \u2192","panorama.nextAltUnlocked":"{name} \xB7 \u524D\u7F6E\u5DF2\u89E3\u9501","panorama.nextAltNext":"{name} \xB7 \u6392\u5E03\u8868\u4E0B\u4E00\u9879","panorama.nextAltWeak":"{name} \xB7 \u8584\u5F31","panorama.paceProj":"\u6309\u5F53\u524D\u8282\u594F\u9884\u8BA1 {date} \u5B8C\u6210","panorama.paceProjSlack":"\u6BD4\u76EE\u6807\u5BCC\u4F59 {n} \u5929","panorama.paceProjDeficit":"\u8DDD\u76EE\u6807\u5DEE {n} \u5929","panorama.paceDeadlineIn":"\u8DDD\u76EE\u6807\u65E5\u8FD8\u6709 {n} \u5929","panorama.paceDeadlineToday":"\u76EE\u6807\u65E5\u5C31\u662F\u4ECA\u5929","panorama.paceDeadlineOver":"\u76EE\u6807\u65E5\u5DF2\u8FC7 {n} \u5929","panorama.paceAria":"\u67E5\u770B\u9996\u9875\u5B8C\u6574\u5B66\u4E60\u8BA1\u5212","practice.readMode":"\u770B\u9898\u6A21\u5F0F","practice.layerAll":"\u5168\u90E8","practice.redoSet":"\u91CD\u505A\u672C\u9898\u96C6","practice.redoSetTitle":"\u6E05\u7A7A\u672C\u9898\u96C6\u7B54\u9898\u8BB0\u5F55\uFF0C\u91CD\u65B0\u4F5C\u7B54","practice.jumpUnanswered":"\u8DF3\u5230\u672A\u7B54","practice.jumpUnansweredTitle":"\u8DF3\u5230\u672C\u9898\u96C6\u7B2C\u4E00\u9053\u672A\u7B54\u9898","practice.rereadSet":"\u91CD\u770B\u672C\u9898\u96C6","practice.rereadSetTitle":"\u6E05\u7A7A\u672C\u9898\u96C6\u770B\u9898\u8FDB\u5EA6\uFF0C\u91CD\u65B0\u770B\u9898","practice.viewPractice":"\u7B54\u9898","practice.viewRead":"\u770B\u9898","practice.mastered":"\u5DF2\u638C\u63E1 {n}","practice.readCount":"\u5DF2\u770B {n}","practice.answeredCount":"\u5DF2\u7B54 {n}","practice.noWrong":"\u6682\u65E0\u9519\u9898\uFF0C\u53BB\u505A\u51E0\u9053\u9898\u5427\uFF01","practice.noQuestionsScope":"\u300C{name}\u300D\u6682\u65E0\u9898\u76EE\u3002","practice.noQuestions":"\u6CA1\u6709\u9898\u76EE\u3002","practice.backHome":"\u8FD4\u56DE\u9996\u9875","practice.prev":"\u4E0A\u4E00\u9898","practice.next":"\u4E0B\u4E00\u9898","practice.finish":"\u5B8C\u6210\u7B54\u9898","practice.backToFirst":"\u56DE\u5230\u7B2C\u4E00\u9898","practice.nextSet":"\u4E0B\u4E00\u9898\u96C6\uFF1A{label}","practice.stayHere":"\u7559\u5728\u8FD9\u91CC\uFF08\u5173\u95ED\uFF09","practice.keepReading":"\u7EE7\u7EED\u770B\u9898\uFF08\u5173\u95ED\uFF09","practice.labelWrong":"\u9519\u9898\u96C6","practice.labelSequential":"\u987A\u5E8F\u7EC3\u4E60","practice.labelQuoted":"\u300C{name}\u300D","practice.confirmRedo":"\u91CD\u7F6E{label}\u7684\u7B54\u9898\u8BB0\u5F55\uFF1F\uFF08{n} \u9898\uFF0C\u542B\u5BF9\u9519\u4E0E\u9519\u9898\u8FDB\u5EA6\uFF0C\u4E0D\u53EF\u6062\u590D\u3002\u4E0D\u5F71\u54CD\u5176\u4ED6\u4E3B\u9898\u4E0E\u95EA\u5361\u3002\uFF09","practice.confirmReread":"\u91CD\u770B{label}\uFF1F\uFF08{n} \u9898\uFF0C\u6E05\u9664\u672C\u9898\u96C6\u770B\u9898\u8FDB\u5EA6\uFF0C\u4E0D\u53EF\u6062\u590D\u3002\u4E0D\u5F71\u54CD\u5176\u4ED6\u4E3B\u9898\u4E0E\u7B54\u9898\u8BB0\u5F55\u3002\uFF09","practice.summaryAria":"\u7B54\u9898\u603B\u7ED3","q.multi":"\u591A\u9009\u9898","q.judge":"\u5224\u65AD\u9898","q.single":"\u5355\u9009\u9898","q.difficulty":"\u96BE\u5EA6 {level}","q.index":"\u7B2C {n} \u9898","q.imageAlt":"\u9898\u76EE\u914D\u56FE","q.submitSelfEval":"\u63D0\u4EA4\uFF08\u81EA\u8BC4\uFF09","q.submit":"\u63D0\u4EA4\u7B54\u6848","q.correct":"\u56DE\u7B54\u6B63\u786E","q.wrong":"\u56DE\u7B54\u9519\u8BEF\uFF0C\u6B63\u786E\u7B54\u6848\uFF1A{answer}","q.wrongCountHistory":"\xB7 \u5386\u53F2\u9519 {n} \u6B21","q.wrongCountTotal":"\xB7 \u7D2F\u8BA1\u9519 {n} \u6B21","q.streakProgress":"\u8FDE\u5BF9 {streak}/{needed}\uFF0C\u518D\u7B54\u5BF9 {left} \u6B21\u81EA\u52A8\u79FB\u51FA\u9519\u9898\u96C6","q.streakLabel":"\u9519\u9898\u8FDE\u5BF9\u8FDB\u5EA6","q.mastered":"\u5DF2\u638C\u63E1\uFF0C\u79FB\u51FA\u9519\u9898\u96C6","q.dismiss":"\u79FB\u51FA","q.dismissTitle":"\u624B\u52A8\u79FB\u51FA\u9519\u9898\u96C6\uFF08\u4E0D\u518D\u5FAA\u73AF\u51FA\u73B0\uFF09","q.confirmDismiss":"\u628A\u8FD9\u9898\u79FB\u51FA\u9519\u9898\u96C6\uFF1F","q.selfEvalNote":"\u81EA\u8BC4\u9898\uFF08\u539F\u56FE\u65E0\u6807\u51C6\u7B54\u6848\uFF09","q.analysis":"\u89E3\u6790\uFF1A","opt.correctAnswer":"\u6B63\u786E\u7B54\u6848","opt.wrongAnswer":"\u9519\u9009\u7684\u9009\u9879","confirm.cancel":"\u53D6\u6D88","confirm.ok":"\u786E\u5B9A","confirm.aria":"\u786E\u8BA4\u64CD\u4F5C","srs.again":"\u91CD\u5B66","srs.hard":"\u56F0\u96BE","srs.good":"\u826F\u597D","srs.easy":"\u7B80\u5355","srs.aria":"\u8BC4\u5206","summary.tierGood":"\u638C\u63E1\u5F97\u4E0D\u9519","summary.tierOk":"\u7EE7\u7EED\u5DE9\u56FA","summary.tierLow":"\u591A\u7EC3\u51E0\u8F6E","summary.title":"\u7B54\u9898\u5B8C\u6210 \xB7 {title}","summary.answered":"\u5DF2\u7B54","summary.correctCount":"\u7B54\u5BF9","summary.wrongCount":"\u7B54\u9519","summary.selfRated":"\u542B {n} \u9053\u81EA\u8BC4\u9898\uFF08\u4E0D\u8BA1\u5165\u6B63\u786E\u7387\uFF09","summary.totalNote":"\u5171 {n} \u9898 \xB7 \u8BE5\u4E3B\u9898\u7D2F\u8BA1\u6B63\u786E\u7387","summary.nextHook":"\u4E0B\u6B21\uFF1A{name} \u53E3\u8FF0 3 \u9898 \xB7 \u7EA6 {minutes} \u5206\u949F","summary.backHome":"\u8FD4\u56DE\u9996\u9875","summary.redo":"\u91CD\u505A\u672C\u9898\u96C6","fc.extraDone":"\u989D\u5916\u7EC3\u4E60\u5B8C\u6210!","fc.extraDoneNote":"\u672C\u8F6E\u53C8\u8FC7\u4E86 {n} \u5F20\uFF0C\u8BC4\u5206\u5DF2\u8BB0\u5F55","fc.back":"\u8FD4\u56DE\u95EA\u5361","fc.todayDone":"\u4ECA\u65E5\u590D\u4E60\u5B8C\u6210!","fc.todayDoneNote":"\u4ECA\u5929\u590D\u4E60\u4E86 {n} \u5F20","fc.streak":"\u8FDE\u7EED\u575A\u6301 {n} \u5929","fc.nextDue":"\u4E0B\u4E00\u5F20\u5361\u7EA6 {interval}\u540E\u5230\u671F","fc.learningLaterToday":"\u8FD8\u6709 {n} \u5F20\u5B66\u4E60\u5361\u4ECA\u5929\u665A\u4E9B\u65F6\u5019\u5230\u671F\uFF0C\u5230\u65F6\u53EF\u7EE7\u7EED\u5237","fc.extraRound":"\u518D\u7EC3\u4E00\u8F6E\uFF08\u989D\u5916\u590D\u4E60\uFF0C\u4E0D\u66F4\u65B0\u8FDE\u7EED\u5929\u6570\uFF09","fc.new":"\u65B0\u5361","fc.learning":"\u5B66\u4E60\u4E2D","fc.review":"\u5F85\u590D\u4E60","fc.includesRelearn":"\xB7 \u542B {n} \u5F20\u91CD\u5B66","fc.extraTag":"\xB7 \u989D\u5916\u7EC3\u4E60","fc.phaseNew":"\u65B0\u5361","fc.phaseLearning":"\u5B66\u4E60\u6B65 {cur}/{total}\xB7{step}m","fc.phaseRelearning":"\u91CD\u5B66\xB7{step}m","fc.phaseReview":"\u590D\u4E60","fc.hintFlip":"\u70B9\u51FB\u5361\u7247\u6216\u7A7A\u683C\u7FFB\u9762","fc.hintRate":"\u9009\u4E0B\u65B9\u8BC4\u5206\uFF08\u6216\u6309 1-4\uFF09","fc.showAnswer":"\u663E\u793A\u7B54\u6848","fch.title":"\u95EA\u5361\u590D\u4E60","fch.tagline":"\u95F4\u9694\u91CD\u590D \xB7 \u79D1\u5B66\u6297\u9057\u5FD8 \xB7 \u5171 {n} \u5F20","fch.todayDone":"\u4ECA\u65E5\u590D\u4E60\u5DF2\u5B8C\u6210","fch.start":"\u5F00\u59CB\u4ECA\u65E5\u590D\u4E60","fch.count":"\uFF08{n} \u5F20\uFF09","fch.nothingToday":"\u4ECA\u65E5\u65E0\u53EF\u590D\u4E60\u7684\u5361","fch.rerunAll":"\u518D\u7EC3\u5168\u90E8 {n} \u5F20","fch.rerunNote":"\u989D\u5916\u7EC3\u4E60 \xB7 \u4E0D\u66F4\u65B0\u8FDE\u7EED\u5929\u6570 \xB7 \u8BC4\u5206\u4ECD\u8BB0\u5F55","fch.newPerDay":"\u6BCF\u65E5\u65B0\u5361\u6570","fch.save":"\u4FDD\u5B58","fch.cancel":"\u53D6\u6D88","courses.notReady":"\u8BFE\u7A0B\u672A\u5C31\u7EEA","courses.notReadyHint":"\u8BFE\u7A0B\u5185\u5BB9\u76F4\u8BFB examples/<theme>/\uFF0C\u653E\u8FDB\u9879\u76EE\u91CC\u5237\u65B0\u5373\u53EF\uFF0C\u65E0\u9700\u6784\u5EFA\u3002","courses.frameTitle":"\u5B66\u4E60\u8BFE\u7A0B","courses.index":"\u8BFE\u7A0B\u76EE\u5F55","courses.tocCount":" \xB7 {done}/{total}","courses.doneProgress":"\u8BFE\u5DF2\u5B66\u5B8C {done}/{total}","courses.markDone":"\u2713 \u5B66\u5B8C\u4E86","courses.undoDone":"\u5DF2\u5B66\u5B8C \xB7 \u64A4\u9500","courses.undoDoneTitle":"\u64A4\u9500\u8FD9\u8BFE\u7684\u5B66\u5B8C\u6807\u8BB0\uFF08\u6253\u5F00\u8BFE\u7A0B\u9875\u4E0D\u8BA1\u5165\u5B66\u5B8C\uFF0C\u53EA\u6709\u70B9\u4E86\u624D\u7B97\uFF09","courses.goPractice":"\u53BB\u5237\u8FD9\u8BFE\u7684\u9898","sync.local":"\u5728\u7EBF\u6F14\u793A\u6A21\u5F0F\uFF1A\u8FDB\u5EA6\u4EC5\u4FDD\u5B58\u5728\u6B64\u6D4F\u89C8\u5668\uFF0C\u4E0D\u8054\u7F51\u540C\u6B65","sync.remoteInvalid":"\u670D\u52A1\u5668\u4E0A\u7684\u8FDB\u5EA6\u6570\u636E\u683C\u5F0F\u8FC7\u65E7\uFF0C\u5DF2\u5FFD\u7565\u8FD9\u4EFD\u5FEB\u7167\u2014\u2014\u8FDB\u5EA6\u6682\u4EE5\u672C\u6D4F\u89C8\u5668\u4E3A\u51C6\uFF0C\u4E0B\u6B21\u4FDD\u5B58\u4F1A\u81EA\u52A8\u4FEE\u590D","sync.retrying":"\u6B63\u5728\u91CD\u8BD5\u540C\u6B65\u2026","sync.error":"\u8FDB\u5EA6\u540C\u6B65\u5931\u8D25\uFF0C\u5DF2\u6682\u5B58\u672C\u5730\u3002\u70B9\u51FB\u91CD\u8BD5","sync.retry":"\u91CD\u8BD5","sync.close":"\u5173\u95ED","theme.light":"\u6D45\u8272\u6A21\u5F0F","theme.dark":"\u6DF1\u8272\u6A21\u5F0F","theme.system":"\u8DDF\u968F\u7CFB\u7EDF","theme.title":"\u5F53\u524D\uFF1A{label}\uFF08\u70B9\u51FB\u5207\u6362\uFF09","theme.aria":"\u5207\u6362\u4E3B\u9898\uFF0C\u5F53\u524D{label}","settings.title":"\u5B66\u4E60\u504F\u597D","settings.close":"\u5173\u95ED","settings.extLabel":"\u62D3\u5C55\u52A0\u7EC3","settings.extDesc":"\u9ED8\u8BA4\u5173\u3002\u5F00 = \u663E\u793A\u62D3\u5C55\u5C42\uFF08\u7AE0\u8282\u9898\uFF09\uFF1A\u7EC3\u4E60\u9875\u51FA\u73B0\u5C42\u7B5B\u9009\uFF0C\u9996\u9875\u51FA\u73B0\u62D3\u5C55\u9898\u5757\uFF0C\u7528\u4E8E\u5F31\u8003\u70B9\u8865\u5237","settings.autoLabel":"\u7B54\u5BF9\u81EA\u52A8\u8DF3\u9898","settings.autoDesc":"\u9ED8\u8BA4\u5F00\u3002\u7B54\u5BF9\u540E 3 \u79D2\u81EA\u52A8\u8FDB\u5165\u4E0B\u4E00\u9898\uFF1B\u5173 = \u505C\u5728\u539F\u9898\u65B9\u4FBF\u8BFB\u89E3\u6790","settings.quotaLabel":"\u6BCF\u65E5\u65B0\u5361\u914D\u989D","settings.quotaDesc":"\u95EA\u5361\u6BCF\u5929\u6700\u591A\u5F15\u5165\u7684\u65B0\u5361\u6570\uFF080-50\uFF09\uFF0C\u4E0E\u95EA\u5361\u9875\u8BBE\u7F6E\u540C\u6B65","settings.quotaMinus":"\u51CF\u5C11\u914D\u989D","settings.quotaPlus":"\u589E\u52A0\u914D\u989D","settings.syncHint":"\u504F\u597D\u8DDF\u8FDB\u5EA6\u4E00\u8D77\u5B58\u5728\u672C\u5730\u9879\u76EE\u91CC","settings.resetTitle":"\u6570\u636E\u91CD\u7F6E\uFF08\u4EC5\u5F53\u524D\u4E3B\u9898\uFF09","settings.resetPos":"\u6E05\u7B54\u9898\u4F4D\u7F6E","settings.confirmResetPos":"\u628A\u6240\u6709\u7EC3\u4E60\u5217\u8868\uFF08\u6309\u5929/\u4E3B\u9898\uFF09\u7684\u4F4D\u7F6E\u56DE\u5230\u7B2C 1 \u9898\uFF1F\uFF08\u4E0D\u5F71\u54CD\u7B54\u9898\u8BB0\u5F55\uFF09","settings.resetWrong":"\u6E05\u9519\u9898\u8BB0\u5F55","settings.confirmResetWrong":"\u6E05\u7A7A\u5F53\u524D\u4E3B\u9898\u7684\u9519\u9898\u8BB0\u5F55\uFF1F\uFF08\u9519\u9898\u91CD\u7EC3\u5C06\u6CA1\u6709\u9898\u76EE\uFF0C\u4E0D\u53EF\u6062\u590D\uFF09","settings.resetRead":"\u6E05\u770B\u9898\u8BB0\u5F55","settings.confirmResetRead":"\u6E05\u7A7A\u5F53\u524D\u4E3B\u9898\u7684\u770B\u9898\u8FDB\u5EA6\uFF1F\uFF08\u4E0D\u5F71\u54CD\u7B54\u9898\u8BB0\u5F55\uFF0C\u4E0D\u53EF\u6062\u590D\uFF09","settings.resetSrs":"\u6E05\u95EA\u5361\u8FDB\u5EA6","settings.confirmResetSrs":"\u6E05\u7A7A\u5F53\u524D\u4E3B\u9898\u7684\u95EA\u5361\u8FDB\u5EA6\uFF1F\u6240\u6709\u5361\u56DE\u5230\u65B0\u5361\u72B6\u6001\uFF0C\u8FDE\u7EED\u5929\u6570\u5F52\u96F6\uFF0C\u4E0D\u53EF\u6062\u590D\u3002\uFF08\u4E0D\u5F71\u54CD\u7B54\u9898/\u770B\u9898\u8FDB\u5EA6\uFF09","settings.resetAllTheme":"\u6E05\u7A7A\u672C\u4E3B\u9898\u5168\u90E8\u8FDB\u5EA6\uFF08\u542B\u95EA\u5361\uFF09","settings.confirmResetAllTheme":"\u6E05\u7A7A\u5F53\u524D\u4E3B\u9898\u7684\u5168\u90E8\u8FDB\u5EA6\uFF08\u7B54\u9898 + \u9519\u9898 + \u770B\u9898 + \u95EA\u5361\uFF09\uFF1F\u6B64\u64CD\u4F5C\u4E0D\u53EF\u6062\u590D\u3002\u4E0D\u5F71\u54CD\u5176\u4ED6\u4E3B\u9898\u3002","lang.aria":"\u5207\u6362\u8BED\u8A00","lang.title":"\u8BED\u8A00"};var _d={"app.title":"AI Study Kit \xB7 Practice","app.loading":"Loading progress\u2026","nav.home":"Home","nav.flashcards":"Flashcards","nav.courses":"Courses","nav.panorama":"Panorama","nav.backHome":"Back to home","home.tagline":"Practice site \xB7 {total} questions \xB7 progress stays in your local project","home.taglineLocal":"Practice site \xB7 {total} questions \xB7 progress is saved in this browser","home.heroTitle":"Keep going \u2014 another level today","home.statAnswered":"Answered","home.statAccuracy":"Accuracy","home.statWrong":"Wrong","home.statRead":"Read","home.resumeCta":"Resume","home.wrongRetry":"Retry wrong ({n})","home.random20":"Random {n}","home.byTopic":"Level up by topic","home.nowTag":"Studying","home.qUnit":"questions","home.extTag":"Extra {n}","home.uncategorized":"(Uncategorized)","home.planTitle":"Study plan","home.planDone":"{done}/{total} done","home.planDeadlineIn":"{n} days to deadline","home.planDeadlineToday":"Deadline is today","home.planDeadlineOver":"Deadline passed {n} days ago","home.planPace":"Pace","home.planRescheduled":"Rescheduled: next up \u201C{unit}\u201D, {date}","home.planSlack":"{n} days ahead","home.planDueToday":"Next unit is due today","home.planCleared":"All scheduled units done","home.planNoCalendar":"No scheduled dates in the plan; pace comparison unavailable","home.planProjection":"At the last {window}-day rate, finishing around {date}","home.planProjSlack":"{n} days ahead of deadline","home.planProjDeficit":"{n} days short of deadline","home.planProjNoData":"No completions in the last {window} days; not enough pace data, no projection","home.planProjComplete":"All units completed","home.planGap":"{n} days since last study contact","home.planNoContact":"No study contact yet","home.todayTouched":"Touched base today","home.welcomeBack":"Welcome back","home.warmupCta":"Warm up: {name}","home.warmupCtaPlain":"Warm up with one question","home.warmupHintSchedule":"A station your schedule left behind \u2014 one question to get back in flow","home.warmupHintWeak":"Your weakest point \u2014 one question to get back in flow","home.warmupHintNext":"Your next station \u2014 one question to get back in flow","home.shiftAdviceDeadline":"At your measured pace (\u2248{pace} days/unit over the last {window} days), the remaining {n} units need ~{days} days \u2014 reschedulable: confirm with your coach next session to shift the schedule by {shift} days","home.shiftAdviceNoDeadline":"At your measured pace (\u2248{pace} days/unit over the last {window} days), the remaining {n} units need ~{days} days \u2014 reschedulable: confirm with your coach next session to shift the schedule by {shift} days","home.planRemaining":"{n} units left","home.planStatusInProgress":"In progress","home.planStatusPaused":"Paused","panorama.title":"Panorama","panorama.taught":"Taught","panorama.practiced":"Practiced","panorama.mastered":"Mastered","panorama.answered":"Ans {answered}/{total}","panorama.oral":"Oral {correct}/{asked}","panorama.stale":"Taught signals are as of the last build; answers and oral results are live (points without live oral data fall back to the last build).","panorama.graphHint":"Edges come from the knowledge-graph projection: solid arrows = prerequisite (learn first), dashed = related; nodes = mastery four-state.","panorama.stateMastered":"Mastered","panorama.stateInProgress":"Learning","panorama.stateWeak":"Weak","panorama.stateUntouched":"Untouched","panorama.totalPoints":"{n} exam points total","panorama.knowflowLabel":"Prerequisite links","panorama.byTopic":"Exam points by topic","panorama.byTopicHint":"One node = one exam point \xB7 Tap a node for its trace & question set","panorama.topicMasteredPrefix":"Mastered","panorama.topicEpUnit":"exam points","panorama.noEp":"This question bank has no exam-point tags (examPoint) \u2014 mastery cannot be derived.","panorama.filterAll":"All","panorama.filterWeak":"Weak only","panorama.filterUnmastered":"Not mastered only","panorama.filterAria":"Filter exam points","panorama.sheetClose":"Close","panorama.sheetPractice":"Practice this point","panorama.sheetCourse":"View course","panorama.statWrongTimes":"Wrong {n}\xD7","panorama.statFlash":"Flashcards {graduated}/{mapped} graduated","panorama.timelineTitle":"Learning trace","panorama.timelineEmpty":"No learning history yet \u2014 start this point from the actions below","panorama.tlToday":"Today","panorama.tlFirst":"First touch","panorama.tlCorrect":"Correct","panorama.tlWrong":"Wrong","panorama.tlWrongRun":"{n} wrong in a row","panorama.tlOralCorrect":"Oral answer correct","panorama.tlOralWrong":"Oral answer wrong","panorama.tlFlash":"Flashcard graduated","panorama.tlMastered":"Point mastered","panorama.tlMasteredSub":"All correct + no open wrongs","panorama.planDone":"Plan: {done}/{total} done","panorama.nextLabel":"Next up","panorama.nextGoWeak":"Fix this lesson","panorama.nextGo":"Start this lesson","panorama.nextWhyWeak":"{n} wrong answers still unresolved","panorama.nextWhyWeakBlocks":"{n} wrong answers still unresolved, holding back {m} downstream points ({names})","panorama.nextWhyUnlocked":"All prerequisites unlocked \u2014 next stop on the learning path","panorama.nextWhySchedule":"Next stop in your study schedule","panorama.nextWhyBehind":"{n} days behind schedule (goal {date})","panorama.nextAltWeakPref":"Rather not review? Follow the structure \u2192","panorama.nextAltWeakPrefSched":"Rather not review? Follow the schedule \u2192","panorama.nextAltGenPref":"A different priority \u2192","panorama.nextAltAfter":"Up next \u2192","panorama.nextAltUnlocked":"{name} \xB7 prerequisites unlocked","panorama.nextAltNext":"{name} \xB7 next in schedule","panorama.nextAltWeak":"{name} \xB7 weak","panorama.paceProj":"At your current pace, finishing around {date}","panorama.paceProjSlack":"{n} days ahead of your goal","panorama.paceProjDeficit":"{n} days short of your goal","panorama.paceDeadlineIn":"{n} days to your goal","panorama.paceDeadlineToday":"Your goal is today","panorama.paceDeadlineOver":"Goal passed {n} days ago","panorama.paceAria":"Open the full study plan on the home page","practice.readMode":"Reading mode","practice.layerAll":"All","practice.redoSet":"Redo this set","practice.redoSetTitle":"Clear this set\u2019s answer records and redo it","practice.jumpUnanswered":"Jump to unanswered","practice.jumpUnansweredTitle":"Jump to the first unanswered question in this set","practice.rereadSet":"Re-read this set","practice.rereadSetTitle":"Clear this set\u2019s reading progress and read it again","practice.viewPractice":"Practice","practice.viewRead":"Read","practice.mastered":"Mastered {n}","practice.readCount":"Read {n}","practice.answeredCount":"Answered {n}","practice.noWrong":"No wrong questions yet \u2014 go answer some!","practice.noQuestionsScope":'No questions in "{name}".',"practice.noQuestions":"No questions.","practice.backHome":"Back to home","practice.prev":"Previous","practice.next":"Next","practice.finish":"Finish","practice.backToFirst":"Back to first","practice.nextSet":"Next set: {label}","practice.stayHere":"Stay here (close)","practice.keepReading":"Keep reading (close)","practice.labelWrong":"Wrong questions","practice.labelSequential":"All questions","practice.labelQuoted":'"{name}"',"practice.confirmRedo":"Reset answer records for {label}? ({n} questions, including right/wrong results and wrong-question progress. This cannot be undone. Other topics and flashcards are not affected.)","practice.confirmReread":"Re-read {label}? ({n} questions; clears this set\u2019s reading progress. This cannot be undone. Answer records are not affected.)","practice.summaryAria":"Practice summary","q.multi":"Multiple choice","q.judge":"True / False","q.single":"Single choice","q.difficulty":"Difficulty {level}","q.index":"Question {n}","q.imageAlt":"Question image","q.submitSelfEval":"Submit (self-graded)","q.submit":"Submit","q.correct":"Correct!","q.wrong":"Incorrect. Correct answer: {answer}","q.wrongCountHistory":"\xB7 wrong {n}\xD7 before","q.wrongCountTotal":"\xB7 {n}\xD7 wrong in total","q.streakProgress":"{streak}/{needed} correct in a row \u2014 {left} more to drop it from the wrong set","q.streakLabel":"Wrong-question streak","q.mastered":"Mastered \u2014 removed from the wrong set","q.dismiss":"Remove","q.dismissTitle":"Remove from the wrong-question set (stops recurring)","q.confirmDismiss":"Remove this question from the wrong set?","q.selfEvalNote":"Self-graded (no canonical answer)","q.analysis":"Explanation:","opt.correctAnswer":"Correct answer","opt.wrongAnswer":"Your wrong choice","confirm.cancel":"Cancel","confirm.ok":"OK","confirm.aria":"Confirm action","srs.again":"Again","srs.hard":"Hard","srs.good":"Good","srs.easy":"Easy","srs.aria":"Rate","summary.tierGood":"Well mastered","summary.tierOk":"Keep it up","summary.tierLow":"Practice more","summary.title":"Practice complete \xB7 {title}","summary.answered":"Answered","summary.correctCount":"Correct","summary.wrongCount":"Wrong","summary.selfRated":"Includes {n} self-graded questions (not counted in accuracy)","summary.totalNote":"{n} questions \xB7 cumulative accuracy for this topic","summary.nextHook":"Next up: {name} \u2014 3 oral questions, ~{minutes} min","summary.backHome":"Home","summary.redo":"Redo this set","fc.extraDone":"Extra practice complete!","fc.extraDoneNote":"You went through {n} more cards; ratings recorded","fc.back":"Back to flashcards","fc.todayDone":"Today\u2019s review complete!","fc.todayDoneNote":"Reviewed {n} cards today","fc.streak":"{n}-day streak","fc.nextDue":"Next card due in {interval}","fc.learningLaterToday":"{n} learning cards are due later today \u2014 come back then","fc.extraRound":"Another round (extra review, streak not updated)","fc.new":"New","fc.learning":"Learning","fc.review":"Due","fc.includesRelearn":"\xB7 {n} relearns","fc.extraTag":"\xB7 extra practice","fc.phaseNew":"New","fc.phaseLearning":"Learning {cur}/{total}\xB7{step}m","fc.phaseRelearning":"Relearn\xB7{step}m","fc.phaseReview":"Review","fc.hintFlip":"Click the card or press Space to flip","fc.hintRate":"Rate below (or press 1-4)","fc.showAnswer":"Show answer","fch.title":"Flashcard review","fch.tagline":"Spaced repetition \xB7 beat forgetting \xB7 {n} cards","fch.todayDone":"Today\u2019s review is done","fch.start":"Start today\u2019s review","fch.count":"({n} cards)","fch.nothingToday":"No cards due today","fch.rerunAll":"Practice all {n} cards","fch.rerunNote":"Extra practice \xB7 streak not updated \xB7 ratings still recorded","fch.newPerDay":"New cards per day","fch.save":"Save","fch.cancel":"Cancel","courses.notReady":"Courses not ready","courses.notReadyHint":"Course content is read straight from examples/<theme>/ \u2014 drop it in the project and refresh; no build step.","courses.frameTitle":"Course site","courses.index":"Lesson index","courses.tocCount":" \xB7 {done}/{total}","courses.doneProgress":"Lessons completed {done}/{total}","courses.markDone":"\u2713 Lesson done","courses.undoDone":"Completed \xB7 Undo","courses.undoDoneTitle":"Undo the completed mark for this lesson (opening a lesson never counts \u2014 only this button does)","courses.goPractice":"Practice this lesson's questions","sync.local":"Demo mode: progress is saved in this browser only \u2014 no server sync","sync.remoteInvalid":"The progress data on the server is in an outdated format and was ignored \u2014 progress follows this browser for now; the next save will repair it automatically","sync.retrying":"Retrying sync\u2026","sync.error":"Progress sync failed \u2014 saved locally. Tap to retry.","sync.retry":"Retry","sync.close":"Close","theme.light":"Light","theme.dark":"Dark","theme.system":"System","theme.title":"Current: {label} (click to switch)","theme.aria":"Switch theme, current: {label}","settings.title":"Learning Preferences","settings.close":"Close","settings.extLabel":"Extension Drills","settings.extDesc":"Off by default. On = show the extension layer (chapter questions): layer filter in practice, extension sets on home \u2014 for drilling weak topics","settings.autoLabel":"Auto-advance on Correct","settings.autoDesc":"On by default. Jumps to the next question 3s after a correct answer; off = stay to read the explanation","settings.quotaLabel":"Daily New Cards","settings.quotaDesc":"Max new flashcards introduced per day (0-50), synced with the flashcards page","settings.quotaMinus":"Decrease quota","settings.quotaPlus":"Increase quota","settings.syncHint":"Preferences are saved with your progress in the project folder","settings.resetTitle":"Data reset (current theme only)","settings.resetPos":"Reset list positions","settings.confirmResetPos":"Move every practice list (by day/topic) back to question 1? (Answer records are not affected)","settings.resetWrong":"Clear wrong log","settings.confirmResetWrong":"Clear the wrong-question records of the current theme? (Wrong-question practice will have nothing to show; this cannot be undone)","settings.resetRead":"Clear read progress","settings.confirmResetRead":"Clear the reading progress of the current theme? (Answer records are not affected; this cannot be undone)","settings.resetSrs":"Clear flashcards","settings.confirmResetSrs":"Clear the flashcard progress of the current theme? Every card returns to new and the streak resets to zero. This cannot be undone. (Answer/reading progress is not affected)","settings.resetAllTheme":"Clear ALL progress of this theme (incl. flashcards)","settings.confirmResetAllTheme":"Clear ALL progress of the current theme (answers + wrong + reading + flashcards)? This cannot be undone. Other themes are not affected.","lang.aria":"Switch language","lang.title":"Language"},Wd={"panorama.nextWhyWeak":"{n} wrong answer still unresolved","panorama.nextWhyWeakBlocks":"{n} wrong answer still unresolved, holding back {m} downstream points ({names})","panorama.nextWhyBehind":"{n} day behind schedule (goal {date})","home.planDeadlineIn":"{n} day to deadline","home.planSlack":"{n} day ahead"};var jd=require("react/jsx-runtime");var Gd={zh:Ro,en:_d},Dr="ask-lang",Do="ask-lang-updated-at";function lt(e){return e==="zh"||e==="en"?e:null}function tc(e){let t=Gd[e]??Gd.zh,a=e==="en"?Wd:null;return(r,o)=>{let s=(a&&Number(o?.n)===1?a[r]:void 0)??t[r]??Ro[r]??String(r);if(o)for(let[d,l]of Object.entries(o))s=s.split(`{${d}}`).join(String(l));return s}}function ac(){try{let e=navigator.languages?.length?navigator.languages:[navigator.language];for(let t of e){let a=String(t).toLowerCase().split("-")[0],r=lt(a);if(r)return r}}catch{}return"en"}function rc(){try{let e=lt(localStorage.getItem(Dr));if(e)return e}catch{}return ac()}var zd=(0,ke.createContext)(null);function Vd({children:e,initialLang:t}){let{progress:a,loaded:r,setLang:o}=Se(),[n,s]=(0,ke.useState)(()=>lt(t)??rc());(0,ke.useEffect)(()=>{let u=lt(t);if(u){s(u);try{localStorage.setItem(Dr,u)}catch{}}},[t]),(0,ke.useEffect)(()=>{if(!r||lt(t))return;let u=lt(a.lang),p=a.langUpdatedAt??0;if(!u)return;let i=0;try{i=parseInt(localStorage.getItem(Do)??"0",10)||0}catch{}if(p>i){try{localStorage.setItem(Dr,u),localStorage.setItem(Do,String(p))}catch{}s(u)}},[r,t,a.lang,a.langUpdatedAt]);let d=(0,ke.useMemo)(()=>tc(n),[n]),l=(0,ke.useCallback)(u=>{let p=lt(u)??"zh",i=Date.now();try{localStorage.setItem(Dr,p),localStorage.setItem(Do,String(i))}catch{}s(p),o(p)},[o]);return(0,jd.jsx)(zd.Provider,{value:{lang:n,setLang:l,t:d},children:e})}function ae(){let e=(0,ke.useContext)(zd);if(!e)throw new Error("useI18n must be used within <I18nProvider>");return e}var v=require("react/jsx-runtime"),oc=25,nc=12;function Xd(){let{progress:e,syncStatus:t}=Se(),{t:a}=ae(),r=e.settings?.extOn===!0,o=(0,ie.useMemo)(()=>Zs(e,X),[e]),n=Pt(e,X).length,s=(0,ie.useMemo)(()=>Ys(e,X),[e]),d=g=>o.total===0?0:Math.round(g/o.total*100),l={};for(let[g,D]of Object.entries(me.topicStyles??{}))l[g]=Ts(D.icon);let u=(0,ie.useMemo)(()=>{let g={};for(let D of za)g[D]=Ga(D,X);return g},[]),p=(0,ie.useMemo)(()=>{let g=new Map;for(let D of X)!D.subtopic||Le(D)||g.set(D.subtopic,(g.get(D.subtopic)??0)+1);return g},[]),i=(0,ie.useMemo)(()=>X.filter(g=>Le(g)).length,[]),m=(0,ie.useMemo)(()=>{let g=new Set;for(let D of X){let k=e.answers[D.id];k&&!ge(k)&&!k.fromRandom&&g.add(D.id)}return g},[e.answers]),c=(0,ie.useMemo)(()=>{let g,D=-1;for(let S of X){let O=e.answers[S.id];if(!O||ge(O)||O.fromRandom)continue;let J=O.submittedAt??0;J>D&&(D=J,g=S.id)}if(!g)return null;let k=X.find(S=>S.id===g);return k?{topic:k.topic||"",subtopic:k.subtopic,isExt:!Le(k)}:null},[e.answers]),f=(0,ie.useMemo)(()=>Hs(X,m,c),[m,c]),h=(0,ie.useMemo)(()=>{let g=new Map;for(let D of f)for(let k of D.subs)g.set(k.sub,k);return g},[f]),b=(0,ie.useMemo)(()=>X.map(g=>g.id),[]),w=(0,ie.useMemo)(()=>he.units.length===0?null:Rr({plan:he,progress:e,now:Date.now(),questionIds:b,cardIds:ue.map(g=>g.id),theme:Ue.theme}),[e,b]),x=(0,ie.useMemo)(()=>he.units.length===0?null:Pr(he,Date.now()),[he.units.length]),L=(0,ie.useMemo)(()=>new Set(X.map(g=>g.topic||"")),[]),y=Ue,B=(0,ie.useMemo)(()=>Co(e,Date.now(),{questionIds:b,cardIds:ue.map(g=>g.id),theme:y.theme}),[e,b]),N=(0,ie.useMemo)(()=>{if(!B.available||(B.daysSinceLastContact??0)<So)return null;let g=ea(X,e.answers,y.examPoints??{},ue,e.srs??{},ot,y.examDays??{},Vt(e.oralAttempts,y.theme)),D=ta(g.groups),k=w?{deadline:w.projection.deadline,overdue:w.calendarDiff.overdue,diffDays:w.calendarDiff.diffDays}:null,S=k?aa(k,D,y.examDays??{}):null,O=ra({points:D,edges:ot.graph?.edges??null,planGap:S}),J=Hd(X,e,O.primary),G=w?Md(he,Date.now(),B,w.projection):null;return{warmup:J,shift:G}},[B,e,w]),H=(0,ie.useMemo)(()=>{let g=N?.warmup;if(!g)return null;if(g.ep)return`/practice/all?ep=${encodeURIComponent(g.ep)}`;let D=X.find(S=>S.id===g.questionId);if(!D)return null;let k=D.subtopic?`&subtopic=${encodeURIComponent(D.subtopic)}`:"";return`/practice/all?topic=${encodeURIComponent(D.topic||"")}${k}`},[N]),[V,de]=(0,ie.useState)(()=>c?new Set([c.topic]):new Set),A=g=>de(D=>{let k=new Set(D);return k.has(g)?k.delete(g):k.add(g),k});return(0,v.jsxs)("div",{className:"max-w-4xl mx-auto px-4 py-8 space-y-7",children:[(0,v.jsxs)("header",{className:"text-center",children:[(0,v.jsx)("h1",{className:"text-[22px] sm:text-2xl font-extrabold text-text-primary tracking-tight",children:a("home.heroTitle")}),(0,v.jsx)("p",{className:"text-text-muted text-sm mt-2",children:a(t==="local"?"home.taglineLocal":"home.tagline",{total:o.total})}),B.available&&B.daysSinceLastContact===0&&(0,v.jsx)("div",{className:"flex justify-center mt-3",children:(0,v.jsxs)("span",{className:"inline-flex items-center gap-1.5 rounded-full bg-st-green-soft border-2 border-st-green/30 px-3 py-0.5 text-xs font-bold text-st-green-ink",children:[(0,v.jsx)(ze,{className:"h-3.5 w-3.5",strokeWidth:3,"aria-hidden":!0}),a("home.todayTouched")]})})]}),(0,v.jsxs)("div",{className:"grid grid-cols-2 sm:grid-cols-4 gap-3",children:[(0,v.jsx)(er,{label:a("home.statAnswered"),value:`${d(o.answered)}%`,color:"green",icon:at}),(0,v.jsx)(er,{label:a("home.statAccuracy"),value:o.answered?`${Math.round(o.accuracy*100)}%`:"\u2014",color:"blue",icon:at}),(0,v.jsx)(er,{label:a("home.statWrong"),value:n,color:"red",icon:at}),(0,v.jsx)(er,{label:a("home.statRead"),value:`${d(s)}%`,color:"gold",icon:Fe})]}),N?.warmup&&H&&(0,v.jsx)(sc,{gapDays:B.daysSinceLastContact??0,warmup:N.warmup,link:H,shift:N.shift}),w&&(0,v.jsx)(dc,{report:w,topicIds:L,resched:x}),(0,v.jsxs)("div",{className:`grid gap-3 ${c?"grid-cols-1 sm:grid-cols-[2fr_1fr_1fr]":"grid-cols-2"}`,children:[c&&(()=>{let g=c.isExt&&!r,D=c.isExt&&r?"&layer=\u62D3\u5C55":"",k=c.subtopic&&!g?`/practice/all?topic=${encodeURIComponent(c.topic)}&subtopic=${encodeURIComponent(c.subtopic)}${D}`:`/practice/all?topic=${encodeURIComponent(c.topic)}`,S=c.subtopic&&!g?zt(c.subtopic):"",O=nt(c.topic)||a("home.uncategorized");return(0,v.jsxs)(te,{variant:"green",size:"md",to:k,className:"w-full",children:[(0,v.jsx)(rt,{className:"h-4 w-4 shrink-0",strokeWidth:2.5,"aria-hidden":!0}),(0,v.jsxs)("span",{className:"truncate",children:[a("home.resumeCta")," \xB7 ",O,S?` \xB7 ${S}`:""]})]})})(),(0,v.jsxs)(te,{variant:"blue",size:"md",to:"/practice/wrong",className:"w-full",children:[(0,v.jsx)(St,{className:"h-4 w-4",strokeWidth:2.5,"aria-hidden":!0}),(0,v.jsx)("span",{className:"truncate",children:a("home.wrongRetry",{n})})]}),(0,v.jsxs)(te,{variant:"blue",size:"md",to:"/practice/random",className:"w-full",children:[(0,v.jsx)(vt,{className:"h-4 w-4",strokeWidth:2.5,"aria-hidden":!0}),(0,v.jsx)("span",{className:"truncate",children:a("home.random20",{n:Math.min(20,i)})})]})]}),(0,v.jsxs)("div",{className:"space-y-2.5",children:[(0,v.jsx)("h2",{className:"text-center text-[17px] font-extrabold text-text-primary",children:(0,v.jsx)("span",{className:"inline-block bg-st-green-soft text-st-green-ink px-3.5 py-0.5 rounded-full",children:a("home.byTopic")})}),(0,v.jsx)("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3.5",children:f.map(({topic:g,answered:D,total:k})=>{let S=l[g]??pt,O=u[g],J=O&&O.length>0,G=V.has(g),Y=c?.topic===g,ne=k===0?0:Math.round(D/k*100),ee=ne>0&&ne<oc,ce=ne===0?"text-text-faint":ee?"text-st-green-low-dark":"text-st-green-ink",se=(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(ar,{p:ne,tone:ee?"green-low":"green",size:52,ariaHidden:!0,children:(0,v.jsxs)("b",{"aria-hidden":!0,className:`text-[12px] font-extrabold tabular-nums ${ce}`,children:[ne,"%"]})}),(0,v.jsxs)("div",{className:"flex-1 min-w-0",children:[(0,v.jsxs)("div",{className:"flex items-center gap-1.5 min-w-0",children:[(0,v.jsx)(S,{className:"h-4 w-4 shrink-0 opacity-60",strokeWidth:2,"aria-hidden":!0}),(0,v.jsx)("span",{className:"font-bold text-[15px] truncate",children:nt(g)||a("home.uncategorized")}),Y&&(0,v.jsxs)("span",{className:"shrink-0 text-[13px] font-bold text-st-gold-ink",children:["\xB7 ",a("home.nowTag")]})]}),(0,v.jsxs)("div",{className:"text-[13px] text-text-muted font-bold tabular-nums mt-0.5",children:[(0,v.jsx)("b",{className:ce,children:D}),"/",k," ",a("home.qUnit")]})]})]});return(0,v.jsxs)("div",{className:`rounded-2xl border-2 border-border bg-bg-surface shadow-card-3d ${J?"overflow-hidden":""}`,children:[J?(0,v.jsxs)("button",{onClick:()=>A(g),className:"w-full flex items-center gap-3.5 p-4 text-left hover:bg-bg-hover transition-colors","aria-expanded":G,children:[se,(0,v.jsx)(Ia,{className:`h-4 w-4 shrink-0 opacity-50 transition-transform ${G?"rotate-180":""}`,strokeWidth:2,"aria-hidden":!0})]}):(0,v.jsx)(pe,{to:`/practice/all?topic=${encodeURIComponent(g)}`,className:"flex items-center gap-3.5 p-4 hover:bg-bg-hover transition-colors",children:se}),J&&G&&(0,v.jsx)("div",{className:"grid gap-1.5 border-t-2 border-dashed border-border mx-3.5 pt-3 mb-3.5",children:O.map((De,Ie)=>{let le=h.get(De),Z=le?.total??0,ut=le?.answered??0,Ze=p.get(De)??0,Ce=Z===0&&Ze>0;if(Ce&&!r)return null;let sr=zt(De),Ft=le?.state??"todo";return(0,v.jsxs)(pe,{to:`/practice/all?topic=${encodeURIComponent(g)}&subtopic=${encodeURIComponent(De)}${Ce?"&layer=\u62D3\u5C55":""}`,className:`flex items-center gap-2.5 rounded-xl border-2 px-3 py-2 text-sm font-bold transition-colors ${Ft==="current"?"border-st-gold-border bg-st-gold-soft text-st-gold-ink hover:bg-st-gold-soft/70":"border-border bg-bg-subtle/50 text-text-secondary hover:bg-bg-hover"}`,children:[Ce?(0,v.jsx)("span",{className:"shrink-0 px-1.5 py-0.5 rounded text-[10px] font-medium bg-bg-subtle text-text-faint border border-border",children:a("home.extTag",{n:Ze})}):(0,v.jsx)(ho,{state:Ft==="done"?"done":Ft==="current"?"current":Ie+1,size:26}),(0,v.jsx)("span",{className:"flex-1 truncate",children:sr}),!Ce&&Ft==="current"&&Z<=nc&&(0,v.jsx)(Zt,{total:Z,on:ut}),!Ce&&(0,v.jsxs)("span",{className:"shrink-0 text-[13px] text-text-muted tabular-nums",children:[(0,v.jsx)("b",{className:"text-text-primary",children:ut}),"/",Z]})]},De)})})]},g)})})]})]})}function sc({gapDays:e,warmup:t,link:a,shift:r}){let{t:o}=ae(),n=t.ep&&Ue.examPoints?.[t.ep]||t.ep,s=t.reason==="schedule"?"home.warmupHintSchedule":t.reason==="weak"?"home.warmupHintWeak":"home.warmupHintNext",d=null;if(r?.available){let l=r.daysPerUnit!==null?r.daysPerUnit.toFixed(1):"";d=r.deadline?o("home.shiftAdviceDeadline",{window:r.windowDays,pace:l,n:r.remaining??0,days:r.estimatedDays??0,shift:r.shiftDays??0}):o("home.shiftAdviceNoDeadline",{window:r.windowDays,pace:l,n:r.remaining??0,days:r.estimatedDays??0,shift:r.shiftDays??0})}return(0,v.jsxs)("section",{className:"rounded-xl border-2 border-st-gold-border bg-st-gold-soft/70 overflow-hidden",children:[(0,v.jsxs)("header",{className:"px-4 py-2.5 border-b border-st-gold-border/60 flex items-center gap-2.5",children:[(0,v.jsx)(tt,{className:"h-4 w-4 text-st-gold-ink shrink-0",strokeWidth:2}),(0,v.jsx)("h2",{className:"text-sm font-bold text-st-gold-ink shrink-0",children:o("home.welcomeBack")}),(0,v.jsx)("span",{className:"ml-auto text-xs text-st-gold-ink/80 tabular-nums shrink-0",children:o("home.planGap",{n:e})})]}),(0,v.jsxs)("div",{className:"px-4 py-3 flex flex-col gap-2.5",children:[(0,v.jsxs)("div",{className:"flex items-center gap-3.5",children:[(0,v.jsxs)(te,{variant:"green",size:"md",to:a,className:"shrink-0",children:[(0,v.jsx)(rt,{className:"h-4 w-4 shrink-0",strokeWidth:2.5,"aria-hidden":!0}),(0,v.jsx)("span",{className:"truncate",children:n?o("home.warmupCta",{name:n}):o("home.warmupCtaPlain")})]}),(0,v.jsx)("p",{className:"text-xs text-text-secondary",children:o(s)})]}),d&&(0,v.jsxs)("p",{className:"flex items-baseline gap-2 text-xs tabular-nums text-text-secondary",children:[(0,v.jsx)(wa,{className:"h-3.5 w-3.5 shrink-0 self-center text-text-muted",strokeWidth:2,"aria-hidden":!0}),d]})]})]})}function dc({report:e,topicIds:t,resched:a}){let{t:r}=ae(),{coverage:o,calendarDiff:n,projection:s,gap:d}=e,l=o.total===0?0:Math.round(o.done/o.total*100),u;a?u={text:r("home.planRescheduled",{unit:a.nextUnit.title,date:a.nextUnit.plannedDate}),cls:"text-st-green-ink"}:n.available?n.state==="behind"?u=null:n.state==="due-today"?u={text:r("home.planDueToday"),cls:"text-st-gold-ink"}:n.state==="cleared"?u={text:r("home.planCleared"),cls:"text-st-green-ink"}:u={text:r("home.planSlack",{n:n.diffDays??0}),cls:"text-st-green-ink"}:u={text:r("home.planNoCalendar"),cls:"text-text-faint"};let p=null;if(s.deadline){let c=Qe(n.today,s.deadline);c!==null&&(p=c>0?r("home.planDeadlineIn",{n:c}):c===0?r("home.planDeadlineToday"):r("home.planDeadlineOver",{n:-c}))}let i=null;if(s.available){let c=r("home.planProjection",{window:s.windowDays,date:s.estimatedDoneDate??""});s.state==="slack"?i={text:`${c} \xB7 ${r("home.planProjSlack",{n:s.slackDays??0})}`,cls:"text-st-green-ink"}:s.state==="deficit"?i={text:`${c} \xB7 ${r("home.planProjDeficit",{n:-(s.slackDays??0)})}`,cls:"text-st-red-ink"}:i={text:c,cls:"text-text-secondary"}}else s.reason==="no-recent-completions"?i={text:r("home.planProjNoData",{window:s.windowDays}),cls:"text-text-faint"}:s.reason==="complete"&&(i={text:r("home.planProjComplete"),cls:"text-st-green-ink"});let m=d.available?{text:r("home.planGap",{n:d.daysSinceLastContact??0}),cls:"text-text-secondary"}:{text:r("home.planNoContact"),cls:"text-text-faint"};return(0,v.jsxs)("section",{className:"rounded-xl border border-border bg-bg-surface overflow-hidden",children:[(0,v.jsxs)("header",{className:"px-4 py-2.5 border-b border-border bg-bg-subtle/60 flex items-center gap-2.5",children:[(0,v.jsx)(ba,{className:"h-4 w-4 text-text-muted shrink-0",strokeWidth:2}),(0,v.jsx)("h2",{className:"text-sm font-semibold text-text-secondary shrink-0",children:r("home.planTitle")}),(0,v.jsx)("span",{className:"ml-auto text-xs text-text-muted tabular-nums shrink-0",children:r("home.planDone",{done:o.done,total:o.total})}),p&&(0,v.jsx)("span",{className:"text-xs text-text-muted tabular-nums shrink-0",children:p})]}),(0,v.jsxs)("div",{className:"px-4 py-3 space-y-2.5",children:[(0,v.jsx)("div",{className:"h-2 rounded-full bg-st-track overflow-hidden",role:"progressbar","aria-valuenow":l,"aria-valuemin":0,"aria-valuemax":100,children:(0,v.jsx)("div",{className:"h-full bg-bar-green rounded-full",style:{width:`${l}%`}})}),(0,v.jsxs)("div",{className:"space-y-1 text-xs tabular-nums",children:[u&&(0,v.jsxs)("div",{className:"flex items-baseline gap-2",children:[(0,v.jsx)("span",{className:"text-text-muted shrink-0",children:r("home.planPace")}),(0,v.jsx)("span",{className:u.cls,children:u.text})]}),i&&(0,v.jsx)("div",{className:i.cls,children:i.text}),(0,v.jsx)("div",{className:m.cls,children:m.text})]}),o.remaining.length>0&&(0,v.jsxs)("div",{className:"pt-0.5",children:[(0,v.jsx)("p",{className:"text-[11px] text-text-faint mb-1.5 tabular-nums",children:r("home.planRemaining",{n:o.remaining.length})}),(0,v.jsx)("div",{className:"flex flex-wrap gap-1.5",children:o.remaining.map(c=>{let f=(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)("span",{className:"truncate",children:c.title}),c.plannedDate&&(0,v.jsx)("span",{className:"text-[10px] opacity-60 tabular-nums shrink-0",children:c.plannedDate}),c.status==="in-progress"&&(0,v.jsx)("span",{className:"shrink-0 px-1 rounded text-[10px] font-medium bg-st-gold-soft text-st-gold-ink",children:r("home.planStatusInProgress")}),c.status==="paused"&&(0,v.jsx)("span",{className:"shrink-0 px-1 rounded text-[10px] font-medium bg-bg-subtle text-text-faint border border-border",children:r("home.planStatusPaused")})]}),h=`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs border-2 transition-colors ${c.status==="in-progress"?"bg-st-gold-soft border-st-gold-border text-st-gold-ink hover:bg-st-gold-soft/70":c.status==="paused"?"bg-bg-subtle border-border text-text-faint":"bg-bg-subtle border-border text-text-secondary hover:bg-bg-hover"}`;return!!c.topic&&t.has(c.topic)?(0,v.jsx)(pe,{to:`/practice/all?topic=${encodeURIComponent(c.topic)}`,className:h,children:f},c.id):(0,v.jsx)("span",{className:h,children:f},c.id)})})]})]})]})}var $=require("react");function $d(e){return`ask-${e}-pos-id`}function Ao(e,t){let a=localStorage.getItem($d(e)),r=a?t.indexOf(a):-1;return r>=0?r:0}function Mt(e,t){try{localStorage.setItem($d(e),t)}catch{}}var lc="oral-3",uc=5;function Kd(e){let{questions:t,progress:a,flashcards:r,coverage:o,examPoints:n,examDays:s,theme:d,plan:l,now:u}=e,p=ea(t,a.answers,n,r,a.srs??{},o,s,Vt(a.oralAttempts,d)),i=ta(p.groups);if(i.length===0)return null;let m=null;if(l.units.length>0){let b=Rr({plan:l,progress:a,now:u,questionIds:t.map(w=>w.id),cardIds:r.map(w=>w.id),theme:d});m=aa({deadline:b.projection.deadline,overdue:b.calendarDiff.overdue,diffDays:b.calendarDiff.diffDays},i,s)}let c=ra({points:i,edges:o?.graph?.edges??null,planGap:m}).primary;if(!c)return null;let f=n[c.ep]??c.ep,h=c.reason==="behindSchedule"?"schedule":c.reason==="weak"?"weak":"structural";return{ep:c.ep,name:f,label:f===c.ep?c.ep:`${c.ep} ${f}`,reason:h,action:lc,minutes:uc,to:`/practice/all?ep=${encodeURIComponent(c.ep)}`}}var oa=require("react");function Mo(e,t){if(e.autoGradable===!1||!e.answer||e.answer.length===0)return null;let a=t.filter(Boolean);if(a.length===0)return null;let r=new Set(e.answer),o=new Set(a);if(e.type==="multi"){if(o.size!==r.size)return!1;for(let n of r)if(!o.has(n))return!1;return!0}return o.size===1&&r.has([...o][0])}var He=require("react/jsx-runtime");function Qd({options:e,type:t,selected:a,revealed:r,answer:o,onToggle:n,disabled:s,justRevealed:d=!1}){let{t:l}=ae(),u=t==="multi",p=new Set(o);return(0,He.jsx)("div",{className:"space-y-2.5",children:Object.entries(e).map(([i,m])=>{let c=a.includes(i),f=p.has(i),h="border-border bg-bg-surface hover:border-border-strong hover:bg-bg-hover/50",b="bg-bg-subtle text-text-secondary";return r?f?(h="border-st-green bg-st-green-soft",b="bg-st-green text-white"):c?(h="border-st-red bg-st-red-soft",b="bg-st-red text-white"):h="border-border bg-bg-surface opacity-60":c&&(h="border-st-blue bg-st-blue-soft",b="bg-st-blue text-white"),(0,He.jsxs)("label",{className:`flex items-center gap-3 border rounded-xl px-4 py-3.5 transition-colors cursor-pointer ${h} ${s?"cursor-default":""}`,children:[(0,He.jsx)("span",{className:`flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs font-bold ${b}`,children:i}),(0,He.jsx)("span",{className:"text-text-primary flex-1 leading-snug",children:m}),r&&f&&(0,He.jsx)("span",{className:`text-st-green-ink shrink-0 ${d?"draw-check animate-check-pop":""}`,"aria-label":l("opt.correctAnswer"),children:(0,He.jsx)(ze,{className:"h-5 w-5",strokeWidth:2.5})}),r&&!f&&c&&(0,He.jsx)("span",{className:"text-st-red-ink shrink-0 animate-check-pop","aria-label":l("opt.wrongAnswer"),children:(0,He.jsx)(Xe,{className:"h-5 w-5",strokeWidth:2.5})}),(0,He.jsx)("input",{type:u?"checkbox":"radio",name:"opt",className:"sr-only",checked:c,disabled:s,onChange:()=>n(i)})]},i)})})}var _e=require("react"),Yd=require("react-dom");var Ye=require("react/jsx-runtime"),Zd=(0,_e.createContext)(async()=>!1);function Ar(){return(0,_e.useContext)(Zd)}var ic=/清空|不可恢复|归零|删除|\bclear\b|\bclearing\b|\breset\b|irreversible|cannot be undone|vaciar|borrar|restablecer|rehacer|deshacer|очист|сброс|необратим|обнул/i;function Jd({children:e}){let{t}=ae(),[a,r]=(0,_e.useState)(null),o=(0,_e.useCallback)((d,l={})=>new Promise(u=>{r({message:d,options:l,resolve:u})}),[]),n=(0,_e.useCallback)(d=>{r(l=>(l?.resolve(d),null))},[]);(0,_e.useEffect)(()=>{if(!a)return;let d=document.body.style.overflow;document.body.style.overflow="hidden";let l=u=>{u.key==="Escape"&&n(!1),u.key==="Enter"&&n(!0)};return window.addEventListener("keydown",l),()=>{window.removeEventListener("keydown",l),document.body.style.overflow=d}},[a,n]);let s=a?.options.danger??ic.test(a?.message??"");return(0,Ye.jsxs)(Zd.Provider,{value:o,children:[e,a&&(0,Yd.createPortal)((0,Ye.jsx)("div",{className:"fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in",onClick:()=>n(!1),role:"dialog","aria-modal":"true","aria-label":t("confirm.aria"),children:(0,Ye.jsx)("div",{className:"w-full max-w-sm animate-scale-in",onClick:d=>d.stopPropagation(),children:(0,Ye.jsxs)($e,{className:"p-5",children:[(0,Ye.jsx)("p",{className:"text-[15px] leading-relaxed text-text-primary whitespace-pre-line",children:a.message}),(0,Ye.jsxs)("div",{className:"mt-5 flex justify-end gap-2",children:[(0,Ye.jsx)("button",{onClick:()=>n(!1),className:"px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary border-2 border-border rounded-xl transition-colors",children:a.options.cancelText??t("confirm.cancel")}),(0,Ye.jsx)(te,{variant:s?"red":"green",onClick:()=>n(!0),autoFocus:!0,className:"py-2",children:a.options.confirmText??t("confirm.ok")})]})]})})}),portalRoot())]})}var q=require("react/jsx-runtime");function el({q:e,index:t,initialSelected:a=[],initialRevealed:r=!1,onSubmit:o,readOnly:n=!1,wrongCount:s,streak:d,streakNeeded:l,onDismiss:u}){let p=Ar(),{t:i}=ae(),m=n?e.answer:a,c=n?!0:r,[f,h]=(0,oa.useState)(m),[b,w]=(0,oa.useState)(c),[x,L]=(0,oa.useState)(!1);(0,oa.useEffect)(()=>{h(m),w(c),L(!1)},[e.id,n]);let y=e.type==="multi",B=D=>{b||h(k=>y?k.includes(D)?k.filter(S=>S!==D):[...k,D]:[D])},N=b?Mo(e,f):null,H=e.autoGradable===!1,V=x&&N===!1&&!n,de=()=>{let D=Mo(e,f);w(!0),L(!0),o?.(f,D)},A=!H&&N!==null&&!n&&d!==void 0&&l!==void 0&&!!u,g=(0,q.jsxs)("button",{onClick:async()=>{await p(i("q.confirmDismiss"))&&u?.()},className:"inline-flex items-center gap-1 text-sm text-text-secondary hover:text-st-red-ink px-2.5 py-1 rounded-lg font-medium transition-colors",title:i("q.dismissTitle"),children:[(0,q.jsx)(Na,{className:"h-3.5 w-3.5",strokeWidth:2}),i("q.dismiss")]});return(0,q.jsxs)($e,{className:`p-5 sm:p-7 ${V?"animate-shake":"animate-fade-in"}`,children:[(0,q.jsxs)("div",{className:"flex items-center gap-2 mb-4 text-xs text-text-muted flex-wrap",children:[(0,q.jsx)("span",{className:`px-2 py-0.5 rounded-md font-medium ${y?"bg-st-blue-soft text-st-blue-ink":"bg-bg-subtle text-text-muted"}`,children:y?i("q.multi"):e.type==="judge"?i("q.judge"):i("q.single")}),(0,q.jsx)("span",{className:"bg-bg-subtle px-2 py-0.5 rounded-md font-medium text-text-secondary",children:Qr[e.source]??e.source}),kt(e.source)&&(0,q.jsx)("span",{className:`px-2 py-0.5 rounded-md font-medium ${kt(e.source)==="\u6838\u5FC3"?"bg-st-gold-soft text-st-gold-ink":"bg-bg-subtle text-text-faint"}`,children:kt(e.source)}),e.topic&&(0,q.jsxs)("span",{className:"text-text-faint",children:["\xB7 ",nt(e.topic)]}),e.difficulty&&(0,q.jsx)("span",{className:"bg-amber-100 text-amber-700 px-2 py-0.5 rounded-md font-medium",children:i("q.difficulty",{level:e.difficulty})}),(0,q.jsx)("span",{className:"ml-auto text-text-faint tabular-nums",children:i("q.index",{n:t+1})})]}),(0,q.jsx)("p",{className:"text-lg font-medium text-text-primary mb-5 whitespace-pre-wrap leading-relaxed",children:e.question}),e.imageRef&&(0,q.jsx)("img",{src:`study/${Ue.theme}/assets/${e.imageRef}`,alt:i("q.imageAlt"),loading:"lazy",className:"max-w-full rounded-xl border border-border mb-5 bg-white shadow-soft"}),(0,q.jsx)(Qd,{options:e.options,type:e.type,selected:f,revealed:b,answer:e.answer,onToggle:B,disabled:b,justRevealed:x}),b?N===!1&&!H&&!n?(0,q.jsxs)("div",{className:"mt-5 rounded-2xl border-2 border-st-red-border bg-st-red-soft p-4 space-y-3 animate-fade-in",children:[(0,q.jsxs)("p",{className:"flex flex-wrap items-center gap-1.5 font-semibold text-st-red-ink",children:[(0,q.jsx)(Xe,{className:"h-5 w-5 shrink-0",strokeWidth:2.5}),i("q.wrong",{answer:e.answer.join("")}),s&&s>0&&(0,q.jsx)("span",{className:"ml-1 text-xs font-medium px-1.5 py-0.5 rounded-md bg-bg-surface",children:i("q.wrongCountTotal",{n:s})})]}),A&&(0,q.jsxs)("div",{className:"flex flex-wrap items-center gap-x-2 gap-y-1.5 text-sm",children:[(0,q.jsx)("span",{className:"text-text-secondary",children:i("q.streakLabel")}),(0,q.jsx)(Zt,{total:l,on:d}),(0,q.jsx)("span",{className:"text-text-primary tabular-nums",children:i("q.streakProgress",{streak:d,needed:l,left:l-d})}),(0,q.jsx)("span",{className:"ml-auto",children:g})]}),e.analysis&&(0,q.jsx)("div",{className:"rounded-xl bg-bg-surface border border-border px-4 py-3",children:(0,q.jsxs)("p",{className:"text-sm text-text-secondary leading-relaxed",children:[(0,q.jsx)("span",{className:"font-semibold text-text-primary",children:i("q.analysis")}),e.analysis]})})]}):(0,q.jsxs)("div",{className:"mt-5 space-y-2.5 animate-fade-in",children:[!H&&N!==null&&!n&&(0,q.jsxs)("p",{className:`flex flex-wrap items-center gap-1.5 font-semibold ${N?"text-st-green-ink":"text-st-red-ink"}`,children:[N?(0,q.jsx)(ze,{className:"h-5 w-5 shrink-0",strokeWidth:2.5}):(0,q.jsx)(Xe,{className:"h-5 w-5 shrink-0",strokeWidth:2.5}),N?i("q.correct"):i("q.wrong",{answer:e.answer.join("")}),N&&s&&s>0&&(0,q.jsx)("span",{className:"ml-1 text-xs font-medium px-1.5 py-0.5 rounded-md bg-amber-50 text-amber-600",children:i("q.wrongCountHistory",{n:s})})]}),A&&N===!0&&(0,q.jsxs)("div",{className:"flex items-center justify-between gap-3 rounded-xl bg-st-green-soft border-2 border-st-green/40 px-4 py-2.5",children:[d<l?(0,q.jsxs)("span",{className:"flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-st-green-ink",children:[(0,q.jsx)("span",{className:"text-st-green-ink/80",children:i("q.streakLabel")}),(0,q.jsx)(Zt,{total:l,on:d}),i("q.streakProgress",{streak:d,needed:l,left:l-d})]}):(0,q.jsxs)("span",{className:"flex items-center gap-1.5 text-sm text-st-green-ink font-medium",children:[(0,q.jsx)(ze,{className:"h-4 w-4",strokeWidth:2.5}),i("q.mastered")]}),g]}),H&&(0,q.jsxs)("p",{className:"flex items-center gap-1.5 text-text-secondary text-sm",children:[(0,q.jsx)(je,{className:"h-4 w-4 text-amber-500"}),i("q.selfEvalNote")]}),e.analysis&&(0,q.jsx)("div",{className:"rounded-xl bg-bg-subtle border border-border px-4 py-3",children:(0,q.jsxs)("p",{className:"text-sm text-text-secondary leading-relaxed",children:[(0,q.jsx)("span",{className:"font-semibold text-text-primary",children:i("q.analysis")}),e.analysis]})})]}):(0,q.jsx)(te,{variant:"green",onClick:de,disabled:f.length===0,className:"mt-5",children:i(H?"q.submitSelfEval":"q.submit")})]})}var Eo=require("react/jsx-runtime");function tl({answered:e,total:t,mode:a="practice"}){let r=t===0?0:Math.round(e/t*100);return(0,Eo.jsx)("div",{className:"w-full bg-st-track rounded-full h-2.5 overflow-hidden",role:"progressbar","aria-valuenow":r,"aria-valuemin":0,"aria-valuemax":100,children:(0,Eo.jsx)("div",{className:`${a==="read"?"bg-st-blue":"bg-bar-green"} h-full rounded-full transition-all duration-300 ease-out`,style:{width:`${r}%`}})})}var na=require("react");var j=require("react/jsx-runtime"),cc=e=>1-Math.pow(1-e,3),fc=900;function al({stats:e,title:t,onReset:a,nextHook:r}){let{t:o}=ae(),{accuracy:n,answered:s,correct:d,wrong:l,total:u}=e,p=s-(d+l),i=Math.round(n*100),[m,c]=(0,na.useState)(0),f=(0,na.useRef)(null);(0,na.useEffect)(()=>{if(typeof window<"u"&&window.matchMedia?.("(prefers-reduced-motion: reduce)").matches||i===0){c(i);return}let w=performance.now(),x=L=>{let y=Math.min(1,(L-w)/fc);c(Math.round(cc(y)*i)),y<1&&(f.current=requestAnimationFrame(x))};return f.current=requestAnimationFrame(x),()=>{f.current&&cancelAnimationFrame(f.current)}},[i]);let h=n>=.8?{text:o("summary.tierGood"),tone:"green",num:"text-st-green-ink"}:n>=.6?{text:o("summary.tierOk"),tone:"blue",num:"text-st-blue-ink"}:{text:o("summary.tierLow"),tone:"gold",num:"text-st-gold-ink"};return(0,j.jsxs)("div",{className:"animate-scale-in flex flex-col items-center gap-6 py-6",children:[(0,j.jsxs)("div",{className:"flex items-center gap-2 text-text-muted",children:[(0,j.jsx)(Re,{className:"h-5 w-5 text-st-green",strokeWidth:2}),(0,j.jsx)("span",{className:"font-medium",children:o("summary.title",{title:t})})]}),(0,j.jsx)(ar,{p:m,tone:h.tone,size:160,thickness:12,children:(0,j.jsxs)("div",{className:"flex flex-col items-center",children:[(0,j.jsxs)("span",{className:`text-4xl font-bold tabular-nums ${h.num}`,children:[m,(0,j.jsx)("span",{className:"text-2xl",children:"%"})]}),(0,j.jsx)("span",{className:"text-xs text-text-faint mt-0.5",children:h.text})]})}),(0,j.jsxs)("div",{className:"flex items-center gap-6 text-sm",children:[(0,j.jsxs)("div",{className:"text-center",children:[(0,j.jsx)("div",{className:"text-xl font-bold text-text-primary tabular-nums",children:s}),(0,j.jsx)("div",{className:"text-xs text-text-faint",children:o("summary.answered")})]}),(0,j.jsxs)("div",{className:"text-center",children:[(0,j.jsx)("div",{className:"text-xl font-bold text-st-green-ink tabular-nums",children:d}),(0,j.jsx)("div",{className:"text-xs text-text-faint",children:o("summary.correctCount")})]}),(0,j.jsxs)("div",{className:"text-center",children:[(0,j.jsx)("div",{className:"text-xl font-bold text-st-red-ink tabular-nums",children:l}),(0,j.jsx)("div",{className:"text-xs text-text-faint",children:o("summary.wrongCount")})]})]}),p>0&&(0,j.jsx)("p",{className:"text-xs text-text-faint -mt-3",children:o("summary.selfRated",{n:p})}),(0,j.jsx)("p",{className:"text-xs text-text-faint -mt-2",children:o("summary.totalNote",{n:u})}),r&&(0,j.jsxs)(pe,{to:r.to,className:"w-full max-w-xs flex items-center gap-2 rounded-xl border-2 border-st-green/40 bg-st-green-soft/70 px-4 py-2.5 text-left transition-colors hover:bg-st-green-soft",children:[(0,j.jsx)(Ta,{className:"h-4 w-4 shrink-0 text-st-green-ink",strokeWidth:2,"aria-hidden":!0}),(0,j.jsx)("span",{className:"flex-1 text-xs font-bold text-st-green-ink",children:o("summary.nextHook",{name:r.label,minutes:r.minutes})}),(0,j.jsx)(ve,{className:"h-4 w-4 shrink-0 text-st-green-ink/70",strokeWidth:2,"aria-hidden":!0})]}),(0,j.jsxs)("div",{className:"flex items-center gap-3 w-full max-w-xs",children:[(0,j.jsxs)(te,{to:"/",className:"flex-1",children:[(0,j.jsx)(ht,{className:"h-4 w-4",strokeWidth:2}),o("summary.backHome")]}),(0,j.jsxs)("button",{onClick:a,className:"flex-1 flex items-center justify-center gap-1.5 px-5 py-2.5 border-2 border-border-strong rounded-xl text-text-secondary font-medium hover:bg-bg-hover transition-colors",children:[(0,j.jsx)(Lt,{className:"h-4 w-4",strokeWidth:2}),o("summary.redo")]})]})]})}var F=require("react/jsx-runtime");function rl(){let{mode:e="all"}=Wr(),[t,a]=Wt(),r=t.get("topic")||"",o=t.get("subtopic")||"",n=t.get("day")||"",s=t.get("ep")||"",[d,l]=(0,$.useState)(t.get("view")==="read"?"read":"practice"),{progress:u,loaded:p,submitAnswer:i,markRead:m,resetAnswersByIds:c,resetReadByIds:f,dismissWrong:h}=Se(),b=Ar(),{t:w}=ae(),[x,L]=(0,$.useState)({}),y=u.settings?.extOn===!0,B=y&&Wa.includes(r),N=(C,R)=>!y||!Wa.includes(C)?"":R==="\u62D3\u5C55"?"\u62D3\u5C55":R==="\u5168\u90E8"?"":"\u6838\u5FC3",[H,V]=(0,$.useState)(()=>N(r,t.get("layer"))),de=t.get("layer");(0,$.useEffect)(()=>{V(N(r,de))},[r,de,y]);let A=B?H:"",g=(0,$.useMemo)(()=>{let C=y?X:X.filter(R=>R.tier!=="ext");return r&&(C=C.filter(R=>R.topic===r)),o&&(C=C.filter(R=>R.subtopic===o)),n&&(C=C.filter(R=>R.day===n)),s&&(C=C.filter(R=>R.examPoint===s)),A&&(C=C.filter(R=>kt(R.source)===A)),y||(C=C.filter(R=>Le(R))),C},[r,o,n,s,A,y]),[D,k]=(0,$.useState)(null);(0,$.useEffect)(()=>{if(e!=="wrong"){k(null);return}p&&k(Pt(u,g).map(C=>g.find(R=>R.id===C)).filter(Boolean))},[e,g,p]);let S=(0,$.useMemo)(()=>{if(e==="wrong")return D??[];if(e==="random"){let C=g.filter(R=>Le(R));for(let R=C.length-1;R>0;R--){let U=Math.floor(Math.random()*(R+1));[C[R],C[U]]=[C[U],C[R]]}return C.slice(0,Math.min(20,C.length))}return g},[e,D,g]),O=`${e}${r?`:t-${r}`:""}${o?`:s-${o}`:""}${n?`:d-${n}`:""}${s?`:e-${s}`:""}:${d}`,J=`${e}${r?`:t-${r}`:""}${o?`:s-${o}`:""}${n?`:d-${n}`:""}${s?`:e-${s}`:""}`,G=(0,$.useMemo)(()=>S.map(C=>C.id),[S]),Y=(0,$.useMemo)(()=>{if(!r||n||s)return null;let C=Os(X).filter(U=>U.subtopic?X.some(xe=>xe.topic===U.topic&&xe.subtopic===U.subtopic&&Le(xe)):X.some(xe=>xe.topic===U.topic&&Le(xe))),R=C.findIndex(U=>U.topic===r&&U.subtopic===(o||""));return R<0||R>=C.length-1?null:C[R+1]},[r,o,n,s]),ne=Ct(),[ee,ce]=(0,$.useState)(()=>e==="random"?0:Ao(O,G)),se=C=>{let R=new Error().stack?.split(`
`)[2]?.trim()?.replace(/^at\s+/,"").slice(0,90)||"?";console.log("[pos] setPos",typeof C=="function"?"fn":C,"\u2190",R),ce(C)},[De,Ie]=(0,$.useState)(0);(0,$.useEffect)(()=>{se(e==="random"?0:Ao(O,G)),Ie(C=>C+1),Ut(!1),L({}),Br(null)},[O]);let le=(0,$.useRef)(new Set);(0,$.useEffect)(()=>{if(!p||e!=="all"||d==="read"||S.length===0||le.current.has(J))return;le.current.add(J);let C=S.reduce((R,U)=>{let xe=u.answers[U.id];return xe&&!ge(xe)?R+1:R},0);if(C>0&&C<S.length){let R=S.findIndex(U=>!u.answers[U.id]||ge(u.answers[U.id]));R>=0&&(se(R),Ie(U=>U+1),S[R]&&Mt(O,S[R].id))}else if(C===S.length){let R=S.length-1;se(R),Ie(U=>U+1),S[R]&&Mt(O,S[R].id)}},[p,J,e,d]);let Z=S[Math.min(ee,S.length-1)],ut=Z?u.answers[Z.id]:void 0,Ze=ge(ut)?void 0:ut,Ce=e==="wrong",sr=Z?x[Z.id]:void 0,Ft=Ce?!!sr?.revealed:!!Ze,Bl=Ce?sr?.selected??[]:Ze?.selected,_o=e==="random",Bt=(0,$.useMemo)(()=>_o?G.filter(C=>x[C]).length:S.reduce((C,R)=>{let U=u.answers[R.id];return U&&!ge(U)?C+1:C},0),[_o,G,x,S,u.answers]),Wo=(0,$.useMemo)(()=>Ce?S.reduce((C,R)=>{let U=u.answers[R.id];return U&&!ge(U)&&U.streak!==void 0&&U.streak>=yt(U.wrongCount??1)?C+1:C},0):S.reduce((C,R)=>{let U=u.answers[R.id];return U&&!ge(U)&&U.correct===!0?C+1:C},0),[S,u.answers,Ce]),dr=(0,$.useMemo)(()=>S.reduce((C,R)=>Jr(u,R.id)?C+1:C,0),[S,u.read,u.readTombstones]),Go=(0,$.useMemo)(()=>Js(u,S),[u,S]),zo=e==="all"&&d!=="read"&&Go.answered===S.length&&S.length>0,[Tr,Ut]=(0,$.useState)(!1),Fr=Ue,Ul=(0,$.useMemo)(()=>Tr?Kd({questions:X,progress:u,flashcards:ue,coverage:ot,examPoints:Fr.examPoints??{},examDays:Fr.examDays??{},theme:Fr.theme,plan:he,now:Date.now()}):null,[Tr,u]);(0,$.useEffect)(()=>{ee>S.length-1&&se(Math.max(0,S.length-1))},[ee,S.length]);let fe=d==="read",la=(0,$.useRef)(null),Vo=()=>{la.current&&(clearTimeout(la.current),la.current=null)},Ol=ee>=S.length-1,[ql,Br]=(0,$.useState)(null),jo=!fe&&!!Z&&ql===Z.id&&!Ol,Xo=u.settings?.autoAdvance!==!1;(0,$.useEffect)(()=>{if(!(!jo||!Xo))return la.current=setTimeout(()=>{la.current=null,bt(ee+1)},3e3),Vo},[jo,Z?.id,Xo]);let bt=C=>{Vo(),Br(null);let R=Math.max(0,Math.min(S.length-1,C));se(R),Ie(U=>U+1),e!=="random"&&S[R]&&Mt(O,S[R].id)},$o=()=>{if(e==="random")return;let C=S.findIndex(R=>!u.answers[R.id]||ge(u.answers[R.id]));C>=0&&bt(C)},Hl=()=>{let C=Pt(u,g).map(R=>g.find(U=>U.id===R)).filter(Boolean);k(C),se(0),Ie(R=>R+1),L({}),C[0]&&Mt(O,C[0].id)},ua=s?Ue.examPoints?.[s]??s:"",Ko=()=>w("practice.labelQuoted",{name:ua||n||o||r||w(e==="wrong"?"practice.labelWrong":"practice.labelSequential")}),Qo=async()=>{let C=S.map(R=>R.id);e!=="random"&&await b(w("practice.confirmRedo",{label:Ko(),n:C.length}))&&(c(C),bt(0),Ut(!1))},_l=async()=>{let C=S.map(R=>R.id);e!=="random"&&await b(w("practice.confirmReread",{label:Ko(),n:C.length}))&&(f(C),bt(0))};(0,$.useEffect)(()=>{p&&fe&&Z&&m(Z.id)},[Z?.id,fe,p]);let Yo=Ce?Wo:fe?dr:Bt,Zo=C=>{l(C);let R=new URLSearchParams(t);C==="read"?R.set("view","read"):R.delete("view"),a(R,{replace:!0})},Wl=e!=="wrong"&&e!=="random";if(!Z){let C=e==="wrong"?w("practice.noWrong"):ua||n||o||r?w("practice.noQuestionsScope",{name:ua||n||o||r}):w("practice.noQuestions");return(0,F.jsxs)("div",{className:"max-w-4xl mx-auto px-4 py-16 text-center space-y-4",children:[(0,F.jsx)("p",{className:"text-text-secondary",children:C}),(0,F.jsx)(te,{to:"/",className:"mt-2",children:w("practice.backHome")})]})}return(0,F.jsxs)("div",{className:"max-w-4xl mx-auto px-4 py-6 space-y-4",children:[(0,F.jsxs)("div",{className:"flex items-center justify-between gap-3 text-sm text-text-muted",children:[(0,F.jsxs)("span",{className:"truncate min-w-0",children:[ua&&(0,F.jsxs)("span",{className:"text-text-faint",children:[ua," \xB7 "]}),n&&(0,F.jsxs)("span",{className:"text-text-faint",children:[n," \xB7 "]}),r&&(0,F.jsxs)("span",{className:"text-text-faint",children:[nt(r)," \xB7 "]}),o&&(0,F.jsxs)("span",{className:"text-text-faint",children:[zt(o)," \xB7 "]}),fe&&(0,F.jsx)("span",{className:"text-st-blue-ink",children:w("practice.readMode")})]}),(0,F.jsxs)("span",{className:"font-medium tabular-nums shrink-0",children:[Math.min(ee+1,S.length)," / ",S.length]})]}),B&&(0,F.jsx)("div",{className:"flex items-center gap-2 -mt-2",children:["","\u6838\u5FC3","\u62D3\u5C55"].map(C=>(0,F.jsx)("button",{onClick:()=>V(C),className:`px-3 py-1 rounded-full text-xs font-medium transition-colors ${H===C?"bg-st-blue text-white":"bg-bg-subtle text-text-muted hover:text-text-secondary"}`,children:C||w("practice.layerAll")},C||"all"))}),(e!=="random"&&e!=="wrong"&&!fe&&(Bt>0||Bt<S.length)||e!=="random"&&fe&&dr>0)&&(0,F.jsxs)("div",{className:"flex items-center justify-end gap-4 -mt-1",children:[e!=="random"&&e!=="wrong"&&Bt>0&&!fe&&(0,F.jsxs)("button",{onClick:Qo,className:"inline-flex items-center gap-1 text-text-muted hover:text-st-red-ink transition-colors",title:w("practice.redoSetTitle"),children:[(0,F.jsx)(Lt,{className:"h-3.5 w-3.5",strokeWidth:2}),w("practice.redoSet")]}),e!=="random"&&e!=="wrong"&&!fe&&Bt<S.length&&(0,F.jsxs)("button",{onClick:$o,className:"inline-flex items-center gap-1 text-text-muted hover:text-st-blue-ink transition-colors",title:w("practice.jumpUnansweredTitle"),children:[(0,F.jsx)(qa,{className:"h-3.5 w-3.5",strokeWidth:2}),w("practice.jumpUnanswered")]}),e!=="random"&&fe&&dr>0&&(0,F.jsxs)("button",{onClick:_l,className:"inline-flex items-center gap-1 text-text-muted hover:text-st-blue-ink transition-colors",title:w("practice.rereadSetTitle"),children:[(0,F.jsx)(Lt,{className:"h-3.5 w-3.5",strokeWidth:2}),w("practice.rereadSet")]})]}),Wl&&(0,F.jsx)("div",{className:"flex justify-center",children:(0,F.jsxs)("div",{className:"inline-flex items-center bg-bg-subtle rounded-full p-1 text-sm",children:[(0,F.jsxs)("button",{onClick:()=>Zo("practice"),className:`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full font-medium transition-colors ${fe?"text-text-muted hover:text-text-secondary":"bg-bg-surface text-st-green-ink shadow-sm"}`,children:[(0,F.jsx)(gt,{className:"h-3.5 w-3.5",strokeWidth:2}),w("practice.viewPractice")]}),(0,F.jsxs)("button",{onClick:()=>Zo("read"),className:`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full font-medium transition-colors ${fe?"bg-bg-surface text-st-blue-ink shadow-sm":"text-text-muted hover:text-text-secondary"}`,children:[(0,F.jsx)(Fe,{className:"h-3.5 w-3.5",strokeWidth:2}),w("practice.viewRead")]})]})}),(0,F.jsxs)("div",{className:"space-y-1",children:[(0,F.jsxs)("div",{className:"flex justify-between text-[11px] tabular-nums",children:[(0,F.jsx)("span",{className:fe?"text-st-blue-ink":"text-st-green-ink",children:Ce?`${w("practice.mastered",{n:Wo})} / ${S.length}`:fe?`${w("practice.readCount",{n:dr})} / ${S.length}`:`${w("practice.answeredCount",{n:Bt})} / ${S.length}`}),(0,F.jsxs)("span",{className:"text-text-faint",children:[S.length===0?0:Math.round(Yo/S.length*100),"%"]})]}),(0,F.jsx)(tl,{answered:Yo,total:S.length,mode:fe?"read":"practice"})]}),(0,F.jsx)(el,{q:Z,index:ee,readOnly:fe,initialSelected:Bl,initialRevealed:Ft,wrongCount:Ze?.wrongCount,streak:Ze?.streak,streakNeeded:Ze?.streak!==void 0?yt(Ze.wrongCount??1):void 0,onDismiss:Ce?()=>h(Z.id):void 0,onSubmit:(C,R)=>{L(U=>({...U,[Z.id]:{selected:C,revealed:!0}})),R===!0&&Br(Z.id),!(e==="random"&&R!==!1)&&i(Z.id,{selected:C,correct:R,submittedAt:Date.now(),...e==="random"?{fromRandom:!0}:{}})}},`${Z.id}:${De}`),Tr&&zo&&(0,F.jsx)("div",{className:"fixed inset-0 z-30 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in",onClick:()=>Ut(!1),role:"dialog","aria-modal":"true","aria-label":w("practice.summaryAria"),children:(0,F.jsx)("div",{className:"w-full max-w-md max-h-[90vh] overflow-y-auto animate-scale-in",onClick:C=>C.stopPropagation(),children:(0,F.jsxs)($e,{className:"p-6",children:[(0,F.jsx)(al,{stats:Go,title:n||o||r||w("practice.labelSequential"),onReset:Qo,nextHook:Ul}),Y?(0,F.jsxs)(te,{className:"w-full mt-3",onClick:()=>{let C=X.filter(Je=>Je.topic===Y.topic&&(!Y.subtopic||Je.subtopic===Y.subtopic)),R=C.find(Je=>!u.answers[Je.id]||ge(u.answers[Je.id])),U=`all:t-${Y.topic}${Y.subtopic?`:s-${Y.subtopic}`:""}:practice`;C.length>0&&!R?(c(C.map(Je=>Je.id)),C[0]&&Mt(U,C[0].id)):R&&Mt(U,R.id);let xe=new URLSearchParams;xe.set("topic",Y.topic),Y.subtopic&&xe.set("subtopic",Y.subtopic),Ut(!1),ne(`/practice/all?${xe.toString()}`)},children:[w("practice.nextSet",{label:qs(Y.topic,Y.subtopic)}),(0,F.jsx)(La,{className:"h-4 w-4",strokeWidth:2})]}):null,(0,F.jsx)("button",{onClick:()=>Ut(!1),className:"w-full mt-2 py-2 text-sm text-text-faint hover:text-text-muted transition-colors",children:w(Y?"practice.stayHere":"practice.keepReading")})]})})}),(0,F.jsxs)("div",{className:"flex justify-between gap-3",children:[(0,F.jsxs)(te,{variant:"plain",onClick:()=>bt(ee-1),disabled:ee===0,children:[(0,F.jsx)(Ca,{className:"h-4 w-4",strokeWidth:2}),w("practice.prev")]}),(()=>{let C=ee>=S.length-1,R=e==="all"&&!fe,U=R&&zo,xe=w(C?"practice.backToFirst":"practice.next"),Je=w(U||C?"practice.finish":"practice.next");return(0,F.jsxs)(te,{variant:"green",onClick:()=>{if(U){Ut(!0);return}if(!C){bt(ee+1);return}if(R){$o();return}Ce?Hl():e!=="random"&&bt(0)},disabled:e==="random"&&C,children:[R?Je:xe,R&&(U||C)?(0,F.jsx)(Re,{className:"h-4 w-4",strokeWidth:2}):C?(0,F.jsx)(Ve,{className:"h-4 w-4",strokeWidth:2}):(0,F.jsx)(ve,{className:"h-4 w-4",strokeWidth:2})]})})()]})]})}var Tt=require("react");var we=require("react");var ol=require("react");function nl(e){(0,ol.useEffect)(()=>{let t=a=>{let r=a.target?.tagName;if(r==="INPUT"||r==="TEXTAREA")return;let o=e[a.key];o&&(a.preventDefault(),o())};return window.addEventListener("keydown",t),()=>window.removeEventListener("keydown",t)},[e])}function No(e){return{main:e,pos:0,relearn:[],doneCount:0}}function To(e){return e.pos<e.main.length?e.main[e.pos]:e.relearn[0]}function sl(e){return e.pos>=e.main.length&&e.relearn.length===0}function dl(e,t,a=!1){let r=To(e);if(!r)return e;let o=e.doneCount+1;if(t==="again"||a&&(t==="good"||t==="hard")){if(e.pos<e.main.length)return{...e,pos:e.pos+1,relearn:[...e.relearn,r],doneCount:o};let[,...d]=e.relearn;return{...e,relearn:[...d,r],doneCount:o}}if(e.pos<e.main.length)return{...e,pos:e.pos+1,doneCount:o};let[,...s]=e.relearn;return{...e,relearn:s,doneCount:o}}var Et=require("react/jsx-runtime");function ll({previews:e,onGrade:t}){let{t:a}=ae(),r=[{grade:"again",label:a("srs.again"),key:"1",cls:"bg-st-red text-white shadow-btn-red"},{grade:"hard",label:a("srs.hard"),key:"2",cls:"bg-st-gold text-st-gold-ink shadow-btn-gold"},{grade:"good",label:a("srs.good"),key:"3",cls:"bg-st-green text-white shadow-btn-green"},{grade:"easy",label:a("srs.easy"),key:"4",cls:"bg-st-blue text-white shadow-btn-blue"}];return(0,Et.jsx)("div",{className:"grid grid-cols-4 gap-2",role:"group","aria-label":a("srs.aria"),children:r.map(o=>(0,Et.jsxs)("button",{onClick:()=>t(o.grade),className:`btn3d rounded-[14px] px-1 py-3 text-center animate-scale-in ${o.cls}`,children:[(0,Et.jsx)("div",{className:"font-bold text-[15px]",children:o.label}),(0,Et.jsx)("div",{className:"text-xs mt-0.5 font-semibold opacity-90 tabular-nums",children:e[o.grade]}),(0,Et.jsx)("kbd",{className:"inline-block mt-1.5 min-w-[1.25rem] rounded border border-current/30 px-1 text-[10px] font-mono leading-4 opacity-60",children:o.key})]},o.grade))})}var T=require("react/jsx-runtime"),ul=864e5,rr="ask-srs-streak",il="ask-srs-last-complete-date",pc="ask-new-per-day",cl=5,Nt=(e,t)=>{try{return localStorage.getItem(e)??t}catch{return t}},fl=(e,t)=>{try{localStorage.setItem(e,t)}catch{}},mc=()=>new Date().toDateString();function pl(){let{progress:e,reviewCard:t}=Se(),{t:a}=ae(),r=e.srs??{},o=Date.now(),[n]=Wt(),s=n.get("extra")==="1",d=e.settings?.dailyNewCards,l=typeof d=="number"&&Number.isFinite(d)&&d>=0&&d<=50?Math.floor(d):parseInt(Nt(pc,String(cl)),10)||cl,[u,p]=(0,we.useState)(0),i=(0,we.useMemo)(()=>{let G=Ie=>{let le=[...Ie];for(let Z=le.length-1;Z>0;Z--){let ut=Math.floor(Math.random()*(Z+1));[le[Z],le[ut]]=[le[ut],le[Z]]}return le};if(s)return No(G(ue));let Y=r,ne=[],ee=[],ce=[];for(let Ie of ue){let le=Y[Ie.id];if(!le||st(le)){ce.push(Ie);continue}if(Dt(le)){Qa(le,o)&&ee.push(Ie);continue}Ka(le,o)&&ne.push(Ie)}let se=Math.max(0,l-Xa(e,o)),De=ce.slice(0,se);return No([...G(ne),...G(ee),...G(De)])},[s,l,u]),[m,c]=(0,we.useState)(i);(0,we.useEffect)(()=>{c(i)},[i]);let f=To(m),[h,b]=(0,we.useState)(!1),w=(0,we.useMemo)(()=>{let G=0,Y=0,ne=0;for(let ee of ue){let ce=r[ee.id];if(!ce){ne++;continue}Dt(ce)?Qa(ce,o)&&Y++:Ka(ce,o)&&G++}return{review:G,learning:Y,fresh:Math.min(ne,Math.max(0,l-Xa(e,o)))}},[r,l,o,e]),x=w.review+w.learning+w.fresh,L=i.main.length,y=m.doneCount,B=Math.max(0,y-L),N=Math.min(y,L),H=(0,we.useCallback)(G=>{if(!f)return;let Y=r[f.id],ne=oo(Y,G,Date.now());t(f.id,ne),c(ee=>dl(ee,G,Dt(ne))),b(!1)},[f,r,t]),V=(0,we.useCallback)(()=>{f&&(h?H("good"):b(!0))},[f,h,H]);nl({" ":V,1:()=>f&&h&&H("again"),2:()=>f&&h&&H("hard"),3:()=>f&&h&&H("good"),4:()=>f&&h&&H("easy")});let de=sl(m);(0,we.useEffect)(()=>{if(!s&&de&&i.main.length>0&&y>0){let G=Nt(il,""),Y=mc();if(G!==Y){let ne=parseInt(Nt(rr,"0"),10)||0,ee=new Date(Date.now()-ul).toDateString(),ce=G===ee?ne+1:1;fl(rr,String(ce)),fl(il,Y),D(ce)}}},[de,i,y,s]);let A=(0,we.useMemo)(()=>{if(!f)return{again:"<1m",hard:"1d",good:"1d",easy:"4d"};let G=r[f.id];return{again:Ya(G,"again",o),hard:Ya(G,"hard",o),good:Ya(G,"good",o),easy:Ya(G,"easy",o)}},[f,r,o]),[g,D]=(0,we.useState)(()=>parseInt(Nt(rr,"0"),10)||0);if(de){let Y=Object.values(r).map(se=>se.due).filter(se=>se>o).sort((se,De)=>se-De)[0],ne=Y?$t((Y-o)/ul):null,ee=new Date;ee.setHours(23,59,59,999);let ce=Object.values(r).filter(se=>Dt(se)&&se.due>o&&se.due<=ee.getTime()).length;return s?(0,T.jsx)("div",{className:"max-w-4xl mx-auto px-4 py-10",children:(0,T.jsxs)("div",{className:"text-center space-y-4 animate-fade-in",children:[(0,T.jsx)(Ve,{className:"mx-auto h-16 w-16 text-st-green",strokeWidth:1.5}),(0,T.jsx)("h2",{className:"text-2xl font-bold text-text-primary",children:a("fc.extraDone")}),(0,T.jsx)("p",{className:"text-text-secondary",children:a("fc.extraDoneNote",{n:y})}),(0,T.jsxs)(te,{to:"/flashcards",className:"mt-3",children:[a("fc.back"),(0,T.jsx)(ve,{className:"h-4 w-4",strokeWidth:2})]})]})}):(0,T.jsx)("div",{className:"max-w-4xl mx-auto px-4 py-10",children:(0,T.jsxs)("div",{className:"text-center space-y-4 animate-fade-in",children:[(0,T.jsx)(Fa,{className:"mx-auto h-16 w-16 text-st-green",strokeWidth:1.5}),(0,T.jsx)("h2",{className:"text-2xl font-bold text-text-primary",children:a("fc.todayDone")}),(0,T.jsx)("p",{className:"text-text-secondary",children:a("fc.todayDoneNote",{n:y})}),(0,T.jsxs)("p",{className:"flex items-center justify-center gap-1.5 text-text-muted text-sm",children:[(0,T.jsx)(tt,{className:"h-4 w-4 text-st-gold-ink",strokeWidth:2}),a("fc.streak",{n:g})]}),ne&&(0,T.jsx)("p",{className:"text-text-faint text-sm",children:a("fc.nextDue",{interval:ne})}),ce>0&&(0,T.jsx)("p",{className:"text-amber-500 text-sm",children:a("fc.learningLaterToday",{n:ce})}),(0,T.jsxs)("div",{className:"flex flex-col items-center gap-3 mt-4",children:[(0,T.jsxs)(pe,{to:"/flashcards/review?extra=1",className:"inline-flex items-center gap-1.5 text-text-muted hover:text-st-blue-ink text-sm border-2 border-border hover:border-st-blue/50 rounded-xl px-5 py-2.5 transition-colors",children:[(0,T.jsx)(Ve,{className:"h-4 w-4",strokeWidth:2}),a("fc.extraRound")]}),(0,T.jsxs)(te,{to:"/flashcards",children:[a("fc.back"),(0,T.jsx)(ve,{className:"h-4 w-4",strokeWidth:2})]})]})]})})}let k=f,S=r[k.id],O=Sr(S),J=(()=>{if(!S)return{text:a("fc.phaseNew"),cls:"bg-st-blue-soft text-st-blue-ink"};if(S.phase==="learning"){let G=ye[S.stepIdx]??ye[0];return{text:a("fc.phaseLearning",{cur:S.stepIdx+1,total:ye.length,step:G}),cls:"bg-amber-100 text-amber-700"}}if(S.phase==="relearning"){let G=Oe[S.stepIdx]??Oe[0];return{text:a("fc.phaseRelearning",{step:G}),cls:"bg-st-red-soft text-st-red-ink"}}return{text:a("fc.phaseReview"),cls:"bg-st-green-soft text-st-green-ink"}})();return(0,T.jsxs)("div",{className:"max-w-4xl mx-auto px-4 py-6 space-y-4 min-h-full flex flex-col",children:[(0,T.jsxs)("div",{className:"space-y-2",children:[!s&&(0,T.jsx)(T.Fragment,{children:(0,T.jsxs)("div",{className:"flex items-center justify-center gap-2",children:[(0,T.jsxs)("span",{className:"rounded-full bg-st-blue-soft text-st-blue-ink px-3 py-0.5 text-xs font-bold tabular-nums",children:[a("fc.new")," ",w.fresh]}),(0,T.jsxs)("span",{className:"rounded-full bg-st-red-soft text-st-red-ink px-3 py-0.5 text-xs font-bold tabular-nums",children:[a("fc.learning")," ",w.learning]}),(0,T.jsxs)("span",{className:"rounded-full bg-st-green-soft text-st-green-ink px-3 py-0.5 text-xs font-bold tabular-nums",children:[a("fc.review")," ",w.review]})]})}),(0,T.jsx)("div",{className:"h-2 bg-st-track rounded-full overflow-hidden",children:(0,T.jsx)("div",{className:"h-full bg-bar-green rounded-full transition-all duration-300 ease-out",style:{width:`${L?N/L*100:0}%`}})}),(0,T.jsxs)("div",{className:"text-center text-xs text-text-faint tabular-nums",children:[N," / ",L,B>0&&(0,T.jsx)("span",{className:"ml-1 text-amber-500",children:a("fc.includesRelearn",{n:B})}),s&&(0,T.jsx)("span",{className:"ml-1 text-st-blue-ink",children:a("fc.extraTag")})]})]}),(0,T.jsxs)("button",{onClick:()=>{h||b(!0)},className:`flex-1 bg-bg-surface border-2 rounded-2xl p-6 sm:p-8 text-left flex flex-col justify-center min-h-[40vh] active:bg-bg-hover shadow-card-3d transition-all duration-300 animate-card-next ${h?"border-st-blue":"border-border hover:border-border-strong"}`,children:[(0,T.jsxs)("div",{className:"text-xs text-text-faint mb-3 flex items-center gap-2",children:[(0,T.jsx)("span",{className:"truncate",children:k.topic}),(0,T.jsx)("span",{className:`px-1.5 py-0.5 rounded text-[10px] font-medium ${J.cls}`,children:J.text})]}),(0,T.jsx)("div",{className:`text-lg sm:text-xl text-text-primary whitespace-pre-wrap leading-relaxed transition-opacity duration-200 ${h?"opacity-95":""}`,children:k.front}),h&&(0,T.jsxs)(T.Fragment,{children:[(0,T.jsx)("hr",{className:"my-4 border-border"}),(0,T.jsx)("div",{className:"text-base sm:text-lg text-green-700 dark:text-green-400 whitespace-pre-wrap leading-relaxed font-medium animate-flip-in",children:k.back})]}),(0,T.jsx)("div",{className:"mt-4 text-sm text-text-faint",children:a(h?"fc.hintRate":"fc.hintFlip")})]},k.id),h?(0,T.jsx)(ll,{previews:A,onGrade:H}):(0,T.jsxs)("button",{onClick:()=>b(!0),className:"w-full bg-slate-800 text-white py-3.5 rounded-xl font-medium text-lg hover:bg-slate-700 transition-colors shadow-soft dark:bg-slate-700 dark:hover:bg-slate-600",children:[a("fc.showAnswer")," ",(0,T.jsx)("kbd",{className:"inline-block ml-1 rounded bg-white/20 px-1.5 py-0.5 text-xs font-mono",children:"Space"})]})]})}var or=require("react/jsx-runtime");function Mr({label:e,value:t,color:a}){return(0,or.jsxs)("div",{className:`flex-1 rounded-2xl border-2 px-3 py-4 text-center ${{blue:"border-st-blue/40 bg-st-blue-soft text-st-blue-ink shadow-[0_3px_0_rgb(var(--st-blue)/0.4)]",red:"border-st-red-border bg-st-red-soft text-st-red-ink shadow-[0_3px_0_rgb(var(--st-red-border))]",green:"border-st-green/50 bg-st-green-soft text-st-green-ink shadow-[0_3px_0_rgb(var(--st-green)/0.5)]"}[a]}`,children:[(0,or.jsx)("div",{className:"text-[30px] font-extrabold leading-none tabular-nums",children:t}),(0,or.jsx)("div",{className:"text-[13px] mt-1.5 font-bold leading-none",children:e})]})}var _=require("react/jsx-runtime"),hc=864e5,ml="ask-new-per-day",hl=5;function gl(){let{progress:e,updateSettings:t}=Se(),{t:a}=ae(),r=e.srs??{},o=Date.now(),n=typeof e.settings?.dailyNewCards=="number"&&Number.isFinite(e.settings.dailyNewCards)&&e.settings.dailyNewCards>=0&&e.settings.dailyNewCards<=50?Math.floor(e.settings.dailyNewCards):parseInt(Nt(ml,String(hl)),10)||hl,[s,d]=(0,Tt.useState)(!1),[l,u]=(0,Tt.useState)(String(n)),[,p]=(0,Tt.useState)(0),i=(0,Tt.useMemo)(()=>{let b=0,w=0,x=0;for(let L of ue){let y=r[L.id];if(!y||st(y)){x++;continue}Dt(y)?Qa(y,o)&&w++:Ka(y,o)&&b++}return{review:b,learning:w,fresh:Math.min(x,Math.max(0,n-Xa(e,o)))}},[r,n,o,e]),m=i.review+i.learning+i.fresh,c=parseInt(Nt(rr,"0"),10)||0,f=(0,Tt.useMemo)(()=>{let b=new Set(ue.map(x=>x.id)),w=Object.entries(r).filter(([x,L])=>b.has(x)&&!L.deletedAt).map(([,x])=>x.due).filter(x=>x>o).sort((x,L)=>x-L)[0];return w?$t((w-o)/hc):null},[r,o]),h=()=>{let b=Math.max(0,Math.min(50,parseInt(l,10)||0));t({dailyNewCards:b});try{localStorage.setItem(ml,String(b))}catch{}d(!1),p(w=>w+1)};return(0,_.jsxs)("div",{className:"max-w-4xl mx-auto px-4 py-8 space-y-7",children:[(0,_.jsxs)("header",{className:"text-center",children:[(0,_.jsxs)("h1",{className:"flex items-center justify-center gap-2 text-3xl font-bold text-text-primary tracking-tight",children:[(0,_.jsx)(Be,{className:"h-7 w-7 text-st-green",strokeWidth:2}),a("fch.title")]}),(0,_.jsx)("p",{className:"text-text-muted text-sm mt-2",children:a("fch.tagline",{n:ue.length})})]}),m>0?(0,_.jsxs)("div",{className:"flex gap-3",children:[(0,_.jsx)(Mr,{label:a("fc.new"),value:i.fresh,color:"blue"}),(0,_.jsx)(Mr,{label:a("fc.learning"),value:i.learning,color:"red"}),(0,_.jsx)(Mr,{label:a("fc.review"),value:i.review,color:"green"})]}):(0,_.jsxs)("div",{className:"text-center py-10 space-y-3",children:[(0,_.jsx)(Re,{className:"mx-auto h-14 w-14 text-st-green",strokeWidth:1.5}),(0,_.jsx)("p",{className:"text-text-secondary font-medium",children:a("fch.todayDone")}),f&&(0,_.jsx)("p",{className:"text-text-faint text-sm",children:a("fc.nextDue",{interval:f})})]}),(0,_.jsxs)("p",{className:"flex items-center justify-center gap-1.5 text-sm font-bold text-st-gold-ink",children:[(0,_.jsx)(tt,{className:"h-4 w-4 text-st-gold-ink",strokeWidth:2}),a("fc.streak",{n:c})]}),(0,_.jsxs)("div",{className:"space-y-3",children:[m>0?(0,_.jsxs)(pe,{to:"/flashcards/review",className:"btn3d group flex items-center justify-between text-white rounded-2xl px-5 py-4 font-medium text-lg transition-transform bg-st-green shadow-btn-green",children:[(0,_.jsxs)("span",{className:"flex items-center gap-3",children:[(0,_.jsx)(Be,{className:"h-5 w-5 opacity-90",strokeWidth:2}),a("fch.start"),(0,_.jsx)("span",{className:"text-white/80 text-sm",children:a("fch.count",{n:m})})]}),(0,_.jsx)(ve,{className:"h-5 w-5 opacity-70 group-hover:translate-x-0.5 transition-transform"})]}):(0,_.jsx)("div",{className:"flex items-center justify-center text-text-faint rounded-2xl px-5 py-4 font-medium text-lg bg-bg-subtle",children:a("fch.nothingToday")}),(0,_.jsxs)(pe,{to:"/flashcards/review?extra=1",className:"group flex items-center justify-between text-text-secondary hover:text-st-blue-ink border-2 border-border hover:border-st-blue/50 rounded-2xl px-5 py-3.5 font-medium transition-colors",children:[(0,_.jsxs)("span",{className:"flex items-center gap-3",children:[(0,_.jsx)(Ve,{className:"h-5 w-5 opacity-70",strokeWidth:2}),(0,_.jsx)("span",{className:"text-base",children:a("fch.rerunAll",{n:ue.length})}),(0,_.jsx)("span",{className:"text-text-faint text-xs",children:a("fch.rerunNote")})]}),(0,_.jsx)(ve,{className:"h-5 w-5 opacity-50 group-hover:translate-x-0.5 transition-transform"})]})]}),s?(0,_.jsxs)("div",{className:"bg-bg-subtle border border-border rounded-xl p-4 space-y-3 animate-fade-in",children:[(0,_.jsx)("label",{className:"block text-sm font-medium text-text-primary",children:a("fch.newPerDay")}),(0,_.jsx)("input",{type:"number",min:0,max:50,value:l,onChange:b=>u(b.target.value),className:"w-full px-3 py-2.5 border-2 border-border-strong rounded-lg text-center text-lg font-medium focus:outline-none focus:border-st-blue transition-colors"}),(0,_.jsxs)("div",{className:"flex gap-2",children:[(0,_.jsx)(te,{onClick:h,className:"flex-1",children:a("fch.save")}),(0,_.jsx)("button",{onClick:()=>d(!1),className:"flex-1 border-2 border-border-strong text-text-secondary py-2.5 rounded-xl font-medium hover:bg-bg-hover transition-colors",children:a("fch.cancel")})]})]}):(0,_.jsx)("div",{className:"text-center",children:(0,_.jsxs)("button",{onClick:()=>d(!0),className:"inline-flex items-center gap-1.5 text-sm text-text-faint hover:text-st-green-ink transition-colors",children:[(0,_.jsx)(Ba,{className:"h-4 w-4",strokeWidth:2}),a("fch.newPerDay"),"\uFF1A",(0,_.jsx)("span",{className:"font-medium text-text-secondary tabular-nums",children:n})]})})]})}var K=require("react");var Fo={theme:"",lessons:[]},xl=Fo;function Ll(e){Fo.theme=typeof e?.theme=="string"?e.theme:"",Fo.lessons=Array.isArray(e?.lessons)?e.lessons.filter(t=>t&&typeof t.file=="string"&&typeof t.title=="string"):[]}var yl={first:0,correct:1,wrong:1,wrongRun:1,oralCorrect:2,oralWrong:2,flashGrad:3,mastered:4};function wl(e){let{questionIds:t,flashcardIds:a,answers:r,srs:o,mastered:n}=e,s=(Array.isArray(e.oralAttempts)?e.oralAttempts:[]).filter(f=>f&&typeof f=="object"&&typeof f.at=="number"&&Number.isFinite(f.at)),d=t.map(f=>({qid:f,r:r[f]})).filter(({r:f})=>!!f&&!ge(f)&&!ja(f));if(d.length===0&&a.length===0&&s.length===0)return[];let l=[],u=d.map(({r:f})=>f.submittedAt);for(let f of s)u.push(f.at);u.length>0&&l.push({at:Math.min(...u),kind:"first"});let p=[...d].sort((f,h)=>f.r.submittedAt-h.r.submittedAt||(f.qid<h.qid?-1:f.qid>h.qid?1:0)),i=0,m=f=>{if(i===0)return;let h=p[f];l.push(i>=2?{at:h.r.submittedAt,kind:"wrongRun",qid:h.qid,run:i}:{at:h.r.submittedAt,kind:"wrong",qid:h.qid}),i=0};p.forEach(({qid:f,r:h},b)=>{if(h.correct===!1){i+=1;return}m(b-1),h.correct===!0&&l.push({at:h.submittedAt,kind:"correct",qid:f})}),m(p.length-1);for(let f of a){let h=o[f];!h||st(h)||h.phase!=="review"||l.push({at:h.updatedAt,kind:"flashGrad",cardId:f})}for(let f of s)l.push({at:f.at,kind:f.correct?"oralCorrect":"oralWrong"});if(n){let f=d.map(({r:h})=>h.submittedAt);for(let h of a){let b=o[h];b&&!st(b)&&b.phase==="review"&&f.push(b.updatedAt)}for(let h of s)f.push(h.at);f.length>0&&l.push({at:Math.max(...f),kind:"mastered"})}let c=f=>f.qid??f.cardId??"";return l.sort((f,h)=>{if(f.at!==h.at)return f.at-h.at;let b=yl[f.kind]-yl[h.kind];return b!==0?b:c(f)<c(h)?-1:c(f)>c(h)?1:0})}var I=require("react/jsx-runtime"),Bo={mastered:"bg-st-green",inProgress:"bg-st-gold",weak:"bg-st-red",untouched:"bg-st-track border-2 border-border"},gc={mastered:"bg-st-green border-st-green-dark text-white shadow-[0_3px_0_rgb(var(--st-green-dark))]",inProgress:"bg-st-gold border-st-gold-border text-st-gold-ink shadow-[0_3px_0_rgb(var(--st-gold-border)),0_0_0_6px_rgb(var(--st-gold-soft))]",weak:"bg-st-red border-st-red-dark text-white shadow-[0_3px_0_rgb(var(--st-red-dark))]",untouched:"bg-bg-surface border-border text-text-faint shadow-[0_3px_0_rgb(var(--st-track))]"},xc={mastered:"text-text-muted",inProgress:"text-st-gold-ink font-extrabold",weak:"text-st-red-ink font-extrabold",untouched:"text-text-muted"},bl={mastered:"text-st-green-ink bg-st-green-soft border-st-green/40",inProgress:"text-st-gold-ink bg-st-gold-soft border-st-gold-border",weak:"text-st-red-ink bg-st-red-soft border-st-red-border",untouched:"text-text-muted bg-st-track border-border"},Lc={first:"border-text-faint",correct:"border-st-green",wrong:"border-st-red",wrongRun:"border-st-red",oralCorrect:"border-st-green",oralWrong:"border-st-red",flashGrad:"border-st-green",mastered:"border-st-green"},sa={mastered:"panorama.stateMastered",inProgress:"panorama.stateInProgress",weak:"panorama.stateWeak",untouched:"panorama.stateUntouched"};function yc(e,t,a,r){return r?{text:t("home.planRescheduled",{unit:r.nextUnit.title,date:r.nextUnit.plannedDate}),cls:"text-st-green-ink"}:e.available?e.state==="behind"?null:e.state==="due-today"?{text:t("home.planDueToday"),cls:"text-st-gold-ink"}:e.state==="cleared"?{text:t("home.planCleared"),cls:"text-st-green-ink"}:{text:t("home.planSlack",{n:e.diffDays??0}),cls:"text-st-green-ink"}:{text:t("home.planNoCalendar"),cls:"text-text-faint"}}function wc(e,t,a){let r=new Date(e),o=new Date(t),n=s=>`${String(s.getMonth()+1).padStart(2,"0")}-${String(s.getDate()).padStart(2,"0")}`;return r.getFullYear()===o.getFullYear()&&r.getMonth()===o.getMonth()&&r.getDate()===o.getDate()?a:r.getFullYear()===o.getFullYear()?n(r):`${r.getFullYear()}-${n(r)}`}function Il(){let{progress:e}=Se(),{t}=ae(),[a,r]=Wt(),o=Fd(a.get("filter")),n=k=>r(k==="all"?{}:{filter:k},{replace:!1}),[s,d]=(0,K.useState)(!1),[l,u]=(0,K.useState)(null),p=Ue,i=(0,K.useMemo)(()=>Vt(e.oralAttempts,p.theme),[e.oralAttempts,p.theme]),m=(0,K.useMemo)(()=>wr(i,p.examPoints??{}),[i]),c=(0,K.useMemo)(()=>ea(X,e.answers,p.examPoints??{},ue,e.srs??{},ot,p.examDays??{},i),[e.answers,e.srs,i]),f=(0,K.useMemo)(()=>c.groups.flatMap(k=>k.points),[c.groups]),h=(0,K.useMemo)(()=>Po(f),[f]),b=(0,K.useMemo)(()=>Od(X,f,za),[f]),w=(0,K.useMemo)(()=>new Map(f.map(k=>[k.ep,k])),[f]),x=(0,K.useMemo)(()=>{let k=new Map,S=O=>{let J=k.get(O);return J||(J={qids:[],fids:[]},k.set(O,J)),J};for(let O of X)O.examPoint&&S(O.examPoint).qids.push(O.id);for(let O of ue)O.examPoint&&S(O.examPoint).fids.push(O.id);return k},[]),L=(0,K.useMemo)(()=>{let k=new Map;for(let O of X)O.examPoint&&!k.has(O.examPoint)&&k.set(O.examPoint,O.topic||"");let S=new Map;for(let O of xl.lessons)if(O.topic)for(let[J,G]of k)G===O.topic&&!S.has(J)&&S.set(J,O);return S},[]),y=(0,K.useMemo)(()=>he.units.length===0?null:{coverage:bo(he),calendarDiff:Io(he,Date.now()),projection:kr(he,Date.now()),resched:Pr(he,Date.now())},[]),B=y?yc(y.calendarDiff,t,y.projection.deadline,y.resched):null,N=ot.graph?.edges??null,H=(0,K.useMemo)(()=>ta(c.groups),[c.groups]),V=(0,K.useMemo)(()=>y?aa({deadline:y.projection.deadline,overdue:y.calendarDiff.overdue,diffDays:y.calendarDiff.diffDays},H,p.examDays??{}):null,[y,H]),de=(0,K.useMemo)(()=>ra({points:H,edges:N,planGap:V}),[H,N,V]),A=Td(f.length,N);if(c.summary.examPoints===0)return(0,I.jsxs)("div",{className:"max-w-3xl mx-auto px-4 py-8 space-y-4",children:[(0,I.jsx)("h1",{className:"text-[22px] sm:text-2xl font-extrabold text-text-primary tracking-tight",children:t("panorama.title")}),(0,I.jsx)("p",{className:"text-sm text-text-faint",children:t("panorama.noEp")})]});let g=[{value:"all",label:t("panorama.filterAll")},{value:"weak",label:t("panorama.filterWeak")},{value:"unmastered",label:t("panorama.filterUnmastered")}],D=[{status:"mastered",n:h.mastered},{status:"inProgress",n:h.inProgress},{status:"weak",n:h.weak},{status:"untouched",n:h.untouched}];return(0,I.jsxs)("div",{className:"max-w-3xl mx-auto px-4 py-6 space-y-4",children:[(0,I.jsxs)("header",{className:"flex flex-wrap items-center gap-x-3 gap-y-2.5",children:[(0,I.jsx)("h1",{className:"text-[22px] sm:text-2xl font-extrabold text-text-primary tracking-tight mr-auto",children:t("panorama.title")}),A&&(0,I.jsxs)("span",{className:"inline-flex items-center gap-2 text-[13px] font-bold text-text-muted",children:[t("panorama.knowflowLabel"),(0,I.jsx)(Lo,{on:s,onChange:d,label:t("panorama.knowflowLabel")})]}),(0,I.jsx)("div",{role:"group","aria-label":t("panorama.filterAria"),className:"flex gap-2",children:g.map(({value:k,label:S})=>(0,I.jsx)("button",{onClick:()=>n(k),"aria-pressed":o===k,className:`rounded-full px-3.5 py-1.5 text-sm font-extrabold border-2 transition-colors ${o===k?"bg-st-green border-st-green-dark text-white shadow-[0_3px_0_rgb(var(--st-green-dark))]":"bg-bg-surface border-border text-text-muted hover:text-text-primary hover:border-border-strong shadow-[0_2px_0_rgb(var(--color-border))]"}`,children:S},k))})]}),de.primary&&(0,I.jsx)(bc,{station:de,deadline:V?.deadline??null}),y&&y.projection.deadline&&(0,I.jsx)(Ic,{projection:y.projection,today:y.calendarDiff.today}),(0,I.jsxs)($e,{className:"px-4 sm:px-[18px] py-4 space-y-3",children:[(0,I.jsx)("div",{className:"flex gap-1 h-5 sm:h-6",role:"img","aria-label":D.map(({status:k,n:S})=>`${t(sa[k])} ${S}`).join("\uFF0C"),children:D.map(({status:k,n:S})=>S>0&&(0,I.jsx)("i",{style:{flexGrow:S},title:`${t(sa[k])} ${S}`,className:`block rounded-md min-w-[6px] ${Bo[k]}`},k))}),(0,I.jsxs)("div",{className:"flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[13px] font-extrabold text-text-muted tabular-nums",children:[D.map(({status:k,n:S})=>(0,I.jsxs)("span",{className:"inline-flex items-center gap-1.5",children:[(0,I.jsx)("span",{className:`h-3 w-3 rounded-full ${Bo[k]}`}),t(sa[k])," ",(0,I.jsx)("b",{className:"text-text-primary text-sm",children:S})]},k)),(0,I.jsx)("span",{className:"ml-auto text-text-faint font-bold",children:t("panorama.totalPoints",{n:f.length})})]}),y&&(0,I.jsxs)("p",{className:"text-sm text-text-muted tabular-nums flex flex-wrap items-baseline gap-x-2",children:[(0,I.jsx)("span",{className:"shrink-0",children:t("panorama.planDone",{done:y.coverage.done,total:y.coverage.total})}),B&&(0,I.jsx)("span",{className:B.cls,children:B.text})]}),(0,I.jsxs)("p",{className:"text-[11px] text-text-faint",children:[t("panorama.stale"),s&&(0,I.jsx)("span",{className:"ml-1",children:t("panorama.graphHint")})]})]}),(0,I.jsxs)("div",{children:[(0,I.jsxs)("h2",{className:"flex flex-wrap items-baseline gap-x-2.5 mt-5 mb-3 px-0.5 text-[15px] font-extrabold text-text-primary",children:[t("panorama.byTopic"),(0,I.jsx)("small",{className:"text-xs font-bold text-text-faint",children:t("panorama.byTopicHint")})]}),(0,I.jsx)(Cc,{sections:b,filter:o,edges:N,knowflowOn:s&&A,onOpenNode:u})]}),l&&(0,I.jsx)(Sc,{point:w.get(l)??null,ids:x.get(l)??{qids:[],fids:[]},answers:e.answers,srs:e.srs??{},oral:m.get(l)??[],lesson:L.get(l)??null,onClose:()=>u(null)})]})}function bc({station:e,deadline:t}){let{t:a}=ae(),r=e.primary,o=e.alt,n=`/practice/all?ep=${encodeURIComponent(r.ep)}`,s=r.reason==="weak"?r.weak&&r.weak.downstream.length>0?a("panorama.nextWhyWeakBlocks",{n:r.weak.openWrong,m:r.weak.downstream.length,names:r.weak.downstream.join(" \xB7 ")}):a("panorama.nextWhyWeak",{n:r.weak?.openWrong??0}):r.reason==="behindSchedule"?a("panorama.nextWhyBehind",{n:r.daysOverdue??0,date:t??""}):e.structural==="knowflow"?a("panorama.nextWhyUnlocked"):a("panorama.nextWhySchedule"),d=r.reason==="weak"?a(e.structural==="knowflow"?"panorama.nextAltWeakPref":"panorama.nextAltWeakPrefSched"):r.reason==="behindSchedule"?a("panorama.nextAltGenPref"):a("panorama.nextAltAfter"),l=o?o.reason==="weak"?a("panorama.nextAltWeak",{name:o.name}):e.structural==="knowflow"?a("panorama.nextAltUnlocked",{name:o.name}):a("panorama.nextAltNext",{name:o.name}):null;return(0,I.jsxs)($e,{className:"flex flex-wrap items-center gap-4 px-4 sm:px-5 py-4",children:[(0,I.jsx)("span",{className:"grid place-items-center w-[46px] h-[46px] rounded-[14px] bg-st-green-soft border-2 border-st-green/30 text-st-green-ink shrink-0","aria-hidden":!0,children:(0,I.jsx)(va,{className:"h-[21px] w-[21px]",strokeWidth:2.2})}),(0,I.jsxs)("div",{className:"flex-1 min-w-[230px]",children:[(0,I.jsx)("div",{className:"text-xs font-extrabold text-st-green-ink tracking-[2px]",children:a("panorama.nextLabel")}),(0,I.jsxs)("h3",{className:"mt-0.5 flex flex-wrap items-center gap-2 text-base font-extrabold text-text-primary",children:[(0,I.jsx)("span",{className:"truncate",children:r.name}),(0,I.jsx)("span",{className:`shrink-0 rounded-full px-2 py-px text-[11px] font-extrabold border-2 ${bl[r.status]}`,children:a(sa[r.status])})]}),(0,I.jsx)("p",{className:"mt-1 text-[13px] font-semibold text-text-muted tabular-nums",children:s}),o&&l&&(0,I.jsxs)("p",{className:"mt-1 text-xs font-bold text-text-faint",children:[d," ",(0,I.jsx)(pe,{to:`/practice/all?ep=${encodeURIComponent(o.ep)}`,className:"text-st-blue-ink underline decoration-current underline-offset-2 hover:opacity-80",children:l})]})]}),(0,I.jsxs)(te,{variant:"green",size:"sm",to:n,className:"shrink-0 w-full sm:w-auto",children:[(0,I.jsx)(rt,{className:"h-4 w-4 shrink-0",strokeWidth:2.5,"aria-hidden":!0}),r.reason==="weak"?a("panorama.nextGoWeak"):a("panorama.nextGo")]})]})}function Ic({projection:e,today:t}){let{t:a}=ae(),r=e.deadline,o;if(e.available){let n=a("panorama.paceProj",{date:e.estimatedDoneDate??""});o=(e.slackDays??0)>=0?`${n} \xB7 ${a("panorama.paceProjSlack",{n:e.slackDays??0})}`:`${n} \xB7 ${a("panorama.paceProjDeficit",{n:-(e.slackDays??0)})}`}else{let n=Qe(t,r)??0;o=n>0?a("panorama.paceDeadlineIn",{n}):n===0?a("panorama.paceDeadlineToday"):a("panorama.paceDeadlineOver",{n:-n})}return(0,I.jsxs)(pe,{to:"/","aria-label":a("panorama.paceAria"),className:"flex items-center gap-1.5 -mt-1 px-1 text-[13px] font-bold text-text-muted tabular-nums hover:text-text-primary transition-colors",children:[(0,I.jsx)("span",{className:"truncate",children:o}),(0,I.jsx)("span",{"aria-hidden":!0,className:"text-st-blue-ink font-extrabold",children:"\u2192"})]})}function Cc({sections:e,filter:t,edges:a,knowflowOn:r,onOpenNode:o}){let{t:n}=ae(),s=(0,K.useRef)(null),d=(0,K.useRef)(new Map),[l,u]=(0,K.useState)({}),p=(0,K.useMemo)(()=>e.flatMap(f=>f.points),[e]),i=(0,K.useMemo)(()=>new Set(p.map(f=>f.ep)),[p]),m=(0,K.useMemo)(()=>(a??[]).filter(f=>i.has(f.from)&&i.has(f.to)),[a,i]),c=(0,K.useCallback)(()=>{let f=s.current;if(!f)return;let h=f.getBoundingClientRect(),b={};for(let[w,x]of d.current){if(!x)continue;let L=x.getBoundingClientRect();L.width&&(b[w]={x:L.left+L.width/2-h.left,y:L.top+L.height/2-h.top})}u(b)},[]);return(0,K.useLayoutEffect)(()=>{if(!r)return;c();let f=new ResizeObserver(c);return s.current&&f.observe(s.current),window.addEventListener("resize",c),s.current?.addEventListener("scroll",c,!0),()=>{f.disconnect(),window.removeEventListener("resize",c),s.current?.removeEventListener("scroll",c,!0)}},[r,c]),(0,I.jsxs)("div",{ref:s,className:"relative space-y-3.5",children:[r&&(0,I.jsxs)("svg",{className:"absolute inset-0 w-full h-full pointer-events-none z-[1]","aria-hidden":"true",children:[(0,I.jsx)("defs",{children:(0,I.jsx)("marker",{id:"pano-arrow",viewBox:"0 0 10 10",refX:"9",refY:"5",markerWidth:6,markerHeight:6,orient:"auto-start-reverse",children:(0,I.jsx)("path",{d:"M 0 1 L 10 5 L 0 9 z",className:"fill-st-gold"})})}),m.map(f=>{let h=l[f.from],b=l[f.to];if(!h||!b)return null;let w=b.x-h.x,x=b.y-h.y,L=Math.abs(w)<32?28:w*.45,y=`M ${h.x} ${h.y} C ${h.x+L} ${h.y+x*.3}, ${b.x+L} ${b.y-x*.3}, ${b.x} ${b.y}`;return f.prerequisite?(0,I.jsx)("path",{d:y,fill:"none",className:"stroke-st-gold",strokeWidth:1.5,strokeOpacity:.65,markerEnd:"url(#pano-arrow)"},`${f.from}->${f.to}`):(0,I.jsx)("path",{d:y,fill:"none",className:"stroke-text-muted",strokeWidth:1.2,strokeOpacity:.5,strokeDasharray:"4 3"},`${f.from}->${f.to}`)})]}),e.map(f=>(0,I.jsxs)("section",{className:"rounded-2xl border-2 border-border bg-bg-surface shadow-card-3d pt-4 pb-2 px-4",children:[(0,I.jsxs)("header",{className:"flex flex-wrap items-baseline gap-x-3 gap-y-1",children:[(0,I.jsx)("h3",{className:"text-[15px] font-extrabold text-text-primary",children:nt(f.topic)||n("home.uncategorized")}),(0,I.jsxs)("span",{className:"text-[13px] font-bold text-text-muted tabular-nums",children:[n("panorama.topicMasteredPrefix")," ",(0,I.jsx)("b",{className:"text-st-green-ink",children:f.counts.mastered}),"/",f.points.length," ",n("panorama.topicEpUnit")]}),(0,I.jsx)("span",{className:"ml-auto flex items-center gap-2.5 text-[12.5px] font-extrabold text-text-muted tabular-nums",children:["mastered","inProgress","weak","untouched"].map(h=>f.counts[h]>0&&(0,I.jsxs)("span",{className:"inline-flex items-center gap-1",children:[(0,I.jsx)("span",{className:`h-2.5 w-2.5 rounded-full ${Bo[h]}`}),f.counts[h]]},h))})]}),(0,I.jsx)("div",{className:"overflow-x-auto mt-3.5 pb-1.5",children:(0,I.jsxs)("div",{className:"relative w-max flex gap-[18px] px-1 pt-0.5",children:[(0,I.jsx)("span",{"aria-hidden":!0,className:"absolute left-[24px] right-[24px] top-[20px] sm:top-[22px] h-[5px] rounded-full bg-st-track"}),f.points.map((h,b)=>{let w=!Bd(h,t);return(0,I.jsxs)("button",{onClick:()=>o(h.ep),"aria-label":`${h.name} \xB7 ${n(sa[h.status])}`,className:`relative w-14 shrink-0 flex flex-col items-center gap-1.5 cursor-pointer transition-opacity ${w?"opacity-30":""}`,children:[(0,I.jsx)("span",{ref:x=>{d.current.set(h.ep,x)},className:`grid place-items-center w-11 h-11 sm:w-12 sm:h-12 rounded-full border-[2.5px] text-[16px] sm:text-[17px] font-extrabold tabular-nums transition-transform hover:-translate-y-0.5 ${gc[h.status]}`,children:h.status==="mastered"?"\u2713":h.status==="inProgress"?"\u25B6":h.status==="weak"?"!":b+1}),(0,I.jsx)("span",{className:`max-w-[62px] truncate text-center text-xs font-bold ${xc[h.status]}`,title:`${h.ep} ${h.name}`,children:h.name})]},h.ep)})]})})]},f.topic||"__none__"))]})}function Sc({point:e,ids:t,answers:a,srs:r,oral:o,lesson:n,onClose:s}){let{t:d}=ae();if((0,K.useEffect)(()=>{let m=c=>{c.key==="Escape"&&s()};return window.addEventListener("keydown",m),()=>window.removeEventListener("keydown",m)},[s]),!e)return null;let l=t.fids.filter(m=>vo(r[m])).length,u=wl({questionIds:t.qids,flashcardIds:t.fids,answers:a,srs:r,oralAttempts:o,mastered:e.status==="mastered"}),p=Date.now(),i=(m,c,f)=>(0,I.jsx)("span",{className:`px-1.5 py-0.5 rounded text-[11px] font-bold ${m?f:"bg-bg-subtle text-text-faint"}`,children:m?`\u2713${c}`:`\xB7${c}`});return(0,I.jsx)("div",{role:"dialog","aria-modal":"true","aria-label":e.name,className:"fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40",onClick:s,children:(0,I.jsxs)("div",{className:"w-full sm:max-w-[540px] max-h-[85vh] overflow-y-auto bg-bg-surface border-2 border-border rounded-t-3xl sm:rounded-[20px] shadow-xl px-5 pt-4 pb-5",onClick:m=>m.stopPropagation(),children:[(0,I.jsxs)("div",{className:"flex items-center gap-2.5",children:[(0,I.jsxs)("h3",{className:"text-[17px] font-extrabold text-text-primary mr-auto truncate",children:[e.ep," \xB7 ",e.name]}),(0,I.jsx)("span",{className:`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-extrabold border-2 ${bl[e.status]}`,children:d(sa[e.status])}),(0,I.jsx)("button",{onClick:s,"aria-label":d("panorama.sheetClose"),className:"shrink-0 grid place-items-center w-[30px] h-[30px] rounded-full border-2 border-border text-text-muted hover:text-text-primary transition-colors",children:(0,I.jsx)(Xe,{className:"h-3.5 w-3.5",strokeWidth:2.5})})]}),(0,I.jsxs)("div",{className:"flex flex-wrap items-center gap-1.5 mt-2.5",children:[i(e.taught,d("panorama.taught"),"bg-sky-50 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300"),i(e.practiced,d("panorama.practiced"),"bg-st-blue-soft text-st-blue-ink"),i(e.mastered,d("panorama.mastered"),"bg-st-green-soft text-st-green-ink"),e.oral&&(0,I.jsx)("span",{className:"px-1.5 py-0.5 rounded text-[11px] font-bold bg-bg-subtle text-text-muted tabular-nums",children:d("panorama.oral",{correct:e.oral.correct,asked:e.oral.asked})})]}),(0,I.jsxs)("div",{className:"flex flex-wrap gap-x-4 gap-y-1 mt-2 text-[13px] font-extrabold text-text-muted tabular-nums",children:[(0,I.jsx)("span",{children:d("panorama.answered",{answered:e.answered,total:e.total})}),(0,I.jsx)("span",{className:"text-st-red-ink",children:d("panorama.statWrongTimes",{n:e.openWrong})}),(0,I.jsx)("span",{children:d("panorama.statFlash",{graduated:l,mapped:t.fids.length})})]}),(0,I.jsx)("div",{className:"mt-4 text-[13px] font-extrabold tracking-wide text-text-muted",children:d("panorama.timelineTitle")}),u.length===0?(0,I.jsx)("p",{className:"mt-2.5 text-[13.5px] font-bold text-text-faint",children:d("panorama.timelineEmpty")}):(0,I.jsx)("div",{className:"mt-2.5",children:u.map((m,c)=>(0,I.jsxs)("div",{className:"flex gap-3",children:[(0,I.jsx)("span",{className:"w-[52px] shrink-0 text-right text-xs font-extrabold text-text-faint tabular-nums pt-[3px]",children:wc(m.at,p,d("panorama.tlToday"))}),(0,I.jsxs)("span",{className:"relative w-3.5 shrink-0 flex justify-center",children:[c<u.length-1&&(0,I.jsx)("span",{"aria-hidden":!0,className:"absolute top-2 -bottom-2.5 w-[3px] bg-border"}),(0,I.jsx)("span",{"aria-hidden":!0,className:`relative z-[1] mt-[2px] w-[13px] h-[13px] rounded-full border-[3px] bg-bg-surface ${Lc[m.kind]}`})]}),(0,I.jsxs)("span",{className:"pb-3 min-w-0 text-[13.5px] font-bold text-text-primary",children:[m.kind==="first"&&d("panorama.tlFirst"),m.kind==="correct"&&d("panorama.tlCorrect"),m.kind==="wrong"&&d("panorama.tlWrong"),m.kind==="wrongRun"&&d("panorama.tlWrongRun",{n:m.run??0}),m.kind==="oralCorrect"&&d("panorama.tlOralCorrect"),m.kind==="oralWrong"&&d("panorama.tlOralWrong"),m.kind==="flashGrad"&&d("panorama.tlFlash"),m.kind==="mastered"&&d("panorama.tlMastered"),m.kind==="mastered"?(0,I.jsx)("small",{className:"block text-xs font-semibold text-text-muted mt-px",children:d("panorama.tlMasteredSub")}):(m.qid||m.cardId)&&(0,I.jsx)("small",{className:"block text-xs font-semibold text-text-muted mt-px",children:m.qid??m.cardId})]})]},`${m.at}-${m.kind}-${m.qid??m.cardId??""}-${c}`))}),(0,I.jsxs)("div",{className:`grid gap-2.5 mt-4 ${n?"grid-cols-2":"grid-cols-1"}`,children:[(0,I.jsxs)(te,{variant:"green",size:"sm",to:`/practice/all?ep=${encodeURIComponent(e.ep)}`,children:[(0,I.jsx)(rt,{className:"h-4 w-4 shrink-0",strokeWidth:2.5,"aria-hidden":!0}),d("panorama.sheetPractice")]}),n&&(0,I.jsxs)(te,{variant:"plain",size:"sm",to:`/courses?lesson=${encodeURIComponent(n.file)}`,children:[(0,I.jsx)(Fe,{className:"h-4 w-4 shrink-0",strokeWidth:2.5,"aria-hidden":!0}),d("panorama.sheetCourse")]})]})]})})}var Pe=require("react"),vl=require("react/jsx-runtime"),Oo="dsh-ai-study-kit-theme",Uo="dsh-ai-study-kit:theme",vc="system",qo=".dsh-study-root",kc=(0,Pe.createContext)(null);function Ho(e,t){return e==="dark"?!0:e==="light"?!1:t}function Cl(){try{let e=localStorage.getItem(Oo);if(e==="1")return"dark";if(e==="0")return"light";if(e==="light"||e==="dark"||e==="system")return e}catch{}return vc}function Pc(e,t){try{localStorage.setItem(Oo,Ho(e,t)?"1":"0")}catch{}}function Er(){if(typeof document>"u")return null;let e=document.querySelector(qo);return e?e.classList.contains("dark"):null}function Rc(e,t){if(typeof document>"u")return;let a=document.querySelector(qo);a&&a.classList.toggle("dark",Ho(e,t))}function Sl({children:e}){let[t,a]=(0,Pe.useState)(Cl),[r,o]=(0,Pe.useState)(()=>typeof window<"u"&&!!window.matchMedia?.("(prefers-color-scheme: dark)").matches),[n,s]=(0,Pe.useState)(()=>Er());(0,Pe.useEffect)(()=>{if(typeof window>"u"||!window.matchMedia)return;let u=window.matchMedia("(prefers-color-scheme: dark)"),p=i=>o(i.matches);return u.addEventListener("change",p),()=>u.removeEventListener("change",p)},[]),(0,Pe.useEffect)(()=>{if(typeof document>"u"||typeof MutationObserver>"u")return;s(Er());let u=document.querySelector(qo);if(!u)return;let p=new MutationObserver(()=>s(Er()));return p.observe(u,{attributes:!0,attributeFilter:["class"]}),()=>p.disconnect()},[]),(0,Pe.useEffect)(()=>{let u=()=>a(Cl());return window.addEventListener("storage",p=>{p.key===Oo&&u()}),window.addEventListener(Uo,u),()=>window.removeEventListener(Uo,u)},[]);let d=n??Ho(t,r),l=(0,Pe.useCallback)(u=>{Pc(u,r),a(u),Rc(u,r),s(Er());try{window.dispatchEvent(new CustomEvent(Uo,{detail:u}))}catch{}},[r]);return(0,vl.jsx)(kc.Provider,{value:{mode:t,resolvedDark:d,setMode:l},children:e})}var re=require("react/jsx-runtime");function Dc(e){let t=e?.data??{};As(t.theme),Ns(t.themeConfig),Fs(),Us(),ks(t.questions),Ps(t.flashcards),Rs(t.plan),Es(t.coverage),Ll(void 0)}function Ac(e,t){if(!t)return e;let a=e&&typeof e=="object"?e:{},o={...a.settings&&typeof a.settings=="object"?a.settings:{}};return o.extOn===void 0&&typeof t.extOn=="boolean"&&(o.extOn=t.extOn),o.autoAdvance===void 0&&typeof t.autoAdvance=="boolean"&&(o.autoAdvance=t.autoAdvance),o.dailyNewCards===void 0&&typeof t.dailyNewCards=="number"&&(o.dailyNewCards=t.dailyNewCards),{...a,settings:o}}function Mc(){let{loaded:e}=Se();return e?(0,re.jsxs)(jr,{children:[(0,re.jsx)(et,{path:"/",element:(0,re.jsx)(Xd,{})}),(0,re.jsx)(et,{path:"/practice/:mode",element:(0,re.jsx)(rl,{})}),(0,re.jsx)(et,{path:"/read",element:(0,re.jsx)(zr,{to:"/",replace:!0})}),(0,re.jsx)(et,{path:"/flashcards",element:(0,re.jsx)(gl,{})}),(0,re.jsx)(et,{path:"/flashcards/review",element:(0,re.jsx)(pl,{})}),(0,re.jsx)(et,{path:"/panorama",element:(0,re.jsx)(Il,{})})]}):(0,re.jsx)("div",{className:"p-8 text-center text-text-muted",children:"\u2026"})}function Pl({snapshot:e,call:t,onSetProject:a,onSetTheme:r,onSetSettings:o}){xd({projectRoot:e?.project?.root??"",theme:e?.theme??""}),gd(t),vd(o),yd(Ac(e?.progress,e?.settings)),Dc(e);let n=(0,kl.useMemo)(()=>lt(e?.settings?.lang),[e?.settings?.lang]);return(0,re.jsx)("div",{className:"flex-1 min-h-0 flex flex-col bg-bg-app text-text-primary overflow-hidden",children:(0,re.jsx)(Pd,{children:(0,re.jsx)(Vd,{initialLang:n,children:(0,re.jsx)(Sl,{children:(0,re.jsx)(Jd,{children:(0,re.jsxs)(Gr,{initialEntries:["/"],children:[(0,re.jsx)(kn,{snapshot:e,onSetProject:a,onSetTheme:r,onSetSettings:o}),(0,re.jsx)("main",{className:"flex-1 min-h-0 overflow-auto",children:(0,re.jsx)(Mc,{})})]})})})})})})}var da=require("react/jsx-runtime");function Rl({size:e=18,active:t=!1}){return(0,da.jsxs)("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:t?2.2:1.9,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",focusable:"false",children:[(0,da.jsx)("path",{d:"M12 4 2.6 8.4 12 12.8l9.4-4.4L12 4Z"}),(0,da.jsx)("path",{d:"M6.2 10.6v4.1c0 1.6 2.6 2.9 5.8 2.9s5.8-1.3 5.8-2.9v-4.1"}),(0,da.jsx)("path",{d:"M21.4 8.4v5"})]})}function Dl(e){async function t(a,r){let o=await e.rpc.call(en,a,r??{},void 0);return Ec(a,o)}return{call:t}}function Ec(e,t){if(t&&typeof t=="object"&&"ok"in t){if(t.ok===!0)return t.value;let a=t.error??{},r=new Error(typeof a.message=="string"&&a.message?a.message:`\u5B66\u4E60\u53F0\u8BF7\u6C42\u5931\u8D25\uFF1A${e}`);throw r.code=a.code??"rpc-failed",r.details=a.details??{},r}return t}function nr(e){if(!e)return"\u672A\u77E5\u9519\u8BEF";let t=typeof e.message=="string"?e.message:String(e);return t.length>500?`${t.slice(0,500)}\u2026`:t}var yy=ur(El(),1),W=require("react/jsx-runtime"),Nc="dsh-ai-study-kit-client",Tc=["slots","locale","connection"],Nl="ai-study-kit",Tl="dsh-ai-study-kit",Fc={zh:{panel:"\u5B66\u4E60\u53F0"},en:{panel:"Study Desk"}};function Bc(e){let t=r=>r;try{e.locale.register(Tl,Fc),t=e.locale.bind(Tl)}catch(r){e.logger?.warn?.(`dsh-ai-study-kit: \u6587\u6848\u6CE8\u518C\u5931\u8D25\uFF1A${nr(r)}`)}let a=Dl(e.connection);e.slots.inject("main",()=>e.slots.register({name:"main",key:Nl,inject:()=>({call:a.call})},Uc)),e.slots.inject("sidebar.panellist",()=>e.slots.register({name:"sidebar.panellist",id:Nl,order:40,label:()=>t("panel")},Rl))}function Uc({call:e}){let[t,a]=(0,be.useState)(null),[r,o]=(0,be.useState)("loading"),[n,s]=(0,be.useState)(""),d=(0,be.useCallback)(async()=>{o("loading"),s("");try{let c=await e(ia.snapshot);a(c),o("ready")}catch(c){s(nr(c)),o("error")}},[e]);(0,be.useEffect)(()=>{d()},[d]);let l=(0,be.useCallback)(async(c,f)=>{try{let h=await e(c,f);return h&&a(b=>({...b,...h})),s(""),h}catch(h){throw s(nr(h)),h}},[e]),u=(0,be.useCallback)(c=>l(ia.setProject,{root:c}),[l]),p=(0,be.useCallback)(c=>l(ia.setTheme,{theme:c}),[l]),i=(0,be.useCallback)(c=>l(ia.setSettings,{patch:c}),[l]);return r==="loading"?(0,W.jsx)(Nr,{children:(0,W.jsxs)(Fl,{children:[(0,W.jsx)(Oc,{}),(0,W.jsx)("p",{className:"mt-3 text-sm text-text-secondary",children:"\u6B63\u5728\u8BFB\u53D6\u5B66\u4E60\u9879\u76EE\u2026"})]})}):r==="error"?(0,W.jsx)(Nr,{children:(0,W.jsxs)(Fl,{children:[(0,W.jsx)("p",{className:"text-base font-bold text-text-primary",children:"\u5B66\u4E60\u53F0\u52A0\u8F7D\u5931\u8D25"}),(0,W.jsx)("p",{className:"mt-2 max-w-lg text-center text-[13px] leading-relaxed text-text-secondary break-words",children:n}),(0,W.jsx)("button",{type:"button",onClick:()=>{d()},className:"mt-4 h-9 px-4 rounded-xl bg-st-green text-white text-sm font-bold",children:"\u91CD\u8BD5"})]})}):!t?.project?.root||!t?.themes?.length?(0,W.jsx)(Nr,{children:(0,W.jsx)(qc,{snapshot:t,error:n,onSetProject:u,onSetTheme:p,onReload:d})}):(0,W.jsx)(Nr,{children:(0,W.jsx)(Pl,{snapshot:t,call:e,onSetProject:u,onSetTheme:p,onSetSettings:i},`${t.project.root}|${t.theme??""}|${t.settings?.lang??"zh"}`)})}function Nr({children:e}){return(0,W.jsx)("div",{className:"dsh-study-root h-full w-full flex flex-col bg-bg-app text-text-primary",children:e})}function Fl({children:e}){return(0,W.jsx)("div",{className:"flex-1 grid place-items-center p-8",children:(0,W.jsx)("div",{className:"flex flex-col items-center",children:e})})}function Oc(){return(0,W.jsx)("span",{className:"h-6 w-6 rounded-full border-2 border-border border-t-st-green animate-spin"})}function qc({snapshot:e,error:t,onSetProject:a,onSetTheme:r,onReload:o}){let[n,s]=(0,be.useState)(""),[d,l]=(0,be.useState)(!1),[u,p]=(0,be.useState)(""),i=e?.project??{root:"",source:"none",legacy:!1},m=e?.themes??[],c=async()=>{let f=n.trim();if(f){l(!0),p("");try{await a(f)}catch(h){p(nr(h))}finally{l(!1)}}};return(0,W.jsx)("div",{className:"flex-1 overflow-auto",children:(0,W.jsxs)("div",{className:"mx-auto w-full max-w-2xl px-6 py-10",children:[(0,W.jsx)("h1",{className:"text-xl font-bold text-text-primary",children:"\u8FDE\u63A5\u4F60\u7684\u5B66\u4E60\u9879\u76EE"}),(0,W.jsxs)("p",{className:"mt-2 text-[13px] leading-relaxed text-text-secondary",children:["\u5B66\u4E60\u53F0\u8BFB\u53D6\u9879\u76EE\u91CC\u7684 ",(0,W.jsx)("code",{className:"font-mono text-[12px]",children:"examples/<\u4E3B\u9898>/"})," ","\u9898\u5E93\u4E0E\u8FDB\u5EA6\uFF0C\u4E0D\u8054\u7F51\u3001\u4E0D\u4E0A\u4F20\u4EFB\u4F55\u5185\u5BB9\u3002"]}),(0,W.jsxs)("div",{className:"mt-5 rounded-xl border-2 border-border bg-bg-surface p-4",children:[(0,W.jsx)("p",{className:"text-[11px] font-bold uppercase tracking-wide text-text-muted",children:"\u5F53\u524D\u9879\u76EE"}),(0,W.jsxs)("p",{className:"mt-1 text-[13px] text-text-primary break-all",children:[i.root||"\u5C1A\u672A\u9009\u62E9",i.root?(0,W.jsxs)("span",{className:"ml-2 text-[12px] text-text-faint",children:[i.source==="remembered"?"\u4E0A\u6B21\u4F7F\u7528":i.source==="home"?"\u9ED8\u8BA4\u76EE\u5F55":i.source==="manual"?"\u624B\u52A8\u6307\u5B9A":i.source==="cwd"?"\u5F53\u524D\u5DE5\u4F5C\u533A":"",i.legacy?" \xB7 \u65E7\u5E03\u5C40":""]}):null]}),(0,W.jsxs)("form",{onSubmit:f=>{f.preventDefault(),c()},className:"mt-3 flex flex-col gap-2 sm:flex-row",children:[(0,W.jsx)("input",{value:n,onChange:f=>s(f.target.value),placeholder:"~/Documents/study-kit \u6216\u7EDD\u5BF9\u8DEF\u5F84",spellCheck:!1,className:"h-9 flex-1 px-3 rounded-xl border-2 border-border bg-bg-subtle text-[13px] text-text-primary placeholder:text-text-faint outline-none focus:border-st-blue"}),(0,W.jsx)("button",{type:"submit",disabled:d||!n.trim(),className:"h-9 px-4 rounded-xl bg-st-green text-white text-sm font-bold disabled:opacity-40",children:d?"\u6B63\u5728\u6253\u5F00\u2026":"\u4F7F\u7528\u6B64\u76EE\u5F55"})]}),(u||t)&&(0,W.jsx)("p",{className:"mt-2 text-[12px] leading-relaxed text-st-red break-words",children:u||t}),(0,W.jsx)("button",{type:"button",onClick:()=>{o()},className:"mt-3 text-[12px] font-bold text-text-muted hover:text-text-secondary",children:"\u91CD\u65B0\u68C0\u6D4B"})]}),m.length>0&&(0,W.jsxs)("div",{className:"mt-5",children:[(0,W.jsx)("p",{className:"text-[11px] font-bold uppercase tracking-wide text-text-muted",children:"\u9009\u62E9\u4E3B\u9898"}),(0,W.jsx)("div",{className:"mt-2 grid gap-2 sm:grid-cols-2",children:m.map(f=>(0,W.jsxs)("button",{type:"button",onClick:()=>{r(f.slug)},className:"rounded-xl border-2 border-border bg-bg-surface p-3 text-left hover:border-border-strong",children:[(0,W.jsx)("span",{className:"block text-[13px] font-bold text-text-primary",children:f.title}),(0,W.jsxs)("span",{className:"mt-0.5 block text-[11px] text-text-faint",children:[f.questionCount," \u9898 \xB7 ",f.cardCount," \u5361"]})]},f.slug))})]})]})})}
/*! Bundled license information:

@remix-run/router/dist/router.js:
  (**
   * @remix-run/router v1.23.4
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

react-router/dist/index.js:
  (**
   * React Router v6.30.6
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

react-router-dom/dist/index.js:
  (**
   * React Router DOM v6.30.6
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

lucide-react/dist/esm/shared/src/utils/toKebabCase.mjs:
lucide-react/dist/esm/shared/src/utils/toLucideIconData.mjs:
lucide-react/dist/esm/shared/src/utils/toCamelCase.mjs:
lucide-react/dist/esm/shared/src/utils/toPascalCase.mjs:
lucide-react/dist/esm/shared/src/utils/mergeClasses.mjs:
lucide-react/dist/esm/shared/src/build/defaultAttributes.mjs:
lucide-react/dist/esm/shared/src/build/buildLucideIconNode.mjs:
lucide-react/dist/esm/shared/src/build/buildLucideIconForReact.mjs:
lucide-react/dist/esm/shared/src/utils/hasA11yProp.mjs:
lucide-react/dist/esm/context.mjs:
lucide-react/dist/esm/Icon.mjs:
lucide-react/dist/esm/createLucideIcon.mjs:
lucide-react/dist/esm/icons/app-window.mjs:
lucide-react/dist/esm/icons/arrow-right.mjs:
lucide-react/dist/esm/icons/binary.mjs:
lucide-react/dist/esm/icons/book-open.mjs:
lucide-react/dist/esm/icons/boxes.mjs:
lucide-react/dist/esm/icons/calendar-clock.mjs:
lucide-react/dist/esm/icons/calendar-days.mjs:
lucide-react/dist/esm/icons/check.mjs:
lucide-react/dist/esm/icons/chevron-down.mjs:
lucide-react/dist/esm/icons/chevron-left.mjs:
lucide-react/dist/esm/icons/chevron-right.mjs:
lucide-react/dist/esm/icons/circle-check.mjs:
lucide-react/dist/esm/icons/cloud.mjs:
lucide-react/dist/esm/icons/code-xml.mjs:
lucide-react/dist/esm/icons/compass.mjs:
lucide-react/dist/esm/icons/cpu.mjs:
lucide-react/dist/esm/icons/database.mjs:
lucide-react/dist/esm/icons/flame.mjs:
lucide-react/dist/esm/icons/flask-conical.mjs:
lucide-react/dist/esm/icons/gauge.mjs:
lucide-react/dist/esm/icons/git-branch.mjs:
lucide-react/dist/esm/icons/globe.mjs:
lucide-react/dist/esm/icons/house.mjs:
lucide-react/dist/esm/icons/layers.mjs:
lucide-react/dist/esm/icons/list-checks.mjs:
lucide-react/dist/esm/icons/lock.mjs:
lucide-react/dist/esm/icons/log-out.mjs:
lucide-react/dist/esm/icons/magnet.mjs:
lucide-react/dist/esm/icons/party-popper.mjs:
lucide-react/dist/esm/icons/pen-line.mjs:
lucide-react/dist/esm/icons/play.mjs:
lucide-react/dist/esm/icons/refresh-cw.mjs:
lucide-react/dist/esm/icons/repeat.mjs:
lucide-react/dist/esm/icons/rotate-ccw-clock.mjs:
lucide-react/dist/esm/icons/rotate-ccw.mjs:
lucide-react/dist/esm/icons/settings.mjs:
lucide-react/dist/esm/icons/shapes.mjs:
lucide-react/dist/esm/icons/shield-check.mjs:
lucide-react/dist/esm/icons/shuffle.mjs:
lucide-react/dist/esm/icons/skip-forward.mjs:
lucide-react/dist/esm/icons/sparkles.mjs:
lucide-react/dist/esm/icons/timer.mjs:
lucide-react/dist/esm/icons/workflow.mjs:
lucide-react/dist/esm/icons/x.mjs:
lucide-react/dist/esm/lucide-react.mjs:
  (**
   * @license lucide-react v1.73.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/

    return module.exports;
  },
});
