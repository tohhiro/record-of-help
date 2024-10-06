"use strict";(self.webpackChunkrecord_of_help=self.webpackChunkrecord_of_help||[]).push([[68],{"./app/(feature)/dashboard/components/DashboardTable/index.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__={title:"app/feature/dashboard/DashboardTable",component:__webpack_require__("./app/(feature)/dashboard/components/DashboardTable/index.tsx").D},Default={args:{th:{person:"氏名",dish:"皿洗い",curtain:"カーテン開閉",landry:"洗濯物",prepareEat:"食事準備",special:"スペシャル",comments:"コメント",created_at:"日付"},td:[{comments:null,created_at:"2024-1-2",curtain:100,del_flag:!1,dish:10,id:"1",landry:20,person:"eito",prepareEat:20,special:5},{comments:null,created_at:"2024-1-2",curtain:100,del_flag:!1,dish:10,id:"1",landry:20,person:"mei",prepareEat:20,special:5}]}},__namedExportsOrder=["Default"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  args: {\n    th: mockThData,\n    td: mockTdData\n  }\n}",...Default.parameters?.docs?.source}}}},"./app/(feature)/dashboard/components/DashboardTable/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{D:()=>DashboardTable});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/jsx-runtime.js"),_app_components_Table__WEBPACK_IMPORTED_MODULE_2__=(__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),__webpack_require__("./app/components/Table/index.tsx"));const DashboardTable=({th,td})=>{if(!Object.keys(th).length||!td)return null;const filterData=td.filter((item=>!0!==item.del_flag)),sortData=(null==filterData?void 0:filterData.map((({del_flag:_delFlag,...item})=>({...item,created_at:new Date(item.created_at).toLocaleDateString()})))).map((item=>Object.keys(th).map((key=>item[key]))));return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_app_components_Table__WEBPACK_IMPORTED_MODULE_2__.X,{thData:th,tdData:sortData})};DashboardTable.__docgenInfo={description:"",methods:[],displayName:"DashboardTable",props:{th:{required:!0,tsType:{name:"Record",elements:[{name:"string"},{name:"string"}],raw:"Record<string, string>"},description:""},td:{required:!0,tsType:{name:"union",raw:"Database['public']['Tables']['raws_data']['Row'][] | null",elements:[{name:"Array",elements:[{name:"signature['Tables']['raws_data']['Row']",raw:"Database['public']['Tables']['raws_data']['Row']"}],raw:"Database['public']['Tables']['raws_data']['Row'][]"},{name:"null"}]},description:""}}}},"./app/components/Table/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{X:()=>Table});var jsx_runtime=__webpack_require__("./node_modules/next/dist/compiled/react/jsx-runtime.js"),react=__webpack_require__("./node_modules/next/dist/compiled/react/index.js");__webpack_require__("./app/styles/globals.css");const tableStyles_table="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400",tableStyles_thead="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400",tableStyles_th="px-6 py-3 sticky top-0 bg-white",tableStyles_tr="bg-white border-b dark:bg-gray-800 dark:border-gray-700",tableStyles_td="px-6 py-4",Table=(0,react.forwardRef)((({thData,tdData},_ref)=>tdData&&tdData[0]?Object.keys(thData).length!==Object.keys(tdData[0]).length?(0,jsx_runtime.jsx)("div",{children:"要素の数が異なるため表示できません"}):(0,jsx_runtime.jsxs)("table",{className:tableStyles_table,children:[(0,jsx_runtime.jsx)("thead",{className:tableStyles_thead,children:(0,jsx_runtime.jsx)("tr",{children:Object.keys(thData).map(((key,idx)=>(0,jsx_runtime.jsx)("th",{className:tableStyles_th,children:thData[key]},`${idx}${key}`)))})}),(0,jsx_runtime.jsx)("tbody",{children:tdData.map(((item,idxA)=>(0,jsx_runtime.jsx)("tr",{className:tableStyles_tr,children:Object.keys(item).map(((key,idxB)=>(0,jsx_runtime.jsx)("td",{className:tableStyles_td,children:String(item[key])},`${idxB}${key}`)))},idxA)))})]}):(0,jsx_runtime.jsx)("div",{children:"データがありません"})));Table.__docgenInfo={description:"",methods:[],displayName:"Table",props:{thData:{required:!0,tsType:{name:"Record",elements:[{name:"string"},{name:"string"}],raw:"Record<string, string>"},description:""},tdData:{required:!0,tsType:{name:"union",raw:"Props | null",elements:[{name:"Array",elements:[{name:"Record",elements:[{name:"string"},{name:"union",raw:"string | number | null",elements:[{name:"string"},{name:"number"},{name:"null"}]}],raw:"Record<string, string | number | null>"}],raw:"Record<string, string | number | null>[]"},{name:"null"}]},description:""}}}}}]);